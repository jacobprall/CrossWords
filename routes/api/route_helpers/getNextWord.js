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
  let wordSub;
  if (guessed.length > 0) {
    wordSub = getWordSub(guessed, dir);
  } else {
    wordSub = 'ASSOCIATION';
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

    .exec
    // function (err, data) {
    // if (err) {
    //   return [];
    // } else {
    //   console.log(data);
    //   return data;
    // }
    // }
    ();

  // exec( callback (err, data))

  // console.log(possibleWords);
  // return possibleWords;
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
const getNextWord = async (guessed, length, direction) => {
  const currDifficulty = getDifficulty(guessed);
  const word = await possibleWords(
    guessed,
    currDifficulty,
    length,
    direction,
  ).then((res) => {
    // console.log('words in get next word: ', res);
    return shuffle(res)[0];
  });
  if (word) {
    console.log('word entered return: ', word);
    return word;
  } else {
    return possibleWords(guessed, currDifficulty, length, !direction).then(
      (res) => shuffle(res)[0],
    );
  }
};

module.exports = getNextWord;

// have not incorporated logic to prevent repeat words
// have not incorporated length logic
