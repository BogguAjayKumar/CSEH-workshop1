import React, { useState } from 'react';

export default function Challenge({ onCompleteFlag }) {
  const [cryptoInput, setCryptoInput] = useState('');
  const [cryptoSolved, setCryptoSolved] = useState(false);
  const [netChoice, setNetChoice] = useState(null);
  const [netSolved, setNetSolved] = useState(false);
  const [wifiChoice, setWifiChoice] = useState(null);
  const [wifiSolved, setWifiSolved] = useState(false);
  const [deauthChoice, setDeauthChoice] = useState(null);
  const [deauthSolved, setDeauthSolved] = useState(false);

  const checkCrypto = () => {
    if (cryptoInput.trim() === 'FLAG{CRYPTO_MISSION_SECURED}') {
      setCryptoSolved(true);
      if (onCompleteFlag) {
        onCompleteFlag('FLAG{CRYPTO_MISSION_SECURED}');
      }
    } else {
      alert("Incorrect key! Double check base64 decoding output.");
    }
  };

  const handleNetSelect = (option) => {
    setNetChoice(option);
    if (option === 'smb') {
      setNetSolved(true);
      if (onCompleteFlag) {
        onCompleteFlag('FLAG{SMB_PORT_EXPOSED}');
      }
    }
  };

  const handleWifiSelect = (option) => {
    setWifiChoice(option);
    if (option === 'sae') {
      setWifiSolved(true);
      if (onCompleteFlag) {
        onCompleteFlag('FLAG{SAE_HANDSHAKE_WPA3}');
      }
    }
  };

  const handleDeauthSelect = (option) => {
    setDeauthChoice(option);
    if (option === 'aireplay') {
      setDeauthSolved(true);
      if (onCompleteFlag) {
        onCompleteFlag('FLAG{DEAUTH_FRAME_INTERCEPTED}');
      }
    }
  };

  const totalCleared = (cryptoSolved ? 1 : 0) + (netSolved ? 1 : 0) + (wifiSolved ? 1 : 0) + (deauthSolved ? 1 : 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 7</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Mini Challenge / CTF Activity</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Capture The Flag (CTF) challenges test your practical cybersecurity skills. Below are four mini-objectives covering cryptography, ports, WPA3 protocols, and wireless deauthentication frames. Solve each task to extract your loot flags!
        </p>
      </div>

      {/* Stats Counter */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderColor: totalCleared === 4 ? 'var(--accent-green)' : 'var(--border-color)', boxShadow: totalCleared === 4 ? 'var(--glow-green)' : 'none' }}>
        <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🎯 Flag Collection Progress
        </h3>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: totalCleared === 4 ? 'var(--accent-green)' : 'var(--accent-cyan)' }}>
          {totalCleared} / 4 CLEARED
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Challenge 1 */}
        <section className="glass-panel" style={{ padding: '20px', borderColor: cryptoSolved ? 'var(--accent-green)' : 'var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Challenge 1: Cryptographic Decoding</h4>
            <span style={{ fontSize: '0.75rem', color: cryptoSolved ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
              {cryptoSolved ? '● CLEARED' : '○ PENDING'}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.4' }}>
            We intercepted this Base64 encoded payload: <code>RkxBR3tDUllQVE9fTTFTU0lPTl9TRUNVUkVEfQ==</code>. Decode it and enter the decrypted flag.
          </p>

          {!cryptoSolved ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                id="input-ctf-crypto"
                type="text" 
                placeholder="FLAG{...}" 
                value={cryptoInput} 
                onChange={(e) => setCryptoInput(e.target.value)}
                style={{ flex: 1, padding: '10px', background: '#0e121a', border: '1px solid #384252', borderRadius: '4px', color: '#fff', outline: 'none', fontFamily: 'var(--font-mono)' }}
              />
              <button 
                id="btn-submit-crypto"
                onClick={checkCrypto} 
                className="cyber-button"
              >
                Submit Key
              </button>
            </div>
          ) : (
            <div style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid var(--accent-green)', padding: '10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-green)' }}>
              Unlocked flag: FLAG{'{'}CRYPTO_MISSION_SECURED{'}'}
            </div>
          )}
        </section>

        {/* Challenge 2 */}
        <section className="glass-panel" style={{ padding: '20px', borderColor: netSolved ? 'var(--accent-green)' : 'var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Challenge 2: Network Port Analysis</h4>
            <span style={{ fontSize: '0.75rem', color: netSolved ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
              {netSolved ? '● CLEARED' : '○ PENDING'}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.4' }}>
            Analyze this partial Nmap port scan: <br />
            <code>PORT &nbsp; &nbsp; STATE SERVICE</code> <br />
            <code>445/tcp &nbsp;open &nbsp;microsoft-ds</code> <br />
            Which network communication protocol operates by default on Port 445?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              id="btn-choice-ssh"
              onClick={() => handleNetSelect('ssh')} 
              className={`option-button ${netChoice === 'ssh' ? 'incorrect' : ''} ${netSolved && netChoice !== 'ssh' ? 'disabled' : ''}`}
            >
              A) SSH (Secure Shell)
            </button>
            <button 
              id="btn-choice-smb"
              onClick={() => handleNetSelect('smb')} 
              className={`option-button ${netChoice === 'smb' ? 'correct' : ''} ${netSolved && netChoice !== 'smb' ? 'disabled' : ''}`}
            >
              B) SMB (Server Message Block)
            </button>
            <button 
              id="btn-choice-dns"
              onClick={() => handleNetSelect('dns')} 
              className={`option-button ${netChoice === 'dns' ? 'incorrect' : ''} ${netSolved && netChoice !== 'dns' ? 'disabled' : ''}`}
            >
              C) DNS (Domain Name System)
            </button>
          </div>

          {netSolved && (
            <div style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid var(--accent-green)', padding: '10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-green)', marginTop: '12px' }}>
              Unlocked flag: FLAG{'{'}SMB_PORT_EXPOSED{'}'}
            </div>
          )}
        </section>

        {/* Challenge 3 */}
        <section className="glass-panel" style={{ padding: '20px', borderColor: wifiSolved ? 'var(--accent-green)' : 'var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Challenge 3: Wi-Fi Protocol Security</h4>
            <span style={{ fontSize: '0.75rem', color: wifiSolved ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
              {wifiSolved ? '● CLEARED' : '○ PENDING'}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.4' }}>
            Which key exchange protocol is introduced in WPA3 to replace the WPA2 Pre-Shared Key (PSK) 4-way handshake, making it immune to offline dictionary attacks?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              id="btn-choice-wep"
              onClick={() => handleWifiSelect('wep')} 
              className={`option-button ${wifiChoice === 'wep' ? 'incorrect' : ''} ${wifiSolved && wifiChoice !== 'wep' ? 'disabled' : ''}`}
            >
              A) WEP Wired Equivalent Privacy
            </button>
            <button 
              id="btn-choice-tkip"
              onClick={() => handleWifiSelect('tkip')} 
              className={`option-button ${wifiChoice === 'tkip' ? 'incorrect' : ''} ${wifiSolved && wifiChoice !== 'tkip' ? 'disabled' : ''}`}
            >
              B) TKIP Key Rotation
            </button>
            <button 
              id="btn-choice-sae"
              onClick={() => handleWifiSelect('sae')} 
              className={`option-button ${wifiChoice === 'sae' ? 'correct' : ''} ${wifiSolved && wifiChoice !== 'sae' ? 'disabled' : ''}`}
            >
              C) SAE (Simultaneous Authentication of Equals)
            </button>
          </div>

          {wifiSolved && (
            <div style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid var(--accent-green)', padding: '10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-green)', marginTop: '12px' }}>
              Unlocked flag: FLAG{'{'}SAE_HANDSHAKE_WPA3{'}'}
            </div>
          )}
        </section>

        {/* Challenge 4: Wireless Frame Injection & Deauth */}
        <section className="glass-panel" style={{ padding: '20px', borderColor: deauthSolved ? 'var(--accent-green)' : 'var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>Challenge 4: Airmon-ng & Deauthentication Frame Injection</h4>
            <span style={{ fontSize: '0.75rem', color: deauthSolved ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
              {deauthSolved ? '● CLEARED' : '○ PENDING'}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.4' }}>
            An auditor puts their Alfa network card into monitor mode using <code>airmon-ng start wlan0</code>. Which tool and flag are specifically engineered in the Aircrack-ng suite to inject 802.11 Subtype 12 Deauthentication frames to force client reconnects?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              id="btn-choice-aireplay"
              onClick={() => handleDeauthSelect('aireplay')} 
              className={`option-button ${deauthChoice === 'aireplay' ? 'correct' : ''} ${deauthSolved && deauthChoice !== 'aireplay' ? 'disabled' : ''}`}
            >
              A) aireplay-ng --deauth [count] -a [AP_BSSID] -c [CLIENT_MAC] wlan0mon
            </button>
            <button 
              id="btn-choice-ping"
              onClick={() => handleDeauthSelect('ping')} 
              className={`option-button ${deauthChoice === 'ping' ? 'incorrect' : ''} ${deauthSolved && deauthChoice !== 'ping' ? 'disabled' : ''}`}
            >
              B) ping -c 15 192.168.1.1
            </button>
            <button 
              id="btn-choice-aircrack"
              onClick={() => handleDeauthSelect('aircrack')} 
              className={`option-button ${deauthChoice === 'aircrack' ? 'incorrect' : ''} ${deauthSolved && deauthChoice !== 'aircrack' ? 'disabled' : ''}`}
            >
              C) aircrack-ng -w wordlist.txt handshake.cap
            </button>
          </div>

          {deauthSolved && (
            <div style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid var(--accent-green)', padding: '10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-green)', marginTop: '12px' }}>
              Unlocked flag: FLAG{'{'}DEAUTH_FRAME_INTERCEPTED{'}'}
            </div>
          )}
        </section>

        {/* Victory Screen */}
        {totalCleared === 4 && (
          <section className="glass-panel" style={{ padding: '30px', textAlign: 'center', borderColor: 'var(--accent-green)', boxShadow: 'var(--glow-green)' }}>
            <span style={{ fontSize: '3.5rem' }}>🏆</span>
            <h2 className="text-green-glow" style={{ margin: '16px 0 8px 0', fontSize: '1.6rem' }}>
              CTF COMPLETED SUCCESSFULLY (4/4)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
              Excellent job! You successfully decrypted Base64 ciphers, analyzed exposed SMB ports, identified WPA3 SAE key exchange, and mastered 802.11 deauthentication frame injection!
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
