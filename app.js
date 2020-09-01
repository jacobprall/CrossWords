const express = require('express');
const app = express();
const path = require('path');
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
<<<<<<< HEAD


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
=======
app.use('/api/games', games);
>>>>>>> 0c70733e10aec2b84a5ef655228b768212a53666
