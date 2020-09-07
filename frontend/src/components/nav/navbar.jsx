import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { NavLink, Link } from 'react-router-dom';
import { clearSessionErrors } from '../../actions/session_actions';
import { useHistory } from 'react-router-dom';
import logo from '../../images/logo.png';
import styled from 'styled-components';
import regeneratorRuntime from 'regenerator-runtime';
import { clearGameState } from '../../actions/game_actions';

const NavContainer = styled.div`
  box-sizing:border-box; 
  width: 100vw; 
  position: ${(props) => (props.sticky ? 'fixed;' : 'relative;')}
  display: flex; 
  justify-content: center; 
  padding-left: 1rem; 
  padding-right: 1rem; 
  padding-top: 0.5rem; 
  padding-bottom: 0.5rem; 
  background-color: #f6f5f5;
  border-bottom: 0.05rem solid #8d93ab; 
  box-shadow: 0px 0px 5px #D3D3D3;
  z-index: 1000;
`;
const LogoAndLinks = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const LinksContainer = styled.div`
  display: flex;
`;

const LoggedInNavigationSection = styled.div`
  width: 46rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > a {
    padding: 0.5rem 0.5rem 0rem 0.5rem;
    height: 1.7rem;
    width: 6rem;
    font-weight: 350;
    text-align: center;
    background-color: #f6f5f5;
    border-radius: 0.2rem;
    border: 0.01rem solid #f1f3f8;
    &:hover {
      transition: 0.5s;
      background-color: #f6f5f5;
      cursor: pointer;
      border: 0.01rem solid #536878;
      color: #536878;
    }
  }
`;

const LogoutButton = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  width: 4rem;
  font-weight: 350;
  text-align: center;
  background-color: #536878;
  color: white;
  border-radius: 0.2rem;
  border: 0.01rem solid #4e89ae;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    background-color: #393b44;
    transition: 0.5s;
  }
`;

const SignedOutLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > a {
    padding: 0.5rem 0.5rem 0rem 0.5rem;
    color: white;
    margin-right: 10px;
    margin-left: 10px;
    width: 6rem;
    font-weight: 350;
    text-align: center;
    background-color: #536878;
    border-radius: 0.2rem;
    border: 0.01rem solid #536878;
    &:hover {
      transition: 0.3s;
      background-color: #f6f5f5;
      cursor: pointer;
      border: 0.01rem solid #536878;
      color: #536878;
    }
  }
`;

const Logo = styled.img`
  width: 11.5rem;
  height: 2rem;
`;

export default function Navbar({ sticky, ele, toggle }) {
  const [out, setOut] = useState(false);
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);

  let history = useHistory();

  const logoutUser = () => {
    dispatch(logout());
    history.push('/');
  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      if (out) logoutUser();
      setOut(false);
    }

    return () => (isSubscribed = false);
  }, [out]);

  const handleAlt = (e) => {
    dispatch(clearSessionErrors());
  };

  const handleNewGame = () => {
    toggle(false);
    dispatch(clearGameState());
  };

  const getLinks = () => {
    let links;
    if (loggedIn) {
      links = (
        <LoggedInNavigationSection>
          <NavLink to={'/home'}>Home</NavLink>
          <NavLink to={'/newGame'} onClick={() => handleNewGame()}>
            New Game
          </NavLink>
          <a href="https://github.com/jacobprall/CrossWords">Github</a>
          <LogoutButton className="nav-right" onClick={() => setOut(true)}>
            Logout
          </LogoutButton>
        </LoggedInNavigationSection>
      );
    } else {
      links = (
        <SignedOutLinks>
          <a href="https://github.com/jacobprall/CrossWords">Github</a>
          <NavLink to={'/signup'} onClick={handleAlt}>
            Sign Up
          </NavLink>
          <NavLink to={'/login'} onClick={handleAlt}>
            Log In
          </NavLink>
        </SignedOutLinks>
      );
    }

    return links;
  };

  return (
    <NavContainer sticky={sticky} ref={ele}>
      <LogoAndLinks>
        <NavLink to={'/home'}>
          <Logo src={logo}></Logo>
        </NavLink>
        <LinksContainer>{getLinks()}</LinksContainer>
      </LogoAndLinks>
    </NavContainer>
  );
}
