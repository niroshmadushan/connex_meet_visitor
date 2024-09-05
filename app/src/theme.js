// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e90ff', // Blue color from your logo
    },
    secondary: {
      main: '#2e8b57', // Green color from your logo
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1d1d1d', // Slightly lighter dark background for components
    },
    text: {
      primary: '#ffffff', // White text for primary content
      secondary: '#aaaaaa', // Light gray text for secondary content
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
