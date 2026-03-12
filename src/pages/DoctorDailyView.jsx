import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Stethoscope } from 'lucide-react';
import './Dashboard.css';

const DoctorDailyView = ({ view = 'schedule' }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{view === 'patients' ? 'My Patients' : 'Daily Schedule'}</h1>
        <p>Dr. Smith — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="content-section">
        <h2>{view === 'patients' ? 'Patient Directory' : 'Upcoming Appointments'}</h2>
        
        {/* Empty State */}
        <motion.div 
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="empty-icon-wrapper">
            {view === 'patients' ? <Users size={40} /> : <Calendar size={40} />}
          </div>
          <h3>{view === 'patients' ? 'No patients assigned to you yet.' : 'No appointments scheduled for today.'}</h3>
          <p className="text-secondary" style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
            Take a break or review patient files.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorDailyView;
