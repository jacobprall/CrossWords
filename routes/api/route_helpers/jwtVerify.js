const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../../config/keys');

/**
 * Verifies and decodes a JWT token
 * @param {String} token JWT token sent in with authorization header
 * @param {Object} res Express RES object
 * @returns {Object} decoded JWT token
 */
module.exports = (token, res) => {
  const decoded = jwt.verify(token, secretOrKey, (err, dec) => {
    const isExpired = dec.exp <= new Date().valueOf() / 1000;
    if (err || isExpired) {
      return res.status(401).json(err || 'Token expired.');
    }
    return dec;
  });
  return decoded;
};
