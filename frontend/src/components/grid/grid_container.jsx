import React from 'react'; 
import styled from 'styled-components'; 
import { GridItem } from './grid_item'; 
export const HEIGHT = 20; 
export const WIDTH = 20; 

const Grid = styled.div`
  display: grid;
  grid: repeat(WIDTH, 3rem) / repeat(HEIGHT, 3rem);
  height: auto;
  height: 60rem;
  width: 60rem;
  border: 0.1rem solid #101010;
`;

export const GridContainer = (props) => {
    let inputs = []; 

    for(let i = 0; i < WIDTH; i++) {
        for(let j = 0; j < HEIGHT; j++) {
            inputs.push(
                <GridItem key={`${i} ${j}`} 
                    rowStart={i + 1} 
                    rowEnd={i + 2} 
                    colStart={j + 1} 
                    colEnd={j + 2}/>
            )
        }
    }

    return (
        <Grid>
            {inputs}
        </Grid>
    )
}

