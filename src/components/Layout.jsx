import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';
import { Calendar, Users, Bell, FileText, LogOut, Moon, Sun, Search } from 'lucide-react';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  // Derive active paths for clean active state math
  const isActivePath = (path) => {
    if (path === '/receptionist' || path === '/doctor') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    success('Logged out successfully');
    navigate('/');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', !isDark ? 'dark' : 'light');
  };

  const navLinks = user?.role === 'receptionist' 
    ? [
        { path: '/receptionist', icon: <Calendar size={20} />, label: 'Dashboard' },
        { path: '/receptionist/book', icon: <FileText size={20} />, label: 'Book' },
        { path: '/receptionist/patients', icon: <Users size={20} />, label: 'Patients' },
        { path: '/receptionist/reminders', icon: <Bell size={20} />, label: 'Reminders' },
      ]
    : [
        { path: '/doctor', icon: <Calendar size={20} />, label: 'Schedule' },
        { path: '/doctor/patients', icon: <Users size={20} />, label: 'Patients' },
      ];

  return (
    <div className="layout">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>ClinicOS</h2>
          <span className="role-badge">{user?.role}</span>
        </div>
        
        <nav className="sidebar-nav">
          {navLinks.map(link => {
            const active = isActivePath(link.path);
            return (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={`nav-item ${active ? 'active' : ''}`}
                end={link.path === '/receptionist' || link.path === '/doctor'}
              >
                {active && (
                  <motion.div layoutId="nav-active" className="active-bg" />
                )}
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={toggleTheme} className="footer-btn theme-toggle">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span>Theme</span>
          </button>
          <button onClick={handleLogout} className="footer-btn logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="topbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search patients..." />
          </div>
          <div className="topbar-right">
             <button onClick={toggleTheme} className="mobile-theme-toggle">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <div className="user-avatar">{user?.email[0].toUpperCase()}</div>
          </div>
        </header>
        
        <main className="main-content">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="page-transition"
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Mobile Bottom Tab Bar */}
        <nav className="bottom-tab-bar">
          {navLinks.map(link => {
            const active = isActivePath(link.path);
            return (
              <NavLink 
                key={link.path} 
                to={link.path} 
                className={`tab-item ${active ? 'active' : ''}`}
                end={link.path === '/receptionist' || link.path === '/doctor'}
              >
                {active && (
                  <motion.div layoutId="tab-active" className="tab-active-bg" />
                )}
                <span className="tab-icon">{link.icon}</span>
              </NavLink>
            );
          })}
          <button onClick={handleLogout} className="tab-item text-danger">
            <LogOut size={20} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
