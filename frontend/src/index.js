import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import { fetchNewGame, updateGameDetails } from './actions/game_actions';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/#/login';
    }
  } else {
    store = configureStore({});
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchNewGame = fetchNewGame;
  window.updateGameDetails = updateGameDetails;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
