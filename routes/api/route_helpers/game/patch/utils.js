const moment = require('moment');

const Word = require('../../../../../models/Word');

// Check to see if the submitted word was correct
//   Determine how many points that was worth
//   Determine how much time is added
const maxTime = 60; // assuming the time comes in seconds as an int
let lastTime;
const handleTime = (isCorrect, timeRemaining, gameStartTime) => {
  if (!isCorrect) {
    return 0;
  } // dont detract time for missed answer
  gameStartTime = abs(Math.floor(gameStartTime / 1000));
  const currentTime = abs(Math.floor(new Date().getTime() / 1000)); // should be in seconds
  lastTime = currentTime;
  const t = gameStartTime - currentTime;

  const timeConstant = 12; // in actual seconds
  const a = Math.pow(60, 3); // normalizer const => 60 meaning over one minute

  if (t < 0) {
    t = 0;
  }
  let timeAddition = Math.ceil((-(Math.pow(t, 3) / a) + 1 / 6) * timeConstant);
  timeAddition = Math.floor(
    timeAddition * (abs(1 - timeRemaining / maxTime) + 1),
  );

  return timeAddition;

  // at^3 + d => t - time in deca seconds, a = -1/216 - time will decrease over 1 minute(s) until it hits a min, d = 1/6 -- min time if 1 minute(s) has passed
  // time = Math.ceil(double(-(t^3)/216 + 1/6) * 12) // 15 seconds added on top side
  // time modified by timeRemaining, time = Math.floor(time * (abs(double(1 - timeRemaining/maxTime)) + 1))
};

const handleScore = (isCorrect, difficulty, length) => {
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
  const currentTime = abs(Math.floor(new Date().getTime() / 1000)); // should be in seconds
  const timeDifferential = lastTime - currentTime;

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
const checkGuess = (guess, game) => {
  guess = JSON.parse(guess);
  Word.findById(guess.word)
    .then(async (word) => {
      let isCorrect = word.answer === guess.guessWord;
      let difficulty = word.difficulty;

      let length = word.length;

      //let timeRemaining =
      // let secondsChange = handleTime(isCorrect, timeRemaining, gameStartTime);
      // let scoreChange = handleScore(
      //   isCorrect,
      //   difficulty,
      //   length,
      //   gameStartTime,
      // );

      // return {
      //      scoreChange,
      //      secondsChange
      // }
    })
    .catch((err) => err);
};


const updateGameState = ({ game, guess, secondsChange, scoreChange }) => {
  const { score, timeRemaining } = game;
  const newScore = score + scoreChange;
  // game timeRemaining field is in seconds, so we can just secondsChange to the previous value
  // const newTimer = moment(timer).add(secondsChange, 'seconds');
  const newTime = timeRemaining + secondsChange;
  const { guessedWord, wordId } = JSON.parse(guess);
  game.score = 0;
  game.timer = 60;
  game.wordsGuessed.push(guessedWord);
  return game.save();
};

const getNewGameState = async (game, reqBody) => {
  // added logic to update game times from front-end state BEFORE any guess-based modifiers to timeRemaining
  const { guess, timeRemaining, timeElapsed } = reqBody;

  game.timeRemaining = timeRemaining;
  game.timeElapsed = timeElapsed;
  game.save();

  const result = await checkGuess(guess, game);

  return { game, guess, ...result };
};

module.exports = {
  checkGuess,
  updateGameState,
  getNewGameState,
};
