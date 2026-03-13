import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, CalendarPlus, Users, Bell, Calendar, Activity, LogOut, Stethoscope } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const links = user?.role === 'receptionist' ? [
    { to: '/receptionist', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/receptionist/book', icon: <CalendarPlus size={20} />, label: 'Book Appointment' },
    { to: '/receptionist/patients', icon: <Users size={20} />, label: 'Patients' },
    { to: '/receptionist/reminders', icon: <Bell size={20} />, label: 'Reminders' },
  ] : [
    { to: '/doctor', icon: <Calendar size={20} />, label: 'Schedule' },
    { to: '/doctor/patients', icon: <Users size={20} />, label: 'Patients' },
  ];

  return (
    <aside className="sidebar" style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      background: 'var(--sidebar-blue)',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      zIndex: 110,
      color: 'white',
      boxShadow: '4px 0 10px rgba(0,0,0,0.05)'
    }}>
      <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', padding: '0 0.5rem' }}>
        <div style={{ background: 'white', color: 'var(--brand-500)', padding: '0.5rem', borderRadius: '12px', display: 'flex' }}>
          <Stethoscope size={24} />
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: 800, tracking: '-0.025em' }}>clinicOS</span>
      </div>

      <div className="sidebar-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1.25rem',
              borderRadius: 'var(--radius-pill)',
              textDecoration: 'none',
              color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
              background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              fontWeight: isActive ? 700 : 500,
              transition: 'var(--transition)'
            })}
          >
            <motion.div style={{ display: 'flex', alignItems: 'center' }} whileHover={{ x: 4 }}>
              {link.icon}
            </motion.div>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
      
      <button 
        onClick={logout} 
        className="btn-ghost" 
        style={{ 
          justifyContent: 'flex-start', 
          marginTop: 'auto', 
          color: 'rgba(255, 255, 255, 0.8)',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '0.75rem 1.25rem'
        }}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
