import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; // SweetAlert2 for confirmation
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import welcomeImage from '../assets/welcome-image.jpg';
import successVoice from '../assets/audio/clip3.mp3'; // Voice clip for page load
import finishVoice from '../assets/audio/clip4.mp3'; // Voice clip for Finish button
import APIConnection from '../config'; // API config file

const RegistrationSuccessPage = () => {
  const [visitorData, setVisitorData] = useState([]); // Store fetched data
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { selectedMeeting } = state || {};

  // Play success voice when the page loads
  useEffect(() => {
    const audio = new Audio(successVoice);

    const timer = setTimeout(() => {
      audio.play();
    }, 100); 

    return () => {
      clearTimeout(timer); // Stop the timer
      audio.pause();       
      audio.currentTime = 0; 
    };
  }, []);

  // Fetch visitor data from the API
  useEffect(() => {
    const fetchVisitorInfo = async () => {
      try {
        const response = await axios.get(`${APIConnection.mainapi}/visitor-info-reg`);
        setVisitorData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch visitor info:', error);
      }
    };

    fetchVisitorInfo();
  }, []);

  const handleFinish = () => {
    // Show SweetAlert confirmation before finishing
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to finish the process?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, finish it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setShowThankYou(true);
        const audio = new Audio(finishVoice);
        audio.play();

        // Navigate to the home page after 5 seconds
        setTimeout(() => {
          navigate('/connex_meet_visitor/');
        }, 5000);
      }
    });
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

          {/* Scrollable table for visitor data */}
          <TableContainer
            sx={{
              maxHeight: '50vh', // Limit the height for scrollable content
              overflowY: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background
              borderRadius: '10px',
              mb: 3,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888', // Scrollbar thumb color
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555', // Scrollbar thumb hover color
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#333', // Scrollbar track color
              },
            }}
          >
            <Table stickyHeader>
              
              <TableBody>
                {visitorData.length > 0 ? (
                  visitorData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ color: '#fff' }}>{item.key}</TableCell>
                      <TableCell sx={{ color: '#fff' }}>{item.value}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} sx={{ color: '#fff', textAlign: 'center' }}>
                      No data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

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
