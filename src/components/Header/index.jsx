import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaSignOutAlt,
  FaUserAlt,
  FaPowerOff,
  FaCircle,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from './styled';
import * as actions from '../../store/mudules/auth/actions';

function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout(e) {
    e.preventDefault();

    dispatch(actions.loginFailure());
    navigate('/login');
  }
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>

      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={(e) => handleLogout(e)} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignOutAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}
    </Nav>
  );
}

export default Header;
