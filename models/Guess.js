const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

// gameId       Sent with patch req
// guessIndex   The index of the clues given
// guessedWord  The guess that the user is submitting
// correct      Boolean of whether this guess is correct
// word         The word in the DB from which the clue is drawn
// position     The current cursor of the gameboard (where the word starts
//                within a grid, and possibly direction)
// points       Points that this guess is worth (positive or negative)

const GuessSchema = new Schema(
  {
    gameId: {
      type: ObjectId,
      required: true,
      ref: 'Game',
    },
    guessIndex: {
      type: Number,
      required: true,
    },
    guessedWord: {
      type: String,
      required: true,
    },
    correct: {
      type: Boolean,
      require: true,
    },
    word: {
      type: ObjectId,
      ref: 'Word',
    },
    position: [
      {
        type: Number,
        required: true,
      },
    ],
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
