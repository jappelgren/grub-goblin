import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import LoginPage from '../LoginPage/LoginPage';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import RegisterPage from '../RegisterPage/RegisterPage';
import Spinner from '../Spinner/Spinner';
import './App.css';

Nav.setAppElement;

function App() {
  const dispatch = useDispatch();
  //spinnerReducer is a boolean indicating if something loading or not.  Which triggers the spinner.
  const spinnerReducer = useSelector((state) => state.spinnerReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div>
          <div className={spinnerReducer ? 'disable-dom' : ''}></div>
          {spinnerReducer && <Spinner />}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}

            <ProtectedRoute exact path="/home">
              <Dashboard />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/home"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/home"
            >
              <RegisterPage />
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
