const Game = require('../../../../models/Game');
const getNextWord = require('./getNextWord');
const jwtDecode = require('../jwtDecode');

const newGameCallback = async (req, res) => {
  // Not sure how to use Passport to extract from the JWT...
  // const jwt = req.headers.authorization.split(' ')[1];

  // const { id: userId } = jwtDecode(jwt, res);
  const userId = '5f4d6d062bc236d9becf318e';
  //added
  const nextWordResult = await getNextWord([], [], true, 15);
  const nextClue = nextWordResult[0];
  const overlap = nextWordResult[1];
  const nextDir = nextWordResult[2];
  const { _id, clue, length } = nextClue;
  const newGame = new Game({
    user: userId,
    wordsSent: [_id], // send result of getNextWord
    wordsGuessed: [],
    score: 0,
    timeRemaining: 60.0,
    timeElapsed: 0.0,
    overlap,
    nextDir,

  });
  const gameObj = await newGame.save().then((game) => ({
    gameId: game._id,
    timeRemaining: game.timeRemaining,
    timeElapsed: game.timeElapsed,
    score: game.score,
    wordsSent: game.wordsSent,
    wordsGuessed: game.wordsGuessed,
    nextClue: { _id, clue, length },
  }));
  res.json(gameObj);
};

module.exports = newGameCallback;
