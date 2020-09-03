import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import GameErrorsReducer from './game_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  game: GameErrorsReducer,
});
