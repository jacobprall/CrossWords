import React from 'react'; 
import ReactDOM from 'react-dom'; 
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: .5;
`
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    display: flex; 
    justify-content: center; 
    position: relative; 
    top: 10%;
`

export const Modal = ({ isShowing, hide, Comp, sessionProps}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <ModalOverlay/>
        <ModalWrapper>
            <Comp props={sessionProps}/>
        </ModalWrapper>
    </React.Fragment>, document.body
) : null; 

