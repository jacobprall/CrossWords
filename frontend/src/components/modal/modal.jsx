import React from 'react'; 
import ReactDOM from 'react-dom'; 
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
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
`

const ModalEle = styled.div`
    border: 1px solid; 
    background: white; 
    position: relative;
    border-radius: 3px;
    top: 37px; 
    width: 550px;
    height: 200px; 
    display: flex; 
    justify-content: center; 
    flex-direction: column;
    align-items: center; 
    @media (max-width: 420px) {
        height: 300px; 
    }
    
`
const ModalHeader = styled.div`
    position: relative; 
    top: -22px; 
    width: 545px; 
    display: flex;
    justify-content: flex-end;
    @media (max-width: 420px) {
        width: 350px; 
        top: -60px; 
    }
`

const Disclosure = styled.div`
    width: 500px; 
    height: 110px; 
    display: flex; 
    flex-direction: column; 
    @media (max-width: 420px) {
        width: 200px; 
        position: relative; 
        top: -60px; 
    }
`

const Button = styled.button`
    font-size: 20px; 
    font-weight: 700;
    border: none;
    border-radius: 3px;
    padding: 10px 10px;
    margin-left: .5rem;
    &:hover {
        cursor: pointer; 
        background-color: rgb(58,58,58);
    }  
`
export const Modal = ({isShowing, hide, title, body}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <ModalOverlay/>
    <ModalWrapper>
      <ModalEle>
        <ModalHeader>
          <Button onClick={hide}>
              x
          </Button>
        </ModalHeader>
        <Disclosure>
          <h1>
            {title}
          </h1>
          <br/>
          <p>
            {body}
          </p>
        </Disclosure>
      </ModalEle>
    </ModalWrapper>
  </React.Fragment>, document.body
) : null; 

