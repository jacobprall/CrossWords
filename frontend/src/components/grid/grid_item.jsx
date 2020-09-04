import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components'; 
// import { use } from 'passport';


const Input = styled.input`
  width: 2.3rem; 
  height: 2.3rem; 
  border-radius: 0 0 0 0;
  grid-area: ${(props) => props.rowStart} / ${(props) => props.colStart};
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
  background-color: ${props => props.highlight ? "blue;" : ";"}
  display: ${props => !props.disp ? "none;" : ";" } 
`;

export const GridItem = ({ rowStart, colStart, addGridItem, value, focus, setFocus, setRow, width, setCol, populatedRow, highlight, setEnter}) => {
    const [char, setChar] = useState(""); 

    const update = () => {
        return e => {
            let input = e.target.value;
            let lastChar = input[input.length - 1]; 
            let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 

            if (!chars.split("").concat("").includes(lastChar)) {
                return;
            }

            setChar(input[input.length - 1]); 

            let gridItem = {};
            gridItem[rowStart] = [colStart, lastChar];
            addGridItem(
                { ...gridItem}
            )
            // setFocus(false); 
        }
    }

    useEffect(() => {
        setChar(value); 
    }, [value])

    const handleKeyDown = () => {
        return e => {
            if (e && e.key === 'Backspace') {
                setChar("");
            } else if (e && e.key === 'Enter') {
                setEnter(true); 
            }
        }
    }
    
    const handleClick = () => {
        // setFocus(true); 
        // if (colStart === width) {
        //     setRow(rowStart + 1); 
        //     setCol(1)
        // } else {
        //     setRow(rowStart); 
        //     setCol(colStart + 1);
        // }

    }

    let disp = (highlight || char.length); 
    // (rowStart === populatedRow) && 
    return (
        <Input type="text"
            rowStart={rowStart}  
            colStart={colStart} 
            value={char.toUpperCase()}
            onKeyDown={handleKeyDown()}
            onChange={update()}
            onClick={() => handleClick()}
            highlight={highlight}
            // ref={focus ? input => input && input.focus() : null}
            disabled={!highlight}
            disp={disp}
        />
    )
}