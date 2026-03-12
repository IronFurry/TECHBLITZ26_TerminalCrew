import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, CalendarPlus, Users, Bell, Calendar } from 'lucide-react';

const BottomTabBar = () => {
  const { user } = useAuth();

  const links = user?.role === 'receptionist' ? [
    { to: '/receptionist', icon: <LayoutDashboard size={24} /> },
    { to: '/receptionist/book', icon: <CalendarPlus size={24} /> },
    { to: '/receptionist/patients', icon: <Users size={24} /> },
    { to: '/receptionist/reminders', icon: <Bell size={24} /> },
  ] : [
    { to: '/doctor', icon: <Calendar size={24} /> },
    { to: '/doctor/patients', icon: <Users size={24} /> },
  ];

  return (
    <nav className="bottom-tab-bar">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          style={({ isActive }) => ({
            color: isActive ? 'var(--brand-500)' : 'var(--text-secondary)',
            transition: 'var(--transition)'
          })}
        >
          <motion.div whileTap={{ scale: 0.9 }}>
            {link.icon}
          </motion.div>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomTabBar;
