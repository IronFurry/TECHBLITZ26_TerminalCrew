import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import LoginPage from './pages/LoginPage';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import DoctorDailyView from './pages/DoctorDailyView';
import PatientProfile from './pages/PatientProfile';
import BookAppointment from './pages/BookAppointment';
import RemindersPage from './pages/RemindersPage';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* Receptionist Routes */}
        <Route element={<ProtectedRoute allowedRole="receptionist"><Layout /></ProtectedRoute>}>
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/receptionist/book" element={<BookAppointment />} />
          <Route path="/receptionist/appointments" element={<ReceptionistDashboard />} />
          <Route path="/receptionist/patients" element={<ReceptionistDashboard view="patients" />} />
          <Route path="/receptionist/reminders" element={<RemindersPage />} />
          <Route path="/patient/:id" element={<PatientProfile />} />
        </Route>

        {/* Doctor Routes */}
        <Route element={<ProtectedRoute allowedRole="doctor"><Layout /></ProtectedRoute>}>
          <Route path="/doctor" element={<DoctorDailyView />} />
          <Route path="/doctor/patients" element={<DoctorDailyView view="patients" />} />
          <Route path="/doctor/patient/:id" element={<PatientProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
