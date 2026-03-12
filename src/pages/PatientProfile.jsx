import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Activity, ArrowLeft } from 'lucide-react';
import './Dashboard.css';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button className="btn-secondary" onClick={() => navigate(-1)} style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: '8px' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1>Patient #{id || '101'}</h1>
          <p>Detailed view of patient records and history.</p>
        </div>
      </div>

      <div className="stats-grid">
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary)' }}><User /></div>
          <div className="stat-info">
            <h3>Age 34</h3>
            <p>DOB: Jan 12, 1992</p>
          </div>
        </motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: 'var(--success)' }}><Activity /></div>
          <div className="stat-info">
            <h3>Stable</h3>
            <p>Last checked: Today</p>
          </div>
        </motion.div>
        <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}><Calendar /></div>
          <div className="stat-info">
            <h3>5</h3>
            <p>Past Visits</p>
          </div>
        </motion.div>
      </div>

      <div className="content-section">
        <h2>Medical History</h2>
        <p style={{ color: 'var(--text-secondary)' }}>No major medical history alerts on file.</p>
        
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', border: '1px solid var(--border)', borderRadius: '12px' }}>
            <strong>Last Visit: Note from Dr. Smith</strong>
            <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>Patient reported mild headaches. Prescribed rest and hydration.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
