import React, { useState, useRef, useEffect } from 'react';

export default function LinuxBasics({ onCompleteFlag }) {
  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    "Kali GNU/Linux Rolling 2026.3 (kali-rolling) wlan0:managed",
    "Type 'help' to see list of available commands.",
    ""
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  // Packet Visualizer State
  const [packetStep, setPacketStep] = useState(0); // 0: Idle, 1: Application, 2: Transport, 3: Network, 4: Physical, 5: InTransit, 6: Received
  const [packetDirection, setPacketDirection] = useState('forward'); // forward / reverse

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = inputVal.trim();
      const commandLower = command.toLowerCase();
      let response = [];

      response.push(`kali@kali:~$ ${command}`);

      if (commandLower === '') {
        // empty line
      } else if (commandLower === 'help') {
        response.push(
          "Available terminal commands:",
          "  help           - Display list of commands",
          "  ls             - List directory contents",
          "  pwd            - Print name of current/working directory",
          "  cat [file]     - Concatenate files and print on standard output",
          "  ifconfig       - Configure/Display network interfaces",
          "  ping [ip]      - Send ICMP ECHO_REQUEST packets to network hosts",
          "  clear          - Clear the terminal screen"
        );
      } else if (commandLower === 'ls') {
        response.push("config.json   flag.txt   network_diagnostic.sh   secret_notes.txt");
      } else if (commandLower === 'pwd') {
        response.push("/home/kali");
      } else if (commandLower === 'clear') {
        setTerminalHistory([]);
        setInputVal('');
        return;
      } else if (commandLower.startsWith('cat ')) {
        const target = command.substring(4).trim();
        if (target === 'flag.txt') {
          response.push("FLAG{BASH_P4TH_F1ND3R}");
          if (onCompleteFlag) {
            onCompleteFlag('FLAG{BASH_P4TH_F1ND3R}');
          }
        } else if (target === 'secret_notes.txt') {
          response.push(
            "SYS_LOG: Inspecting wireless client packets...",
            "Wireless security auditing notes:",
            " - Use 'ifconfig' to verify if interface 'wlan0' is present.",
            " - Monitor Mode allows capturing raw 802.11 frames."
          );
        } else if (target === 'config.json') {
          response.push(
            "{",
            '  "interface": "wlan0",',
            '  "mode": "managed",',
            '  "driver": "ath9k",',
            '  "ip_addr": "192.168.1.105"',
            "}"
          );
        } else if (target === 'network_diagnostic.sh') {
          response.push(
            "#!/bin/bash",
            "echo '--- Diagnostics ---'",
            "ping -c 3 8.8.8.8",
            "echo 'Route check completed.'"
          );
        } else {
          response.push(`cat: ${target}: No such file or directory`);
        }
      } else if (commandLower === 'ifconfig') {
        response.push(
          "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
          "        inet 10.0.2.15  netmask 255.255.255.0  broadcast 10.0.2.255",
          "        inet6 fe80::a00:27ff:fe8f:c90  prefixlen 64  scopeid 0x20<link>",
          "        ether 08:00:27:8f:c9:0b  txqueuelen 1000  (Ethernet)",
          "",
          "lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536",
          "        inet 127.0.0.1  netmask 255.0.0.0",
          "        loop  txqueuelen 1000  (Local Loopback)",
          "",
          "wlan0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500",
          "        inet 192.168.1.105  netmask 255.255.255.0  broadcast 192.168.1.255",
          "        ether ec:08:6b:1b:f8:a1  txqueuelen 1000  (IEEE 802.11)"
        );
      } else if (commandLower.startsWith('ping ')) {
        const dest = command.substring(5).trim();
        response.push(
          `PING ${dest} (${dest}) 56(84) bytes of data.`,
          `64 bytes from ${dest}: icmp_seq=1 ttl=64 time=12.4 ms`,
          `64 bytes from ${dest}: icmp_seq=2 ttl=64 time=10.1 ms`,
          `64 bytes from ${dest}: icmp_seq=3 ttl=64 time=15.3 ms`,
          `--- ${dest} ping statistics ---`,
          `3 packets transmitted, 3 received, 0% packet loss, time 2004ms`,
          `rtt min/avg/max/mdev = 10.12/12.60/15.31/2.12 ms`
        );
      } else {
        response.push(`bash: ${command}: command not found`);
      }

      setTerminalHistory(prev => [...prev, ...response, ""]);
      setInputVal('');
    }
  };

  // Packet Animation trigger
  const runPacketTrace = () => {
    setPacketStep(1);
    setPacketDirection('forward');
    // Sequence steps
    const timers = [
      setTimeout(() => setPacketStep(2), 1000), // transport
      setTimeout(() => setPacketStep(3), 2000), // network
      setTimeout(() => setPacketStep(4), 3000), // link
      setTimeout(() => setPacketStep(5), 4000), // transit
      setTimeout(() => setPacketStep(6), 6500), // server received
      // Return journey
      setTimeout(() => {
        setPacketDirection('reverse');
        setPacketStep(5);
      }, 8000),
      setTimeout(() => {
        setPacketStep(0);
      }, 10500)
    ];

    return () => timers.forEach(clearTimeout);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 5 & 6</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Linux & Networking Basics</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Kali Linux utilizes terminal commands to launch defensive audits and vulnerability scans. In networking, data travels via the TCP/IP stack, encapsulated in headers at each layer.
        </p>
      </div>

      <div className="grid-2">
        {/* Terminal Simulator */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>💻 Interactive Bash Terminal</h3>
          <div className="terminal-window" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <span className="terminal-title">kali@localhost: ~</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>BASH</span>
            </div>

            <div className="terminal-content">
              {terminalHistory.map((line, idx) => (
                <div key={idx} style={{ minHeight: '1.1rem', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                  {line}
                </div>
              ))}
              <div className="terminal-input-row">
                <span className="terminal-prompt">kali@kali:~$</span>
                <input 
                  id="terminal-bash-input"
                  type="text" 
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleCommand}
                  className="terminal-input"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={terminalEndRef} />
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Tip: Type <strong>ls</strong> to view files, then <strong>cat flag.txt</strong> to capture this session's flag!
          </span>
        </section>

        {/* Packet Encapsulation Visualizer */}
        <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
          <div>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
              📡 TCP/IP Encapsulation Tracer
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.4' }}>
              When you run <code>ping 8.8.8.8</code>, Linux packs your payload through four main layers before launching it across the network card. Click below to analyze this structure.
            </p>

            <button 
              id="btn-trace-packet"
              onClick={runPacketTrace} 
              className="cyber-button"
              disabled={packetStep > 0}
              style={{ width: '100%', marginBottom: '24px' }}
            >
              {packetStep > 0 ? '📡 TRACING IN PROGRESS...' : '⚙️ TRIGGER PACKET TRACE (PING)'}
            </button>

            {/* Encapsulation Box Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* Application Layer */}
              <div 
                style={{ 
                  border: `1px solid ${packetStep >= 1 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)'}`, 
                  background: packetStep >= 1 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.01)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Layer 4: Application Layer</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>ICMP payload</span>
                </div>
                {packetStep >= 1 && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Data: "Hello Server" (Ping request payload)</span>}
              </div>

              {/* Transport Layer */}
              <div 
                style={{ 
                  border: `1px solid ${packetStep >= 2 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)'}`, 
                  background: packetStep >= 2 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.01)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Layer 3: Transport Layer</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>ICMP Type 8 Header</span>
                </div>
                {packetStep >= 2 && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Controls integrity (Checksums, sequence identifiers)</span>}
              </div>

              {/* Network Layer */}
              <div 
                style={{ 
                  border: `1px solid ${packetStep >= 3 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)'}`, 
                  background: packetStep >= 3 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.01)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Layer 2: Network Layer (IP)</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>Src 192.168.1.105 ➔ Dest 8.8.8.8</span>
                </div>
                {packetStep >= 3 && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Identifies logical network host routing addresses</span>}
              </div>

              {/* Physical/Link Layer */}
              <div 
                style={{ 
                  border: `1px solid ${packetStep >= 4 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)'}`, 
                  background: packetStep >= 4 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.01)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Layer 1: Link Layer (Ethernet Frame)</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>MAC Frame Wrapping</span>
                </div>
                {packetStep >= 4 && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Maps physical NIC hardware addresses (Src MAC ➔ Gateway MAC)</span>}
              </div>
            </div>
          </div>

          {/* Graphical Routing Path */}
          {packetStep >= 5 && (
            <div style={{ background: '#090d17', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                {/* Client node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>💻</span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>192.168.1.105</span>
                </div>

                {/* Path line */}
                <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.1)', margin: '0 10px', position: 'relative' }}>
                  <div 
                    style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      background: 'var(--accent-cyan)', 
                      boxShadow: 'var(--glow-cyan)',
                      position: 'absolute',
                      top: '-4px',
                      left: packetDirection === 'forward' ? '0%' : '100%',
                      animation: packetDirection === 'forward' ? 'packet-move-fw 2.5s infinite linear' : 'packet-move-rv 2.5s infinite linear'
                    }}
                  />
                </div>

                {/* Router node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>📟</span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>192.168.1.1</span>
                </div>

                {/* Path line */}
                <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.1)', margin: '0 10px', position: 'relative' }}></div>

                {/* Server Node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>🌐</span>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>8.8.8.8 (Google)</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '10px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {packetStep === 5 && packetDirection === 'forward' && "PING: Transporting frame to Gateway..."}
                {packetStep === 5 && packetDirection === 'reverse' && "REPLY: Sending ICMP Echo Reply to host..."}
                {packetStep === 6 && "SUCCESS: Server 8.8.8.8 processing Echo Request."}
              </div>

              {/* Dynamic Keyframe style Injection for Packet Animation */}
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes packet-move-fw {
                  0% { left: 0%; }
                  100% { left: 100%; }
                }
                @keyframes packet-move-rv {
                  0% { left: 100%; }
                  100% { left: 0%; }
                }
              `}} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
