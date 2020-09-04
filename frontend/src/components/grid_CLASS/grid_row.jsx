import React from 'react';
import { GridItem } from './grid_item';


export default ({ clue, selected, rowPos }) => {
    let gridItems = [];
    const wasCorrect = clue.wasCorrect || false

    for (let i = 0; i < clue.length; i++) {
      const colPos = clue.colStart + i
      gridItems.push(


      <GridItem
        focus={Boolean(selected && i === 0)}
        key={`grid-item-${i}`}
        selected={selected}
        wasCorrect={wasCorrect}
        rowPos={rowPos}
        colPos={colPos}
        id={`grid-item-${i}`}
      />
    );
  }
  return gridItems;
};
