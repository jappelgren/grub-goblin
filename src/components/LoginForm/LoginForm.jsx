import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form autocomplete="off" className="formPanel" onSubmit={login}>
      <img src="images/logo.png" alt="The Grub Goblin logo." />
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className="input-label-container">
        <label htmlFor="username" className="label">
          Username:
        </label>
        <input
          type="text"
          name="username"
          required
          value={username}
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
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <input
          className="goblin-button"
          type="submit"
          name="submit"
          value="Log In"
        />
      </div>
      <button
        type="button"
        className="button-link"
        onClick={() => {
          history.push('/registration');
        }}
      >
        Create a New Account
      </button>
    </form>
  );
}

export default LoginForm;
