import React from 'react'; 
import styled from 'styled-components';  
import magnifying_glass from '../../images/magnifying_glass.png'

const Container = styled.div`
`

const Header = styled.div`
    display: flex;
    align-items: center; 
`

const MagnifyingGlass = styled.img`
    height: 3rem; 
    width: 3rem; 
`

const YourClue = styled.h1`
  height: 3rem;
  margin-top: 0.5rem; 
  color: 	#101010;
  font-weight: 500; 
`

export const Clue = ({ clue }) => {
    if (!clue) return null;
    return (
        <Container>
            <Header>
                <MagnifyingGlass src={magnifying_glass}/>
                {/* <YourClue> */}
                    {`${clue.clue} (${clue.length} letters)`}
                {/* </YourClue> */}
            </Header>
        </Container>
    )
}