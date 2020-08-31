/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const User = require('../../../models/User');
const validateRegisterInput = require('../../../validation/register');

const registerCallback = (req, res) => {
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
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (_err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((u) => {
            const payload = {
              id: u.id,
              username: u.username,
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 3600,
              },
              (_e, token) => {
                res.json({
                  success: true,
                  token: `Bearer  + ${token}`,
                });
              },
            );
          })
          .catch((error) => res.status(400).json(error));
      });
    });
  });
  return res.token;
};

module.exports = registerCallback;
