import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
} from '../actions/session_actions';

import { RECEIVE_ACTIVE_GAME } from '../actions/game_actions';

const initialState = {
  isAuthenticated: false,
  user: {},
  activeGame: null,
};

export default function (state = initialState, action) {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
        activeGame: null,
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
        activeGame: null,
      };
    case RECEIVE_ACTIVE_GAME:
      nextState.activeGame = action.game.gameId;
      return nextState;
    default:
      return state;
  }
}
