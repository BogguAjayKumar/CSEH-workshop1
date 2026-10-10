import React, { useState } from 'react';

const HANDSHAKE_STEPS = [
  {
    step: 1,
    title: "1. AP Beacon & Association",
    sender: "ap",
    receiver: "client",
    packet: "802.11 Beacon Frame / Association Request",
    desc: "The Access Point (AP) continuously broadcasts beacon frames containing its SSID (network name), BSSID, channel number, and security capabilities (WPA2/WPA3). The client detects the beacon and sends an Association Request to connect.",
    visual: {
      leftLabel: "Client Laptop",
      rightLabel: "Access Point (AP)",
      arrowDir: "left-to-right",
      arrowLabel: "Association Request ➔",
      payload: "SSID: SecureWiFi | Auth: WPA2-PSK | Ch: 6"
    }
  },
  {
    step: 2,
    title: "2. Message 1 (ANonce)",
    sender: "ap",
    receiver: "client",
    packet: "EAPOL-Key (ANonce)",
    desc: "The AP generates a cryptographically secure 256-bit random number called the Authenticator Nonce (ANonce) and transmits it to the client. Note: The actual Wi-Fi password (PSK) is NEVER sent across the air.",
    visual: {
      leftLabel: "Client Laptop",
      rightLabel: "Access Point (AP)",
      arrowDir: "right-to-left",
      arrowLabel: "📑 EAPOL Msg 1 (ANonce) ➔",
      payload: "ANonce: 0x9f3d2b... | (Password stays hidden)"
    }
  },
  {
    step: 3,
    title: "3. Message 2 (SNonce + MIC)",
    sender: "client",
    receiver: "ap",
    packet: "EAPOL-Key (SNonce + MIC)",
    desc: "The client generates its own random number called SNonce. Using SSID, PSK (password), SNonce, and ANonce, the client derives the session encryption key (PTK). It sends SNonce to the AP, plus a Message Integrity Code (MIC) to prove it knows the password without transmitting it.",
    visual: {
      leftLabel: "Client Laptop",
      rightLabel: "Access Point (AP)",
      arrowDir: "left-to-right",
      arrowLabel: "📑 EAPOL Msg 2 (SNonce, MIC) ➔",
      payload: "SNonce: 0x5a1e8c... | MIC: Cryptographic hash"
    }
  },
  {
    step: 4,
    title: "4. Message 3 (GTK + MIC)",
    sender: "ap",
    receiver: "client",
    packet: "EAPOL-Key (GTK + MIC)",
    desc: "The AP verifies the Client's MIC. If valid, the AP derives the identical PTK. It then generates the Group Temporal Key (GTK) used to encrypt broadcast traffic, encrypts it with the PTK, and sends it to the client along with its own MIC.",
    visual: {
      leftLabel: "Client Laptop",
      rightLabel: "Access Point (AP)",
      arrowDir: "right-to-left",
      arrowLabel: "📑 EAPOL Msg 3 (GTK, MIC) ➔",
      payload: "GTK (Encrypted broadcast key) | AP MIC verified"
    }
  },
  {
    step: 5,
    title: "5. Message 4 (ACK)",
    sender: "client",
    receiver: "ap",
    packet: "EAPOL-Key (ACK)",
    desc: "The client verifies the AP's MIC. If correct, the client installs the derived transient keys for unicast encryption. It sends a final Confirmation/ACK frame to the AP, notifying it that the encrypted tunnel is now active.",
    visual: {
      leftLabel: "Client Laptop",
      rightLabel: "Access Point (AP)",
      arrowDir: "left-to-right",
      arrowLabel: "📑 EAPOL Msg 4 (Confirm ACK) ➔",
      payload: "Encryption ACTIVE | PMK & PTK fully loaded"
    }
  }
];

export default function WifiFundamentals() {
  const [activeSubTab, setActiveSubTab] = useState('modes'); // 'modes', 'channels_bssid', 'deauth', 'handshake'

  // --- Handshake step state ---
  const [activeStep, setActiveStep] = useState(0);

  // --- Selected Mode in Wi-Fi Modes tab ---
  const [selectedMode, setSelectedMode] = useState('monitor');

  // --- Channel calculator / selector state ---
  const [selectedChannel, setSelectedChannel] = useState(6);

  const currentStep = HANDSHAKE_STEPS[activeStep];

  const wifiModesData = {
    monitor: {
      title: "1. Monitor Mode (RFMON - Radio Frequency Monitor)",
      tag: "THE PENTESTER'S MODE",
      tagColor: "var(--accent-cyan)",
      icon: "🛰️",
      summary: "Passively captures every raw 802.11 radio frame traversing the airspace, regardless of destination MAC address.",
      details: [
        "Operates without associating or authenticating to any Access Point.",
        "Captures all 802.11 frame types: Management (Beacons, Probes, Deauths), Control (RTS, CTS, ACK), and Data frames.",
        "Ignores destination MAC address filtering: Every packet captured out of the air is delivered directly to userland tools like airodump-ng and Wireshark.",
        "Enabled in Linux via tools like: `airmon-ng start wlan0`."
      ],
      promiscuousDiff: "Promiscuous Mode vs Monitor Mode: Promiscuous mode only works on an Ethernet cable or on a Wi-Fi network you are ALREADY CONNECTED to. Monitor Mode listens to raw radio waves out of thin air WITHOUT connecting to any network!"
    },
    managed: {
      title: "2. Managed Mode (Station / Client Mode)",
      tag: "DEFAULT CLIENT MODE",
      tagColor: "var(--accent-green)",
      icon: "💻",
      summary: "Standard client mode used by laptops, smartphones, and IoT devices to connect to an Access Point.",
      details: [
        "The wireless card associates and authenticates with a single Access Point (infrastructure mode).",
        "The hardware card discards all packets whose destination MAC does not match its own MAC address (or broadcast FF:FF:FF:FF:FF:FF).",
        "Handles automatic roaming between access points sharing the same ESSID.",
        "Default mode managed by `NetworkManager` and `wpa_supplicant`."
      ],
      promiscuousDiff: "Cannot capture raw 802.11 management frames (like Beacons or Deauths) from other neighboring devices."
    },
    master: {
      title: "3. Master Mode (Access Point / AP Mode)",
      tag: "INFRASTRUCTURE PROVIDER",
      tagColor: "var(--accent-orange)",
      icon: "📡",
      summary: "Turns the wireless network card into a base station router that broadcasts beacons and manages connecting clients.",
      details: [
        "Broadcasts periodic 802.11 Beacon frames declaring SSID, channel frequency, encryption ciphers (WPA2/WPA3), and data rates.",
        "Maintains association tables and acts as the central hub routing client traffic.",
        "Used in cybersecurity for creating 'Rogue APs', 'Evil Twins', and captive portals using tools like `hostapd` and `airbase-ng`."
      ],
      promiscuousDiff: "Requires wireless chipset support for Master Mode (e.g. Atheros, Ralink, Realtek with hostapd drivers)."
    },
    adhoc: {
      title: "4. Ad-Hoc Mode (IBSS - Independent Basic Service Set)",
      tag: "PEER-TO-PEER",
      tagColor: "#9d4edd",
      icon: "🤝",
      summary: "Enables direct decentralized wireless communication between two or more client devices without any router or AP.",
      details: [
        "Devices communicate directly peer-to-peer on the same frequency channel.",
        "No central access point coordinates timing; devices share beacon generation responsibility.",
        "Commonly used in temporary file transfers, military field radios, and tactical sensor networks."
      ],
      promiscuousDiff: "Limited range and scalability compared to infrastructure networks."
    },
    mesh: {
      title: "5. Mesh Mode (802.11s)",
      tag: "MULTI-HOP RELAY",
      tagColor: "#00b4d8",
      icon: "🕸️",
      summary: "Nodes form an interconnected decentralized mesh topology relaying packets across multiple peer hops.",
      details: [
        "Each mesh node functions simultaneously as a client and a wireless relay router.",
        "Uses HWMP (Hybrid Wireless Mesh Protocol) for dynamic path discovery.",
        "Self-healing: If one router goes down, packets dynamically re-route around the failure."
      ],
      promiscuousDiff: "Requires 802.11s kernel driver support in Linux (`iw dev wlan0 set type mp`)."
    }
  };

  const channelFreqMap = {
    1: { freq: "2412 MHz", overlap: "None (Channels 2, 3, 4, 5 overlap)", recommended: true },
    2: { freq: "2417 MHz", overlap: "Overlaps with Ch 1, 3, 4, 5, 6", recommended: false },
    3: { freq: "2422 MHz", overlap: "Overlaps with Ch 1, 2, 4, 5, 6, 7", recommended: false },
    4: { freq: "2427 MHz", overlap: "Overlaps with Ch 1, 2, 3, 5, 6, 7, 8", recommended: false },
    5: { freq: "2432 MHz", overlap: "Overlaps with Ch 2, 3, 4, 6, 7, 8, 9", recommended: false },
    6: { freq: "2437 MHz", overlap: "None (Channels 2-5 & 7-10 overlap)", recommended: true },
    7: { freq: "2442 MHz", overlap: "Overlaps with Ch 4, 5, 6, 8, 9, 10, 11", recommended: false },
    8: { freq: "2447 MHz", overlap: "Overlaps with Ch 5, 6, 7, 9, 10, 11, 12", recommended: false },
    9: { freq: "2452 MHz", overlap: "Overlaps with Ch 6, 7, 8, 10, 11, 12, 13", recommended: false },
    10: { freq: "2457 MHz", overlap: "Overlaps with Ch 7, 8, 9, 11, 12, 13, 14", recommended: false },
    11: { freq: "2462 MHz", overlap: "None (Channels 7-10 & 12-14 overlap)", recommended: true }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Page Title */}
      <div>
        <span className="sidebar-tag">SESSION 5 & 6</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Wi-Fi Modes, Channels, BSSID & Handshake</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Wireless networks broadcast packets through open radio waves. Mastering <strong>Monitor Mode</strong>, <strong>Channels</strong>, <strong>BSSIDs</strong>, <strong>Deauthentication Frames</strong>, and the <strong>WPA2 4-Way Handshake</strong> is essential for understanding wireless security and defense.
        </p>
      </div>

      {/* Sub-navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveSubTab('modes')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'modes' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeSubTab === 'modes' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🛰️ WI-FI MODES (MONITOR VS MANAGED)
        </button>
        <button
          onClick={() => setActiveSubTab('channels_bssid')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'channels_bssid' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeSubTab === 'channels_bssid' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          📻 CHANNELS, FREQUENCIES & BSSID
        </button>
        <button
          onClick={() => setActiveSubTab('deauth')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'deauth' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeSubTab === 'deauth' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          ⚡ DEAUTH ATTACK & 802.11w DEFENSE
        </button>
        <button
          onClick={() => setActiveSubTab('handshake')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'handshake' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeSubTab === 'handshake' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🤝 4-WAY HANDSHAKE FLOW
        </button>
      </div>

      {/* Subtab 1: Wi-Fi Operating Modes */}
      {activeSubTab === 'modes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="text-cyber-glow" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
              🛰️ The 5 Wi-Fi Operating Modes
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Unlike wired Ethernet cables, wireless network cards (NICs) can be switched into multiple radio modes depending on their operational role:
            </p>

            {/* Mode selection buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px', marginBottom: '20px' }}>
              {Object.keys(wifiModesData).map((mKey) => (
                <button
                  key={mKey}
                  onClick={() => setSelectedMode(mKey)}
                  className={`cyber-button ${selectedMode === mKey ? 'active' : 'disabled'}`}
                  style={{
                    padding: '10px',
                    fontSize: '0.8rem',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    borderColor: selectedMode === mKey ? 'var(--accent-cyan)' : 'var(--border-color)',
                    background: selectedMode === mKey ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0,0,0,0.2)'
                  }}
                >
                  <span style={{ fontSize: '1.2rem', marginRight: '6px' }}>{wifiModesData[mKey].icon}</span>
                  <span>{wifiModesData[mKey].title.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Selected Mode Detail Panel */}
            <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '2.5rem' }}>{wifiModesData[selectedMode].icon}</span>
                  <div>
                    <h3 style={{ color: '#fff', fontSize: '1.15rem' }}>{wifiModesData[selectedMode].title}</h3>
                    <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', marginTop: '2px' }}>
                      {wifiModesData[selectedMode].summary}
                    </p>
                  </div>
                </div>
                <span className="sidebar-tag" style={{ borderColor: wifiModesData[selectedMode].tagColor, color: wifiModesData[selectedMode].tagColor }}>
                  {wifiModesData[selectedMode].tag}
                </span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '16px', margin: '16px 0' }}>
                <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                  TECHNICAL MECHANICS:
                </div>
                <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {wifiModesData[selectedMode].details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'rgba(0, 240, 255, 0.04)', border: '1px solid rgba(0, 240, 255, 0.2)', borderRadius: '6px', padding: '14px' }}>
                <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>💡 Critical Exam & Interview Distinction:</strong>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', marginTop: '4px', lineHeight: '1.5' }}>
                  {wifiModesData[selectedMode].promiscuousDiff}
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Subtab 2: Channels, Frequencies & BSSID */}
      {activeSubTab === 'channels_bssid' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* BSSID vs ESSID Section */}
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="text-cyber-glow" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
              🏷️ BSSID vs ESSID: The Hardware vs Human Name
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Understanding the difference between the Access Point's physical radio hardware address and its broadcast network name is vital for targeting:
            </p>

            <div className="grid-2">
              <div style={{ background: 'rgba(9, 13, 23, 0.7)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>BSSID (Basic Service Set ID)</h3>
                  <span className="sidebar-tag" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>HARDWARE MAC</span>
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '12px' }}>
                  The unique <strong>48-bit MAC address</strong> of the physical radio transmitter inside the router (e.g. <code>9C:5C:8E:F1:D3:C8</code>).
                </p>
                <div style={{ background: '#05070c', padding: '10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                  Targeted in tools: `airodump-ng --bssid 9C:5C:8E:F1:D3:C8 wlan0mon`
                </div>
                <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Even on a single router, 2.4 GHz and 5 GHz radios have separate BSSIDs!</li>
                  <li>Hidden networks: When an AP hides its SSID, the BSSID is <strong>still 100% visible</strong> in every frame transmitted!</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(9, 13, 23, 0.7)', border: '1px solid rgba(57, 255, 20, 0.3)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ color: 'var(--accent-green)', fontSize: '1.1rem' }}>ESSID / SSID (Service Set ID)</h3>
                  <span className="sidebar-tag" style={{ borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}>HUMAN NAME</span>
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '12px' }}>
                  The human-readable string (up to 32 characters) representing the Wi-Fi network name (e.g. <code>Campus_Secure_WiFi</code>).
                </p>
                <div style={{ background: '#05070c', padding: '10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  Declared in Beacon Frames: "SSID: Campus_Secure_WiFi"
                </div>
                <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Multiple Access Points can share the identical ESSID across a building for seamless Wi-Fi roaming.</li>
                  <li>Attackers exploit this in <strong>Evil Twin attacks</strong> by copying the victim's ESSID on a rogue router with a stronger signal.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Wi-Fi Channels & Frequencies Section */}
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="text-cyber-glow" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
              📻 Wi-Fi Channels & The Non-Overlapping Rule (1, 6, 11)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.5' }}>
              In the 2.4 GHz frequency band, channels are spaced <strong>5 MHz apart</strong>, but each Wi-Fi transmission is <strong>20 MHz wide</strong>. This causes neighboring channels to overlap and collide with each other! To avoid destructive packet interference, network engineers deploy only the 3 non-overlapping channels: <strong>Channel 1, Channel 6, and Channel 11</strong>.
            </p>

            {/* Interactive Channel Picker */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setSelectedChannel(ch)}
                  className="cyber-button"
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    flex: 1,
                    minWidth: '55px',
                    background: selectedChannel === ch 
                      ? 'rgba(0, 240, 255, 0.2)' 
                      : (channelFreqMap[ch].recommended ? 'rgba(57, 255, 20, 0.05)' : 'rgba(255, 42, 95, 0.05)'),
                    borderColor: selectedChannel === ch 
                      ? 'var(--accent-cyan)' 
                      : (channelFreqMap[ch].recommended ? 'var(--accent-green)' : 'rgba(255,255,255,0.1)'),
                    color: selectedChannel === ch 
                      ? 'var(--accent-cyan)' 
                      : (channelFreqMap[ch].recommended ? 'var(--accent-green)' : 'var(--text-secondary)')
                  }}
                >
                  Ch {ch}
                </button>
              ))}
            </div>

            {/* Channel Info Card */}
            <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>
                  Channel {selectedChannel} — Frequency: {channelFreqMap[selectedChannel].freq}
                </h4>
                <span 
                  className="sidebar-tag"
                  style={{
                    borderColor: channelFreqMap[selectedChannel].recommended ? 'var(--accent-green)' : 'var(--accent-red)',
                    color: channelFreqMap[selectedChannel].recommended ? 'var(--accent-green)' : 'var(--accent-red)'
                  }}
                >
                  {channelFreqMap[selectedChannel].recommended ? '✓ STANDARD NON-OVERLAPPING' : '⚠️ ADJACENT OVERLAPPING'}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                <strong>Interference Status:</strong> {channelFreqMap[selectedChannel].overlap}
              </p>
              <div style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px' }}>
                [PENTESTING CHANNEL LOCKING]: To sniff handshakes on this AP without packet loss, lock airodump-ng: <br />
                <code style={{ color: 'var(--accent-green)' }}>airodump-ng -c {selectedChannel} --bssid 9C:5C:8E:F1:D3:C8 wlan0mon</code>
              </div>
            </div>

            {/* 5 GHz & 6 GHz Comparison Banner */}
            <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '16px' }}>
              <h4 style={{ color: 'var(--accent-green)', fontSize: '0.95rem', marginBottom: '6px' }}>
                🚀 What about 5 GHz & 6 GHz (Wi-Fi 6E/7)?
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                Unlike crowded 2.4 GHz, the <strong>5 GHz band</strong> features 24+ non-overlapping channels and supports channel bonding (40 MHz, 80 MHz, 160 MHz) for massive multi-gigabit throughput. However, higher radio frequencies attenuate much faster through physical concrete walls, resulting in shorter range.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* Subtab 3: Deauth Attacks & 802.11w PMF */}
      {activeSubTab === 'deauth' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="text-cyber-glow" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
              ⚡ What is a Deauthentication (Deauth) Frame & Attack?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.5' }}>
              In the IEEE 802.11 Wi-Fi specification, a <strong>Deauthentication Frame</strong> is an explicit management frame (Type 00, Subtype 1100 / Subtype 12) sent between an AP and a client station to gracefully terminate a wireless connection.
            </p>

            <div className="grid-2" style={{ marginBottom: '20px' }}>
              {/* The Flaw */}
              <div style={{ background: 'rgba(255, 42, 95, 0.04)', border: '1px solid rgba(255, 42, 95, 0.3)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.8rem' }}>⚠️</span>
                  <div>
                    <h3 style={{ color: 'var(--accent-red)', fontSize: '1.05rem' }}>The WPA2 Vulnerability: Unencrypted Management Frames</h3>
                  </div>
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '12px' }}>
                  While WPA2 encrypts all <strong>Data frames</strong> (web traffic, passwords), the original 802.11 designers left all <strong>Management frames</strong> (Beacons, Probes, Deauths) completely <strong>UNENCRYPTED and UNAUTHENTICATED</strong>!
                </p>
                <div style={{ background: '#05070c', padding: '10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-red)' }}>
                  Attack Execution: `aireplay-ng -0 10 -a [AP_BSSID] -c [CLIENT_MAC] wlan0mon`
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '10px', lineHeight: '1.4' }}>
                  An attacker spoofs the AP's BSSID MAC address and sends a flood of fake deauth frames to the victim. The victim's phone drops the connection immediately, believing the legitimate router commanded it to disconnect!
                </p>
              </div>

              {/* The Defense: 802.11w PMF */}
              <div style={{ background: 'rgba(57, 255, 20, 0.04)', border: '1px solid rgba(57, 255, 20, 0.3)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.8rem' }}>🛡️</span>
                  <div>
                    <h3 style={{ color: 'var(--accent-green)', fontSize: '1.05rem' }}>The Defense: IEEE 802.11w Protected Management Frames (PMF)</h3>
                  </div>
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '12px' }}>
                  The <strong>IEEE 802.11w amendment</strong> fixes this architectural flaw by cryptographically signing and encrypting management frames using a Broadcast Integrity Protocol (BIP).
                </p>
                <div style={{ background: '#05070c', padding: '10px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-green)' }}>
                  Status: Optional in WPA2 | MANDATORY in WPA3!
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '10px', lineHeight: '1.4' }}>
                  When 802.11w (PMF) is enabled, the client detects that the forged deauthentication packet lacks the cryptographic signature key, silently ignores the fake deauth packet, and maintains an uninterrupted encrypted connection!
                </p>
              </div>
            </div>

            {/* Why Attackers Use Deauth */}
            <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
              <h4 style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', marginBottom: '10px', fontFamily: 'var(--font-mono)' }}>
                🎯 Why Attackers Use Deauth Frames in Auditing:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px' }}>
                  <strong style={{ color: '#fff', fontSize: '0.85rem' }}>1. Capture 4-Way Handshake:</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', lineHeight: '1.4' }}>
                    When disconnected, client devices automatically reconnect in &lt;1 second. This reconnect forces the transmission of EAPOL Messages 1-4, which the attacker records in <code>handshake.cap</code>.
                  </p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px' }}>
                  <strong style={{ color: '#fff', fontSize: '0.85rem' }}>2. Evil Twin / Rogue AP Steer:</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', lineHeight: '1.4' }}>
                    By continuously deauthenticating a user from the legitimate corporate AP, the victim gets frustrated and connects to the attacker's nearby open Evil Twin rogue hotspot.
                  </p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px' }}>
                  <strong style={{ color: '#fff', fontSize: '0.85rem' }}>3. Wireless Denial of Service (DoS):</strong>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px', lineHeight: '1.4' }}>
                    A persistent deauthentication broadcast flood (<code>-c FF:FF:FF:FF:FF:FF</code>) disconnects all clients across a lecture hall or conference room continuously.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Subtab 4: Handshake Step-by-Step Flow */}
      {activeSubTab === 'handshake' && (
        <div className="grid-2">
          {/* Left Column: Interactive Diagram */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
            <div>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                🤝 Handshake Step-by-Step Flow
              </h3>

              {/* Graphic Representation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', minHeight: '180px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Client Node */}
                  <div className="wifi-node">
                    <span style={{ fontSize: '2rem' }}>💻</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '6px' }}>
                      {currentStep.visual.leftLabel}
                    </span>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      MAC: ec:08:6b:1b:f8:a1
                    </span>
                  </div>

                  {/* Packet Arrow */}
                  <div style={{ flex: 1, padding: '0 15px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '8px', textAlign: 'center' }}>
                      {currentStep.visual.arrowLabel}
                    </span>
                    
                    {/* Arrow Graphic */}
                    <div style={{ width: '100%', height: '2px', background: 'var(--accent-cyan)', position: 'relative' }}>
                      <div 
                        style={{ 
                          position: 'absolute',
                          top: '-4px',
                          width: '10px',
                          height: '10px',
                          borderTop: '2px solid var(--accent-cyan)',
                          borderRight: '2px solid var(--accent-cyan)',
                          transform: currentStep.visual.arrowDir === 'left-to-right' ? 'rotate(45deg)' : 'rotate(-135deg)',
                          left: currentStep.visual.arrowDir === 'left-to-right' ? 'calc(100% - 10px)' : '0px',
                          transition: 'left 0.5s ease-in-out, transform 0.5s'
                        }}
                      />
                    </div>
                  </div>

                  {/* AP Node */}
                  <div className="wifi-node">
                    <span style={{ fontSize: '2rem' }}>📡</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '6px' }}>
                      {currentStep.visual.rightLabel}
                    </span>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      BSSID: 9c:5c:8e:f1:d3:c8
                    </span>
                  </div>
                </div>

                {/* Packet Payload Box */}
                <div style={{ background: '#0e1424', border: '1px solid rgba(0, 240, 255, 0.1)', padding: '10px', borderRadius: '4px', marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textAlign: 'center', color: 'var(--accent-cyan)' }}>
                  <strong>Frame Payload:</strong> {currentStep.visual.payload}
                </div>
              </div>
            </div>

            {/* Stepper Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
              <button 
                id="btn-handshake-prev"
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))} 
                className={`cyber-button ${activeStep === 0 ? 'disabled' : ''}`}
                style={{ padding: '8px 16px', fontSize: '0.75rem' }}
              >
                ◀ Back
              </button>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                {HANDSHAKE_STEPS.map((_, i) => (
                  <span 
                    key={i} 
                    onClick={() => setActiveStep(i)}
                    style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      background: i === activeStep ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.15)',
                      cursor: 'pointer',
                      boxShadow: i === activeStep ? 'var(--glow-cyan)' : 'none',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>

              <button 
                id="btn-handshake-next"
                onClick={() => setActiveStep(prev => Math.min(HANDSHAKE_STEPS.length - 1, prev + 1))} 
                className={`cyber-button ${activeStep === HANDSHAKE_STEPS.length - 1 ? 'disabled' : ''}`}
                style={{ padding: '8px 16px', fontSize: '0.75rem' }}
              >
                Next ▶
              </button>
            </div>
          </section>

          {/* Right Column: Explanatory Content */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>STEP DESCRIPTION</span>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '4px', marginBottom: '8px' }}>{currentStep.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {currentStep.desc}
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>Key Derivation Glossary</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>PMK (Pairwise Master Key):</strong> Derived directly from the Wi-Fi password (PSK) and the SSID hash. Represents the permanent shared secret.
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>PTK (Pairwise Transient Key):</strong> The unique session encryption key. Generated using: <code>PMK + ANonce + SNonce + Client MAC + AP BSSID</code>.
                </li>
                <li>
                  <strong style={{ color: 'var(--text-primary)' }}>MIC (Message Integrity Code):</strong> A cryptographic hash validating that the packet headers were not tampered with and proving the sender knows the PSK.
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
