import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import welcomeImage from '../assets/welcome-image.jpg';
import pleaseWaitVoice from '../assets/audio/clip2.mp3';
import APIConnection from '../config'; // API config file

const PleaseWaitPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedMeeting } = state || {}; // Get booking ID from state
  const [status, setStatus] = useState(1); // Track status

  useEffect(() => {
    const audio = new Audio(pleaseWaitVoice);

    // Play the audio after a 1-second delay
    const audioTimer = setTimeout(() => {
      audio.play();
    }, 1000);

    // Polling function to check visitor status
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `${APIConnection.mainapi}/visitor-info/${selectedMeeting}`, 
          { headers: { 'Cache-Control': 'no-cache' } } // Prevent cached response
        );

        const visitorData = response.data[0]; // Ensure data is received correctly
        console.log('Visitor Data:', visitorData); // Debug: Log visitor data

        if (visitorData.status === 2) {
          console.log('Status 2 found, stopping loop and navigating...');
          clearInterval(interval); 
          // Stop polling
          try {
            await axios.post(`${APIConnection.mainapi}/deleteData`, {
              bookingId: selectedMeeting,
            });
            console.log('Temporary data deleted successfully.');
          } catch (deleteError) {
            console.error('Failed to delete temporary data:', deleteError);
          }
          navigate('/connex_meet_visitor/registration-success', { state: { selectedMeeting } }); // Redirect to success page
        } else if (visitorData.status === 1) {
          setStatus(1); // Update status to pending
        } else {
          console.error('Unexpected status:', visitorData.status);
        }
      } catch (error) {
        console.error('Error fetching visitor info:', error);
      }
    };

    // Set up polling to check visitor status every second
    const interval = setInterval(fetchStatus, 1000); // Poll every second

    // Cleanup: Clear timers and stop audio when component unmounts
    return () => {
      clearTimeout(audioTimer);
      clearInterval(interval); // Stop polling on unmount
      audio.pause();
      audio.currentTime = 0;
    };
  }, [selectedMeeting, navigate]); // Dependencies to trigger effect on mount

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
        <Typography variant="body1" sx={{ color: '#fff', mt: 1 }}>
          Checking status: {status === 1 ? 'Pending' : 'Success'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PleaseWaitPage;
