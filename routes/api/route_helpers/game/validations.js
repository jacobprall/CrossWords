const Joi = require('joi');

const guessSchema = Joi.object({
  guess: Joi.string().min(3).max(25).uppercase().required(),
  timeElapsed: Joi.number().greater(-1).required(),
  timeRemaining: Joi.number().greater(-1).required(),
});

module.exports = { guessSchema };
