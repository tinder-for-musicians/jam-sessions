import React, {useState, useEffect} from 'react';
import socket from 'socket.io-client';

const client = socket(process.env.REACT_APP_IO_PORT);

const Chat = () => {

    // const [socketPort] = useState(process.env.REACT_APP_IO_PORT);
    const [chatMessage, setChatMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);

    useEffect(() => {
        // console.log(socketPort);
        // const client = socket(socketPort);
        client.on('chatMessage', msg => {
            setListMessages(listMessages.push(msg));
        });
    });

    const send = () => {
        // const client = socket(socketPort);
        client.emit('Chat Message', chatMessage);
        setChatMessage('');
    }

    return (
        <div className='chat-display'>
            <ul className='messages'>
                {listMessages}
            </ul>
            <section className='create-message-section'>
                <input className='message-input' value={chatMessage} onChange={e => setChatMessage(e.target.value)} />
                <button onClick={send}>Send</button>
            </section>
        </div>
    )
}

export default Chat;