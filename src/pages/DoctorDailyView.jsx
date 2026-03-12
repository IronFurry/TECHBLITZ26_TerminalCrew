import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, List, Plus, Clock, History, Folder, MoreVertical, Stethoscope, ChevronLeft, ChevronRight, LayoutDashboard, Users, Mail} from 'lucide-react';
import { appointments } from '../lib/mockData';

const DoctorDailyView = () => {
  const [viewMode, setViewMode] = useState('Timeline'); // Timeline or List

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1024px', margin: '0 auto' }}>
      
      {/* Dashboard Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800 }}>Appointments</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Today is Monday, October 5th</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="pill-toggle">
              <span 
                className={`pill-item ${viewMode === 'List' ? 'active' : ''}`}
                onClick={() => setViewMode('List')}
              >
                <List size={18} style={{ marginRight: '0.5rem', display: 'inline' }} />
                List
              </span>
              <span 
                className={`pill-item ${viewMode === 'Timeline' ? 'active' : ''}`}
                onClick={() => setViewMode('Timeline')}
              >
                <Clock size={18} style={{ marginRight: '0.5rem', display: 'inline' }} />
                Timeline
              </span>
            </div>
            
            <button className="btn btn-primary" style={{ boxShadow: 'var(--shadow-md)' }}>
              <Plus size={20} />
              <span>New Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* The vertical line */}
        <div style={{
          position: 'absolute',
          left: '107px',
          top: '1rem',
          bottom: 0,
          width: '1px',
          background: 'var(--border)',
          zIndex: 0
        }}></div>

        {appointments.map((app, index) => (
          <TimelineItem key={app.id} app={app} index={index} />
        ))}

        {/* Available Slot Placeholder */}
        <div style={{ position: 'relative', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          <div style={{ width: '80px', textAlign: 'right', paddingTop: '0.25rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--success)' }}>11:15 AM</span>
          </div>
          <div style={{
            position: 'relative', zIndex: 1, width: '24px', height: '24px', borderRadius: '50%', 
            background: 'var(--success-bg)', border: '4px solid var(--background)', marginTop: '0.375rem'
          }}>
            <div style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%', margin: '4px' }}></div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.01 }}
            style={{
              flex: 1, border: '2px dashed var(--success)', background: 'var(--success-bg)', 
              opacity: 0.5, padding: '1.25rem', borderRadius: 'var(--radius-card)', display: 'flex', 
              justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
            }}
          >
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--success-text)', fontWeight: 700 }}>
               <Calendar size={18} />
               <span>Available Slot</span>
             </div>
             <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--success-text)' }}>+ Schedule Appointment</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ app, index }) => {
  const isCompleted = app.status === 'Completed';
  const isInProgress = app.status === 'In Progress';

  return (
    <div style={{ position: 'relative', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      {/* Time and Duration */}
      <div style={{ width: '80px', textAlign: 'right', paddingTop: '0.25rem' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: isInProgress ? 'var(--brand-500)' : 'var(--text-primary)' }}>
          {app.time}
        </span>
        <p style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.125rem' }}>
          {app.duration}
        </p>
      </div>

      {/* Timeline Dot */}
      <div style={{
        position: 'relative', zIndex: 1, width: '24px', height: '24px', borderRadius: '50%', 
        background: isInProgress ? 'var(--brand-500)' : 'var(--border)', 
        border: '4px solid var(--background)', marginTop: '0.375rem',
        boxShadow: isInProgress ? '0 0 15px rgba(26, 106, 255, 0.4)' : 'none'
      }}>
        <div style={{ width: '8px', height: '8px', background: isInProgress ? 'white' : 'var(--text-secondary)', borderRadius: '50%', margin: '4px', opacity: isCompleted ? 0.4 : 1 }}></div>
      </div>

      {/* Appointment Card */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        style={{
          flex: 1,
          background: 'var(--surface)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-card)',
          border: isInProgress ? '1px solid var(--brand-500)' : '1px solid var(--border)',
          borderLeft: isInProgress ? '4px solid var(--brand-500)' : '1px solid var(--border)',
          boxShadow: isInProgress ? 'var(--shadow-md)' : 'var(--shadow-sm)',
          opacity: isCompleted ? 0.6 : 1
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', background: 'var(--brand-50)', color: 'var(--brand-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.125rem'
            }}>
              {app.patientName.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{app.patientName}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <Stethoscope size={14} style={{ color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{app.type}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
             <span className="badge" style={{ 
               background: isInProgress ? 'var(--brand-50)' : 'var(--surface)', 
               color: isInProgress ? 'var(--brand-500)' : 'var(--text-secondary)',
               border: isCompleted ? 'none' : '1px solid var(--border)'
             }}>
               {app.status.toUpperCase()}
             </span>
             <button className="btn-ghost" style={{ padding: '0.25rem' }}><MoreVertical size={18} /></button>
          </div>
        </div>

        {isInProgress && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <History size={14} style={{ color: 'var(--text-secondary)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Last visit: 2 weeks ago</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Folder size={14} style={{ color: 'var(--text-secondary)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Patient ID: {app.patientId}</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DoctorDailyView;
