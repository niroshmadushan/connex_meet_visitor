// src/components/Header.jsx
import React from 'react';
import styled from 'styled-components';
import companyLogo from '../assets/company-logo.png';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #1d1d1d; /* Use darker background */
  border-bottom: 1px solid #333; /* Subtle border */
  z-index: 1000;
  height: 60px;
`;

const Logo = styled.img`
  height: 60px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={companyLogo} alt="Company Logo" />
    </HeaderContainer>
  );
};

export default Header;
