import React, { useEffect } from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import Navbar from "./nav/navbar";
import MainPage from "./main/main_page";
import SessionContainer from './session/session_container';
import { Footer } from './footer/footer'; 
import { useModal } from './custom_hooks/useModal';
import useStick from './custom_hooks/useStick'; 
import styled from 'styled-components'; 
// import { GridContainer } from './grid/grid_container'; 

const App = () => {
  const { stick, ele } = useStick();
  const { isShowing, toggle } = useModal();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const history = useHistory(); 

  useEffect(() => {
    if (loggedIn) {
      toggle(false);
      history.push("/");
    } else {
      toggle(true); 
    }
  }, [loggedIn])


  const AppContainer = styled.div`
    height: 100%; 
    position: relative; 
  `
 
  return (
    <AppContainer>
      <Navbar sticky={stick} ele={ele}/>
      <Switch>
        <ProtectedRoute exact path="/" component={MainPage}/>
        <ProtectedRoute exact path="/newGame" component={MainPage}/>
        <AuthRoute exact path="/login" component={SessionContainer} isShowing={isShowing}/>
        <AuthRoute exact path="/signup" component={SessionContainer} isShowing={isShowing}/>
      </Switch>
      <Footer loggedIn={loggedIn}/>
    </AppContainer>
  )
};

export default App;
