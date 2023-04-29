import { useState } from 'react';
import './InfoModal.css';
import { Modal, useMantineTheme } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction';
import { updateUser } from '../../actions/UserAction';

function InfoModal({ modal, setModal, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      e.target.name === 'profilePicture'
        ? setProfileImage(image)
        : setCoverImage(image);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName);
      data.append('file', profileImage);
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName);
      data.append('file', coverImage);
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(params.id, userData));
    setModal(false);
  };

  return (
    <Modal
      overlaycolor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayopacity={0.55}
      overlayblur={3}
      size="55%"
      opened={modal}
      onClose={() => setModal(false)}
    >
      <form>
        <h3>Your info</h3>
        <div className="form-control">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            name="worksAt"
            placeholder="Works At"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            name="livesin"
            placeholder="Lives In"
            onChange={handleChange}
            value={formData.livesin}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>
        <div className="form-control">
          <input
            type="text"
            name="relationship"
            placeholder="Relationship Status"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div className="select-images">
          <div className="form-group">
            <label htmlFor="profile-image">Profile image</label>
            <input
              type="file"
              id="profile-image"
              name="profilePicture"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cover-image">Cover image</label>
            <input
              type="file"
              id="cover-image"
              name="coverPicture"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <button type="submit" className="save-changes" onClick={handleSubmit}>
          Save Changes
        </button>
      </form>
    </Modal>
  );
}

export default InfoModal;
