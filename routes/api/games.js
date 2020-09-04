const express = require('express');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken');
const {
  newGameCallback,
  patchGame,
  getPlayedGameCallback,
} = require('./route_helpers/game');

// const keepJWTBecauseItsNeededSomehow = jwt;

const router = express.Router();

// Frontend sends userId in post request
router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  newGameCallback,
);

// User sends score, words guessed, spaces left?

router.patch(
  '/:gameId',
  passport.authenticate('jwt', { session: false }),
  patchGame,
);

router.get(
  '/:gameId',
  passport.authenticate('jwt', { session: false }),
  getPlayedGameCallback,
);

// router.get('/test', (req, res) => {
//   const {
//     difficulty,
//     maxlength: maxLength,
//     direction,
//     wordsub: wordSub,
//     guessedWords = '[]',
//   } = req.body;
//   getOneWord(
//     Number.parseInt(difficulty, 10),
//     Number.parseInt(maxLength, 10),
//     direction,
//     wordSub,
//     JSON.parse(guessedWords),
//   ).then((words) => {
//     res.json(words.map((word) => word.answer));
//   });
// });

// router.get('/test2', async (req, res) => {
//   const { maxLength, direction, guessedWords, answersList } = req.body;
//   const guessed = JSON.parse(guessedWords);
//   const dir = JSON.parse(direction);
//   const answersSent = JSON.parse(answersList);
//   const nextWord = await getNextWord(guessed, dir, maxLength, answersSent);
//   res.json(nextWord);
// });

module.exports = router;
