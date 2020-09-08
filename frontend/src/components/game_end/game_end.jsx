import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Header,
  HeaderEle,
} from '../time_score_clue/time_score_clue';
import { Score } from '../time_score_clue/score';
import { useStateValue } from '../custom_hooks/useState';
import { useEffect } from 'react';
import styled from 'styled-components';
const EndGameModalContainer = styled.div`
  width: auto;
  padding-bottom: 1rem;
  display: flex;
  border: 1px solid #4e89ae
  font-weight: 300;
  border-radius: 0.2rem;
`;

const EndGameModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
  border: 1px solid lightgray;
  padding: 30px;
  background-color: white;
  z-score: 15;
`;

export const GameEnd = ({ secondsElapsed, score }) => {
  const [state, dispatch] = useStateValue();
  const [s, setS] = useState();

  useEffect(() => {
    if (state.secondsElapsed) setS(state.secondsElapsed);
  }, []);

  const guesses = useSelector((state) => state.game.clueHistory);
  let numTotal = 1;
  let numCorrect = 0;
  if (guesses[0]) {
    numTotal = guesses.length;
    numCorrect = guesses
      .map((ele) => {
        if (ele.wasCorrect) {
          return 1;
        } else {
          return 0;
        }
      })
      .reduce((acc, ele) => {
        return (acc += ele);
      });
  }

  let minutes = s
    ? `${Math.floor((s + 1) / 60)}:${
        (s + 1) % 60 < 10 ? `${(s + 1) % 60}0` : (s + 1) % 60
      }`
    : null;

  return (
    <EndGameModalContainer>
      <EndGameModal>
        <HeaderEle>
          <Score score={score} />
        </HeaderEle>
        <HeaderEle>{'Time Elapsed: ' + (s < 60 ? s + 1 : minutes)}</HeaderEle>
        <HeaderEle>{`${numCorrect} out of ${numTotal} Correct`}</HeaderEle>
      </EndGameModal>
    </EndGameModalContainer>
  );
};

//score
//time elapsed
//correctly submitted words / total words
