import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Layout & Protection
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import DoctorDailyView from './pages/DoctorDailyView';
import BookAppointment from './pages/BookAppointment';
import PatientProfile from './pages/PatientProfile';
import RemindersPage from './pages/RemindersPage';

// Patient Portal Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientBooking from './pages/patient/PatientBooking';
import PatientProfileSelf from './pages/patient/PatientProfile';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />

        {/* Receptionist Routes */}
        <Route path="/receptionist" element={
          <ProtectedRoute allowedRole="receptionist">
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<ReceptionistDashboard />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="patients" element={<ReceptionistDashboard view="patients" />} />
          <Route path="appointments" element={<ReceptionistDashboard view="appointments" />} />
          <Route path="reminders" element={<RemindersPage />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor" element={
          <ProtectedRoute allowedRole="doctor">
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<DoctorDailyView />} />
          <Route path="patients" element={<div>Patient Directory (Doctor)</div>} />
        </Route>

        {/* Patient Portal Routes (Simplified Layout - No Sidebar) */}
        <Route path="/patient/dashboard" element={
          <ProtectedRoute allowedRole="patient">
            <PatientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/patient/book" element={
          <ProtectedRoute allowedRole="patient">
            <PatientBooking />
          </ProtectedRoute>
        } />
        <Route path="/patient/profile" element={
          <ProtectedRoute allowedRole="patient">
            <PatientProfileSelf />
          </ProtectedRoute>
        } />

        {/* Shared / General Routes */}
        <Route path="/patient/:id" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<PatientProfile />} />
        </Route>

        {/* Default Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
