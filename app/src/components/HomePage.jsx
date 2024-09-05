// src/components/HomePage.jsx
import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import welcomeImage from '../assets/welcome-image.jpg';

const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh)', // Full height for background
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${welcomeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(18, 18, 18, 0.5)', // Dark overlay for readability
          backdropFilter: 'blur(8px)',
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '40px',
          textAlign: 'center',
          backgroundColor: 'rgba(29, 29, 29, 0.85)', // Use dark background from theme
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
          maxWidth: '600px',
          margin: '20px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Welcome to Connex
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: '300', color: 'secondary.main' }}>
          A Warm Welcome Awaits You!
        </Typography>
        <Typography variant="body1" paragraph sx={{ marginTop: '15px', color: 'text.secondary' }}>
          At Connex, we are dedicated to providing a seamless and personalized experience for every visitor. Our advanced visitor management system ensures your visit is smooth, secure, and memorable.
        </Typography>
        <Typography variant="body1" paragraph sx={{ marginBottom: '30px', color: 'text.secondary' }}>
          Join us as we revolutionize the way you connect with businesses. Click the button below to get started and let us know how we can assist you today.
        </Typography>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.5)', borderRadius: '50px' }} // Smooth hover animation
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/purpose-selection')} // Navigate to the new page
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', padding: '15px 30px', fontSize: '1rem', borderRadius: '30px', transition: 'all 0.3s ease-in-out' }}
        >
          Start Your Journey
        </Button>
      </Paper>
    </Box>
  );
};

export default HomePage;
