import React from 'react';
import GridRow from './grid_row';
import { useStateValue } from '../state/state'; 
import styled from 'styled-components';

const GridCSS = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(1, 1fr);
  margin-top: 3rem;
  margin-left: 0;
  margin-right: 0;
`

export default (props) => {
  const [ , dispatch] = useStateValue();

  const handleGuess = async (e) => {
    if (e && e.key === 'Enter') {
      let enteredInputs = [...document.getElementsByClassName('grid-item')]
        .filter(input => ([...input.classList].includes('selected-row') && input.value));
      let guess = null;
      if (enteredInputs.length === props.game.nextWord['length']) {
        guess = enteredInputs.map(input => input.value).join('');
      }
      if (guess) {
        await dispatch({
          type: 'addGuess',
          guess
        })
      }
    }
  }

  if (!props.game || !props.clueHistory.length) return null;

  let gridRows = props.clueHistory.map((clue, idx) => {
    if (clue) {
      let prevAnswer = props.answerHistory[idx - 1] || null;
      return (
      <GridRow
        key={`grid-row-${idx}`}
        clue={clue}
        rowPos={idx+1}
        prevAnswer={prevAnswer}
        selected={Boolean(idx === props.clueHistory.length - 1)}
        wasCorrect={clue.wasCorrect}
      />)
    }
  });

    return (
      <GridCSS tabIndex="0" onKeyDown={handleGuess}>
        {gridRows}
      </GridCSS>
    )
  }
