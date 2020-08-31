import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/session_actions'
import { NavLink } from 'react-router-dom';
import { clearSessionErrors } from '../../actions/session_actions'; 
import styled from "styled-components"; 
import logo from '../../images/logo.png'; 

const NavContainer = styled.div`
  display: flex; 
  justify-content: center; 
  padding-left: 1rem; 
  padding-right: 1rem; 
  padding-top: 0.5rem; 
  padding-bottom: 0.5rem; 
  background-color:	#E8E8E8;
  border-bottom: 0.05rem solid #A0A0A0; 
  box-shadow: 0px 0px 5px #D3D3D3;
  position: ${props => props.stick ? "fixed;" : ";"}
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
  display: flex; 
`

const LoggedInNavLink = styled.div`
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

export default function Navbar({stick, ele}) {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const handleAlt = (e) => {
    dispatch(clearSessionErrors())
  }
  const getLinks = () => {
    let links; 
    if (loggedIn) {
        links = (
          <LoggedInNavigationSection>
            <Links className="nav-left">
              <LoggedInNavLink to={"/"}>Home</LoggedInNavLink>
              <LoggedInNavLink to={"/"}>New Game</LoggedInNavLink>
              <LoggedInNavLink to={"/"}>Stats</LoggedInNavLink>
            </Links>
            <LoggedInNavLink className="nav-right" onClick={logoutUser}>Logout</LoggedInNavLink>
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
    <NavContainer ref={ele} stick={stick}>
      <LogoAndLinks>
        <Logo src={logo}></Logo>
        <LinksContainer>
          {getLinks()} 
        </LinksContainer>
      </LogoAndLinks>
    </NavContainer>
  )
}



