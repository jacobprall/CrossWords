import {
  RECEIVE_ACTIVE_GAME,
  RECEIVE_GAME_DETAILS,
  RECEIVE_SAVED_GAME,
  CLEAR_GAME_STATE,
} from '../actions/game_actions';
import { combineReducers } from 'redux';

const activeGameReducer = (state = {}, { type, game, gameDetails }) => {
  Object.freeze(state);
  let nextState = { ...state }

  switch (type) {
    case RECEIVE_ACTIVE_GAME:
      return Object.assign({}, state, { [game.gameId]: game });
    case RECEIVE_GAME_DETAILS:
      nextState[gameDetails.gameId] = Object.assign({}, nextState[gameDetails.gameId], gameDetails);
      return nextState;
    case CLEAR_GAME_STATE:
      return {};
    default:
      return state;
  }
}

const clueHistoryReducer = (state=[], { type, game, gameDetails }) => {
  Object.freeze(state);
  let nextState = [...state];
  switch (type) {
    case RECEIVE_ACTIVE_GAME:
      return nextState.concat([game.nextClue]);
    case RECEIVE_GAME_DETAILS:
      return nextState.concat([gameDetails.nextWord]);
    case CLEAR_GAME_STATE:
      return [];
    default:
      return state;
  }
}

const answerHistoryReducer = (state=[], { type, gameDetails }) => {
  Object.freeze(state);
  let nextState = [...state];
  switch (type) {
    case RECEIVE_GAME_DETAILS:
      return nextState.concat([gameDetails.prevAnswer]);
    case CLEAR_GAME_STATE:
      return [];
    default:
      return state;
  }
}

const savedGameReducer = (state={}, { type, game }) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch(type) {
    default:
      return state;
  }
}

export default combineReducers({
  active: activeGameReducer,
  clueHistory: clueHistoryReducer,
  answerHistory: answerHistoryReducer,
  saved: savedGameReducer,
})