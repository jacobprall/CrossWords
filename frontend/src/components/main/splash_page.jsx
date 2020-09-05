import React from 'react';
import linkedin from '../../images/linkedin.png';
import {
  Container,
  MainContainer,
  HeaderMessage,
  HeaderLetter1,
  HeaderLetter2,
  HeaderLetter3,
  HeaderLetter4,
  HeaderLetter5,
  HeaderLetter6,
  FooterText,
  TagLine,
  LinkedIn,
  Byline,
  Footer,
  FooterItem,
} from './splash_page_styled_components';

export default function SplashPage() {
  return (
    <Container>
      <MainContainer>
        <HeaderMessage>
          <HeaderLetter1>A</HeaderLetter1>
          <HeaderLetter2>C</HeaderLetter2>
          <HeaderLetter3>R</HeaderLetter3>
          <HeaderLetter4>O</HeaderLetter4>
          <HeaderLetter5>S</HeaderLetter5>
          <HeaderLetter6>S</HeaderLetter6>
          <HeaderLetter5>W</HeaderLetter5>
          <HeaderLetter4>O</HeaderLetter4>
          <HeaderLetter3>R</HeaderLetter3>
          <HeaderLetter2>D</HeaderLetter2>
          <HeaderLetter1>S</HeaderLetter1>
        </HeaderMessage>
        <TagLine>A dynamic word game</TagLine>
        {/* <Byline></Byline>
          <BackgroundVideo></BackgroundVideo> */}
      </MainContainer>
      <Footer>
        <FooterItem
          href={'https://www.linkedin.com/in/aatef-baransy-a55b71197/'}
          target={'_blank'}
        >
          <FooterText>Aatef Baransy</FooterText>
          <LinkedIn src={linkedin}></LinkedIn>
        </FooterItem>
        <FooterItem
          href={'https://www.linkedin.com/in/jacob-prall-01abb867/'}
          target={'_blank'}
        >
          <FooterText>Jacob Prall</FooterText>
          <LinkedIn src={linkedin}></LinkedIn>
        </FooterItem>
        <FooterItem
          href={'https://www.linkedin.com/in/nick-sercel-4402261a0/'}
          target={'_blank'}
        >
          <FooterText>Nick Sercel</FooterText>
          <LinkedIn src={linkedin}></LinkedIn>
        </FooterItem>
        <FooterItem
          href={'https://www.linkedin.com/in/philgresham/'}
          target={'_blank'}
        >
          <FooterText>Phil Gresham</FooterText>
          <LinkedIn src={linkedin}></LinkedIn>
        </FooterItem>
        <FooterItem
          href={'https://www.linkedin.com/in/timharding31/'}
          target={'_blank'}
        >
          <FooterText>Tim Harding</FooterText>
          <LinkedIn src={linkedin}></LinkedIn>
        </FooterItem>
      </Footer>
    </Container>
  );
}
