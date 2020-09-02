import { RECEIVE_GAME } from '../actions/game_actions';

export default (state={}, { type, game }) => {
  Object.freeze(state);

  switch(type) {
    case RECEIVE_GAME:
      return Object.assign({}, state, game);
    default:
      return state;
  }
}