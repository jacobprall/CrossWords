import React, { useState, useEffect } from 'react'; 
import styled from 'styled-components';  

const Container = styled.div`
`

const Digits = styled.div`
`

const Start = styled.div`
`

//whatever button starts the game sends in starGame=true as a prop
export const Time = ({ newGame }) => {
    const [seconds, setSeconds] = useState(60) ;
    const [isTicking, setIsTicking] = useState(false)

    const toggle = () => {
        setIsTicking(!isTicking); 
    }
    
    const reset = () => {
        setSeconds(0);
        setIsTicking(false);
    }
    
    useEffect(() => {
        if (newGame) toggle(); 
    }, [newGame])

    useEffect(() => {
        let interval = null; 
        if (isTicking) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000); 
        } else if (!isTicking && seconds > 0) {
            clearInterval(interval); 
        }

        return ()  => clearInterval(interval); 
    }, [isTicking, seconds]); 


    let minutes = `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? `${seconds % 60}0` : seconds % 60}`;
    
    return (
        <Container>
            <Digits>
                Time left: {seconds < 60 ? seconds : minutes }
            </Digits>
        </Container>
    )
}