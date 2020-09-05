/* eslint-disable consistent-return */

const Word = require('../../../../../models/Word');

const PREFERRED_OVERLAP = 3;
const WORD_FIND_LIMIT = 10;
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
 * Returns the start column of the generated word
 * @param {Number} nextWordLength Length of the generated word
 * @param {Number} overlapWithPrev Positive/negative overlap with prevWord
 * @param {Number} prevWordLength Length of the previous word
 * @param {Number} prevWordStartCol Start column (zero-based) of the prevWord
 * @returns {Number}
 */
const getColStart = (
  nextWordLength,
  overlapWithPrev,
  prevWordLength,
  prevWordStartCol,
) => {
  if (overlapWithPrev < 0) {
    return prevWordStartCol + prevWordLength + overlapWithPrev;
  }
  return prevWordStartCol - nextWordLength + overlapWithPrev;
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

const getRandDir = (wordsGuessed) => {
  if (wordsGuessed.length === 1) return false;
  const randomNum = Math.random();
  switch (wordsGuessed.length % 5) {
    case 1:
      if (randomNum < 0.15) {
        return true;
      }
      return false;
    case 2:
      if (randomNum < 0.35) {
        return true;
      }
      return false;
    case 3:
      if (randomNum < 0.65) {
        return true;
      }
      return false;
    case 4:
      if (randomNum < 0.85) {
        return true;
      }
      return false;
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
  const suffixesOrPrefixes = dir ? 'suffixes' : 'prefixes';

  const { minLength, maxLength } = getLength();
  const difficulty = getDifficulty(wordsGuessed);
  const options = {
    length: { $gte: minLength, $lt: maxLength },
    difficulty: { $lte: difficulty },
    [suffixesOrPrefixes]: { $in: wordSubArray },
    answer: { $nin: wordsGuessed },
    _id: { $nin: wordsSent },
  };

  const fieldsReturned = {
    _id: 1,
  };

  //   MongoDB Sorting:
  // { $sort: { <field1>: <sort order>, <field2>: <sort order> ... } }
  // If sorting on multiple fields, sort order is
  // evaluated from left to right. For example, in the form above,
  // documents are first sorted by <field1>. Then documents with the
  // same <field1> values are further sorted by <field2>.

  // If difficulty is _easy_ or _hard_, prefer short words with a larger overlap
  let sort = {
    [suffixesOrPrefixes]: 1,
    length: 1,
  };

  if (difficulty === 2)
    sort = {
      [suffixesOrPrefixes]: 1,
      length: -1,
      difficulty: -1,
    };

  return Word.find(options, fieldsReturned)
    .sort(sort)
    .limit(WORD_FIND_LIMIT)
    .exec();
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
  const { wordsGuessed, wordsSent, wordsStartCol } = game;
  const lastGuessedWord = wordsGuessed.slice(-1)[0];
  const lastGuessedWordStartCol =
    (wordsStartCol && wordsStartCol.slice(-1)[0]) || 8;

  const dir = getRandDir(wordsGuessed);
  let word = await getOneWord({ wordsGuessed, dir, wordsSent });

  if (!word) {
    word = await getOneWord({ wordsGuessed, dir: !dir, wordsSent });
  }
  const overlap = getOverlap(lastGuessedWord, word.answer);
  const colStart = getColStart(
    word.answer.length,
    overlap,
    lastGuessedWord.length,
    lastGuessedWordStartCol,
  );
  return [word, overlap, colStart];
}

module.exports = getNextWord;
