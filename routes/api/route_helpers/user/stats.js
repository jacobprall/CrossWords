/* eslint-disable no-plusplus */
const Game = require('../../../../models/Game');

module.exports = (req, res) => {
  const {
    params: { userId },
  } = req;

  // User.findById(userId).then(() => {  // Not necessary
  Game.find({ user: userId }).then((games) => {
    const gamesArr = [];
    let avgScore = 0;
    let avgWordsSent = 0;
    let avgGameTime = 0;
    for (let i = 0; i < games.length; i++) {
      gamesArr.push(games[i].id);
      avgScore += games[i].score;
      avgWordsSent += 1;
      avgGameTime += games[i].timeElapsed;
    }
    avgScore /= games.length;
    avgWordsSent /= games.length;
    avgGameTime /= games.length;
    res.json({
      gamesArr,
      avgScore,
      avgWordsSent,
      avgGameTime,
    });
  });
};
