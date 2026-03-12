import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Bell, Search, User, LogOut } from 'lucide-react';
import { patients } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(() => document.documentElement.getAttribute('data-theme') === 'dark');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim().length > 1) {
      const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search));
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [search]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  };

  return (
    <nav className="navbar" style={{
      height: 'var(--navbar-height)',
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.5rem',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(8px)'
    }}>
      <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div className="search-container" style={{ position: 'relative', width: '320px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            className="input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-card)',
                  marginTop: '8px',
                  boxShadow: 'var(--shadow-md)',
                  overflow: 'hidden'
                }}
              >
                {results.map(p => (
                  <div
                    key={p.id}
                    onClick={() => { navigate(`/patient/${p.id}`); setSearch(''); }}
                    style={{ padding: '0.75rem 1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border)' }}
                    className="search-result-item"
                  >
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID: {p.id}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggleTheme} className="btn-ghost" style={{ padding: '0.5rem' }}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="btn-ghost" style={{ padding: '0.5rem', position: 'relative' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.75rem', borderLeft: '1px solid var(--border)' }}>
          <div style={{ width: '36px', height: '36px', background: 'var(--brand-500)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            {user?.initials}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user?.role}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
