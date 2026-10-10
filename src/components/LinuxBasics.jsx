import React, { useState, useRef, useEffect } from 'react';

export default function LinuxBasics({ onCompleteFlag }) {
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal', 'mac_ip', 'tracer'

  // --- Terminal State ---
  const [terminalHistory, setTerminalHistory] = useState([
    "Kali GNU/Linux Rolling 2026.3 (kali-rolling) wlan0:managed",
    "Type 'help' to see list of available commands.",
    ""
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);

  // --- Current MAC state in terminal (for macchanger simulation) ---
  const [currentMac, setCurrentMac] = useState('ec:08:6b:1b:f8:a1');
  const [permanentMac] = useState('ec:08:6b:1b:f8:a1');

  // --- Packet Visualizer State ---
  const [packetStep, setPacketStep] = useState(0); // 0: Idle, 1: Application, 2: Transport, 3: Network, 4: Physical, 5: InTransit, 6: Received
  const [packetDirection, setPacketDirection] = useState('forward');

  // --- Interactive MAC/IP Inspector State ---
  const [inspectIp, setInspectIp] = useState('192.168.1.105');
  const [inspectMac, setInspectMac] = useState('ec:08:6b:1b:f8:a1');

  useEffect(() => {
    if (terminalEndRef.current && activeTab === 'terminal') {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, activeTab]);

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
          "  help                - Display list of commands",
          "  ls                  - List directory contents",
          "  pwd                 - Print name of current working directory",
          "  cat [file]          - Concatenate and print file contents",
          "  ifconfig / ip a     - Display network interfaces, IP and MAC addresses",
          "  macchanger -s [dev] - Show current MAC address",
          "  macchanger -r [dev] - Spoof a randomized MAC address",
          "  arp -a              - Display ARP resolution table (IP-to-MAC)",
          "  uname -a / uname -r - Display Linux OS kernel release",
          "  cat /etc/os-release - Display operating system distribution info",
          "  ping [ip]           - Send ICMP ECHO_REQUEST packets to network hosts",
          "  clear               - Clear the terminal screen"
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
            " - MAC Address: Layer 2 physical hardware address (NIC)",
            " - IP Address: Layer 3 logical routable network address",
            " - Use 'macchanger -r wlan0' to disguise your hardware ID prior to auditing.",
            " - Use 'ifconfig' to verify if interface 'wlan0' is present."
          );
        } else if (target === 'config.json') {
          response.push(
            "{",
            '  "interface": "wlan0",',
            '  "mode": "managed",',
            `  "mac_address": "${currentMac}",`,
            '  "driver": "ath9k",',
            '  "ip_addr": "192.168.1.105"',
            "}"
          );
        } else if (target === '/etc/os-release') {
          response.push(
            'PRETTY_NAME="Kali GNU/Linux Rolling"',
            'NAME="Kali GNU/Linux"',
            'ID=kali',
            'ID_LIKE=debian',
            'HOME_URL="https://www.kali.org/"',
            'SUPPORT_URL="https://forums.kali.org/"'
          );
        } else if (target === 'network_diagnostic.sh') {
          response.push(
            "#!/bin/bash",
            "echo '--- IP & Network Diagnostics ---'",
            "ip route show default",
            "ping -c 3 8.8.8.8",
            "echo 'Route check completed.'"
          );
        } else {
          response.push(`cat: ${target}: No such file or directory`);
        }
      } else if (commandLower === 'ifconfig' || commandLower === 'ip a' || commandLower === 'ip addr') {
        response.push(
          "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
          "        inet 10.0.2.15  netmask 255.255.255.0  broadcast 10.0.2.255",
          "        inet6 fe80::a00:27ff:fe8f:c90  prefixlen 64  scopeid 0x20<link>",
          "        ether 08:00:27:8f:c9:0b  txqueuelen 1000  (Ethernet)",
          "",
          "lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536",
          "        inet 127.0.0.1  netmask 255.0.0.0 (Local Loopback)",
          "",
          "wlan0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500",
          "        inet 192.168.1.105  netmask 255.255.255.0  broadcast 192.168.1.255",
          `        ether ${currentMac}  txqueuelen 1000  (IEEE 802.11)`
        );
      } else if (commandLower.startsWith('macchanger')) {
        if (commandLower.includes('-r')) {
          const randHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
          const newRandomMac = `00:${randHex()}:${randHex()}:${randHex()}:${randHex()}:${randHex()}`;
          setCurrentMac(newRandomMac);
          response.push(
            "Current MAC:   " + currentMac + " (unknown vendor)",
            "Permanent MAC: " + permanentMac + " (TP-Link Technologies)",
            "New MAC:       " + newRandomMac + " (spoofed random identity)",
            "[+] MAC address successfully changed on wlan0!"
          );
        } else if (commandLower.includes('-s')) {
          response.push(
            "Current MAC:   " + currentMac + (currentMac === permanentMac ? " (TP-Link Technologies)" : " [SPOOFED]"),
            "Permanent MAC: " + permanentMac + " (TP-Link Technologies)"
          );
        } else {
          response.push(
            "GNU MAC Changer",
            "Usage: macchanger [options] device",
            "  -s,  --show            Show current MAC address",
            "  -r,  --random          Set fully random MAC address",
            "  -p,  --permanent       Reset to original, permanent hardware MAC"
          );
        }
      } else if (commandLower === 'arp -a' || commandLower === 'arp') {
        response.push(
          "? (192.168.1.1) at 9c:5c:8e:f1:d3:c8 [ether] on wlan0 (Default Gateway Router)",
          "? (192.168.1.120) at a4:c3:61:5a:2e:99 [ether] on wlan0 (Target Laptop)",
          "? (10.0.2.2) at 52:54:00:12:35:02 [ether] on eth0 (VirtualBox Virtual Gateway)"
        );
      } else if (commandLower === 'uname -r') {
        response.push("6.12.0-kali1-amd64");
      } else if (commandLower === 'uname -a' || commandLower === 'uname') {
        response.push("Linux kali 6.12.0-kali1-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.12.9-1kali1 x86_64 GNU/Linux (Kernel Ring 0)");
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
        response.push(`bash: ${command}: command not found (type 'help' for available commands)`);
      }

      setTerminalHistory(prev => [...prev, ...response, ""]);
      setInputVal('');
    }
  };

  // Packet Animation trigger
  const runPacketTrace = () => {
    setPacketStep(1);
    setPacketDirection('forward');
    const timers = [
      setTimeout(() => setPacketStep(2), 1000), // transport
      setTimeout(() => setPacketStep(3), 2000), // network (IP)
      setTimeout(() => setPacketStep(4), 3000), // link (MAC)
      setTimeout(() => setPacketStep(5), 4000), // transit
      setTimeout(() => setPacketStep(6), 6500), // server received
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

  // Helper to classify an IP address
  const classifyIp = (ipStr) => {
    const clean = ipStr.trim();
    if (clean === '127.0.0.1' || clean.startsWith('127.')) {
      return { type: 'Loopback (Localhost)', rfc: 'RFC 1122', routable: 'No (Internal host only)', color: 'var(--accent-orange)' };
    }
    if (clean.startsWith('10.')) {
      return { type: 'Private IP (Class A)', rfc: 'RFC 1918', routable: 'No (Local Area Network only)', color: 'var(--accent-green)' };
    }
    if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(clean)) {
      return { type: 'Private IP (Class B)', rfc: 'RFC 1918', routable: 'No (Local Area Network only)', color: 'var(--accent-green)' };
    }
    if (clean.startsWith('192.168.')) {
      return { type: 'Private IP (Class C - Home/Office LAN)', rfc: 'RFC 1918', routable: 'No (Local Area Network only)', color: 'var(--accent-green)' };
    }
    if (clean.startsWith('169.254.')) {
      return { type: 'APIPA / Link-Local (DHCP Failure)', rfc: 'RFC 3927', routable: 'No (Local link only)', color: 'var(--accent-red)' };
    }
    if (/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(clean)) {
      return { type: 'Public IP (Internet Routable)', rfc: 'Global IANA Pool', routable: 'Yes (Globally routable on Internet)', color: 'var(--accent-cyan)' };
    }
    return { type: 'Custom / IPv6 String', rfc: 'Standard', routable: 'Varies', color: 'var(--text-secondary)' };
  };

  const ipInfo = classifyIp(inspectIp);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Header */}
      <div>
        <span className="sidebar-tag">SESSION 4 & 5</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Linux, MAC, IP & Network Architecture</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Kali Linux pairs standard POSIX utilities with raw packet drivers. Understanding the distinct roles of physical <strong>MAC Addresses (Layer 2)</strong> vs logical <strong>IP Addresses (Layer 3)</strong> is the foundation of network auditing, port scanning, and packet sniffing.
        </p>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('terminal')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeTab === 'terminal' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeTab === 'terminal' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          💻 INTERACTIVE BASH TERMINAL
        </button>
        <button
          onClick={() => setActiveTab('mac_ip')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeTab === 'mac_ip' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeTab === 'mac_ip' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🏷️ MAC VS IP ARCHITECTURE
        </button>
        <button
          onClick={() => setActiveTab('tracer')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeTab === 'tracer' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeTab === 'tracer' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          📡 TCP/IP ENCAPSULATION TRACER
        </button>
      </div>

      {/* Tab 1: Terminal View */}
      {activeTab === 'terminal' && (
        <div className="grid-2">
          {/* Terminal Simulator */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>💻 Kali GNU/Linux Shell</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>wlan0: {currentMac}</span>
            </div>
            <div className="terminal-window" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '380px' }}>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span className="terminal-title">kali@localhost: ~ (bash 5.2)</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>ROOT/USER</span>
              </div>

              <div className="terminal-content" style={{ height: '360px' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>Try: <code>macchanger -r wlan0</code>, <code>ifconfig</code>, <code>arp -a</code>, <code>uname -r</code></span>
              <span>Flag hint: <code>cat flag.txt</code></span>
            </div>
          </section>

          {/* Quick Command Reference Box */}
          <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>⚡ Network Command Cheat-Sheet</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
              These fundamental Linux terminal commands are run daily by security analysts to inspect network cards, routes, and identities:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>ifconfig / ip a</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '2px', fontFamily: 'var(--font-sans)' }}>
                  Lists all active Network Interface Cards (NICs), their assigned IP addresses, subnets, and hardware MAC addresses.
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--accent-orange)' }}>macchanger -r [interface]</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '2px', fontFamily: 'var(--font-sans)' }}>
                  Spoofs a completely randomized MAC address on your wireless card to prevent Wi-Fi tracking or bypass captive portal filters.
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: 'var(--accent-green)' }}>arp -a</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '2px', fontFamily: 'var(--font-sans)' }}>
                  Displays the kernel ARP cache table mapping local IP addresses (Layer 3) to physical MAC hardware addresses (Layer 2).
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: '#ff5f56' }}>uname -r</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '2px', fontFamily: 'var(--font-sans)' }}>
                  Outputs the exact Linux kernel version currently executing in CPU Ring 0 (e.g. <code>6.12.0-kali1-amd64</code>).
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab 2: MAC vs IP Architecture Deep Dive */}
      {activeTab === 'mac_ip' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Comparison Matrix */}
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h2 className="text-cyber-glow" style={{ fontSize: '1.3rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🏷️</span> MAC Address vs IP Address: The Fundamental Difference
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Every network packet requires <strong>both</strong> an IP address and a MAC address to reach its destination. Think of the <strong>IP address</strong> as your mailing address (where you live logically in the city), and the <strong>MAC address</strong> as your government fingerprint/DNA (your physical physical device identity).
            </p>

            <div className="grid-2">
              {/* MAC Box */}
              <div style={{ background: 'rgba(9, 13, 23, 0.7)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.15rem' }}>MAC Address (Media Access Control)</h3>
                  <span className="sidebar-tag" style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}>LAYER 2 (DATA LINK)</span>
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
                  A unique <strong>48-bit (6-byte)</strong> physical hardware identifier permanently burned into the Network Interface Card (NIC) EEPROM chip by the manufacturer during factory production.
                </p>
                <div style={{ background: '#05070c', padding: '12px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--accent-cyan)', marginBottom: '4px' }}>Structure: 48 Bits / 6 Hex Octets</div>
                  <div style={{ display: 'flex', gap: '6px', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--accent-orange)' }}>EC:08:6B</span>
                    <span>:</span>
                    <span style={{ color: 'var(--accent-green)' }}>1B:F8:A1</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <span style={{ color: 'var(--accent-orange)' }}>▲ OUI (Vendor: TP-Link)</span>
                    <span style={{ color: 'var(--accent-green)' }}>▲ NIC Serial Identifier</span>
                  </div>
                </div>
                <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Scope:</strong> Local Link Only. Routers strip off the MAC address and rewrite it on every hop!</li>
                  <li><strong>Spoofable?</strong> Yes! Operating systems load the MAC into RAM on boot; tools like <code>macchanger</code> overwrite this RAM value in milliseconds.</li>
                  <li><strong>Auditing role:</strong> Used by access points for MAC filtering and identifying target devices in airodump-ng.</li>
                </ul>
              </div>

              {/* IP Box */}
              <div style={{ background: 'rgba(9, 13, 23, 0.7)', border: '1px solid rgba(57, 255, 20, 0.3)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3 style={{ color: 'var(--accent-green)', fontSize: '1.15rem' }}>IP Address (Internet Protocol)</h3>
                  <span className="sidebar-tag" style={{ borderColor: 'var(--accent-green)', color: 'var(--accent-green)' }}>LAYER 3 (NETWORK)</span>
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
                  A <strong>logical routing address</strong> assigned by software, a network administrator, or automatically via a DHCP server. It allows packets to navigate through routers across the global internet.
                </p>
                <div style={{ background: '#05070c', padding: '12px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--accent-green)', marginBottom: '4px' }}>IPv4 Structure: 32 Bits / 4 Decimal Octets</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>
                    192 . 168 . 1 . 105
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Binary: 11000000.10101000.00000001.01101001 (0 to 255 per octet)
                  </div>
                </div>
                <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li><strong>Scope:</strong> End-to-End Internet Routing. Identifies source and destination machines across worldwide networks.</li>
                  <li><strong>Dynamic vs Static:</strong> Usually leased dynamically by a DHCP router using the 4-step <strong>DORA</strong> process (Discover, Offer, Request, Acknowledge).</li>
                  <li><strong>Auditing role:</strong> Targeted during Nmap port scans, reverse shell callbacks, and web application audits.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* RFC 1918 Private vs Public IP Guide */}
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
              🌐 Private vs Public IP Addresses (RFC 1918)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
              Because IPv4 has only ~4.3 billion possible addresses, RFC 1918 reserved three private IP ranges for internal LANs behind NAT (Network Address Translation) routers:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-cyan)' }}>
                    <th style={{ padding: '10px' }}>CLASS</th>
                    <th style={{ padding: '10px' }}>IP RANGE (RFC 1918)</th>
                    <th style={{ padding: '10px' }}>TOTAL HOSTS</th>
                    <th style={{ padding: '10px' }}>COMMON DEPLOYMENT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '10px', color: '#fff' }}>Class A</td>
                    <td style={{ padding: '10px', color: 'var(--accent-green)' }}>10.0.0.0 – 10.255.255.255</td>
                    <td style={{ padding: '10px' }}>16,777,216</td>
                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>Enterprise networks, cloud VPCs, VirtualBox internal networks</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '10px', color: '#fff' }}>Class B</td>
                    <td style={{ padding: '10px', color: 'var(--accent-green)' }}>172.16.0.0 – 172.31.255.255</td>
                    <td style={{ padding: '10px' }}>1,048,576</td>
                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>Universities, corporate subnets, Docker default bridges (172.17.x.x)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '10px', color: '#fff' }}>Class C</td>
                    <td style={{ padding: '10px', color: 'var(--accent-green)' }}>192.168.0.0 – 192.168.255.255</td>
                    <td style={{ padding: '10px' }}>65,536</td>
                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>Standard home Wi-Fi routers (192.168.1.1, 192.168.0.1)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', color: '#fff' }}>Loopback</td>
                    <td style={{ padding: '10px', color: 'var(--accent-orange)' }}>127.0.0.1 (127.0.0.0/8)</td>
                    <td style={{ padding: '10px' }}>Localhost</td>
                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>Self-referential loopback testing internal services on same machine</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Address Resolution Protocol (ARP) Explanation */}
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
              🌉 ARP (Address Resolution Protocol): The Bridge Between IP and MAC
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
              When your laptop wants to communicate with IP <code>192.168.1.1</code> on your local Wi-Fi, Ethernet and 802.11 Wi-Fi chips do not understand IP addresses directly. They need the physical <strong>MAC address</strong>!
            </p>
            <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: 'var(--accent-cyan)' }}>1. ARP Request (Broadcast): "Who has IP 192.168.1.1? Tell MAC ec:08:6b:1b:f8:a1!"</div>
              <div style={{ color: 'var(--accent-green)' }}>2. ARP Reply (Unicast): "I am 192.168.1.1, and my physical MAC address is 9c:5c:8e:f1:d3:c8!"</div>
              <div style={{ color: 'var(--accent-red)', marginTop: '4px' }}>
                ⚠️ SECURITY GOTCHA (ARP Spoofing / Poisoning): ARP has NO AUTHENTICATION! An attacker can send forged ARP replies claiming: <em>"I am the gateway router (192.168.1.1)!"</em>, redirecting all LAN traffic through their laptop for a Man-in-the-Middle (MitM) attack!
              </div>
            </div>
          </section>

          {/* Interactive Inspector Sandbox */}
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '12px' }}>
              🔍 Interactive IP & MAC Inspector Tool
            </h3>
            <div className="grid-2">
              {/* IP Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ENTER IP ADDRESS TO ANALYZE:</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={inspectIp}
                    onChange={(e) => setInspectIp(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontFamily: 'var(--font-mono)' }}
                  />
                  <button 
                    onClick={() => setInspectIp('8.8.8.8')}
                    className="cyber-button"
                    style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                  >
                    Google DNS
                  </button>
                  <button 
                    onClick={() => setInspectIp('10.0.2.15')}
                    className="cyber-button"
                    style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                  >
                    VM IP
                  </button>
                </div>
                <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  <div>CLASSIFICATION: <strong style={{ color: ipInfo.color }}>{ipInfo.type}</strong></div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>STANDARD: {ipInfo.rfc}</div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>INTERNET ROUTING: {ipInfo.routable}</div>
                </div>
              </div>

              {/* MAC Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ENTER MAC ADDRESS TO ANALYZE:</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={inspectMac}
                    onChange={(e) => setInspectMac(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontFamily: 'var(--font-mono)' }}
                  />
                  <button 
                    onClick={() => setInspectMac('00:0c:29:5f:3a:11')}
                    className="cyber-button"
                    style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                  >
                    VMware
                  </button>
                  <button 
                    onClick={() => setInspectMac('ff:ff:ff:ff:ff:ff')}
                    className="cyber-button"
                    style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                  >
                    Broadcast
                  </button>
                </div>
                <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  <div>OUI PREFIX (Bytes 1-3): <strong style={{ color: 'var(--accent-orange)' }}>{inspectMac.slice(0, 8)}</strong></div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                    NIC SERIAL (Bytes 4-6): <strong style={{ color: 'var(--accent-green)' }}>{inspectMac.slice(9) || 'N/A'}</strong>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                    FRAME TYPE: {inspectMac.toLowerCase() === 'ff:ff:ff:ff:ff:ff' ? '🚨 BROADCAST (Received by all hosts)' : 'UNICAST (Single recipient)'}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab 3: Encapsulation Tracer */}
      {activeTab === 'tracer' && (
        <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
          <div>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>
              📡 TCP/IP Encapsulation Tracer: How MAC and IP Wrap Together
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: '1.4' }}>
              When an application sends data across a network (like running <code>ping 8.8.8.8</code>), the OS encapsulates the packet layer by layer. At Layer 3, it wraps the payload with an <strong>IP Header</strong>. At Layer 2, it wraps that inside an <strong>Ethernet/Wi-Fi Frame</strong> containing the <strong>MAC Address</strong>!
            </p>

            <button 
              id="btn-trace-packet"
              onClick={runPacketTrace} 
              className="cyber-button"
              disabled={packetStep > 0}
              style={{ width: '100%', marginBottom: '24px' }}
            >
              {packetStep > 0 ? '📡 TRACING IN PROGRESS...' : '⚙️ TRIGGER PACKET TRACE (PING 8.8.8.8)'}
            </button>

            {/* Encapsulation Box Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Application Layer */}
              <div 
                style={{ 
                  border: `1px solid ${packetStep >= 1 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)'}`, 
                  background: packetStep >= 1 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.01)',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Layer 4: Application Layer</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>ICMP payload</span>
                </div>
                {packetStep >= 1 && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Data: "Echo Request" ping payload</span>}
              </div>

              {/* Transport Layer */}
              <div 
                style={{ 
                  border: `1px solid ${packetStep >= 2 ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)'}`, 
                  background: packetStep >= 2 ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255,255,255,0.01)',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Layer 3: Transport Layer</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>ICMP Type 8 / TCP / UDP</span>
                </div>
                {packetStep >= 2 && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Controls integrity (Port numbers, Checksums, Sequence identifiers)</span>}
              </div>

              {/* Network Layer */}
              <div 
                style={{ 
                  border: `1px solid ${packetStep >= 3 ? 'var(--accent-green)' : 'rgba(255,255,255,0.06)'}`, 
                  background: packetStep >= 3 ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255,255,255,0.01)',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span style={{ color: 'var(--accent-green)' }}>Layer 2: Network Layer (IP HEADER)</span>
                  <span style={{ color: 'var(--accent-green)' }}>Src: 192.168.1.105 ➔ Dest: 8.8.8.8</span>
                </div>
                {packetStep >= 3 && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Adds Layer 3 logical IP headers for multi-hop internet routing.</span>}
              </div>

              {/* Physical/Link Layer */}
              <div 
                style={{ 
                  border: `1px solid ${packetStep >= 4 ? 'var(--accent-orange)' : 'rgba(255,255,255,0.06)'}`, 
                  background: packetStep >= 4 ? 'rgba(255, 157, 0, 0.1)' : 'rgba(255,255,255,0.01)',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span style={{ color: 'var(--accent-orange)' }}>Layer 1: Data Link Layer (MAC FRAME)</span>
                  <span style={{ color: 'var(--accent-orange)' }}>Src MAC: ec:08:6b... ➔ Gateway MAC: 9c:5c:8e...</span>
                </div>
                {packetStep >= 4 && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Encapsulates packet in 802.11 / Ethernet frame with hardware NIC MAC addresses.</span>}
              </div>
            </div>
          </div>

          {/* Graphical Routing Path */}
          {packetStep >= 5 && (
            <div style={{ background: '#090d17', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                {/* Client node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.8rem' }}>💻</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>192.168.1.105</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)' }}>MAC: ec:08:6b...</span>
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
                  <span style={{ fontSize: '1.8rem' }}>📟</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>192.168.1.1</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent-orange)' }}>MAC: 9c:5c:8e...</span>
                </div>

                {/* Path line */}
                <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.1)', margin: '0 10px', position: 'relative' }}></div>

                {/* Server Node */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.8rem' }}>🌐</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>8.8.8.8 (Google)</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--accent-green)' }}>Global Public IP</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '14px', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {packetStep === 5 && packetDirection === 'forward' && "PING: Transporting frame to Gateway router via Layer 2 MAC..."}
                {packetStep === 5 && packetDirection === 'reverse' && "REPLY: Sending ICMP Echo Reply from Server back to Client..."}
                {packetStep === 6 && "SUCCESS: Server 8.8.8.8 accepted Echo Request."}
              </div>

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
      )}
    </div>
  );
}
