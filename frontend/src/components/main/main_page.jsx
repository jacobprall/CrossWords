import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import { GridContainer } from '../grid/grid_container'; 
import { TimeScoreClue } from '../time_score_clue/time_score_clue';
import { useFetchRedux } from '../custom_hooks/useFetchRedux'; 
import { fetchNewGame, updateGameDetails } from '../../actions/game_actions';
import { useSelector, useDispatch } from 'react-redux'; 
// fetchNewGame()
// updateGameDetails({ gameId: '', timeRemaining: 60, timeElapsed: 0, guess: '' })
// mDTP=> fetchNewGame: () => dispatch(fetchNewGame())

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

  return (
    <Container>
    <MainContainer>
      <GridContainer game={gameObj} />
        <TimeScoreClue newGame={newGame} clue={gameObj ? gameObj.nextClue : null} score={gameObj ? gameObj.score : null}/>
    </MainContainer>
    </Container>
  );
}
