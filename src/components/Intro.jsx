import React, { useState } from 'react';

export default function Intro() {
  const [activeHat, setActiveHat] = useState('white');
  const [flippedCards, setFlippedCards] = useState({
    c: false,
    i: false,
    a: false
  });

  const toggleCard = (card) => {
    setFlippedCards(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  const hats = {
    white: {
      title: 'White Hat (Ethical Hacker)',
      color: 'var(--accent-green)',
      glow: 'var(--glow-green)',
      legal: 'Authorized & Legal',
      desc: 'Security specialists who use their skills for defensive purposes. They help organizations find vulnerabilities, conduct penetration tests, and secure systems with full consent and explicit written authorization.',
      examples: ['Vulnerability assessments', 'Penetration testing with contracts', 'Bug bounty hunting (VDP)', 'Securing network architectures']
    },
    grey: {
      title: 'Grey Hat (Semi-Authorized)',
      color: 'var(--accent-orange)',
      glow: 'var(--glow-orange)',
      legal: 'Ambiguous / Unauthorized (Sometimes illegal, but not malicious)',
      desc: 'Hackers who work without malicious intent but may violate laws or ethical standards. They might scan a system for bugs without permission and then report it to the owner, sometimes requesting a fee or publicizing the bug if ignored.',
      examples: ['Scanning public systems without explicit approval', 'Privately reporting bugs found unauthorized', 'Developing exploits for research but not sharing with criminals']
    },
    black: {
      title: 'Black Hat (Cybercriminal)',
      color: 'var(--accent-red)',
      glow: 'var(--glow-red)',
      legal: 'Illegal & Malicious',
      desc: 'Individuals who breach security networks with malicious intent. They steal sensitive data, deploy ransomware, sabotage digital infrastructure, or extort victims for personal financial gain, acting completely outside the law.',
      examples: ['Ransomware deployment', 'Data theft and corporate espionage', 'Distributed Denial of Service (DDoS) for extortion', 'Selling zero-days on the dark web']
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 1 & 2</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Cybersecurity & Ethical Hacking Fundamentals</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Welcome to the CSEH Workshop. Before deploying tools or writing code, every security engineer must master the foundational concepts of information security and the boundaries of ethical engagement.
        </p>
      </div>

      {/* CIA Triad Section */}
      <section className="glass-panel" style={{ padding: '24px' }}>
        <h2 className="text-cyber-glow" style={{ fontSize: '1.25rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🛡️</span> The CIA Triad
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
          The ultimate goal of security operations is to maintain the three pillars of data protection. Click the cards below to investigate how each pillar is defined and preserved.
        </p>

        <div className="cia-grid">
          {/* Confidentiality Card */}
          <div className={`cia-card ${flippedCards.c ? 'flipped' : ''}`} onClick={() => toggleCard('c')} id="card-confidentiality">
            <div className="cia-card-inner">
              <div className="cia-card-front">
                <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔒</span>
                <h3>Confidentiality</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '12px', textTransform: 'uppercase' }}>Click to decrypt</span>
              </div>
              <div className="cia-card-back">
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>Confidentiality</h4>
                <p style={{ marginBottom: '12px', fontSize: '0.85rem' }}>Ensuring that sensitive information is accessible only to authorized individuals. Prevents data leaks and eavesdropping.</p>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-green)' }}>[ENCRYPTED]:</span> 0x8F9A4D...<br/>
                  <span style={{ color: 'var(--accent-cyan)' }}>[MECHANISM]:</span> AES-256 / RSA
                </div>
              </div>
            </div>
          </div>

          {/* Integrity Card */}
          <div className={`cia-card ${flippedCards.i ? 'flipped' : ''}`} onClick={() => toggleCard('i')} id="card-integrity">
            <div className="cia-card-inner">
              <div className="cia-card-front">
                <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛡️</span>
                <h3>Integrity</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '12px', textTransform: 'uppercase' }}>Click to verify</span>
              </div>
              <div className="cia-card-back">
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>Integrity</h4>
                <p style={{ marginBottom: '12px', fontSize: '0.85rem' }}>Guaranteeing that data remains trustworthy, accurate, and unaltered by unauthorized parties during storage or transmission.</p>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-green)' }}>[SHA-256]:</span> f1e9e8c4...<br/>
                  <span style={{ color: 'var(--accent-cyan)' }}>[MECHANISM]:</span> Hashes & Signatures
                </div>
              </div>
            </div>
          </div>

          {/* Availability Card */}
          <div className={`cia-card ${flippedCards.a ? 'flipped' : ''}`} onClick={() => toggleCard('a')} id="card-availability">
            <div className="cia-card-inner">
              <div className="cia-card-front">
                <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⚡</span>
                <h3>Availability</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '12px', textTransform: 'uppercase' }}>Click to power</span>
              </div>
              <div className="cia-card-back">
                <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>Availability</h4>
                <p style={{ marginBottom: '12px', fontSize: '0.85rem' }}>Assuring that authorized users have prompt, uninterrupted access to systems, networks, and data when needed.</p>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-green)' }}>[UPTIME]:</span> 99.999% Active<br/>
                  <span style={{ color: 'var(--accent-cyan)' }}>[MECHANISM]:</span> Load Balancers / Redundancy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hacker Classification Section */}
      <section className="glass-panel" style={{ padding: '24px' }}>
        <h2 className="text-cyber-glow" style={{ fontSize: '1.25rem', marginBottom: '10px' }}>
          🕵️ Hacker Hat Classifications
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Not all hackers have the same objectives. Select the hats below to explore their legal statuses and operational motivations.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            id="btn-hat-white"
            onClick={() => setActiveHat('white')}
            className={`cyber-button green ${activeHat === 'white' ? '' : 'disabled'}`}
            style={{ flex: 1, minWidth: '120px' }}
          >
            🟢 White Hat
          </button>
          <button 
            id="btn-hat-grey"
            onClick={() => setActiveHat('grey')}
            className={`cyber-button orange ${activeHat === 'grey' ? '' : 'disabled'}`}
            style={{ flex: 1, minWidth: '120px' }}
          >
            🟡 Grey Hat
          </button>
          <button 
            id="btn-hat-black"
            onClick={() => setActiveHat('black')}
            className={`cyber-button red ${activeHat === 'black' ? '' : 'disabled'}`}
            style={{ flex: 1, minWidth: '120px' }}
          >
            🔴 Black Hat
          </button>
        </div>

        <div 
          style={{ 
            background: 'rgba(9, 13, 23, 0.6)', 
            border: `1px solid ${hats[activeHat].color}`, 
            boxShadow: hats[activeHat].glow,
            borderRadius: '8px', 
            padding: '20px',
            transition: 'all 0.3s ease'
          }}
        >
          <h3 style={{ color: hats[activeHat].color, marginBottom: '6px' }}>{hats[activeHat].title}</h3>
          <div style={{ display: 'inline-block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px', marginBottom: '16px', border: `1px solid rgba(255,255,255,0.1)` }}>
            STATUS: <span style={{ fontWeight: 'bold' }}>{hats[activeHat].legal}</span>
          </div>
          
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px', color: 'var(--text-primary)' }}>
            {hats[activeHat].desc}
          </p>

          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '10px' }}>Typical Actions</h4>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {hats[activeHat].examples.map((ex, i) => (
              <li key={i}><span style={{ color: hats[activeHat].color }}>⚡</span> {ex}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
