const Game = require('../../../../models/Game');

module.exports = (req, res) => {
   
  Game.findById(req.params.id)
    .then((game) => {
      const nextWordResult = await getNextWord(game.wordsGuessed, game.maxLength, game.dir)[0];
      const nextWord = nextWordResult[0];
      const nextIndex = nextWordResult[1];
      const nextDir = nextWordResult[2];

      const newGame = { ...game };
      newGame.score = req.score;
      newGame.wordsGuessed = req.wordsGuessed;
      newGame.maxlength = req.maxLength;
      newGame.dir = req.dir;
      newGame.wordsSent = req.wordsSent.push(nextWord); // getNextWord(game.wordsGuessed, game.len, game.dir)
      //added
      newGame.nextIndex = nextIndex;
      newGame.nextDir = nextDir;
      return newGame;
    })
    .then((game) => res.json(game));
};
