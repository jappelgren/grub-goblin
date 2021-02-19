import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Dashboard from '../Dashboard/Dashboard';

function Nav({ searchText, setSearchText, search }) {
  const user = useSelector((store) => store.user);
  

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const sanitizedSearchText = (event) => {
    const re = new RegExp('[^a-zA-Z0-9\\s]', 'gi');
    let sanitizedText = event.replace(re, '');
    setSearchText(sanitizedText);
  };

  return (
    <div className="nav">
      <Link to="/spike">
        <img className="logo-nav" src="images/logo.png" alt="" />
      </Link>
      <div>
        {user.id && (
          <>
            <input
              type="search"
              onChange={(event) => sanitizedSearchText(event.target.value)}
              value={searchText}
            />
            <Dashboard className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
