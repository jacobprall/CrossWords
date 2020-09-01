import React from 'react'; 
import styled from 'styled-components';  
import magnifying_glass from '../../images/magnifying_glass.png'

const Container = styled.div`
  height: 10rem;
  width: 20rem;
  padding-bottom: 1rem; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  background-color: #E8E8E8; 
  border: 0.1rem solid #101010;
  border-radius: 0.2rem; 
  box-shadow: 0px 0px 1rem #D3D3D3;
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
                <MagnifyingGlass src={magnifying_glass}/>
                <YourClue>
                    Your Clue: 
                </YourClue>
            </Header>
        </Container>
    )
}