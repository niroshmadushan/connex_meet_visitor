import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../assets/welcome-image.jpg';
import successVoice from '../assets/audio/clip3.mp3'; // Voice clip for page load
import finishVoice from '../assets/audio/clip4.mp3'; // Voice clip for Finish button

const RegistrationSuccessPage = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  const wifiUsername = "visitorWifi";
  const wifiPassword = "wifi123";
  const lockerKey = "Key12";

  // Sample visitor data
  const visitorData = [
    { visitor: "Visitor 01", id: "ID01" },
    { visitor: "Visitor 02", id: "ID02" },
    { visitor: "Visitor 03", id: "ID03" },
  ];

  // Play success voice when the page loads
  useEffect(() => {
    const audio = new Audio(successVoice);

    // Start playing the audio after 2 seconds
    const timer = setTimeout(() => {
      audio.play();
    }, 100); 

    // Cleanup function to stop the audio when navigating away or unmounting
    return () => {
      clearTimeout(timer); // Stop the timer
      audio.pause();       // Pause the audio
      audio.currentTime = 0; // Reset the audio to the beginning
    };
  }, []);

  const handleFinish = () => {
    setShowThankYou(true);
    const audio = new Audio(finishVoice);
    audio.play(); // Play finish voice clip

    
    
    // Navigate to home page after 5 seconds
    setTimeout(() => {
      navigate('/');
    }, 5000); 
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
      {!showThankYou ? (
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
            maxWidth: '800px',
            width: '100%',
          }}
        >
          <Typography variant="h4" sx={{ color: '#fff', mb: 4 }}>
            Registration Successful!
          </Typography>

          <Grid container spacing={2} sx={{ textAlign: 'left', mb: 3 }}>
            {/* WiFi Username */}
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <WifiIcon sx={{ color: '#fff', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#fff' }}>
                <strong>WiFi Username:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                {wifiUsername}
              </Typography>
            </Grid>

            {/* WiFi Password */}
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <VpnKeyIcon sx={{ color: '#fff', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#fff' }}>
                <strong>WiFi Password:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                {wifiPassword}
              </Typography>
            </Grid>

            {/* Visitor IDs */}
            {visitorData.map((visitor, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountCircleIcon sx={{ color: '#fff', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    <strong>{visitor.visitor}:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {visitor.id}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}

            {/* Locker Key */}
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <LockIcon sx={{ color: '#fff', mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#fff' }}>
                <strong>Locker Key No:</strong>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                {lockerKey}
              </Typography>
            </Grid>
          </Grid>

          {/* Finish Button */}
          <Box sx={{ textAlign: 'right' }}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFinish}
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                backgroundColor: '#007aff',
                color: '#fff',
                ':hover': {
                  backgroundColor: '#005bb5',
                },
                padding: '10px 30px',
                fontSize: '1rem',
                borderRadius: '10px',
              }}
            >
              Finish
            </Button>
          </Box>
        </Paper>
      ) : (
        // Thank You Screen
        <Paper
          elevation={3}
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
          <Typography variant="h4" sx={{ color: '#fff', mb: 4 }}>
            Thank you for your registration!
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Redirecting to the home page...
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default RegistrationSuccessPage;
