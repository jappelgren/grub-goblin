import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form autocomplete="off" className="formPanel" onSubmit={registerUser}>
      <img src="images/logo.png" alt="The Grub Goblin logo." />
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="input-label-container">
        <label htmlFor="username" className="label">
          Username:
        </label>
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="input-label-container">
        <label htmlFor="password" className="label">
          Password:
          </label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <input className="goblin-button" type="submit" name="submit" value="Register" />
      </div>
      <button
        type="button"
        className="button-link"
        onClick={() => {
          history.push('/login');
        }}
      >
        Login
      </button>
    </form>
  );
}

export default RegisterForm;
