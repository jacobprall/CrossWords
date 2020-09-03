import {
  RECEIVE_GAME_ERRORS,
} from '../actions/game_actions';

export default (state = [], { type, errors }) => {
  Object.freeze(state);
  let nextState = { ...state }

  switch (type) {
    case RECEIVE_GAME_ERRORS:
      return errors;
    default:
      return state;
  }
}