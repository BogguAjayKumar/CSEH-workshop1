import React, { useState, useEffect, useRef } from 'react';
import WakeUp from './WakeUp';

// Hardcoded cybersecurity hacking script for Terminal Typer
const HACKER_SCRIPT = `
[~] Initializing airmon-ng on wlan0...
[+] Monitor Mode enabled on wlan0mon
[~] Sniffing wireless airspace for target BSSID: 00:0F:CC:7A:B2:11...
[+] Found target AP "CSEH_Secure_WiFi" on Channel 6
[~] Launching deauthentication attack to capture 4-Way Handshake...
aireplay-ng --deauth 15 -a 00:0F:CC:7A:B2:11 -c 24:FD:0D:3C:99:A2 wlan0mon
[+] Handshake captured! WPA2 key handshake saved to handshake.cap
[~] Initializing brute-force attack module...
aircrack-ng -w /usr/share/wordlists/rockyou.txt -b 00:0F:CC:7A:B2:11 handshake.cap
[!] Testing keys... 5,000 keys/sec
[!] Testing keys... 12,000 keys/sec
[+] Passphrase found: "cybersecurity101"
[~] Authenticating against WPA2-PSK Access Point...
[+] Connected! Assigning IP address via DHCP...
[+] Local IP Address: 192.168.1.144
[~] Starting port scan on router gateway: nmap -sS -sV -F 192.168.1.1
[*] Port 80/tcp  [OPEN]  Apache HTTPD 2.4.41
[*] Port 22/tcp  [OPEN]  OpenSSH 8.2p1
[*] Port 443/tcp [OPEN]  OpenSSL HTTPS
[~] Inspecting web app vulnerabilities...
[!] Warning: Port 8080 hosting development dashboard is accessible!
[~] Attempting SQL injection payload: admin' OR '1'='1...
[+] Login successful! Accessing administrator control panel...
[~] Downloading secure database backups: pg_dump -U postgres cseh_db > backup.sql
[+] Download complete. 1.2 GB metadata deflated.
[~] Installing persistence rootkit backdoor in /etc/cron.d/auth-verify...
[+] Backdoor deployed. System fully compromised!
[+] HACK COMPLETE! ACCESS SECURED.
`;

const HACKER_JOKES = [
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "To understand recursion, you must first understand recursion.",
  "Why do programmers wear glasses? Because they can't C#.",
  "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
  "Hardware: The parts of a computer system that can be kicked.",
  "Root access: Because 'please' is not a valid terminal command.",
  "An optimist says 'The glass is half-full.' A pessimist says 'The glass is half-empty.' A hacker says 'The glass has a buffer overflow vulnerability!'",
  "Why did the database administrator leave his wife? She had one-to-many relationships.",
  "How many hackers does it take to change a lightbulb? None, they just exploit a vulnerability in the socket firmware to turn it on.",
  "['hip', 'hip'] (hip hip array!)",
  "In a world without fences, who needs Gates?",
  "A programmer's wife tells him: 'Go to the store and get a loaf of bread. If they have eggs, get a dozen.' He comes back with 12 loaves of bread.",
  "Passwords are like underwear: don't let people see them, write them down, or share them with strangers.",
  "Why are computers like air conditioners? They stop working when you open Windows.",
  "There is no place like 127.0.0.1",
  "What do you call a group of 8 hobbits? A hobbyte.",
  "Why did the router go to doctor? It had a bad connection.",
  "Security warning: If you think technology can solve your security problems, then you don't understand the problems and you don't understand the technology."
];

// Helper to generate code outside the component
const generateRandomCode = () => {
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
};

export default function Arcade({ onCompleteFlag }) {
  const [activeTab, setActiveTab] = useState('typer');

  // --- Terminal Typer State ---
  const [typedText, setTypedText] = useState('');
  const [scriptIndex, setScriptIndex] = useState(0);
  const [typerProgress, setTyperProgress] = useState(0);
  const [typerAccessGranted, setTyperAccessGranted] = useState(false);
  const terminalBottomRef = useRef(null);

  // --- Codebreaker State ---
  const [secretCode, setSecretCode] = useState(generateRandomCode);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // --- Jokes State ---
  const [currentJoke, setCurrentJoke] = useState(HACKER_JOKES[0]);
  const [isRolling, setIsRolling] = useState(false);

  const resetCodebreaker = () => {
    setSecretCode(generateRandomCode());
    setGuess('');
    setAttempts([]);
    setGameOver(false);
    setGameWon(false);
  };

  // --- Terminal Typer Logic ---
  const handleTyperKeyDown = (e) => {
    e.preventDefault();
    if (typerAccessGranted) return;

    // Advance 4 characters of script for every keypress
    const charsToPrint = 4;
    const nextIndex = Math.min(scriptIndex + charsToPrint, HACKER_SCRIPT.length);
    const textSnippet = HACKER_SCRIPT.slice(0, nextIndex);
    
    setTypedText(textSnippet);
    setScriptIndex(nextIndex);

    // Calculate progress
    const progress = Math.round((nextIndex / HACKER_SCRIPT.length) * 100);
    setTyperProgress(progress);

    if (nextIndex >= HACKER_SCRIPT.length) {
      setTyperAccessGranted(true);
    }
  };

  // Autoscroll terminal
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [typedText]);

  const resetTyper = () => {
    setTypedText('');
    setScriptIndex(0);
    setTyperProgress(0);
    setTyperAccessGranted(false);
  };

  // --- Codebreaker Logic ---
  const handleCodebreakerGuess = (e) => {
    e.preventDefault();
    if (gameOver || guess.length !== 4) return;

    const currentGuess = guess;
    let hint = '';

    // Simple higher/lower or match feedback
    if (currentGuess === secretCode) {
      hint = '✓ SECURE LINK ACTIVE - SYSTEM BYPASSED';
      setGameWon(true);
      setGameOver(true);
      if (onCompleteFlag) {
        onCompleteFlag('FLAG{BRUTE_FORCE_CHAMPION}');
      }
    } else {
      const numGuess = parseInt(currentGuess);
      const numSecret = parseInt(secretCode);
      if (numGuess < numSecret) {
        hint = '▲ SIGNAL TOO LOW (Frequency Shift)';
      } else {
        hint = '▼ SIGNAL TOO HIGH (Frequency Shift)';
      }
      
      const newAttempts = [...attempts, { guess: currentGuess, hint }];
      setAttempts(newAttempts);

      if (newAttempts.length >= 6) {
        setGameOver(true);
      }
    }
    setGuess('');
  };

  // --- Hacker Fortune Logic ---
  const rollFortune = () => {
    if (isRolling) return;
    setIsRolling(true);
    let counter = 0;
    const interval = setInterval(() => {
      const tempJoke = HACKER_JOKES[Math.floor(Math.random() * HACKER_JOKES.length)];
      setCurrentJoke(tempJoke);
      counter++;
      if (counter > 8) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Title Header */}
      <div>
        <span className="sidebar-tag">ENTERTAINMENT DECK</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>🕹️ CSEH Cyber Arcade</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Take a tactical break! Play retro hacker simulators, test your logic on firewall codebreakers, or read wisdom logs to defuse workshop stress.
        </p>
      </div>

      {/* Navigation Headers */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('typer')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeTab === 'typer' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeTab === 'typer' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          💻 TERMINAL TYPER
        </button>
        <button
          onClick={() => setActiveTab('codebreaker')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeTab === 'codebreaker' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeTab === 'codebreaker' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🔑 BRUTE-FORCE DECRYPT
        </button>
        <button
          onClick={() => setActiveTab('fortunes')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeTab === 'fortunes' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeTab === 'fortunes' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          📜 HACKER JOKES
        </button>
        <button
          onClick={() => setActiveTab('wakeup')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeTab === 'wakeup' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeTab === 'wakeup' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          ⚡ BIO-DEFRAG & SOUNDS
        </button>
      </div>

      {/* Screen Panels */}
      <div style={{ minHeight: '400px' }}>
        {activeTab === 'typer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="text-cyber-glow" style={{ fontSize: '1rem' }}>📟 Simulated Intrusive Shell</h3>
                <span style={{ fontSize: '0.75rem', color: typerAccessGranted ? 'var(--accent-green)' : 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {typerAccessGranted ? '● INTEL RETRIEVED' : '○ TYPE ANYWHERE TO ATTACK'}
                </span>
              </div>

              {/* Progress bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  <span>DECRYPTING CIPHER:</span>
                  <span>{typerProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${typerProgress}%`, height: '100%', background: 'var(--accent-cyan)', transition: 'width 0.1s ease', boxShadow: 'var(--glow-cyan)' }} />
                </div>
              </div>

              {/* Hacking Terminal box */}
              <div 
                onClick={() => {
                  const input = document.getElementById('hack-typer-trigger');
                  if (input) input.focus();
                }}
                style={{ 
                  background: '#040711', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '6px', 
                  height: '280px', 
                  padding: '16px', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.85rem', 
                  color: 'var(--accent-green)', 
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  cursor: 'text',
                  position: 'relative'
                }}
              >
                {/* Hidden input to receive keystrokes on mobile/desktop */}
                <input
                  id="hack-typer-trigger"
                  type="text"
                  onKeyDown={handleTyperKeyDown}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', top: 0, left: 0 }}
                  value=""
                  onChange={() => {}}
                  autoFocus
                />
                
                {typedText || 'Click here and start typing keys on your keyboard to hack the grid...'}
                {!typerAccessGranted && typedText && <span className="cyber-cursor" style={{ background: 'var(--accent-green)', width: '8px', height: '15px', display: 'inline-block', marginLeft: '4px', animation: 'blink 0.8s infinite' }} />}
                <div ref={terminalBottomRef} />

                {typerAccessGranted && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(7, 9, 14, 0.95)',
                    border: '2px solid var(--accent-green)',
                    borderRadius: '8px',
                    boxShadow: 'var(--glow-green)',
                    padding: '24px',
                    textAlign: 'center',
                    animation: 'pulse 2s infinite'
                  }}>
                    <span style={{ fontSize: '2.5rem' }}>🔓</span>
                    <h4 style={{ color: 'var(--accent-green)', margin: '10px 0', fontFamily: 'var(--font-mono)' }}>SYSTEM EXPLOITATION COMPLETE</h4>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', maxWidth: '300px' }}>
                      All files successfully pulled. Remote root connection active. You can reset to test your speed again.
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); resetTyper(); }}
                      className="cyber-button"
                      style={{ marginTop: '16px', padding: '6px 16px', fontSize: '0.75rem', borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}
                    >
                      RESET SYSTEM
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'codebreaker' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Guess Inputs Panel */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 className="text-cyber-glow" style={{ fontSize: '1rem', marginBottom: '4px' }}>🔒 Brute-Force Port Firewall</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                  The administrative gateway is locked with a random 4-digit code. Run dictionary inputs (0000 - 9999). Find the target frequency before lockout occurs!
                </p>
              </div>

              {!gameOver ? (
                <form onSubmit={handleCodebreakerGuess} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ENTER 4-DIGIT KEYCODE:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="0000"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value.replace(/\D/g, ''))}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: '#040711',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          color: '#fff',
                          textAlign: 'center',
                          fontSize: '1.5rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '8px',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="submit"
                        disabled={guess.length !== 4}
                        className="cyber-button"
                        style={{
                          padding: '0 20px',
                          background: 'var(--accent-cyan)',
                          color: 'var(--bg-dark)',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-mono)',
                          border: 'none',
                          cursor: guess.length === 4 ? 'pointer' : 'default',
                          opacity: guess.length === 4 ? 1 : 0.5
                        }}
                      >
                        CRACK
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>
                    🚨 REMAINING DECRYPTION CYCLES: {6 - attempts.length}
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>{gameWon ? '🎉' : '💀'}</span>
                  <h4 style={{ color: gameWon ? 'var(--accent-green)' : 'var(--accent-red)', fontFamily: 'var(--font-mono)', fontSize: '1.2rem' }}>
                    {gameWon ? 'GATEWAY ACCESS GRANTED!' : 'FIREWALL LOCKOUT ACTIVATED'}
                  </h4>
                  {gameWon ? (
                    <div style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid var(--accent-green)', padding: '16px 24px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-green)', width: '100%' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>🎁 CODEBREAKER LOOT KEY:</div>
                      <div style={{ fontSize: '1.1rem', letterSpacing: '1px' }}>FLAG{'{'}BRUTE_FORCE_CHAMPION{'}'}</div>
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      Security algorithms rotated the administrative codes. The code was <strong style={{ color: '#fff' }}>{secretCode}</strong>.
                    </p>
                  )}
                  <button
                    onClick={resetCodebreaker}
                    className="cyber-button"
                    style={{ padding: '10px 24px', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}
                  >
                    RESET SECURITY CODES
                  </button>
                </div>
              )}
            </section>

            {/* Signal Logs Panel */}
            <section className="glass-panel" style={{ flex: '1 1 300px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '300px' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1rem' }}>📈 Diagnostic Cipher Logs</h3>
              <div 
                style={{ 
                  background: '#040711', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '6px', 
                  flex: 1, 
                  padding: '12px', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.8rem', 
                  color: 'var(--text-secondary)', 
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {attempts.length === 0 ? (
                  <span style={{ fontStyle: 'italic', opacity: 0.5 }}>Waiting for frequency inputs...</span>
                ) : (
                  attempts.map((attempt, idx) => (
                    <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '4px' }}>
                      <span style={{ color: 'var(--accent-cyan)' }}>[ATTEMPT {idx + 1}]</span> Guess: {attempt.guess} <br/>
                      <span style={{ color: 'var(--accent-orange)' }}>↳ FEEDBACK:</span> {attempt.hint}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'fortunes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <section className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>
              <div style={{ fontSize: '3rem' }}>📜</div>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.25rem' }}>Hacker Wisdom & Logs</h3>

              <div 
                style={{ 
                  background: '#040711', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px', 
                  padding: '24px', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '1rem', 
                  color: 'var(--accent-cyan)', 
                  maxWidth: '600px', 
                  minHeight: '120px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: 'inset 0 0 10px rgba(0,240,255,0.05)',
                  lineHeight: '1.6'
                }}
              >
                {currentJoke}
              </div>

              <button
                onClick={rollFortune}
                disabled={isRolling}
                className="cyber-button"
                style={{ 
                  padding: '12px 24px', 
                  background: 'var(--accent-cyan)', 
                  color: 'var(--bg-dark)', 
                  fontWeight: 'bold', 
                  fontFamily: 'var(--font-mono)',
                  border: 'none',
                  cursor: isRolling ? 'default' : 'pointer',
                  opacity: isRolling ? 0.7 : 1
                }}
              >
                {isRolling ? 'ACCESSING LOG DATABASE...' : 'ROLL NEW FORTUNE'}
              </button>
            </section>
          </div>
        )}

        {activeTab === 'wakeup' && (
          <WakeUp />
        )}
      </div>
    </div>
  );
}
