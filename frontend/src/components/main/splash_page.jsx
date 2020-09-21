import React from 'react';
import {
  Container,
  MainContainer,
  TagLine,
} from './splash_page_styled_components';
import Footer from './Footer';
import Header from './Header';

export default function SplashPage() {
  return (
    <Container>
      <MainContainer>
        <Header />
        <TagLine>A dynamic word game</TagLine>
      </MainContainer>
      <Footer />
    </Container>
  );
}
