import React from 'react';
import {
  Container,
  MainContainer,
} from './splash_page_styled_components';
import Footer from './Footer';
import Header from './Header';
import SplashGrid from './SplashGrid';

export default function SplashPage() {
  return (
    <Container>
      <MainContainer>
        <Header />
        <SplashGrid />
      </MainContainer>
      <Footer />
    </Container>
  );
}
