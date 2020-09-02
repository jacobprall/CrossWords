const Game = require('../../../../../models/Game');
const { updateGameState, getNewGameState } = require('./utils');
const { getNextWord } = require('../getNextWord');

module.exports = (req, res) => {
  Game.findById(req.params.id)
    .then((game) => getNewGameState(game, req.body))
    .then(updateGameState)
    .then(async (game) => {
      // Generate a new clue based on current conditions
      const [nextWord, nextIndex, nextDir] = await getNextWord(
        game.wordsGuessed,
        game.maxLength || 12,
        game.dir || true,
      );

      const { id, clue, difficulty, len } = nextWord;

      const returnObject = {
        timer: game.timer,
        score: game.score,
        nextClue: {
          id,
          clue,
          difficulty,
          len,
        },
        nextIndex,
        nextDir,
      };

      return returnObject;
    })
    .catch((err) => {
      console.error(err);
      return res.status(404).json(err);
    });

  // newGame.wordsGuessed = req.wordsGuessed;
};
