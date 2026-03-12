import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Activity, LogOut, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { doctors, timeSlots, bookedSlots } from '../../lib/mockData';
import { useToast } from '../../contexts/ToastContext';

const PatientBooking = () => {
  const { user, logout } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [reason, setReason] = useState('');
  const [language, setLanguage] = useState('English');

  const today = new Date().toISOString().split('T')[0];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !slot || !reason) return;
    
    success("Appointment booked! We'll send you a reminder.");
    navigate('/patient/dashboard');
  };

  const isSlotBooked = bookedSlots.includes(slot);

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

      <main style={{ padding: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <button onClick={() => navigate('/patient/dashboard')} className="btn-ghost" style={{ marginBottom: '1rem', paddingLeft: 0 }}>
          <ArrowLeft size={18} />
          <span>Back to dashboard</span>
        </button>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Book an Appointment</h1>

        <form onSubmit={handleBooking} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Patient Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 700 }}>Patient Name</label>
            <input className="input" value={user?.name} readOnly style={{ background: 'var(--background)', cursor: 'not-allowed' }} />
          </div>

          {/* Doctor Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 700 }}>Select Doctor</label>
            <select 
              className="input" 
              value={selectedDoctor} 
              onChange={(e) => setSelectedDoctor(e.target.value)}
              required
            >
              <option value="">Choose a doctor...</option>
              {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            {selectedDoctor && (
              <span style={{ fontSize: '0.75rem', color: 'var(--brand-500)', fontWeight: 600 }}>
                Speciality: {selectedDoctor === '1' ? 'General Physician' : 'Dental Surgeon'}
              </span>
            )}
          </div>

          {/* Date Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 700 }}>Appointment Date</label>
            <input 
              type="date" 
              className="input" 
              min={today} 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              required 
            />
          </div>

          {/* Time Slot Picker */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 700 }}>Preferred Time Slot</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {timeSlots.map(s => {
                const isBooked = bookedSlots.includes(s);
                const isSelected = slot === s;
                return (
                  <div
                    key={s}
                    onClick={() => setSlot(s)}
                    style={{
                      padding: '0.625rem 0.25rem',
                      borderRadius: 'var(--radius-input)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: isSelected ? '2px solid var(--brand-500)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--brand-50)' : 'var(--surface)',
                      color: isSelected ? 'var(--brand-500)' : isBooked ? 'var(--text-secondary)' : 'var(--text-primary)',
                      opacity: isBooked ? 0.6 : 1,
                      transition: 'var(--transition)'
                    }}
                  >
                    {s}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conflict Warning */}
          {slot && isSlotBooked && (
            <div style={{ 
              padding: '0.75rem', 
              background: 'var(--danger-bg)', 
              color: 'var(--danger-text)', 
              borderRadius: 'var(--radius-input)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8125rem'
            }}>
              <AlertCircle size={16} />
              <span>This slot is already booked. Please choose another one.</span>
            </div>
          )}

          {/* Reason */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 700 }}>Reason for Visit</label>
            <textarea 
              className="input" 
              rows={3} 
              placeholder="Describe your symptoms..." 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          {/* Language Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 700 }}>Preferred Communication</label>
            <div className="pill-toggle" style={{ width: '100%' }}>
              {['Hindi', 'Marathi', 'English'].map(l => (
                <div 
                  key={l}
                  className={`pill-item ${language === l ? 'active' : ''}`}
                  onClick={() => setLanguage(l)}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', height: '48px', marginTop: '1rem' }}
            disabled={!selectedDoctor || !date || !slot || !reason || isSlotBooked}
          >
            Confirm Booking
          </button>
        </form>
      </main>
    </div>
  );
};

export default PatientBooking;
