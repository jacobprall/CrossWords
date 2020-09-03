/* eslint-disable no-param-reassign */
const moment = require('moment');

const Word = require('../../../../../models/Word');
const Game = require('../../../../../models/Game');

// Check to see if the submitted word was correct
//   Determine how many points that was worth
//   Determine how much time is added
const maxTime = 60; // assuming the time comes in seconds as an int
let lastTime;
const handleTime = (isCorrect, game) => {
  if (!isCorrect) {
    return 0;
  } // dont detract time for missed answer
  // const currentTime = abs(Math.floor(new Date().getTime() / 1000)); // should be in seconds
  // lastTime = currentTime;
  let t = game.timeElapsed;
  let timeRemaining = game.timeRemaining;
  lastTime = t;

  const gameDuration = 60; // in seconds
  const timeConstant = 12; // in seconds
  const a = Math.pow(gameDuration, 3); // normalizer const => 60
  const b = (7/6); // baseline time addition => ((7/6) - 1) * timeConstant

  if (t > a) { t = a; }
  let timeAddition = Math.ceil((-(Math.pow(t, 3) / a) + b) * timeConstant); // between (7/6 * 12) and (1/6 * 12)
  timeAddition = Math.floor(
    timeAddition * (abs(1 - timeRemaining / maxTime) + 1),
  );

  return timeAddition;

  // at^3 + d => t - time in deca seconds, a = -1/216 - time will decrease over 1 minute(s) until it hits a min, d = 1/6 -- min time if 1 minute(s) has passed
  // time = Math.ceil(double(-(t^3)/216 + 1/6) * 12) // 15 seconds added on top side
  // time modified by timeRemaining, time = Math.floor(time * (abs(double(1 - timeRemaining/maxTime)) + 1))
};

const handleScore = (isCorrect, game, difficulty, length) => {
  let pointsEarned = 0;

  const pointsConstant = 6; // baseline value for points per word char in length
  pointsEarned += length * pointsConstant;

  // difficulty modifier
  // assuming difficulty levels of 1, 2, and 3 => easy change if those aren't the levels
  switch (difficulty) {
    case 2:
      pointsEarned = Math.floor(pointsEarned * 1.4); // constant change
      break;
    case 3:
      pointsEarned = Math.floor(pointsEarned * 1.8); // constant change
      break;
  }

  // return score before time mods if wrong answer
  // lose 25% of potential points eared on mistake
  if (!isCorrect) {
    pointsEarned = Math.floor(pointsEarned * -(1 / 4));
    return pointsEarned;
  }

  // time modifier(s)
  const currentTime = game.timeElapsed; // should be in seconds
  const timeDifferential = currentTime - lastTime;

  if (timeDifferential < 0) {
    pointsEarned = Math.floor(pointsEarned * 0.75);
  } else if (timeDifferential < 2) {
    // do nothing
  } else if (timeDifferential < 5) {
    pointsEarned = Math.ceil(pointsEarned * 1.25);
  } else {
    pointsEarned = Math.ceil(pointsEarned * 1.5);
  }

  return pointsEarned;
};

/**
 * Checks to see if guess is correct, calculates score/timer updates
 * @param {Object: {}} guess - Guess object coming from user submittal
 * @returns {Integer} scoreChange
 * @returns {Integer} secondsChange
 */
const checkGuess = (guess, game, lastClueIdSent) => {
  return Word.findById(lastClueIdSent)
    .then(async (word) => {
      const isCorrect = word.answer === guess;
      const difficulty = word.difficulty;
      // const length = word.length; // might have a problem -> reserved word
      const length = word.answer.length;

      //    for testing only
      // const scoreChange = isCorrect ? 60 : 0;
      // const secondsChange = isCorrect ? 60 : 0;

      // return {
      //   scoreChange,
      //   secondsChange,
      // };

      const scoreChange = handleScore(isCorrect, game, difficulty, length);
      const timeChange = handleTime(isCorrect, game);

      return {
        scoreChange,
        timeChange,
      };
    })
    .catch((err) => err);
};

const updateGameState = ({ game, guess, secondsChange, scoreChange }) => {
  game.score += scoreChange;
  game.timer += secondsChange;
  game.wordsGuessed.push(guess);
  return game.save();
};

const getNewGameState = async (game, reqBody) => {
  const { guess } = reqBody;
  const lastClueIdSent = game.wordsSent.slice(-1)[0];

  const result = await checkGuess(guess, game, lastClueIdSent);
  return { game, guess, ...result };
};

/**
 * Push forward only approved body params; convert strings to Number when needed
 * @param {Object} reqBody - Express req body
 * @returns {Object} {gameId, guess, timeRemaining, timeElapsed}
 */
const cleanReqBody = (reqBody) => ({
  gameId: reqBody.gameId,
  guess: reqBody.guess,
  timeRemaining: Number.parseInt(reqBody.timeRemaining, 10),
  timeElapsed: Number.parseInt(reqBody.timeElapsed, 10),
});

module.exports = {
  checkGuess,
  updateGameState,
  getNewGameState,
  cleanReqBody,
};
