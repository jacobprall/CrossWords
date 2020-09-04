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
    // e.preventDefault();
    if (e && e.key === 'Enter') {
      let enteredInputs = Array.from(document.getElementsByClassName('grid-item'))
        .filter(ele => [...ele.classList].includes('selected-row'));
      let guess = enteredInputs.map(input => input.value).join('').toUpperCase();
      console.log(this.props.gameId, this.props.seconds, this.props.secondsElapsed, guess);
      console.log("----------------------------------------------------")
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
        return (
        <GridRow
          key={clue.clue}
          clue={clue}
          row={idx+1}
          selected={Boolean(idx === clueHistory.length - 1)}
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



  // componentDidUpdate(prevProps) {
  //   if (this.props.game.nextWord != prevProps.game.nextWord) {
  //     let startPos;
  //     if (this.props.game.nextDir) {
  //       startPos = this.state.startPos - this.props.nextWord.length + this.props.game.overlap;
  //     } else {
  //       startPos = this.state.endPos + this.props.nextWord.length + this.props.game.overlap;
  //     }
  //     let endPos = startPos + this.props.nextWord.length;
  //     let row = this.props.answerHistory.length + 1;
  //     let key = `grid-row-${row}`;
  //     let clue = this.props.nextWord;
  //     this.concatNewGridRow(key, row, clue, startPos, endPos);
  //   }
  // }

    // concatNewGridRow(key, row, clue, startPos, endPos) {
  //   this.setState({
  //     gridRows: this.state.gridRows.concat([
  //       <GridRow
  //         clue={clue}
  //         row={row}
  //         key={key}
  //         startPos={startPos}
  //         endPos={endPos}
  //         updateGameDetails={this.props.updateGameDetails}
  //       />
  //     ]),
  //     lastRowStart: startPos,
  //     lastRowEnd: endPos,
  //   });
  // }