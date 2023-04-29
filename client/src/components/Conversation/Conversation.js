import { useEffect, useState } from 'react';
import { getUser } from '../../api/UserRequest';
import './Conversation.css';

function Conversation({ data, currentUser }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="conversation">
      <img
        src={
          userData?.profilePicture
            ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
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
        <p>Online</p>
      </div>
    </div>
  );
}

export default Conversation;
