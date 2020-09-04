/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const Game = require('../../../../../models/Game');
const Word = require('../../../../../models/Word');
const { guessSchema } = require('../validations');
const { updateGameState, getNewGameState } = require('./utils');
const getNextWord = require('./getNextWord');

/**
 * Receive a guessed word and retrieve the next clue and updated game state
 * @param {Object} req.body Express req object
 * @param {String} req.body.gameId - ID of the current game
 * @param {String} req.body.guess  - Guess of the current clue
 * @param {Integer} req.body.timeRemaining  - Seconds left on the clock
 * @param {Integer} req.body.timeElapsed  - Seconds elapsed in this game
 * @returns {gameDetails}
 */
const patchGameCallback = (req, res) => {
  const { error, value: cleanedReqBody } = guessSchema.validate(req.body, {
    stripUnknown: true,
  });
  if (error) res.status(400).json(error.details);

  return Game.findById(req.params.gameId)
    .then((game) => getNewGameState(game, cleanedReqBody))
    .then(updateGameState)
    .then(async (game) => {
      const [nextWord, overlap, colStart] = await getNextWord(game);
      const { wordsGuessed } = game
      const prevGuess = wordsGuessed[wordsGuessed.length - 1]
      const prevWordId = game.wordsSent[game.wordsSent.length - 1];
      const prevWord = await Word.findById(prevWordId, { answer: 1 });

      game.wordsSent.push(nextWord._id);
      game.wordsStartCol.push(colStart);

      game = await game.save().then((g) => g);

      const { id, clue, difficulty, length } = nextWord;

      const returnObject = {
        gameId: game._id,
        timeRemaining: game.timeRemaining,
        timeElapsed: game.timeElapsed,
        score: game.score,
        nextWord: {
          id,
          clue,
          difficulty,
          length,
          colStart,
        },
        overlap,
        nextDir: overlap < 0,
        prevAnswer: prevWord.answer,
        prevGuess
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

module.exports = patchGameCallback;
