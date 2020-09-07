import React from 'react';
import styled from 'styled-components';
import { TimeElapsed } from './time_elapsed';
import { Score } from './score';
import { Clue } from './clue';
import background from '../../images/textured_paper/textured_paper_@2X.png';


export const Container = styled.div`
    height: 10rem;
    width: auto;
    position: relative;
    top: 0;  
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 1rem; 
    display: flex; 
    flex-direction: column; 
    border: 1px solid #4e89ae
    border-radius: 0.2rem; 
    font-weight: 300;
    z-index: 11;
`;

export const Header = styled.div`
  width: 100%;
  min-width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
  border: 1px solid lightgray;
  padding: 10px;
  background-image: ${background};
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 2;
`;

export const HeaderEle = styled.div`
  margin-top: 0.5rem;
  margin-right: 20px;
  color: #101010;
  justify-content: center;
`;

export const ScoreTime = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`;

export const TimeScoreClue = ({
  newGame,
  clue,
  score,
  handleSeconds,
  endGame,
  game,
  timeRemaining,
}) => {
  return (
    <Container>
      <Header>
        <HeaderEle>
          <ScoreTime>
            <Score score={score} />
            <TimeElapsed
              game={game} // game object
              newGame={newGame} //
              handleSeconds={handleSeconds} // function to tick
              endGame={endGame} // game over callback
              timeRemaining={timeRemaining} // game's timeRemaining in Number of seconds
            />
          </ScoreTime>
        </HeaderEle>
        <HeaderEle>
          <Clue clue={clue} />
        </HeaderEle>
      </Header>
    </Container>
  );
};
