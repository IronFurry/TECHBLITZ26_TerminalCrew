import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const ReceptionistDashboard = ({ view = 'appointments' }) => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Appointments', value: '0', icon: <Calendar />, color: 'var(--primary)' },
    { label: 'Completed', value: '0', icon: <CheckCircle />, color: 'var(--success)' },
    { label: 'Pending', value: '0', icon: <Clock />, color: 'var(--danger)' },
    { label: 'Total Patients', value: '142', icon: <Users />, color: '#8b5cf6' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{view === 'patients' ? 'Patient Directory' : 'Overview'}</h1>
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {view !== 'patients' && (
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="stat-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="content-section">
        <h2>{view === 'patients' ? 'All Patients' : 'Today\'s Appointments'}</h2>
        
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
          <h3>{view === 'patients' ? 'No patients found.' : 'No appointments scheduled.'}</h3>
          {view !== 'patients' && (
            <button className="book-btn" onClick={() => navigate('/receptionist/book')}>
              Book one now <ArrowRight size={18} />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
