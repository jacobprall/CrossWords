import React from 'react';
import GridRow from './grid_row';

class Grid extends React.Component {
  componentWillMount() {
    document.removeEventListener('keydown', this.handleGuess.bind(this));
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
    if (!this.props.game || !this.props.clueHistory.length) return null;
    let gridRows = this.props.clueHistory.map((clue, idx) => {
      if (clue) {
        return (
        <GridRow
          key={`grid-row-${idx}`}
          clue={clue}
          // topHeight={idx}
          row={this.props.clueHistory.length}
          selected={Boolean(idx === this.props.clueHistory.length - 1)}
          correct={false}
        />)
      }
    });
    return (
      <div className="game-grid" tabIndex="0" onKeyDown={this.handleGuess.bind(this)}>
        {gridRows}
      </div>
    )
  }
}

export default Grid;
