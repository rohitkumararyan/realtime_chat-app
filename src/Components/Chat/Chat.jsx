
import React, { useEffect, useState } from 'react'
import socketIo from 'socket.io-client'
import { user } from '../Join/Join';
import Message from '../Message/Message';
import './Chat.css'
import ReactSrollToBottom from "react-scroll-to-bottom"

const ENDPOINT ='https://realtime-chat-backend-u7fd.onrender.com';
let socket;
const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([])

    const send = () => {
      const message = document.getElementById('chatInput').value;
      socket.emit('message', { message, id });
      document.getElementById('chatInput').value = "";
    }

  console.log(messages);
  
  useEffect(() => {
      socket = socketIo(ENDPOINT, { transports: ['websocket'] });

      socket.on('connect', () => {
          alert('Connected');
          setid(socket.id);

      })
      console.log(socket);
      socket.emit('joined', { user })

      socket.on('welcome', (data) => {
          setMessages([...messages, data]);
          console.log(data.user, data.message);
      })

      socket.on('userJoined', (data) => {
          setMessages([...messages, data]);
          console.log(data.user, data.message);
      })

      socket.on('leave', (data) => {
          setMessages([...messages, data]);
          console.log(data.user, data.message)
      })
      socket.on('disconnect', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message)
    })

      return () => {
          socket.emit('');
          socket.off();
      }
  }, [])

  useEffect(() => {
      socket.on('sendMessage', (data) => {
          setMessages([...messages, data]);
          console.log(data.user, data.message, data.id);
      })
      return () => {
          socket.off();
      }
  }, [messages])
  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
            <h2>CHAT Here</h2>
            <a href='/'> <button className='leave'>Leave</button></a>
            
            </div>
            <ReactSrollToBottom className='chatBox'>
              {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
            </ReactSrollToBottom>
            <div className='input'>
                <input  onChange={(event) => event.key === 'Enter' ? send() : null}  type="text" id='chatInput' placeholder='chat here'/>
                <button  onClick={send} className="sendBtn"><img src="https://icons.veryicon.com/png/o/miscellaneous/ui-basic-linear-icon/send-message-2-2.png" alt="send"></img></button>
                
            </div>
        </div>
          
    </div>
  )
}

export default Chat
