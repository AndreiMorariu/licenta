import { useSelector } from 'react-redux';
import './Post.css';
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { likePost } from '../../api/PostsRequest';

function Post({ data }) {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [author, setAuthor] = useState('');

  console.log(data);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('http://localhost:5000/user');
      let dataRes = await response.json();
      dataRes = dataRes.filter((userArr) => userArr._id === data.userId);
      setAuthor(`${dataRes[0].firstname} ${dataRes[0].lastname}`);
    };
    getUsers();
  }, [user]);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleDelte = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId: data.userId }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    window.location.reload();
  };

  // return (
  //   <div className="post">
  //     <img
  //       src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''}
  //     />
  //     <div className="post-info">
  //       <p>
  //         <b>{user.firstname + ' ' + user.lastname}</b>
  //       </p>
  //       <span>{data.desc}</span>
  //     </div>
  //     <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
  //       {likes} likes
  //     </span>
  //     <div className="post-react">
  //       {liked ? (
  //         <AiFillLike size={30} onClick={handleLike} />
  //       ) : (
  //         <AiOutlineLike size={30} onClick={handleLike} />
  //       )}
  //       <AiOutlineComment size={30} />
  //       <AiOutlineShareAlt size={30} />
  //     </div>
  //     {data.userId === user._id && (
  //       <button onClick={() => handleDelte(data._id)} className="delete-post">
  //         Delete
  //       </button>
  //     )}
  //   </div>
  // );
  return (
    <div className="post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''}
      />
      <div className="post-info">
        <p>
          <b>{author}</b>
        </p>
        <span>{data.desc}</span>
      </div>
      <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
        {likes} likes
      </span>
      <div className="post-react">
        {liked ? (
          <AiFillLike size={30} onClick={handleLike} />
        ) : (
          <AiOutlineLike size={30} onClick={handleLike} />
        )}
        <AiOutlineComment size={30} />
        <AiOutlineShareAlt size={30} />
      </div>
      {data.userId === user._id && (
        <button onClick={() => handleDelte(data._id)} className="delete-post">
          Delete
        </button>
      )}
    </div>
  );
}

export default Post;
