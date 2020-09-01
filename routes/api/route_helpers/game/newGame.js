const Game = require('../../../../models/Game');
const getNextWord = require('./getNextWord');

const newGameCallback = async (req, res) => {
  const nextWord = await getNextWord([], 5, true);
  const { userId } = req;
  const newGame = new Game({
    user: userId,
    wordsSent: [nextWord], // send result of getNextWord
    wordsGuessed: [],
    score: 0,
  });
  // console.log('new game: ', newGame);
  newGame.save().then((game) => res.json(game));
};

module.exports = newGameCallback;
