import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';
import voiceClip from '../assets/audio/meeting-confirmation-voice.mp3'; 
const SessionConfirmationPage = () => {
  const { state } = useLocation();
  const { selectedCompany, selectedService } = state || {};
  const navigate = useNavigate();

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100); // Delay of 2 seconds

    // Stop the audio when navigating away
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearTimeout(timer);
    };
  }, []);

  const handleConfirmClick = () => {
    // Proceed to the next page or confirmation process
    navigate('/connex_meet_visitor/visitor-team-sesion', { state: { selectedCompany, selectedService } });
  };

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
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '40px',
          backgroundColor: 'rgba(29, 29, 29, 0.85)',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
          maxWidth: '700px',
          width: '100%',
          margin: '20px',
        }}
      >
        <Typography variant="h4" sx={{ color: '#fff', mb: 4 }}>Session Confirmation</Typography>

        <Grid container spacing={3}>
          {/* Left Column (Labels) */}
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ color: '#fff' }}>Company:</Typography>
            <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>What Is the Session:</Typography>
            <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>Time:</Typography>
            <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>Where:</Typography>
            <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>Conducted by:</Typography>
            <Typography variant="h6" sx={{ color: '#fff', mt: 2 }}>Participants:</Typography>
          </Grid>

          {/* Right Column (Values) */}
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ color: '#fff' }}>{selectedCompany || 'Tech Corp'}</Typography>
            <Typography variant="body1" sx={{ color: '#fff', mt: 2 }}>{selectedService || 'Introducing Trendnet New Product'}</Typography>
            <Typography variant="body1" sx={{ color: '#fff', mt: 2 }}>2:00 PM - 3:00 PM</Typography>
            <Typography variant="body1" sx={{ color: '#fff', mt: 2 }}>ABC Hotel</Typography>
            <Typography variant="body1" sx={{ color: '#fff', mt: 2 }}>John Doe</Typography>
            <Typography variant="body1" sx={{ color: '#fff', mt: 2 }}>Development Team, HR</Typography>
          </Grid>
        </Grid>

        {/* Confirm Button */}
        <Button
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirmClick}
          variant="contained"
          color="secondary"
          sx={{
            width: '100%',
            height: '60px',
            fontSize: '1.2rem',
            borderRadius: '15px',
            mt: 4,
          }}
        >
          Confirm
        </Button>
        <audio ref={audioRef} src={voiceClip} />
      </Paper>
    </Box>
  );
};

export default SessionConfirmationPage;
