import React, { useState } from 'react';

const ROADMAPS = {
  web: {
    title: "🌐 Web Application Security Track",
    steps: [
      {
        phase: 1,
        title: "Web Mechanics & OWASP Top 10",
        desc: "Master HTTP request-response headers, session management, cookies, and fundamental flaws like SQL Injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF)."
      },
      {
        phase: 2,
        title: "API Pentesting & Advanced Logic",
        desc: "Learn to audit REST/GraphQL APIs, locate Broken Object Level Authorization (BOLA), IDORs, and race conditions using interception proxies like Burp Suite."
      },
      {
        phase: 3,
        title: "Expert Accreditations & Auditing",
        desc: "Prepare for professional certificates like OSCP (Offensive Security Certified Professional) or eWPT (Certified Web Application Penetration Tester)."
      }
    ]
  },
  net: {
    title: "🖥️ Network Security & Active Directory",
    steps: [
      {
        phase: 1,
        title: "TCP/IP & Linux Architecture",
        desc: "Study routing tables, subnets, firewall rules, and gain absolute fluency in BASH administration and command line utilities."
      },
      {
        phase: 2,
        title: "Active Directory (AD) Pentesting",
        desc: "Learn internal network testing techniques: LLMNR poisoning, Kerberoasting, Pass-the-Hash, bloodhound routing, and domain admin takeover."
      },
      {
        phase: 3,
        title: "Red Teaming & Evasion",
        desc: "Develop advanced skills in AV/EDR evasion, memory injection, living-off-the-land techniques, and obtain certifications like OSEP or CRTO."
      }
    ]
  },
  re: {
    title: "⚙️ Reverse Engineering & Malware Analysis",
    steps: [
      {
        phase: 1,
        title: "Assembly & C Programming",
        desc: "Understand CPU registers, stack operations, memory layout, and write low-level code to recognize compiled structures."
      },
      {
        phase: 2,
        title: "Static & Dynamic Analysis",
        desc: "Use decompilers (Ghidra, IDA Pro) and debuggers (x64dbg, GDB) to unpack binaries, analyze control flow, and study execution paths."
      },
      {
        phase: 3,
        title: "Exploit Development & Kernel Audit",
        desc: "Learn buffer overflows, return-oriented programming (ROP), bypass DEP/ASLR, and analyze advanced kernel vulnerability primitives."
      }
    ]
  }
};

export default function Wrapup() {
  const [selectedTrack, setSelectedTrack] = useState('web');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 11</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Wrap-up & What's Next</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Congratulations on completing the foundational sessions! You have set up a virtual environment, explored Bash networking commands, studied wireless encryption exchanges, and solved security challenges.
        </p>
      </div>

      <div className="grid-2">
        {/* Interactive Career Track Selector */}
        <section className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '14px' }}>
            🗺️ Generate Career Learning Path
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            Choose a sub-discipline in cyber security to generate a personalized learning roadmap.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <button 
              id="btn-track-web"
              onClick={() => setSelectedTrack('web')}
              className={`cyber-button ${selectedTrack === 'web' ? 'active' : 'disabled'}`}
              style={{ justifyContent: 'flex-start' }}
            >
              🌐 Web App Penetration Testing
            </button>
            <button 
              id="btn-track-net"
              onClick={() => setSelectedTrack('net')}
              className={`cyber-button ${selectedTrack === 'net' ? 'active' : 'disabled'}`}
              style={{ justifyContent: 'flex-start' }}
            >
              🖥️ Network & Active Directory Audit
            </button>
            <button 
              id="btn-track-re"
              onClick={() => setSelectedTrack('re')}
              className={`cyber-button ${selectedTrack === 're' ? 'active' : 'disabled'}`}
              style={{ justifyContent: 'flex-start' }}
            >
              ⚙️ Reverse Engineering & Malware Analysis
            </button>
          </div>

          <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px' }}>
            <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '12px' }}>{ROADMAPS[selectedTrack].title}</h4>
            <div className="roadmap-timeline">
              {ROADMAPS[selectedTrack].steps.map((step) => (
                <div key={step.phase} className="roadmap-step">
                  <div className="roadmap-circle">{step.phase}</div>
                  <div className="roadmap-card">
                    <h5 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '4px' }}>{step.title}</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: References & Training Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>🛡️ Recommended Training Labs</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li>
                🚀 <strong style={{ color: 'var(--text-primary)' }}>TryHackMe:</strong> A gamified platform providing bite-sized labs on beginner-friendly tools, network mapping, and system hacking. Excellent for entry-level study.
              </li>
              <li>
                🚀 <strong style={{ color: 'var(--text-primary)' }}>HackTheBox:</strong> Offers more advanced, stand-alone vulnerable virtual machines. Focuses heavily on network pivot exploration and Active Directory.
              </li>
              <li>
                🚀 <strong style={{ color: 'var(--text-primary)' }}>PortSwigger Web Academy:</strong> The gold-standard of free web application security labs, created by the authors of Burp Suite.
              </li>
            </ul>
          </section>

          <section className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>🎖️ Core Cybersecurity Certificates</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <li>
                <strong>OSCP (Offensive Security Certified Professional):</strong> The industry benchmark. Tests network penetration testing in a hands-on, 24-hour exam.
              </li>
              <li>
                <strong>CEH (Certified Ethical Hacker):</strong> Focuses on broad methodology, terminal command familiarity, and theoretical vulnerability definitions.
              </li>
              <li>
                <strong>Security+ (CompTIA):</strong> An excellent entry-level exam covering global defensive architecture, cryptography theory, and audit rules.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
