const Game = require('../../../../models/Game');
const getNextWord = require('./getNextWord');
const jwtDecode = require('../jwtDecode');

const newGameCallback = async (req, res) => {
  // Not sure how to use Passport to extract from the JWT...
  const jwt = req.headers.authorization.split(' ')[1];

  const { id: userId } = jwtDecode(jwt, res);
  //added
  const nextWordResult = await getNextWord([], true, 5)[0];
  const nextWord = nextWordResult[0];
  const nextIndex = nextWordResult[1];
  const nextDirection = nextWordResult[2];

  const newGame = new Game({
    user: userId,
    wordsSent: [nextWord], // send result of getNextWord
    wordsGuessed: [],
    score: 0,
    maxLength: 20,
    //added
    nextIndex,
    nextDir,
    timeRemaining: 60.0, // new games initialized with 60sec on the clock
  });
  newGame.save().then((game) => res.json(game));
};

module.exports = newGameCallback;
