import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Modal } from '../modal/modal';
import { GameEnd } from '../game_end/game_end';
import background from '../../images/textured_paper/textured_paper_@2X.png';
import GameErrors from '../errors/game_errors';
import GameContainer from './game_container';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  background-image: url(${background});
`;

const MainContainer = styled.div`
  margin-top: 3rem;
  width: 90rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default function MainPage(props) {
  const newGame = props.history.location.pathname === '/newGame';
  const [seconds, setSeconds] = useState();
  const [secondsElapsed, setSecondsElapsed] = useState();
  const gameId = useSelector((state) => state.session.activeGame);
  const gameObj = useSelector((state) => state.game.active[gameId]);

  const handleSeconds = (secs, secsElapsed) => {
    if (secs) setSeconds(secs);
    if (secsElapsed) setSecondsElapsed(secsElapsed);
  };

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
    </Container>
  );
}
