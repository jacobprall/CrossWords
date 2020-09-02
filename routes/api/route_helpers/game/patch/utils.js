const moment = require('moment');

const Word = require('../../../../../models/Word');

// Check to see if the submitted word was correct
//   Determine how many points that was worth
//   Determine how much time is added
const handleTime = (isCorrect, difficulty, length, timeRemaining) => {};

const handleScore = (isCorrect, difficulty, length, timeRemaining) => {};

/**
 * Checks to see if guess is correct, calculates score/timer updates
 * @param {Object: {}} guess - Guess object coming from user submittal
 * @returns {Integer} scoreChange
 * @returns {Integer} secondsChange
 */
const checkGuess = (guess) => {
  Word.findById(guess.word)
    .then(async (word) => {
      let isCorrect = word.answer === guess.guessWord;
      let difficulty = word.difficulty;
      let length = word.len;
      //let timeRemaining =
      let secondsChange = handleTime(
        isCorrect,
        difficulty,
        length,
        timeRemaining,
      );
      let scoreChange = handleScore(
        isCorrect,
        difficulty,
        length,
        timeRemaining,
      );

      // return {
      //      scoreChange,
      //      secondsChange
      // }
      //
    })
    .catch((err) => err);
};

const updateGameState = ({ game, guess, secondsChange, scoreChange }) => {
  const { score, timer } = game;
  const newScore = score + scoreChange;
  const newTimer = moment(timer).add(secondsChange, 'seconds');

  return game.update({
    $set: {
      score: newScore,
      timer: newTimer,
    },
    $push: {
      wordsGuessed: guess.guessedWord,
    },
  });
};

const getNewGameState = async (game, reqBody) => {
  const { guess } = reqBody;

  const result = await checkGuess(guess);
  return { game, guess, ...result };
};

module.exports = {
  checkGuess,
  updateGameState,
  getNewGameState,
};
