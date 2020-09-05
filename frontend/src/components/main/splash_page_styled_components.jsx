import React from 'react';
import styled from 'styled-components';
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

export const HeaderMessage = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderLetter1 = styled.span`
  font-size: 128px;
  margin: 30px;
`;
export const HeaderLetter2 = styled.span`
  font-size: 100px;
  color: #383838;
  margin: 30px;
`;
export const HeaderLetter3 = styled.span`
  font-size: 90px;
  margin: 30px;
  color: #585858;
`;
export const HeaderLetter4 = styled.span`
  font-size: 72px;
  margin: 30px;
  color: #808080;
`;
export const HeaderLetter5 = styled.span`
  font-size: 64px;
  margin: 30px;
  color: #a8a8a8;
`;

export const HeaderLetter6 = styled.span`
  font-size: 58px;
  margin: 30px;
  color: #b8b8b8;
`;

export const TagLine = styled.h3`
  font-size: 24px;
  margin: auto;
  font-weight: 200;
`;

export const Footer = styled.footer`
  background: #536878;
  width: 100%;
  height: 7rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterItem = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  padding: 5px;
  height: 100px;
  text-align: center;
  width: 100px;
  margin-left: 80px;
  border-radius: 5px;
  &:hover {
    background: #6d7f8c;
    transition: 0.3s;
  }
`;

export const FooterText = styled.span`
  color: white;
  font-weight: 200;
`;

export const LinkedIn = styled.img`
  width: 60px;
  height: 60px;
  margin: auto;
`;

// url
