import React, { useState } from 'react';

// Simple helper to calculate entropy and cracking time estimation
const analyzePassword = (pw) => {
  if (!pw) return { entropy: 0, time: 'Instant', label: 'Empty', color: 'var(--text-secondary)' };
  
  let charsetSize = 0;
  if (/[a-z]/.test(pw)) charsetSize += 26;
  if (/[A-Z]/.test(pw)) charsetSize += 26;
  if (/[0-9]/.test(pw)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) charsetSize += 33;

  const entropy = Math.round(pw.length * Math.log2(charsetSize || 1));
  
  let time = 'Instant';
  let label = 'Extremely Weak';
  let color = 'var(--accent-red)';

  if (entropy > 75) {
    time = '800 Trillion Years';
    label = 'Military Grade (Secure)';
    color = 'var(--accent-green)';
  } else if (entropy > 55) {
    time = '850 Years';
    label = 'Strong';
    color = 'var(--accent-green)';
  } else if (entropy > 35) {
    time = '3.5 Days';
    label = 'Moderate';
    color = 'var(--accent-orange)';
  } else if (entropy > 20) {
    time = '2.4 Minutes';
    label = 'Weak';
    color = 'var(--accent-red)';
  }

  return { entropy, time, label, color };
};

// Simple mock hash function for demonstration (returns a realistic SHA-256 style string of length 64)
const mockSHA256 = (str) => {
  if (!str) return '';
  // Generate a predictable but realistic hex string based on character codes
  let hash = '';
  for (let i = 0; i < 4; i++) {
    let code = (str.charCodeAt(i % str.length) * (i + 7) * 31).toString(16);
    hash += code.padEnd(8, 'f').slice(0, 8);
  }
  let extra = 'a2b89c7d4e1f5038';
  return (hash + extra + hash).slice(0, 64);
};

export default function SecurityUpgrades() {
  const [activeSubTab, setActiveSubTab] = useState('http');

  // --- HTTP vs HTTPS State ---
  const [httpUsername, setHttpUsername] = useState('admin');
  const [httpPassword, setHttpPassword] = useState('secret123');
  const [protocolMode, setProtocolMode] = useState('http'); // http, https
  const [snifferLogs, setSnifferLogs] = useState([]);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // --- Password Strength State ---
  const [userPassword, setUserPassword] = useState('');

  // --- Database Hashing State ---
  const [dbMode, setDbMode] = useState('plaintext'); // plaintext, hashed
  const [breachLog, setBreachLog] = useState('');
  const [isBreached, setIsBreached] = useState(false);

  // --- HTTP vs HTTPS Handler ---
  const transmitCredentials = () => {
    if (isTransmitting) return;
    setIsTransmitting(true);
    setSnifferLogs([]);

    setTimeout(() => {
      if (protocolMode === 'http') {
        setSnifferLogs([
          '[+] Packet Intercepted on Port 80 (Wi-Fi broadcast)',
          '[*] Frame type: IPv4 / TCP / HTTP POST /login',
          '[*] Target Host: 192.168.1.1',
          '[!] WARNING: Encryption Layer: NONE (Cleartext traffic)',
          '[!] Intercepted POST Payload:',
          `    username: "${httpUsername}"`,
          `    password: "${httpPassword}"`,
          '[✗] Security Rating: CRITICAL EXPOSURE!'
        ]);
      } else {
        setSnifferLogs([
          '[+] Packet Intercepted on Port 443 (Wi-Fi broadcast)',
          '[*] Frame type: IPv4 / TCP / TLSv1.3 Encrypted Application Data',
          '[*] Cryptographic Tunnel: ECDHE-RSA-AES256-GCM-SHA384',
          '[✓] Encryption Layer: TLS Active',
          '[*] Intercepted POST Payload:',
          `    data: "8a93bfd301e8c9735d492bb80faa6c8f9b90c102b3c4d5e6f7a8b9c0d1e2f3... [ENCRYPTED]"`,
          '[✓] Status: Credentials protected. Raw credentials could not be decrypted.',
          '[✓] Security Rating: SECURE CONNECTION - Ok, HTTPS is much better!'
        ]);
      }
      setIsTransmitting(false);
    }, 1200);
  };

  // --- DB Breach Handler ---
  const triggerDbBreach = () => {
    setIsBreached(true);
    if (dbMode === 'plaintext') {
      setBreachLog(
        `SYSTEM FAILURE: SQL injection exploited on '/users' table.\n` +
        `LEAKED RECORD DATABASE LIST:\n` +
        `----------------------------------------\n` +
        `ID | USERNAME    | PLAIN_PASSWORD\n` +
        `----------------------------------------\n` +
        `1  | admin       | adminPass2026\n` +
        `2  | security_op | secureM0de!\n` +
        `3  | test_user   | 12345678\n` +
        `----------------------------------------\n` +
        `[✗] RESULT: All users compromised. Hacker logs into administrator panel instantly.`
      );
    } else {
      setBreachLog(
        `SYSTEM BREACH DETECTED: SQL database leaked via administrative SQLi.\n` +
        `LEAKED RECORD DATABASE LIST:\n` +
        `----------------------------------------\n` +
        `ID | USERNAME    | PASSWORD_HASH (SHA-256)\n` +
        `----------------------------------------\n` +
        `1  | admin       | ${mockSHA256('adminPass2026')}\n` +
        `2  | security_op | ${mockSHA256('secureM0de!')}\n` +
        `3  | test_user   | ${mockSHA256('12345678')}\n` +
        `----------------------------------------\n` +
        `[✓] MITIGATING STATUS: Passwords are protected via one-way hashes.\n` +
        `[✓] RESULT: Hacker cannot read raw passwords. Users are safe. Ok, hashing is much better!`
      );
    }
  };

  const resetDbBreach = () => {
    setIsBreached(false);
    setBreachLog('');
  };

  // Password analysis variables
  const { entropy, time, label, color } = analyzePassword(userPassword);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Title Header */}
      <div>
        <span className="sidebar-tag">UPGRADE SANDBOX</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>🔒 Why Better is Better</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Explore comparative simulations demonstrating why secure defaults matter. Toggle the options below to witness weak legacy systems vs. modern secure systems.
        </p>
      </div>

      {/* Internal Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveSubTab('http')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'http' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeSubTab === 'http' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          📡 HTTP VS HTTPS (SNIFFING)
        </button>
        <button
          onClick={() => setActiveSubTab('entropy')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'entropy' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeSubTab === 'entropy' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🔑 PASSWORD STRENGTH (ENTROPY)
        </button>
        <button
          onClick={() => setActiveSubTab('db')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'db' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeSubTab === 'db' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🗄️ PLAINTEXT VS HASHED DATABASE
        </button>
      </div>

      {/* Content Area */}
      <div style={{ minHeight: '380px' }}>
        {activeSubTab === 'http' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Input & Transmission Controller */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>📡 Packet Transmission Controller</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>USERNAME:</label>
                  <input
                    type="text"
                    value={httpUsername}
                    onChange={(e) => setHttpUsername(e.target.value)}
                    style={{ padding: '8px 12px', background: '#040711', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>PASSWORD:</label>
                  <input
                    type="text"
                    value={httpPassword}
                    onChange={(e) => setHttpPassword(e.target.value)}
                    style={{ padding: '8px 12px', background: '#040711', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontFamily: 'var(--font-mono)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>SELECT CHANNEL/PROTOCOL:</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setProtocolMode('http')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: protocolMode === 'http' ? 'rgba(255, 42, 95, 0.15)' : 'rgba(0,0,0,0.3)',
                        border: protocolMode === 'http' ? '1px solid var(--accent-red)' : '1px solid var(--border-color)',
                        borderRadius: '4px',
                        color: protocolMode === 'http' ? 'var(--accent-red)' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer'
                      }}
                    >
                      HTTP (Cleartext)
                    </button>
                    <button
                      onClick={() => setProtocolMode('https')}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: protocolMode === 'https' ? 'rgba(57, 255, 20, 0.15)' : 'rgba(0,0,0,0.3)',
                        border: protocolMode === 'https' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                        borderRadius: '4px',
                        color: protocolMode === 'https' ? 'var(--accent-green)' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer'
                      }}
                    >
                      HTTPS (Encrypted)
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={transmitCredentials}
                disabled={isTransmitting}
                className="cyber-button"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--accent-cyan)',
                  color: 'var(--bg-dark)',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-mono)',
                  marginTop: 'auto'
                }}
              >
                {isTransmitting ? 'TRANSMITTING PACKETS...' : 'SEND LOGIN REQUEST'}
              </button>
            </section>

            {/* Eavesdropper Packet Log */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '340px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>🕵️ Eavesdropper's Wi-Fi Sniffer</h3>
                <span style={{ fontSize: '0.75rem', color: protocolMode === 'http' ? 'var(--accent-red)' : 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                  {protocolMode === 'http' ? '⚠️ EXPOSED' : '🟢 ENCRYPTED'}
                </span>
              </div>

              <div
                style={{
                  background: '#040711',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  flex: 1,
                  padding: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: protocolMode === 'http' ? 'var(--accent-red)' : 'var(--accent-green)',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {isTransmitting ? (
                  <span style={{ color: 'var(--accent-cyan)', animation: 'pulse 1s infinite' }}>
                    [~] Capturing packet stream... Deriving frame headers...
                  </span>
                ) : snifferLogs.length === 0 ? (
                  <span style={{ color: 'var(--text-secondary)', opacity: 0.5, fontStyle: 'italic' }}>
                    Awaiting packet transmission. Press "SEND LOGIN REQUEST" to trigger capture.
                  </span>
                ) : (
                  snifferLogs.map((log, idx) => (
                    <div key={idx} style={{ color: log.startsWith('[!]') || log.startsWith('    ') ? undefined : (log.startsWith('[✗]') ? 'var(--accent-red)' : (log.startsWith('[✓]') ? 'var(--accent-green)' : 'var(--text-primary)')) }}>
                      {log}
                    </div>
                  ))
                )}
              </div>

              {snifferLogs.length > 0 && !isTransmitting && (
                <div 
                  className="glass-panel" 
                  style={{ 
                    padding: '12px', 
                    background: protocolMode === 'http' ? 'rgba(255, 42, 95, 0.04)' : 'rgba(57, 255, 20, 0.04)',
                    borderColor: protocolMode === 'http' ? 'rgba(255, 42, 95, 0.3)' : 'rgba(57, 255, 20, 0.3)'
                  }}
                >
                  <p style={{ fontSize: '0.8rem', color: protocolMode === 'http' ? 'var(--accent-red)' : 'var(--accent-green)', lineHeight: '1.4' }}>
                    {protocolMode === 'http'
                      ? '❌ HTTP transfers data in plaintext. Anyone listening on the local wireless hotspot captures your credentials immediately.'
                      : '✅ HTTPS wraps traffic in TLS. Even if packets are captured, they are mathematically unreadable. Ok, HTTPS is much better!'}
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        {activeSubTab === 'entropy' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Password input & entropy visualizer */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>🔑 Password Entropy Meter</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                Entropy measures the randomness of a password. Type a password below to see how long a high-speed GPU cluster would take to crack it.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>TEST PASSWORD INPUT:</label>
                <input
                  type="text"
                  placeholder="Type a password..."
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  style={{
                    padding: '12px',
                    background: '#040711',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Strength Indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>CRACK TIME:</span>
                  <strong style={{ color, fontFamily: 'var(--font-mono)' }}>{time}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>ENTROPY VALUE:</span>
                  <strong style={{ color, fontFamily: 'var(--font-mono)' }}>{entropy} BITS</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>LEVEL:</span>
                  <strong style={{ color, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{label}</strong>
                </div>
              </div>
            </section>

            {/* Educational insight */}
            <section className="glass-panel" style={{ flex: '1 1 300px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>📈 Why Length and Charsets Matter</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Brute force tools calculate every possible combination. Adding length and mixed characters multiplies key space exponentially.
              </p>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                  <span>"password"</span>
                  <span style={{ color: 'var(--accent-red)' }}>Crack: &lt;1 ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <span>"CorrectHorseBatteryStaple"</span>
                  <span style={{ color: 'var(--accent-green)' }}>Crack: Trillion Years</span>
                </div>
              </div>

              {entropy >= 55 && (
                <div style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid var(--accent-green)', padding: '10px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                  ✓ Entropy secure. Ok, a passphrase is much better!
                </div>
              )}
            </section>
          </div>
        )}

        {activeSubTab === 'db' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Database storage preview */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>🗄️ User Credentials Database</h3>
                <span style={{ fontSize: '0.75rem', color: dbMode === 'plaintext' ? 'var(--accent-red)' : 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                  {dbMode === 'plaintext' ? '● UNSECURED DB' : '🟢 CRYPTO ACTIVE'}
                </span>
              </div>

              {/* Toggle Database Mode */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => { setDbMode('plaintext'); resetDbBreach(); }}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: dbMode === 'plaintext' ? 'rgba(255, 42, 95, 0.15)' : 'rgba(0,0,0,0.3)',
                    border: dbMode === 'plaintext' ? '1px solid var(--accent-red)' : '1px solid var(--border-color)',
                    borderRadius: '4px',
                    color: dbMode === 'plaintext' ? 'var(--accent-red)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  Plaintext Storage
                </button>
                <button
                  onClick={() => { setDbMode('hashed'); resetDbBreach(); }}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: dbMode === 'hashed' ? 'rgba(57, 255, 20, 0.15)' : 'rgba(0,0,0,0.3)',
                    border: dbMode === 'hashed' ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                    borderRadius: '4px',
                    color: dbMode === 'hashed' ? 'var(--accent-green)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}
                >
                  Salted Hashed (SHA-256)
                </button>
              </div>

              {/* Render DB Table mockup */}
              <div style={{ background: '#040711', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '10px' }}>ID</th>
                      <th style={{ padding: '10px' }}>USER</th>
                      <th style={{ padding: '10px' }}>PASSWORD KEY</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '10px' }}>1</td>
                      <td style={{ padding: '10px', color: '#fff' }}>admin</td>
                      <td style={{ padding: '10px', color: dbMode === 'plaintext' ? 'var(--accent-red)' : 'var(--accent-green)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '150px' }}>
                        {dbMode === 'plaintext' ? 'adminPass2026' : mockSHA256('adminPass2026')}
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '10px' }}>2</td>
                      <td style={{ padding: '10px', color: '#fff' }}>security_op</td>
                      <td style={{ padding: '10px', color: dbMode === 'plaintext' ? 'var(--accent-red)' : 'var(--accent-green)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '150px' }}>
                        {dbMode === 'plaintext' ? 'secureM0de!' : mockSHA256('secureM0de!')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                onClick={triggerDbBreach}
                className="cyber-button"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderColor: 'var(--accent-red)',
                  color: 'var(--accent-red)',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                💥 SIMULATE SQL INJECTION LEAK
              </button>
            </section>

            {/* SQLi Leak output */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '340px' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>📈 Exfiltrated Breach Logs</h3>

              <div
                style={{
                  background: '#040711',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  flex: 1,
                  padding: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: isBreached ? (dbMode === 'plaintext' ? 'var(--accent-red)' : 'var(--accent-green)') : 'var(--text-secondary)',
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {isBreached ? breachLog : (
                  <span style={{ opacity: 0.5, fontStyle: 'italic' }}>
                    Database safe. Trigger SQL injection simulation to analyze credentials recovery.
                  </span>
                )}
              </div>

              {isBreached && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={resetDbBreach}
                    className="cyber-button"
                    style={{ padding: '8px 16px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}
                  >
                    RESET SECURITY SHIELD
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
