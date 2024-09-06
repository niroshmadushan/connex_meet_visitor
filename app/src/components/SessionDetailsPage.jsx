// src/components/SessionDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';
import sessionVoice from '../assets/audio/session-voice.mp3'; // Add voice clip

// Sample company and service data
const companies = ['Tech Corp', 'Global Solutions', 'Innovate Inc.'];
const services = ['Consulting', 'Development', 'Support', 'Training'];

const SessionDetailsPage = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const navigate = useNavigate();

  // Play the voice clip after 2 seconds
  useEffect(() => {
    const audio = new Audio(sessionVoice);
    const timer = setTimeout(() => {
      audio.play();
    }, 2000);

    // Clean up audio when navigating away or unmounting
    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleNextClick = () => {
    if (!selectedCompany || !selectedService) {
      alert('Please select both a company and a service.');
      return;
    }
    // Navigate to the next page
    navigate('/session-confirmation', {
      state: {
        selectedCompany,
        selectedService,
      },
    });
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
          Session Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
              <InputLabel>Company Name</InputLabel>
              <Select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} label="Company Name">
                {companies.map((company, index) => (
                  <MenuItem key={index} value={company}>
                    {company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
              <InputLabel>Service Name</InputLabel>
              <Select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} label="Service Name">
                {services.map((service, index) => (
                  <MenuItem key={index} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              disabled={!selectedCompany || !selectedService} // Disable until both are selected
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SessionDetailsPage;
