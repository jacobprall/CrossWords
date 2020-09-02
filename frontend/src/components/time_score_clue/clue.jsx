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

export const Clue = () => {
    return (
        <Container>
            <Header>
                {/* <YourClue> */}
                    Your Clue: 
                {/* </YourClue> */}
                <MagnifyingGlass src={magnifying_glass}/>
            </Header>
        </Container>
    )
}