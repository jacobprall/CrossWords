import React from 'react';
import { GridItem } from './grid_item';
import styled from 'styled-components'; 



export default ({ clue, selected }) => {
    let gridItems = [];

    for (let i = 0; i < clue.length; i++) {
      gridItems.push(
      <GridItem
        key={`grid-item-${i}`}
        selected={selected}
      />
        );
    }
    return gridItems
  }