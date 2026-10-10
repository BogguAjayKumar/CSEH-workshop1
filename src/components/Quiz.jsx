import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: "Which component of the CIA Triad is compromised when a hacker intercepts an unencrypted plaintext packet across Wi-Fi and reads private communications?",
    options: [
      { text: "Integrity", isCorrect: false },
      { text: "Confidentiality", isCorrect: true },
      { text: "Availability", isCorrect: false },
      { text: "Authenticity", isCorrect: false }
    ],
    explanation: "Confidentiality guarantees that only authorized individuals can access the information. Reading intercepted plaintext compromises confidentiality."
  },
  {
    id: 2,
    question: "What is the critical distinction between a 'Vulnerability' and an 'Exploit'?",
    options: [
      { text: "A vulnerability is malicious code, while an exploit is an operating system feature.", isCorrect: false },
      { text: "A vulnerability is a flaw or weakness in software/design, while an exploit is the targeted tool or code that takes advantage of that flaw.", isCorrect: true },
      { text: "An exploit is tracked by CVE numbers, while vulnerabilities are written by hackers.", isCorrect: false },
      { text: "Vulnerabilities only exist on hardware, whereas exploits only affect web browsers.", isCorrect: false }
    ],
    explanation: "A vulnerability is the passive flaw, loophole, or weakness (e.g. an unlocked window). An exploit is the active code or technique engineered to take advantage of that vulnerability (e.g. the ladder used to climb inside)."
  },
  {
    id: 3,
    question: "In computer architecture, why do hackers and rootkits attempt to achieve 'Ring 0' execution instead of Ring 3?",
    options: [
      { text: "Ring 0 is the User Space mode where web browsers run with highest speed.", isCorrect: false },
      { text: "Ring 0 is the Kernel Space mode with unrestricted access to physical hardware, memory, and CPU execution.", isCorrect: true },
      { text: "Ring 0 automatically encrypts the victim's hard drive using AES-256.", isCorrect: false },
      { text: "Ring 0 bypasses physical electricity power requirements.", isCorrect: false }
    ],
    explanation: "CPU Ring 0 is the Kernel/Supervisor mode. It has unrestricted access to all physical memory and hardware. In contrast, standard user applications run restricted in Ring 3 and must use system calls."
  },
  {
    id: 4,
    question: "Which statement accurately describes the difference between a MAC address and an IP address?",
    options: [
      { text: "MAC addresses route globally across the internet; IP addresses are burned into hardware chips.", isCorrect: false },
      { text: "MAC addresses are Layer 2 physical 48-bit hardware identifiers; IP addresses are Layer 3 logical 32/128-bit routing addresses.", isCorrect: true },
      { text: "MAC addresses change every time you reboot; IP addresses can never be modified.", isCorrect: false },
      { text: "MAC addresses are only used on Ethernet cables, while IP addresses are only used on Wi-Fi.", isCorrect: false }
    ],
    explanation: "MAC addresses exist at Layer 2 (Data Link) as 48-bit physical hardware IDs for local link delivery. IP addresses operate at Layer 3 (Network) as logical routing addresses for multi-hop internet communication."
  },
  {
    id: 5,
    question: "Why must penetration testers run 'airmon-ng check kill' before putting a wireless card into Monitor Mode?",
    options: [
      { text: "To delete all temporary files and virus signatures from the Kali Linux disk.", isCorrect: false },
      { text: "To terminate background managers (like NetworkManager & wpa_supplicant) that would otherwise reset the Wi-Fi card channel or force it back to Managed mode.", isCorrect: true },
      { text: "To increase the transmission power of the wireless antenna past legal limits.", isCorrect: false },
      { text: "To automatically crack the Wi-Fi password in the background.", isCorrect: false }
    ],
    explanation: "'airmon-ng check kill' kills background daemons (NetworkManager, wpa_supplicant, dhclient). If left running, these services interfere with the card, constantly changing channels or snatching the interface out of monitor mode."
  },
  {
    id: 6,
    question: "In the 2.4 GHz Wi-Fi spectrum, why are Channels 1, 6, and 11 considered the standard deployment channels?",
    options: [
      { text: "They transmit at twice the electrical wattage of other channels.", isCorrect: false },
      { text: "They are the only three 20 MHz channels that do not overlap or cause co-channel interference with each other in North America.", isCorrect: true },
      { text: "They are reserved exclusively for government and military emergency broadcasts.", isCorrect: false },
      { text: "Channels 2 through 5 are blocked by hardware manufacturers.", isCorrect: false }
    ],
    explanation: "2.4 GHz channels are 20 MHz wide but spaced only 5 MHz apart. Channels 1 (2412 MHz), 6 (2437 MHz), and 11 (2462 MHz) are spaced far enough apart to provide zero frequency overlap."
  },
  {
    id: 7,
    question: "Why is WPA2 vulnerable to Deauthentication (Deauth) frame spoofing, and what protocol resolves this flaw?",
    options: [
      { text: "WPA2 passwords are only 4 characters; resolved by WEP.", isCorrect: false },
      { text: "WPA2 transmits management frames in plaintext without cryptographic authentication; resolved by IEEE 802.11w (PMF) in WPA3.", isCorrect: true },
      { text: "WPA2 does not support antennas; resolved by dual-band routers.", isCorrect: false },
      { text: "Deauthentication frames are blocked by all home routers automatically.", isCorrect: false }
    ],
    explanation: "In original 802.11/WPA2, management frames (including deauthentication) were unencrypted and unauthenticated, allowing spoofing. IEEE 802.11w Protected Management Frames (PMF), mandatory in WPA3, cryptographically signs management frames to prevent spoofing."
  },
  {
    id: 8,
    question: "During a WPA2 4-Way Handshake, which key is derived using PMK + ANonce + SNonce + Client MAC + AP BSSID to encrypt unicast traffic?",
    options: [
      { text: "GTK (Group Temporal Key)", isCorrect: false },
      { text: "PTK (Pairwise Transient Key)", isCorrect: true },
      { text: "WEP Key", isCorrect: false },
      { text: "PIN Code", isCorrect: false }
    ],
    explanation: "The PTK (Pairwise Transient Key) is uniquely generated for each client session by combining the PMK (derived from the password), the AP's ANonce, the client's SNonce, and both MAC/BSSID addresses."
  }
];

export default function Quiz({ onCompleteFlag }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (optionIndex, isCorrect) => {
    if (answered) return;
    setSelectedOptionIndex(optionIndex);
    setAnswered(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < QUESTIONS.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOptionIndex(null);
      setAnswered(false);
    } else {
      setQuizFinished(true);
      const isLastCorrect = QUESTIONS[currentQuestionIndex].options[selectedOptionIndex]?.isCorrect;
      const finalTotal = score + (isLastCorrect ? 1 : 0);
      if (finalTotal === QUESTIONS.length) {
        if (onCompleteFlag) {
          onCompleteFlag('FLAG{QUIZ_MASTER_SECURED}');
        }
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setQuizFinished(false);
    setAnswered(false);
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex) / QUESTIONS.length) * 100;
  const finalScore = score;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <span className="sidebar-tag">SESSION 8</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Cybersecurity Knowledge Validation</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Test your comprehension of the concepts covered in this workshop: Vulnerabilities vs Exploits, Kernel Rings, MAC vs IP, Airmon-ng, Wi-Fi Channels, Deauth attacks, and Handshakes. Achieving a perfect score ({QUESTIONS.length}/{QUESTIONS.length}) will unlock the Quiz Master flag!
        </p>
      </div>

      {!quizFinished ? (
        <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Progress bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
              <span>QUESTION {currentQuestionIndex + 1} OF {QUESTIONS.length}</span>
              <span>{Math.round(progressPercent)}% COMPLETE</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'var(--accent-cyan)', transition: 'width 0.3s ease', boxShadow: 'var(--glow-cyan)' }} />
            </div>
          </div>

          {/* Question Text */}
          <div style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)', lineHeight: '1.5', margin: '10px 0' }}>
            {currentQuestion.question}
          </div>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentQuestion.options.map((option, idx) => {
              let buttonStyle = {
                width: '100%',
                padding: '14px 20px',
                textAlign: 'left',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                cursor: answered ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              };

              let icon = '○';

              if (answered) {
                if (option.isCorrect) {
                  buttonStyle.background = 'rgba(57, 255, 20, 0.08)';
                  buttonStyle.borderColor = 'var(--accent-green)';
                  buttonStyle.boxShadow = '0 0 10px rgba(57,255,20,0.1)';
                  icon = '🟢';
                } else if (idx === selectedOptionIndex) {
                  buttonStyle.background = 'rgba(255, 42, 95, 0.08)';
                  buttonStyle.borderColor = 'var(--accent-red)';
                  buttonStyle.boxShadow = '0 0 10px rgba(255,42,95,0.1)';
                  icon = '🔴';
                } else {
                  buttonStyle.opacity = 0.5;
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx, option.isCorrect)}
                  style={buttonStyle}
                  disabled={answered}
                  className={!answered ? "cyber-quiz-option" : ""}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: option.isCorrect && answered ? 'var(--accent-green)' : (idx === selectedOptionIndex && answered ? 'var(--accent-red)' : 'var(--accent-cyan)') }}>
                    {icon}
                  </span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation & Action Panel */}
          {answered && (
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.3s ease' }}>
              <div className="glass-panel" style={{ padding: '16px', borderLeft: `3px solid ${currentQuestion.options[selectedOptionIndex]?.isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'}`, background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ fontWeight: 'bold', color: currentQuestion.options[selectedOptionIndex]?.isCorrect ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
                  {currentQuestion.options[selectedOptionIndex]?.isCorrect ? '✓ ACCESS GRANTED - CORRECT ANSWER' : '✗ ACCESS DENIED - SYSTEM DETAILS BELOW'}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {currentQuestion.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="cyber-button"
                style={{ alignSelf: 'flex-end', padding: '10px 24px', background: 'var(--accent-cyan)', color: 'var(--bg-dark)', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
              >
                {currentQuestionIndex + 1 < QUESTIONS.length ? 'NEXT QUESTION >>' : 'FINISH QUIZ >>'}
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px', borderColor: finalScore === QUESTIONS.length ? 'var(--accent-green)' : 'var(--border-color)', boxShadow: finalScore === QUESTIONS.length ? 'var(--glow-green)' : 'none' }}>
          <div>
            <span style={{ fontSize: '4rem' }}>{finalScore === QUESTIONS.length ? '🏆' : '🔍'}</span>
            <h2 className="text-cyber-glow" style={{ fontSize: '1.8rem', marginTop: '15px', color: finalScore === QUESTIONS.length ? 'var(--accent-green)' : 'var(--text-primary)' }}>
              {finalScore === QUESTIONS.length ? 'PERFECT SECURE SCORE!' : 'VALIDATION COMPLETED'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px', maxWidth: '500px' }}>
              {finalScore === QUESTIONS.length 
                ? 'Outstanding work! You have answered all questions correctly and demonstrated deep mastery of cybersecurity, OS kernels, wireless protocols, and ethical hacking.'
                : `You scored ${finalScore} out of ${QUESTIONS.length}. A perfect score is required to unlock the final quiz flag.`}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '30px', margin: '10px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>SCORE</span>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: finalScore === QUESTIONS.length ? 'var(--accent-green)' : 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {finalScore} / {QUESTIONS.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>ACCURACY</span>
              <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: finalScore === QUESTIONS.length ? 'var(--accent-green)' : 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>
                {Math.round((finalScore / QUESTIONS.length) * 100)}%
              </span>
            </div>
          </div>

          {finalScore === QUESTIONS.length ? (
            <div style={{ background: 'rgba(57, 255, 20, 0.05)', border: '1px solid var(--accent-green)', padding: '16px 24px', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-green)', maxWidth: '450px', width: '100%' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>🎁 QUIZ FLAG REVEALED:</div>
              <div style={{ fontSize: '1.1rem', letterSpacing: '1px' }}>FLAG{'{'}QUIZ_MASTER_SECURED{'}'}</div>
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>
              💡 Hint: Review the modules on Vulnerabilities vs Exploits, Kernel Ring 0, MAC vs IP, Airmon-ng, and Deauth attacks!
            </p>
          )}

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handleRetry}
              className="cyber-button"
              style={{ padding: '12px 24px', border: '1px solid var(--accent-cyan)', background: 'transparent', color: 'var(--accent-cyan)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >
              🔄 RETRY VALIDATION
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
