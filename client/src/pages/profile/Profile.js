import './Profile.css';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Timeline from '../../components/Timeline/Timeline';
import Trends from '../../components/Trends/Trends';
function Profile() {
  return (
    <div className="profile">
      <ProfileLeft />

      <div className="main-profile">
        <ProfileCard location="profilePage" />
        <Timeline />
      </div>

      <Trends />
    </div>
  );
}

export default Profile;
