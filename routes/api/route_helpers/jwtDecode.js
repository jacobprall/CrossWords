const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../../config/keys');

const jwtDecode = (token, res) =>
  jwt.verify(token, secretOrKey, (err, decoded) => {
    if (err) {
      return res.status(400).json(err);
    }
    return decoded;
  });

module.exports = jwtDecode;
