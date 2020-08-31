const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const User = require('../../../models/User');
const validateRegisterInput = require('../../../validation/register')
const passport = require('passport');


const registerCallback = (req, res) => {}

(req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    username: req.body.username,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        username: 'A user has already registered that username',
      });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                username: user.username,
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 3600,
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token,
                  });
                },
              );
            })
            .catch((err) => res.status(400).json(err));
        });
      });
    }
  });
  return res.token;
};
