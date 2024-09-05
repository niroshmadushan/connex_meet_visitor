// src/components/PurposeSelection.jsx
import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MeetingRoom, Event, Work, Build } from '@mui/icons-material'; // MUI icons
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';

const PurposeSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (purpose) => {
    console.log(`User selected: ${purpose}`);
    // Add navigation logic or handle selection accordingly
  };

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
          backgroundColor: 'rgba(29, 29, 29, 0.85)', // Darker background for the paper
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
          maxWidth: '800px',
          margin: '20px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Select Your Purpose of Visit
        </Typography>
        <Typography variant="body1" paragraph sx={{ marginBottom: '30px', color: 'text.secondary' }}>
          Please select the purpose of your visit to Connex so we can better assist you.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { label: 'Meetings', icon: <MeetingRoom sx={{ fontSize: 50 }} />, purpose: 'meetings', bgColor: '#FF6F61' },
            { label: 'Sessions', icon: <Event sx={{ fontSize: 50 }} />, purpose: 'sessions', bgColor: '#6B5B95' },
            { label: 'Interview', icon: <Work sx={{ fontSize: 50 }} />, purpose: 'interview', bgColor: '#88B04B' },
            { label: 'Services', icon: <Build sx={{ fontSize: 50 }} />, purpose: 'services', bgColor: '#F7CAC9' },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1, boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.5)', borderRadius: '50px' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelection(item.purpose)}
                variant="contained"
                sx={{
                  width: '100%',
                  height: '150px', // Increased height for larger buttons
                  fontSize: '1.2rem',
                  borderRadius: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  transition: 'all 0.3s ease-in-out',
                  backgroundColor: item.bgColor,
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: `${item.bgColor}cc`,
                  },
                }}
              >
                {item.icon}
                {item.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default PurposeSelection;
