import './ProfilePart.css';
import Navbar from '../Navbar/Navbar';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowingCard from '../FollowingCard/FollowingCard';

function ProfilePart() {
  return (
    <div className="profile-part">
      <Navbar />
      <ProfileCard />
      <FollowingCard />
    </div>
  );
}

export default ProfilePart;
