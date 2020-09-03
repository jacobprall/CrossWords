const express = require('express');
const passport = require('passport');

const router = express.Router();
const {
  registerCallback,
  loginCallback,
  currentUserCallback,
  currentUserStats,
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

router.get('/:id/stats', (req, res) => currentUserStats(req, res));

module.exports = router;
