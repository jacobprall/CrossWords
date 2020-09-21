import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderMessage,
  HeaderLetter1,
  HeaderLetter2,
  HeaderLetter3,
  HeaderLetter4,
  HeaderLetter5,
  HeaderLetter6,
} from './splash_page_styled_components';

const Header = (props) => {
  return (
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
  );
};

Header.propTypes = {};

export default Header;
