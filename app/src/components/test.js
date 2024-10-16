import React, { useEffect, useState } from 'react';
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
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { PhotoCamera, Edit, Person, Work, Email, Phone, Business } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import APIConnection from '../config'; // API config file
import welcomeImage from '../assets/welcome-image.jpg';

const VisitorTeamPage = () => {
  const [team, setTeam] = useState([]); // Store participants
  const [openDialog, setOpenDialog] = useState(false); // Handle popup form visibility
  const [profilePreview, setProfilePreview] = useState(null); // Preview uploaded photo
  const [selectedMember, setSelectedMember] = useState(null); // Track selected member for editing
  const { state } = useLocation(); // Get data from the previous page
  const { selectedMeeting } = state || {};

  const [newMember, setNewMember] = useState({
    fullName: '',
    email: '',
    designation: '',
    contactNo: '',
    companyName: '',
    photo: '',
  });

  const navigate = useNavigate();

  // Fetch participants when the component mounts
  useEffect(() => {
    fetchParticipants(selectedMeeting);
  }, [selectedMeeting]);

  const fetchParticipants = async (bookingId) => {
    try {
      const response = await axios.get(`${APIConnection.mainapi}/connex-booking-participant/${bookingId}`);
      const participants = Array.isArray(response.data) ? response.data : [response.data];
      setTeam(participants);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    }
  };

  const handleFieldChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
        setNewMember({ ...newMember, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const openMemberDialog = (member = null) => {
    setSelectedMember(member);
    if (member) {
      setNewMember({
        fullName: member.participant_name,
        email: member.participant_email || '',
        designation: member.designation || '',
        contactNo: member.contact_no || '',
        companyName: member.company_name || '',
        photo: member.photo || '',
      });
      setProfilePreview(member.photo || null);
    } else {
      setNewMember({
        fullName: '',
        email: '',
        designation: '',
        contactNo: '',
        companyName: '',
        photo: '',
      });
      setProfilePreview(null);
    }
    setOpenDialog(true);
  };

  const handleSaveMember = async () => {
    if (!newMember.photo) {
      alert('Image is required!');
      return;
    }

    const payload = {
      bookingId: selectedMeeting,
      companyName: newMember.companyName,
      fullName: newMember.fullName,
      type: 'Visitor',
      status: 'Active',
      designation: newMember.designation,
      email: newMember.email,
      contactNo: newMember.contactNo,
      image: newMember.photo,
      reason: 'N/A',
    };

    try {
      if (selectedMember) {
        await axios.put(
          `${APIConnection.mainapi}/visitor-profile-update/${selectedMember.participant_id}`,
          payload
        );
        fetchParticipants(selectedMeeting);
      } else {
        const response = await axios.post(
          `${APIConnection.mainapi}/connex-booking-addvisitors`,
          payload
        );
        console.log('Participant added:', response.data);
        fetchParticipants(selectedMeeting);
      }

      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to save member:', error);
      alert('Error: ' + error.response?.data?.message || 'Failed to add member');
    }
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '40px',
          backgroundColor: 'rgba(29, 29, 29, 0.85)',
          borderRadius: '15px',
          maxWidth: '1000px',
          width: '100%',
          zIndex: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>
              Visitor Team Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TableContainer sx={{ maxHeight: '320px', overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Full Name</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Designation</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Email</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Company Name</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Contact No</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {team.length > 0 ? (
                    team.map((member) => (
                      <TableRow key={member.participant_id}>
                        <TableCell sx={{ color: '#fff' }}>{member.participant_name}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{member.designation || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{member.participant_email || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{member.company_name}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{member.contact_no || 'N/A'}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={() => openMemberDialog(member)}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ color: '#fff' }}>
                        No participants available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              onClick={() => openMemberDialog()}
              variant="contained"
              color="primary"
            >
              Add Member
            </Button>
          </Grid>
        </Grid>

        <Button
          onClick={handleComplete}
          variant="contained"
          color="success"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          Complete
        </Button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{selectedMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={newMember.fullName}
              onChange={handleFieldChange}
              sx={{ mb: 2 }}
              InputProps={{ startAdornment: <Person /> }}
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={newMember.email}
              onChange={handleFieldChange}
              sx={{ mb: 2 }}
              InputProps={{ startAdornment: <Email /> }}
            />
            <TextField
              fullWidth
              name="designation"
              label="Designation"
              value={newMember.designation}
              onChange={handleFieldChange}
              sx={{ mb: 2 }}
              InputProps={{ startAdornment: <Work /> }}
            />
            <TextField
              fullWidth
              name="companyName"
              label="Company Name"
              value={newMember.companyName}
              onChange={handleFieldChange}
              sx={{ mb: 2 }}
              InputProps={{ startAdornment: <Business /> }}
            />
            <TextField
              fullWidth
              name="contactNo"
              label="Contact No"
              value={newMember.contactNo}
              onChange={handleFieldChange}
              sx={{ mb: 2 }}
              InputProps={{ startAdornment: <Phone /> }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Avatar src={profilePreview} sx={{ width: 80, height: 80, mr: 2 }} />
              <IconButton component="label">
                <PhotoCamera />
                <input hidden accept="image/*" type="file" onChange={handleProfilePictureChange} />
              </IconButton>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSaveMember} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={() => setOpenDialog(false)} variant="outlined" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default VisitorTeamPage;
