import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { NavLink, Link } from 'react-router-dom';
import { clearSessionErrors } from '../../actions/session_actions';
import { Route, Redirect } from 'react-router-dom';
import logo from '../../images/logo.png'
import styled from 'styled-components';
import regeneratorRuntime from "regenerator-runtime";

const NavContainer = styled.div`
  box-sizing:border-box; 
  width: 100vw; 
  position: ${props => props.sticky ? "fixed;" : "relative;"}
  display: flex; 
  justify-content: center; 
  padding-left: 1rem; 
  padding-right: 1rem; 
  padding-top: 0.5rem; 
  padding-bottom: 0.5rem; 
  background-color: #E8E8E8;
  border-bottom: 0.05rem solid #A0A0A0; 
  box-shadow: 0px 0px 5px #D3D3D3;
  z-index: 3;
`
const LogoAndLinks = styled.div`
  display: flex; 
  width: 100%; 
  justify-content: space-between; 
  align-items: center; 
`

const LinksContainer = styled.div`
  display: flex; 
`

const LoggedInNavigationSection = styled.div`
  width: 30rem; 
  display: flex; 
  justify-content: space-around; 
  align-items: center; 
`

const LoggedInNavLink = styled(NavLink)`
    padding: 0.5rem 0.5rem 0rem 0.5rem; 
    height: 1.7rem; 
    width: 6rem;
    font-weight: 600; 
    text-align: center; 
    background-color: #A8A8A8; 
    border-radius: 0.2rem; 
    &:hover {
      background-color: #696969; 
    cursor: pointer; 
  }
`

const LogoutButton = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 0.5rem; 
    width: 4rem;
    font-weight: 600; 
    text-align: center; 
    background-color: #A8A8A8; 
    border-radius: 1rem; 
    &:hover {
      background-color: #696969; 
    cursor: pointer; 
`

const Links = styled.div`
  width: 10.5rem; 
  display: flex;
  justify-content: space-between;  
  align-items: center; 
`

const SignUpAndLogin = styled(NavLink)`
  padding: 0.5rem 0.5rem 0rem 0.5rem; 
  width: 4rem;
  font-weight: 600; 
  text-align: center; 
  background-color: #A8A8A8; 
  border-radius: 0.2rem; 
  &:hover {
    background-color: #696969; 
    cursor: pointer; 
  }
`

const Logo = styled.img`
  width: 11.5rem; 
  height: 2rem; 
`

export default function Navbar({sticky, ele}) {
  const [out, setOut] = useState(false); 
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const logoutUser = async () => {
    await dispatch(logout());
    return <Route
      render={props => <Redirect to="/" />}
      />
  };

  useEffect(() => {
    let isSubscribed = true; 
    if (out) logoutUser();
    setOut(false);  
    return () => isSubscribed = false; 
  }, [out])

  const handleAlt = (e) => {
    dispatch(clearSessionErrors());
  };

  

  const getLinks = () => {
    let links;
    if (loggedIn) {
      links = (
        <LoggedInNavigationSection>
          <LoggedInNavLink to={"/"}>Home</LoggedInNavLink>
          <LoggedInNavLink to={"/"}>New Game</LoggedInNavLink>
          <LoggedInNavLink to={"/"}>Stats</LoggedInNavLink>
          <LogoutButton className="nav-right" onClick={() => setOut(true)}>Logout</LogoutButton>
        </LoggedInNavigationSection>
      )
    } else {
      links = (
        <Links>
          <SignUpAndLogin to={"/signup"} onClick={handleAlt}>Sign Up</SignUpAndLogin>
          <SignUpAndLogin to={"/login"} onClick={handleAlt}>Log In</SignUpAndLogin>
        </Links>
      )

    }

    return links;
  }

  return (
    <NavContainer sticky={sticky} ref={ele}>
      <LogoAndLinks>
        <NavLink to={"/"}>
          <Logo src={logo}></Logo>
        </NavLink>
        <LinksContainer>
          {getLinks()}
        </LinksContainer>
      </LogoAndLinks>
    </NavContainer>
  )
}