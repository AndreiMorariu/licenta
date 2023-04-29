import './ProfileLeft.css';
import Navbar from '../Navbar/Navbar';
import InfoCard from '../InfoCard/InfoCard';
import FollowingCard from '../FollowingCard/FollowingCard';

function ProfileLeft() {
  return (
    <div className="profile-left">
      <Navbar />
      <InfoCard />
      <FollowingCard />
    </div>
  );
}

export default ProfileLeft;
