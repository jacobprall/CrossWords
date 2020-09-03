/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const Game = require('../../../../../models/Game');
const { updateGameState, getNewGameState } = require('./utils');
const getNextWord = require('../getNextWord');

module.exports = (req, res) => {
  return Game.findById(req.params.id)
    .then((game) => getNewGameState(game, req.body))
    .then(updateGameState)
    .then(async (game) => {
      // Generate a new clue based on current conditions
      // REMOVE JSON FOR PRODUCTION

      const [nextWord, overlap, nextDir] = await getNextWord(
        game.wordsGuessed,
        game.wordsSent,
        game.nextDir || false,
        game.maxLength || 12,
      );
      game.wordsSent.push(nextWord._id);
      game = await game.save();

      const { id, clue, difficulty, length } = nextWord;

      const returnObject = {
        timeRemaining: game.timeRemaining,
        gameId: game._id,
        score: game.score,
        nextClue: {
          id,
          clue,
          difficulty,
          length,
        },
        overlap,
        nextDir,
      };

      res.json(returnObject);
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
