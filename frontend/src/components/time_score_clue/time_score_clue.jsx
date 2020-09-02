import React from 'react';
import styled from 'styled-components';
import { Time } from './time';
import { Score } from './score';
import { Clue } from './clue';

const Container = styled.div`
    height: 10rem;
    width: auto;
    padding-bottom: 1rem; 
    display: flex; 
    flex-direction: column; 
    background-color: #E8E8E8; 
    border: 0.1rem solid #101010;
    border-radius: 0.2rem; 
    box-shadow: 0px 0px 1rem #D3D3D3;
`

const Header = styled.div`
    width: 100%
    display: flex;
    flex-direction: column;
    justify-content: space-around; 
    margin-left: 2rem;
    margin-right: 2rem;
`

const HeaderEle = styled.h2`
    height: 3rem;
    margin-top: 0.5rem; 
    color: 	#101010;
    font-weight: 500; 
`

export const TimeScoreClue = ({newGame}) => {
    return (
        <Container>
            <Header>
                <HeaderEle>
                    <Score/>
                </HeaderEle>
                <HeaderEle>
                    <Time newGame={newGame}/>
                </HeaderEle>
                <HeaderEle>
                    <Clue/>
                </HeaderEle>
            </Header>
        </Container>
    )
}