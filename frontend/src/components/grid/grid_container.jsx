import React from 'react'; 
import styled from 'styled-components'; 
import { GridItem } from './grid_item'; 

const Grid = styled.div`
    display: grid; 
    grid: repeat(20, 3rem) / repeat(20, 3rem);  
    height: auto; 
    height: 60rem; 
    width: 60rem; 
    border: 0.1rem solid #696969;
`

export const GridContainer = (props) => {
    let inputs = []; 

    for(let i = 0; i < 20; i++) {
        for(let j = 0; j < 20; j++) {
            inputs.push(
                <GridItem key={`${i} ${j}`} 
                    rowStart={i + 1} 
                    rowEnd={i + 1} 
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

