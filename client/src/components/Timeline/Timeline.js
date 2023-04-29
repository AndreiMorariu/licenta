import './Timeline.css';
import CreatePost from '../CreatePost/CreatePost';
import Posts from '../Posts/Posts';
function Timeline() {
  return (
    <div className="timeline">
      <div className="home-text">Home</div>
      <CreatePost />
      <Posts />
    </div>
  );
}

export default Timeline;
