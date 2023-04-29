import './Home.css';
import ProfilePart from '../../components/ProfilePart/ProfilePart';
import Timeline from '../../components/Timeline/Timeline';
import Trends from '../../components/Trends/Trends';

function Home() {
  return (
    <div className="homepage">
      <ProfilePart />
      <Timeline />
      <Trends />
    </div>
  );
}

export default Home;
