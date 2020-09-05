const Game = require('../../../../../models/Game');
const Word = require('../../../../../models/Word');

const jwtVerify = require('../../jwtVerify');

module.exports = (req, res) => {
  const { gameId } = req.params;
  const jwt = req.headers.authorization.split(' ')[1];
  const { id: userId } = jwtVerify(jwt, res);

  Game.findById(gameId).then(async (game) => {
    if (game.user !== userId) res.status(401);

    const sentWordIds = game.wordsSent;

    const sentWords = await Promise.all(
      sentWordIds.map((id) =>
        Word.findById(id, { answer: 1, clue: 1, difficulty: 1 }).then(
          (word) => word,
        ),
      ),
    );

    res.json({
      game,
      sentWords,
    });
  });
};
