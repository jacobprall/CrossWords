import React from 'react'; 
import {useSelector} from 'react-redux';
import { Container, Header, HeaderEle } from '../time_score_clue/time_score_clue'; 
import { Score } from '../time_score_clue/score'

export const GameEnd = ({ secondsElapsed }) => {
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
    
    
    // end logic

    return (
        <Container>
            <Header>
                <HeaderEle>
                    <Score/>
                </HeaderEle>
                <HeaderEle>
                   { secondsElapsed }
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

