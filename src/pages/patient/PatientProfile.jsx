import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, Globe, Activity, LogOut, Calendar, CheckCircle2, History, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { appointments } from '../../lib/mockData';
import { useToast } from '../../contexts/ToastContext';

const PatientProfileSelf = () => {
  const { user, logout } = useAuth();
  const { info } = useToast();
  const navigate = useNavigate();

  const myAppointments = appointments.filter(a => a.patientId === user.patientId);
  const upcomingCount = myAppointments.filter(a => a.status === 'Confirmed' || a.status === 'In Progress').length;
  const cancelledCount = myAppointments.filter(a => a.status === 'cancelled').length;

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
        <button onClick={() => navigate('/patient/dashboard')} className="btn-ghost" style={{ marginBottom: '1rem', paddingLeft: 0 }}>
          <ArrowLeft size={18} />
          <span>Back to dashboard</span>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Profile Basic Card */}
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ 
              width: '56px', height: '56px', borderRadius: '50%', background: 'var(--brand-500)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 800
            }}>
              {user?.initials}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{user?.name}</h2>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                <span className="badge" style={{ background: 'var(--brand-50)', color: 'var(--brand-500)' }}>Patient</span>
                <span className="badge" style={{ background: 'var(--success-bg)', color: 'var(--success-text)' }}>English</span>
              </div>
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={() => info("Profile editing coming soon.")}
            >
              Edit Profile
            </button>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--brand-500)', marginBottom: '0.25rem' }}><History size={20} style={{ margin: '0 auto' }} /></div>
              <div style={{ fontSize: '1rem', fontWeight: 800 }}>{myAppointments.length}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Total</div>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--success)', marginBottom: '0.25rem' }}><CheckCircle2 size={20} style={{ margin: '0 auto' }} /></div>
              <div style={{ fontSize: '1rem', fontWeight: 800 }}>{upcomingCount}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Upcoming</div>
            </div>
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: 'var(--danger)', marginBottom: '0.25rem' }}><XCircle size={20} style={{ margin: '0 auto' }} /></div>
              <div style={{ fontSize: '1rem', fontWeight: 800 }}>{cancelledCount}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>Cancelled</div>
            </div>
          </div>

          {/* Detailed History */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Full Booking History</h3>
            </div>
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Physician</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myAppointments.map(app => (
                    <tr key={app.id}>
                      <td style={{ fontSize: '0.8125rem' }}>13 Mar, 2026</td>
                      <td style={{ fontWeight: 600 }}>Dr. Priya Sharma</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{app.type}</td>
                      <td>
                        <span className="badge" style={{ 
                          background: app.status === 'Completed' ? 'var(--success-bg)' : 'var(--brand-50)',
                          color: app.status === 'Completed' ? 'var(--success-text)' : 'var(--brand-500)'
                        }}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientProfileSelf;
