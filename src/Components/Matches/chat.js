import React, {useState, useEffect, useRef} from 'react';
import socket from 'socket.io-client';
import {connect} from 'react-redux';

const Chat = props => {
    const [client] = useState(() => {
        const initialState = socket('127.0.0.1:5050');
        return initialState;
    });
    const [chatMessage, setChatMessage] = useState('');
    const [newMessage, setNewMessage] = useState({});
    const [listMessages, setListMessages] = useState([]);
    const [mappedMessages, setMappedMessages] = useState([]);

    useEffect(() => {
        if (client) {
            const abortController = new AbortController();
            async function getNewMessage() {
                await client.on(`chatroom-${props.match.params.id}`, msg => {
                    if (msg.chatroom_id === props.match.params.id) {
                        setNewMessage({
                            username: msg.username,
                            message: msg.message
                        })
                    }
                });
                return function cleanup() {
                    abortController.abort();
                }
            }
            getNewMessage();
        }
    }, []);

    useEffect(() => {
        if (newMessage.message) {
            setListMessages([...listMessages, newMessage]);
        }
    }, [newMessage]);

    useEffect(() => {
        if (listMessages !== []) {
            setMappedMessages(listMessages.map((element, index) => {
                if (element.username === props.user.username) {
                    console.log(element);
                    return (
                        <div className='myMessage' key={index}>
                            <li>
                                <p className='chat-username'>Me:</p>
                                <p className='message-display'>{element.message}</p>
                            </li>
                        </div>
                    )
                }
                else {
                    return (
                        <div className='notMyMessage' key={index}>
                            <li>
                                <p className='chat-username'>:{element.username}</p>
                                <p className='message-display-2'>{element.message}</p>
                            </li>
                        </div>
                    )
                }               
            })) 
        }
    }, [listMessages]);

    const send = async () => {
        const combined = {
            chatroom_id: props.match.params.id,
            username: props.user.username,
            message: chatMessage
        };
        await client.emit('chatMessage', combined);
        setChatMessage('');
    }

    return (
            <div className='chat-display'>
                <ul className='messages'>
                    {mappedMessages
                    ?<div className='unreverse-map'>{mappedMessages}</div>
                    :null
                    }
                    <div></div>
                </ul>
                <section className='create-message-section'>
                    <input className='message-input' maxLength='250' value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
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