import React from 'react';

const Message = ({ message }) => {
  return (
    <section className="messages-column">
      <span className="messages-column__nickname">{message.nickName}</span>
      <span className="messages-column__text">{message.text}</span>
    </section>
  );
};

export default Message;
