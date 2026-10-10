import React, { useState, useEffect, useRef } from 'react';

// --- Web Audio Synth for Anime Power Effects ---
let audioCtx = null;

const playAnimeSound = (type) => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const ctx = audioCtx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'rasengan') {
      // Whirring high speed energy sound
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'haki') {
      // Deep bass thunder shockwave
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'antimagic') {
      // Metallic sword clash / slice
      osc.type = 'square';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'bankai') {
      // Dramatic ethereal rise
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.8);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.start(now);
      osc.stop(now + 0.8);
    }
  } catch {
    // Ignore audio fail on strict browser security
  }
};

const ANIME_CONCEPTS = [
  {
    id: 'naruto_ddos',
    anime: 'Naruto',
    universe: 'Hidden Leaf Shinobi',
    themeColor: '#ff9d00',
    character: 'Naruto Uzumaki',
    technique: 'Shadow Clone Jutsu (Kage Bunshin no Jutsu)',
    cyberConcept: 'DDoS Attack (Distributed Denial of Service) & Botnets',
    summary: 'Naruto spawns 1,000 physical shadow clones at once. When all 1,000 clones charge a single enemy simultaneously, the defender is overwhelmed by the sheer volume of attacks and collapses.',
    cyberMapping: 'A Botnet Command & Control (C2) server orders 100,000 compromised IoT devices to flood a server with SYN or UDP packets simultaneously. The server bandwidth and CPU thread pool saturate, causing complete service outage (Denial of Service).',
    command: 'hping3 -S --flood -V -p 80 192.168.1.1 # Syn Flood Simulation',
    visualType: 'clones',
    quote: '"KAGE BUNSHIN NO JUTSU! You cannot block all 1,000 of us at once!"',
    badge: 'LAYER 7 / VOLUMETRIC FLOOD',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/S2pE_z4N1cE?autoplay=0',
    sceneTitle: 'Naruto Unleashes 1,000 Shadow Clones'
  },
  {
    id: 'onepiece_monitor',
    anime: 'One Piece',
    universe: 'Grand Line Haki Masters',
    themeColor: '#00f0ff',
    character: 'Monkey D. Luffy',
    technique: 'Kenbunshoku Haki (Observation Haki)',
    cyberConcept: 'Wi-Fi Monitor Mode (RFMON) & Passive Packet Sniffing',
    summary: 'Luffy closes his eyes and senses the spiritual aura, heartbeat, location, and emotional intent of every person across the entire island without speaking to or touching anyone.',
    cyberMapping: 'Putting your wireless card into Monitor Mode (`airmon-ng start wlan0`). The card stops checking destination MAC addresses and silently captures all raw 802.11 radio frames traversing the public airspace without ever associating or connecting to any router!',
    command: 'sudo airmon-ng start wlan0 && sudo airodump-ng wlan0mon',
    visualType: 'haki_aura',
    quote: '"I can sense your presence, your strength, and your moves before you even strike!"',
    badge: 'LAYER 1 & 2 / RF SNIFFING',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/Yp9H1_Q0xHg?autoplay=0',
    sceneTitle: 'Luffy Awakens Observation Haki Against Katakuri'
  },
  {
    id: 'onepiece_deauth',
    anime: 'One Piece',
    universe: 'Grand Line Haki Masters',
    themeColor: '#ff2a5f',
    character: 'Luffy / Shanks',
    technique: 'Haoshoku Haki (Conqueror\'s Haki Blast)',
    cyberConcept: 'Wireless Deauthentication Flood Attack (`aireplay-ng -0`)',
    summary: 'Luffy releases a massive shockwave of Conqueror\'s Haki across Fishman Island, instantly knocking 50,000 enemy fishmen unconscious without physical contact.',
    cyberMapping: 'An attacker broadcasts fake, unencrypted 802.11 Deauth frames with broadcast MAC (`-c FF:FF:FF:FF:FF:FF`). Every laptop, tablet, and phone connected to that access point drops its Wi-Fi connection in milliseconds!',
    command: 'sudo aireplay-ng --deauth 15 -a 9C:5C:8E:F1:D3:C8 -c FF:FF:FF:FF:FF:FF wlan0mon',
    visualType: 'shockwave',
    quote: '"If you can\'t even handle this pressure, step down from the battlefield!"',
    badge: '802.11 SUBTYPE 12 SPOOF',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/p18l24s_g1U?autoplay=0',
    sceneTitle: 'Conqueror\'s Haki Knocks Out 50,000 Foes'
  },
  {
    id: 'onepiece_pmf',
    anime: 'One Piece',
    universe: 'Grand Line Haki Masters',
    themeColor: '#39ff14',
    character: 'Monkey D. Luffy',
    technique: 'Busoshoku Haki (Armament Haki Hardening)',
    cyberConcept: 'WPA3 & IEEE 802.11w Protected Management Frames (PMF)',
    summary: 'Luffy coats his arms and chest in black Armament Haki. When enemy swords, bullets, and deauth strikes hit him, they shatter on contact because his surface is hardened.',
    cyberMapping: 'Under original WPA2, management frames were sent in unencrypted plaintext. IEEE 802.11w (PMF) in WPA3 cryptographically signs every management frame. When fake deauth packets arrive, the client verifies the cryptographic signature, detects the forgery, and ignores the attack!',
    command: 'wpa_cli set_network 0 ieee80211w 2 # Enforce Mandatory PMF',
    visualType: 'armor',
    quote: '"Armament: Hardening! Your unencrypted blades cannot pierce my defenses!"',
    badge: 'WPA3 / CRYPTOGRAPHIC SHIELD',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/v3_t_s16Zbg?autoplay=0',
    sceneTitle: 'Luffy Armament Hardening vs Doflamingo'
  },
  {
    id: 'naruto_ports',
    anime: 'Naruto',
    universe: 'Hidden Leaf Shinobi',
    themeColor: '#00f0ff',
    character: 'Neji Hyuga',
    technique: 'Byakugan & 361 Tenketsu (Gentle Fist 64 Palms)',
    cyberConcept: 'Nmap Port Scanning & Vulnerability Exploitation',
    summary: 'Neji activates Byakugan x-ray vision to inspect the target\'s entire chakra network, mapping all 361 Tenketsu (pressure points). He identifies the single unshielded node and strikes it with Gentle Fist, shutting down the entire body.',
    cyberMapping: 'An ethical hacker runs `nmap -sV -sC -p- <target>` to scan all 65,535 TCP/UDP ports. Once an open, unpatched port (e.g. SMB Port 445 running EternalBlue) is found, the attacker sends a targeted exploit payload that executes remote shellcode in memory.',
    command: 'nmap -sV -sC -p 21,22,80,445 192.168.1.1 # Identify open service tenketsu',
    visualType: 'byakugan',
    quote: '"BYAKUGAN! I see all your open ports. Your defenses have a single blind spot!"',
    badge: 'RECONNAISSANCE & EXPLOITATION',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/0gV_pI3X05U?autoplay=0',
    sceneTitle: 'Neji Gentle Fist 64 Palms Tenketsu Strike'
  },
  {
    id: 'naruto_spoof',
    anime: 'Naruto',
    universe: 'Hidden Leaf Shinobi',
    themeColor: '#ff9d00',
    character: 'Kakashi Hatake',
    technique: 'Substitution Jutsu (Kawarimi no Jutsu)',
    cyberConcept: 'MAC / IP Spoofing & Honeypots',
    summary: 'The enemy launches a direct lethal shuriken at the ninja. Just as the blade makes impact, *POOF!* A cloud of white smoke reveals the enemy only hit a decoy wooden log while the real ninja repositioned behind them.',
    cyberMapping: 'An auditor uses `macchanger -r wlan0` to disguise their physical hardware address, tricking access point filters. Defensively, organizations deploy Honeypots (decoy servers with fake data) that trap attackers while the real database runs undetected elsewhere.',
    command: 'sudo macchanger -r wlan0 # Replace permanent MAC with random decoy',
    visualType: 'substitution',
    quote: '"POOF! You thought you tracked my hardware MAC, but you only attacked a decoy!"',
    badge: 'DECEPTION & ANONYMIZATION',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/jZ_vVq46Moc?autoplay=0',
    sceneTitle: 'Kakashi Substitution Kawarimi Poof Trick'
  },
  {
    id: 'blackclover_antimagic',
    anime: 'Black Clover',
    universe: 'Clover Kingdom Magic Knights',
    themeColor: '#39ff14',
    character: 'Asta',
    technique: 'Demon-Slayer Sword (Anti-Magic Nullification)',
    cyberConcept: 'Stateful Packet Firewalls & `airmon-ng check kill`',
    summary: 'Enemy mages cast massive elemental fire, water, and spatial magic spells. Asta swings his colossal black Anti-Magic blade, instantly severing the mana flow and erasing the spells from existence.',
    cyberMapping: 'A Next-Generation Firewall (NGFW) or Linux iptables rule inspecting packets and dropping malicious payloads on contact. Similarly, `airmon-ng check kill` identifies background network daemons and terminates their processes so they cannot interfere with monitor mode.',
    command: 'sudo airmon-ng check kill # Sever and terminate interfering processes',
    visualType: 'antimagic_blade',
    quote: '"My magic is NEVER GIVING UP! Your malicious spells are NULLIFIED!"',
    badge: 'FIREWALL / PROCESS TERMINATION',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/XqC94bCqB8U?autoplay=0',
    sceneTitle: 'Asta Slices Through Enemy Magic Spells'
  },
  {
    id: 'bleach_bankai',
    anime: 'Bleach',
    universe: 'Soul Society Gotei 13',
    themeColor: '#9d4edd',
    character: 'Ichigo Kurosaki',
    technique: 'Bankai (Tensa Zangetsu) & Hollow Mask',
    cyberConcept: 'Privilege Escalation (Ring 3 User ➔ Ring 0 Kernel Root)',
    summary: 'Ichigo begins as a standard Soul Reaper restricted by human limits. When facing impossible barriers, he releases Bankai and dawns his Hollow mask, shattering all power ceilings to seize absolute sovereign authority.',
    cyberMapping: 'An attacker begins in User Space (Ring 3, unprivileged user `kali`). By exploiting a kernel vulnerability (e.g. Dirty COW or PwnKit), they execute shellcode inside Kernel Space (Ring 0), elevating permissions to `root` (UID 0) with total control over RAM, disks, and processes.',
    command: 'sudo -i # Or executing kernel exploit: /tmp/dirtycow -> root@kali:~#',
    visualType: 'bankai_aura',
    quote: '"BAN-KAI! TENSA ZANGETSU! Breaking through Ring 3 constraints to seize Root!"',
    badge: 'RING 0 KERNEL ESCALATION',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/oZ4PZ7N5V6M?autoplay=0',
    sceneTitle: 'Ichigo Releases Bankai Tensa Zangetsu'
  },
  {
    id: 'bleach_aizen',
    anime: 'Bleach',
    universe: 'Soul Society Gotei 13',
    themeColor: '#ff2a5f',
    character: 'Sosuke Aizen',
    technique: 'Kyoka Suigetsu (Kanzen Saimin / Complete Hypnosis)',
    cyberConcept: 'DNS Cache Poisoning, Phishing & Evil Twin Rogue APs',
    summary: 'Aizen releases Kyoka Suigetsu. Anyone who sees it is placed under permanent Complete Hypnosis. The Gotei 13 captains believe they are fighting Aizen, but they are actually attacking their own allies.',
    cyberMapping: 'An Evil Twin Rogue AP or DNS Spoofing attack. The victim types `bank.com`, but poisoned DNS records redirect them to the attacker\'s identical phishing server. The victim sees a convincing illusion and voluntarily surrenders their credentials.',
    command: 'sudo dnschef --fakeip 192.168.1.100 --fakedomains bank.com # DNS Poisoning',
    visualType: 'hypnosis',
    quote: '"Since when were you under the impression that you were connected to the real Access Point?"',
    badge: 'MAN-IN-THE-MIDDLE & PHISHING',
    videoClipUrl: 'https://www.youtube-nocookie.com/embed/GZ9e7X8fI2A?autoplay=0',
    sceneTitle: 'Aizen Shatters Reality with Kyoka Suigetsu'
  }
];

// --- Dedicated 60fps Card Video Background Animation Engine ---
function CardVideoMotion({ conceptId, themeColor, isSelected, isHovered }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = Math.random() * 1000;

    // Helper random entities for diverse jutsu motions
    const elements = [];
    const count = isSelected ? 18 : 10;
    for (let i = 0; i < count; i++) {
      elements.push({
        x: Math.random() * 320,
        y: Math.random() * 110,
        vx: (Math.random() - 0.2) * (conceptId.includes('naruto') ? 2.5 : 1.2),
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 1.5,
        alpha: Math.random() * 0.7 + 0.3,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08
      });
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      t += 0.025;

      const speedMultiplier = (isSelected || isHovered) ? 1.7 : 1.0;

      // Unique custom animated video motions per anime technique
      if (conceptId === 'naruto_ddos') {
        // Shadow Clones: Orange chakra silhouettes, bursting clone energy streaks & smoke puffs
        elements.forEach((el, idx) => {
          el.x += el.vx * speedMultiplier;
          el.y += el.vy * speedMultiplier;
          if (el.x > w + 20) el.x = -20;
          if (el.y < 0) el.y = h;
          if (el.y > h) el.y = 0;

          ctx.save();
          // Draw clone silhouette trails
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.size * (idx % 2 === 0 ? 2 : 1), 0, Math.PI * 2);
          ctx.fillStyle = idx % 3 === 0 ? '#ffb703' : '#ff9d00';
          ctx.globalAlpha = el.alpha * 0.45;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ff9d00';
          ctx.fill();

          // Smoke puff rings
          if (idx % 4 === 0) {
            ctx.beginPath();
            ctx.arc(el.x - 10, el.y, (Math.sin(t * 3 + idx) + 1) * 8 + 4, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 230, 180, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.restore();
        });
      } else if (conceptId === 'onepiece_monitor') {
        // Observation Haki: Concentric cyan radar pulse waves & glowing observation eye flares
        const centerX = w * 0.75;
        const centerY = h * 0.5;

        for (let r = 1; r <= 3; r++) {
          const radius = ((t * 22 * speedMultiplier + r * 35) % (w * 0.6));
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = Math.max(0, 0.4 - radius / (w * 0.6));
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00f0ff';
          ctx.stroke();
          ctx.restore();
        }

        // Radar line sweep
        ctx.save();
        const angle = t * 1.8 * speedMultiplier;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * 70, centerY + Math.sin(angle) * 70);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      } else if (conceptId === 'onepiece_deauth') {
        // Haoshoku Conqueror's Haki: Crackling crimson lightning bolts & shockwaves
        ctx.save();
        ctx.strokeStyle = '#ff2a5f';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff2a5f';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.4;

        if (Math.floor(t * 12) % 4 === 0) {
          // Lightning bolt flash
          ctx.beginPath();
          let lx = 0;
          let ly = Math.random() * h;
          ctx.moveTo(lx, ly);
          while (lx < w) {
            lx += Math.random() * 40 + 15;
            ly += (Math.random() - 0.5) * 45;
            ctx.lineTo(lx, ly);
          }
          ctx.stroke();
        }

        // Expanding shockwave ripple
        const rip = (t * 30 * speedMultiplier) % (w * 0.8);
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.5, rip, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 42, 95, 0.25)';
        ctx.stroke();
        ctx.restore();
      } else if (conceptId === 'onepiece_pmf') {
        // Armament Haki Hardening: Green obsidian metallic plates & cryptographic hexagon grid
        ctx.save();
        ctx.strokeStyle = 'rgba(57, 255, 20, 0.22)';
        ctx.lineWidth = 1;
        const hexSize = 22;
        for (let x = 0; x < w; x += hexSize * 1.8) {
          for (let y = 0; y < h; y += hexSize * 1.5) {
            const glow = (Math.sin(t * 2 + (x + y) * 0.05) + 1) * 0.5;
            ctx.beginPath();
            ctx.arc(x, y, hexSize * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(57, 255, 20, ${glow * 0.2})`;
            ctx.fill();
            ctx.stroke();
          }
        }
        ctx.restore();
      } else if (conceptId === 'naruto_ports') {
        // Byakugan Tenketsu: Glowing pressure-point nodes & strike lines
        ctx.save();
        elements.forEach((el, idx) => {
          el.x += Math.sin(t + idx) * 0.6;
          el.y += Math.cos(t + idx) * 0.6;

          ctx.beginPath();
          ctx.arc(el.x, el.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#00f0ff';
          ctx.globalAlpha = 0.5;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f0ff';
          ctx.fill();

          if (idx > 0) {
            ctx.beginPath();
            ctx.moveTo(el.x, el.y);
            ctx.lineTo(elements[idx - 1].x, elements[idx - 1].y);
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
            ctx.stroke();
          }
        });
        ctx.restore();
      } else if (conceptId === 'naruto_spoof') {
        // Substitution Kawarimi: Billowing white-orange smoke cloud drifting
        ctx.save();
        for (let i = 0; i < 6; i++) {
          const smokeX = ((t * 25 * speedMultiplier + i * 55) % (w + 60)) - 30;
          const smokeY = h * 0.5 + Math.sin(t + i) * 20;
          ctx.beginPath();
          ctx.arc(smokeX, smokeY, 28 + Math.sin(t + i) * 10, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 220, 160, 0.07)';
          ctx.fill();
        }
        ctx.restore();
      } else if (conceptId === 'blackclover_antimagic') {
        // Anti-Magic Blade: Black void slashes with neon green edge tears
        ctx.save();
        const slashProgress = (t * 1.5 * speedMultiplier) % 1;
        const sx = slashProgress * w * 1.2 - 20;
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx - 40, h);
        ctx.strokeStyle = '#39ff14';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#39ff14';
        ctx.globalAlpha = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(sx + 8, 0);
        ctx.lineTo(sx - 32, h);
        ctx.strokeStyle = '#05080e';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.restore();
      } else if (conceptId === 'bleach_bankai') {
        // Bankai Reiatsu Flames: Roaring upward purple spiritual fire
        ctx.save();
        elements.forEach((el, idx) => {
          el.y -= (el.size * 1.4 + 1.2) * speedMultiplier;
          el.x += Math.sin(t * 3 + idx) * 1.2;
          if (el.y < -10) {
            el.y = h + 10;
            el.x = Math.random() * w;
          }

          ctx.beginPath();
          ctx.arc(el.x, el.y, el.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = idx % 2 === 0 ? '#9d4edd' : '#c77dff';
          ctx.globalAlpha = 0.4;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#9d4edd';
          ctx.fill();
        });
        ctx.restore();
      } else if (conceptId === 'bleach_aizen') {
        // Kyoka Suigetsu: Hypnotic water ripples and reflective glass shards
        ctx.save();
        const rx = w * 0.5 + Math.sin(t) * 40;
        const ry = h * 0.5 + Math.cos(t) * 20;
        for (let i = 1; i <= 3; i++) {
          const r = ((t * 16 * speedMultiplier + i * 25) % (w * 0.5));
          ctx.beginPath();
          ctx.arc(rx, ry, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 42, 95, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [conceptId, themeColor, isSelected, isHovered]);

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={110}
      className="card-video-canvas"
    />
  );
}

export default function AnimeVisualizer() {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(0);
  const [filterAnime, setFilterAnime] = useState('All'); // All, Naruto, One Piece, Black Clover, Bleach
  const [isCasting, setIsCasting] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [theaterMode, setTheaterMode] = useState('simulation'); // 'simulation' or 'video'
  const canvasRef = useRef(null);

  const currentItem = ANIME_CONCEPTS[selectedConceptIndex];

  const filteredList = filterAnime === 'All' 
    ? ANIME_CONCEPTS 
    : ANIME_CONCEPTS.filter(c => c.anime.toLowerCase() === filterAnime.toLowerCase());

  // Interactive Technique Activation Trigger
  const triggerTechnique = () => {
    setIsCasting(true);
    if (currentItem.id.includes('ddos') || currentItem.id.includes('naruto')) {
      playAnimeSound('rasengan');
    } else if (currentItem.id.includes('haki') || currentItem.id.includes('deauth') || currentItem.id.includes('onepiece')) {
      playAnimeSound('haki');
    } else if (currentItem.id.includes('antimagic') || currentItem.id.includes('blackclover')) {
      playAnimeSound('antimagic');
    } else {
      playAnimeSound('bankai');
    }

    setTimeout(() => {
      setIsCasting(false);
    }, 2500);
  };

  // Canvas particle / animation loop for main theater stage
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Create particles based on anime theme
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: currentItem.themeColor,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw center energy vortex if casting
      if (isCasting) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60 + Math.sin(Date.now() / 100) * 15, 0, Math.PI * 2);
        ctx.strokeStyle = currentItem.themeColor;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 25;
        ctx.shadowColor = currentItem.themeColor;
        ctx.stroke();

        ctx.font = '14px monospace';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText('[ TECHNIQUE SURGE ACTIVATED ]', centerX, centerY + 5);
        ctx.restore();
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += isCasting ? p.vx * 3 : p.vx;
        p.y += isCasting ? p.vy * 3 : p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = isCasting ? 12 : 5;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [currentItem, isCasting]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="sidebar-tag" style={{ borderColor: '#ff9d00', color: '#ff9d00', background: 'rgba(255, 157, 0, 0.1)' }}>
            SHINOBI & SHONEN CYBER DOJO
          </span>
          <span className="sidebar-tag" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)', background: 'rgba(0, 240, 255, 0.1)' }}>
            ⚡ LIVE MOTION VIDEO BACKDROPS
          </span>
        </div>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>
          ⚔️ Anime Visualizer: Cybersecurity Through Shonen Logic
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Abstract network protocols become instantly crystal clear when mapped to iconic anime abilities from <strong>Naruto</strong>, <strong>One Piece</strong>, <strong>Black Clover</strong>, and <strong>Bleach</strong>. Notice the real-time animated jutsu energy videos running continuously behind each card!
        </p>
      </div>

      {/* Anime Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        {['All', 'Naruto', 'One Piece', 'Black Clover', 'Bleach'].map((animeName) => (
          <button
            key={animeName}
            onClick={() => setFilterAnime(animeName)}
            className="cyber-button"
            style={{
              padding: '6px 16px',
              fontSize: '0.8rem',
              borderColor: filterAnime === animeName ? 'var(--accent-cyan)' : 'transparent',
              background: filterAnime === animeName ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
              color: filterAnime === animeName ? 'var(--accent-cyan)' : 'var(--text-secondary)'
            }}
          >
            {animeName === 'All' ? '🌟 All Universes' : (
              animeName === 'Naruto' ? '🍥 Naruto' : (
                animeName === 'One Piece' ? '🏴‍☠️ One Piece' : (
                  animeName === 'Black Clover' ? '🍀 Black Clover' : '⚔️ Bleach'
                )
              )
            )}
          </button>
        ))}
      </div>

      {/* Main Grid: Concept Selector Sidebar + Theater Stage */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Left Column: Concept List with ANIMATED VIDEOS RUNNING BEHIND TEXT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '720px', overflowY: 'auto', paddingRight: '6px' }}>
          {filteredList.map((c) => {
            const isSelected = c.id === currentItem.id;
            const isHovered = hoveredCardId === c.id;

            return (
              <div
                key={c.id}
                onClick={() => {
                  const idx = ANIME_CONCEPTS.findIndex(item => item.id === c.id);
                  setSelectedConceptIndex(idx);
                }}
                onMouseEnter={() => setHoveredCardId(c.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`anime-video-card ${isSelected ? 'active' : ''}`}
                style={{
                  border: isSelected ? `2px solid ${c.themeColor}` : '1px solid var(--border-color)',
                  boxShadow: isSelected ? `0 0 20px ${c.themeColor}55` : 'none',
                }}
              >
                {/* 1. Animated Video Motion Running Behind Texts */}
                <CardVideoMotion
                  conceptId={c.id}
                  themeColor={c.themeColor}
                  isSelected={isSelected}
                  isHovered={isHovered}
                />

                {/* 2. Glassmorphism contrast overlay so text is crisp & readable */}
                <div className="card-video-overlay" />

                {/* 3. Foreground Content Layer */}
                <div className="card-content-layer">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: c.themeColor, fontWeight: 'bold' }}>
                      {c.anime.toUpperCase()} • {c.character}
                    </span>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(0,0,0,0.5)', border: `1px solid ${c.themeColor}44`, padding: '2px 8px', borderRadius: '4px', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      {c.badge}
                    </span>
                  </div>

                  <h4 style={{ color: '#fff', fontSize: '0.96rem', marginBottom: '4px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    {c.technique}
                  </h4>

                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: c.themeColor }}>➔</span>
                    <strong style={{ color: 'var(--accent-cyan)', textShadow: '0 0 8px rgba(0,240,255,0.4)' }}>{c.cyberConcept}</strong>
                  </div>

                  {/* Video Motion Indicator Pill */}
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: isSelected ? c.themeColor : 'rgba(255,255,255,0.4)' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: isSelected ? c.themeColor : 'rgba(255,255,255,0.4)', boxShadow: isSelected ? `0 0 8px ${c.themeColor}` : 'none' }}></span>
                    {isSelected ? 'VIDEO STREAM: ACTIVE BEHIND TEXT' : 'MOTION LOOP RUNNING'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive Anime Cyber Theater Stage */}
        <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderColor: currentItem.themeColor }}>
          {/* Header Card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="sidebar-tag" style={{ borderColor: currentItem.themeColor, color: currentItem.themeColor, background: 'rgba(0,0,0,0.4)' }}>
                  {currentItem.anime} • {currentItem.universe}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  USER: {currentItem.character}
                </span>
              </div>
              <h2 style={{ color: '#fff', fontSize: '1.4rem', marginTop: '6px' }}>
                {currentItem.technique}
              </h2>
              <div style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', fontWeight: 'bold', marginTop: '2px' }}>
                = {currentItem.cyberConcept}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={triggerTechnique}
                className="cyber-button"
                style={{
                  borderColor: currentItem.themeColor,
                  color: currentItem.themeColor,
                  background: isCasting ? `${currentItem.themeColor}33` : 'transparent',
                  boxShadow: isCasting ? `0 0 20px ${currentItem.themeColor}` : 'none',
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {isCasting ? '⚡ POWER SURGING...' : '⚡ ACTIVATE JUTSU DEMO'}
              </button>
            </div>
          </div>

          {/* Mode Switcher: Cyber Particle Simulation vs Full Anime Scene Video */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
            <button
              onClick={() => setTheaterMode('simulation')}
              className="cyber-button"
              style={{
                fontSize: '0.78rem',
                padding: '4px 12px',
                borderColor: theaterMode === 'simulation' ? currentItem.themeColor : 'transparent',
                color: theaterMode === 'simulation' ? currentItem.themeColor : 'var(--text-secondary)',
                background: theaterMode === 'simulation' ? 'rgba(255,255,255,0.06)' : 'transparent'
              }}
            >
              🌀 Cyber Jutsu Simulation Engine
            </button>
            <button
              onClick={() => setTheaterMode('video')}
              className="cyber-button"
              style={{
                fontSize: '0.78rem',
                padding: '4px 12px',
                borderColor: theaterMode === 'video' ? currentItem.themeColor : 'transparent',
                color: theaterMode === 'video' ? currentItem.themeColor : 'var(--text-secondary)',
                background: theaterMode === 'video' ? 'rgba(255,255,255,0.06)' : 'transparent'
              }}
            >
              🎬 Watch Iconic Anime Scene
            </button>
          </div>

          {/* Interactive Visual Stage */}
          {theaterMode === 'simulation' ? (
            <div style={{ position: 'relative', width: '100%', height: '220px', background: '#030509', borderRadius: '8px', border: `1px solid ${currentItem.themeColor}55`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <canvas ref={canvasRef} width={600} height={220} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />

              {/* In-Canvas Dynamic Character Quote Overlay */}
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '16px', maxWidth: '85%' }}>
                <div style={{ fontStyle: 'italic', fontSize: '1rem', color: '#fff', textShadow: `0 0 10px ${currentItem.themeColor}`, lineHeight: '1.5' }}>
                  {currentItem.quote}
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: currentItem.themeColor, marginTop: '8px' }}>
                  — {currentItem.character} ({currentItem.anime})
                </div>
              </div>

              {/* Bottom Cyber Status bar on canvas */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: 'rgba(0,0,0,0.75)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '4px 12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                <span>CHAKRA FREQUENCY: 2.4 / 5.0 GHz</span>
                <span>ANIMATED VIDEO STREAM: 60 FPS</span>
                <span style={{ color: currentItem.themeColor }}>STATUS: SIMULATING</span>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '260px', background: '#000', borderRadius: '8px', border: `1px solid ${currentItem.themeColor}55`, overflow: 'hidden' }}>
              <iframe
                title={currentItem.sceneTitle}
                src={currentItem.videoClipUrl}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Side-by-Side Breakdown: Anime Meaning vs Cyber Reality */}
          <div className="grid-2" style={{ gap: '14px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '14px' }}>
              <h4 style={{ color: currentItem.themeColor, fontSize: '0.85rem', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                🎌 IN THE ANIME:
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                {currentItem.summary}
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: '6px', padding: '14px' }}>
              <h4 style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                💻 IN CYBERSECURITY:
              </h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                {currentItem.cyberMapping}
              </p>
            </div>
          </div>

          {/* Live Terminal Command Box */}
          <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', marginBottom: '4px' }}>
              REAL-WORLD KALI LINUX COMMAND:
            </div>
            <div style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>kali@shinobi:~$</span>
              <code>{currentItem.command}</code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
