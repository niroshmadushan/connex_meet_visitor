import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';
import voiceClip from '../assets/audio/meeting-confirmation-voice.mp3'; 

const InterviewConfirmationPage = () => {
    const { state } = useLocation();
    const { selectedDepartment, selectedInterviewee } = state || {};
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
  
    const handleConfirmClick = () => {
        // Redirect to the "Please Wait" page
        navigate('/connex_meet_visitor/please-wait');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh)',
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
                    textAlign: 'center',
                    maxWidth: '600px',
                    width: '100%',
                }}
            >
                <Typography variant="h4" sx={{ color: '#fff', mb: 4 }}>Interview Confirmation</Typography>

                <Grid container spacing={3}>
                    {/* Selected Department */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: '#fff' }}>Department:</Typography>
                        <Typography variant="body1" sx={{ color: '#fff' }}>{selectedDepartment}</Typography>
                    </Grid>

                    {/* Selected Interviewee */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: '#fff' }}>Interviewee:</Typography>
                        <Typography variant="body1" sx={{ color: '#fff' }}>{selectedInterviewee.name} ({selectedInterviewee.id})</Typography>
                    </Grid>

                    {/* Time (Static Example) */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: '#fff' }}>Time:</Typography>
                        <Typography variant="body1" sx={{ color: '#fff' }}>2:00 PM - 3:00 PM</Typography>
                    </Grid>

                    {/* Location (Static Example) */}
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: '#fff' }}>Location:</Typography>
                        <Typography variant="body1" sx={{ color: '#fff' }}>ABC Office</Typography>
                    </Grid>

                    {/* Confirm Button */}
                    <Grid item xs={12}>
                        <Button
                            component={motion.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleConfirmClick}
                            variant="contained"
                            color="secondary"
                            sx={{
                                width: '100%',
                                height: '60px',
                                fontSize: '1.2rem',
                                borderRadius: '15px',
                                mt: 2,
                            }}
                        >
                            Confirm

                            Confirm
                        </Button>
                    </Grid>
                </Grid>
                <audio ref={audioRef} src={voiceClip} />
            </Paper>
        </Box>
    );
};

export default InterviewConfirmationPage;
