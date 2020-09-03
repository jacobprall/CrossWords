const express = require('express');
const passport = require('passport');
const { newGameCallback, patchGame } = require('./route_helpers/game');
const Word = require('../../models/Word');
const getNextWord = require('./route_helpers/game/getNextWord');
const router = express.Router();
const jwt = require('jsonwebtoken');

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
),
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

    res.json(words.map((word) => word.answer));
  });
});

router.get('/test2', async (req, res) => {
  const { maxLength, direction, guessedWords, answersList } = req.body;
  const guessed = JSON.parse(guessedWords);
  const dir = JSON.parse(direction);
  const answersSent = JSON.parse(answersList);
  const nextWord = await getNextWord(guessed, dir, maxLength, answersSent);
  res.json(nextWord);
});

module.exports = router;
