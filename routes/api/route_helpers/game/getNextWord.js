// getNextWord method
// takes in words guessed, boolean for right or left,
// uses length of words guessed to determine difficulty
// boolean determines if query prefix or suffix
// if no word is returned from query, query again with 2 letters
// if no word is returned from query, query again with 1 letter
const Word = require('../../../../models/Word');

const getDifficulty = (guessed) => {
  let difficulty = 1;
  if (guessed.length > 5) {
    difficulty = 2;
  } else if (guessed.length > 10) {
    difficulty = 3;
  }
  return difficulty;
};

const getWordSub = (guessed, dir) => {
  const currWord = guessed[guessed.length - 1];
  switch (dir) {
    case true:
      return currWord.slice(currWord.length - 3);
    default:
      return currWord.slice(0, 3);
  }
};

// direction
// w defaults

/**
 * Queries DB for a word with given characteristics
 * @param {Array} guessed
 * @param {Integer} difficulty
 * @param {Integer} length
 * @param {Boolean} dir
 */
const possibleWords = (guessed, difficulty, length, dir) => {
  let wordSub;
  if (guessed.length > 0) {
    wordSub = getWordSub(guessed, dir);
  } else {
    wordSub = 'ASSOCIATION';
  }

  let direction;
  if (!dir) {
    direction = 'suffixes';
  } else {
    direction = 'prefixes';
  }

  return Word.find({
    [direction]: `${wordSub}`,
  })
    .where('difficulty')
    .equals(difficulty)
    .exec();
};

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

const getNextWord = async (guessed, length, direction) => {
  const currDifficulty = getDifficulty(guessed);
  const word = await possibleWords(guessed, currDifficulty, length, direction)
    .then((res) => {
      return shuffle(res)[0];
    })
    .catch((err) => console.error(err));

  if (word) {
    return word;
  }

  return possibleWords(guessed, currDifficulty, length, !direction)
    .then((res) => shuffle(res)[0])
    .catch((err) => console.error(err));
};

// have not incorporated logic to prevent repeat words
// have not incorporated length logic

module.exports = getNextWord;
