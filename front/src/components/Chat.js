import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';
import { receiveMessage, sendMessage } from '../redux/chatSlice';
import { validateMessage, validateName } from '../utils/validation';

const Chat = () => {
  const [text, setText] = useState('');
  const [nickName, setNickname] = useState('');
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const isConnected = useSelector((state) => state.chat.isConnected);

  const handleSendMessage = () => {
    if (validateMessage(text) && validateName(nickName)) {
      dispatch(sendMessage({
        nickName,
        text
      }));
      dispatch(receiveMessage({
        nickName,
        text
      }));
    }
    setText('');
    setNickname('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <header className="app-header">
        <h1>Chat Application</h1>
        {!isConnected && <h2>WebSocket is not connected</h2>}
      </header>
      <div className="messages-container">
        {!messages.length && <h2>No messages</h2>}
        {messages.map((message) => (
          <Message key={uuidv4()} message={message} />
        ))}
      </div>
      <footer>
        <div className="message-input">
          <input
            className='message-input__nickname'
            type="text"
            value={nickName}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <input
            className='message-input__text'
            type="text"
            value={text}
            onChange={
              (e) => {
                setText(e.target.value)
              }
            }
            onKeyDown={handleKeyPress}
          />
          <button className="submit-btn" onClick={handleSendMessage}>Send</button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
