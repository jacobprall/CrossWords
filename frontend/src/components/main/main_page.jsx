import React from 'react';
import styled from 'styled-components'; 

const MainContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: space-around; 
  height: 5000px
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
