const express = require('express');
const passport = require('passport');
const { newGameCallback, patchGame } = require('./route_helpers/game');

const router = express.Router();

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

module.exports = router;
