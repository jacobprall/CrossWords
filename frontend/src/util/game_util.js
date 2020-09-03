export const getNewGame = () => axios.get('/api/games/new');

export const patchGame = ({ gameId, guess, timeRemaining, timeElapsed }) => {
  return axios.patch(`api/games/${gameId}`, { guess, timeRemaining, timeElapsed });
}