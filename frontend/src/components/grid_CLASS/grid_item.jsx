import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { use } from 'passport';

const Input = styled.input`
  width: 2.3rem; 
  height: 2.3rem; 
  border-radius: 0 0 0 0;
  // grid-area: ${(props) => props.rowStart} / ${(props) => props.colStart};
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

export const GridItem = ({ selected }) => {
  const [char, setChar] = useState("");

  const update = () => {
    return e => {
      let input = e.target.value;
      let lastChar = input[input.length - 1];
      let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (!chars.split("").concat("").includes(lastChar)) {
        return;
      }

      setChar(lastChar);

    }
  }

  return (
    <Input type="text"
      className={`grid-item${selected ? ' selected-row' : ''}`}
      value={char.toUpperCase()}
      onChange={update()}
    />
  )
}