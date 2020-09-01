const express = require('express');
const passport = require('passport');

const router = express.Router();
const {
  registerCallback,
  loginCallback,
  currentUserCallback,
} = require('./route_helpers/user');

router.post('/register', (req, res) => registerCallback(req, res));

router.post('/login', (req, res) => loginCallback(req, res));

router.get(
  '/current',
  passport.authenticate('jwt', {
    session: false,
  }),
  currentUserCallback,
);

module.exports = router;
