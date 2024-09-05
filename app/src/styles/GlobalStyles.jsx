// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    background-color: #121212; /* Use dark background */
    color: #fff; /* White text for dark theme */
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
