import React from 'react';
import styled from 'styled-components';
import { lighten, modularScale, linearGradient } from 'polished';
// import {
//   Container,
//   MainContainer,
//   HeaderMessage,
//   TagLine,
//   Byline,
//   Footer,
//   FooterItem,
// } from './splash_page_styled_components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

export const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  margin-top: 5rem;
  flex-direction: column;
`;

export const HeaderMessage = styled.div((props) => {
  const minColor = props.minContrastingGray;
  const maxColor = props.maxContrastingGray;
  const gradient = linearGradient({
    colorStops: [`${maxColor} 0%`, `${minColor} 50%`, `${maxColor} 100%`],
    toDirection: 'to right',
    fallback: maxColor,
  });
  console.log(gradient);
  return {
    display: 'flex',
    justifyContent: 'space-between',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    ...gradient,
    WebkitTextFillColor: 'transparent',
  };
});

export const HeaderLetter = styled.span(({ fontSize }) => ({
  fontSize: `${fontSize}px`,
  margin: 30,
}));

export const Footer = styled.footer`
  background: #536878;
  width: 100%;
  height: 5rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  padding: 5px;
  text-align: center;
  width: 100px;
  margin-left: 80px;
  border-radius: 5px;
  color: white;
  font-weight: 200;
`;

export const SocialIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
  margin-top: 0.5rem;
  & > a {
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const LinkedIn = styled.img`
  width: 60px;
  height: 60px;
  margin: auto;
`;

export const GridContainerSplash = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(1, 1fr);
  margin: auto;
`;
