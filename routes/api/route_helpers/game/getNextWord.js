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

const getWordSub = (guessed, dir, len) => {
  const currWord = guessed[guessed.length - 1];
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
 * @param {Integer} length
 * @param {Boolean} dir
 */
const possibleWords = (guessed, difficulty, len, dir, maxLength) => {
  let wordSub;
  if (guessed.length > 0) {
    wordSub = getWordSub(guessed, dir, len);
  } else {
    wordSub = getWordSub(guessed, dir, len);
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
const getNextWord = async (guessed, direction, maxLength) => {
  const boardWidth = 20;
  let length = 3;
  const currDifficulty = getDifficulty(guessed);
  const word = await possibleWords(guessed, currDifficulty, length, direction)
    .then((res) => {
      return shuffle(res)[0];
    })
    .catch((err) => console.error(err));

  if (word) {
    return word;
  } else {
    while (!word) {
      if (length === 1) {
        length = 3;
        maxLength = boardWidth - maxLength;
        return possibleWords(
          guessed,
          currDifficulty,
          length,
          !direction,
          maxLength,
        )
          .then((res) => shuffle(res)[0])
          .catch((err) => console.log(err));
      } else {
        length -= 1;
        maxLength -= 1;
        return possibleWords(
          guessed,
          currDifficulty,
          length,
          direction,
          maxLength,
        )
          .then((res) => shuffle(res)[0])
          .catch((err) => console.log(err));
      }
    }
  }

  return possibleWords(guessed, currDifficulty, length, !direction)
    .then((res) => shuffle(res)[0])
    .catch((err) => console.error(err));
};

// have not incorporated logic to prevent repeat words
// have not incorporated length logic

module.exports = getNextWord;
