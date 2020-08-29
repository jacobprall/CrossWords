import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { NavLink } from 'react-router-dom';


export default function Navbar() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <nav>
          <div className="nav-left">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/"}>New Game</NavLink>
            <NavLink to={"/"}>Stats</NavLink>
          </div>
          <button className="nav-right" onClick={logoutUser}>Logout</button>
        </nav>
      );
    } else {
      return (
        <nav>
          <NavLink to={"/signup"}>Sign Up</NavLink>
          <NavLink to={"/login"}>Log In</NavLink>
        </nav>
      );
    }
  }

  return (
    <header>
     {getLinks()} 
    </header>
  )
}
