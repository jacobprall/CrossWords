import React from 'react';
import styled from 'styled-components';
import magnifying_glass from '../../images/magnifying_glass.png';
import { getClueAnswer } from '../../util/word_util';
import { useStateValue } from '../custom_hooks/useState'; 
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
  color: rgba(52, 98, 209, 0.7);
  outline: none;
  font-weight: 500;
  border-radius: 0.2rem;
  border: 2px solid rgba(52, 98, 209, 0.7);
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    &:hover {
      cursor: pointer;
      border: 2px solid #3462D1;
      background-color: rgba(52, 98, 209, 0.2);
      color: #3462D1;
`;

export const Clue = ({ clue }) => {
  const [ , dispatch] = useStateValue();

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
    </Container>
  );
};
