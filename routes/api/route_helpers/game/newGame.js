const Game = require('../../../../models/Game');
const getNextWord = require('./getNextWord');
const jwtDecode = require('../jwtDecode');

const newGameCallback = async (req, res) => {
  // Not sure how to use Passport to extract from the JWT...
  const jwt = req.headers.authorization.split(' ')[1];

  const { id: userId } = jwtDecode(jwt, res);
  // const userId = '5f4d6d062bc236d9becf318e';
  const [nextWord, overlap, nextDirection] = await getNextWord(
    [],
    [],
    true,
    15,
  );

  const { _id, clue, length } = nextWord;
  const newGame = new Game({
    user: userId,
    wordsSent: [_id], // send result of getNextWord
    wordsGuessed: [],
    score: 0,
    timer: 60,
    overlap,
    nextDirection,
  });

  newGame
    .save()
    .then((game) => {
      const { score, wordsSent, wordsGuessed } = game;
      const returnObj = {
        gameId: game.id,
        score,
        wordsSent,
        wordsGuessed,
        nextWord: { _id, clue, length },
      };
      res.json(returnObj);
    })
    .catch((err) => res.status(406).json(err));
};

module.exports = newGameCallback;
