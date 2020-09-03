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

export const GridContainer = () => {
    let [gridItems, setGridItems] = useState([]);
    const [state, dispatch] = useStateValue(); 

    const addGridItem = (gridItem) => {
        setGridItems(
            gridItems.concat(gridItem)
        );
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
            let possibleVal = state[i + 1][j + 1]; 
            let val = possibleVal ? possibleVal : ""; 
         
            inputs.push(
                <GridItem key={`${i} ${j}`} 
                    rowStart={i + 1} 
                    colStart={j + 1} 
                    value={val}
                    addGridItem={addGridItem}
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

