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

const getDirection = (spacesLeft) => {};

//direction
// w defaults

const wordQuery = (prefix, difficulty, length) => {
  let possibleWords = [];
  possibleWords = Word.find({
    suffixes: `${prefix}`,
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

  if (possibleWords.length === 0) {
    possibleWords = Word.find({
      prefixes: `${prefix}`,
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
  }

  return possibleWords;
};

//

export const getNextWord = (guessed, length) => {
  const currDifficulty = getDifficulty(guessed);
  
};
