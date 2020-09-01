const express = require('express');
const router = express.Router();
const passport = require('passport');
const getNextWord = require('./route_helpers/getNextWord')
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
      wordsSent: [getNextWord([], 5, true)], // send result of getNextWord 
      wordsGuessed: [],
      score: 0,
    });
    newGame.save().then((game) => res.json(game));
  },
);

// User sends score, words guessed, spaces left?

router.patch(
  '/game/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Game.findById(req.params.id).then((game) => {
      game.score = req.score;
      game.wordsGuessed = req.wordsGuessed; //add
      game.len = req.len
      game.dir = req.dir
      game.wordsSent = req.wordsSent.push(); // getNextWord(game.wordsGuessed, game.len, game.dir)
      return res.json(game);
    });
  },
);

module.exports = router;
