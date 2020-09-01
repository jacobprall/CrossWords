import React from 'react';
import GameItem from './game_item';
import * as game from './utils';

class GameIndex extends React.Component {
    constructor(props) {
        this.endGame = this.endGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.timer = setInterval(this.endGame, 45000);
        const game = new game.Crossword(20); // with width
        this.state = { game: game };
    }

    endGame() {
        // final patch for game
    }

    updateGame() {
        const game = this.state.game;
        /*
        game logic controller

        */
       this.setState( { game: game } );
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default GameIndex;