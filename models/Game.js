const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const GameSchema = new Schema(
  {
    user: {
      type: ObjectId,
      required: true,
    },
    wordsGuessed: [
      {
        type: String,
        required: true,
      },
    ],
    wordsSent: [
      {
        type: ObjectId,
        ref: 'Word', // https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    timeRemaining: {
      type: Number,
      required: true,
    },
    timeElapsed: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;
