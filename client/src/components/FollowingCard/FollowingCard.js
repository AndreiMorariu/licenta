import './FollowingCard.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../api/AuthRequest';
import User from '../../User/User';

function FollowingCard() {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const getPersons = async () => {
      const { data } = await getAllUsers();
      setPersons(data);
    };
    getPersons();
  }, []);

  const renderFollowers = persons.map((person, _id) => {
    if (person._id !== user._id) return <User person={person} key={_id} />;
  });

  return (
    <div className="followers-card">
      <h3>People You May Know</h3>
      <ul>{renderFollowers}</ul>
    </div>
  );
}

export default FollowingCard;
