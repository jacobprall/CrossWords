import { RECEIVE_GAME, RECEIVE_GAME_DETAILS } from '../actions/game_actions';

export default (state={}, { type, game, gameDetails }) => {
  Object.freeze(state);
  let nextState = { ...state }

  switch(type) {
    case RECEIVE_GAME:
      return Object.assign({}, state, { [game._id]: game });
    case RECEIVE_GAME_DETAILS:
      nextState[gameDetails.gameId] = Object.assign({}, nextState[gameDetails.gameId], gameDetails);
      return nextState;
    default:
      return state;
  }
}