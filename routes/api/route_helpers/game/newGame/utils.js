const Word = require('../../../../../models/Word');

const randNum = () => Math.floor(Math.random() * 26);
const randLetter = () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[randNum()];


/**
 * 
 * @returns {Word} - Word object, Mongoose model
 */
const getFirstWord = () =>
  Word.findOne({
    answer: { $gte: `${randLetter}${randLetter}${randLetter}` },
  });

module.exports = {
  getFirstWord,
};
