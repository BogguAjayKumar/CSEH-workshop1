import React, { useState } from 'react';

const HANDSHAKE_STEPS = [
  {
    step: 1,
    title: "1. AP Beacon & Association",
    sender: "ap",
    receiver: "client",
    packet: "802.11 Beacon Frame / Association Request",
    desc: "The Access Point (AP) continuously broadcasts beacon frames containing its SSID (network name) and security capabilities (WPA2/WPA3). The client detects the beacon and sends an Association Request to connect.",
    visual: {
      leftLabel: "Kali Client",
      rightLabel: "Access Point",
      arrowDir: "left-to-right",
      arrowLabel: "Association Request ➔",
      payload: "SSID: SecureWiFi | Auth: WPA2-PSK"
    }
  },
  {
    step: 2,
    title: "2. Message 1 (ANonce)",
    sender: "ap",
    receiver: "client",
    packet: "EAPOL-Key (ANonce)",
    desc: "The AP generates a cryptographically secure random number called the Authenticator Nonce (ANonce) and transmits it to the client. Note: The actual Wi-Fi password (PSK) is NEVER sent over the air.",
    visual: {
      leftLabel: "Kali Client",
      rightLabel: "Access Point",
      arrowDir: "right-to-left",
      arrowLabel: "📑 EAPOL Msg 1 (ANonce) ➔",
      payload: "ANonce: 0x9f3d2b... | (Password is hidden)"
    }
  },
  {
    step: 3,
    title: "3. Message 2 (SNonce + MIC)",
    sender: "client",
    receiver: "ap",
    packet: "EAPOL-Key (SNonce + MIC)",
    desc: "The client generates its own random number called SNonce. Using the SSID, PSK (password), SNonce, and ANonce, the client derives the encryption keys (PTK). It sends SNonce to the AP, plus a Message Integrity Code (MIC) to prove it knows the password.",
    visual: {
      leftLabel: "Kali Client",
      rightLabel: "Access Point",
      arrowDir: "left-to-right",
      arrowLabel: "📑 EAPOL Msg 2 (SNonce, MIC) ➔",
      payload: "SNonce: 0x5a1e8c... | MIC: Hash verified"
    }
  },
  {
    step: 4,
    title: "4. Message 3 (GTK + MIC)",
    sender: "ap",
    receiver: "client",
    packet: "EAPOL-Key (GTK + MIC)",
    desc: "The AP verifies the Client's MIC. If valid, the AP derives the same PTK. It then generates the Group Temporal Key (GTK) used to encrypt broadcast traffic, wraps it with the PTK, and sends it to the client along with its own MIC.",
    visual: {
      leftLabel: "Kali Client",
      rightLabel: "Access Point",
      arrowDir: "right-to-left",
      arrowLabel: "📑 EAPOL Msg 3 (GTK, MIC) ➔",
      payload: "GTK (Encrypted broadcast key) | AP MIC check"
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
      leftLabel: "Kali Client",
      rightLabel: "Access Point",
      arrowDir: "left-to-right",
      arrowLabel: "📑 EAPOL Msg 4 (Confirm ACK) ➔",
      payload: "Encryption ACTIVE | PMK & PTK fully loaded"
    }
  }
];

export default function WifiFundamentals() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = HANDSHAKE_STEPS[activeStep];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 7</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Wi-Fi Security Fundamentals</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Wireless networks broadcast packets through public airspace. Security protocols like WPA2 and WPA3 protect this data. To establish an encrypted session, the client and router complete a <strong>4-Way Handshake</strong> to verify passwords without actually exchanging them.
        </p>
      </div>

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
                <strong style={{ color: 'var(--text-primary)' }}>PMK (Pairwise Master Key):</strong> Derived directly from the Wi-Fi password (PSK) and the SSID hash. Represents the shared secret.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>PTK (Pairwise Transient Key):</strong> The unique session encryption key. Generated using: <code>PMK + ANonce + SNonce + Client MAC + AP MAC</code>.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>MIC (Message Integrity Code):</strong> A cryptographic hash validating that the packet headers were not tampered with and that the sender knows the PSK.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
