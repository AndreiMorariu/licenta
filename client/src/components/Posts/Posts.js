import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTimelinePosts } from '../../actions/postAction';
import { useParams } from 'react-router-dom';

function Posts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts } = useSelector((state) => state.postReducer);
  console.log(posts);
  const params = useParams();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  const renderPosts = posts?.map((post, id) => {
    return <Post data={post} key={id} />;
  });

  return <div className="posts">{renderPosts}</div>;
}

export default Posts;
