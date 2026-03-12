import React from 'react';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';
import { Send, Bell } from 'lucide-react';
import './Forms.css';

const RemindersPage = () => {
  const { success } = useToast();

  const handleSend = (id) => {
    success(`Reminder sent to patient #${id}`);
  };

  const reminders = [
    { id: 1, name: 'Alice Smith', time: '10:00 AM Today', type: 'Checkup' },
    { id: 2, name: 'Bob Johnson', time: '02:30 PM Today', type: 'Follow-up' },
    { id: 3, name: 'Charlie Davis', time: '09:00 AM Tomorrow', type: 'Consultation' },
  ];

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Reminders</h1>
        <p>Manage and send upcoming appointment reminders.</p>
      </div>

      <div className="reminders-list">
        {reminders.map((r, i) => (
          <motion.div 
            key={r.id}
            className="reminder-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="reminder-info">
              <strong>{r.name}</strong>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Bell size={14} /> {r.time} — {r.type}
              </span>
            </div>
            <button 
              className="btn-primary" 
              style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem' }}
              onClick={() => handleSend(r.id)}
            >
              <Send size={14} /> Send
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RemindersPage;
