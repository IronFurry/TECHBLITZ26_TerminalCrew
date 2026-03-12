import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRole = null }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to their respective dashboard
    if (user.role === 'receptionist') {
      return <Navigate to="/receptionist" replace />;
    } else if (user.role === 'doctor') {
      return <Navigate to="/doctor" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
