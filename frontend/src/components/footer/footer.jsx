import React from 'react'; 
import styled from 'styled-components'; 

const Container = styled.div`
    width: 100%;
    display: flex; 
    justify-content: flex-end; 
    margin-top: 5rem;
`
const FooterText = styled.p`
    font-size: 1rem;  
    margin-right: 1.5rem;
  `
export const Footer = () => (
    <Container>
        <FooterText>Copyright &copy; 2020 AcrossWords</FooterText>
    </Container>
)