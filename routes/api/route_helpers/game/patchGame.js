const Game = require('../../../../models/Game');

module.exports = (req, res) => {
  Game.findById(req.params.id)
    .then((game) => {
      console.log(game);
      // const newGame = { ...game };
      // newGame.score = req.score;
      // newGame.wordsGuessed = req.wordsGuessed;
      // newGame.len = req.len;
      // newGame.dir = req.dir;
      // newGame.wordsSent = req.wordsSent.push(); // getNextWord(game.wordsGuessed, game.len, game.dir)
      // return newGame;
    })
    .then((game) => res.json(game));
};
