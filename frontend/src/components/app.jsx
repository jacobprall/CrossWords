import React, { useState, useEffect } from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import { StateProvider } from './state/state'; 
import Navbar from "./nav/navbar";
import MainPage from "./main/main_page";
import SessionContainer from './session/session_container';
import { StatsPage } from './stats/stats';
import { mainReducer, initialState } from './react_reducers/main_reducer';
import { Footer } from './footer/footer'; 
import { useModal } from './custom_hooks/useModal';
import useStick from './custom_hooks/useStick'; 
import styled from 'styled-components'; 

const App = () => {
  const { stick, ele } = useStick();
  const { isShowing, toggle } = useModal();
  const [secondsElapsed, setSecondsElapsed] = useState(); 
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const history = useHistory(); 
  
  useEffect(() => {
    if (loggedIn) {
      toggle(false);
      history.replace("/");
    } else {
      toggle(true); 
    }
  }, [loggedIn])

  const endGame = () => {
    toggle(true); 
  }

  const AppContainer = styled.div`
    height: 100%; 
    position: relative; 
  `
  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <AppContainer>
        <Navbar sticky={stick} ele={ele}/>
        <Switch>
          <ProtectedRoute exact path="/newGame" component={MainPage} endGame={endGame} isShowing={isShowing}/>
          <ProtectedRoute exact path="/stats" component={StatsPage}/>
          <AuthRoute exact path="/login" component={SessionContainer} isShowing={isShowing}/>
          <AuthRoute exact path="/signup" component={SessionContainer} isShowing={isShowing}/>
        </Switch>
        <Footer loggedIn={loggedIn}/>
      </AppContainer>
    </StateProvider>
  )
};

export default App;
