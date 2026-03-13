import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomTabBar from './BottomTabBar';
import VoiceAssistant from './VoiceAssistant';

const Layout = () => {
  return (
    <div className="layout-root" style={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar />
        <main className="main-content" style={{
          flex: 1,
          padding: '2rem',
          background: 'var(--background)',
          minHeight: 'calc(100vh - var(--navbar-height))',
          transition: 'var(--transition)'
        }}>
          <Outlet />
        </main>
      </div>
      <BottomTabBar />
      <VoiceAssistant />

      <style>{`
        @media (max-width: 768px) {
          .layout-root {
            flex-direction: column;
          }
          .main-content {
            padding: 1rem !important;
            padding-bottom: calc(64px + 2rem + env(safe-area-inset-bottom)) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
