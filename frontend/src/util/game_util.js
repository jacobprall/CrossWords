import axios from 'axios'

export const getNewGame = (boardWidth, colStart) => {
  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = token;
  return axios.get('/api/games/new',
  // { boardWidth, colStart }
  );
}

export const patchGame = ({ gameId, guess, timeRemaining, timeElapsed }) => {
  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] =  token;
  return axios.patch(`api/games/${gameId}`, { guess, timeRemaining, timeElapsed });
}
