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

export const GridItem = ({ selected, id, ref, rowPos, colPos }) => {
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
      let nextInput = e.currentTarget.nextSibling;
      if (nextInput) nextInput.focus();
    }
  }

  const clickHandler = () => {
    return e => {
      e.currentTarget.value = '';
      e.currentTarget.focus();
    }
  }

  const handleKeyDown = () => {
    return e => {
      if (e && e.key === 'Backspace') {
        let prevInput = e.currentTarget.previousSibling;
        if (prevInput) {
          prevInput.value = '';
          prevInput.focus();
        }
      }
    }
  }

  return (
    <Input type="text"
      className={`grid-item${selected ? ' selected-row' : ''}`}
      value={char.toUpperCase()}
      onKeyDown={handleKeyDown()}
      onChange={update()}
      onClick={clickHandler()}
      id={id}
      rowPos={rowPos}
      colPos={colPos}
    />
  )
}