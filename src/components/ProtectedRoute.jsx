import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from "framer-motion";

const ProtectedRoute = ({ children, allowedRole = null }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role based redirection if accessing wrong module
  if (allowedRole && user.role !== allowedRole) {
    if (user.role === 'receptionist') return <Navigate to="/receptionist" replace />;
    if (user.role === 'doctor') return <Navigate to="/doctor" replace />;
    if (user.role === 'patient') return <Navigate to="/patient/dashboard" replace />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }}
      style={{ minHeight: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;
