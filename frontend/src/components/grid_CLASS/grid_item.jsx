import React, { useState } from 'react';
import styled from 'styled-components';
import { useRef } from 'react';

const Input = styled.input`
  width: 2.3rem; 
  height: 2.3rem; 
  border-radius: 0 0 0 0;
  caret-color: transparent;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 500;
  padding-bottom: 0rem;
  &.selected-row {
    background-color: #B1D8FB;
  }
  &:focus {
    outline-style: none;
    background-color: #FADA4A;
  }
  &:hover {
    cursor: pointer;
    background-color: #FADA4A;
  }
`;


const GridInput = styled(Input)(({colPos, rowPos, color}) => ({

    gridColumn: `${colPos} / span 1`,
    gridRow: `${rowPos} / span 1`,
    color: `${color}`,
}));


export const GridItem = ({ selected, id, rowPos, colPos, focus, color, answer, wasRevealed }) => {
  const [char, setChar] = useState("");



  const handleChange = (e) => {
    let input = e.target.value;
    let lastChar = input[input.length - 1];
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


    if (chars.includes(lastChar)) {
      setChar(lastChar);
      let nextInput = e.currentTarget.nextSibling;
      if (nextInput) nextInput.focus();
    }
  }

  const clickHandler = () => {
    return e => {
      e.currentTarget.focus();
    }
  }

  const handleKeyDown = () => {
    return e => {
      if (e) {
        if (e.key === 'Backspace') {
          let prevInput = e.currentTarget.previousSibling;
          if (prevInput) {
            setChar('');
            prevInput.focus();
          }
        } else if (e.key === 'ArrowLeft') {
          let prevInput = e.currentTarget.previousSibling;
          if (prevInput) prevInput.focus();
        } else if (e.key === 'ArrowRight') {
          let nextInput = e.currentTarget.nextSibling;
          if (nextInput) nextInput.focus();
        }
      }
    }

  }
  

  return (
    <GridInput 
      type="text"
      className={`grid-item${selected ? ' selected-row' : ''} ${rowPos}`}
      value={selected ? (char ? char.toUpperCase() : '') : (wasRevealed ? answer : char.toUpperCase())}
      onChange={handleChange}
      colPos={colPos}
      rowPos={rowPos}
      autoFocus={focus}
      onKeyDown={handleKeyDown()}
      onClick={clickHandler()}
      id={id}
      color={selected ? 'black' : color}
      disabled={!selected}
    />
  )
}