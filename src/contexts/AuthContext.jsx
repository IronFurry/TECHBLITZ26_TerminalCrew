import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === 'receptionist@clinic.com' && password === 'demo1234') {
      setUser({ role: 'receptionist', email });
      return true;
    }
    if (email === 'doctor@clinic.com' && password === 'demo1234') {
      setUser({ role: 'doctor', email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
