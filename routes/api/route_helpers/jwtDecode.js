const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../../config/keys');

/**
 * Verifies and decodes a JWT token
 * @param {String} token JWT token sent in with authorization header
 * @param {Object} res Express RES object
 */
const jwtDecode = (token, res) =>
  jwt.verify(token, secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(401).json(err);
    }
    return decoded;
  });

module.exports = jwtDecode;
