const jwt = require('jsonwebtoken');
const currentUserCallback = require('./currentUser');
const User = require('../../../../models/User');
const Game = require('../../../../models/Game');


module.exports = (req, res) => {
    const { params: {id}, body } = req;

    User.findById(id)
        .then(
            user => {
                const gameIds = user.games;
                Game.find({ user: id })
                    .then (
                        games => {
                            const gamesArr = [];
                            let avgScore = 0;
                            let avgWordsSent = 0;
                            for (let i = 0; i < games.length; i++) {
                                gamesArr.push(games[i].id);
                                avgScore += games[i].score;
                                avgWordsSent += 1;
                            }
                            avgScore = (avgScore / games.length);
                            avgWordsSent = (avgWordsSent / games.length);
                            res.json({
                                gamesArr,
                                avgScore,
                                avgWordsSent,
                            })
                        }
                    )
            }
        )
};
