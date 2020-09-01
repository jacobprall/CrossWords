import React from 'react';
import styled from 'styled-components'; 

const MainContainer = styled.div`
  height: 100%
  display: flex; 
  flex-direction: column; 
  justify-content: space-around; 
`

const Footer = styled.h1`

`

export default function MainPage() {
  return (
    <MainContainer>
      <Footer>Copyright &copy; 2020 AcrossWords</Footer>
    </MainContainer>
  );
}
