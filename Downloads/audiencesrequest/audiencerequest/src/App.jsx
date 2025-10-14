import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AudienceRequestForm from './components/AudienceRequestForm';
import AudienceTrackingDashboard from './components/AudienceTrackingDashboard';
import ClientAdminDashboard from './components/ClientAdminDashboard';
import AuditTrailPage from './components/AuditTrailPage';

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<AudienceRequestForm />} />
      <Route path="/tracking" element={<AudienceTrackingDashboard />} />
      <Route path="/admin" element={<ClientAdminDashboard />} />
      <Route path="/audit-trail" element={<AuditTrailPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}