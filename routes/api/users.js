const express = require('express');
const passport = require('passport');

const router = express.Router();
const { registerCallback, loginCallback } = require('./route_helpers/user');

router.post('/register', (req, res) => registerCallback(req, res));

router.post('/login', (req, res) => loginCallback(req, res));

router.get(
  '/current',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    });
  },
);

module.exports = router;
