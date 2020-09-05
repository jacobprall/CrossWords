import axios from 'axios'

export const getClueAnswer = wordId => {
  const token = localStorage.getItem('jwtToken');
  axios.defaults.headers.common['Authorization'] = token;
  return axios.get(`/api/words/${wordId}`);
}
