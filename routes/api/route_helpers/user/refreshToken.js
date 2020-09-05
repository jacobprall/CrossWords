const jwt = require('jsonwebtoken');
const moment = require('moment');
const jwtVerify = require('../jwtVerify');
const { secretOrKey } = require('../../../../config/keys');

const MINUTES_FROM_NOW = 10;
const EXPIRES_IN_SECONDS = 3600;

/**
 * Checks if JWT is valid and
 * returns new token if expires in next 10 minutes
 * @param {Object} req Express req object
 * @param {Object} res Express res object
 * @returns {String} refreshedToken
 */
const refreshToken = async (req, res) => {
  const originalToken = req.headers.authorization.split(' ')[1];

  const decoded = jwtVerify(originalToken, res);
  const { id, username, exp } = decoded;
  const tenMinutesFromNow = moment().add(MINUTES_FROM_NOW, 'minutes');
  if (moment(exp * 1000).isBefore(tenMinutesFromNow)) {
    const payload = {
      id,
      username,
    };
    const newToken = jwt.sign(payload, secretOrKey, {
      expiresIn: EXPIRES_IN_SECONDS,
    });
    return `Bearer ${newToken}`;
  }
  return undefined;
};

module.exports = refreshToken;
