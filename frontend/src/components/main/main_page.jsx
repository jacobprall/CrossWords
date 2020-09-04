import React from 'react';
import styled from 'styled-components'; 
import { GridContainer } from '../grid/grid_container'; 
import { TimeScoreClue } from '../time_score_clue/time_score_clue';
import GameErrors from '../errors/game_errors';

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

export default function MainPage(props) {
  let newGame = props.history.location.pathname === "/newGame";
  //fetch clue 
  return (
    <Container>
      <GameErrors />
    <MainContainer>
      <GridContainer/>
      <TimeScoreClue newGame={newGame}/>
    </MainContainer>
    </Container>
  );
}
