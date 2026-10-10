import React, { useState } from 'react';

// Web Audio synth for Tollywood Blockbuster Sound Effects
const playMovieThemeSound = (movieKey) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (movieKey === 'baahubali') {
      // Royal Mahishmati brass horn fanfare
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.55);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (movieKey === 'salaar') {
      // Heavy Khansaar industrial bass impact
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.5);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.55);
    } else if (movieKey === 'beast') {
      // Tactical gun cock & electronic pulse
      osc.type = 'square';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (movieKey === 'nani') {
      // Anirudh Ravichander style heavy electric bass riff + raw tribal percussion
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.35);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch {
    // audio fallback
  }
};

const MOVIE_MASTERS = {
  baahubali: {
    id: 'baahubali',
    name: 'Baahubali: Mahishmati Kingdom',
    character: 'Amarendra Baahubali',
    actor: 'Prabhas (Dir: S.S. Rajamouli)',
    icon: '👑',
    themeColor: '#ffd700',
    accentGlow: 'rgba(255, 215, 0, 0.4)',
    badge: 'MAHISHMATI ROYAL SOVEREIGNTY',
    tagline: 'The Supreme Commander of the Throne',
    punchline: "Amarendra Baahubali ane nenu... Mahishmati samrajyam lo shasanale kaadhu, physical hardware ni shasinche Ring 0 authority naade!",
    osConcept: "The entire Mahishmati Kingdom Administration run by Queen Mother Sivagami! It manages the royal treasury, allocates rations to granaries, dispatches messenger pigeons, and schedules shifts for 50,000 soldiers. Without the Royal Court (OS), the kingdom falls into total chaos!",
    osMetaphor: "The Mahishmati Royal Governance & Civil Administration",
    kernelConcept: "Amarendra Baahubali & Katappa holding the Royal Sword at the innermost palace sanctum (Ring 0)! The Kernel is the only entity with direct, unrestricted physical authority to draw weapons from the royal armory, order catapults, and operate fort gates. Commoners in the market cannot touch royal weapons directly—they must submit a petition (System Call / syscall) to Baahubali!",
    kernelMetaphor: "The Supreme Commander at the Royal Sanctum (Ring 0)",
    hackersTarget: "Why do Bhallaladeva and Bijjaladeva scheme to compromise Katappa and Baahubali? Because if an assassin kills a merchant in the market (User Space crash), the kingdom stands. But if you compromise the Supreme Commander (Kernel Root Exploit), you seize the throne, command the entire royal army, and rewrite the laws of Mahishmati!",
    responsibilities: [
      { name: "Process & CPU Scheduling", icon: "⚔️", scene: "Baahubali assigning frontline battlegroups and chariot squads against 100,000 Kalakeyas." },
      { name: "Memory Management (RAM)", icon: "🏛️", scene: "Allocating separate palace storehouses so one minister cannot plunder another minister's grain." },
      { name: "File System (VFS)", icon: "📜", scene: "The Royal Archives where treaties, decrees, and land records are sealed with the Mahishmati royal stamp." },
      { name: "Device Drivers & I/O", icon: "🐘", scene: "Catapult operators and elephant handlers translating royal hand signals into devastating mechanical strikes." },
      { name: "User Security & Shell", icon: "🛡️", scene: "Palace gate sentries demanding the royal insignia seal before permitting entry to inner chambers." }
    ],
    ringAnalogies: {
      0: "Ring 0 (The Throne Room & Baahubali's Sword): Direct execution authority over all kingdom assets. Absolute privilege.",
      1: "Rings 1 & 2 (Royal Governors & Palace Guards): Intermediate supervisors protecting the throne room.",
      3: "Ring 3 (Marketplace & Civilians): Citizens, dancers, merchants. Isolated and peaceful; must petition through syscalls to access royal resources."
    }
  },
  salaar: {
    id: 'salaar',
    name: 'Salaar: Ceasefire in Khansaar',
    character: 'Deva (Salaar)',
    actor: 'Prabhas (Dir: Prashanth Neel)',
    icon: '⚔️',
    themeColor: '#ff2a5f',
    accentGlow: 'rgba(255, 42, 95, 0.4)',
    badge: 'KHANSAAR CEASEFIRE ENGINE',
    tagline: 'The Lethal Machine at the Core',
    punchline: "Please I request... Don't touch the Kernel! Nenu trigger aithe Ring 0 nunchi Ring 3 daka evvaru aagaru!",
    osConcept: "The autonomous city-state of Khansaar with its 3-tier sultanate governance! The OS manages the 8 fortified gates, the surveillance watchtowers, fuel lines, voting seals, and tribal territories so the city functions as an impenetrable fortress.",
    osMetaphor: "The Fortified Khansaar City Infrastructure & Sultanate Machinery",
    kernelConcept: "Deva (Salaar) slumbering at the innermost core! Loaded first, Deva has direct, unrestricted physical force over every heavy machine gun, blade, and checkpoint gate. The voting council debates in User Space (Ring 3), but when the emergency siren wails, Deva operates at Ring 0 with unchallengeable lethal authority.",
    kernelMetaphor: "Deva's Unstoppable Physical Authority at Ring 0",
    hackersTarget: "Why do rival tribes plot to tamper with the Ceasefire Machine? Because breaking a window in a border tavern (User Space) does nothing. But triggering a flaw in the Ceasefire Machine (Kernel Exploit) bypasses all tribal laws, silences all alarms, and hands root control of Khansaar's arsenal to the attacker!",
    responsibilities: [
      { name: "Process & CPU Scheduling", icon: "⚡", scene: "The Khansaar war room deploying heavy assault convoys across multiple gates simultaneously." },
      { name: "Memory Management (RAM)", icon: "🔒", scene: "Isolating the underground gold refineries so no rival chieftain can cross the boundary lines." },
      { name: "File System (VFS)", icon: "🗝️", scene: "The Khansaar charter codex and encrypted gate keys governing border transit permissions." },
      { name: "Device Drivers & I/O", icon: "💥", scene: "Custom electronic triggers translating machine gun levers into synchronized artillery fire." },
      { name: "User Security & Shell", icon: "🪓", scene: "The tribal voting tokens and biometric tattoo scanners granting sovereign command." }
    ],
    ringAnalogies: {
      0: "Ring 0 (The Ceasefire Core & Deva): The inner sanctum with raw military hardware power.",
      1: "Rings 1 & 2 (Tribal Chieftain Guard Posts): Perimeter border monitoring checkpoints.",
      3: "Ring 3 (Khansaar Town Residents & Workers): Standard inhabitants operating under strict sandboxed rules."
    }
  },
  beast: {
    id: 'beast',
    name: 'Beast: East Coast Mall Siege',
    character: 'Veeraraghavan',
    actor: 'Thalapathy Vijay (Dir: Nelson)',
    icon: '🦅',
    themeColor: '#00f0ff',
    accentGlow: 'rgba(0, 240, 255, 0.4)',
    badge: 'RAW SPECIAL OPS // MEANER LEANER STRONGER',
    tagline: 'The Master Override Specialist',
    punchline: "I am not a politician, I am a soldier! User space lo civilians and shopping shops unnayi... control room lo unna nene KERNEL!",
    osConcept: "The sprawling East Coast Mega Mall with hundreds of stores, movie theaters, food courts, escalators, and HVAC climate control! The OS coordinates customer foot traffic, store leases, security cameras, and electricity flow across all 6 floors.",
    osMetaphor: "The East Coast Mega Mall Infrastructure & Central Facility Operations",
    kernelConcept: "RAW Agent Veeraraghavan inside the security control room and ventilation ducts! Veera has the master override key to the mall's power breakers, emergency shutters, and tactical weapon caches. Civilian shoppers (User Space apps) cannot disable fire alarms; they must send distress signals (syscalls) to Veera!",
    kernelMetaphor: "Veeraraghavan with Master Security Override at Ring 0",
    hackersTarget: "Why does terrorist boss Umar Farooq try to hack the central control room? Because hijacking a perfume shop on the 2nd floor (User Space) changes nothing. But gaining control of Veeraraghavan's master override terminal (Kernel Exploit) seals all exits, cuts off military comms, and locks down the entire mall under terrorist control!",
    responsibilities: [
      { name: "Process & CPU Scheduling", icon: "🎯", scene: "Veera synchronizing sniper fire, flashbangs, and hostage evacuations across three different wings." },
      { name: "Memory Management (RAM)", icon: "🏬", scene: "Partitioning secure hostage holding zones so terrorists cannot track civilian locations." },
      { name: "File System (VFS)", icon: "📋", scene: "The mall blueprint schematics, tenant access badges, and surveillance archive logs." },
      { name: "Device Drivers & I/O", icon: "🕹️", scene: "Translating control room console keystrokes into motorized roll-down blast doors and sprinkler triggers." },
      { name: "User Security & Shell", icon: "🎖️", scene: "The biometric security vault and RAW military clearance protocols overriding civilian locks." }
    ],
    ringAnalogies: {
      0: "Ring 0 (The Master Security Control Room & Veera): Complete command over the entire facility's physical systems.",
      1: "Rings 1 & 2 (Mall Security Dispatch & Camera Relays): Specialized sensors feeding data to the master room.",
      3: "Ring 3 (Civilian Shoppers & Retail Outlets): Standard sandboxed spaces unable to modify building infrastructure."
    }
  },
  nani: {
    id: 'nani',
    name: "The Paradise (2026)",
    character: 'Jadal (The Fearless Rebel Leader)',
    actor: 'Natural Star Nani (Dir: Srikanth Odela | Music: Anirudh)',
    icon: '🔥',
    themeColor: '#ff6b00',
    accentGlow: 'rgba(255, 107, 0, 0.45)',
    badge: 'RAW UNFILTERED REBEL // THE PARADISE',
    tagline: 'The Unstoppable Heartbeat of the Marginalized',
    punchline: "Maa gally-lo memu bathikedi User Space lo kaadu ra... Maaku nyaayam jaragalante, Ring 0 lo nene KERNEL la digi racha leputha!",
    osConcept: "The entire gritty town machinery & settlement! The OS manages municipal water lines, railway freight yards, housing tenements, ration distribution, and security patrol routes so the entire community can survive every single day.",
    osMetaphor: "The Town Infrastructure & Settlement Ecosystem",
    kernelConcept: "Jadal (Nani) standing at the innermost core of the community! Jadal has direct, unrestricted physical authority over the community defense network, alarm bells, and secret underground passage gates. Bureaucrats debate in User Space (Ring 3), but when the syndicate strikes, Jadal operates at Ring 0 with raw, unfiltered authority that bypasses all red tape!",
    kernelMetaphor: "Jadal's Sovereign Ground Command at Ring 0",
    hackersTarget: "Why does the corrupt land-grabbing syndicate plot to eliminate or frame Jadal? Because tearing down one small tea stall in the bazaar (User Space crash) doesn't stop the community. But neutralizing Jadal (Kernel Root Escalation) bypasses all street defenses, dismantles the resistance, and hands root control of the entire territory to the mafia!",
    responsibilities: [
      { name: "Process & CPU Scheduling", icon: "🚂", scene: "Jadal dispatching lookout squads across railway platforms, alleyways, and settlement borders simultaneously." },
      { name: "Memory Management (RAM)", icon: "📦", scene: "Partitioning hidden ration storehouses and community medical caches so corrupt landlords cannot locate them." },
      { name: "File System (VFS)", icon: "📜", scene: "The ancestral land patta deeds, municipal survey maps, and community registry hidden inside Jadal's locker." },
      { name: "Device Drivers & I/O", icon: "🚰", scene: "Railway junction signal switches, mechanical water valve pumps, and emergency church tower bells." },
      { name: "User Security & Shell", icon: "🗡️", scene: "Community whistle codes and checkpoint passwords enforcing who is authorized to enter the inner sanctum." }
    ],
    ringAnalogies: {
      0: "Ring 0 (The Slum Sanctum & Jadal's Command): Direct, unrestricted physical authority protecting the community.",
      1: "Rings 1 & 2 (Railway Track Switchers & Water Valve Masters): Intermediate physical services keeping the town alive.",
      3: "Ring 3 (Bazaar Shoppers, Artisans & Workers): Sandboxed everyday citizens going about their daily lives."
    }
  }
};

export default function KaliSetup() {
  const [activeSubTab, setActiveSubTab] = useState('os_kernel'); // 'os_kernel', 'install_methods', 'vm_wizard'

  // --- Tollywood Movie Masterclass State ---
  const [activeMovieKey, setActiveMovieKey] = useState('nani'); // Default to Nani's The Paradise
  const [activeMovieTab, setActiveMovieTab] = useState('overview'); // 'overview', 'rings', 'responsibilities', 'quiz'
  const [movieQuizAnswer, setMovieQuizAnswer] = useState(null);

  // --- VirtualBox Wizard State ---
  const [step, setStep] = useState(1);
  const [vmName, setVmName] = useState('Kali-Security-Lab');
  const [ram, setRam] = useState(2048); // MB
  const [cores, setCores] = useState(2);
  const [networkType, setNetworkType] = useState('nat');
  const [booting, setBooting] = useState(false);
  const [bootLog, setBootLog] = useState([]);
  const [bootFinished, setBootFinished] = useState(false);

  // --- Interactive Kernel Ring Inspector State ---
  const [selectedRing, setSelectedRing] = useState(0);

  // --- Selected OS Type in Architecture tab ---
  const [selectedOsType, setSelectedOsType] = useState('pentest');

  // --- Selected Installation Method in Methods tab ---
  const [selectedMethod, setSelectedMethod] = useState('vm');

  const startBooting = () => {
    setBooting(true);
    setStep(4);
    const logs = [
      "Initializing VirtualBox Guest Additions...",
      "Allocating Guest Physical RAM...",
      "Loading boot disk image: Kali-Linux-2026-Live.iso",
      "Starting Linux Kernel v6.12.0-amd64 (Ring 0 supervisor initialized)...",
      "Mounting root filesystem (ext4) on /dev/sda1...",
      "Configuring network interface: eth0...",
      `Network interface mode: ${networkType.toUpperCase()}`,
      "Acquiring IP via DHCP... Done.",
      "Starting system services: systemd, udev, dbus...",
      "Loading penetration testing toolchain: aircrack-ng, nmap, metasploit...",
      "Starting display manager: LightDM...",
      "System fully operational. Ready for deployment."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setBootLog(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setBootFinished(true);
        }
      }, (index + 1) * 350);
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

  const osTypesData = {
    pentest: {
      name: "Penetration Testing / Security OS",
      icon: "🐉",
      examples: "Kali Linux, Parrot Security OS, BlackArch",
      desc: "Specialized Debian or Arch-based distributions pre-packaged with hundreds of ethical hacking, wireless auditing, digital forensics, and reverse-engineering tools. Features custom Linux kernels patched for 802.11 wireless packet injection.",
      useCases: ["Wireless Penetration Testing", "Network Vulnerability Auditing", "Digital Forensics & Malware Analysis", "CTF Competitions"],
      kernelRole: "Custom patched kernel with injection drivers for Wi-Fi chipsets (Alfa, Atheros, Realtek)."
    },
    desktop: {
      name: "General-Purpose Desktop OS",
      icon: "💻",
      examples: "Microsoft Windows 11, macOS Sequoia, Ubuntu Desktop",
      desc: "Designed for day-to-day human interaction, office productivity, web browsing, gaming, and multimedia. Prioritizes user-friendly graphical interfaces, hardware plug-and-play convenience, and power efficiency.",
      useCases: ["Daily Computing", "Gaming & Entertainment", "Enterprise Office Suites", "Software Development"],
      kernelRole: "Hybrid or monolithic kernel tuned for UI responsiveness, audio/video low-latency, and broad hardware compatibility."
    },
    server: {
      name: "Server Operating System",
      icon: "🖥️",
      examples: "Debian GNU/Linux, Red Hat Enterprise Linux (RHEL), Rocky Linux, Windows Server",
      desc: "Hardened, minimalist operating systems designed to run 24/7/365 without crashing. Typically run without a graphical desktop (headless CLI) to conserve RAM and reduce the attack surface.",
      useCases: ["Web & Database Servers", "Cloud Infrastructure (AWS/GCP/Azure)", "Enterprise Authentication (Active Directory)", "Network Routers & Firewalls"],
      kernelRole: "Kernel tuned for massive network throughput, multiprocessor scalability, and bulletproof uptime."
    },
    mobile: {
      name: "Mobile Operating System",
      icon: "📱",
      examples: "Android (Google), iOS / iPadOS (Apple)",
      desc: "Engineered specifically for handheld touchscreen devices with strict battery, cellular, and thermal constraints. Uses sandboxed application architectures to enforce strict permissions between apps.",
      useCases: ["Smartphones & Tablets", "Mobile Banking & Communications", "GPS Navigation & IoT Wearables"],
      kernelRole: "Android uses a modified Linux kernel; iOS uses the XNU/Darwin hybrid kernel with secure enclave chip integration."
    },
    rtos: {
      name: "Real-Time Operating System (RTOS)",
      icon: "⏱️",
      examples: "FreeRTOS, VxWorks, QNX, Zephyr",
      desc: "Guarantees deterministic, microsecond-accurate task execution without unpredictable delays. If a task misses its deadline, catastrophic system failure can occur.",
      useCases: ["Automotive Brake & Airbag Systems", "Avionics & Space Flight Control", "Medical Pacemakers & Ventilators", "Industrial Robotic Automation"],
      kernelRole: "Micro-kernel with zero-latency interrupt handling, priority preemption, and deterministic scheduling."
    }
  };

  const installMethodsData = {
    vm: {
      title: "1. Virtual Machine (Hypervisor)",
      tag: "RECOMMENDED FOR LABS",
      tagColor: "var(--accent-green)",
      icon: "📦",
      software: "Oracle VirtualBox, VMware Workstation, Proxmox VE",
      howItWorks: "A software hypervisor abstracts your physical CPU, RAM, and storage, creating an isolated guest virtual machine running inside your existing operating system.",
      pros: [
        "100% Isolated Sandbox: Malware or testing errors cannot escape to harm your host OS.",
        "Instant Snapshots: Save machine state and revert in seconds if system breaks.",
        "Run concurrently with Windows/macOS without rebooting your laptop.",
        "Free and easy to download pre-configured .OVA appliance files."
      ],
      cons: [
        "Shared Hardware Overhead: Needs sufficient host RAM (minimum 8GB recommended).",
        "Requires a dedicated USB Wi-Fi adapter for wireless monitor mode & injection (built-in Wi-Fi cannot be passed directly)."
      ],
      safety: "10/10 (Maximum Isolation)",
      performance: "8/10 (Near-native with virtualization extensions)"
    },
    dualboot: {
      title: "2. Dual-Boot (Multi-Boot Partition)",
      tag: "MAXIMUM HARDWARE PERFORMANCE",
      tagColor: "var(--accent-cyan)",
      icon: "⚡",
      software: "GRUB Bootloader + Physical Drive Partitioning (GParted)",
      howItWorks: "You shrink your existing Windows/macOS partition and install Linux directly onto dedicated free disk space. The GRUB bootloader lets you choose which OS to run at system startup.",
      pros: [
        "100% Native Bare-Metal Performance: Direct access to all CPU cores, RAM, and dedicated GPU.",
        "Direct access to internal Wi-Fi cards and Bluetooth chips without hypervisor layers.",
        "Best speed for heavy hash cracking with Hashcat on NVIDIA/AMD GPUs."
      ],
      cons: [
        "Risk of Data Loss: Accidental partition deletion during setup can wipe your main OS.",
        "Windows Updates can sometimes overwrite the GRUB Master Boot Record (MBR/EFI).",
        "Must reboot every time you want to switch operating systems."
      ],
      safety: "6/10 (Requires careful partitioning & backups)",
      performance: "10/10 (100% Bare-Metal)"
    },
    liveusb: {
      title: "3. Live USB with Persistence",
      tag: "PORTABLE 'HACKER ON A STICK'",
      tagColor: "var(--accent-orange)",
      icon: "💾",
      software: "Rufus, Ventoy, Etcher, dd utility",
      howItWorks: "The entire Kali Linux system is written onto a bootable USB flash drive (16GB+). A secondary encrypted partition stores saved files, wordlists, and tools across reboots.",
      pros: [
        "Zero footprint on host hard drive: Internal disks remain untouched.",
        "Plug-and-play into almost any computer (BIOS/UEFI boot selection).",
        "Optional LUKS encryption protects all saved files if the USB drive is lost or seized.",
        "Built-in 'Nuke' emergency partition feature available in Kali Live."
      ],
      cons: [
        "Speed limited by USB read/write bandwidth (USB 3.0+ strongly recommended).",
        "Higher flash drive wear-and-tear compared to SSDs."
      ],
      safety: "9/10 (Safe for host disk; encrypted persistence)",
      performance: "7/10 (Subject to USB bus speeds)"
    },
    baremetal: {
      title: "4. Dedicated Bare-Metal Installation",
      tag: "FULL REPLACEMENT",
      tagColor: "var(--accent-red)",
      icon: "🖥️",
      software: "Kali Linux NetInstaller / Offline ISO",
      howItWorks: "Wipes the entire computer hard drive and installs Linux as the one and only primary operating system on the physical hardware.",
      pros: [
        "No hypervisor, no dual-boot menus: boots straight into your security workstation.",
        "Total utilization of computer hardware, battery optimizations, and thermal control.",
        "Fastest possible compile times and script executions."
      ],
      cons: [
        "Cannot run native Windows or macOS software without emulation.",
        "Not recommended for primary everyday laptops due to security implications of running Kali daily."
      ],
      safety: "5/10 (Wipes existing OS; requires dedicated spare PC)",
      performance: "10/10 (Ultimate Native Speed)"
    },
    wsl: {
      title: "5. WSL2 (Windows Subsystem for Linux)",
      tag: "MICROSOFT HYBRID",
      tagColor: "#9d4edd",
      icon: "🪟",
      software: "Microsoft Store: Kali Linux / wsl.exe",
      howItWorks: "A lightweight virtualization architecture deeply integrated into Windows 10/11 running a customized Microsoft-managed Linux kernel alongside PowerShell.",
      pros: [
        "Instantly launch Linux terminals directly from Windows without booting a full VM.",
        "Very low RAM and CPU footprint; suspends automatically when idle.",
        "Seamlessly access Windows files (`/mnt/c/`) and run Linux GUI apps (Win-KeX)."
      ],
      cons: [
        "Cannot easily bridge raw USB Wi-Fi adapters for monitor mode or packet injection (`usbipd-win` required).",
        "Networking runs behind an internal virtual NAT switch, complicating network spoofing labs."
      ],
      safety: "8/10 (Safe inside Windows sandbox)",
      performance: "8.5/10 (Fast file I/O & command line)"
    },
    docker: {
      title: "6. Containerization (Docker / Podman)",
      tag: "DISPOSABLE INSTANCES",
      tagColor: "#00b4d8",
      icon: "🐳",
      software: "Docker Desktop, Podman CLI",
      howItWorks: "Runs Kali Linux user-space applications inside isolated Linux containers sharing the host system's Linux kernel.",
      pros: [
        "Spawns fresh environments in less than 2 seconds (`docker run -it kalilinux/kali-rolling`).",
        "Extremely lightweight: No OS kernel boot overhead.",
        "Perfect for automated CI/CD pipeline security testing and disposable scan environments."
      ],
      cons: [
        "Shares host kernel: Cannot load custom kernel modules or test raw kernel exploits.",
        "Requires root privilege flags (`--privileged --net=host`) for raw packet capture."
      ],
      safety: "8.5/10 (Isolated container filesystem)",
      performance: "9.5/10 (Near-native container execution)"
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Header */}
      <div>
        <span className="sidebar-tag">SESSION 3</span>
        <h1 className="text-cyber-glow" style={{ fontSize: '2rem', marginTop: '10px' }}>Operating Systems, Kernel Architecture & Kali Setup</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.6' }}>
          Before configuring tools or attacking networks, every cybersecurity engineer must understand how operating systems function, how the privileged kernel controls hardware, and how to safely install and isolate your pen-testing environment.
        </p>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveSubTab('os_kernel')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'os_kernel' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeSubTab === 'os_kernel' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          🧠 OS & KERNEL ARCHITECTURE
        </button>
        <button
          onClick={() => setActiveSubTab('install_methods')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'install_methods' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeSubTab === 'install_methods' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          💿 6 OS INSTALLATION METHODS
        </button>
        <button
          onClick={() => setActiveSubTab('vm_wizard')}
          className="cyber-button"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            background: activeSubTab === 'vm_wizard' ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            borderColor: activeSubTab === 'vm_wizard' ? 'var(--accent-cyan)' : 'transparent',
            fontFamily: 'var(--font-mono)'
          }}
        >
          ⚙️ VIRTUALBOX VM LAB WIZARD
        </button>
      </div>

      {/* Subtab 1: OS & Kernel Architecture */}
      {activeSubTab === 'os_kernel' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* --- TOLLYWOOD BLOCKBUSTER CYBER CINEMA: OS & KERNEL ARCHITECTURE --- */}
          <section className="movie-hero-stage" style={{ padding: '26px', border: `1px solid ${MOVIE_MASTERS[activeMovieKey].themeColor}`, boxShadow: `0 10px 30px ${MOVIE_MASTERS[activeMovieKey].accentGlow}` }}>
            {/* Movie Selector Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="sidebar-tag" style={{ background: `${MOVIE_MASTERS[activeMovieKey].themeColor}22`, borderColor: MOVIE_MASTERS[activeMovieKey].themeColor, color: MOVIE_MASTERS[activeMovieKey].themeColor }}>
                    🎬 TOLLYWOOD CYBER CINEMA
                  </span>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    CHOOSE YOUR BLOCKBUSTER ANALOGY:
                  </span>
                </div>
                <h2 className="text-cyber-glow" style={{ fontSize: '1.4rem', marginTop: '6px' }}>
                  🖥️ What is an OS vs What is a Kernel?
                </h2>
              </div>

              {/* Movie Switcher Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.keys(MOVIE_MASTERS).map((key) => {
                  const m = MOVIE_MASTERS[key];
                  const isSelected = activeMovieKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveMovieKey(key);
                        playMovieThemeSound(key);
                      }}
                      className="cyber-button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        fontSize: '0.8rem',
                        borderColor: isSelected ? m.themeColor : 'rgba(255,255,255,0.15)',
                        background: isSelected ? `${m.themeColor}25` : 'rgba(0,0,0,0.4)',
                        color: isSelected ? m.themeColor : 'var(--text-secondary)',
                        boxShadow: isSelected ? `0 0 12px ${m.themeColor}44` : 'none'
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
                      <span>{m.character.split(' ')[0]} ({m.name.split(':')[0]})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hero Visual Novel Stage: Character Avatar + Live Punch Dialogue */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '22px' }}>
              {/* Movie Hero Avatar Badge */}
              <div 
                className="movie-hero-avatar pulse-aura" 
                style={{ 
                  borderColor: MOVIE_MASTERS[activeMovieKey].themeColor, 
                  boxShadow: MOVIE_MASTERS[activeMovieKey].accentGlow,
                  background: `radial-gradient(circle at center, ${MOVIE_MASTERS[activeMovieKey].themeColor}22 0%, #060910 80%)`
                }}
              >
                <span style={{ fontSize: '2.8rem', marginBottom: '4px' }}>{MOVIE_MASTERS[activeMovieKey].icon}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 'bold', color: MOVIE_MASTERS[activeMovieKey].themeColor, textAlign: 'center', lineHeight: '1.2' }}>
                  {MOVIE_MASTERS[activeMovieKey].character}
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {MOVIE_MASTERS[activeMovieKey].name.split(':')[0]}
                </span>
              </div>

              {/* Movie Dialogue Box */}
              <div className="movie-dialogue-box" style={{ borderLeft: `4px solid ${MOVIE_MASTERS[activeMovieKey].themeColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ color: MOVIE_MASTERS[activeMovieKey].themeColor, fontSize: '1rem' }}>
                      {MOVIE_MASTERS[activeMovieKey].character}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      • {MOVIE_MASTERS[activeMovieKey].actor}
                    </span>
                  </div>
                  <span className="sensei-tag-badge" style={{ background: `${MOVIE_MASTERS[activeMovieKey].themeColor}22`, color: MOVIE_MASTERS[activeMovieKey].themeColor, border: `1px solid ${MOVIE_MASTERS[activeMovieKey].themeColor}44` }}>
                    {MOVIE_MASTERS[activeMovieKey].badge}
                  </span>
                </div>

                {/* Punchline */}
                <div style={{ fontStyle: 'italic', color: '#fff', fontSize: '0.94rem', lineHeight: '1.6', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                  "{MOVIE_MASTERS[activeMovieKey].punchline}"
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => playMovieThemeSound(activeMovieKey)}
                    className="cyber-button"
                    style={{ fontSize: '0.7rem', padding: '4px 10px', borderColor: MOVIE_MASTERS[activeMovieKey].themeColor, color: MOVIE_MASTERS[activeMovieKey].themeColor }}
                  >
                    🔊 PLAY MOVIE BGM FX
                  </button>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    OS METAPHOR: <span style={{ color: 'var(--accent-cyan)' }}>{MOVIE_MASTERS[activeMovieKey].osMetaphor}</span>
                  </span>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    KERNEL: <span style={{ color: MOVIE_MASTERS[activeMovieKey].themeColor }}>{MOVIE_MASTERS[activeMovieKey].kernelMetaphor}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Cinema Masterclass Lesson Tabs */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setActiveMovieTab('overview');
                  playMovieThemeSound(activeMovieKey);
                }}
                className="cyber-button"
                style={{
                  fontSize: '0.8rem',
                  padding: '6px 14px',
                  borderColor: activeMovieTab === 'overview' ? MOVIE_MASTERS[activeMovieKey].themeColor : 'transparent',
                  color: activeMovieTab === 'overview' ? MOVIE_MASTERS[activeMovieKey].themeColor : 'var(--text-secondary)',
                  background: activeMovieTab === 'overview' ? 'rgba(255,255,255,0.06)' : 'transparent'
                }}
              >
                📜 Blockbuster Rule (OS vs Kernel)
              </button>
              <button
                onClick={() => {
                  setActiveMovieTab('rings');
                  playMovieThemeSound(activeMovieKey);
                }}
                className="cyber-button"
                style={{
                  fontSize: '0.8rem',
                  padding: '6px 14px',
                  borderColor: activeMovieTab === 'rings' ? MOVIE_MASTERS[activeMovieKey].themeColor : 'transparent',
                  color: activeMovieTab === 'rings' ? MOVIE_MASTERS[activeMovieKey].themeColor : 'var(--text-secondary)',
                  background: activeMovieTab === 'rings' ? 'rgba(255,255,255,0.06)' : 'transparent'
                }}
              >
                🛡️ CPU Privilege Rings (Ring 0 to 3)
              </button>
              <button
                onClick={() => {
                  setActiveMovieTab('responsibilities');
                  playMovieThemeSound(activeMovieKey);
                }}
                className="cyber-button"
                style={{
                  fontSize: '0.8rem',
                  padding: '6px 14px',
                  borderColor: activeMovieTab === 'responsibilities' ? MOVIE_MASTERS[activeMovieKey].themeColor : 'transparent',
                  color: activeMovieTab === 'responsibilities' ? MOVIE_MASTERS[activeMovieKey].themeColor : 'var(--text-secondary)',
                  background: activeMovieTab === 'responsibilities' ? 'rgba(255,255,255,0.06)' : 'transparent'
                }}
              >
                🏛️ 5 Core Responsibilities in Film Scenes
              </button>
              <button
                onClick={() => {
                  setActiveMovieTab('quiz');
                  playMovieThemeSound(activeMovieKey);
                }}
                className="cyber-button"
                style={{
                  fontSize: '0.8rem',
                  padding: '6px 14px',
                  borderColor: activeMovieTab === 'quiz' ? MOVIE_MASTERS[activeMovieKey].themeColor : 'transparent',
                  color: activeMovieTab === 'quiz' ? MOVIE_MASTERS[activeMovieKey].themeColor : 'var(--text-secondary)',
                  background: activeMovieTab === 'quiz' ? 'rgba(255,255,255,0.06)' : 'transparent'
                }}
              >
                🎯 Hero's Movie Cyber Challenge
              </button>
            </div>

            {/* TAB 1: BLOCKBUSTER RULE (OS VS KERNEL) */}
            {activeMovieTab === 'overview' && (
              <div className="grid-2" style={{ gap: '20px' }}>
                {/* OS Box */}
                <div className="scroll-card" style={{ border: '1px solid rgba(0, 240, 255, 0.4)' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--accent-cyan)', color: '#000', fontWeight: 'bold', fontSize: '0.65rem', padding: '3px 10px', borderBottomLeftRadius: '6px', fontFamily: 'var(--font-mono)' }}>
                    THE MASTER COORDINATOR
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '2rem' }}>🖥️</span>
                    <div>
                      <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem' }}>What is an Operating System (OS)?</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>The Entire Kingdom Administration</span>
                    </div>
                  </div>

                  {/* Movie Analogy Box */}
                  <div style={{ background: 'rgba(0, 240, 255, 0.08)', borderLeft: '3px solid var(--accent-cyan)', padding: '12px 14px', borderRadius: '4px', marginBottom: '14px', fontSize: '0.86rem', color: '#c7f9ff', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>🎬 In {MOVIE_MASTERS[activeMovieKey].name.split(':')[0]}:</strong> "{MOVIE_MASTERS[activeMovieKey].osConcept}"
                  </div>

                  <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
                    An <strong>Operating System (OS)</strong> is the comprehensive suite of software that manages computer hardware resources and provides common services for computer applications. Without an OS, you would have to write custom machine code to talk directly to your screen, storage drives, and network card for every single program!
                  </p>

                  <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem' }}>
                    <div style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                      🏛️ 5 Primary Core Responsibilities:
                    </div>
                    <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li><strong>Process & CPU Scheduling:</strong> Allocates CPU execution time slices to hundreds of threads.</li>
                      <li><strong>Memory Management:</strong> Distributes physical RAM and isolates virtual address spaces.</li>
                      <li><strong>File System (VFS):</strong> Organizes persistent storage, permissions, and directories.</li>
                      <li><strong>Device Drivers & I/O:</strong> Translates high-level read/write commands into electrical hardware pulses.</li>
                      <li><strong>User Interface & Security:</strong> Enforces login credentials, user rings, and access controls.</li>
                    </ul>
                  </div>
                </div>

                {/* Kernel Box */}
                <div className="scroll-card" style={{ border: `1px solid ${MOVIE_MASTERS[activeMovieKey].themeColor}66` }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, background: MOVIE_MASTERS[activeMovieKey].themeColor, color: '#000', fontWeight: 'bold', fontSize: '0.65rem', padding: '3px 10px', borderBottomLeftRadius: '6px', fontFamily: 'var(--font-mono)' }}>
                    CORE ENGINE AT RING 0
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '2rem' }}>🧠</span>
                    <div>
                      <h3 style={{ color: MOVIE_MASTERS[activeMovieKey].themeColor, fontSize: '1.2rem' }}>What is a Kernel?</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>The Innermost Supreme Commander</span>
                    </div>
                  </div>

                  {/* Movie Analogy Box */}
                  <div style={{ background: `${MOVIE_MASTERS[activeMovieKey].themeColor}12`, borderLeft: `3px solid ${MOVIE_MASTERS[activeMovieKey].themeColor}`, padding: '12px 14px', borderRadius: '4px', marginBottom: '14px', fontSize: '0.86rem', color: '#fff', lineHeight: '1.5' }}>
                    <strong style={{ color: MOVIE_MASTERS[activeMovieKey].themeColor }}>🎬 In {MOVIE_MASTERS[activeMovieKey].name.split(':')[0]}:</strong> "{MOVIE_MASTERS[activeMovieKey].kernelConcept}"
                  </div>

                  <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '14px' }}>
                    The <strong>Kernel</strong> is the innermost foundational core of the OS. Loaded into RAM first by the bootloader (e.g. GRUB), it remains resident until shutdown. The kernel has <strong>unrestricted, direct access</strong> to all physical hardware and executes in the CPU's highest privilege state (Ring 0 / Supervisor Mode).
                  </p>

                  <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255, 42, 95, 0.25)', borderRadius: '6px', padding: '12px', fontSize: '0.8rem' }}>
                    <div style={{ color: 'var(--accent-red)', fontWeight: 'bold', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                      ⚡ Why Hackers Target the Kernel (Ring 0):
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                      {MOVIE_MASTERS[activeMovieKey].hackersTarget}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                      [TECHNICAL]: Ring 3 ➔ Exploit (Dirty COW / PwnKit) ➔ Ring 0 Execution ➔ Bypasses all EDR/Antivirus & hides rootkits.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CPU PRIVILEGE RINGS EXPLORER */}
            {activeMovieTab === 'rings' && (
              <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: MOVIE_MASTERS[activeMovieKey].themeColor, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🛡️</span> CPU Privilege Architecture: The Hierarchy of Power
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    HARDWARE-ENFORCED PROTECTION RINGS
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedRing(0)}
                    className="cyber-button"
                    style={{
                      flex: 1,
                      minWidth: '150px',
                      borderColor: selectedRing === 0 ? 'var(--accent-red)' : 'var(--border-color)',
                      color: selectedRing === 0 ? 'var(--accent-red)' : 'var(--text-secondary)',
                      background: selectedRing === 0 ? 'rgba(255, 42, 95, 0.15)' : 'transparent'
                    }}
                  >
                    🔴 Ring 0 (Kernel Space / Supreme Commander)
                  </button>
                  <button
                    onClick={() => setSelectedRing(1)}
                    className="cyber-button"
                    style={{
                      flex: 1,
                      minWidth: '150px',
                      borderColor: selectedRing === 1 ? 'var(--accent-orange)' : 'var(--border-color)',
                      color: selectedRing === 1 ? 'var(--accent-orange)' : 'var(--text-secondary)',
                      background: selectedRing === 1 ? 'rgba(255, 157, 0, 0.15)' : 'transparent'
                    }}
                  >
                    🟡 Rings 1 & 2 (Device Services / Gate Sentries)
                  </button>
                  <button
                    onClick={() => setSelectedRing(3)}
                    className="cyber-button"
                    style={{
                      flex: 1,
                      minWidth: '150px',
                      borderColor: selectedRing === 3 ? 'var(--accent-cyan)' : 'var(--border-color)',
                      color: selectedRing === 3 ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                      background: selectedRing === 3 ? 'rgba(0, 240, 255, 0.15)' : 'transparent'
                    }}
                  >
                    🔵 Ring 3 (User Space / Civilians & Apps)
                  </button>
                </div>

                {/* Ring Details Panel */}
                <div style={{ background: '#05070c', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '20px' }}>
                  {selectedRing === 0 && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ color: 'var(--accent-red)', fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>RING 0 — KERNEL / SUPERVISOR MODE</h4>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(255,42,95,0.2)', color: 'var(--accent-red)', padding: '2px 8px', borderRadius: '4px' }}>MAXIMUM PRIVILEGE</span>
                      </div>
                      <div style={{ background: 'rgba(255,42,95,0.08)', borderLeft: '3px solid var(--accent-red)', padding: '10px 14px', borderRadius: '4px', marginBottom: '12px', fontSize: '0.85rem', color: '#ffb3c1' }}>
                        <strong>🎬 {MOVIE_MASTERS[activeMovieKey].character}'s Analogy:</strong> {MOVIE_MASTERS[activeMovieKey].ringAnalogies[0]}
                      </div>
                      <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '10px' }}>
                        Complete hardware execution authority. The Linux Kernel (e.g. <code>vmlinuz</code>) executes here. It can execute any CPU instruction, read or write any physical memory address, and configure interrupt controllers.
                      </p>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px' }}>
                        [COMPONENTS]: Linux Kernel core, CPU scheduler, Memory management unit (MMU), Network drivers, Rootkit hooks
                      </div>
                    </div>
                  )}

                  {selectedRing === 1 && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ color: 'var(--accent-orange)', fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>RINGS 1 & 2 — INTERMEDIATE HARDWARE DRIVERS</h4>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(255,157,0,0.2)', color: 'var(--accent-orange)', padding: '2px 8px', borderRadius: '4px' }}>RARELY USED IN MODERN OS</span>
                      </div>
                      <div style={{ background: 'rgba(255,157,0,0.08)', borderLeft: '3px solid var(--accent-orange)', padding: '10px 14px', borderRadius: '4px', marginBottom: '12px', fontSize: '0.85rem', color: '#ffdfaa' }}>
                        <strong>🎬 {MOVIE_MASTERS[activeMovieKey].character}'s Analogy:</strong> {MOVIE_MASTERS[activeMovieKey].ringAnalogies[1]}
                      </div>
                      <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '10px' }}>
                        Originally conceived in x86 architecture for OS services and display drivers. Most modern operating systems (Linux, Windows, macOS) simplify design by using only Ring 0 (Kernel) and Ring 3 (User Space). Microkernel architectures sometimes utilize these rings.
                      </p>
                    </div>
                  )}

                  {selectedRing === 3 && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.05rem', fontFamily: 'var(--font-mono)' }}>RING 3 — USER SPACE APPLICATION MODE</h4>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(0,240,255,0.2)', color: 'var(--accent-cyan)', padding: '2px 8px', borderRadius: '4px' }}>ISOLATED & RESTRICTED</span>
                      </div>
                      <div style={{ background: 'rgba(0,240,255,0.08)', borderLeft: '3px solid var(--accent-cyan)', padding: '10px 14px', borderRadius: '4px', marginBottom: '12px', fontSize: '0.85rem', color: '#c7f9ff' }}>
                        <strong>🎬 {MOVIE_MASTERS[activeMovieKey].character}'s Analogy:</strong> {MOVIE_MASTERS[activeMovieKey].ringAnalogies[3]}
                      </div>
                      <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '10px' }}>
                        Where all standard programs run: BASH, Python, Firefox, Aircrack-ng, Nmap, and GUI desktop managers. Programs in Ring 3 cannot directly touch hardware. Whenever an application needs to read a file or send a network packet, it must execute a <strong>System Call (`syscall`)</strong> that politely asks the Ring 0 kernel to perform the operation on its behalf!
                      </p>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px' }}>
                        [BRIDGE]: System calls like `open()`, `read()`, `write()`, `socket()`, `connect()` trigger a CPU context switch to Ring 0.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: 5 CORE RESPONSIBILITIES IN FILM SCENES */}
            {activeMovieTab === 'responsibilities' && (
              <div>
                <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🏛️ How {MOVIE_MASTERS[activeMovieKey].name.split(':')[0]} Illustrates the 5 Core OS Duties:
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: MOVIE_MASTERS[activeMovieKey].themeColor, fontFamily: 'var(--font-mono)' }}>
                    BLOCKBUSTER SCENE MAPPINGS
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  {MOVIE_MASTERS[activeMovieKey].responsibilities.map((resp, idx) => (
                    <div key={idx} className="movie-scene-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '1.4rem' }}>{resp.icon}</span>
                        <strong style={{ color: MOVIE_MASTERS[activeMovieKey].themeColor, fontSize: '0.9rem' }}>
                          {idx + 1}. {resp.name}
                        </strong>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: '1.5' }}>
                        {resp.scene}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: HERO'S MOVIE CYBER CHALLENGE */}
            {activeMovieTab === 'quiz' && (
              <div style={{ background: 'rgba(4, 7, 14, 0.85)', border: `1px solid ${MOVIE_MASTERS[activeMovieKey].themeColor}55`, borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎯</span>
                  <h4 style={{ color: MOVIE_MASTERS[activeMovieKey].themeColor, fontSize: '1.05rem' }}>
                    {MOVIE_MASTERS[activeMovieKey].character}'s Mass Question: Test Your Concept!
                  </h4>
                </div>

                <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', marginBottom: '16px', lineHeight: '1.5' }}>
                  "Orey! Suppose an attacker finds a memory buffer overflow in Firefox running in <strong>User Space (Ring 3)</strong>. Can they immediately rewrite physical RAM addresses of other apps or shut down the CPU without talking to the Kernel?"
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '560px' }}>
                  <button
                    onClick={() => {
                      setMovieQuizAnswer('wrong_a');
                      playMovieThemeSound(activeMovieKey);
                    }}
                    className="cyber-button"
                    style={{
                      textAlign: 'left',
                      padding: '10px 16px',
                      borderColor: movieQuizAnswer === 'wrong_a' ? 'var(--accent-red)' : 'var(--border-color)',
                      color: movieQuizAnswer === 'wrong_a' ? 'var(--accent-red)' : 'var(--text-secondary)',
                      background: movieQuizAnswer === 'wrong_a' ? 'rgba(255,42,95,0.15)' : 'rgba(0,0,0,0.3)'
                    }}
                  >
                    A) Yes, any program running on the computer has direct access to physical hardware.
                  </button>

                  <button
                    onClick={() => {
                      setMovieQuizAnswer('correct');
                      playMovieThemeSound(activeMovieKey);
                    }}
                    className="cyber-button"
                    style={{
                      textAlign: 'left',
                      padding: '10px 16px',
                      borderColor: movieQuizAnswer === 'correct' ? 'var(--accent-green)' : 'var(--border-color)',
                      color: movieQuizAnswer === 'correct' ? 'var(--accent-green)' : 'var(--text-secondary)',
                      background: movieQuizAnswer === 'correct' ? 'rgba(57,255,20,0.15)' : 'rgba(0,0,0,0.3)'
                    }}
                  >
                    B) No! Ring 3 is completely sandboxed. They must find an exploit in the KERNEL (Ring 0) to escape the sandbox!
                  </button>

                  <button
                    onClick={() => {
                      setMovieQuizAnswer('wrong_c');
                      playMovieThemeSound(activeMovieKey);
                    }}
                    className="cyber-button"
                    style={{
                      textAlign: 'left',
                      padding: '10px 16px',
                      borderColor: movieQuizAnswer === 'wrong_c' ? 'var(--accent-red)' : 'var(--border-color)',
                      color: movieQuizAnswer === 'wrong_c' ? 'var(--accent-red)' : 'var(--text-secondary)',
                      background: movieQuizAnswer === 'wrong_c' ? 'rgba(255,42,95,0.15)' : 'rgba(0,0,0,0.3)'
                    }}
                  >
                    C) Yes, but only if they execute Firefox as a background process.
                  </button>
                </div>

                {/* Instant Feedback */}
                {movieQuizAnswer && (
                  <div style={{ marginTop: '16px', padding: '14px 18px', borderRadius: '6px', background: movieQuizAnswer === 'correct' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 42, 95, 0.1)', border: `1px solid ${movieQuizAnswer === 'correct' ? 'var(--accent-green)' : 'var(--accent-red)'}` }}>
                    {movieQuizAnswer === 'correct' ? (
                      <div>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '4px' }}>
                          🌟 {MOVIE_MASTERS[activeMovieKey].character}: "Shaabash! That's the real hero mindset!"
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                          Just as commoners in the kingdom cannot touch royal weapons without the Commander's approval, User Space (Ring 3) programs cannot touch hardware directly. An attacker trapped in Ring 3 must execute a <strong>Privilege Escalation Exploit</strong> targeting the <strong>Kernel (Ring 0)</strong> to gain root control over hardware!
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '4px' }}>
                          ⚠️ {MOVIE_MASTERS[activeMovieKey].character}: "Rey! Thappu answer!"
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          Remember the rule: CPU hardware strictly prevents Ring 3 applications from touching physical memory or hardware. Try selecting Option B to see why hackers hunt for Kernel flaws!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Types of OS Section */}
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
              🌐 Major Types of Operating Systems
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Different engineering domains require specialized operating systems. Click each category below:
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {Object.keys(osTypesData).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedOsType(key)}
                  className={`cyber-button ${selectedOsType === key ? 'active' : 'disabled'}`}
                  style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                >
                  {osTypesData[key].icon} {osTypesData[key].name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '2rem' }}>{osTypesData[selectedOsType].icon}</span>
                <div>
                  <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem' }}>{osTypesData[selectedOsType].name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                    Examples: {osTypesData[selectedOsType].examples}
                  </span>
                </div>
              </div>

              <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.6', margin: '12px 0' }}>
                {osTypesData[selectedOsType].desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>PRIMARY USE CASES:</div>
                  <ul style={{ paddingLeft: '14px', color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {osTypesData[selectedOsType].useCases.map((uc, i) => (
                      <li key={i}>{uc}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>KERNEL ARCHITECTURE FOCUS:</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4' }}>
                    {osTypesData[selectedOsType].kernelRole}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Subtab 2: 6 OS Installation Methods */}
      {activeSubTab === 'install_methods' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <section className="glass-panel" style={{ padding: '24px' }}>
            <h3 className="text-cyber-glow" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
              💿 The 6 Types of OS Installation Methods
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Installing Kali Linux or any operating system can be done using multiple deployment strategies depending on performance needs, hardware access, and lab safety constraints.
            </p>

            {/* Methods Selection Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '24px' }}>
              {Object.keys(installMethodsData).map((mKey) => (
                <button
                  key={mKey}
                  onClick={() => setSelectedMethod(mKey)}
                  className={`cyber-button ${selectedMethod === mKey ? 'active' : 'disabled'}`}
                  style={{
                    padding: '12px 10px',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    borderColor: selectedMethod === mKey ? 'var(--accent-cyan)' : 'var(--border-color)',
                    background: selectedMethod === mKey ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0,0,0,0.2)'
                  }}
                >
                  <span style={{ fontSize: '1.2rem', marginRight: '6px' }}>{installMethodsData[mKey].icon}</span>
                  <span>{installMethodsData[mKey].title.split('.')[1].trim()}</span>
                </button>
              ))}
            </div>

            {/* Selected Method Detailed Card */}
            {installMethodsData[selectedMethod] && (
              <div style={{ background: '#090d16', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '2.5rem' }}>{installMethodsData[selectedMethod].icon}</span>
                    <div>
                      <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>{installMethodsData[selectedMethod].title}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        Tools/Hypervisors: {installMethodsData[selectedMethod].software}
                      </span>
                    </div>
                  </div>
                  <span 
                    className="sidebar-tag" 
                    style={{ 
                      borderColor: installMethodsData[selectedMethod].tagColor, 
                      color: installMethodsData[selectedMethod].tagColor,
                      background: 'rgba(0,0,0,0.4)'
                    }}
                  >
                    {installMethodsData[selectedMethod].tag}
                  </span>
                </div>

                <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  {installMethodsData[selectedMethod].howItWorks}
                </p>

                {/* Pros and Cons Grid */}
                <div className="grid-2" style={{ marginBottom: '20px' }}>
                  <div style={{ background: 'rgba(57, 255, 20, 0.03)', border: '1px solid rgba(57, 255, 20, 0.2)', borderRadius: '6px', padding: '16px' }}>
                    <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                      ✅ ADVANTAGES:
                    </div>
                    <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {installMethodsData[selectedMethod].pros.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(255, 42, 95, 0.03)', border: '1px solid rgba(255, 42, 95, 0.2)', borderRadius: '6px', padding: '16px' }}>
                    <div style={{ color: 'var(--accent-red)', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                      ⚠️ DRAWBACKS & CONSIDERATIONS:
                    </div>
                    <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {installMethodsData[selectedMethod].cons.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Performance & Safety Rating Badges */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>LAB ISOLATION & SAFETY: </span>
                    <strong style={{ color: 'var(--accent-green)' }}>{installMethodsData[selectedMethod].safety}</strong>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>HARDWARE PERFORMANCE: </span>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{installMethodsData[selectedMethod].performance}</strong>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Subtab 3: Interactive VirtualBox VM Wizard */}
      {activeSubTab === 'vm_wizard' && (
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
                📋 Host Hypervisor Checklist
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>✔</span>
                  <div>
                    <strong>Download Hypervisor:</strong> Get Oracle VirtualBox or VMware Workstation for your host system (Windows/macOS).
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>✔</span>
                  <div>
                    <strong>Download Pre-built OVA:</strong> Get the official pre-built Kali Linux VirtualBox image from <a href="https://kali.org" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>kali.org</a> (Default user: <code>kali</code> / pass: <code>kali</code>).
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>✔</span>
                  <div>
                    <strong>Enable CPU Virtualization (VT-x / AMD-V):</strong> Enter your physical BIOS/UEFI on reboot and enable hardware virtualization; otherwise 64-bit guest VMs will fail to start.
                  </div>
                </li>
              </ul>
            </section>

            <div className="alert-box">
              <span className="alert-icon">⚠️</span>
              <div className="alert-message">
                <strong>Wi-Fi Adapter Notice:</strong> VirtualBox uses a virtual Ethernet adapter (`eth0`). If you want to perform wireless auditing (airmon-ng, airodump-ng), you must plug in an external <strong>USB Wi-Fi adapter</strong> (e.g. Alfa AWUS036ACH) and attach it to the VM via <em>Devices ➔ USB</em>.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
