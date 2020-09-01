// getNextWord method
// takes in words guessed, boolean for right or left,
// uses length of words guessed to determine difficulty
// boolean determines if query prefix or suffix
// if no word is returned from query, query again with 2 letters
// if no word is returned from query, query again with 1 letter
const Word = require('../../../models/Word');
const mongoose = require('mongoose');
//
const getDifficulty = (wordsArray) => {
  let difficulty = 1;
  if (guessed.length > 5) {
    difficulty = 2;
  } else if (guessed.length > 10) {
    difficulty = 3;
  }
  return difficulty;
};

const getWordStart = (guessed, direction) => {
  const currWord = guessed[guessed.length - 1];
  let wordStart;
  if (direction) {
    wordStart = currWord.slice(word.length - 3);
  } else {
    wordStart = currWord.slice(0, 3);
  }
  return wordStart;
};

//direction
// w defaults

const wordQuery = (prefix, difficulty, direction) => {
  if (direction) {
    direction = 'suffix';
  } else {
    direction = 'prefix';
  }
  const possWords = Word.find({
    [direction]: `${prefix}`,
  })
    .where('difficulty')
    .equals(difficulty);
};

//

export const getNextWord = (guessed, direction) => {
  const currDifficulty = getDifficulty(guessed);
  const prefix = getWordStart(guessed, direction);
};
