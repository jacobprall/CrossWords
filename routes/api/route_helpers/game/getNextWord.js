// getNextWord method
// takes in words guessed, boolean for right or left,
// uses length of words guessed to determine difficulty
// boolean determines if query prefix or suffix
// if no word is returned from query, query again with 2 letters
// if no word is returned from query, query again with 1 letter
const Word = require('../../../../models/Word');

function shuffle(a) {
  let j;
  let x;
  const newArr = [...a];

  for (let i = a.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    newArr[i] = a[j];
    newArr[j] = x;
  }
  return newArr;
}

/**
 * Generates an array to pass into a MongoDB query
 * @param {String} wordSub - Substring to match a new word up to
 * @param {Boolean} suffix - True if we're trying to match a new word
 * to the suffix of the last word
 * @returns {Model{Word}}
 */
const genWordSubArray = (wordSub, suffix = true) => {
  if (suffix) {
    return wordSub.split('').map((_ele, i) => wordSub.slice(i, wordSub.length));
  }
  return wordSub
    .split('')
    .map((_ele, i) => wordSub.slice(0, i + 1))
    .reverse();
};

const getDifficulty = (guessed) => {
  let difficulty = 1;
  if (guessed.length > 5) {
    difficulty = 2;
  } else if (guessed.length > 10) {
    difficulty = 3;
  }
  return difficulty;
};

const getWordSub = (guessed, dir, len) => {
  const currWord = guessed[guessed.length - 1];
  if (guessed.length === 0) {
    return shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))[0];
  }
  switch (dir) {
    case true:
      return currWord.slice(currWord.length - len);
    default:
      return currWord.slice(0, len);
  }
};

// direction
// w defaults

/**
 * Queries DB for a word with given characteristics
 * @param {Array} guessed
 * @param {Integer} difficulty
 * @param {Integer} maxLength
 * @param {Boolean} dir
 */

const possibleWords = (guessed, difficulty, len = 3, dir, maxLength) => {
  let wordSub;
  if (guessed.length > 0) {
    wordSub = getWordSub(guessed, dir, len);
  } else {
    wordSub = getWordSub(guessed, dir, len);
  }

  console.log(wordSub);

  let direction;
  if (!dir) {
    direction = 'suffixes';
  } else {
    direction = 'prefixes';
  }

  const options = {
    len: { $lte: maxLength },
    difficulty: { $lte: difficulty },
    [direction]: { $in: wordSubArray },
    answer: { $nin: guessedWords },
  };

  return Word.find(options)
    .sort({
      len: -1,
      [direction]: -1,
    })
    .limit(1)
    .exec();
};

const getNextWord = async (guessed, direction, maxLength) => {
  let maxL = maxLength;
  const boardWidth = 20;
  let length = 3;
  const currDifficulty = getDifficulty(guessed);

  let word = await possibleWords(guessed, currDifficulty, length, direction)
    .then((res) => {
      return shuffle(res)[0];
    })
    .catch((err) => console.error(err));

  if (word) {
    return word;
  }
  while (!word) {
    if (length === 1) {
      length = 3;
      maxL = boardWidth - maxL;
      word = possibleWords(guessed, currDifficulty, length, !direction, maxL)
        .then((res) => shuffle(res)[0])
        .catch((err) => console.error(err));
    } else {
      length -= 1;
      maxL -= 1;
      word = possibleWords(
        guessed,
        currDifficulty,
        length,
        direction,
        maxLength,
      )
        .then((res) => shuffle(res)[0])
        .catch((err) => console.error(err));
    }
  }

  // return possibleWords(guessed, currDifficulty, length, !direction)
  //   .then((res) => shuffle(res)[0])
  //   .catch((err) => console.error(err));
  return [word, length, direction];
};

// have not incorporated logic to prevent repeat words
// have not incorporated length logic

module.exports = getNextWord;
