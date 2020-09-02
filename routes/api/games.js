const express = require('express');
const passport = require('passport');
const { newGameCallback, patchGame } = require('./route_helpers/game');
const Word = require('../../models/Word');

const router = express.Router();

const genWordSubArray = (wordSub, suffix = true) => {
  if (suffix) {
    return wordSub.split('').map((_ele, i) => wordSub.slice(i, wordSub.length));
  }
  return wordSub
    .split('')
    .map((_ele, i) => wordSub.slice(0, i + 1))
    .reverse();
};

const getOneWord = (
  difficulty,
  maxLength,
  direction,
  wordSub,
  guessedWords,
) => {
  const wordSubArray = genWordSubArray(wordSub, direction === 'suffixes');
  const options = {
    len: { $lte: maxLength },
    difficulty: { $lte: difficulty },
    [direction]: { $in: wordSubArray },
    answer: { $nin: guessedWords },
  };
  console.log(options);
  return Word.find(options)
    .sort({
      len: -1,
      [direction]: -1,
    })
    .limit(1)
    .exec();
};

// Frontend sends userId in post request
router.get(
  '/new',
  passport.authenticate('jwt', { session: false }),
  newGameCallback,
);

// User sends score, words guessed, spaces left?

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  patchGame,
);

router.get('/test', (req, res) => {
  const {
    difficulty,
    maxlength: maxLength,
    direction,
    wordsub: wordSub,
    guessedWords = '[]',
  } = req.body;
  getOneWord(
    Number.parseInt(difficulty, 10),
    Number.parseInt(maxLength, 10),
    direction,
    wordSub,
    JSON.parse(guessedWords),
  ).then((words) => {
    // console.log(word);
    res.json(words.map((word) => word.answer));
  });
});

module.exports = router;
