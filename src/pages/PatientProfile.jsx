import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, FileText, ClipboardList, CheckCircle2 } from 'lucide-react';
import { patients } from '../lib/mockData';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Upcoming');
  
  const patient = patients.find(p => p.id === id) || patients[0];

  const tabs = ['Upcoming', 'History', 'Notes'];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem', paddingLeft: 0 }}>
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Profile Header Card */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--brand-50)', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 800 }}>
          {patient.name.split(' ').map(n=>n[0]).join('')}
        </div>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{patient.name}</h1>
            <span className="badge" style={{ background: 'var(--success-bg)', color: 'var(--success-text)' }}>Active Patient</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> <span>{patient.age} Yrs, Male</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> <span>{patient.phone}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> <span>DOB: {patient.dob}</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary">Edit Profile</button>
          <button className="btn btn-primary" onClick={() => navigate('/receptionist/book')}>Book Appointment</button>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: '0 1.5rem', display: 'flex', gap: '2rem' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1.25rem 0',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: activeTab === tab ? 'var(--brand-500)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab ? '2px solid var(--brand-500)' : '2px solid transparent',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ padding: '2rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Upcoming' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                       <div style={{ padding: '0.75rem', background: 'var(--brand-50)', borderRadius: '12px', color: 'var(--brand-500)' }}>
                         <Calendar size={24} />
                       </div>
                       <div>
                         <div style={{ fontWeight: 700 }}>Dental Cleaning</div>
                         <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Oct 15, 2026 at 10:30 AM</div>
                       </div>
                    </div>
                    <button className="btn btn-secondary">Reschedule</button>
                  </div>
                </div>
              )}

              {activeTab === 'History' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[1, 2].map(i => (
                    <div key={i} style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-card)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>General Consultation</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>July 12, 2024</div>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Patient complained of seasonal allergies. Prescribed Cetirizine 10mg.</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Notes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea 
                    className="input" 
                    placeholder="Add a clinical note..." 
                    style={{ minHeight: '120px', resize: 'vertical' }}
                  ></textarea>
                  <button className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>Save Note</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientProfile;
