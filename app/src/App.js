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
import SessionConfirmationPage from './components/SessionConfirmationPage';
import VisitorTeamPagesesion from './components/VisitorTeamPage_session';
import InterviewDetailsPage from './components/InterviewDetailsPage';
import InterviewConfirmationPage from './components/InterviewConfirmationPage';
import ServiceDetailsPage from './components/ServiceDetailsPage';
import ServiceConfirmationPage from './components/ServiceConfirmationPage';
import VisitorTeamPageService from './components/VisitorTeamPageService';
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
          <Route path="/visitor-team-service" element={<VisitorTeamPageService  />} />
          <Route path="/visitor-team-sesion" element={<VisitorTeamPagesesion  />} />
          <Route path="/please-wait" element={<PleaseWaitPage  />} />
          <Route path="/session-details" element={<SessionDetailsPage />}/>
          <Route path="/session-confirmation" element={<SessionConfirmationPage />} /> {/* Add the new route */}
          <Route path="/registration-success" element={<RegistrationSuccessPage  />} />
          <Route path="/interview-details" element={<InterviewDetailsPage />} />
          <Route path="/interview-confirmation" element={<InterviewConfirmationPage />} />
          <Route path="/service-details" element={<ServiceDetailsPage />} /> {/* New route */}
        <Route path="/service-confirmation" element={<ServiceConfirmationPage />} /> {/* New route */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
