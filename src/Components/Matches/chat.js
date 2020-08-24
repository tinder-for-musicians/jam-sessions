import React, {useState, useEffect, useRef} from 'react';
import socket from 'socket.io-client';
import {connect} from 'react-redux';

const client = socket(process.env.REACT_APP_IO_PORT);

const Chat = props => {
    const [chatMessage, setChatMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);
    const [mappedMessages, setMappedMessages] = useState([]);
    // const [username, setUsername] = useState('')

    useEffect(() => {
        const abortController = new AbortController();
        async function getNewMessage() {
            await client.on('newMessage', msg => {
                console.log(msg);
                setNewMessage(msg);
            });
            return function cleanup() {
                abortController.abort();
            }
        }
        getNewMessage();
    }, []);

    useEffect(() => {
        // console.log(newMessage, listMessages);
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
        // console.log(username);
        setChatMessage('');
    }

    return (
        <div className='chat-display'>
            <ul className='messages'>
                {mappedMessages}
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