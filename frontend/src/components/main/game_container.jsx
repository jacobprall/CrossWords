import React, { useEffect } from 'react'; 
import { useStateValue } from '../state/state'; 
import GridContainerCLASS from '../grid_CLASS/grid_container'; 
import { TimeScoreClue } from '../time_score_clue/time_score_clue';
import { updateGameDetails } from '../../actions/game_actions'; 
import { useDispatch } from 'react-redux'
import styled from 'styled-components'; 

const MainContainer = styled.div`
  margin-top: 3rem;
  // width: 90rem;
  display: flex;  
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center; 
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  overflow-x: scroll;
  overflow-y: scroll;
`

export default (props) => {
    const [state] = useStateValue(); 
    const dispatch = useDispatch(); 
    let guess = state['guess'];

    const updateGame = ({ gameId, timeRemaining, timeElapsed, guess }) => {
      console.log('here')
      return dispatch(updateGameDetails({ gameId, timeRemaining, timeElapsed, guess }));
    }

  
    useEffect(() => {
      if (guess) {
        updateGame({
          gameId: props.gameId,
          timeRemaining: props.seconds,
          timeElapsed: props.secondsElapsed,
          guess,
        })
      }
    }, [guess])
    
    return (
      <MainContainer>
        <TimeScoreClue 
          newGame={props.newGame} 
          game={props.gameObj}
          clue={props.clue}
          score={props.score}
          handleSeconds={props.handleSeconds}
          endGame={props.endGame}
          timeRemaining={props.timeRemaining}
        />
        <GridContainerCLASS game={props.gameObj}/>
      </MainContainer>
    )
}