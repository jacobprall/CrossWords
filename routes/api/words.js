const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Word = require('../../models/Word');

router.get('/:wordId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
  Word.findOne({ _id: req.params.wordId })
    .then(word => {
      res.json({ answer: word.answer })
    });
});

module.exports = router;