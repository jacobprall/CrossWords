import React from 'react';
import { HeaderMessage, HeaderLetter } from './splash_page_styled_components';

const title = 'ACROSSWORDS';
const maxContrastingGray = '#111';
const minContrastingGray = '#7f7f7f';
const minFontSize = 48;
const maxFontSize = 128;
const fontSizeStep = (maxFontSize - minFontSize) / Math.floor(title.length / 2);

const Header = () => {
  return (
    <HeaderMessage
      maxContrastingGray={maxContrastingGray}
      minContrastingGray={minContrastingGray}
    >
      {title.split('').map((letter, idx) => {
        const relativePosition = Math.abs(Math.floor(title.length / 2) - idx);
        const fontSize = Math.floor(
          minFontSize + relativePosition * fontSizeStep,
        );
        return (
          <HeaderLetter
            key={`${letter}-${relativePosition}-${idx}`}
            fontSize={fontSize}
          >
            {letter}
          </HeaderLetter>
        );
      })}
    </HeaderMessage>
  );
};

Header.propTypes = {};

export default Header;
