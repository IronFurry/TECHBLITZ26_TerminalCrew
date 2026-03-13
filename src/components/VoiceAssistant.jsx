import { Mic, X, Volume2, Play, Square, MessageSquare } from 'lucide-react';

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [ttsText, setTtsText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Speech Recognition Setup
  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition 
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)() 
    : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const resultTranscript = event.results[current][0].transcript;
      setTranscript(resultTranscript);
    };
    recognition.onend = () => setIsListening(false);
  }

  const toggleListening = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSpeak = () => {
    if (!ttsText) return;
    
    // Stop any current speaking
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, var(--brand-500), var(--brand-600))',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 16px rgba(26, 107, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isOpen ? <X size={28} /> : <Mic size={28} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            style={{
              position: 'absolute',
              bottom: '80px',
              right: 0,
              width: '320px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isListening ? 'var(--success)' : (isSpeaking ? 'var(--brand-500)' : 'var(--border)') }} />
                <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.01em' }}>clinicOS Voice</span>
              </div>
            </div>
            
            {/* Listening Section */}
            <div style={{ background: 'var(--background)', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
              <motion.button
                animate={isListening ? { scale: [1, 1.1, 1], boxShadow: ['0 0 0px var(--brand-500)', '0 0 20px var(--brand-500)', '0 0 0px var(--brand-500)'] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={toggleListening}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: isListening ? 'var(--brand-500)' : 'var(--surface)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isListening ? 'white' : 'var(--brand-500)',
                  margin: '0 auto 1rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {isListening ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
              </motion.button>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {isListening ? "Listening to you..." : "Click to start recording"}
              </p>
              {transcript && (
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontStyle: 'italic', background: 'var(--surface)', padding: '0.75rem', borderRadius: '12px', marginTop: '0.5rem', minHeight: '40px' }}>
                  "{transcript}"
                </div>
              )}
            </div>

            {/* TTS Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                <MessageSquare size={14} />
                <span>TEXT TO SPEECH</span>
              </div>
              <div style={{ position: 'relative' }}>
                <textarea
                  placeholder="Type something for me to say..."
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '1rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    background: 'var(--background)',
                    fontSize: '0.875rem',
                    resize: 'none',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'var(--transition)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--brand-500)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
                <button
                  onClick={isSpeaking ? stopSpeaking : handleSpeak}
                  disabled={!ttsText && !isSpeaking}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: isSpeaking ? 'var(--danger)' : 'var(--brand-500)',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    opacity: (!ttsText && !isSpeaking) ? 0.5 : 1
                  }}
                >
                  {isSpeaking ? <Square size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .layout-root + div[style*="bottom: 2rem"] {
            bottom: calc(64px + 1.5rem + env(safe-area-inset-bottom)) !important;
            right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceAssistant;
