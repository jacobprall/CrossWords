import { getNewGame, patchGame } from '../util/game_util';

export const RECEIVE_GAME = 'RECEIVE_GAME';
export const RECEIVE_GAME_DETAILS = 'RECEIVE_NEXT_CLUE';

const receiveGame = game => ({
  type: RECEIVE_GAME,
  game
});

const receiveGameDetails = gameDetails => ({
  type: RECEIVE_GAME_DETAILS,
  gameDetails
});

export const fetchNewGame = () => dispatch => getNewGame()
  .then(game => dispatch(receiveGame(game)));


// gameUpdates is a POJO of the form: { gameId: String, timeRemaining: Number, timeElapsed: Number }
export const updateGameDetails = gameUpdates => dispatch => patchGame(gameUpdates)
  .then(gameDetails => dispatch(receiveGameDetails(gameDetails)));