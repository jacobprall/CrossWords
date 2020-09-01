import React, { useState } from 'react'; 
import styled from 'styled-components'; 

const Input = styled.input`
    border-radius: 0 0 0 0; 
    border: 0.1rem solid #696969;
    grid-area: ${props => props.rowStart} / 
        ${props => props.colStart} / 
        ${props => props.rowEnd} / 
        ${props => props.colEnd};
    caret-color: transparent; 
    text-align: center; 
    font-size: 2.5rem; 
    font-weight: 500;
    padding-bottom: 0.1rem;
    &:focus {
        outline-style: none; 
        background-color: #C8C8C8;
    }
`

export const GridItem = ({ rowStart, rowEnd, colStart, colEnd }) => {
    let [char, setChar] = useState(""); 

    const update = () => {
        return e => {
            let input = e.target.value;
            console.log(input); 
            let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
            if (!chars.split("").concat("").includes(input[input.length - 1])) {
                return;
            }
            setChar(input[input.length - 1]); 
        }
    }

    const handleKeyDown = (e) => {
        return e => {
            if (e && e.keyCode === 8) {
                setChar("");
            }
        }
    }
    
    return (
        <Input type="text"
            rowStart={rowStart} 
            rowEnd={rowEnd} 
            colStart={colStart} 
            colEnd={colEnd}
            value={char.toUpperCase()}
            onKeyDown={handleKeyDown()}
            onChange={update()}
        />
    )
}