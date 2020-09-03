// getNextWord method
// takes in words guessed, boolean for right or left,
// uses length of words guessed to determine difficulty
// boolean determines if query prefix or suffix
// if no word is returned from query, query again with 2 letters
// if no word is returned from query, query again with 1 letter
const Word = require('../../../../models/Word');

// shuffle function
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

// gets difficulty

const getDifficulty = (guessed) => {
  let difficulty = 1;
  if (guessed.length > 5) {
    difficulty = 2;
  } else if (guessed.length > 10) {
    difficulty = 3;
  }
  return difficulty;
};

// gets where word start, ie, current index

const getOverlap = (oldWord, newWord, dir) => {
  if (!oldWord) {
    return 0;
  }
  if (dir) {
    let overlap = 0;
    switch (oldWord) {
      case (oldWord[oldWord.length - 4] === newWord[0]):
        overlap = 3;
        break;
      case (oldWord[oldWord.length - 3] === newWord[0]):

      }
      
      
    let counter = 0;
    let i = 0;
    while (i < oldWord.length) {
      if (oldWord[oldWord.length - 1 - i] === newWord[i]) {
        counter += 1;
      }
      i += 1;
    }
    return counter;
  } else {
    let counter = 0;
    let i = 0;
    while (i < oldWord.length) {
      if (oldWord[i] === newWord[newWord.length - 1 - i]) {
        counter += 1;
      }
      i += 1;
    }
    return counter;
  }
};

// get word sub. If dir = false, board moving from left to right, suffix of last word == prefix of next word
// If true, moving from right to left, prefix of last word == suffix of next word

const getWordSub = (prevWord, dir) => {
  if (dir) {
    return prevWord.slice(0, 3);
  } else {
    return prevWord.slice(prevWord.length - 3);
  }
};

// Get array of subs of word sub.
// word is JAMES
// If dir is false, MES becomes [MES, ES, S]; left to right
// if dir is true, JAM becomes [JAM, JA, J]; right to left

const genWordSubArray = (guessed, dir) => {
  if (guessed.length === 0) {
    return [shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))[0]];
  }

  const prevWord = guessed[guessed.length - 1];
  const wordSub = getWordSub(prevWord, dir);

  if (dir) {
    return wordSub
      .split('')
      .map((_ele, i) => wordSub.slice(0, i + 1)) // slices beginning of word. 0,1 - 0,2 - 0,3
      .reverse();
  }
  // this was the broken one - fixed it
  return wordSub.split('').map((_ele, i) => wordSub.slice(2 - i)); // slices end of word. 2,3 - 1,3 - 0,3
};

// queries database for possible next words list of 10 words

/**
 * Generates an array to pass into a MongoDB query
 * @param {String} wordSub - Substring to match a new word up to
 * @param {Boolean} suffix - True if we're trying to match a new word
 * to the suffix of the last word
 * @returns {Model{Word}}
 */

/**
 * Queries DB for a word with given characteristics
 * @param {Array} guessed
 * @param {Integer} difficulty
 * @param {Integer} maxLength
 * @param {Boolean} dir
 */

const possibleNextWords = (guessed, dir, maxLength, answersSent) => {
  const wordSubArray = genWordSubArray(guessed, dir);
  const difficulty = getDifficulty(guessed);
  let direction;
  if (dir) {
    direction = 'suffixes';
  } else {
    direction = 'prefixes';
  }

  maxLength = Number(maxLength);

  const options = {
    length: { $lte: maxLength },
    difficulty: { $lte: difficulty },
    [direction]: { $in: wordSubArray },
    answer: { $nin: guessed },
    _id: { $nin: answersSent },
  };

  return Word.find(options)
    .sort({
      length: -1,
      [direction]: -1,
    })
    .limit(40)
    .exec()
    .catch((err) => console.log(err));
};

async function getNextWord(guessed, answersSent, dir, maxLength = 12) {
  let guessedWord = guessed[guessed.length - 1];

  let word = await possibleNextWords(guessed, dir, maxLength, answersSent)
    .then((res) => {
      return shuffle(res)[0];
    })
    .catch((err) => console.error(err));
  // console.log(word, guessedWord);
  if (!word) {
    word = await possibleNextWords(guessed, !dir, maxLength, answersSent)
      .then((res) => {
        return shuffle(res)[0];
      })
      .catch((err) => console.error(err));
    let overlap = getOverlap(guessedWord, word.answer, !dir);
    return [word, overlap, !dir];
  }
  const overlap = getOverlap(guessedWord, word.answer, dir);
  // console.log(overlap);
  return [word, overlap, dir];
}

module.exports = getNextWord;
