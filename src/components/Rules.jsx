import React, { useState } from 'react';

const SCENARIOS = [
  {
    id: 1,
    text: "Scanning a local hospital's network to find vulnerable databases without signing any contract or receiving written permission.",
    category: 'malicious',
    explanation: "Even if you don't intend to steal data, scanning systems without explicit authorization is illegal. You could crash critical hospital devices (e.g. medical IoT) and leave yourself open to criminal prosecution."
  },
  {
    id: 2,
    text: "Testing a public web application's login interface, identifying an IDOR vulnerability, and privately disclosing it via their official Vulnerability Disclosure Program (VDP).",
    category: 'ethical',
    explanation: "This follows ethical guidelines. You worked within the boundaries of their published disclosure program, reported it privately, and did not exploit it or leak customer data."
  },
  {
    id: 3,
    text: "Launching a continuous Deauthentication attack against a competitor's office Wi-Fi network to disconnect their employees and disrupt their sales calls.",
    category: 'malicious',
    explanation: "This is a Denial of Service (DoS) attack. It is illegal, causes financial harm, and constitutes malicious sabotage."
  },
  {
    id: 4,
    text: "Setting up a custom Wi-Fi honeypot (Evil Twin) in a local café to sniff usernames and passwords of unsuspecting customers.",
    category: 'malicious',
    explanation: "Intercepting communication and capturing credentials without consent is wiretapping and identity theft, which are severe federal offenses."
  },
  {
    id: 5,
    text: "Running a network port scanner (like Nmap) on your own home wireless router to check which services are running and disable unused ports.",
    category: 'ethical',
    explanation: "Since you own the network and devices, you have full authority to scan and secure them. This is a recommended practice to maintain secure environments."
  }
];

export default function Rules({ onCompleteFlag }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSelect = (category) => {
    const currentScenario = SCENARIOS[currentIndex];
    const isCorrect = currentScenario.category === category;
    
    setSelections(prev => ({
      ...prev,
      [currentScenario.id]: {
        chosen: category,
        correct: isCorrect
      }
    }));

    if (isCorrect) {
      setFeedbackMsg('✅ CORRECT! ' + currentScenario.explanation);
    } else {
      setFeedbackMsg('❌ INCORRECT! ' + currentScenario.explanation);
    }

    // Move next or complete after 2.5s to let them read feedback, or immediately
  };

  const handleNext = () => {
    setFeedbackMsg('');
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      // Check if all were correct
      const allCorrect = SCENARIOS.every(s => selections[s.id]?.correct);
      if (allCorrect && onCompleteFlag) {
        onCompleteFlag('FLAG{ETH1CAL_GAT3K33P3R}');
      }
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelections({});
    setShowResults(false);
    setFeedbackMsg('');
  };

  const currentScenario = SCENARIOS[currentIndex];
  const totalScenarios = SCENARIOS.length;
  const progressPercent = Math.round((Object.keys(selections).length / totalScenarios) * 100);

  const correctCount = Object.values(selections).filter(s => s.correct).length;
  const isPerfect = correctCount === totalScenarios;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 3</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Ethical & Legal Boundaries</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Understanding legal boundaries prevents white hats from crossing over to the dark side. In the field, you must ALWAYS secure a signed <strong>Rules of Engagement (RoE)</strong> contract prior to conducting scans or audits.
        </p>
      </div>

      {!showResults ? (
        <section className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem' }}>
              Scenario Evaluator ({currentIndex + 1} of {totalScenarios})
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
              Progress: {progressPercent}%
            </span>
          </div>

          <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '24px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPercent}%`, background: 'var(--accent-cyan)', boxShadow: 'var(--glow-cyan)', transition: 'width 0.3s ease' }}></div>
          </div>

          <div style={{ background: 'rgba(9, 13, 23, 0.6)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative' }}>
            <p style={{ fontSize: '1.05rem', textAlign: 'center', lineHeight: '1.6' }}>
              "{currentScenario.text}"
            </p>
          </div>

          {/* Buttons for Selection */}
          {!feedbackMsg ? (
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                id="btn-choice-ethical"
                onClick={() => handleSelect('ethical')}
                className="cyber-button green"
                style={{ flex: 1, padding: '16px' }}
              >
                ⚖️ Ethical & Legal
              </button>
              <button 
                id="btn-choice-malicious"
                onClick={() => handleSelect('malicious')}
                className="cyber-button red"
                style={{ flex: 1, padding: '16px' }}
              >
                ⚠️ Malicious & Illegal
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div 
                style={{ 
                  padding: '16px', 
                  borderRadius: '6px', 
                  background: selections[currentScenario.id]?.correct ? 'rgba(57,255,20,0.08)' : 'rgba(255,42,95,0.08)',
                  border: `1px solid ${selections[currentScenario.id]?.correct ? 'var(--accent-green)' : 'var(--accent-red)'}`,
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}
              >
                {feedbackMsg}
              </div>
              <button 
                id="btn-next-scenario"
                onClick={handleNext}
                className="cyber-button"
                style={{ alignSelf: 'flex-end', minWidth: '150px' }}
              >
                Next Scenario ➔
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: '4rem' }}>{isPerfect ? '🎓' : '⚙️'}</span>
          <h2 className="text-cyber-glow" style={{ margin: '16px 0 8px 0', fontSize: '1.5rem' }}>
            {isPerfect ? 'Master of Security Law' : 'Evaluation Completed'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            You scored <strong>{correctCount} / {totalScenarios}</strong> correct classifications.
          </p>

          {isPerfect ? (
            <div style={{ background: 'rgba(57,255,20,0.08)', border: '1px solid var(--accent-green)', borderRadius: '8px', padding: '20px', maxWidth: '500px', margin: '0 auto 24px auto', boxShadow: 'var(--glow-green)' }}>
              <h4 style={{ color: 'var(--accent-green)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>★ FLAG UNLOCKED ★</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '10px' }}>
                You successfully avoided crossing legal lines and demonstrated precise judgement!
              </p>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', letterSpacing: '1px', fontSize: '1.1rem', color: 'var(--accent-green)' }}>
                FLAG{'{'}ETH1CAL_GAT3K33P3R{'}'}
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--accent-orange)', marginBottom: '24px', fontSize: '0.9rem' }}>
              Tip: Reset and get 100% correct to unlock the workshop completion flag.
            </p>
          )}

          <button 
            id="btn-reset-rules"
            onClick={resetGame} 
            className="cyber-button" 
            style={{ margin: '0 auto' }}
          >
            🔄 Reset Sorting Board
          </button>
        </section>
      )}
    </div>
  );
}
