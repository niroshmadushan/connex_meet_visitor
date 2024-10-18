// src/components/ServiceConfirmationPage.jsx
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';
import voiceClip from '../assets/audio/meeting-confirmation-voice.mp3'; 

const ServiceConfirmationPage = () => {
  const { state } = useLocation(); // Get the data passed from ServiceDetailsPage
  const { selectedService, selectedCompany } = state || {};
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
    // Navigate to the please wait page
    navigate('/connex_meet_visitor/visitor-team-service');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh)',
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
          maxWidth: '500px',
          width: '100%',
          margin: '20px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Service Confirmation
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Service:</Typography>
            <Typography variant="body1">{selectedService}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Company/Person:</Typography>
            <Typography variant="body1">{selectedCompany}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Time:</Typography>
            <Typography variant="body1">3:00 PM - 4:00 PM</Typography> {/* Static Time */}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Location:</Typography>
            <Typography variant="body1">ABC Hotel</Typography> {/* Static Location */}
          </Grid>

          <Grid item xs={12}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.5)', borderRadius: '50px' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirmClick}
              variant="contained"
              color="secondary"
              sx={{
                width: '100%',
                height: '60px',
                fontSize: '1.2rem',
                borderRadius: '15px',
                transition: 'all 0.3s ease-in-out',
                mt: 2,
              }}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
        <audio ref={audioRef} src={voiceClip} />
      </Paper>
    </Box>
  );
};

export default ServiceConfirmationPage;
