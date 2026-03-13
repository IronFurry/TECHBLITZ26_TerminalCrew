import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ArrowRight, AlertCircle, User, ShieldCheck, Heart, Mail, Lock, HelpCircle, Stethoscope } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const { login, signup, loginWithGoogle } = useAuth();
  const { success, error: toastError } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('patient'); // Default to patient for the main form
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError('');
    try {
      if (isSignUp) {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        await signup(email, password, { name, role: 'patient', initials });
        success(`Account created! You can now sign in.`);
        setIsSignUp(false);
      } else {
        const user = await login(email, password);
        const userRole = user.user_metadata?.role || 'patient';
        const userName = user.user_metadata?.name || 'User';
        success(`Welcome back, ${userName}!`);
        if (userRole === 'receptionist') navigate('/receptionist');
        else if (userRole === 'doctor') navigate('/doctor');
        else navigate('/patient/dashboard');
      }
    } catch (err) {
      setLocalError(err.message);
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = (providerRole) => {
    setRole(providerRole);
    setIsSignUp(false); // Providers only login
    success(`Switched to ${providerRole} login mode.`);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      // Supabase will redirect to Google and then back to us
    } catch (err) {
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* Left Panel: Information & Branding */}
      <div className="login-left" style={{ background: 'linear-gradient(135deg, #EEF4FF 0%, #E0EAFF 50%, #D0E0FF 100%)' }}>
        <div style={{ position: 'absolute', top: '3rem', left: '3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--brand-500)', color: 'white', padding: '0.625rem', borderRadius: '12px', display: 'flex', boxShadow: '0 4px 12px rgba(26, 107, 255, 0.3)' }}>
            <Activity size={24} />
          </div>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>clinicOS</span>
        </div>

        <div style={{ maxWidth: '480px', textAlign: 'left', zIndex: 1 , maxHeight:"500px"}}>
          <div style={{ marginBottom: '1.5rem', display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(26, 107, 255, 0.1)', color: 'var(--brand-600)', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Trusted by 5,000+ Clinics Worldwide
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.05, marginBottom: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
            Your health, <br />
            <span style={{ color: 'var(--brand-500)', position: 'relative' }}>
              simplified.
              <svg style={{ position: 'absolute', bottom: '-5px', left: 0, width: '100%' }} viewBox="0 0 200 8" fill="none">
                <path d="M2 6C30 2 170 2 198 6" stroke="var(--brand-500)" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
              </svg>
            </span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Access your medical records, book appointments with top specialists, and manage your health journey all in one secure platform.
          </p>

          <div style={{ position: 'relative', height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Premium Illustration Placeholder */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{ width: '200px', height: '260px', background: 'white', borderRadius: '48px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', border: '12px solid #F8FAFC', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }} />
              <div style={{ position: 'absolute', top: '20%', left: '10%', right: '10%', height: '40px', background: '#F1F5F9', borderRadius: '12px' }} />
              <div style={{ position: 'absolute', top: '35%', left: '10%', right: '40%', height: '24px', background: '#F1F5F9', borderRadius: '8px' }} />
              <div style={{ position: 'absolute', bottom: '15%', left: '10%', right: '10%', height: '80px', background: 'var(--brand-50)', borderRadius: '20px', border: '1px solid var(--brand-500)', opacity: 0.3 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Activity size={80} color="var(--brand-500)" opacity={0.1} />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ position: 'absolute', top: '10%', right: '-40px', background: 'white', padding: '1rem', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #F1F5F9' }}
            >
              <div style={{ width: '40px', height: '40px', background: '#DCFCE7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803D' }}>
                <Heart size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>Heart Rate</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>72 BPM</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ position: 'absolute', bottom: '15%', left: '-40px', background: 'white', padding: '1rem', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid #F1F5F9' }}
            >
              <div style={{ width: '40px', height: '40px', background: '#DBEAFE', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}>
                <ShieldCheck size={20} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>Status</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Verified</div>
              </div>
            </motion.div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '2rem', left: '3rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>© 2026 clinicOS Systems</span>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#CBD5E1' }} />
          
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="login-right">
        <div className="login-card" style={{ padding: '2rem' }}>
          <div className="login-tabs" style={{ marginBottom: '1.5rem' }}>
            <div className={`login-tab ${!isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(false)} style={{ padding: '0.75rem 1rem' }}>Sign In</div>
            <div className={`login-tab ${isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(true)} style={{ padding: '0.75rem 1rem' }}>Create Account</div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {isSignUp && (
              <div className="input-group">
                <label style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    className="input input-with-icon"
                    style={{ padding: '0.75rem 1rem 0.75rem 2.75rem', fontSize: '0.875rem' }}
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  className="input input-with-icon"
                  style={{ padding: '0.75rem 1rem 0.75rem 2.75rem', fontSize: '0.875rem' }}
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Password</label>
                {!isSignUp && <a href="#" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-500)', textDecoration: 'none' }}>Forgot?</a>}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} className="input-icon" />
                <input
                  type="password"
                  className="input input-with-icon"
                  style={{ padding: '0.75rem 1rem 0.75rem 2.75rem', fontSize: '0.875rem' }}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {localError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ color: 'var(--danger)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--danger-bg)', padding: '0.5rem 0.75rem', borderRadius: '10px' }}
                >
                  <AlertCircle size={14} />
                  {localError}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', height: '48px', fontSize: '0.9375rem', marginTop: '0.25rem' }}
              disabled={loading}
            >
              {loading ? <div className="spinner" /> : (isSignUp ? "Join ClinicOS" : "Sign In")}
              {!loading && <ArrowRight size={18} style={{ marginLeft: 'auto' }} />}
            </motion.button>
          </form>

          <div style={{ textAlign: 'center', margin: '1.25rem 0', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border)', zIndex: 0 }} />
            <span style={{ position: 'relative', background: 'white', padding: '0 0.75rem', color: 'var(--text-secondary)', fontSize: '0.7rem', fontWeight: 600, zIndex: 1 }}>Or continue with</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <button 
              onClick={handleGoogleLogin}
              className="btn btn-secondary" 
              style={{ padding: '0.625rem', fontSize: '0.8125rem' }}
              disabled={loading}
            >
              <img src="https://www.google.com/favicon.ico" width={14} height={14} alt="Google" />
              <span>Google</span>
            </button>
            <button className="btn btn-secondary" style={{ padding: '0.625rem', fontSize: '0.8125rem' }}>
              <img src="https://www.apple.com/favicon.ico" width={14} height={14} alt="Apple" />
              <span>Apple ID</span>
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}><b>Login as</b> a provider</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button 
                onClick={() => handleProviderLogin('receptionist')}
                className="btn btn-secondary" 
                style={{ background: role === 'receptionist' ? 'var(--brand-50)' : 'white', borderRadius: '12px', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              >
                <Activity size={14} style={{ color: 'var(--brand-500)' }} />
                <span>Receptionist</span>
              </button>
              <button 
                onClick={() => handleProviderLogin('doctor')}
                className="btn btn-secondary" 
                style={{ background: role === 'doctor' ? 'var(--brand-50)' : 'white', borderRadius: '12px', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
              >
                <Stethoscope size={14} style={{ color: 'var(--brand-500)' }} />
                <span>Doctor</span>
              </button>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
