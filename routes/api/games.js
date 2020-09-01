const express = require('express');
<<<<<<< HEAD
const passport = require('passport');
const { newGameCallback, patchGame } = require('./route_helpers/game');

const router = express.Router();

// Frontend sends userId in post request
router.get(
  '/new',
  passport.authenticate('jwt', { session: false }),
  newGameCallback,
);

router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  newGameCallback,
=======
const router = express.Router();
// const passport = require('passport');
// const jwt = require('jsonwebtoken');

const getNextWord = require('./route_helpers/getNextWord');
const Game = require('../../models/Game');
// const getFirstWord method required to fetch first word from database
// getNextWord

router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const nextWord = await getNextWord([], 5, true);
    const userId = req.userId;
    const newGame = new Game({
      user: userId,
      wordsSent: [nextWord], // send result of getNextWord
      wordsGuessed: [],
      score: 0,
    });
    console.log('new game: ', newGame);
    newGame
      .save()
      .then((game) => res.json(game))
      .catch((err) => console.log(err));
  },
>>>>>>> clean-up-getNextWord
);

// User sends score, words guessed, spaces left?

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  patchGame,
);

module.exports = router;
