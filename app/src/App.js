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
import InterviewConfirmationPage from './components/MeetingConfirmationPage2';
import ServiceConfirmationPage from './components/MeetingConfirmationPage3';
import VisitorTeamPage from './components/VisitorTeamPage';
import PleaseWaitPage from './components/PleaseWaitPage';
import RegistrationSuccessPage from './components/RegistrationSuccessPage';
import SessionDetailsPage from './components/SessionDetailsPage';
import SessionConfirmationPage from './components/SessionConfirmationPage';
import VisitorTeamPagesesion from './components/VisitorTeamPage_session';
import InterviewDetailsPage from './components/InterviewDetailsPage';
import ServiceDetailsPage from './components/ServiceDetailsPage';

import VisitorTeamPageinterview from './components/VisitorTeamPageinterview';
import VisitorTeamPageservice from './components/VisitorTeamPageService';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/connex_meet_visitor/" element={<HomePage />} />
          <Route path="/connex_meet_visitor/purpose-selection" element={<PurposeSelection />} />
          <Route path="/connex_meet_visitor/meeting-details" element={<MeetingDetailsPage  />} />
          <Route path="/connex_meet_visitor/meeting-confirmation" element={<MeetingConfirmationPage  />} />
          
       
          <Route path="/connex_meet_visitor/visitor-team" element={<VisitorTeamPage  />} />
          <Route path="/connex_meet_visitor/visitor-team-interview" element={<VisitorTeamPageinterview  />} />
          <Route path="/connex_meet_visitor/visitor-team-sesion" element={<VisitorTeamPagesesion  />} />
          <Route path="/connex_meet_visitor/visitor-team-service" element={<VisitorTeamPageservice  />} />
          <Route path="/connex_meet_visitor/please-wait" element={<PleaseWaitPage  />} />
          <Route path="/connex_meet_visitor/session-details" element={<SessionDetailsPage />}/>
          <Route path="/connex_meet_visitor/session-confirmation" element={<SessionConfirmationPage />} /> {/* Add the new route */}
          <Route path="/connex_meet_visitor/registration-success" element={<RegistrationSuccessPage  />} />
          <Route path="/connex_meet_visitor/interview-details" element={<InterviewDetailsPage />} />
          <Route path="/connex_meet_visitor/interview-confirmation" element={<InterviewConfirmationPage />} />
          <Route path="/connex_meet_visitor/service-details" element={<ServiceDetailsPage />} /> {/* New route */}
        <Route path="/connex_meet_visitor/service-confirmation" element={<ServiceConfirmationPage />} /> {/* New route */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
