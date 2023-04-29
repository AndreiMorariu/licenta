import { useEffect, useState } from 'react';
import './InfoCard.css';
import { AiOutlineEdit } from 'react-icons/ai';
import InfoModal from '../InfoModal/InfoModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest';

function InfoCard() {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();

  const userId = params.id;
  const [profileUser, setProfileUser] = useState({});

  useEffect(() => {
    const getProfileUser = async () => {
      if (userId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(userId);
        setProfileUser(profileUser);
      }
    };
    getProfileUser();
  }, [user]);

  return (
    <div className="info-card">
      <h3>Profile Info</h3>
      {user._id === userId ? (
        <>
          {' '}
          <AiOutlineEdit size={25} onClick={() => setModal(!modal)} />
          <InfoModal modal={modal} setModal={setModal} data={user} />
        </>
      ) : (
        ''
      )}
      <div className="infos">
        <p className="info">
          <b>Status:</b> <span>{profileUser.relationship}</span>
        </p>
        <p className="info">
          <b>Lives in:</b> <span>{profileUser.livesin}</span>
        </p>
        <p className="info">
          <b>Works at:</b> <span>{profileUser.worksAt}</span>
        </p>
      </div>
    </div>
  );
}

export default InfoCard;
