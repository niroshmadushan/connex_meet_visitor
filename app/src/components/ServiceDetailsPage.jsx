// src/components/ServiceDetailsPage.jsx
import React, { useEffect, useRef, useState} from 'react';
import { Box, Typography, Button, Paper, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';
import voiceClip from '../assets/audio/service.mp3'; 

// Sample data for services and associated companies or persons
const services = {
  'Website Development': ['Tech Corp', 'Innovate Inc.'],
  'Marketing Strategy': ['Global Solutions', 'Marketing Experts'],
  'IT Support': ['IT Corp', 'Support Team'],
};

const ServiceDetailsPage = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
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

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    setSelectedCompany(''); // Reset company selection when a new service is chosen
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleNextClick = () => {
    if (!selectedService || !selectedCompany) {
      alert('Please select both a service and a company/person.');
      return;
    }
    // Navigate to the Service Confirmation page
    navigate('/service-confirmation', {
      state: {
        selectedService,
        selectedCompany,
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
          backgroundColor: 'rgba(29, 29, 29, 0.85)',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Service Details
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {/* Service Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
              <InputLabel>Service Name</InputLabel>
              <Select value={selectedService} onChange={handleServiceChange} label="Service Name">
                {Object.keys(services).map((service, index) => (
                  <MenuItem key={index} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Company/Person Dropdown */}
          {selectedService && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
                <InputLabel>Company/Person</InputLabel>
                <Select value={selectedCompany} onChange={handleCompanyChange} label="Company/Person">
                  {services[selectedService].map((company, index) => (
                    <MenuItem key={index} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

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
              disabled={!selectedService || !selectedCompany} // Disable until both are selected
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <audio ref={audioRef} src={voiceClip} />
      </Paper>
    </Box>
  );
};

export default ServiceDetailsPage;

