import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  InputAdornment,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { PhotoCamera, Edit, Person, Work, Email, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';
import welcomeImage from '../assets/welcome-image.jpg';
import companyLogo from '../assets/company-logo.png'; // Add a company logo image
import visitorVoice from '../assets/audio/clip1.mp3'; // Voice clip for this page
import { useNavigate } from 'react-router-dom';

const VisitorTeamPage = () => {
  const [team, setTeam] = useState([]);
  const [newTeamMember, setNewTeamMember] = useState({
    fullName: '',
    designation: '',
    email: '',
    contactNo: '',
    photo: null,
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Company Info
  const companyName = "Tech Corp";
  const companyEmail = "info@techcorp.com";
  const companyContactNo = "+123456789";

  // Voice clip effect
  useEffect(() => {
    const audio = new Audio(visitorVoice);

    // Start playing the audio after 1 second
    const timer = setTimeout(() => {
      audio.play();
    }, 1000); 

    // Cleanup function to stop the audio when navigating away or unmounting
    return () => {
      clearTimeout(timer); // Stop the timer
      audio.pause();       // Pause the audio
      audio.currentTime = 0; // Reset the audio to the beginning
    };
  }, []); // Run once when the component is mounted

  const handleFieldChange = (e) => {
    setNewTeamMember({
      ...newTeamMember,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
        setNewTeamMember({
          ...newTeamMember,
          photo: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTeamMember = () => {
    if (!newTeamMember.fullName || !newTeamMember.designation || !newTeamMember.email || !newTeamMember.contactNo) {
      alert('Please fill in all fields.');
      return;
    }
    setTeam([...team, newTeamMember]);
    setNewTeamMember({
      fullName: '',
      designation: '',
      email: '',
      contactNo: '',
      photo: null,
    });
    setProfilePreview(null);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setNewTeamMember(member);
    setProfilePreview(member.photo ? URL.createObjectURL(member.photo) : null);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleSaveEdit = () => {
    setTeam(team.map((member) => (member === selectedMember ? newTeamMember : member)));
    setOpenDialog(false);
    setEditMode(false);
    setNewTeamMember({
      fullName: '',
      designation: '',
      email: '',
      contactNo: '',
      photo: null,
    });
    setProfilePreview(null);
  };

  const handleComplete = () => {
    navigate('/please-wait');
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
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: '40px',
          backgroundColor: 'rgba(29, 29, 29, 0.85)',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Left side: Form for adding team members */}
        <Grid container spacing={2} sx={{ flex: '1 1 50%' }}>
          <Grid item xs={10}>
            <Typography variant="h5" sx={{ mb: 2, color: '#fff', textAlign: 'center' }}>
              Visitor Team Information
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={newTeamMember.fullName}
              onChange={handleFieldChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={newTeamMember.designation}
              onChange={handleFieldChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={newTeamMember.email}
              onChange={handleFieldChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Contact No"
              name="contactNo"
              value={newTeamMember.contactNo}
              onChange={handleFieldChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone  />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Profile Picture Upload */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Avatar src={profilePreview} alt="Profile Picture" sx={{ width: 80, height: 80, mr: 2 }} />
              <IconButton color="primary" aria-label="upload picture" component="label">
                <PhotoCamera sx={{fontSize:'50px'}}/>
                <input hidden accept="image/*" type="file" onChange={handleProfilePictureChange} />
              </IconButton>
            </Box>

            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddTeamMember}
              variant="contained"
              color="primary"
              sx={{ width: '50%', mt: 2, marginLeft: '25%' }}
            >
              Add Team Member
            </Button>
          </Grid>
        </Grid>

        {/* Right side: Company Info and Team Members List */}
        <Grid container spacing={2} sx={{ flex: '1 1 50%', pl: 4, borderLeft: '2px solid rgba(255, 255, 255, 0.3)' }}>
          {/* Company Information (20% height) */}
          <Grid item xs={12} sx={{ height: '0px' }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                Team Members
              </Typography>
              <Avatar
                src={companyLogo}
                alt="Company Logo"
                sx={{ height:'20px', width:'60px'}}
              />
            </Box>
            <Typography variant="body1" sx={{ color: '#fff', fontSize: '13px' }}>
              <strong>Email : </strong> {companyEmail}
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', fontSize: '13px'}}>
              <strong>Contact No : </strong> {companyContactNo}
            </Typography>
          </Grid>

          {/* Team Member List (80% height with scroll) */}
          <Grid item xs={12} sx={{ mt:'1' }}>
            <TableContainer
              sx={{
                marginTop: '120px',
                height: '320px',
                maxHeight: '320px',
                overflowY: 'scroll',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '8px',
                },
              }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow >
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Full Name</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Designation</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ color: '#fff', height: '50px' }}>{member.fullName}</TableCell>
                      <TableCell sx={{ color: '#fff', height: '50px' }}>{member.designation}</TableCell>
                      <TableCell sx={{ color: '#fff', height: '50px' }}>
                        <IconButton color="primary" onClick={() => handleEditMember(member)}>
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              variant="contained"
              color="secondary"
              sx={{ width: '50%', mt: 2, marginLeft: '25%' }}
            >
              Complete
            </Button>
          </Grid>
        </Grid>

        {/* Dialog for Editing Team Member */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Team Member</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={newTeamMember.fullName}
              onChange={handleFieldChange}
              required
            />
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={newTeamMember.designation}
              onChange={handleFieldChange}
              required
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={newTeamMember.email}
              onChange={handleFieldChange}
              required
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Contact No"
              name="contactNo"
              value={newTeamMember.contactNo}
              onChange={handleFieldChange}
              required
              sx={{ mt: 2 }}
            />

            {/* Image Edit */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <Avatar src={profilePreview} alt="Profile Picture" sx={{ width: 80, height: 80, mr: 2 }} />
              <IconButton color="primary" aria-label="upload picture" component="label">
                <PhotoCamera />
                <input hidden accept="image/*" type="file" onChange={handleProfilePictureChange} />
              </IconButton>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveEdit} color="primary" variant="contained">
              Save
            </Button>
            <Button onClick={() => setOpenDialog(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default VisitorTeamPage;
