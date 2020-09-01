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

const getWordSub = (guessed, dir) => {
  const currWord = guessed[guessed.length - 1];
  switch (dir) {
    case true:
      return currWord.slice(word.length - 3);
    case false:
      return currWord.slice(0, 3);
  }
};
//direction
// w defaults

const possibleWords = (guessed, difficulty, length, dir) => {
  let wordSub = getWordSub(guessed, dir);
  let possibleWords = [];
  let direction;
  if (!dir) {
    direction = 'suffixes';
  } else {
    direction = 'prefixes';
  }

  possibleWords = Word.find({
    [direction]: `${wordSub}`,
  })
    .where('difficulty')
    .equals(difficulty)

    .exec(function (err, data) {
      if (err) {
        return [];
      } else {
        return data;
      }
    });

  return possibleWords;
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
export const getNextWord = (guessed, length, direction) => {
  const currDifficulty = getDifficulty(guessed);
  let words = possibleWords(guessed, currDifficulty, length, direction);
  if (words.length === 0) {
    direction = !direction;
    words = possibleWords(guessed, currDifficulty, length, direction);
  }
  return shuffle(words)[0];
};

// have not incorporated logic to prevent repeat words
// have not incorporated length logic
