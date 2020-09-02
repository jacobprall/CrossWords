import { getNewGame, patchGame } from '../util/game_util';

export const RECEIVE_GAME = 'RECEIVE_GAME';

const receiveGame = game => ({
  type: RECEIVE_GAME,
  game
});

export const updateGameState = (gameId, timeRemaining, timeElapsed) => dispatch => {
  return patchGame(gameId, timeRemaining, timeElapsed)
  .then(game => dispatch(receiveGame(game)))
};