import styles from './Chat.module.css';
import { useState, useEffect } from 'react';

import React from 'react';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  const [currentlyTypingUsers, setCurrentlyTypingUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState('');

  useEffect(() => {
    if (message.length > 0) {
      const __createdtime__ = Date.now();
      socket.emit('user_typing', { username, room, __createdtime__ });
    } else if (message.length === 0) {
      const __createdtime__ = Date.now();
      socket.emit('user_stop_typing', { username, room, __createdtime__ });
    }
  }, [message, username, room, socket]);

  useEffect(() => {
    socket.on('chatroom_typers', (data) => {
      let users;
      users = data.map((item) => item.username);
      console.log(users);
      setCurrentlyTypingUsers(users);
    });

    return () => {
      socket.off('chatroom_typers');
    };
  }, [socket]);

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server, and receive it from server to frontend
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  const handleEnterKeyUp = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleUserTypingEvent = (e) => {
    setMessage(e.target.value);
  };
  //  Render users typing

  useEffect(() => {
    if (currentlyTypingUsers.length === 0)
      return setTypingUsers(currentlyTypingUsers);

    let typingUsers = currentlyTypingUsers;
    console.log(typingUsers);
    typingUsers.filter((user) => user === username);

    console.log(typingUsers);
    if (typingUsers.length <= 3) {
      typingUsers = typingUsers.slice(0, 3);
    } else {
      typingUsers = typingUsers.slice(0, 2);
      typingUsers.push(`and ${currentlyTypingUsers.length - 2} more`);
    }

    console.log(typingUsers);

    const endStatement =
      typingUsers.length === 1 ? ' is typing' : ' are typing';

    typingUsers = typingUsers.map((user) => ' ' + user);

    typingUsers.push(endStatement);

    setTypingUsers(typingUsers);
  }, [currentlyTypingUsers, socket]);

  return (
    <div className={styles.sendMessageContainer}>
      <input
        type='text'
        className={styles.messageInput}
        placeholder={'Enter message'}
        onChange={(e) => handleUserTypingEvent(e)}
        value={message}
        onKeyUp={(e) => handleEnterKeyUp(e)}
      />
      <p
        className={typingUsers === '' ? styles.isTypingHidden : styles.isTyping}
      >
        {typingUsers}
      </p>
      <button
        type='submit'
        className='btn btn-primary btn-small'
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
