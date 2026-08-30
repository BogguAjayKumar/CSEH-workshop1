import React, { useState } from 'react';

export default function WifiLab({ onCompleteFlag }) {
  const [labStep, setLabStep] = useState(1); // 1: Scan, 2: Deauth & Sniff, 3: Crack
  const [targetSelected, setTargetSelected] = useState(false);
  
  // Deauth state
  const [deauthRunning, setDeauthRunning] = useState(false);
  const [deauthStatus, setDeauthStatus] = useState("Passive sniffing... Waiting for handshake.");
  const [clientConnected, setClientConnected] = useState(true);
  const [handshakeCaptured, setHandshakeCaptured] = useState(false);

  // Cracking state
  const [cracking, setCracking] = useState(false);
  const [crackConsole, setCrackConsole] = useState([]);
  const [keyFound, setKeyFound] = useState(false);

  const startDeauthAttack = () => {
    setDeauthRunning(true);
    setDeauthStatus("Injecting 15 Deauth frames to client EC:08:6B:1B:F8:A1...");
    setClientConnected(false);

    setTimeout(() => {
      setDeauthStatus("Client disconnected. Listening for EAPOL packets on reconnect...");
    }, 1500);

    setTimeout(() => {
      setClientConnected(true);
      setDeauthStatus("Client reassociated! Capturing EAPOL frames...");
    }, 3000);

    setTimeout(() => {
      setDeauthStatus("✅ Handshake Captured: BSSID 9C:5C:8E:F1:D3:C8 | EAPOL MSG 1, 2, 3, 4 saved to handshake.cap");
      setHandshakeCaptured(true);
      setDeauthRunning(false);
    }, 4500);
  };

  const runCrackingAttack = () => {
    setCracking(true);
    setCrackConsole([]);
    const passwords = [
      "12345678 (testing password)",
      "password123 (testing password)",
      "qwerty (testing password)",
      "welcome1 (testing password)",
      "letmein (testing password)",
      "shadow (testing password)",
      "admin123 (testing password) -> MATCH FOUND!"
    ];

    passwords.forEach((pass, index) => {
      setTimeout(() => {
        setCrackConsole(prev => [...prev, `Testing key: ${pass.split(' ')[0]}... ${index === passwords.length - 1 ? 'OK!' : 'FAILED'}`]);
        if (index === passwords.length - 1) {
          setKeyFound(true);
          setCracking(false);
          if (onCompleteFlag) {
            onCompleteFlag('FLAG{W1F1_H4NDSHAK3_CRACK3D}');
          }
        }
      }, (index + 1) * 500);
    });
  };

  const resetLab = () => {
    setLabStep(1);
    setTargetSelected(false);
    setDeauthRunning(false);
    setDeauthStatus("Passive sniffing... Waiting for handshake.");
    setClientConnected(true);
    setHandshakeCaptured(false);
    setCracking(false);
    setCrackConsole([]);
    setKeyFound(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 8 & 9</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Controlled Wi-Fi Security Lab</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          In this simulated lab environment, you will execute a wireless password audit against a target access point. You will scan for targets, spoof deauthentication frames to force client reconnects, capture the 4-way handshake, and run a dictionary attack to decrypt the security key.
        </p>
      </div>

      {/* Lab Nav Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setLabStep(1)} 
          className={`cyber-button ${labStep === 1 ? 'active' : 'disabled'}`}
          style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
          disabled={cracking || deauthRunning}
        >
          Step 1: Scan
        </button>
        <button 
          onClick={() => { if (targetSelected) setLabStep(2); }} 
          className={`cyber-button ${labStep === 2 ? 'active' : 'disabled'}`}
          style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
          disabled={!targetSelected || cracking}
        >
          Step 2: Capture Handshake
        </button>
        <button 
          onClick={() => { if (handshakeCaptured) setLabStep(3); }} 
          className={`cyber-button ${labStep === 3 ? 'active' : 'disabled'}`}
          style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
          disabled={!handshakeCaptured || deauthRunning}
        >
          Step 3: Crack WPA Key
        </button>
      </div>

      {/* Step 1: Scan Networks */}
      {labStep === 1 && (
        <section className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '14px' }}>
            🛰️ Scan & Select Target Access Point
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            Run the <code>airodump-ng wlan0mon</code> terminal command. Select the network with the strongest signal to audit.
          </p>

          <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '16px', color: 'var(--accent-green)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>BSSID              PWR  Beacons  #Data  CH  MB   ENC   CIPHER  AUTH  ESSID</div>
            <div style={{ opacity: 0.6 }}>8E:2B:A1:04:1F:B9  -75      48      2   6  54   WPA2  CCMP    PSK   HomeNet_2G</div>
            
            {/* Clickable target */}
            <div 
              id="row-target-wifi"
              onClick={() => setTargetSelected(true)}
              style={{ 
                background: targetSelected ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                border: targetSelected ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                borderRadius: '4px',
                padding: '6px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--accent-cyan)'
              }}
            >
              <span>9C:5C:8E:F1:D3:C8  -34     240     82  11  130  WPA2  CCMP    PSK   SecureWiFi_WPA2</span>
              {targetSelected && <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>[SELECTED TARGET]</span>}
            </div>

            <div style={{ opacity: 0.6 }}>3A:C4:E9:9D:2F:5F  -82      12      0   1  54   OPN   NONE    OPN   Cafe_Guest_Wifi</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button 
              id="btn-goto-step2"
              disabled={!targetSelected} 
              onClick={() => setLabStep(2)} 
              className="cyber-button"
            >
              Configure Sniffer (Step 2) ➔
            </button>
          </div>
        </section>
      )}

      {/* Step 2: Handshake Capture */}
      {labStep === 2 && (
        <div className="grid-2">
          {/* Active Terminal Sniffer */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
            <div>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '14px' }}>
                📡 EAPOL Packet Sniffer
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                We are listening on Channel 11 for BSSID 9C:5C:8E:F1:D3:C8. Since no client has connected recently, we must send deauthentication packets to kick them off briefly, forcing a reconnect.
              </p>

              <button 
                id="btn-deauth-attack"
                disabled={deauthRunning || handshakeCaptured} 
                onClick={startDeauthAttack} 
                className="cyber-button red"
                style={{ width: '100%', marginBottom: '20px' }}
              >
                {deauthRunning ? '📡 SENDING FLOOD...' : handshakeCaptured ? '✅ HANDSHAKE CAPTURED' : '⚠️ SEND DEAUTH FLOOD'}
              </button>

              <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '16px', color: deauthRunning ? 'var(--accent-red)' : handshakeCaptured ? 'var(--accent-green)' : '#ccc', minHeight: '100px' }}>
                {deauthStatus}
              </div>
            </div>

            {handshakeCaptured && (
              <button 
                id="btn-goto-step3"
                onClick={() => setLabStep(3)} 
                className="cyber-button green"
                style={{ marginTop: '20px', alignSelf: 'flex-end' }}
              >
                Launch Dictionary Crack ➔
              </button>
            )}
          </section>

          {/* Node Interaction Graphic */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>🌐 Network Nodes Uptime</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                {/* Router Node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>📡</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>SecureWiFi_WPA2</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent-green)' }}>ACTIVE</span>
                </div>

                {/* Packet flow */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: '1.5rem', opacity: deauthRunning ? 1 : 0.1, color: 'var(--accent-red)', animation: deauthRunning ? 'pulse 0.5s infinite' : 'none' }}>⚡⚡</span>
                </div>

                {/* Client Node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '2rem', filter: clientConnected ? 'none' : 'grayscale(100%)' }}>💻</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Victim Laptop</span>
                  <span style={{ fontSize: '0.65rem', color: clientConnected ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {clientConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>
              </div>

              <div className="alert-box">
                <span className="alert-icon">💡</span>
                <div className="alert-message" style={{ color: 'var(--text-secondary)' }}>
                  <strong>How it works:</strong> In Wi-Fi environments, management frames like deauthentication are unencrypted by default in WPA2. An attacker can spoof these packets, forcing a client to disconnect and immediately reconnect, exposing the 4-Way Handshake.
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Step 3: Crack Handshake */}
      {labStep === 3 && (
        <section className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '14px' }}>
            🔑 Dictionary Attack - aircrack-ng
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            We have loaded the <code>handshake.cap</code> frame file and the wordlist <code>rockyou.txt</code>. Run the cracking software to perform a dictionary audit.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                id="btn-run-crack"
                disabled={cracking || keyFound} 
                onClick={runCrackingAttack} 
                className="cyber-button"
              >
                {cracking ? '⚙️ RUNNING WORDLIST MATCHES...' : keyFound ? '🔑 KEY RECOVERED' : '⚡ START DICTIONARY ATTACK'}
              </button>

              <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '16px', color: 'var(--accent-green)', minHeight: '160px', overflowY: 'auto' }}>
                <div>Aircrack-ng v1.7 - [Dictionary Attack]</div>
                <div>Loaded 1 handshake(s) for SSID: SecureWiFi_WPA2</div>
                <hr style={{ border: 'none', borderBottom: '1px solid rgba(0, 240, 255, 0.1)', margin: '8px 0' }} />
                {crackConsole.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
                {keyFound && (
                  <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', marginTop: '12px', background: 'rgba(57, 255, 20, 0.1)', padding: '10px', borderRadius: '4px', border: '1px solid var(--accent-green)' }}>
                    KEY FOUND! [ admin123 ]<br/>
                    FLAG CAPTURED: FLAG{'{'}W1F1_H4NDSHAK3_CRACK3D{'}'}
                  </div>
                )}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '16px', display: 'flex', flexDirection: 'column', justify: 'center' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>Security Implications</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', marginBottom: '12px' }}>
                WPA2 handshake cracking uses offline dictionary files. An attacker can process thousands of password guesses per second without the AP knowing or blocking them.
              </p>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>Defense Recommendations</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <li>🛡️ <strong>Strong Passwords:</strong> Use passwords with at least 14+ characters, combining numbers, letters, and symbols to prevent dictionary guesses.</li>
                <li>🛡️ <strong>WPA3 Transition:</strong> WPA3 replaces PSK with SAE (Simultaneous Authentication of Equals) protocol, preventing offline dictionary attacks even if weak keys are used.</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
            <button 
              id="btn-reset-wifi-lab"
              onClick={resetLab} 
              className="cyber-button orange" 
              style={{ fontSize: '0.75rem' }}
            >
              🔄 Reset Lab Simulation
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
