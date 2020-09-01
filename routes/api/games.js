const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Game = require('../../models/Game');
// const getFirstWord method required to fetch first word from database
// getNextWord

// Frontend sends userId in post request
router.post(
  '/game',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userId = req.userId;
    const newGame = new Game({
      user: userId,
      wordsSent: [], // send result of getFirstWord
      wordsGuessed: [],
      score: 0,
    });
    newGame.save().then((game) => res.json(game));
  },
);

// User sends score, words guessed, (timer?)
// needs getNextWord method
router.patch('/game/:id', (req, res) => {
  Game.findById(req.params.id).then((game) => {
    game.score = req.score;
    game.wordsGuessed = req.wordsGuessed;
    game.wordsSent = req.wordsSent.push(); // getNextWord method
    return res.json(game);
  });
});

module.exports = router;
