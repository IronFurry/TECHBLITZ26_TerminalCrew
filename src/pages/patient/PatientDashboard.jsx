import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { appointments } from '../../lib/mockData';
import { useToast } from '../../contexts/ToastContext';
import { 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronRight, 
  LogOut, 
  Activity, 
  ArrowRight, 
  User, 
  AlertCircle,
  LayoutDashboard,
  FileText,
  Heart,
  Settings,
  Bell,
  Plus,
  MessageCircle,
  RefreshCw,
  Eye,
  Download,
  Stethoscope
} from 'lucide-react';

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Visits', value: '24', icon: <User size={20} color="var(--brand-500)" />, bg: '#EEF4FF' },
    { label: 'Upcoming', value: '2', icon: <Calendar size={20} color="#F79009" />, bg: '#FFF9EB' },
    { label: 'Health Docs', value: '18', icon: <FileText size={20} color="#12B76A" />, bg: '#E7F7F0' },
  ];

  const records = [
    { date: 'Oct 12, 2023', type: 'Lab Result', doctor: 'Dr. Emily Chen', status: 'Lab Result' },
    { date: 'Oct 05, 2023', type: 'Prescription', doctor: 'Dr. Sarah Mitchell', status: 'Prescription' },
    { date: 'Sep 28, 2023', type: 'Visit Summary', doctor: 'Dr. Robert Fox', status: 'Visit Summary' },
  ];

  return (
    <div className="layout-root" style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex' }}>
      {/* Custom Patient Sidebar */}
      <aside className="patient-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', padding: '0 0.5rem' }}>
          <div style={{ background: 'var(--brand-500)', color: 'white', padding: '0.5rem', borderRadius: '10px', display: 'flex' }}>
            <Activity size={24} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>ClinicOS</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { label: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
            { label: 'My Appointments', icon: <Calendar size={20} /> },
            { label: 'Medical Records', icon: <FileText size={20} /> },
            { label: 'Wellness Tips', icon: <Heart size={20} /> },
          ].map((item) => (
            <div 
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1.25rem',
                borderRadius: '16px',
                cursor: 'pointer',
                background: item.active ? 'var(--brand-500)' : 'transparent',
                color: item.active ? 'white' : 'var(--text-secondary)',
                fontWeight: item.active ? 700 : 500,
                transition: 'var(--transition)'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.25rem', color: 'var(--text-secondary)', fontWeight: 500, cursor: 'pointer' }}>
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div 
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.25rem', color: 'var(--danger)', fontWeight: 500, cursor: 'pointer' }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ height: '80px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 2.5rem', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button className="btn-ghost" style={{ position: 'relative', padding: '0.5rem' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid white' }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border)' }}>
               <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{user?.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Patient ID: #{user?.patientId || '4421'}</div>
               </div>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E0EAFF', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {user?.initials}
               </div>
            </div>
          </div>
        </header>

        {/* Content Scrollable */}
        <main style={{ padding: '2.5rem', flex: 1, overflowY: 'auto' }}>
          <div className="dashboard-grid">
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Hello, {user?.name.split(' ')[0]}!</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Your next appointment is in <span style={{ color: 'var(--brand-500)', fontWeight: 700 }}>2 days</span>.</p>
              </div>

              {/* Upcoming Appointment Card */}
              <div className="upcoming-card">
                <div style={{ flex: 0.4, background: '#F1F5F9', minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                   <div style={{ width: '80%', height: '60%', background: 'var(--brand-500)', opacity: 0.1, borderRadius: '12px' }} />
                   <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                     <span className="badge" style={{ background: 'var(--brand-500)', color: 'white' }}>UPCOMING</span>
                   </div>
                </div>
                <div style={{ flex: 0.6, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-500)', letterSpacing: '0.05em' }}>UPCOMING APPOINTMENT</span>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.25rem' }}>Dr. Sarah Mitchell</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                      <Stethoscope size={16} />
                      <span>Cardiology</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                      <Calendar size={16} color="var(--brand-500)" />
                      <span>Oct 26</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                      <Clock size={16} color="var(--brand-500)" />
                      <span>10:30 AM</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary" style={{ flex: 1, height: '44px' }}>Reschedule</button>
                    <button className="btn btn-secondary" style={{ flex: 1, height: '44px' }}>Cancel</button>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {stats.map(stat => (
                  <div key={stat.label} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1.5rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{stat.label}</div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Records */}
              <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800 }}>Recent Medical Records</h3>
                  <button className="btn-ghost" style={{ color: 'var(--brand-500)', fontWeight: 700, fontSize: '0.875rem' }}>View All</button>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th style={{ background: 'transparent' }}>DATE</th>
                      <th style={{ background: 'transparent' }}>TYPE</th>
                      <th style={{ background: 'transparent' }}>DOCTOR</th>
                      <th style={{ background: 'transparent' }} className="text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map(row => (
                      <tr key={row.date}>
                        <td style={{ fontWeight: 600 }}>{row.date}</td>
                        <td>
                          <span className="badge" style={{ 
                            background: row.status === 'Lab Result' ? '#EEF4FF' : (row.status === 'Visit Summary' ? '#F5F3FF' : '#E7F7F0'),
                            color: row.status === 'Lab Result' ? 'var(--brand-500)' : (row.status === 'Visit Summary' ? '#7C3AED' : 'var(--success-text)')
                           }}>
                            {row.status}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{row.doctor}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn-ghost" style={{ padding: '0.5rem' }}><Eye size={18} color="var(--brand-500)" /></button>
                          <button className="btn-ghost" style={{ padding: '0.5rem' }}><Download size={18} color="var(--brand-500)" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="action-card">
                    <div style={{ background: '#EEF4FF', color: 'var(--brand-500)', padding: '0.75rem', borderRadius: '12px' }}><Plus size={20} /></div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Book New Appointment</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Schedule a visit</div>
                    </div>
                  </div>
                  <div className="action-card">
                    <div style={{ background: '#EEF4FF', color: 'var(--brand-500)', padding: '0.75rem', borderRadius: '12px' }}><MessageCircle size={20} /></div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Message Doctor</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Direct consultation</div>
                    </div>
                  </div>
                  <div className="action-card">
                    <div style={{ background: '#EEF4FF', color: 'var(--brand-500)', padding: '0.75rem', borderRadius: '12px' }}><RefreshCw size={20} /></div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Request Refill</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Prescription renewals</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="health-tip-card">
                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                   <Activity size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Daily Health Tip</h3>
                <p style={{ opacity: 0.9, fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Drinking 8 glasses of water a day helps your body function better and improves skin health.
                </p>
                <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', backdropFilter: 'blur(10px)' }}>
                  Read More
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
