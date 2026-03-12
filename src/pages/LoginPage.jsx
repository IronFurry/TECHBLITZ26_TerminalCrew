import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, User, Stethoscope } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const isSuccess = login(email, password);
      if (isSuccess) {
        success('Login successful!');
        if (email.includes('receptionist')) navigate('/receptionist');
        if (email.includes('doctor')) navigate('/doctor');
      } else {
        error('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 600);
  };

  const fillDemo = (role) => {
    setEmail(`${role}@clinic.com`);
    setPassword('demo1234');
  };

  return (
    <div className="login-container">
      <div className="login-visual">
        <div className="visual-content">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="logo-wrapper"
          >
            <Activity size={48} className="logo-icon" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ClinicOS
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Streamlined Appointment & Scheduling System
          </motion.p>
        </div>
        <div className="visual-pattern"></div>
      </div>

      <div className="login-form-wrapper">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="login-card"
        >
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please log in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="demo-section">
            <p>Demo Credentials</p>
            <div className="demo-buttons">
              <button type="button" onClick={() => fillDemo('receptionist')} className="demo-btn">
                <User size={16} /> Receptionist
              </button>
              <button type="button" onClick={() => fillDemo('doctor')} className="demo-btn secondary">
                <Stethoscope size={16} /> Doctor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
