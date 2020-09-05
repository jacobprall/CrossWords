import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';  
import { useStateValue } from '../state/state'; 

const Container = styled.div`
`

const Digits = styled.div`
`

const Start = styled.div`
`

export const TimeElapsed = ({ newGame, handleSeconds, endGame, game, timeRemaining }) => {
//   console.log("game state: ", game);
//   console.log('time remaining:', timeRemaining);
    const [seconds, setSeconds] = useState();
    const [isTicking, setIsTicking] = useState(false);
    const [state, dispatch] = useStateValue();
    const [secondsElapsed, setSecondsElapsed] = useState();
    
    useEffect(() => {
      setSecondsElapsed(0);
      if (!secondsElapsed) setIsTicking(true);
    }, [])

    useEffect(() => {
      setSeconds(timeRemaining);
    }, [timeRemaining]);

    useEffect(() => {
        let isSubscribed = true; 

        const addSeconds = async () => await dispatch({
            type: 'addSeconds',
            seconds
        }); 

        const addSecondsElapsed = async () => await dispatch({
            type: 'addSecondsElapsed',
            secondsElapsed
        }); 

        if (isSubscribed && !isNaN(seconds)) { addSeconds(); addSecondsElapsed(); }

        if (seconds <= 0) {
            endGame();
            setIsTicking(false);
        }
        return () => isSubscribed = false
    }, [seconds]); 

    useEffect(() => {
        let interval = null; 
        if (isTicking) {
            interval = setInterval(() => {
                if (!isNaN(seconds)) {
                    setSeconds(seconds => seconds - 1);
                    setSecondsElapsed(secondsElapsed => secondsElapsed + 1);
                    handleSeconds(seconds, secondsElapsed);
                }
            }, 1000); 
        } else if (!isTicking && seconds > 0) {
            clearInterval(interval); 
        }
        return ()  => clearInterval(interval); 
    }, [isTicking, seconds]); 


    let minutes = seconds ? `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? `0${(seconds % 60)}` : seconds % 60}` : null;
    
    return (
        <Container>
            <Digits>
                Time left: {seconds < 60 ? seconds : minutes }
            </Digits>
        </Container>
    )
}