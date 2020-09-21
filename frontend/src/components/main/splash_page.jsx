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

import GridRow from '../grid/grid_row';
import styled from 'styled-components';

const GridContainerSplash = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(1, 1fr);
  margin: auto;
  margin-top: -3%;
  margin-left: 30%;
`

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
        <GridContainerSplash>
        <GridRow
          clue={{ colStart: 6, length: 1, id: 0, splash: true }}
          selected={false}
          rowPos={1}
          prevAnswer={null}
          thisAnswer={'A'}
          wasCorrect={true}
          wasRevealed={true}
        />
        <GridRow
          clue={{ colStart: 3, length: 7, id: 1, splash: true }}
          selected={false}
          rowPos={2}
          prevAnswer={null}
          thisAnswer={'DYNAMIC'}
          wasCorrect={true}
          wasRevealed={true}
        />
        <GridRow
          clue={{ colStart: 0, length: 4, id: 2, splash: true }}
          selected={false}
          rowPos={3}
          prevAnswer={null}
          thisAnswer={'WORD'}
          wasCorrect={true}
          wasRevealed={true}
        />
        <GridRow
          clue={{ colStart: 3, length: 4, id: 3, splash: true }}
          selected={false}
          rowPos={4}
          prevAnswer={null}
          thisAnswer={'DUEL'}
          wasCorrect={true}
          wasRevealed={true}
        />
        </GridContainerSplash>
      </MainContainer>
      <Footer>
        <FooterItem>
          <span>Aatef Baransy</span>
          <SocialIconContainer>
            <a
              href="https://github.com/abaransy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} color="#EEE" />
            </a>
            <a
              href="https://www.linkedin.com/in/aatef-baransy-a55b71197/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} color="#EEE" />
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
              href="https://github.com/timharding31"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} color="#EEE" />
            </a>
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
