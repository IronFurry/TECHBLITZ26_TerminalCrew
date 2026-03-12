import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Send, CheckCircle2, Search, Filter } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { patients } from '../lib/mockData';

const RemindersPage = () => {
  const { success } = useToast();
  const [localReminders, setLocalReminders] = useState([
    { id: 1, patientName: 'Henry Klein', time: '1:00 PM', type: 'Physical Exam', status: 'Pending' },
    { id: 2, patientName: 'James Rodriguez', time: '10:30 AM', type: 'Surgery Follow-up', status: 'Pending' },
    { id: 3, patientName: 'Eleanor Bennett', time: '12:30 PM', type: 'Blood Test', status: 'Pending' },
    { id: 4, patientName: 'Sarah Mitchell', time: '9:00 AM', type: 'Check-up', status: 'Sent' },
  ]);

  const handleSend = (id) => {
    success('Reminder sent to patient successfully.');
    setLocalReminders(prev => prev.map(rem => {
      if (rem.id === id) return { ...rem, status: 'Sending...' };
      return rem;
    }));
    
    // Simulate deliberate row status update
    setTimeout(() => {
      setLocalReminders(prev => prev.map(rem => {
        if (rem.id === id) return { ...rem, status: 'Sent' };
        return rem;
      }));
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Reminders Management</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Send automated and manual SMS/Email reminders to patients.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input className="input" style={{ paddingLeft: '2.5rem' }} placeholder="Search recipient..." />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-secondary">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button className="btn btn-primary" onClick={() => { success('Automated reminders triggered for all upcoming slots.'); }}>
              <Bell size={18} />
              <span>Send All Reminders</span>
            </button>
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Appt. Time</th>
                <th>Appt. Type</th>
                <th>Reminder Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {localReminders.map((rem, i) => (
                <motion.tr 
                  key={rem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td style={{ fontWeight: 700 }}>{rem.patientName}</td>
                  <td style={{ fontWeight: 500 }}>{rem.time}</td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{rem.type}</td>
                  <td>
                    <span className="badge" style={{ 
                      background: rem.status === 'Sent' ? 'var(--success-bg)' : rem.status === 'Sending...' ? 'var(--brand-50)' : 'var(--warning-bg)', 
                      color: rem.status === 'Sent' ? 'var(--success-text)' : rem.status === 'Sending...' ? 'var(--brand-500)' : 'var(--warning-text)'
                    }}>
                      {rem.status}
                    </span>
                  </td>
                  <td>
                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      disabled={rem.status === 'Sent' || rem.status === 'Sending...'}
                      onClick={() => handleSend(rem.id)}
                      className="btn btn-secondary" 
                      style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', opacity: rem.status === 'Sent' ? 0.4 : 1 }}
                    >
                      {rem.status === 'Sent' ? (
                        <>
                          <CheckCircle2 size={14} />
                          <span>Delivered</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Send Reminder</span>
                        </>
                      )}
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default RemindersPage;
