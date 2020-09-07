import React from 'react';
import styled from 'styled-components';
import magnifying_glass from '../../images/magnifying_glass.png';
import { getClueAnswer } from '../../util/word_util';

const Container = styled.div``;

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

export const Clue = ({ clue }) => {
  const [, dispatch] = useStateValue();

  const handleReveal = async () => {
    let answer = getClueAnswer(clue.id).then(res => res.data.answer);
    if (answer) {
      await dispatch({
        type: 'addAnswer',
        answer
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
      <button onClick={handleReveal}>Reveal</button>
    </Container>
  );
};
