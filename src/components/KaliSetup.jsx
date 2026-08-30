import React, { useState } from 'react';

export default function KaliSetup() {
  const [step, setStep] = useState(1);
  const [vmName, setVmName] = useState('Kali-Security-Lab');
  const [ram, setRam] = useState(2048); // MB
  const [cores, setCores] = useState(2);
  const [networkType, setNetworkType] = useState('nat');
  const [booting, setBooting] = useState(false);
  const [bootLog, setBootLog] = useState([]);
  const [bootFinished, setBootFinished] = useState(false);

  const startBooting = () => {
    setBooting(true);
    setStep(4);
    const logs = [
      "Initializing VirtualBox Guest Additions...",
      "Allocating Guest Physical RAM...",
      `Loading boot disk image: Kali-Linux-2026-Live.iso`,
      "Starting Linux Kernel v6.12.0-amd64...",
      "Mounting root filesystem...",
      "Configuring network interface: eth0...",
      `Network interface mode: ${networkType.toUpperCase()}`,
      `Acquiring IP via DHCP... Done.`,
      "Starting display manager: LightDM...",
      "System fully operational. Ready for deployment."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setBootLog(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setBootFinished(true);
        }
      }, (index + 1) * 400);
    });
  };

  const resetWizard = () => {
    setStep(1);
    setVmName('Kali-Security-Lab');
    setRam(2048);
    setCores(2);
    setNetworkType('nat');
    setBooting(false);
    setBootLog([]);
    setBootFinished(false);
  };

  const getNetworkDescription = () => {
    switch (networkType) {
      case 'nat':
        return "⚡ NAT (Network Address Translation): Provides internet access to the VM by translating its packets. The VM is isolated from your host's local network (LAN) and cannot receive incoming connections from other devices on your LAN. Perfect for general secure web browsing.";
      case 'bridged':
        return "⚠️ Bridged Adapter: Connects the VM directly to your physical network interface. The VM will act as an independent machine on your home LAN and receive a dedicated IP address from your home router. This allows other local devices to see and connect to your VM. Highly useful for active testing but exposes the VM to local network vulnerabilities.";
      case 'hostonly':
        return "🔒 Host-Only Adapter: Creates an isolated internal network containing only the Host machine and the VM. No external internet access is permitted. Use this to construct safe sandbox testing environments where malware cannot escape or communicate with the internet.";
      default:
        return "";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 4</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Kali Linux & VM Setup</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          An ethical hacking lab requires an isolated operating environment. Kali Linux is a specialized Debian-based distribution packed with hundreds of built-in penetration testing tools. Using VirtualBox, you can safely run Kali without overwriting your host operating system.
        </p>
      </div>

      <div className="grid-2">
        {/* Left Column: VirtualBox Mock UI */}
        <div className="vm-wizard-window" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
          <div className="vm-wizard-titlebar">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              ⚙️ Oracle VM VirtualBox Manager
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
            </div>
          </div>

          <div className="vm-wizard-body" style={{ flex: 1 }}>
            {/* Step Sidebar */}
            {!booting && (
              <div className="vm-wizard-sidebar">
                <div className={`vm-step-indicator ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1. Profile</div>
                <div className={`vm-step-indicator ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2. HW Allocations</div>
                <div className={`vm-step-indicator ${step === 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>3. Network Mode</div>
                <div className={`vm-step-indicator ${step === 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>4. Deploy</div>
              </div>
            )}

            {/* Wizard Content */}
            <div className="vm-wizard-content">
              {step === 1 && (
                <div>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '16px' }}>Create Virtual Machine</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      VM Name
                      <input 
                        type="text" 
                        value={vmName} 
                        onChange={(e) => setVmName(e.target.value)}
                        style={{ width: '100%', padding: '8px', background: '#0e121a', border: '1px solid #384252', borderRadius: '4px', color: '#fff', marginTop: '6px', outline: 'none' }}
                      />
                    </label>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Operating System Type
                      <select style={{ width: '100%', padding: '8px', background: '#0e121a', border: '1px solid #384252', borderRadius: '4px', color: '#fff', marginTop: '6px', outline: 'none' }} disabled>
                        <option>Linux (Debian 64-bit) / Kali ISO</option>
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '16px' }}>Hardware Customization</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Base Memory (RAM)</span>
                        <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{ram} MB</span>
                      </div>
                      <input 
                        type="range" 
                        min="1024" 
                        max="8192" 
                        step="1024"
                        value={ram}
                        onChange={(e) => setRam(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                        <span>1024 MB</span>
                        <span>4096 MB</span>
                        <span>8192 MB</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Processor Cores</span>
                        <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{cores} CPU(s)</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="8" 
                        step="1"
                        value={cores}
                        onChange={(e) => setCores(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                        <span>1 CPU</span>
                        <span>4 CPUs</span>
                        <span>8 CPUs</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '16px' }}>Network Attachment</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setNetworkType('nat')} 
                        className={`cyber-button ${networkType === 'nat' ? 'active' : 'disabled'}`}
                        style={{ padding: '8px 12px', fontSize: '0.75rem', flex: 1 }}
                      >
                        NAT
                      </button>
                      <button 
                        onClick={() => setNetworkType('bridged')} 
                        className={`cyber-button ${networkType === 'bridged' ? 'active' : 'disabled'}`}
                        style={{ padding: '8px 12px', fontSize: '0.75rem', flex: 1 }}
                      >
                        Bridged
                      </button>
                      <button 
                        onClick={() => setNetworkType('hostonly')} 
                        className={`cyber-button ${networkType === 'hostonly' ? 'active' : 'disabled'}`}
                        style={{ padding: '8px 12px', fontSize: '0.75rem', flex: 1 }}
                      >
                        Host-Only
                      </button>
                    </div>
                    <div style={{ background: '#0e121a', border: '1px solid #2e3846', padding: '12px', borderRadius: '4px', minHeight: '100px' }}>
                      <p style={{ fontSize: '0.8rem', lineHeight: '1.4', color: 'var(--text-secondary)' }}>
                        {getNetworkDescription()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && booting && (
                <div style={{ background: '#030508', flex: 1, padding: '12px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#fff', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {bootFinished ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
                      <span style={{ fontSize: '2.5rem' }}>🐲</span>
                      <h4 className="text-cyber-glow" style={{ color: 'var(--accent-cyan)' }}>Kali Linux Ready</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', textAlign: 'center' }}>
                        Machine Name: {vmName} <br />
                        Memory: {ram} MB | CPUs: {cores} <br />
                        Network: {networkType.toUpperCase()}
                      </p>
                      <button 
                        id="btn-reboot-vm"
                        onClick={resetWizard} 
                        className="cyber-button green" 
                        style={{ padding: '6px 12px', fontSize: '0.7rem' }}
                      >
                        ⚡ Reconfigure VM
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', borderBottom: '1px solid rgba(0, 240, 255, 0.1)', paddingBottom: '8px' }}>
                        <div className="boot-spinner" style={{ margin: 0 }}></div>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>[ SYSTEM BOOTING ]</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', flex: 1 }}>
                        {bootLog.map((log, index) => (
                          <div key={index} style={{ color: log.startsWith('⚠️') ? 'var(--accent-orange)' : '#ccc' }}>
                            {log}
                          </div>
                        ))}
                        <div style={{ display: 'inline-block', width: '6px', height: '12px', background: 'var(--accent-green)', marginLeft: '4px', animation: 'pulse 1s infinite' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {!booting && (
                <div className="vm-wizard-actions">
                  {step > 1 && (
                    <button 
                      id="btn-wizard-back"
                      onClick={() => setStep(step - 1)} 
                      className="cyber-button disabled"
                      style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                    >
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button 
                      id="btn-wizard-next"
                      onClick={() => setStep(step + 1)} 
                      className="cyber-button"
                      style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                    >
                      Next
                    </button>
                  ) : (
                    <button 
                      id="btn-wizard-boot"
                      onClick={startBooting} 
                      className="cyber-button green"
                      style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                    >
                      Create & Boot VM
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visual Setup Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📋 Host VM Checklist
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>✔</span>
                <div>
                  <strong>Download Hypervisor:</strong> Get Oracle VirtualBox or VMware Workstation Player for your host system (Windows/macOS).
                </div>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>✔</span>
                <div>
                  <strong>Download OS:</strong> Retrieve the official pre-built Kali Linux VM file (OVA format) or installer ISO from <a href="https://kali.org" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>kali.org</a>.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>✔</span>
                <div>
                  <strong>Enable CPU Virtualization (VT-x/AMD-V):</strong> Enter your physical BIOS settings on host bootup and enable virtualization features; otherwise, VirtualBox will fail to run 64-bit guests.
                </div>
              </li>
            </ul>
          </section>

          <div className="alert-box">
            <span className="alert-icon">⚠️</span>
            <div className="alert-message">
              <strong>Caution:</strong> When running penetration tests on active networks, never set your VM network adapter to <strong>Bridged Mode</strong> unless you fully trust all devices on the LAN segment. Bridged Mode exposes your Kali VM's local services directly to host-level attacks.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
