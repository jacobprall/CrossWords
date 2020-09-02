import React from 'react'; 
import styled from 'styled-components'; 
import { GridItem } from './grid_item'; 
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
        <Grid height={HEIGHT} width={WIDTH}>
            {inputs}
        </Grid>
    )
}

