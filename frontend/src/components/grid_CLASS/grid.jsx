import React from 'react';
import GridRow from './grid_row';

class Grid extends React.Component {

  constructor(props) {
    super(props);

    this.handleGuess = this.handleGuess.bind(this);
  }
  componentDidMount() {
    // if (!this.props.game) this.props.fetchNewGame();
    document.addEventListener('keydown', this.handleGuess);
  }


  componentWillMount() {
    document.removeEventListener('keydown', this.handleGuess);
    // this.props.clearGameState();
  }

  handleGuess(e) {
    if (e && e.key === 'Enter') {
      let enteredInputs = Array.from(document.getElementsByClassName('grid-item'))
        .filter(ele => [...ele.classList].includes('selected-row'));
      let guess = enteredInputs.map(input => input.value).join('').toUpperCase();

      this.props.updateGameDetails({
        gameId: this.props.gameId,
        timeRemaining: this.props.seconds,
        timeElapsed: this.props.secondsElapsed,
        guess,
      })
    }
  }

  render() {
    const {game, clueHistory} = this.props;

    if (!game || !clueHistory.length) return <div className="game-grid"/>;

    const gridRows = clueHistory.map((clue, idx) => {
      if (clue) {
        let prevAnswer = this.props.answerHistory[idx - 1] || null;
        return (
        <GridRow
          key={clue.clue}
          clue={clue}
          row={this.props.clueHistory.length}
          prevAnswer={prevAnswer}
          selected={Boolean(idx === this.props.clueHistory.length - 1)}
          correct={false}
        />)
      }
    });
    return (
      <div className="game-grid" tabIndex="0" onKeyDown={this.handleGuess}>
        {gridRows}
      </div>
    )
  }
}

export default Grid;
