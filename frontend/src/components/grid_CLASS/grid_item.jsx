import React, { useState } from 'react';
import styled from 'styled-components';
// import { use } from 'passport';

const Input = styled.input`
  width: 2.3rem; 
  height: 2.3rem; 
  border-radius: 0 0 0 0;
  caret-color: transparent;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 500;
  padding-bottom: 0rem;
  &:focus {
    outline-style: none;
    background-color: #c8c8c8;
  }
  &:hover {
    cursor: pointer;
    background-color: #c8c8c8;
  }
`;

const GridInput = styled(Input)(({colPos, rowPos}) => ({
    gridColumn: `${colPos} / span 1`,
    gridRow: `${rowPos} / span 1`
}));

export const GridItem = ({ selected, colPos, rowPos }) => {
  const [char, setChar] = useState("");

  const handleChange = (e) => {
    let input = e.target.value;
    let lastChar = input[input.length - 1];
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (!chars.split("").concat("").includes(lastChar)) return;

    setChar(lastChar);
  }
  

  return (
    <GridInput 
      type="text"
      className={`grid-item${selected ? ' selected-row' : ''}`}
      value={char.toUpperCase()}
      onChange={handleChange}
      colPos={colPos}
      rowPos={rowPos}
    />
  )
}