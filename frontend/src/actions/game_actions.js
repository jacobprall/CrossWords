import { getNewGame, patchGame } from '../util/game_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_ACTIVE_GAME = 'RECEIVE_ACTIVE_GAME';
export const RECEIVE_GAME_DETAILS = 'RECEIVE_NEXT_CLUE';

const receiveActiveGame = game => ({
  type: RECEIVE_ACTIVE_GAME,
  game
});

const receiveGameDetails = gameDetails => ({
  type: RECEIVE_GAME_DETAILS,
  gameDetails
});

export const fetchNewGame = () => dispatch => getNewGame()
  .then(game => dispatch(receiveActiveGame(game)));


// gameUpdates is a POJO of the form: {gameId: String, guess: String, timeRemaining: Number, timeElapsed: Number }
export const updateGameDetails = gameUpdates => dispatch => patchGame(gameUpdates)
  .then(gameDetails => dispatch(receiveGameDetails(gameDetails)));