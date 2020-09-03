import axios from 'axios'

export const getNewGame = () => {
  const token = JSON.parse(localStorage.getItem('jwtToken'));
  axios.defaults.headers.common['Authorization'] = token;
  return axios.get('/api/games/new');
}

export const patchGame = ({ gameId, guess, timeRemaining, timeElapsed }) => {
  const token = JSON.parse(localStorage.getItem('jwtToken'));
  axios.defaults.headers.common['Authorization'] =  token;
  return axios.patch(`api/games/${gameId}`, { guess, timeRemaining, timeElapsed });
}