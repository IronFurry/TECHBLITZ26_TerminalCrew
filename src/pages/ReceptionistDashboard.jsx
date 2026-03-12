import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle2, Phone, Edit3, Trash2, Search, ArrowRight } from 'lucide-react';
import { appointments, patients } from '../lib/mockData';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';

const ReceptionistDashboard = ({ view = 'appointments' }) => {
  const { success } = useToast();
  const navigate = useNavigate();
  const [localAppointments, setLocalAppointments] = useState(appointments);

  const handleCancel = (id) => {
    setLocalAppointments(prev => prev.filter(app => app.id !== id));
    success('Appointment cancelled successfully.');
  };

  const getStatusBadge = (status) => {
    const style = {
      'Completed': { bg: 'var(--success-bg)', text: 'var(--success-text)' },
      'In Progress': { bg: 'var(--brand-50)', text: 'var(--brand-500)' },
      'Confirmed': { bg: 'var(--brand-50)', text: 'var(--brand-500)' },
      'Rescheduled': { bg: 'var(--warning-bg)', text: 'var(--warning-text)' },
      'Upcoming': { bg: 'var(--brand-50)', text: 'var(--brand-500)' },
    }[status] || { bg: 'var(--brand-50)', text: 'var(--brand-500)' };

    return <span className="badge" style={{ background: style.bg, color: style.text }}>{status}</span>;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header Section */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800 }}>Receptionist Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Riya. You have {localAppointments.length} appointments today.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/receptionist/book')}>
          <Calendar size={18} />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[
          { icon: <Calendar size={24} />, label: 'Total Appointments', value: localAppointments.length, color: 'var(--brand-500)' },
          { icon: <Users size={24} />, label: 'Total Patients', value: patients.length, color: 'var(--brand-500)' },
          { icon: <Clock size={24} />, label: 'Remaining Slots', value: '12', color: 'var(--warning)' },
          { icon: <CheckCircle2 size={24} />, label: 'Completed', value: '8', color: 'var(--success)' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            className="card stat-card"
            whileHover={{ scale: 1.03 }}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-50)', color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value" style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 700 }}>Upcoming Appointments</h3>
          <div className="pill-toggle">
            <span className="pill-item active">List View</span>
            <span className="pill-item" onClick={() => navigate('/receptionist/appointments')}>Calendar</span>
          </div>
        </div>
        
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Time</th>
                <th>Service Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {localAppointments.map(app => (
                  <motion.tr 
                    key={app.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-50)', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
                          {app.patientName.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{app.patientName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{app.patientId}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{app.time}</td>
                    <td>{app.type}</td>
                    <td>{getStatusBadge(app.status)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-ghost" title="Phone"><Phone size={16} /></button>
                        <button className="btn-ghost" title="Edit"><Edit3 size={16} /></button>
                        <button 
                          className="btn-ghost" 
                          style={{ color: 'var(--danger)' }} 
                          onClick={() => handleCancel(app.id)}
                          title="Cancel"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {localAppointments.length === 0 && (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--brand-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Calendar size={32} />
              </div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No appointments scheduled.</h4>
              <button className="btn btn-ghost" onClick={() => navigate('/receptionist/book')}>
                <span>Book one now</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReceptionistDashboard;
