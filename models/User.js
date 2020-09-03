const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    games: [
      {
        type: ObjectId,
        ref: 'Game',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
