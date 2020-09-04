import React from 'react';
import { GridItem } from './grid_item';
import styled from 'styled-components'; 

const GridRowStyle = styled.div(props => {
  let leftWidth = `${props.colStart * 10}em`;
  let topHeight = `${props.topHeight * 10}em`;
  return ({
    display: 'flex',
    flexDirection: 'row',
    marginLeft: leftWidth,
  })
  });

export default ({ clue, selected, row, prevAnswer }) => {
    // clue = { _id: '', length: '', clue: '', colStart: '' }
    // vvv this is all bad
    let gridItems = [];
    for (let i = 0; i < clue.length; i++) {
      gridItems.push(<GridItem
        focus={Boolean(selected && i === 0)}
        key={`grid-item-${i}`}
        selected={selected}
        id={`grid-item-${i}`}
        rowPos={row}
        // placeholder={prevAnswer ? prevAnswer.substring(clue.colStart, clue.colStart + 1) : ''}
        colPos={clue.colStart + i + 1}
        />);
    }
    return (
      <GridRowStyle>
        {gridItems}
      </GridRowStyle>
    )
}