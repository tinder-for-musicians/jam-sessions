import React, {useState, useEffect, useRef} from 'react';
import socket from 'socket.io-client';
import {connect} from 'react-redux';

const Chat = props => {
    const [client, setClient] = useState(() => {
        const initialState = socket(process.env.REACT_APP_IO_PORT);
        return initialState;
    });
    const [chatMessage, setChatMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);
    const [mappedMessages, setMappedMessages] = useState([]);
    // const [username, setUsername] = useState('')

    useEffect(() => {
        if (client) {
            const abortController = new AbortController();
            async function getNewMessage() {
                await client.on('newMessage', msg => {
                    setNewMessage(msg);
                });
                return function cleanup() {
                    abortController.abort();
                }
            }
            getNewMessage();
        }
    }, []);

    useEffect(() => {
        setListMessages([...listMessages, newMessage]);
    }, [newMessage]);

    useEffect(() => {
        setMappedMessages(listMessages.map((element, index) => (
          <li key={index}>
            {element}
          </li>
        )));
      }, [listMessages]);

    const send = async () => {
        const combinedMessage = `${props.user.username}: ${chatMessage}`
        await client.emit('chatMessage', combinedMessage);
        setChatMessage('');
    }

    return (
            <div className='chat-display'>
                <ul className='messages'>
                    {mappedMessages}
                    <li></li>
                </ul>
                <section className='create-message-section'>
                    <input className='message-input' value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
                    <button onClick={send}>Send</button>
                </section>
            </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}


export default connect(mapStateToProps)(Chat);