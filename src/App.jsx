import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import Rules from './components/Rules';
import KaliSetup from './components/KaliSetup';
import LinuxBasics from './components/LinuxBasics';
import WifiFundamentals from './components/WifiFundamentals';
import WifiLab from './components/WifiLab';
import Challenge from './components/Challenge';
import Wrapup from './components/Wrapup';
import MatrixBackground from './components/MatrixBackground';

export default function App() {
  const [activeTab, setActiveTab] = useState('intro');
  const [flags, setFlags] = useState([]);
  const [uptime, setUptime] = useState(0);

  // Auto-increment mock uptime timer
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleCaptureFlag = (flag) => {
    if (!flags.includes(flag)) {
      setFlags(prev => [...prev, flag]);
    }
  };

  // Map of tabs with their times and labels
  const navTabs = [
    { id: 'intro', time: '10:00 - 10:40', label: '1. Intro & Fundamentals' },
    { id: 'rules', time: '10:40 - 10:50', label: '2. RoE & Lab Rules' },
    { id: 'kalisetup', time: '10:50 - 12:15', label: '3. Kali VM Setup' },
    { id: 'linuxbasics', time: '12:30 - 1:00', label: '4. Linux & Networks' },
    { id: 'wififundamentals', time: '1:00 - 1:30', label: '5. Wi-Fi Handshake' },
    { id: 'wifilab', time: '1:30 - 2:45', label: '6. Controlled Wi-Fi Lab' },
    { id: 'challenge', time: '2:45 - 3:15', label: '7. Mini CTF Challenges' },
    { id: 'wrapup', time: '3:15 - 3:30', label: '8. Wrap-up & Careers' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return <Intro />;
      case 'rules':
        return <Rules onCompleteFlag={handleCaptureFlag} />;
      case 'kalisetup':
        return <KaliSetup />;
      case 'linuxbasics':
        return <LinuxBasics onCompleteFlag={handleCaptureFlag} />;
      case 'wififundamentals':
        return <WifiFundamentals />;
      case 'wifilab':
        return <WifiLab onCompleteFlag={handleCaptureFlag} />;
      case 'challenge':
        return <Challenge onCompleteFlag={handleCaptureFlag} />;
      case 'wrapup':
        return <Wrapup />;
      default:
        return <Intro />;
    }
  };

  return (
    <div className="main-layout">
      {/* Matrix falling code backdrop */}
      <MatrixBackground />

      {/* Scanline CRT overlay */}
      <div className="scanlines"></div>

      {/* Sidebar Command Center */}
      <aside className="sidebar">
        <div className="sidebar-title-section">
          <div className="sidebar-heading">
            <span style={{ animation: 'pulse 1.5s infinite' }}>📡</span>
            <span className="text-cyber-glow" style={{ letterSpacing: '2px' }}>CSEH WORKSHOP</span>
          </div>
          <span className="sidebar-tag">COMMAND CENTER V2.6</span>
        </div>

        {/* Live HUD statistics */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>SESSION UPTIME:</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{formatUptime(uptime)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>FW STATUS:</span>
            <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>ACTIVE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>FLAGS FOUND:</span>
            <span style={{ color: flags.length > 0 ? 'var(--accent-green)' : 'var(--text-secondary)', fontWeight: 'bold' }}>
              {flags.length} CAPTURED
            </span>
          </div>
        </div>

        {/* Navigation Sidebar list */}
        <nav style={{ flex: 1 }}>
          <ul className="nav-list">
            {navTabs.map((tab) => (
              <li key={tab.id} className="nav-item">
                <button 
                  id={`nav-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)} 
                  className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <span>{tab.label}</span>
                  <span className="nav-time">{tab.time.split(' ')[0]}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer info */}
        <div style={{ borderTop: '1px solid rgba(0, 240, 255, 0.1)', paddingTop: '12px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textAlign: 'center' }}>
          SECURE CONNECTION LINK ACTIVE
        </div>
      </aside>

      {/* Main interactive viewport */}
      <main className="content-area">
        {/* Dynamic content rendering with slide transition */}
        <div key={activeTab} className="content-fade-in">
          {renderContent()}
        </div>

        {/* Captured Flags list box */}
        {flags.length > 0 && (
          <section className="glass-panel" style={{ marginTop: '40px', padding: '20px', borderColor: 'var(--accent-green)', background: 'rgba(57,255,20,0.02)' }}>
            <h4 style={{ color: 'var(--accent-green)', fontSize: '0.9rem', marginBottom: '10px', fontFamily: 'var(--font-mono)' }}>🔑 Captured Loot & Flags ({flags.length})</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {flags.map((flag, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--accent-green)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
                  {flag}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
