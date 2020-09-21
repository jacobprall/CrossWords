import React from 'react';
import {
  SocialIconContainer,
  Footer as FooterStyle,
  FooterItem,
} from './splash_page_styled_components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <FooterStyle>
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
            href="https://www.linkedin.com/in/timharding31/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} color="#EEE" />
          </a>
        </SocialIconContainer>
      </FooterItem>
    </FooterStyle>
  );
};

Footer.propTypes = {};

export default Footer;
