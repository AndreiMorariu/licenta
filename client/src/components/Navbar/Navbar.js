import './Navbar.css';
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiCommentDetail, BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/AuthAction';

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar">
      <div className="nav-icons">
        <Link to={'../home'}>
          <AiOutlineHome size={20} />
        </Link>
        <Link to={'../chat'}>
          <BiCommentDetail size={20} />
        </Link>
        <BiLogOut size={20} onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Navbar;
