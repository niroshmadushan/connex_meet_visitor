import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import welcomeImage from '../assets/welcome-image.jpg';
import voiceClip from '../assets/audio/meeting-confirmation-voice.mp3'; // Import your voice file

const MeetingConfirmationPage = () => {
  const { state } = useLocation(); // Get the data passed from MeetingDetailsPage
  const { selectedCompany, selectedMeeting } = state || {};
  const navigate = useNavigate();
  const audioRef = useRef(null); // Reference to the audio element

  // Play voice clip after 2 seconds when the component mounts
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

  const handleNextClick = () => {
    navigate('/visitor-team', { state: { selectedCompany, selectedMeeting } });
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
          textAlign: 'center',
          backgroundColor: 'rgba(29, 29, 29, 0.85)',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
          maxWidth: '500px',
          width: '100%',
          margin: '20px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Meeting Confirmation
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Company:</Typography>
            <Typography variant="body1">{selectedCompany}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Meeting with:</Typography>
            <Typography variant="body1">{selectedMeeting}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Time:</Typography>
            <Typography variant="body1">2:00 PM - 3:00 PM</Typography> {/* Replace with dynamic time */}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Conducted by:</Typography>
            <Typography variant="body1">John Doe</Typography> {/* Replace with dynamic conductor */}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" color="primary">Participants:</Typography>
            <Typography variant="body1">Development Team, HR</Typography> {/* Replace with dynamic participants */}
          </Grid>

          <Grid item xs={12}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.5)', borderRadius: '50px' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextClick}
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

        {/* Voice Clip */}
        <audio ref={audioRef} src={voiceClip} />

      </Paper>
    </Box>
  );
};

export default MeetingConfirmationPage;
