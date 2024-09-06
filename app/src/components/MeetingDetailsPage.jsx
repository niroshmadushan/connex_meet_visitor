import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../assets/welcome-image.jpg'; // Same background as PurposeSelection
import meetingVoice from '../assets/audio/meeting-voice1.mp3'; // Short voice clip for this page

// Sample Data for Companies and Meetings
const companies = {
  'Tech Corp': ['John Smith', 'Development Team', 'Project Lead'],
  'Global Solutions': ['Sara White', 'Operations Team', 'HR Manager'],
  'Innovate Inc.': ['Michael Brown', 'Sales Team', 'Product Manager'],
};

const MeetingDetailsPage = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const navigate = useNavigate();

  // Play the audio 1 second after page load and stop it on navigation or unmount
  useEffect(() => {
    const audio = new Audio(meetingVoice);

    // Start playing the audio after 1 second
    const timer = setTimeout(() => {
      audio.play();
    }, 1000); // Delay of 1 second

    // Cleanup function to stop the audio when navigating away or unmounting
    return () => {
      clearTimeout(timer); // Stop the timer
      audio.pause();       // Pause the audio
      audio.currentTime = 0; // Reset the audio to the beginning
    };
  }, []); // Run once when the component is mounted

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
    setSelectedMeeting(''); // Reset meeting selection when a new company is chosen
  };

  const handleMeetingChange = (event) => {
    setSelectedMeeting(event.target.value);
  };

  const handleNextClick = () => {
    if (!selectedCompany || !selectedMeeting) {
      // Add validation for empty fields
      alert('Please select both a company and a meeting.');
      return;
    }

    // Navigate to the confirmation page and pass selected data
    navigate('/meeting-confirmation', {
      state: {
        selectedCompany,
        selectedMeeting,
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
          Meeting Details
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
              <InputLabel>Company Name</InputLabel>
              <Select value={selectedCompany} onChange={handleCompanyChange} label="Company Name">
                {Object.keys(companies).map((company, index) => (
                  <MenuItem key={index} value={company}>
                    {company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {selectedCompany && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
                <InputLabel>Meeting with</InputLabel>
                <Select value={selectedMeeting} onChange={handleMeetingChange} label="Meeting with">
                  {companies[selectedCompany].map((meeting, index) => (
                    <MenuItem key={index} value={meeting}>
                      {meeting}
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
              disabled={!selectedCompany || !selectedMeeting} // Disable until both are selected
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MeetingDetailsPage;
