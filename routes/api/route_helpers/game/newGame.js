const Game = require('../../../../models/Game');
const getNextWord = require('./getNextWord');
const jwtDecode = require('../jwtDecode');

const newGameCallback = async (req, res) => {
  // Not sure how to use Passport to extract from the JWT...
  const jwt = req.headers.authorization.split(' ')[1];

  const { id: userId } = jwtDecode(jwt, res);
  const nextWord = await getNextWord([], true, 5);

  const newGame = new Game({
    user: userId,
    wordsSent: [nextWord], // send result of getNextWord
    wordsGuessed: [],
    score: 0,
  });
  newGame.save().then((game) => res.json(game));
};

module.exports = newGameCallback;
