import React, { createContext, useContext, useState, useEffect } from 'react';
import { patientUsers } from '../lib/mockData';

const AuthContext = createContext();

const MOCK_USERS = {
  'receptionist@clinic.com': { 
    password: 'demo1234', 
    role: 'receptionist', 
    name: 'Riya Kapoor', 
    initials: 'RK' 
  },
  'doctor@clinic.com': { 
    password: 'demo1234', 
    role: 'doctor', 
    name: 'Dr. Priya Sharma', 
    initials: 'PS' 
  },
  ...Object.fromEntries(
    patientUsers.map(u => [
      u.email, 
      { password: u.password, role: 'patient', name: u.name, initials: u.initials, patientId: u.id }
    ])
  )
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('clinic_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const found = MOCK_USERS[email];
    if (found && found.password === password) {
      const userData = { 
        email, 
        role: found.role, 
        name: found.name, 
        initials: found.initials,
        ...(found.patientId && { patientId: found.patientId })
      };
      setUser(userData);
      localStorage.setItem('clinic_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error("Invalid credentials");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clinic_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
