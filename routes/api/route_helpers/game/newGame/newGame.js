/* eslint-disable no-underscore-dangle */
const Game = require('../../../../../models/Game');
const User = require('../../../../../models/User');
// const getNextWord = require('./getNextWord');
const { getFirstWord } = require('./utils');
const jwtDecode = require('../../jwtDecode');

const newGameCallback = async (req, res) => {
  const jwt = req.headers.authorization.split(' ')[1];

  const { id: userId } = jwtDecode(jwt, res);
  const nextWord = await getFirstWord().then((wrd) => wrd);
  const { boardWidth, colStart } = req.body;
  const newGame = new Game({
    boardWidth,
    colStart,
    user: userId,
    wordsGuessed: [],
    wordsSent: [nextWord._id],
    wordsStartCol: [colStart],
    score: 0,
    timeRemaining: 60.0,
    timeElapsed: 0.0,
  });

  const { _id, clue, length } = nextWord;

  newGame
    .save()
    .then((game) => {
      const { score, wordsSent, wordsGuessed } = game;
      const returnObj = {
        gameId: game.id,
        score,
        wordsSent,
        wordsGuessed,
        nextWord: { _id, clue, length, colStart },
      };

      User.updateOne({ _id: userId }, { $push: { games: game.id } }).exec();
      res.json(returnObj);
    })
    .catch((err) => res.status(406).json(err));
};

module.exports = newGameCallback;
