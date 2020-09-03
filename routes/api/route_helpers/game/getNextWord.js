/* eslint-disable consistent-return */
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
  if (!dir) {
    switch (oldWord) {
      case oldWord[oldWord.length - 3] === newWord[0] &&
        oldWord[oldWord.length - 2] === newWord[1] &&
        oldWord[oldWord.length - 1] === newWord[2]:
        return 3;
      case oldWord[oldWord.length - 2] === newWord[0] &&
        oldWord[oldWord.length - 1] === newWord[1]:
        return 2;
      case oldWord[oldWord.length - 1] === newWord[0]:
        return 1;
      default:
        return 0;
    }
  } else {
    switch (oldWord) {
      case oldWord[2] === newWord[newWord.length - 1] &&
        oldWord[1] === newWord[newWord.length - 2] &&
        oldWord[0] === newWord[newWord.length - 3]:
        return 3;
      case oldWord[1] === newWord[newWord.length - 1] &&
        oldWord[0] === newWord[newWord.length - 2]:
        return 2;
      case oldWord[0] === newWord[newWord.length - 1]:
        return 1;
      default:
        return 0;
    }
  }
};

// get word sub. If dir = false, board moving from left to right,
// suffix of last word == prefix of next word
// If true, moving from right to left, prefix of
// last word == suffix of next word

const getWordSub = (prevWord, dir) => {
  if (dir) {
    return prevWord.slice(0, 3);
  }
  return prevWord.slice(prevWord.length - 3);
};

// Get array of subs of word sub.
// word is JAMES
// If dir is false, MES becomes [MES, ES, S]; left to right
// if dir is true, JAM becomes [JAM, JA, J]; right to left

const genWordSubArray = (guessed, dir) => {
  if (guessed.length === 0) {
    const randLetter = Math.floor(Math.random() * 26);
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[randLetter];
  }

  const prevWord = guessed[guessed.length - 1];
  const wordSub = getWordSub(prevWord, dir);
  console.log(wordSub);
  if (dir) {
    return wordSub
      .split('')
      .map((_ele, i) => wordSub.slice(0, i + 1)) // slices beginning of word. 0,1 - 0,2 - 0,3
      .reverse();
  }

  

  // this was the broken one - fixed it
  return wordSub
    .split('')
    .map((_ele, i) => wordSub.slice(2 - i))
    .reverse(); // slices end of word. 2,3 - 1,3 - 0,3
};

// queries database for possible next words list of 10 words

/**
 * Generates an array to pass into a MongoDB query
 * @param {String} wordSub - Substring to match a new word up to
 * @param {Boolean} suffix - True if we're trying to match a new word
 * to the suffix of the last word
 * @returns {Model{Word}}
 */

let dirWordCount = 0;
const shouldSwapDir = (dir) => {
  dirWordCount += 1;
  const randomNum = Math.random();
  switch (dirWordCount % 5) {
    case 1:
      if (randomNum < 0.15) { return !dir; }
      return dir;
    case 2:
      if (randomNum < 0.3) { return !dir; }
      return dir;
    case 3:
      if (randomNum < 0.6) { return !dir; }
      return dir;
    case 4:
      if (randomNum < 0.85) { return !dir; }
      return dir;
    default:
      return !dir;
  }
};

const getMaxLength = (guessed) => {
  if (guessed.length < 5) {
    return 5;
  } else if (guessed.length < 10) {
    return 7;
  } else if (guessed.length < 15) {
    return 10;
  }

  return 20;
};

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
  maxLength = getMaxLength(guessed);

  const options = {
    length: { $lte: maxLength },
    difficulty: { $lte: difficulty },
    [direction]: { $in: wordSubArray },
    answer: { $nin: guessed },
    _id: { $nin: answersSent },
  };

  return Word.find(options)
    .sort({
      [direction]: -1,
      // length: -1,
    })
    .limit(40)
    .exec()
    .catch((err) => console.log(err));
};


let dir = false;
async function getNextWord(guessed, answersSent, maxLength = 12) {
  const guessedWord = guessed[guessed.length - 1];
  dir = shouldSwapDir(dir);
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
    const overlap = getOverlap(guessedWord, word.answer, !dir); // is guessed word undefined?
    return [word, overlap, !dir];
  }
  const overlap = getOverlap(guessedWord, word.answer, dir);
  // console.log(overlap);
  return [word, overlap, dir];
}

module.exports = getNextWord;
