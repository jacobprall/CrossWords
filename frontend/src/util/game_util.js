import axios from 'axios'

export const getNewGame = () => axios.get('/api/games/new');

export const patchGame = (gameId, timeRemaining, timeElapsed) => {
  return axios.patch(`api/games/${gameId}`, {
    timeRemaining,
    timeElapsed,
  });
}