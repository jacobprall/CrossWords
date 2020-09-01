const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const games = require('./routes/api/games');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport')(passport);

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
