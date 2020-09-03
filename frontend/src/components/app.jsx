import React, { useEffect } from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import { StateProvider } from './state/state'; 
import Navbar from "./nav/navbar";
import MainPage from "./main/main_page";
import SessionContainer from './session/session_container';
import { Footer } from './footer/footer'; 
import { useModal } from './custom_hooks/useModal';
import useStick from './custom_hooks/useStick'; 
import styled from 'styled-components'; 


const App = () => {
  const { stick, ele } = useStick();
  const { isShowing, toggle } = useModal();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const history = useHistory(); 
  const initialState = {};
  for (let i = 0; i < 20; i++) initialState[i + 1] = {}; 
  //grid representation: 
  // {
  //    row : { col : value },
  //    row : { col : value },
  // }
  //allows easy and efficient access to val: state[row][col] = val
  const reducer = (state, action) => {
    let nextState = { ...state };
    
    switch(action.type) {
      case 'addGridItems':
        action.gridItems.forEach(gridItem => {
          let row = Object.keys(gridItem)[0]; 
          let col = (Object.values(gridItem))[0][0]; 
          let val = (Object.values(gridItem))[0][1]; 
          nextState[row][col] = val;    
        });
        return nextState;
        default: 
          return state; 
      }
    }
  
    useEffect(() => {
    if (loggedIn) {
      toggle(false);
      history.replace("/");
    } else {
      toggle(true); 
    }
  }, [loggedIn])


  const AppContainer = styled.div`
    height: 100%; 
    position: relative; 
  `
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
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
    </StateProvider>
  )
};

export default App;
