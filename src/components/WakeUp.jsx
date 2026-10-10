import React, { useState, useEffect, useRef } from 'react';

// --- Audio Synth Setup (Outside React Component to comply with purity rules) ---
let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
};

const playSynthSound = (type) => {
  initAudio();
  const ctx = audioCtx;
  if (!ctx) return;

  // Resume context if suspended (browser security)
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  const now = ctx.currentTime;

  if (type === 'laser') {
    // Fast pitch sweep down
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'granted') {
    // Quick double high beep
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.setValueAtTime(0, now + 0.08);
    
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.1); // A5
    gain2.gain.setValueAtTime(0.1, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.start(now);
    osc.stop(now + 0.09);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.3);
  } else if (type === 'alarm') {
    // Modulating siren sound
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.linearRampToValueAtTime(660, now + 0.25);
    osc.frequency.linearRampToValueAtTime(440, now + 0.5);
    osc.frequency.linearRampToValueAtTime(660, now + 0.75);
    osc.frequency.linearRampToValueAtTime(440, now + 1.0);
    
    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.8);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
    
    osc.start(now);
    osc.stop(now + 1.0);
  } else if (type === 'ping') {
    // Soft clean decaying sine
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc.start(now);
    osc.stop(now + 0.8);
  } else if (type === 'noise') {
    // Simulated computer crash/fuzz explosion using random noise
    // Create a buffer of white noise
    const bufferSize = ctx.sampleRate * 0.4; // 400ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Filter the noise for a retro rumble sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.4);
    
    noiseSource.connect(filter);
    filter.connect(gainNode);
    
    gainNode.gain.setValueAtTime(0.25, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    noiseSource.start(now);
    noiseSource.stop(now + 0.4);
  }
};

export default function WakeUp() {
  const [activeSubTab, setActiveSubTab] = useState('defrag');

  // --- Defrag (Breathing Guide) State ---
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [breathTimer, setBreathTimer] = useState(4);
  const [defragCycles, setDefragCycles] = useState(0);

  // --- Reflex Calibration Game State ---
  const [gameActive, setGameActive] = useState(false);
  const [targetIndex, setTargetIndex] = useState(-1);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimeLeft, setGameTimeLeft] = useState(15);
  const gameIntervalRef = useRef(null);
  const gameTimerRef = useRef(null);

  // --- Defrag (Breathing Guide) Logic ---
  useEffect(() => {
    if (activeSubTab !== 'defrag') return;

    const timer = setInterval(() => {
      setBreathTimer(prev => {
        if (prev <= 1) {
          // Switch phase
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 4;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 4;
          } else {
            setBreathPhase('Inhale');
            setDefragCycles(c => c + 1);
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathPhase, activeSubTab]);

  // --- Reflex game logic ---
  const startReflexGame = () => {
    setGameActive(true);
    setGameScore(0);
    setGameTimeLeft(15);
    spawnNewTarget();

    // Game countdown timer
    gameTimerRef.current = setInterval(() => {
      setGameTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(gameTimerRef.current);
          clearInterval(gameIntervalRef.current);
          setGameActive(false);
          setTargetIndex(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-move target if user takes too long
    gameIntervalRef.current = setInterval(() => {
      spawnNewTarget();
    }, 900);
  };

  const spawnNewTarget = () => {
    setTargetIndex(prev => {
      let nextIdx = Math.floor(Math.random() * 16);
      while (nextIdx === prev) {
        nextIdx = Math.floor(Math.random() * 16);
      }
      return nextIdx;
    });
  };

  const handleCellClick = (idx) => {
    if (!gameActive) return;
    if (idx === targetIndex) {
      setGameScore(s => s + 1);
      initAudio();
      const ctx = audioCtx;
      if (ctx) {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.frequency.setValueAtTime(600 + gameScore * 20, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
      spawnNewTarget();
      // Reset the auto-move interval since we just clicked it
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = setInterval(() => {
        spawnNewTarget();
      }, 900);
    }
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(gameTimerRef.current);
      clearInterval(gameIntervalRef.current);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Page Header */}
      <div>
        <span className="sidebar-tag">SYS-ADMIN TOOL</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>⚡ System Defrag & Bio-Reboot</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Staring at log terminals can induce screen-fatigue or sleepiness. Use these calibration modules to clear your biological RAM, improve oxygen flow, and reboot your sensory nodes.
        </p>
      </div>

      {/* Internal Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveSubTab('defrag')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'defrag' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeSubTab === 'defrag' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🌀 BRAIN DEFRAG
        </button>
        <button
          onClick={() => setActiveSubTab('reflex')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'reflex' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeSubTab === 'reflex' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🎯 DDOS REFLEX TEST
        </button>
        <button
          onClick={() => setActiveSubTab('synth')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'synth' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
            borderColor: activeSubTab === 'synth' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🎹 HACKER SOUNDBOARD
        </button>
      </div>

      {/* Tab Panels */}
      <div style={{ minHeight: '380px' }}>
        {activeSubTab === 'defrag' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Breathing Animation panel */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '340px', gap: '20px' }}>
              <div 
                style={{ 
                  width: '180px', 
                  height: '180px', 
                  borderRadius: '50%', 
                  background: 'transparent',
                  border: breathPhase === 'Inhale' 
                    ? '3px solid var(--accent-cyan)' 
                    : (breathPhase === 'Hold' ? '3px solid var(--accent-orange)' : '3px solid var(--accent-green)'),
                  boxShadow: breathPhase === 'Inhale' 
                    ? 'var(--glow-cyan)' 
                    : (breathPhase === 'Hold' ? 'var(--glow-orange)' : 'var(--glow-green)'),
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transform: breathPhase === 'Inhale' 
                    ? `scale(${1 + (4 - breathTimer) * 0.12})` 
                    : (breathPhase === 'Hold' ? 'scale(1.48)' : `scale(${1.48 - (4 - breathTimer) * 0.12})`),
                  transition: 'transform 1s linear, border-color 0.4s ease, box-shadow 0.4s ease',
                }}
              >
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '1.4rem', 
                  fontWeight: 'bold',
                  color: breathPhase === 'Inhale' 
                    ? 'var(--accent-cyan)' 
                    : (breathPhase === 'Hold' ? 'var(--accent-orange)' : 'var(--accent-green)'),
                }}>
                  {breathPhase.toUpperCase()}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', opacity: 0.8, marginTop: '4px' }}>
                  {breathTimer}s
                </span>
              </div>

              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  BIOLOGICAL REBOOT CYCLES: <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{defragCycles}</span>
                </div>
              </div>
            </section>

            {/* Explanation panel */}
            <section className="glass-panel" style={{ flex: '1 1 300px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>💡 Biological RAM Defragmentation</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                When working under low-light screen illumination, breathing becomes shallow, decreasing brain oxygen levels and triggering drowsiness.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ borderLeft: '2px solid var(--accent-cyan)', paddingLeft: '10px' }}>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>1. INHALE (4s):</span> Expand chest fully to intake fresh O₂.
                </div>
                <div style={{ borderLeft: '2px solid var(--accent-orange)', paddingLeft: '10px' }}>
                  <span style={{ color: 'var(--accent-orange)', fontWeight: 'bold' }}>2. HOLD (4s):</span> Allow red blood cells to load up on oxygen.
                </div>
                <div style={{ borderLeft: '2px solid var(--accent-green)', paddingLeft: '10px' }}>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>3. EXHALE (4s):</span> Release cellular CO₂ and release physical tension.
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginTop: 'auto' }}>
                Try completing at least 4 cycles to feel an immediate energy surge!
              </p>
            </section>
          </div>
        )}

        {activeSubTab === 'reflex' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* DDoS board */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '340px' }}>
              {!gameActive && gameTimeLeft === 15 ? (
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>🎯</span>
                  <h3 style={{ fontSize: '1.1rem' }}>Neutralize Rogue Packets</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '300px', lineHeight: '1.4' }}>
                    Cyber targets will blink in the grid. Click/tap them as fast as possible before they rotate to simulate mitigating a DDoS burst.
                  </p>
                  <button
                    onClick={startReflexGame}
                    className="cyber-button"
                    style={{ padding: '10px 24px', background: 'var(--accent-cyan)', color: 'var(--bg-dark)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}
                  >
                    START CALIBRATION
                  </button>
                </div>
              ) : gameActive ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '280px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                    <span>TIMER: <strong style={{ color: 'var(--accent-red)' }}>{gameTimeLeft}s</strong></span>
                    <span>MITIGATED: <strong style={{ color: 'var(--accent-cyan)' }}>{gameScore}</strong></span>
                  </div>
                  {/* Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', width: '100%', maxWidth: '280px', height: '280px' }}>
                    {Array.from({ length: 16 }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCellClick(idx)}
                        style={{
                          background: idx === targetIndex ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.02)',
                          border: idx === targetIndex ? '2px solid #fff' : '1px solid var(--border-color)',
                          borderRadius: '6px',
                          boxShadow: idx === targetIndex ? 'var(--glow-cyan)' : 'none',
                          cursor: gameActive ? 'pointer' : 'default',
                          transition: 'background 0.08s ease, transform 0.05s active',
                          transform: idx === targetIndex ? 'scale(1.03)' : 'scale(1)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>📊</span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)' }}>Calibration Sequence Complete</h3>
                  
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', width: '250px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>PACKETS DEFLECTED</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)', margin: '4px 0', color: 'var(--accent-green)' }}>{gameScore}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      RATE: {(gameScore / 15).toFixed(1)} / SEC
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '300px', lineHeight: '1.4' }}>
                    {gameScore >= 20 
                      ? '⚡ Adrenaline Maxed. Reflex latency < 100ms. Sensory nodes fully overclocked!' 
                      : gameScore >= 10 
                      ? '🟢 Alert state: Nominal. Brain cache refreshed. You are fit for lab commands.'
                      : '⚠️ Alert state: Drowsy. System latency high. Consider running another cycle or hydrating!'}
                  </p>

                  <button
                    onClick={startReflexGame}
                    className="cyber-button"
                    style={{ padding: '10px 24px', border: '1px solid var(--accent-cyan)', background: 'transparent', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}
                  >
                    RUN DIAGNOSTIC AGAIN
                  </button>
                </div>
              )}
            </section>

            {/* Rules panel */}
            <section className="glass-panel" style={{ flex: '1 1 300px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>⚡ Adrenaline Boost Logic</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Engaging in rapid, visual-spatial response tasks resets micro-sleep patterns. Moving eyes, clicking, and focusing on random coordinates stimulates motor cortical pathways.
              </p>
              <div style={{ background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.1)', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>SYSTEM SPECS:</span>
                <ul style={{ paddingLeft: '16px', marginTop: '6px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Sample rate: 15 seconds</li>
                  <li>Click target cooldown: 900ms</li>
                  <li>Target: Neon Cyber Node</li>
                </ul>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic', marginTop: 'auto' }}>
                Warning: Do not click arbitrary coordinates. Only authentic cyber nodes deflect packet floods.
              </p>
            </section>
          </div>
        )}

        {activeSubTab === 'synth' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Soundboard grid */}
            <section className="glass-panel" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '340px' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>🎛️ Cybernetic Wave Generator</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                Hit the pads below to synthesize frequencies using browser-native oscillators. Adjust speaker volume accordingly to reboot your auditory senses.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <button
                  onClick={() => playSynthSound('laser')}
                  className="cyber-button"
                  style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🔫</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>LASER BEAM</span>
                </button>
                <button
                  onClick={() => playSynthSound('granted')}
                  className="cyber-button"
                  style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🔓</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>ACCESS GRANTED</span>
                </button>
                <button
                  onClick={() => playSynthSound('alarm')}
                  className="cyber-button"
                  style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🚨</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>SIREN ALARM</span>
                </button>
                <button
                  onClick={() => playSynthSound('ping')}
                  className="cyber-button"
                  style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🔔</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>DEFRAG PING</span>
                </button>
              </div>

              <button
                onClick={() => playSynthSound('noise')}
                className="cyber-button"
                style={{ padding: '14px', width: '100%', borderColor: 'var(--accent-red)', color: 'var(--accent-red)', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}
              >
                <span>💥</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>SIMULATED DATA BURST</span>
              </button>
            </section>

            {/* Explanation panel */}
            <section className="glass-panel" style={{ flex: '1 1 300px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>🎹 Audio Synthesis Details</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                Unlike audio samples that require network bandwidth to load, these sounds are computed mathematically in real time:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <div>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Sawtooth waves</strong> are used for the piercing sweep of lasers.
                </div>
                <div>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Sine wave harmonics</strong> are layered for pleasant status feedback.
                </div>
                <div>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Triangle modulation</strong> sweeps pitch back and forth to create sirens.
                </div>
                <div>
                  <strong style={{ color: 'var(--accent-cyan)' }}>White noise buffers</strong> generate the randomized frequencies representing static and explosions.
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
