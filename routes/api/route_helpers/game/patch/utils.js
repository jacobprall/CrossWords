/* eslint-disable no-param-reassign */
const Word = require('../../../../../models/Word');

const MAX_TIME = 60;
const GAME_DURATION = 60;
const TIME_CONSTANT = 12;
const BASELINE_TIME_ADDITION = 7 / 6; // baseline time addition => ((7/6) - 1) * TIME_CONSTANT

const handleTime = (isCorrect, game) => {
  if (!isCorrect) {
    return 0;
  } // dont detract time for missed answer
  // const currentTime = abs(Math.floor(new Date().getTime() / 1000));
  // lastTime = currentTime;

  const { timeElapsed, timeRemaining } = game;

  const normalizer = GAME_DURATION ** 3; // normalizer const => 60

  if (Math.abs(timeElapsed) > normalizer) {
    timeElapsed = normalizer;
  }
  let timeAddition = Math.ceil(
    (-(timeElapsed ** 3 / normalizer) + BASELINE_TIME_ADDITION) * TIME_CONSTANT,
  ); // between (7/6 * 12) and (1/6 * 12)
  timeAddition = Math.floor(
    timeAddition * (Math.abs(1 - timeRemaining / MAX_TIME) + 1),
  );

  return timeAddition;

  // at^3 + d => t - time in deca seconds, a = -1/216 - time will decrease
  //   over 1 minute(s) until it hits a min, d = 1/6 -- min time if
  //   1 minute(s) has passed
  // time = Math.ceil(double(-(t^3)/216 + 1/6) * 12) // 15 seconds
  //   added on top side
  // time modified by timeRemaining, time = Math.floor(time *
  //   (abs(double(1 - timeRemaining/MAX_TIME)) + 1))
};

const handleScore = (isCorrect, difficulty, length, timeChange) => {
  let pointsEarned = 0;

  const pointsConstant = 6; // baseline value for points per word char in length
  pointsEarned += length * pointsConstant;

  // difficulty modifier
  // assuming difficulty levels of 1, 2, and 3 => easy change if those aren't the levels
  if (difficulty === 2) pointsEarned = Math.floor(pointsEarned * 1.4);
  if (difficulty === 3) pointsEarned = Math.floor(pointsEarned * 1.8);

  // return score before time mods if wrong answer
  // lose 25% of potential points eared on mistake
  if (!isCorrect) {
    pointsEarned = Math.floor(pointsEarned * -(1 / 4));
    return pointsEarned;
  }

  if (timeChange < 0) {
    pointsEarned = Math.floor(pointsEarned * 0.75);
  } else if (timeChange < 2) {
    // do nothing
  } else if (timeChange < 5) {
    pointsEarned = Math.ceil(pointsEarned * 1.25);
  } else {
    pointsEarned = Math.ceil(pointsEarned * 1.5);
  }

  return pointsEarned;
};

/**
 * Checks to see if guess is correct, calculates score/timer updates
 * @param {Object: {}} guess - Guess object coming from user submittal
 * @returns {Number} scoreChange
 * @returns {Number} secondsChange
 */
const checkGuess = (guess, game, lastClueIdSent) => {
  // console.log(guess);
  return Word.findById(lastClueIdSent)
    .then((word) => {
      const isCorrect = word.answer === guess;
      const { length, difficulty } = word;

      const timeChange = handleTime(isCorrect, game);
      const scoreChange = handleScore(
        isCorrect,
        difficulty,
        length,
        timeChange,
      );
      return {
        scoreChange,
        timeChange,
      };
    })
    .catch((err) => err);
};

const updateGameState = ({ game, guess, timeChange, scoreChange }) => {
  // console.log(game, guess, timeChange, scoreChange);
  game.timeRemaining += timeChange;
  game.score = Math.max(0, game.score + scoreChange);
  game.wordsGuessed.push(guess);
  return game.save().then((g) => g);
};

const getNewGameState = async (game, reqBody) => {
  const { guess, timeRemaining, timeElapsed } = reqBody;

  game.timeRemaining = timeRemaining;
  game.timeElapsed = timeElapsed;

  const lastClueIdSent = game.wordsSent.slice(-1)[0];

  const result = await checkGuess(guess, game, lastClueIdSent);
  return { game, guess, ...result };
};

module.exports = {
  checkGuess,
  updateGameState,
  getNewGameState,
};
