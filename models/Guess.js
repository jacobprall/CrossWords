const mongoose = require('mongoose');
const Word = require('./Word');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const GuessSchema = new Schema(
  {
    gameId: {
      type: ObjectId,
      required: true,
    },
    guessIndex: {
      type: Number,
      required: true,
    },
    correct: {
      type: Boolean,
      require: true,
    },
    word: {
      type: Word,
      required: true,
      uppercase: true,
    },
    position: {
      // type: [Number],
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Guess = mongoose.model('Guess', GuessSchema);
module.exports = Guess;
