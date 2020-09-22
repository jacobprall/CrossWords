import React from 'react';
import GridRow from '../grid/grid_row';

import { GridContainerSplash } from './splash_page_styled_components';
const clues = [
  { colStart: 6, length: 1, id: 0, splash: true, thisAnswer: 'A' },
  { colStart: 3, length: 7, id: 1, splash: true, thisAnswer: 'DYNAMIC' },
  { colStart: 0, length: 4, id: 2, splash: true, thisAnswer: 'WORD' },
  { colStart: 3, length: 4, id: 3, splash: true, thisAnswer: 'DUEL' },
];

const SplashGrid = () => {
  return (
    <GridContainerSplash>
      {clues.map((clue, idx) => (
        <GridRow
          key={clue.id}
          clue={{ ...clue }}
          selected={false}
          rowPos={idx + 1}
          prevAnswer={null}
          thisAnswer={clue.thisAnswer}
          wasCorrect={true}
          wasRevealed={true}
        />
      ))}
    </GridContainerSplash>
  );
};

SplashGrid.propTypes = {};

export default SplashGrid;
