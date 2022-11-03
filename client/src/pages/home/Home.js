import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
    }

    navigate('/chat', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          placeholder='Username...'
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* TODO: fix input bigger than select!??*/}
        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}>
          <option>--Select Room--</option>
          <option value='javascript'>Javascript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;