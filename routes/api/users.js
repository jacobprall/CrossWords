const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../models/User');
const passport = require('passport');
const registerCallback = require('./route_helpers/register');
const loginCallback = require('./route_helpers/login');

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
