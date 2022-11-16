import styles from './Chat.module.css';
import { useState, useEffect } from 'react';

import React from 'react';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');
  // const [isTyping, setIsTyping] = useState(false);
  const [currentlyTypingUsers, setCurrentlyTypingUsers] = useState([]);

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
      console.log(data);
      setCurrentlyTypingUsers(data);
    });

    return () => {
      console.log('remove typing');
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

  // const typers
  /*
    HANDLE TYPING
    1.user start typing inside input.
    because of that, an event is sent to server
    user gets added to array currentlyTypingUsers.
    server emits array to room that the users is typing: 
    "User is typing..." \ "Usera and Userb are typing" \ "Usera and Userb and {number of adittional users} are typing"
  
    2. user stops typing.
    data sent to server, and user is removed from currentlyTypingUsers array
    array is broadcast to everyone
  
  */

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
        className={
          currentlyTypingUsers.length === 0
            ? styles.isTypingHidden
            : styles.isTyping
        }
      ></p>
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
