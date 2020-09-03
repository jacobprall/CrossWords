import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components'; 
import { use } from 'passport';

const Input = styled.input`
  width: 2.3rem; 
  height: 2.3rem; 
  border-radius: 0 0 0 0;
  grid-area: ${(props) => props.rowStart} / ${(props) => props.colStart};
  caret-color: transparent;
  text-align: center;
  font-size: 2.5rem;
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

export const GridItem = ({ rowStart, colStart, addGridItem, value}) => {
    const [char, setChar] = useState(""); 

    const update = () => {
        return e => {
            let input = e.target.value;
            let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
            if (!chars.split("").concat("").includes(input[input.length - 1])) {
                return;
            }
            setChar(input[input.length - 1]); 

            let gridItem = {};
            gridItem[rowStart] = [colStart, input];
            addGridItem(
                { ...gridItem}
            )
        }
    }

    useEffect(() => {
        setChar(value); 
    }, [value])

    const handleKeyDown = () => {
        return e => {
            if (e && e.keyCode === 8) {
                setChar("");
            }
        }
    }
    
    return (
        <Input type="text"
            rowStart={rowStart}  
            colStart={colStart} 
            value={char.toUpperCase()}
            onKeyDown={handleKeyDown()}
            onChange={update()}
        />
    )
}