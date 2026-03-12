import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Volume2 } from 'lucide-react';

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--brand-500)',
          color: 'white',
          border: 'none',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Mic size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'absolute',
              bottom: '72px',
              right: 0,
              width: '280px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-md)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Voice Assistant</span>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={18} />
              </button>
            </div>
            
            <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <motion.div
                animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: isListening ? 'var(--brand-50)' : 'var(--background)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isListening ? 'var(--brand-500)' : 'var(--text-secondary)'
                }}
              >
                {isListening ? <Volume2 size={32} /> : <Mic size={32} />}
              </motion.div>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {isListening ? "Listening..." : "How can I help you today?"}
              </p>
            </div>

            <button
              onClick={() => setIsListening(!isListening)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              {isListening ? "Stop Listening" : "Start Voice Control"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          div[style*="bottom: 2rem"] {
            bottom: calc(var(--bottom-tab-bar-height, 64px) + 1.5rem + env(safe-area-inset-bottom)) !important;
            right: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceAssistant;
