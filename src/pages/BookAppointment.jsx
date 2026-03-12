import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Check, ArrowRight, ChevronRight, Stethoscope } from 'lucide-react';
import { doctors, timeSlots, bookedSlots } from '../lib/mockData';
import { useToast } from '../contexts/ToastContext';

const BookAppointment = () => {
  const navigate = useNavigate();
  const { success } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState(1);
  const [patientName, setPatientName] = useState('');

  const handleBooking = () => {
    success(`Appointment booked for ${patientName} at ${selectedSlot}`);
    navigate('/receptionist');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Book Appointment</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Step {step} of 3: {step === 1 ? 'Select Patient & Doctor' : step === 2 ? 'Choose Time Slot' : 'Confirm Details'}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        {/* Left Side: Form/Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700 }}>Patient Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input 
                      className="input" 
                      style={{ paddingLeft: '2.5rem' }} 
                      placeholder="Enter patient name" 
                      value={patientName}
                      onChange={(e)=>setPatientName(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700 }}>Select Doctor</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {doctors.map(doc => (
                      <motion.div
                        key={doc.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedDoctor(doc)}
                        style={{
                          padding: '1rem',
                          borderRadius: 'var(--radius-card)',
                          border: selectedDoctor?.id === doc.id ? '2px solid var(--brand-500)' : '1px solid var(--border)',
                          background: selectedDoctor?.id === doc.id ? 'var(--brand-50)' : 'var(--surface)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          transition: 'var(--transition)'
                        }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand-500)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{doc.initials}</div>
                        <div style={{ fontWeight: 600 }}>{doc.name}</div>
                        {selectedDoctor?.id === doc.id && <Check size={18} style={{ marginLeft: 'auto', color: 'var(--brand-500)' }} />}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary" 
                  disabled={!patientName || !selectedDoctor}
                  onClick={() => setStep(2)}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <span>Continue to Scheduling</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                   <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--brand-50)', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{selectedDoctor?.initials}</div>
                      <span style={{ fontWeight: 700 }}>{selectedDoctor?.name}</span>
                   </div>
                   <button onClick={() => setStep(1)} className="btn-ghost" style={{ fontSize: '0.75rem' }}>Change</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                  {timeSlots.map(slot => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;
                    return (
                      <motion.button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                        animate={{ scale: isSelected ? 1.05 : 1 }}
                        whileHover={!isBooked ? { scale: 1.05 } : {}}
                        whileTap={!isBooked ? { scale: 0.95 } : {}}
                        style={{
                          padding: '0.75rem 0.5rem',
                          borderRadius: 'var(--radius-input)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          border: isSelected ? '2px solid var(--brand-500)' : '1px solid var(--border)',
                          background: isSelected ? 'var(--brand-500)' : isBooked ? 'var(--background)' : 'var(--surface)',
                          color: isSelected ? 'white' : isBooked ? 'var(--text-secondary)' : 'var(--text-primary)',
                          cursor: isBooked ? 'not-allowed' : 'pointer',
                          opacity: isBooked ? 0.5 : 1,
                          transition: 'var(--transition)'
                        }}
                      >
                        {slot}
                      </motion.button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>Back</button>
                  <button className="btn btn-primary" disabled={!selectedSlot} onClick={() => setStep(3)} style={{ flex: 1 }}>Confirm Appointment</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{ textAlign: 'center', padding: '3rem' }}
              >
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Check size={32} strokeWidth={3} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Review Booking</h2>
                <div style={{ background: 'var(--background)', borderRadius: 'var(--radius-card)', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Patient</span>
                     <span style={{ fontWeight: 700 }}>{patientName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Doctor</span>
                     <span style={{ fontWeight: 700 }}>{selectedDoctor?.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Date</span>
                     <span style={{ fontWeight: 700 }}>Oct 12, 2026</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Time</span>
                     <span style={{ fontWeight: 700 }}>{selectedSlot}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>Change Time</button>
                  <button className="btn btn-primary" onClick={handleBooking} style={{ flex: 2 }}>Confirm and Schedule</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Info / Summary */}
        <div className="hidden-mobile">
          <div className="card" style={{ position: 'sticky', top: '2rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--brand-50)', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Appointment Type</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Routine Consultation</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: selectedDoctor ? 1 : 0.4 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--brand-50)', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stethoscope size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Assigned Doctor</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{selectedDoctor?.name || 'Not selected'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', opacity: selectedSlot ? 1 : 0.4 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--brand-50)', color: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Scheduled Time</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{selectedSlot || 'Select a slot'}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', background: 'var(--brand-50)', padding: '1.25rem', borderRadius: 'var(--radius-card)', border: '1px dashed var(--brand-500)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--brand-500)', fontWeight: 600, lineHeight: 1.6 }}>
                Patients will receive an automated SMS reminder 24 hours before their scheduled appointment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1.2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          .hidden-mobile { display: none; }
        }
      `}</style>
    </motion.div>
  );
};

export default BookAppointment;
