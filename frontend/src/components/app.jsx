import React, { useState, useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { StateProvider } from './custom_hooks/useState';
import Navbar from './nav/navbar';
import MainPage from './main/game_page';
import SessionContainer from './session/session_container';
import { mainReducer, initialState } from './react_reducers/main_reducer';
import { Footer } from './footer/footer';
import { useModal } from './custom_hooks/useModal';
import 'normalize.css';
import SplashPage from './main/splash_page';

const App = () => {
  const { isShowing, toggle } = useModal();
  const loggedIn = useSelector((state) => state.session.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      toggle(false);
      history.replace('/');
    } else {
      toggle(true);
    }
  }, [loggedIn]);

  const endGame = () => {
    toggle(true);
  };

  const AppContainer = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
  `;
  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <AppContainer>

        <Navbar
          toggle={toggle}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/newGame"
            component={MainPage}
            endGame={endGame}
            isShowing={isShowing}
          />
          <ProtectedRoute exact path="/home" component={SplashPage} />
          <AuthRoute exact path="/" component={SplashPage} />
          <AuthRoute
            exact
            path="/login"
            component={SessionContainer}
            isShowing={isShowing}
          />
          <AuthRoute
            exact
            path="/signup"
            component={SessionContainer}
            isShowing={isShowing}
          />
        </Switch>
        <Footer loggedIn={loggedIn} />
      </AppContainer>
    </StateProvider>
  );
};

export default App;
