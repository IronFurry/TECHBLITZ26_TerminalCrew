import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, CalendarPlus, Users, Bell, Calendar, Activity, LogOut } from 'lucide-react';

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
      height: 'calc(100vh - var(--navbar-height))',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 'var(--navbar-height)',
      zIndex: 90
    }}>
      <div className="sidebar-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-input)',
              textDecoration: 'none',
              color: isActive ? 'var(--brand-500)' : 'var(--text-secondary)',
              background: isActive ? 'var(--brand-50)' : 'transparent',
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
      
      <button onClick={logout} className="btn-ghost" style={{ justifyContent: 'flex-start', marginTop: 'auto' }}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
