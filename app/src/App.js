// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PurposeSelection from './components/PurposeSelection';
import MeetingDetailsPage from './components/MeetingDetailsPage';
import theme from './theme'; // Import the custom theme
import MeetingConfirmationPage from './components/MeetingConfirmationPage';
import VisitorTeamPage from './components/VisitorTeamPage';
import PleaseWaitPage from './components/PleaseWaitPage';
import RegistrationSuccessPage from './components/RegistrationSuccessPage';
import SessionDetailsPage from './components/SessionDetailsPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/purpose-selection" element={<PurposeSelection />} />
          <Route path="/meeting-details" element={<MeetingDetailsPage  />} />
          <Route path="/meeting-confirmation" element={<MeetingConfirmationPage  />} />
          <Route path="/visitor-team" element={<VisitorTeamPage  />} />
          <Route path="/please-wait" element={<PleaseWaitPage  />} />
          <Route path="/session-details" element={<SessionDetailsPage />} /> {/* Add the new route */}
          <Route path="/registration-success" element={<RegistrationSuccessPage  />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
