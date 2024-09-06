// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import developerLogo from '../assets/developer-logo.png';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1d1d1d; /* Use darker background */
  border-top: 1px solid #333; /* Subtle border */
  z-index: 1000;
  height: 65px;
`;

const DeveloperLogo = styled.img`
  height: 50px;
  opacity: 0.5;
  border-radius: 8px; /* Adds rounded corners */
  margin-right: 10px; /* Optional: Adds some space between the logo and the text */
`;

const CopyrightText = styled.p`
  font-size: 0.8rem;
  color: #aaa; /* Light gray text */
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <DeveloperLogo src={developerLogo} alt="Developer Logo" />
      <CopyrightText>© 2024 Connex Information Technologies & Code Works SE Team. All rights reserved.</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
