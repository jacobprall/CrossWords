import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div(({ shown }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 10,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#000',
  opacity: 0.3,
  display: shown ? 'block' : 'none',
}));

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10rem;
`;

export const Modal = ({
  isShowing,
  hide,
  Comp,
  sessionProps,
  secondsElapsed,
  score,
}) => {
  const [shown, setShown] = useState(isShowing);
  const handleClick = () => {
    setShown(false);
  };
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <ModalOverlay shown={shown} onClick={handleClick} />
          {shown && (
            <ModalWrapper>
              <Comp
                props={sessionProps}
                secondsElapsed={secondsElapsed}
                score={score}
              />
            </ModalWrapper>
          )}
        </React.Fragment>,
        document.body,
      )
    : null;
};
