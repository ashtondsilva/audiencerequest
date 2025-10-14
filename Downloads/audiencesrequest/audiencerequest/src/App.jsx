import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AudienceRequestForm from './components/AudienceRequestForm';
import AudienceTrackingDashboard from './components/AudienceTrackingDashboard';
import ClientAdminDashboard from './components/ClientAdminDashboard';
import AuditTrailPage from './components/AuditTrailPage';
import Navbar from './components/Navbar';

function AppContent() {
  return (
     <>
     <Navbar />
    <Routes>
      <Route path="/" element={<AudienceRequestForm />} />
      <Route path="/tracking" element={<AudienceTrackingDashboard />} />
      <Route path="/admin" element={<ClientAdminDashboard />} />
      <Route path="/audit-trail" element={<AuditTrailPage />} />
    </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}