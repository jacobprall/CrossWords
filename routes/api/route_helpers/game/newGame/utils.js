const Word = require('../../../../../models/Word');

const randNum = () => Math.floor(Math.random() * 26);
const randLetter = () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[randNum()];

/**
 * Generates a new word at random (26^3 chance of collision)
 * @returns {Word} - Word object, Mongoose model
 */
const getFirstWord = () => {
  const randLetterSequence = `${randLetter()}${randLetter()}${randLetter()}`;
  return Word.findOne({
    difficulty: { $lte: 2 },
    answer: { $gte: randLetterSequence },
  });
};

module.exports = {
  getFirstWord,
};
