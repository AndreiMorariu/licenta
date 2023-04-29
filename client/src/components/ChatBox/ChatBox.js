import { useEffect, useState } from 'react';
import { getUser } from '../../api/UserRequest';
import { getMessages, addMessage } from '../../api/MessageRequest';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';

import './ChatBox.css';

function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }

    const recieverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, recieverId });
  };

  useEffect(() => {
    console.log('Message Arrived: ', receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const renderMessages = messages.map((message) => {
    return (
      <div
        className={message?.senderId === currentUser ? 'sent' : 'recieved'}
        key={message?._id}
      >
        <p className="message-text">{message?.text}</p>
        <span className="message-time">{format(message?.createdAt)}</span>
      </div>
    );
  });

  return (
    <div className="chatbox">
      {userData && (
        <div className="header">
          <>
            <img
              src={
                userData?.profilePicture
                  ? process.env.REACT_APP_PUBLIC_FOLDER +
                    userData.profilePicture
                  : process.env.REACT_APP_PUBLIC_FOLDER + 'default.jpg'
              }
              alt=""
              className="user-img"
            />
            <div className="user-info">
              <p>
                <b>
                  {userData?.firstname} {userData?.lastname}
                </b>
              </p>
            </div>
          </>
        </div>
      )}
      <div className="messages">{renderMessages}</div>
      {userData && (
        <div className="send-text">
          <InputEmoji
            className="chat-input"
            value={newMessage}
            onChange={handleChange}
          />
          <button className="send-button" onClick={handleSend} type="submit">
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
