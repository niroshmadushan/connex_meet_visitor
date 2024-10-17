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
  InputAdornment,
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
  Checkbox,
} from '@mui/material';
import { PhotoCamera, Edit, Search, Person, Work, Email, Phone, Business } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2
import APIConnection from '../config'; // API config file
import welcomeImage from '../assets/welcome-image.jpg';

const VisitorTeamPage = () => {
  const [team, setTeam] = useState([]); // Store participants
  const [filteredTeam, setFilteredTeam] = useState([]); // Store filtered participants
  const [openDialog, setOpenDialog] = useState(false); // Handle popup form visibility
  const [profilePreview, setProfilePreview] = useState(null); // Preview uploaded photo
  const [selectedMember, setSelectedMember] = useState(null); // Track selected member for editing
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const { state } = useLocation(); // Get data from the previous page
  const { selectedMeeting } = state || {};
  const [newMember, setNewMember] = useState({
    fullName: '',
    email: '',
    designation: '',
    contactNo: '',
    companyName: '',
    photo: '', // Ensure we track the photo upload
  });
  const [selectedMembers, setSelectedMembers] = useState([]); // Track selected checkboxes

  const navigate = useNavigate();

  useEffect(() => {
    fetchParticipants(selectedMeeting);
  }, [selectedMeeting]);

  useEffect(() => {
    // Filter the team based on the search term
    if (searchTerm) {
      const filtered = team.filter((member) =>
        member.participant_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeam(filtered);
    } else {
      setFilteredTeam(team); // Show full list if no search term
    }
  }, [searchTerm, team]);

  const fetchParticipants = async (bookingId) => {
    try {
      const response = await axios.get(`${APIConnection.mainapi}/connex-booking-participant/${bookingId}`);
      const participants = Array.isArray(response.data) ? response.data : [response.data];
      setTeam(participants);
      setFilteredTeam(participants); // Set filtered team initially
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
        setNewMember({ ...newMember, photo: reader.result }); // Update photo in state
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form data before saving
  const validateForm = () => {
    const { fullName, email, designation, contactNo, companyName, photo } = newMember;
    setOpenDialog(false);
    // Check if any field is empty
    if (!fullName || !email || !designation || !contactNo || !companyName || !photo) {
      Swal.fire({
        title: 'Error',
        text: 'All fields are required. Please fill in all the details.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return false;
    }

    // Validate email format
    if (!validateEmail(email)) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
      return false;
    }

    return true;
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
    if (!validateForm()) return; // Prevent submission if validation fails
    setOpenDialog(false);
    const payload = {
      bookingId: selectedMeeting,
      companyName: newMember.companyName,
      fullName: newMember.fullName,
      type: 'Visitor',
      status: 'Active',
      designation: newMember.designation,
      email: newMember.email,
      contactNo: newMember.contactNo,
      image: newMember.photo, // Ensure Base64 image is sent
      reason: 'N/A',
    };

    try {
      if (selectedMember) {
        await axios.put(`${APIConnection.mainapi}/visitor-profile-update/${selectedMember.participant_id}`, payload);
        fetchParticipants(selectedMeeting);
        setOpenDialog(false);
        // Show success alert after successful edit
        Swal.fire({
          title: 'Success',
          text: 'Member updated successfully!',
          icon: 'success',
          confirmButtonText: 'Great!',
        });
      } else {
        const response = await axios.post(`${APIConnection.mainapi}/connex-booking-addvisitors`, payload);
        console.log('Participant added:', response.data);
        fetchParticipants(selectedMeeting);
      }
     
    } catch (error) {
      console.error('Failed to save member:', error);
      setOpenDialog(false);
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Failed to add member',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId) // Deselect if already selected
        : [...prevSelected, memberId] // Add to selected if not selected
    );
  };

  // Confirmation before completing the task
 // Function to handle the "Complete" button click
const handleComplete = async () => {
  if (selectedMembers.length === 0) {
    // Show an alert if no participant is selected
    Swal.fire({
      title: 'Error',
      text: 'Please select at least one participant.',
      icon: 'error',
      confirmButtonText: 'Okay',
    });
    return;
  }

  // Confirm completion
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to complete the task?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, complete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Step 1: Send visitor information (booking completion)
        const visitorInfoPayload = {
          bookingId: selectedMeeting,
          time: new Date().toLocaleTimeString(),
          status: 1,
          date: new Date().toLocaleDateString(),
        };

        // Sending visitor information to the backend
        const visitorInfoResponse = await axios.post(
          `${APIConnection.mainapi}/connex-booking-addvisitorinformation`,
          visitorInfoPayload
        );
        console.log('Visitor Information Added:', visitorInfoResponse.data);

        // Step 2: Send selected participants to the visitor ID pass API
        const visitorRequests = selectedMembers.map((memberId) => {
          const member = team.find((m) => m.participant_id === memberId);

          return axios.post(`${APIConnection.mainapi}/add-vistor-id-pass`, {
            bookingId: selectedMeeting,
            PM_ID: member.participant_id,
            name: member.participant_name,
            designation: member.designation,
            email: member.participant_email,
            companyName: member.company_name,
            contactNo: member.contact_no,
            visitorId: `null`, // Random visitorId
            status: '1',
          });
        });

        // Wait for all visitor card requests to complete
        await Promise.all(visitorRequests);

        // Step 3: Show success message and redirect to the success page
        Swal.fire('Completed!', 'The process has been completed successfully.', 'success');
        navigate('/please-wait', { state: { selectedMeeting } });
      } catch (error) {
        console.error('Failed to complete process:', error);
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Failed to complete the process',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      }
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
          zIndex: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TextField
                variant="outlined"
                placeholder="Search by Full Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  style: { color: '#fff' }, // Customize text color
                }}
                sx={{
                  backgroundColor: '#333',
                  borderRadius: '10px',
                  color: '#fff',
                  width: '250px',
                  input: { color: '#fff' }, // Customize input color
                }}
              />
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>
              Team Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TableContainer sx={{ maxHeight: '300px', overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Select</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Full Name</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Email</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Interview Designation</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Contact No</TableCell>
                    <TableCell sx={{ color: '#fff', backgroundColor: '#333' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTeam.length > 0 ? (
                    filteredTeam.map((member) => (
                      <TableRow
                        key={member.participant_id}
                        component={motion.tr}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Checkbox in the first column */}
                        <TableCell sx={{ color: '#fff' }}>
                          <Checkbox
                            checked={selectedMembers.includes(member.participant_id)}
                            onChange={() => handleCheckboxChange(member.participant_id)}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#fff' }}>{member.participant_name}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{member.participant_email || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{member.company_name}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{member.contact_no || 'N/A'}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <IconButton
                              color="primary"
                              onClick={() => openMemberDialog(member)}
                              sx={{ width: '100%' }} // Increased to full width after delete removal
                            >
                              <Edit />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ color: '#fff' }}>
                        No participants available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Add Member and Complete buttons on the same line */}
          <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                onClick={() => openMemberDialog()}
                variant="contained"
                color="primary"
                sx={{ width: '150px' }} // Same width for both buttons
              >
                Add Member
              </Button>

              <Button
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                variant="contained"
                color="secondary"
                sx={{ width: '150px' }} // Same width for both buttons
              >
                Complete
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{selectedMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={newMember.fullName}
              onChange={handleFieldChange}
              sx={{ mb: 2, mt: 2 }}
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
              name="companyName"
              label="Interview Designation"
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
