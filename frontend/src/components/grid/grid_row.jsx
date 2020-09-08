import React from 'react';
import { GridItem } from './grid_item';
import styled from 'styled-components';
import { useStateValue } from '../custom_hooks/useState';

export default ({
  clue,
  selected,
  rowPos,
  prevAnswer,
  thisAnswer,
  wasCorrect,
  wasRevealed,
}) => {
  let color;
  if (wasRevealed) {
    color = 'yellow';
  } else {
    color = wasCorrect ? 'green' : 'red';
  }
  let gridItems = [];
  for (let i = 0; i < clue.length; i++) {
    gridItems.push(
      <GridItem
        focus={Boolean(selected && i === 0)}
        key={`grid-item-${clue.id}-${i}-${rowPos}`}
        selected={selected}
        id={`grid-item-${i}`}
        rowPos={rowPos}
        colPos={clue.colStart + i + 1}
        color={color}
        wasRevealed={wasRevealed}
        answer={wasRevealed ? thisAnswer[i] : ''}
      />,
    );
  }
  return gridItems;
};
