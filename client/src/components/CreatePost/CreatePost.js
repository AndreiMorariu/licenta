import { useState, useRef } from 'react';
import './CreatePost.css';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsFiletypeGif } from 'react-icons/bs';
import { RiSurveyLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';
import { Link } from 'react-router-dom';

function CreatePost() {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [image, setImage] = useState();
  const imageRef = useRef();
  const dispatch = useDispatch();
  const description = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    description.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: description.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append('name', filename);
      data.append('file', image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <>
      <form className="create-post" onSubmit={handleSubmit}>
        <Link to={`../profile/${user._id}`}>
          <img
            src={
              user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + 'default.jpg'
            }
            className="create-post-img"
          />
        </Link>
        <div className="post-content">
          <input
            type="text"
            placeholder="What is happening?"
            ref={description}
            required
          />
          <div className="post-options">
            <div className="option" onClick={() => imageRef.current.click()}>
              <HiOutlinePhotograph size={22} className="icon" />
            </div>
            <div className="option">
              <MdOutlineLocationOn size={22} className="icon" />
            </div>
            <div className="option">
              <BsFiletypeGif size={22} className="icon" />
            </div>
            <div className="option">
              <RiSurveyLine size={22} className="icon" />
            </div>
          </div>
        </div>
        <button className="post-btn" onClick={handleSubmit}>
          Post
        </button>
      </form>
      <div style={{ display: 'none' }}>
        <input
          type="file"
          name="select-img"
          ref={imageRef}
          onChange={onImageChange}
        />
      </div>
      {image && (
        <div className="preview-image">
          <RxCross2 onClick={() => setImage(null)} className="icon" />
          <img src={URL.createObjectURL(image)}></img>
        </div>
      )}
    </>
  );
}

export default CreatePost;
