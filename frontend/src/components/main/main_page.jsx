import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import { GridContainer } from '../grid/grid_container'; 
import GridContainerCLASS from '../grid_CLASS/grid_container'; 
import { TimeScoreClue } from '../time_score_clue/time_score_clue';
import { useFetchRedux } from '../custom_hooks/useFetchRedux'; 
import { fetchNewGame, updateGameDetails } from '../../actions/game_actions';
import { useSelector, useDispatch } from 'react-redux'; 
import { Modal } from '../modal/modal'
// fetchNewGame()
// updateGameDetails({ gameId: '', timeRemaining: 60, timeElapsed: 0, guess: '' })
// mDTP=> fetchNewGame: () => dispatch(fetchNewGame())
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
  const newGame = props.history.location.pathname === "/newGame";
  // const [ setAction, isLoading, error ] = useFetchRedux(); 
  // setAction(fetchNewGame());
  const [loading, setLoading] = useState(null); 
  const [seconds, setSeconds] = useState(); 
  const [secondsElapsed, setSecondsElapsed] = useState(); 
  const dispatch = useDispatch(); 
  const gameId = useSelector(state => state.session.activeGame); 
  const gameObj = useSelector(state => state.game.active[gameId]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchNewGame());
      } catch (err) {
        // setError(error)
      }
      setLoading(false);
    }

    if (isSubscribed && !gameId) fetchData();

    return () => isSubscribed = false; 
  }, [])


  const handleSeconds = (secs, secsElapsed) => {
    setSeconds(secs);
    setSecondsElapsed(secsElapsed)
  }


  return (
    <Container>
      <GameErrors />
    <MainContainer>
      {/* <GridContainer game={gameObj} seconds={seconds} secondsElapsed={secondsElapsed} /> */}
      <GridContainerCLASS game={gameObj} seconds={seconds} secondsElapsed={secondsElapsed} />
        <TimeScoreClue 
          newGame={newGame} 
          clue={gameObj ? gameObj.nextClue : null} 
          score={gameObj ? gameObj.score : null} 
          handleSeconds={handleSeconds} 
          endGame={endGame}/>
    </MainContainer>
    </Container>
  );
}
