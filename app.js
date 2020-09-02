/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const games = require('./routes/api/games');

require('./config/passport')(passport);

const app = express();

const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', users);
app.use('/api/games', games);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
