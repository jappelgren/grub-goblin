import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      <img src="images/iconmonstr-log-out-9.svg" alt=""/>
      <p>Log Out</p>
    </button>
  );
}

export default LogOutButton;
