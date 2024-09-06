import React, { useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';
import pleaseWaitVoice from '../assets/audio/clip2.mp3'; // Voice clip for this page

const PleaseWaitPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(pleaseWaitVoice);

    // Start playing the audio after 1 second
    const timer = setTimeout(() => {
      audio.play();
    }, 1000); 

    // Set a timer to navigate to the registration success page after 10 seconds
    const navigateTimer = setTimeout(() => {
      navigate('/registration-success');
    }, 10000); // 10 seconds

    // Cleanup: stop audio and timers on unmount
    return () => {
      clearTimeout(timer);
      clearTimeout(navigateTimer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
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
          backgroundColor: 'rgba(18, 18, 18, 0.5)',
          backdropFilter: 'blur(8px)',
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={3}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '40px',
          backgroundColor: 'rgba(29, 29, 29, 0.85)',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <CircularProgress color="secondary" size={60} />
        <Typography variant="h5" sx={{ color: '#fff', mt: 3 }}>
          Please wait for administration response...
        </Typography>
      </Paper>
    </Box>
  );
};

export default PleaseWaitPage;
