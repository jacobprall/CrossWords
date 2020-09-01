import { isNumeric, isHexadecimal, isBoolean, toBoolean } from 'validator/es';
import validText from './valid-text';

// gameId       Sent with patch req
// guessIndex   The index of the clues given
// guessedWord  The guess that the user is submitting
// correct      Boolean of whether this guess is correct
// word         The ID of the word in the DB from which the clue is drawn
// position     An array of the current cursor of the gameboard
//              (where the word starts within a grid, and possibly direction)
// points       Points that this guess is worth (positive or negative)

const validateGuessInput = (oldData) => {
  const data = { ...oldData };
  const errors = {};

  data.gameId = isHexadecimal(data.gameId) ? data.gameId : '';
  data.guessIndex = isNumeric(data.guessIndex) ? data.guessIndex : '';
  data.guessedWord = validText(data.guessWord) ? data.guessWord : '';
  data.correct = isBoolean(data.correct) ? toBoolean(data.correct) : '';
  data.word = isHexadecimal(data.word) ? data.word : '';
  data.position = data.position.map((ele) => (isNumeric(ele) ? ele : ''));
  data.points = isNumeric(data.points) ? isNumeric(data.points) : '';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateGuessInput;
