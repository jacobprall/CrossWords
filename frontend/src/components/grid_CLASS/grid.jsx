import React from 'react';
import GridRow from './grid_row';
import styled from 'styled-components';

const GridCSS = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  margin-top: 3rem;
`

class Grid extends React.Component {
  // componentDidMount() {
  //   // if (!this.props.game) this.props.fetchNewGame();
  //   document.addEventListener('keydown', this.handleGuess.bind(this));
  // }

  componentWillUnmount() {
    // document.removeEventListener('keydown', this.handleGuess.bind(this));
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

        //   const updateGame = async (g, w) => (
        //     await dispatchRedux(updateGameDetails({
        //         gameId: g.gameId,
        //         guess: w,
        //         timeRemaining: seconds,
        //         timeElapsed: secondsElapsed})
        //     )
        // )

  render() {
    if (!this.props.game || !this.props.clueHistory.length) return null;
    let gridRows = this.props.clueHistory.map((clue, idx) => {
      if (clue) {
        let prevAnswer = this.props.answerHistory[idx - 1] || null;
        return (
        <GridRow
          key={`grid-row-${idx}`}
          clue={clue}
          rowPos={idx+1}
          prevAnswer={prevAnswer}
          selected={Boolean(idx === this.props.clueHistory.length - 1)}
          wasCorrect={clue.wasCorrect}
        />)
      }
    });
    return (
      <GridCSS tabIndex="0" onKeyDown={this.handleGuess.bind(this)}>
        {gridRows}
      </GridCSS>
    )
  }
}

export default Grid;
