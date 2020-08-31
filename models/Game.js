const mongoose = require('mongoose');
const Word = require('./Word');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const GameSchema = new Schema(
  {
    user: {
      type: ObjectId,
      required: true,
    },
    wordsSent: {
      type: Array,
      required: true,
    },
    wordsGuessed: {
      type: [Word],
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;
