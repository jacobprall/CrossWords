import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import { GridContainer } from '../grid/grid_container'; 
import GridContainerCLASS from '../grid_CLASS/grid_container'; 
import { TimeScoreClue } from '../time_score_clue/time_score_clue';
import { useFetchRedux } from '../custom_hooks/useFetchRedux'; 
import { fetchNewGame, updateGameDetails } from '../../actions/game_actions';
import { useSelector, useDispatch } from 'react-redux'; 
import { Modal } from '../modal/modal'; 
import { GameEnd } from '../game_end/game_end'; 
// fetchNewGame()
// updateGameDetails({ gameId: '', timeRemaining: 60, timeElapsed: 0, guess: '' })
// mDTP=> fetchNewGame: () => dispatch(fetchNewGame())
import GameErrors from '../errors/game_errors';
import GameContainer from './game_container'; 

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  overflow-x: scroll;
`

// const MainContainer = styled.div`
//   margin-top: 3rem;
//   // width: 90rem;
//   display: flex;  
//   flex-direction: column;
//   justify-content: flex-start; 
//   align-items: center; 
//   z-index: 1,
// `

export default function MainPage(props) {
  const newGame = props.history.location.pathname === "/newGame";
  // const [ setAction, isLoading, error ] = useFetchRedux(); 
  // setAction(fetchNewGame());
  const [loading, setLoading] = useState(null); 
  const [seconds, setSeconds] = useState(); 
  const [secondsElapsed, setSecondsElapsed] = useState(); 
  const dispatch = useDispatch(); 
  const gameId = useSelector(state => state.session.activeGame);
  const gameObj = useSelector(state => state.game.active[gameId]);
  // if (gameObj) { console.log('main page time remaining: ', gameObj.timeRemaining);}

  // useEffect(() => {
  //   let isSubscribed = true;

  //   // const fetchData = async () => {
  //   //   setLoading(true);
  //   //   try {
  //   //     await dispatch(fetchNewGame());
  //   //   } catch (err) {
  //   //     // setError(error)
  //   //   }
  //   //   setLoading(false);
  //   // }

  //   // if (isSubscribed && !gameId) fetchData();

  //   return () => isSubscribed = false; 
  // }, [])


  const handleSeconds = (secs, secsElapsed) => {
    if (secs) setSeconds(secs);
    if (secsElapsed) setSecondsElapsed(secsElapsed)
  }

 
  return (
    <Container>
      <GameErrors />
      <Modal 
        isShowing={props.isShowing} 
        Comp={GameEnd} 
        score={gameObj ? gameObj.score : null}
        />
    <GameContainer
      gameObj={gameObj}
      gameId={gameId}
      seconds={seconds}
      secondsElapsed={secondsElapsed}
      newGame={newGame} 
      endGame={props.endGame}
      clue={gameObj ? gameObj.nextWord : null}
      score={gameObj ? gameObj.score : null}
      handleSeconds={handleSeconds}
      timeRemaining={gameObj ? gameObj.timeRemaining : 60.0}
    />
    {/* <MainContainer>
      <TimeScoreClue 
        newGame={newGame} 
        game={gameObj}
        clue={gameObj ? gameObj.nextWord : null}
        score={gameObj ? gameObj.score : null}
        handleSeconds={handleSeconds}
        endGame={props.endGame}
        timeRemaining={gameObj ? gameObj.timeRemaining : 60.0}
      />
      <GridContainerCLASS game={gameObj} seconds={seconds} secondsElapsed={secondsElapsed} />
    </MainContainer> */}
    </Container>
  );
}
