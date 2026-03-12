import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronDown, ChevronRight, LogOut, Activity, ArrowRight, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { appointments } from '../../lib/mockData';
import { useToast } from '../../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const { error: toastError } = useToast();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const myAppointments = appointments.filter(a => a.patientId === user.patientId);
  const now = new Date();

  // For mock purposes, we'll assume Sarah Mitchell etc. are related to our patient users
  // But based on user_request, we filter by patientId
  const upcoming = myAppointments.filter(a => {
    // In real app, we'd parse time correctly. 
    // For demo, if it's in mockData, it's upcoming unless cancelled.
    return a.status !== 'cancelled';
  });

  const past = myAppointments.filter(a => a.status === 'Completed');

  const handleCancel = (id) => {
    if (window.confirm("Cancel this appointment?")) {
      // In real app, update state. For now just toast.
      toastError("Appointment cancelled.");
    }
  };

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Simplified Top Bar */}
      <header style={{ 
        height: '56px', 
        background: 'var(--surface)', 
        borderBottom: '1px solid var(--border)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--brand-500)' }}>
          <Activity size={24} />
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>ClinicOS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</span>
          <button onClick={logout} className="btn-ghost" style={{ padding: '0.5rem' }}>
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main style={{ padding: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        {/* Welcome Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card" 
          style={{ 
            padding: '1.25rem', 
            marginBottom: '1.5rem', 
            borderLeft: '4px solid var(--brand-500)',
            borderRadius: '0 var(--radius-card) var(--radius-card) 0'
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Good morning, {user?.name.split(' ')[0]}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Here are your upcoming appointments.</p>
        </motion.div>

        {/* Upcoming Section */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--brand-500)" />
            Upcoming
          </h3>
          
          {upcoming.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {upcoming.map(app => (
                <div key={app.id} className="card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>
                      Fri, 13 Mar · {app.time}
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Dr. Priya Sharma</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.125rem' }}>{app.type}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span className="badge" style={{ background: 'var(--brand-50)', color: 'var(--brand-500)' }}>Confirmed</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                      <button 
                        onClick={() => handleCancel(app.id)}
                        className="btn" 
                        style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem', background: 'var(--danger-bg)', color: 'var(--danger-text)' }}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => navigate(`/patient/book?reschedule=${app.id}`)}
                        className="btn btn-secondary" 
                        style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '2rem', background: 'transparent', borderStyle: 'dashed' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No upcoming appointments.</p>
              <button 
                onClick={() => navigate('/patient/book')}
                className="btn btn-primary" 
                style={{ marginTop: '0.75rem' }}
              >
                <span>Book one now</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        {/* Past Section */}
        <section style={{ marginBottom: '2.5rem' }}>
          <div 
            onClick={() => setCollapsed(!collapsed)}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              cursor: 'pointer',
              marginBottom: '0.75rem'
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Past Appointments</h3>
            <div style={{ color: 'var(--text-secondary)' }}>
              {collapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {past.map(app => (
                        <tr key={app.id}>
                          <td>July 12, 2024</td>
                          <td style={{ fontWeight: 600 }}>Dr. Priya Sharma</td>
                          <td><span className="badge" style={{ background: 'var(--success-bg)', color: 'var(--success-text)' }}>Completed</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button 
            onClick={() => navigate('/patient/book')}
            className="btn btn-primary" 
            style={{ flex: 1, height: '48px' }}
          >
            <Calendar size={18} />
            Book New
          </button>
          <button 
            onClick={() => navigate('/patient/profile')}
            className="btn btn-secondary" 
            style={{ flex: 1, height: '48px' }}
          >
            <User size={18} />
            My Profile
          </button>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
