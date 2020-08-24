import React, {useState, useEffect} from 'react';
import socket from 'socket.io-client';

const client = socket(process.env.REACT_APP_IO_PORT);

const Chat = () => {
    const [chatMessage, setChatMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);
    const [mappedMessages, setMappedMessages] = useState([]);

    useEffect(() => {
        client.on('newMessage', msg => {
            console.log(msg);
            setNewMessage(msg);
        });
    }, []);

    useEffect(() => {
        console.log(newMessage, listMessages);
        setListMessages([...listMessages, newMessage]);
    }, [newMessage]);

    useEffect(() => {
        setMappedMessages(listMessages.map((element, index) => (
          <li key={index}>
            {element}
          </li>
        )));
      }, [listMessages]);
      
    const send = () => {
        client.emit('chatMessage', chatMessage);
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

export default Chat;