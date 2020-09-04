const newGameCallback = require('./newGame');
const getNextWord = require('./patch/getNextWord');
const patchGame = require('./patch/patchGame');
const getPlayedGameCallback = require('./getPlayedGame');

module.exports = {
  newGameCallback,
  getNextWord,
  patchGame,
  getPlayedGameCallback,
};
