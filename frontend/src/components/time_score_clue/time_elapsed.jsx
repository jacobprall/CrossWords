import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';  
import { useStateValue } from '../state/state'; 

const Container = styled.div`
`

const Digits = styled.div`
`

const Start = styled.div`
`

//whatever button starts the game sends in starGame=true as a prop

export const TimeElapsed = ({ newGame, handleSeconds, endGame, game }) => {
    const [seconds, setSeconds] = useState();
    const [isTicking, setIsTicking] = useState(false);
    const [state, dispatch] = useStateValue(); 
    const [secondsElapsed, setSecondsElapsed] = useState(0); 
   
    const toggle = () => {
        setIsTicking(!isTicking); 
    }
    
    const reset = () => {
        setIsTicking(false);
    }
    
    useEffect(() => {
        if (!isNaN(state["seconds"])) {
            setSeconds(state["seconds"]);
        } else {
            setSeconds(60.0); // Don't commit this
        }
    }, [])

    useEffect(() => {
        if (newGame) toggle(); 
    }, [newGame])

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

        if (seconds === 0) { 
            endGame(); 
            reset(); 
        }
        return () => isSubscribed = false
    }, [seconds]); 

    useEffect(() => {
        let interval = null; 
        if (isTicking) {
            interval = setInterval(() => {
                if (!isNaN(seconds)) {
                    setSeconds(seconds => seconds - 1);
                    setSecondsElapsed(setSecondsElapsed => setSecondsElapsed + 1);
                    handleSeconds(seconds, secondsElapsed); 
                }
            }, 1000); 
        } else if (!isTicking && seconds > 0) {
            clearInterval(interval); 
        }

        return ()  => clearInterval(interval); 
    }, [isTicking, seconds]); 


    let minutes = seconds ? `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? `${seconds % 60}0` : seconds % 60}` : null;
    
    return (
        <Container>
            <Digits>
                Time left: {seconds < 60 ? seconds : minutes }
            </Digits>
        </Container>
    )
}