import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../assets/welcome-image.jpg';
import meetingVoice from '../assets/audio/meeting-voice1.mp3';
import APIConnection from '../config';
import axios from 'axios';

const MeetingDetailsPage = () => {
  const [companies, setCompanies] = useState([]); // For company data
  const [meetings, setMeetings] = useState([]); // For meeting data of the selected company
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const navigate = useNavigate();

  // Fetch company data on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Fetch company data from API
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${APIConnection.mainapi}/interviews`, { withCredentials: true });
      setCompanies(response.data?.data || []); // Ensure we set an array even if the data is missing
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  // Fetch meetings for the selected company
  const fetchMeetings = async (companyName) => {
    try {
      const response = await axios.post(
        `${APIConnection.mainapi}/connex-booking-employees`,
        { cname: companyName }, // Body of the request
        {
          withCredentials: true, // Include credentials if needed
        }
      );
  
      setMeetings(response.data || []); // Ensure fallback to an empty array if no data
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
    }
  };
  

  // Handle company selection change
  const handleCompanyChange = (event) => {
    const companyName = event.target.value;
    setSelectedCompany(companyName);
    fetchMeetings(companyName); 
    console.log(meetings);// Fetch meetings for the selected company
  };

  // Handle meeting selection change
  const handleMeetingChange = (event) => {
    setSelectedMeeting(event.target.value);
  };

  // Handle navigation to the confirmation page
  const handleNextClick = () => {
    if (!selectedCompany || !selectedMeeting) {
      alert('Please select both a company and a meeting.');
      return;
    }
    // Navigate to the confirmation page with selected data
    navigate('/interview-confirmation', {
      state: {
        selectedCompany,
        selectedMeeting,
      },
    });
  };

  // Play audio on component mount and stop on unmount
  useEffect(() => {
    const audio = new Audio(meetingVoice);
    const timer = setTimeout(() => audio.play(), 1000); // Play after 1 second

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0; // Reset audio
    };
  }, []);

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
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
              <InputLabel>Interview Designation</InputLabel>
              <Select value={selectedCompany} onChange={handleCompanyChange} label="Interview Designation">
                {companies.map((company, index) => (
                  <MenuItem key={index} value={company.company_name}>
                    {company.company_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {selectedCompany && (
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ textAlign: 'left' }}>
                <InputLabel>Interview With</InputLabel>
                <Select value={selectedMeeting} onChange={handleMeetingChange} label="Interview With">
                  {meetings.map((meeting, index) => (
                    <MenuItem key={index} value={meeting.booking_id}>
                      {meeting.employee_name}
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
