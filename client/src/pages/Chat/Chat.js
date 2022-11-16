import styles from './Chat.module.css';
import RoomAndUsers from './Room-And-Users';
import MessagesReceived from './Messages';
import SendMessage from './Send-Message';

const Chat = ({ socket, username, room }) => {
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage
          socket={socket}
          username={username}
          room={room}
        ></SendMessage>
      </div>
    </div>
  );
};

export default Chat;
