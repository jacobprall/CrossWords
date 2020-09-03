import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components'; 
import { GridItem } from './grid_item'; 
import { useStateValue } from '../state/state'; 

export const HEIGHT = 20; 
export const WIDTH = 20; 

const Grid = styled.div`
  box-sizing: border-box; 
  display: grid;
  grid: repeat(${props => props.height}, 2.5rem) / repeat(${props => props.width}, 2.5rem);
  place-items: center center;
  align-content: center center;
  height: 50.4rem;
  width: 50.4rem;
`;

// grid[row][col]
// {
//     grid : {
//         row : { col: val }
//         row : { col: val }
//         row : { col: val }
//         row : { col: val }
//         row : { col: val }
//         row : { col: val }
//     }, 
//     seconds: 54
// }

export const GridContainer = () => {
    const [gridItems, setGridItems] = useState([]);
    const [state, dispatch] = useStateValue(); 
    const [focus, setFocus] = useState(false); 
    const [row, setRow] = useState(null); 
    const [col, setCol] = useState(null); 

    const grid = state["grid"];

    const addGridItem = (gridItem) => {
        setGridItems(
            gridItems.concat(gridItem)
        );
        setFocus(false); 
    }

    useEffect(() => {
        let isSubscribed = true; 
        const updateState = async () => {
            await dispatch(
                {
                    type: 'addGridItems', 
                    gridItems: gridItems
                }
            )
        }

        if (isSubscribed) updateState();  
        return () => isSubscribed = false;
    }, [gridItems])

    let inputs = []; 
    
    for(let i = 0; i < WIDTH; i++) {
        for(let j = 0; j < HEIGHT; j++) {
            let possibleVal = grid[i + 1][j + 1]; 
            let val = possibleVal ? possibleVal : ""; 
            let prevVal; 
            if (j + 1 === 1) { 
                if (grid[i]) prevVal = grid[i][WIDTH];
            } else {
                prevVal = grid[i + 1][j]; 
            }

            let foc = false;  

            if (!focus) {
                if (j + 1 === 1 && i > 1) {
                    foc = !possibleVal && grid[i][WIDTH] ? true : false;
                } else {
                    foc = !possibleVal && grid[i + 1][j] ? true : false;
                }
            } else if (focus && prevVal && row === i + 1 && col === j + 1)  {
                foc = true; 
            }

            inputs.push(
                <GridItem key={`${i} ${j}`} 
                    rowStart={i + 1} 
                    colStart={j + 1} 
                    value={val}
                    addGridItem={addGridItem}
                    focus={foc}
                    setFocus={setFocus}
                    setRow={setRow}
                    setCol={setCol}
                    width={WIDTH}
                />
            )
        }

    }

    return (
        <Grid height={HEIGHT} width={WIDTH}>
            {inputs}
        </Grid>
    )
}

