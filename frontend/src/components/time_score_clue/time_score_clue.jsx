import React from 'react';
import styled from 'styled-components';
import { TimeElapsed } from './time_elapsed';
import { Score } from './score';
import { Clue } from './clue';

export const Container = styled.div`
    height: 10rem;
    width: auto;
    // position: sticky; 
    padding-bottom: 1rem; 
    display: flex; 
    flex-direction: column; 
    background-color: #E8E8E8; 
    border: 0.1rem solid #101010;
    border-radius: 0.2rem; 
    box-shadow: 0px 0px 1rem #D3D3D3;
`

export const Header = styled.div`
    width: 100%
    display: flex;
    flex-direction: column;
    justify-content: space-around; 
    margin-left: 2rem;
    margin-right: 2rem;
`

export const HeaderEle = styled.div`
    height: 3rem;
    margin-top: 0.5rem; 
    color: 	#101010;
    font-weight: 500; 
`

export const TimeScoreClue = ({ newGame, clue, score, handleSeconds, endGame, game, timeRemaining }) => {
    return (
        <Container>
            <Header>
                <HeaderEle>
                    <Score score={score} />
                </HeaderEle>
                <HeaderEle>
                    <TimeElapsed
                    game={game} // game object
                    newGame={newGame} // 
                    handleSeconds={handleSeconds} // function to tick
                    endGame={endGame} // game over callback
                    timeRemaining={timeRemaining} // game's timeRemaining in Number of seconds
                  />
                </HeaderEle>
                <HeaderEle>
                    <Clue clue={clue} />
                </HeaderEle>
            </Header>
        </Container>
    )
}