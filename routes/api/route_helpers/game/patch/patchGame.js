const Game = require('../../../../../models/Game');
const { updateGameState, getNewGameState } = require('./utils');
const getNextWord = require('../getNextWord');

module.exports = (req, res) => {
  Game.findById(req.params.id)
    .then((game) => getNewGameState(game, req.body))
    .then(updateGameState)
    .then(async (game) => {
      // Generate a new clue based on current conditions
      const [nextWord, nextIndex, nextDir] = await getNextWord(
        game.wordsGuessed,
        // game.answersSent
        game.maxLength || 12,
        game.dir || false,
      );

      const { id, clue, difficulty, len } = nextWord;

      const returnObject = {
        timer: game.timer,
        score: game.score,
        nextClue: {
          id,
          clue,
          difficulty,
          len,
        },
        nextIndex,
        nextDir,
      };

      return returnObject;
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).json(err);
    });

  // newGame.wordsGuessed = req.wordsGuessed;
};

// router.get('/test2', async (req, res) => {
//   const { maxLength, direction, guessedWords, answersList } = req.body;
//   const guessed = JSON.parse(guessedWords);
//   const dir = JSON.parse(direction);
//   const answersSent = JSON.parse(answersList);
//   const nextWord = await getNextWord(guessed, dir, maxLength, answersSent);
//   res.json(nextWord);
// });
