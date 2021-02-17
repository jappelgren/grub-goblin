import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Dashboard from '../Dashboard/Dashboard';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/spike">
        <img className="logo-nav" src="images/logo.png" alt="" />
      </Link>
      <div>
        {user.id && (
          <>
            <Dashboard />
            <Link className="navLink" to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
