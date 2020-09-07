import axios from 'axios'

export const getClueAnswer = wordId => {
  if (!wordId) return null;
  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = axios.defaults.headers.common['Authorization'] || token;
  return axios.get(`/api/words/${wordId}`);
}