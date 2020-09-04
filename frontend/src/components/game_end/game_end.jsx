import React, {useState} from 'react'; 
import {useSelector} from 'react-redux';
import { Container, Header, HeaderEle } from '../time_score_clue/time_score_clue'; 
import { Score } from '../time_score_clue/score'; 
import { useStateValue } from '../state/state'; 
import { useEffect } from 'react';

export const GameEnd = ({ secondsElapsed }) => {
    const [state, dispatch] = useStateValue();
    const [s, setS] = useState(); 

    useEffect(() => {
        if (state.secondsElapsed) setS(state.secondsElapsed); 
    }, [state]);

    const guesses = useSelector(state => state.game.clueHistory)
    let numTotal = 1;
    let numCorrect = 0;
    if (guesses[0]) {
        numTotal = guesses.length;
        numCorrect = guesses.map((ele) => {
            if (ele.wasCorrect) {
                return 1;
            } else {
                return 0;
            }
            }).reduce((acc, ele) => {
            return acc += ele
            });
        };

    let minutes = s ? `${Math.floor( (s + 1) / 60)}:${ (s + 1) % 60 < 10 ? `${ (s + 1) % 60}0` : (s + 1) % 60}` : null;
    return (
        <Container>
            <Header>
                <HeaderEle>
                    <Score/>
                </HeaderEle>
                <HeaderEle>
                   { "Time Elapsed: " + ( s < 60 ? s + 1 : minutes) }
                </HeaderEle>
                <HeaderEle>
                    {`${numCorrect} out of ${numTotal} Correct`}
                </HeaderEle>
            </Header>
        </Container>
    )
}

//score 
//time elapsed 
//correctly submitted words / total words 

