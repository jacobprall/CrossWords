import { isNumeric, isHexadecimal, isBoolean, toBoolean } from 'validator/es';
import validText from './valid-text';

const validateGuessInput = (oldData) => {
  const data = { ...oldData };
  const errors = {};

  data.gameId = isHexadecimal(data.gameId) ? data.gameId : '';
  data.guessIndex = isNumeric(data.guessIndex) ? data.guessIndex : '';
  data.correct = isBoolean(data.correct) ? toBoolean(data.correct) : '';
  data.word = validText(data.word) ? data.word : '';
  // data.position = ARRAY?
  data.points = isNumeric(data.points) ? isNumeric(data.points) : '';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateGuessInput;
