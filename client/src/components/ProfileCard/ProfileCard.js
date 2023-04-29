import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ProfileCard.css';

function ProfileCard({ location }) {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  return (
    <div className="profile-card">
      <div className="images">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + 'default-background.jpg'
          }
          className="cover-img"
        />
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + 'default.jpg'
          }
          className="profile-img"
        />
      </div>
      <div className="text-content">
        <div className="profile-name">
          <p className="username">
            {user.firstname} {user.lastname}
          </p>
          <p className="status">{user.worksAt ? user.worksAt : ''}</p>
        </div>

        <div className="follow-information">
          <p className="stat">
            Followers: <span className="number">{user.followers.length}</span>
          </p>
          <p className="stat">
            Following: <span className="number">{user.following.length}</span>
          </p>
          {location === 'profilePage' && (
            <p className="stat">
              Posts:{' '}
              <span className="number">
                {posts.filter((post) => post.userId === user._id).length}
              </span>
            </p>
          )}
        </div>
      </div>

      {location === 'profilePage' || (
        <button className="profile-btn">
          <Link style={{ color: 'var(--white)' }} to={`/profile/${user._id}`}>
            My Profile
          </Link>{' '}
        </button>
      )}
    </div>
  );
}

export default ProfileCard;
