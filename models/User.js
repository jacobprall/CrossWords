const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    games: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
