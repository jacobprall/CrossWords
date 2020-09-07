import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
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
  TagLine,
  SocialIconContainer,
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
      </MainContainer>
      <Footer>
        <FooterItem>
          <span>Aatef Baransy</span>
          <SocialIconContainer>
            <a
              href="https://www.linkedin.com/in/aatef-baransy-a55b71197/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} color="#EEE" />
            </a>
            <a
              href="https://github.com/abaransy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} color="#EEE" />
            </a>
          </SocialIconContainer>
        </FooterItem>
        <FooterItem>
          <span>Jacob Prall</span>
          <SocialIconContainer>
            <a
              href="https://github.com/jacobprall"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} color="#EEE" />
            </a>
            <a
              href="https://www.linkedin.com/in/jacob-prall-01abb867/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} color="#EEE" />
            </a>
          </SocialIconContainer>
        </FooterItem>
        <FooterItem>
          <span>Nick Sercel</span>
          <SocialIconContainer>
            <a
              href="https://www.linkedin.com/in/nick-sercel-4402261a0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} color="#EEE" />
            </a>
          </SocialIconContainer>
        </FooterItem>
        <FooterItem>
          <span>Phil Gresham</span>
          <SocialIconContainer>
            <a
              href="https://github.com/philgresh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} color="#EEE" />
            </a>
            <a
              href="https://www.linkedin.com/in/philgresham/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} color="#EEE" />
            </a>
          </SocialIconContainer>
        </FooterItem>
        <FooterItem>
          <span>Tim Harding</span>
          <SocialIconContainer>
            <a
              href="https://www.linkedin.com/in/timharding31/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} color="#EEE" />
            </a>
          </SocialIconContainer>
        </FooterItem>
      </Footer>
    </Container>
  );
}
