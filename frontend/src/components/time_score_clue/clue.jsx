import React from 'react';
import styled from 'styled-components';
import magnifying_glass from '../../images/magnifying_glass.png';
import { getClueAnswer } from '../../util/word_util';
import { useStateValue } from '../state/state'; 
import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const MagnifyingGlass = styled.img`
  height: 3rem;
  width: 3rem;
`;

const YourClue = styled.h4`
  margin-top: 0.5rem;
  color: #101010;
  font-weight: 500;
  overflow-wrap: normal;
  word-wrap: break-word;
`;

const RevealButton = styled.button`
  width: 15%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: transparent;
  color: #101010;
  outline: none;
  border: 1px solid #4e89ae;
  font-weight: 300;
  border-radius: 0.2rem;
`;

export const Clue = ({ clue }) => {
  const [ , dispatch] = useStateValue();

  // useEffect(() => {
  //   dispatch({
  //     type: 'addRevealed',
  //     answer: null,
  //   })
  // }, [clue]);

  const handleReveal = async () => {
    let revealed = null;
    if (clue) {
      if (clue._id) {
        revealed = await getClueAnswer(clue._id).then(res => res.data.answer);
      } else if (clue.id) {
        revealed = await getClueAnswer(clue.id).then(res => res.data.answer);
      }
      console.log(revealed);
    }
    if (revealed) {
      await dispatch({
        type: 'addRevealed',
        revealed
      })
    }
  }
  if (!clue) return null;
  return (
    <Container>
      <Header>
        <MagnifyingGlass src={magnifying_glass} />
        <YourClue>{`${clue.clue} (${clue.length} letters)`}</YourClue>
      </Header>
      <RevealButton onClick={handleReveal}>Reveal</RevealButton>
      {/* {clue._id ? null : <button onClick={handleReveal}>Reveal</button>} */}
    </Container>
  );
};
