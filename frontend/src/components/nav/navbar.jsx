import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { NavLink } from 'react-router-dom';
import { clearSessionErrors } from '../../actions/session_actions';

export default function Navbar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const handleAlt = (e) => {
    dispatch(clearSessionErrors());
  };
  const getLinks = () => {
    if (loggedIn) {
      return (
        <nav>
          <div className="nav-left">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/'}>New Game</NavLink>
            <NavLink to={'/'}>Stats</NavLink>
          </div>
          <button className="nav-right" onClick={logoutUser}>
            Logout
          </button>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to={'/signup'} onClick={handleAlt}>
            Sign Up
          </NavLink>
          <NavLink to={'/login'} onClick={handleAlt}>
            Log In
          </NavLink>
        </nav>
      );
    }
  };

  return <header>{getLinks()}</header>;
}
