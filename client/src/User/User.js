import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../actions/UserAction';
import { useState } from 'react';

function User({ person }) {
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      {' '}
      <img
        src={
          person.profilePicture
            ? serverPublic + person.profilePicture
            : serverPublic + 'default.jpg'
        }
        className="follower-img"
      />
      <div className="follower-details">
        <p className="follower-name">{person.firstname}</p>
        <p className="follower-username">{person.lastname}</p>
      </div>
      <button className="followers-follow-btn" onClick={handleFollow}>
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}

export default User;
