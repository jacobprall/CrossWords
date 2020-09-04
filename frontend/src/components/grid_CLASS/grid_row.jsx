import React from 'react';
import { GridItem } from './grid_item';

export default ({ clue, selected, row }) => {
  let gridItems = [];

  for (let i = 0; i < clue.length; i++) {
    gridItems.push(
      <GridItem
        focus={Boolean(selected && i === 0)}
        key={`grid-item-${i}`}
        selected={selected}
        id={`grid-item-${i}`}
        rowPos={row}
        colPos={clue.colStart + i + 1}
      />
    );
  }
  return gridItems;
};
