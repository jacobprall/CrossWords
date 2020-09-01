// getNextWord method
// takes in words guessed, boolean for right or left,
// uses length of words guessed to determine difficulty
// boolean determines if query prefix or suffix
// if no word is returned from query, query again with 2 letters
// if no word is returned from query, query again with 1 letter
const Word = require('../../../models/Word');
const mongoose = require('mongoose');
//
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
      return currWord.slice(word.length - len);
    case false:
      return currWord.slice(0, len);
  }
};
//direction
// w defaults

const possibleWords = (guessed, difficulty, len, dir, maxLength) => {
  let wordSub;
  if (guessed.length > 0) {
    wordSub = getWordSub(guessed, dir, len);
  } else {
    wordSub = getWordSub(guessed, dir, len);
  }
  let possibleWords = [];
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
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
const getNextWord = async (guessed, direction, maxLength) => {
  const boardWidth = 20;
  let length = 3;
  const currDifficulty = getDifficulty(guessed);
  const word = await possibleWords(
    guessed,
    currDifficulty,
    length,
    direction,
    maxLength,
  ).then((res) => {
    return shuffle(res)[0];
  });
  if (word) {
    console.log('word entered return: ', word);
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
};

module.exports = getNextWord;

// have not incorporated logic to prevent repeat words
// have not incorporated length logic
