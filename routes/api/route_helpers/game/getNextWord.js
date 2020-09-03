/* eslint-disable consistent-return */

const Word = require('../../../../models/Word');

const PREFERRED_OVERLAP = 3;
const WORD_FIND_LIMIT = 40;
const FIRST_BREAK_MAX_LENGTH = 6;
const SECOND_BREAK_MAX_LENGTH = 10;
const THIRD_BREAK_MAX_LENGTH = 20;

const randNumInt = (max) => Math.floor(Math.random() * max);

/**
 * Returns a difficulty {1,2,3} increasing with the number of words guessed
 * @param {Array} guessed - Array of answers to previous clues
 */
const getDifficulty = (guessed) => {
  let difficulty = 1;
  if (guessed.length > 5) {
    difficulty = 2;
  } else if (guessed.length > 10) {
    difficulty = 3;
  }
  return difficulty;
};

/**
 * Get the overlap between two words and a vector from the beginning
 * or end of A.
 * @param {String} a "Old word" against which we test the
 * @param {String} b "New word"
 * @param {[Boolean]} oneTimeOnly Allows one recursive call to check the
 *                                reverse situation. Default false.
 * @returns {Integer} - Positive values indicate that word A lines up with the
 *                      first X characters of word B.
 *                      Negative values indicate that word B lines up
 *                      with the last X characters of A
 * @example getOverlap("PIZZA", "ZAP") === -2
 * @example getOverlap("ZAP", "PIZZA") === -1
 * @example getOverlap("BLAH", "AHA") === -2
 * @example getOverlap("BLAH", "CABLA") === 3
 */
const getOverlap = (a, b, oneTimeOnly = false) => {
  if (a.length === 0 || b.length === 0) return 0;

  let i = 0;
  const firstWordSuffix = a.slice(a.length - PREFERRED_OVERLAP);
  while (i < PREFERRED_OVERLAP) {
    const suffixSlice = firstWordSuffix.slice(i);
    const secondWordSlice = b.slice(0, PREFERRED_OVERLAP - i);
    if (suffixSlice === secondWordSlice) {
      const modifier = oneTimeOnly ? 1 : -1;
      return modifier * (PREFERRED_OVERLAP - i);
    }
    i += 1;
  }
  if (oneTimeOnly) return 0;
  return getOverlap(b, a, true);
};

// get word sub. If dir = false, board moving from left to right,
// suffix of last word == prefix of next word
// If true, moving from right to left, prefix of
// last word == suffix of next word

/**
 *
 * @param {String} prevWord Word from which to base the next
 * @param {Boolean} dir Prefix (true) or suffix (false) of prevWord
 * @returns {String} - Slice of prevWord
 * @example getWordSub("MELON", true) === "MEL"
 * @example getWordSub("MELON", false) === "LON"
 */
const getWordSub = (prevWord, dir) => {
  if (dir) return prevWord.slice(0, PREFERRED_OVERLAP);

  return prevWord.slice(prevWord.length - PREFERRED_OVERLAP);
};

/**
 * Generates an array to pass into a MongoDB query
 * @param {String} word - Previous word to match up against
 * @param {Boolean} dir - Prefix (true) or suffix (false) to match
 *                        against this word
 * @returns {Model{Word}}
 * @example genWordSubArray(JAMES, true) === [JAM, JA, J]
 * @example genWordSubArray(JAMES, false) === [MES, ES, S]
 */
const genWordSubArray = (word, dir) => {
  const wordSub = getWordSub(word, dir);
  if (dir) {
    return wordSub
      .split('')
      .map((_ele, i) => wordSub.slice(0, i + 1)) // slices beginning of word. 0,1 - 0,2 - 0,3
      .reverse();
  }

  return wordSub
    .split('')
    .map((_ele, i) => wordSub.slice(2 - i))
    .reverse();
};

// queries database for possible next words list of 10 words

const getRandDir = () => {
  const randomNum = Math.random();
  switch (true) {
    case randomNum < 0.15:
      return false;
    case randomNum < 0.3:
      return true;
    case randomNum < 0.6:
      return false;
    case randomNum < 0.85:
      return true;
    default:
      return false;
  }
};

/**
 * Generates a min & max length range based on rough estimates of
 * equal distribution of the clue set
 * @returns {minLength: Integer, maxLength: Integer}
 */
const getLength = () => {
  const randNum = Math.random();
  let minLength = 0;
  let maxLength = THIRD_BREAK_MAX_LENGTH;
  switch (true) {
    case randNum < 0.33:
      maxLength = FIRST_BREAK_MAX_LENGTH;
      break;
    case randNum < 0.66:
      minLength = FIRST_BREAK_MAX_LENGTH;
      maxLength = SECOND_BREAK_MAX_LENGTH;
      break;
    default:
      minLength = SECOND_BREAK_MAX_LENGTH;
  }
  return { minLength, maxLength };
};

/**
 * Queries DB for a word with given characteristics
 * @param {Array} wordsGuessed
 * @param {Boolean} dir
 * @param {Integer} wordsSent
 */
const possibleNextWords = ({ wordsGuessed, dir, wordsSent }) => {
  const prevWord = wordsGuessed[wordsGuessed.length - 1];

  const wordSubArray = genWordSubArray(prevWord, dir);
  // console.log(wordSubArray)
  const direction = dir ? 'suffixes' : 'prefixes';

  const { minLength, maxLength } = getLength();
  const difficulty = getDifficulty(wordsGuessed);
  const options = {
    length: { $gte: minLength, $lt: maxLength },
    difficulty: { $lte: difficulty },
    [direction]: { $in: wordSubArray },
    answer: { $nin: wordsGuessed },
    _id: { $nin: wordsSent },
  };

  return Word.find(options, {
    _id: 1,
  })
    .sort({
      [direction]: dir ? -1 : 1,
    })
    .limit(WORD_FIND_LIMIT)
    .exec()
    .catch((err) => console.error(err));
};

const getOneWord = (params) => {
  return possibleNextWords(params)
    .then((res) => {
      const randNum = randNumInt(res.length);
      const { _id } = res[randNum];
      return Word.findById(_id);
    })
    .catch((err) => console.error(err));
};

async function getNextWord(game) {
  // { guessed, answersSent, maxLength = 12 }
  const { wordsGuessed, wordsSent } = game;
  const lastGuessedWord = wordsGuessed.slice(-1)[0];

  const dir = getRandDir(wordsGuessed.length);
  let word = await getOneWord({ wordsGuessed, dir, wordsSent });

  if (!word) {
    word = await getOneWord({ wordsGuessed, dir: !dir, wordsSent });
  }
  const overlap = getOverlap(lastGuessedWord, word.answer);
  return [word, overlap];
}

module.exports = getNextWord;
