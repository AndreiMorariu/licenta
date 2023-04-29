import { useEffect, useRef, useState } from 'react';
import './Chat.css';
import Navbar from '../../components/Navbar/Navbar';
import Conversation from '../../components/Conversation/Conversation';
import ChatBox from '../../components/ChatBox/ChatBox';
import { useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequest';
import { io } from 'socket.io-client';

function Chat() {
  const { user } = useSelector((state) => state.authReducer.authData);
  const socket = useRef();

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [persons, setPersons] = useState([]);

  const onRender = () => {
    const createChats = async () => {
      const response = await fetch('http://localhost:5000/user');
      let data = await response.json();
      data = data.filter((item) => item._id !== user._id);
      console.log(data);
      data.map(async (item) => {
        await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: user._id,
            receiverId: item._id,
          }),
        });
      });
    };
    createChats();
    setTimeout(() => {
      getChats();
    }, 1000);
  };

  const getChats = async () => {
    try {
      const { data } = await userChats(user._id);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  useEffect(() => {
    socket.current = io('http://localhost:8800');
    socket.current.emit('new-user-add', user._id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (sendMessage) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on('recieve-message', (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const renderChats = chats?.map((chat) => (
    <div onClick={() => setCurrentChat(chat)} key={chat._id}>
      <Conversation data={chat} currentUser={user._id} />
    </div>
  ));

  return (
    <>
      <Navbar className="chat-navbar" />
      <div className="chat">
        <div className="left-side">
          <h3>Chats</h3>
          <button onClick={onRender}>Render</button>
          <div className="chat-list">{renderChats}</div>
        </div>
        <div className="right-side">
          <div className="chat-container">
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
