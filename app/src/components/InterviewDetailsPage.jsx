import React, { useEffect, useRef, useState} from 'react';
import { Box, Typography, Paper, Grid, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';
import voiceClip from '../assets/audio/interview.mp3'; 

// Sample Data for Departments and Interviewees
const departments = {
  'HR Department': [{ name: 'John Smith', id: 'HR01' }, { name: 'Alice Johnson', id: 'HR02' }],
  'IT Department': [{ name: 'Michael Brown', id: 'IT01' }, { name: 'Sara White', id: 'IT02' }],
  'Sales Department': [{ name: 'David Lee', id: 'Sales01' }, { name: 'Sophia Green', id: 'Sales02' }],
};


const InterviewDetailsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedInterviewee, setSelectedInterviewee] = useState('');
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

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedInterviewee(''); // Reset interviewee when department changes
  };

  const handleIntervieweeChange = (event) => {
    setSelectedInterviewee(event.target.value);
  };

  const handleNextClick = () => {
    if (!selectedDepartment || !selectedInterviewee) {
      alert('Please select both department and interviewee.');
      return;
    }

    navigate('/interview-confirmation', {
      state: {
        selectedDepartment,
        selectedInterviewee,
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
          Interview Details
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {/* Department Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
              <InputLabel>Department</InputLabel>
              <Select value={selectedDepartment} onChange={handleDepartmentChange} label="Department">
                {Object.keys(departments).map((department, index) => (
                  <MenuItem key={index} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Interviewee Dropdown */}
          {selectedDepartment && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
                <InputLabel>Interviewee</InputLabel>
                <Select value={selectedInterviewee} onChange={handleIntervieweeChange} label="Interviewee">
                  {departments[selectedDepartment].map((interviewee, index) => (
                    <MenuItem key={index} value={interviewee}>
                      {interviewee.name} ({interviewee.id})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {/* Next Button */}
          <Grid item xs={12}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
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
              Next
            </Button>
          </Grid>
        </Grid>
        <audio ref={audioRef} src={voiceClip} />
      </Paper>
    </Box>
  );
};

export default InterviewDetailsPage;
