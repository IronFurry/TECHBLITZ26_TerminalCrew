import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowRight, AlertCircle, User, ShieldCheck, Heart } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const [role, setRole] = useState('receptionist'); // receptionist, doctor, patient
  const [email, setEmail] = useState('receptionist@clinic.com');
  const [password, setPassword] = useState('demo1234');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'receptionist') {
      setEmail('receptionist@clinic.com');
      setPassword('demo1234');
    } else if (role === 'doctor') {
      setEmail('doctor@clinic.com');
      setPassword('demo1234');
    } else {
      setEmail('suresh@patient.com');
      setPassword('demo1234');
    }
    setLocalError('');
  }, [role]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError('');
    try {
      const user = login(email, password);
      success(`Welcome back, ${user.name}!`);
      if (user.role === 'receptionist') navigate('/receptionist');
      else if (user.role === 'doctor') navigate('/doctor');
      else navigate('/patient/dashboard');
    } catch (err) {
      setLocalError(err.message);
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
      padding: '1rem'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="card"
        style={{ width: '100%', maxWidth: '440px', padding: '2.5rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--brand-500)',
            color: 'white',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Activity size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>ClinicOS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Appointment & Scheduling System</p>
        </div>

        {/* Role Selector */}
        <div className="pill-toggle" style={{ marginBottom: '2rem', width: '100%' }}>
          {['receptionist', 'doctor', 'patient'].map((r) => (
            <div
              key={r}
              className={`pill-item ${role === r ? 'active' : ''}`}
              onClick={() => setRole(r)}
              style={{ flex: 1, textAlign: 'center', textTransform: 'capitalize' }}
            >
              {r}
            </div>
          ))}
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {role === 'patient' && (
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Demo: suresh@patient.com / meena@patient.com / amit@patient.com
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <AnimatePresence>
            {localError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--danger)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  background: 'var(--danger-bg)',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--danger-text)',
                  overflow: 'hidden'
                }}
              >
                <AlertCircle size={16} />
                {localError}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', height: '44px' }}
            disabled={loading}
          >
            {loading ? <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /> : "Sign In"}
            {!loading && <ArrowRight size={18} />}
          </motion.button>
        </form>

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
          <div>
            <div style={{ color: 'var(--brand-500)', marginBottom: '0.25rem' }}><ShieldCheck size={20} style={{ margin: '0 auto' }} /></div>
            <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Secure</div>
          </div>
          <div>
            <div style={{ color: 'var(--success)', marginBottom: '0.25rem' }}><Activity size={20} style={{ margin: '0 auto' }} /></div>
            <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Real-time</div>
          </div>
          <div>
            <div style={{ color: 'var(--danger)', marginBottom: '0.25rem' }}><Heart size={20} style={{ margin: '0 auto' }} /></div>
            <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Care-first</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
