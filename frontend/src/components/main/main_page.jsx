import React from 'react';
import styled from 'styled-components'; 
import { GridContainer } from '../grid/grid_container'; 
import { Clue } from '../clue/clue'; 

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  overflow-x: hidden; 
`

const MainContainer = styled.div`
  margin-top: 3rem;
  width: 90rem;
  display: flex;  
  justify-content: space-around; 
  align-self: center; 
`

const Footer = styled.h1`
  align-self: flex-end;
  font-size: 1rem;  
  margin-right: 1.5rem;
  margin-bottom: 0.5rem; 
`

export default function MainPage() {
  return (
    <Container>
      <MainContainer>
      <GridContainer/>
      <Clue/>
    </MainContainer>
      <Footer>Copyright &copy; 2020 AcrossWords</Footer>
    </Container>
  );
}
