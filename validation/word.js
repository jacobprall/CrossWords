import isNumeric from 'validator/es/lib/isNumeric';
import validText from './valid-text';

const validateWordInput = (oldData) => {
  const data = { ...oldData };
  const errors = {};

  data.answer = validText(data.answer) ? data.answer : '';
  data.clue = validText(data.clue) ? data.clue : '';
  data.difficulty = isNumeric(data.difficulty) ? data.difficulty : '';
  data.length = isNumeric(data.length) ? data.length : '';

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

export default validateWordInput;
