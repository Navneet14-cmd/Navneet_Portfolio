import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Play,
  RotateCcw,
  Power,
  Cpu,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Search,
  Server,
  Activity,
  Terminal,
  Satellite,
  Radar,
  Flame,
  Lock,
  Unlock,
  FileText,
  Pickaxe,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Globe,
  Radio,
  BookOpen
} from "lucide-react";
import { Project } from "../types";

interface GameSimulatorProps {
  project: Project;
  onClose: () => void;
}

export const GameSimulator: React.FC<GameSimulatorProps> = ({ project, onClose }) => {
  const [booting, setBooting] = useState(true);
  const [progress, setProgress] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const pipelineIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Terraform Pipeline Simulator State ---
  const [ec2Nodes, setEc2Nodes] = useState<number>(2);
  const [trafficLoad, setTrafficLoad] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [vpcSecurity, setVpcSecurity] = useState<"OPEN_PORT_22" | "SECURE_HTTPS">("SECURE_HTTPS");
  const [pipelineLog, setPipelineLog] = useState<string[]>([]);
  const [pipelineStatus, setPipelineStatus] = useState<"idle" | "running" | "success" | "failed">("idle");

  // --- Methane Plume AI Scanner State ---
  const [spectralBand, setSpectralBand] = useState<"SWIR_12" | "SWIR_7" | "NIR_8" | "THERMAL_10">("SWIR_12");
  const [sensitivity, setSensitivity] = useState<number>(55);
  const [scanning, setScanning] = useState<boolean>(false);
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [hotspotsCount, setHotspotsCount] = useState<number>(0);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number; val: number } | null>(null);

  const methaneGridData = [
    [10, 15, 25, 20, 12, 10],
    [12, 45, 68, 55, 18, 11],
    [15, 78, 95, 82, 35, 14],
    [11, 52, 88, 71, 24, 10],
    [9, 22, 41, 30, 15, 8],
    [8, 10, 15, 12, 9, 7]
  ];

  // --- The Great Archive Secret Knowledge State ---
  const [archivedFiles, setArchivedFiles] = useState([
    {
      id: "memo",
      name: "NAVNEET_SECRET_MEMO.TXT",
      title: "The Golden Rule of Engineering",
      unlocked: false,
      content:
        "FROM: Navneet\nTO: All Aspiring Developers\nSUBJECT: The Golden Rule of Engineering\n\nIf there is one absolute truth in software development, it is this:\n\nFrameworks come and go, languages evolve, but Algorithmic Mastery & Data Structures (DSA) are the eternal bedrock.\n\nMaster your pointers, analyze your Big-O runtimes, and grind daily. When the cloud server crashes at 3 AM, solid computer science fundamentals are what save the day!\n\nKeep building, keep solving, and never stop optimizing."
    },
    {
      id: "internship",
      name: "HOW_TO_GET_INTERNSHIP_3RD_YEAR.TXT",
      title: "FAANG 3rd Year Internship Checklist (100% Legit)",
      unlocked: false,
      content:
        "SUBJECT: FAANG 3rd Year Internship Checklist (100% Legit Satire)\n\nTo secure an entry-level student summer internship, candidates must satisfy the following humble expectations:\n\n1. Solve 1,500+ LeetCode problems (minimum 600 Hard on a smart toaster).\n2. Maintain a 365-day commit streak while sleeping max 3 hours.\n3. Show 12+ years of enterprise Kubernetes & Terraform experience.\n4. Design and build a decentralized quantum operating system in Rust.\n5. Defeat the Ender Dragon with bare fists during the technical screen.\n\n... Or just build genuine projects you love and speak passionately about them!\nGood luck, adventurer!"
    },
    {
      id: "lore",
      name: "THE_FORBIDDEN_BEDROCK_LORE.TXT",
      title: "How to Break Bedrock: Ancient Developer Lore",
      unlocked: false,
      content:
        "SUBJECT: CLASSIFIED BEDROCK EXCAVATION PROTOCOL\n\nLevel 2 Clearance Required.\n\nAncient developers speak of an arcane glitch at Y: -64. If you place 4 dark oak saplings, bonemeal them in synchrony, and spam headless pistons with redstone dust... you just might breach the void!\n\nJust remember: in real distributed systems, 'bedrock' is your database consistency layer. Never break it without a verified backup!"
    },
    {
      id: "bonus",
      name: "BONUS_TIP.TXT",
      title: "FINAL SECRET WARNING",
      unlocked: false,
      content:
        "SUBJECT: URGENT MESSAGE\n\nWAIT...\n\nYOU STILL HAVEN'T GRINDED YOUR ARRAYS AND SLIDING WINDOWS TODAY???\n\nClose this terminal and go solve LeetCode Problem #1 (Two Sum) right now!\n\n(Okay, finish testing the portfolio first... but then go grind!)"
    }
  ]);
  const [miningOffset, setMiningOffset] = useState(50); // slider percent
  const [goldTarget, setGoldTarget] = useState(45); // target percent
  const [vaultFeedback, setVaultFeedback] = useState("Target rune is fluctuating. Align pickaxe and strike tumbler!");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Sound generator helper using Web Audio API
  const playRetroSound = (type: "place" | "render" | "click" | "levelUp" | "fail" | "pickaxe") => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioContext = audioContextRef.current;
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.connect(gain);
      gain.connect(audioContext.destination);

      const now = audioContext.currentTime;

      if (type === "place") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(10, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "render") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(880, now + 0.4);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.48);
      } else if (type === "click") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "levelUp") {
        osc.type = "square";
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.08); // A5
        osc.frequency.setValueAtTime(1174.66, now + 0.16); // D6
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === "fail") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(60, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === "pickaxe") {
        // Metallic clink of pickaxe on ore
        osc.type = "square";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch {
      // Audio unsupported or blocked
    }
  };

  // Lock scroll and handle ESC key
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedFile) {
          setSelectedFile(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (pipelineIntervalRef.current) {
        clearInterval(pipelineIntervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [onClose, selectedFile]);

  // Terminal boot loader
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBooting(false);
          playRetroSound("levelUp");
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 12;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Fluctuating Gold Target for Great Archive Lockpick
  useEffect(() => {
    if (project.gameType !== "archives" || booting) return;
    const loop = setInterval(() => {
      setGoldTarget(() => {
        const offset = Math.floor(Math.random() * 56) + 22; // fluctuate between 22% and 78%
        return offset;
      });
    }, 2600);
    return () => clearInterval(loop);
  }, [project.gameType, booting]);

  // --- Terraform Pipeline Actions ---
  const runPipelineSimulation = () => {
    if (pipelineStatus === "running") return;
    setPipelineStatus("running");
    setPipelineLog([
      "[sys] terraform init -upgrade",
      "[sys] Initializing HashiCorp AWS provider v5.42.0...",
      "[sys] Terraform backend state S3 bucket verified."
    ]);
    playRetroSound("click");

    const messages = [
      `[sys] terraform plan -out=tfplan`,
      `[plan] 1 AWS VPC, 2 Public Subnets, 1 Application Load Balancer will be provisioned`,
      `[plan] Provisioning ${ec2Nodes} target EC2 t3.medium worker nodes...`,
      vpcSecurity === "OPEN_PORT_22"
        ? `[warn] SECURITY ALERT: Port 22 SSH ingress open to 0.0.0.0/0 (High Vulnerability)`
        : `[info] SECURITY AUDIT: Ingress restricted to 443 (HTTPS) with TLS 1.3 certificate.`,
      `[sys] terraform apply -auto-approve tfplan`,
      `[sys] Injecting synthesized network traffic: ${trafficLoad} intensity...`,
      `[sys] Running ALB target health diagnostic probes...`
    ];

    if (pipelineIntervalRef.current) {
      clearInterval(pipelineIntervalRef.current);
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < messages.length) {
        const msg = messages[index];
        setPipelineLog((prev) => [...prev, msg]);
        playRetroSound("place");
        index++;
      } else {
        clearInterval(interval);
        pipelineIntervalRef.current = null;

        let isSuccess = true;
        let finalLog = "";

        if (trafficLoad === "HIGH" && ec2Nodes < 3) {
          finalLog = `[fatal] Cluster overwhelmed! Average CPU > 94%. ALB dropped connections (502 Bad Gateway). Deploy more nodes!`;
          isSuccess = false;
        } else if (trafficLoad === "MEDIUM" && ec2Nodes < 2) {
          finalLog = `[fatal] Insufficient node capacity. Request queue full. Latency > 4500ms. Scale up replicas!`;
          isSuccess = false;
        } else {
          const latency = trafficLoad === "HIGH" ? "38ms" : trafficLoad === "MEDIUM" ? "22ms" : "9ms";
          finalLog = `[success] Cluster Healthy. All ${ec2Nodes} nodes in state 200 OK. Average Latency: ${latency}. Security Check: PASSED.`;
        }

        setPipelineLog((prev) => [...prev, finalLog]);
        setPipelineStatus(isSuccess ? "success" : "failed");
        playRetroSound(isSuccess ? "levelUp" : "fail");
      }
    }, 320);

    pipelineIntervalRef.current = interval;
  };

  const resetPipelineSimulator = () => {
    playRetroSound("click");
    setEc2Nodes(2);
    setTrafficLoad("MEDIUM");
    setVpcSecurity("SECURE_HTTPS");
    setPipelineLog([]);
    setPipelineStatus("idle");
  };

  // --- Methane AI Scanner Actions ---
  const runMethaneScan = () => {
    if (scanning) return;
    setScanning(true);
    setAnalyzed(false);
    setSelectedCell(null);
    playRetroSound("render");

    setTimeout(() => {
      let noiseLevel = 0;
      let conf = 95.4;

      if (spectralBand === "SWIR_12") {
        conf = 97.8;
      } else if (spectralBand === "SWIR_7") {
        conf = 84.5;
        noiseLevel = 10;
      } else if (spectralBand === "THERMAL_10") {
        conf = 72.3;
        noiseLevel = 15;
      } else if (spectralBand === "NIR_8") {
        conf = 44.1;
        noiseLevel = 35;
      }

      let count = 0;
      methaneGridData.forEach((row) => {
        row.forEach((val) => {
          const noise = noiseLevel > 0 ? (Math.random() * noiseLevel - noiseLevel / 2) : 0;
          const finalVal = Math.max(0, val + noise);
          if (finalVal >= sensitivity) {
            count++;
          }
        });
      });

      setHotspotsCount(count);
      setConfidence(parseFloat(conf.toFixed(1)));
      setScanning(false);
      setAnalyzed(true);
      playRetroSound(count > 0 ? "levelUp" : "click");
    }, 1100);
  };

  const resetMethaneScan = () => {
    playRetroSound("click");
    setSpectralBand("SWIR_12");
    setSensitivity(55);
    setScanning(false);
    setAnalyzed(false);
    setConfidence(null);
    setHotspotsCount(0);
    setSelectedCell(null);
  };

  // --- The Great Archive Tumbler Action ---
  const handleMineBlock = () => {
    playRetroSound("pickaxe");
    const distance = Math.abs(miningOffset - goldTarget);

    if (distance <= 8) {
      playRetroSound("levelUp");
      setArchivedFiles((prev) => {
        const copy = [...prev];
        const lockedIdx = copy.findIndex((f) => !f.unlocked);
        if (lockedIdx !== -1) {
          copy[lockedIdx].unlocked = true;
          setVaultFeedback(`🎉 TUMBLER UNLOCKED! Decrypted secret scroll: "${copy[lockedIdx].title}"!`);
        } else {
          setVaultFeedback("👑 ARCHIVE FULLY DECIPHERED! All classified scrolls are unlocked for your review!");
        }
        return copy;
      });
    } else {
      playRetroSound("fail");
      if (distance <= 14) {
        setVaultFeedback("⚡ WARM! Pickaxe struck near the rune vein. Adjust slightly and strike again!");
      } else {
        setVaultFeedback("❌ COLD! Tumbler pins misaligned. Move slider to track the fluctuating gold zone!");
      }
    }
  };

  const distance = Math.abs(miningOffset - goldTarget);
  const hotnessBadge =
    distance <= 8
      ? { text: "🔥 PERFECT ALIGNMENT • STRIKE NOW!", color: "text-[#8ce99a] bg-[#1e3a15] border-[#8ce99a]" }
      : distance <= 14
      ? { text: "⚡ WARM • VERY CLOSE!", color: "text-[#ffd700] bg-[#3a2f15] border-[#ffd700]" }
      : { text: "🧊 COLD • TRACK GOLD ZONE", color: "text-zinc-400 bg-zinc-900 border-zinc-700" };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 pb-6 overflow-y-auto overscroll-contain select-none"
      style={{ overscrollBehavior: "contain" }}
    >
      {/* Minecraft Deepslate Arcade Console Board */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#201d19] border-4 border-[#121610] text-white flex flex-col max-h-[calc(100vh-5rem)] overflow-hidden shadow-2xl relative overscroll-contain"
        style={{
          boxShadow:
            "inset 4px 4px 0px rgba(255, 255, 255, 0.15), inset -4px -4px 0px rgba(0, 0, 0, 0.8), 0 20px 60px rgba(0, 0, 0, 0.95)",
          overscrollBehavior: "contain"
        }}
      >
        {/* Terminal Header Bar */}
        <div className="flex justify-between items-center bg-[#151311] px-5 py-3 border-b-4 border-[#121610] text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#0e130c] border border-[#3c8527] font-mono text-[10px] font-bold text-[#8CE99A] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#8CE99A] animate-pulse" />
              <span>VOXEL SIMULATOR V2.4</span>
            </div>
            <h2 className="font-mono text-sm md:text-base font-bold text-[#ffd700] uppercase tracking-wide truncate max-w-[200px] sm:max-w-md">
              {project.title}
            </h2>
          </div>

          <button
            id="close-simulator"
            onClick={onClose}
            aria-label="Close simulator"
            className="voxel-button bg-red-600 hover:bg-red-500 text-white p-1.5 transition-all cursor-pointer"
            style={{
              boxShadow:
                "inset 2px 2px 0px rgba(255, 255, 255, 0.45), inset -2px -2px 0px rgba(0, 0, 0, 0.6)"
            }}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
          </button>
        </div>

        {/* Boot Screen */}
        {booting ? (
          <div className="flex-grow flex flex-col items-center justify-center py-20 px-6 font-mono text-center space-y-6 bg-[#0f0e0c]">
            <div className="p-4 bg-[#1a1714] border-4 border-[#121610] max-w-md w-full space-y-4 shadow-xl">
              <div className="flex items-center justify-center gap-2 text-[#8CE99A] text-xs uppercase font-bold tracking-widest">
                <Cpu className="w-4 h-4 animate-spin" />
                <span>MOUNTING VOXEL RUNTIME MODULE...</span>
              </div>

              <p className="text-xs text-[#ffd700] italic font-sans">{project.playMessage}</p>

              {/* Segmented Minecraft XP Chunks Bar */}
              <div className="w-full bg-[#0a0c09] border-4 border-[#121610] p-1">
                <div className="grid grid-cols-10 gap-1 h-5">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const chunkThreshold = (i + 1) * 10;
                    const isLit = progress >= chunkThreshold;
                    return (
                      <div
                        key={i}
                        className={`h-full transition-all duration-150 ${
                          isLit
                            ? "bg-gradient-to-t from-[#2e5322] to-[#8CE99A] shadow-[0_0_8px_rgba(140,233,154,0.6)]"
                            : "bg-[#181d16]"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                <span>PORT: 3000 // REDSTONE CLOCK ACTIVE</span>
                <span className="text-[#8CE99A] font-bold">{Math.min(progress, 100)}%</span>
              </div>
            </div>

            <button
              onClick={() => {
                setProgress(100);
                setBooting(false);
                playRetroSound("levelUp");
              }}
              className="px-3 py-1 bg-[#1a1714] hover:bg-[#28241f] border-2 border-zinc-700 text-zinc-400 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              [ Click to bypass boot sequence ]
            </button>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 overscroll-contain bg-[#171513]">
            {/* ============================================================ */}
            {/* GAME 1: TERRAFORM PIPELINE SIMULATOR                         */}
            {/* ============================================================ */}
            {project.gameType === "pipeline" && (
              <div className="space-y-6">
                {/* Header Overview */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#24201c] p-4 border-4 border-[#121610]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase bg-[#c97d26] text-white border border-[#121610]">
                        AWS CLUSTER
                      </span>
                      <span className="font-mono text-xs text-[#8CE99A] font-bold flex items-center gap-1">
                        <Server className="w-3.5 h-3.5" />
                        Infrastructure as Code
                      </span>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-white uppercase">
                      Terraform Pipeline Orchestrator
                    </h3>
                    <p className="text-xs text-[#d6c5ad] font-sans">
                      Scale worker node replicas, direct network traffic intensity, and verify load balancer health.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      id="btn-deploy-infra"
                      onClick={runPipelineSimulation}
                      disabled={pipelineStatus === "running"}
                      className="voxel-button bg-[#3c8527] hover:bg-[#4c9e33] text-white text-xs font-mono font-bold uppercase py-2.5 px-4 flex-grow sm:flex-grow-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                      style={{
                        boxShadow: "inset 2px 2px 0px #72cc50, inset -2px -2px 0px #215114, 0 4px 10px rgba(0,0,0,0.5)",
                        textShadow: "1px 1px 0px #121610"
                      }}
                    >
                      <Zap className="w-3.5 h-3.5 text-[#ffd700]" />
                      <span>{pipelineStatus === "running" ? "Applying Stack..." : "Deploy Terraform Stack"}</span>
                    </button>

                    <button
                      id="btn-reset-infra"
                      onClick={resetPipelineSimulator}
                      title="Reset Cluster"
                      aria-label="Reset cluster parameters"
                      className="voxel-button bg-[#332f2b] hover:bg-[#453f3a] text-[#b5aba0] hover:text-white p-2.5 border-2 border-[#121610] cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Voxel Cluster Topology Visualizer */}
                <div className="bg-[#100f0d] p-4 border-4 border-[#121610] relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 font-mono text-[11px]">
                    <span className="text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#8CE99A]" />
                      Live Cluster Node Topology
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                        pipelineStatus === "running"
                          ? "bg-yellow-950 text-yellow-400 border-yellow-600 animate-pulse"
                          : pipelineStatus === "success"
                          ? "bg-emerald-950 text-emerald-400 border-emerald-600"
                          : pipelineStatus === "failed"
                          ? "bg-rose-950 text-rose-400 border-rose-600"
                          : "bg-zinc-900 text-zinc-400 border-zinc-700"
                      }`}
                    >
                      CLUSTER STATUS: {pipelineStatus.toUpperCase()}
                    </span>
                  </div>

                  {/* Nodes Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                    {Array.from({ length: ec2Nodes }).map((_, i) => {
                      const isOverloaded = trafficLoad === "HIGH" && ec2Nodes < 3 && pipelineStatus === "failed";
                      return (
                        <div
                          key={i}
                          className={`p-3 border-2 transition-all flex flex-col justify-between space-y-2 select-none ${
                            isOverloaded
                              ? "bg-red-950/70 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)] animate-pulse"
                              : pipelineStatus === "success"
                              ? "bg-[#182b14] border-[#3c8527] shadow-[0_0_12px_rgba(60,133,39,0.35)]"
                              : "bg-[#1d1b18] border-zinc-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-zinc-400">NODE 0{i + 1}</span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isOverloaded
                                  ? "bg-red-500 animate-ping"
                                  : pipelineStatus === "success"
                                  ? "bg-[#8CE99A]"
                                  : "bg-zinc-600"
                              }`}
                            />
                          </div>

                          <div className="text-center py-2">
                            <Server
                              className={`w-7 h-7 mx-auto transition-transform ${
                                isOverloaded ? "text-red-400 scale-110" : "text-[#8CE99A]"
                              }`}
                            />
                            <p className="font-mono text-[10px] text-zinc-300 mt-1">t3.medium</p>
                          </div>

                          <div className="pt-2 border-t border-zinc-800 flex justify-between items-center font-mono text-[9px]">
                            <span className="text-zinc-500">CPU LOAD:</span>
                            <span
                              className={`font-bold ${
                                isOverloaded
                                  ? "text-red-400"
                                  : trafficLoad === "HIGH"
                                  ? "text-yellow-400"
                                  : "text-emerald-400"
                              }`}
                            >
                              {isOverloaded ? "98%" : trafficLoad === "HIGH" ? "64%" : "28%"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dashboard Controls & CRT Log Output Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left: Interactive Controls (5 cols) */}
                  <div className="lg:col-span-5 bg-[#201d19] p-4 border-4 border-[#121610] space-y-4 font-mono text-xs">
                    <p className="text-xs text-[#ffd700] uppercase font-bold border-b border-zinc-800 pb-2">
                      Terraform Variables
                    </p>

                    {/* EC2 Node Count Stepper */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-zinc-400 text-[11px]">
                        <span>Worker Replica Count:</span>
                        <span className="text-[#8CE99A] font-bold">{ec2Nodes} Instances</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            playRetroSound("click");
                            setEc2Nodes((prev) => Math.max(1, prev - 1));
                          }}
                          disabled={pipelineStatus === "running"}
                          className="flex-1 py-1.5 bg-[#2d2822] hover:bg-[#3d362e] border-2 border-[#121610] font-bold text-white transition-colors cursor-pointer disabled:opacity-40"
                        >
                          - Decr
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playRetroSound("click");
                            setEc2Nodes((prev) => Math.min(4, prev + 1));
                          }}
                          disabled={pipelineStatus === "running"}
                          className="flex-1 py-1.5 bg-[#2d2822] hover:bg-[#3d362e] border-2 border-[#121610] font-bold text-white transition-colors cursor-pointer disabled:opacity-40"
                        >
                          + Incr
                        </button>
                      </div>
                    </div>

                    {/* Simulated Traffic Load */}
                    <div className="space-y-1.5">
                      <span className="text-zinc-400 text-[11px]">Traffic Intensity:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(["LOW", "MEDIUM", "HIGH"] as const).map((load) => (
                          <button
                            key={load}
                            type="button"
                            onClick={() => {
                              playRetroSound("click");
                              setTrafficLoad(load);
                            }}
                            disabled={pipelineStatus === "running"}
                            className={`py-1.5 px-2 text-[10px] font-bold uppercase border-2 transition-all cursor-pointer ${
                              trafficLoad === load
                                ? "bg-[#3c8527] border-[#8CE99A] text-white shadow-[0_0_8px_rgba(140,233,154,0.3)]"
                                : "bg-[#25211c] border-[#121610] text-zinc-400 hover:text-white"
                            }`}
                          >
                            {load === "LOW" ? "100/s" : load === "MEDIUM" ? "5k/s" : "20k/s"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Security Policy Toggle */}
                    <div className="space-y-1.5">
                      <span className="text-zinc-400 text-[11px]">VPC Ingress Policy:</span>
                      <button
                        type="button"
                        onClick={() => {
                          playRetroSound("click");
                          setVpcSecurity((prev) =>
                            prev === "SECURE_HTTPS" ? "OPEN_PORT_22" : "SECURE_HTTPS"
                          );
                        }}
                        disabled={pipelineStatus === "running"}
                        className={`w-full py-2 px-3 text-left border-2 flex items-center justify-between text-[11px] font-bold transition-all cursor-pointer ${
                          vpcSecurity === "SECURE_HTTPS"
                            ? "bg-[#182814] border-[#3c8527] text-[#8ce99a]"
                            : "bg-[#331515] border-red-500 text-red-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {vpcSecurity === "SECURE_HTTPS" ? (
                            <ShieldCheck className="w-4 h-4 text-[#8ce99a]" />
                          ) : (
                            <ShieldAlert className="w-4 h-4 text-red-400" />
                          )}
                          <span>
                            {vpcSecurity === "SECURE_HTTPS"
                              ? "SSL/TLS (Port 443 Only)"
                              : "Open Port 22 (Insecure)"}
                          </span>
                        </div>
                        <span className="text-[9px] uppercase underline">Toggle</span>
                      </button>
                    </div>
                  </div>

                  {/* Right: Retro CRT Terminal Execution Log (7 cols) */}
                  <div
                    className="lg:col-span-7 border-4 border-[#121610] p-4 bg-[#0a0c09] font-mono text-[11px] flex flex-col justify-between min-h-[240px] relative overflow-hidden"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) 1px, transparent 1px, transparent 2px)"
                    }}
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#8CE99A]" />
                        TERRAFORM_CLI_SESSION.LOG
                      </span>
                      <span className="text-[#8CE99A]">TTY: ACTIVE</span>
                    </div>

                    <div className="space-y-1.5 overflow-y-auto max-h-[180px] pr-1">
                      {pipelineLog.length === 0 ? (
                        <p className="text-zinc-500 italic">
                          Cluster ready. Press [Deploy Terraform Stack] to execute plan & apply.
                        </p>
                      ) : (
                        pipelineLog.map((log, i) => {
                          let color = "text-[#8CE99A]";
                          if (log.startsWith("[warn]")) color = "text-[#ffd700] font-bold";
                          if (log.startsWith("[fatal]")) color = "text-red-400 font-bold";
                          if (log.startsWith("[success]")) color = "text-[#8ce99a] font-bold";
                          if (log.startsWith("[plan]")) color = "text-cyan-300";
                          return (
                            <p key={i} className={`${color} leading-relaxed`}>
                              {log}
                            </p>
                          );
                        })
                      )}
                    </div>

                    {pipelineStatus !== "idle" && (
                      <div className="mt-3 pt-2 border-t border-zinc-800 flex justify-between items-center text-xs uppercase">
                        <span className="text-zinc-400">Health Status:</span>
                        <span
                          className={`font-bold ${
                            pipelineStatus === "running"
                              ? "text-[#ffd700] animate-pulse"
                              : pipelineStatus === "success"
                              ? "text-[#8CE99A]"
                              : "text-red-400"
                          }`}
                        >
                          {pipelineStatus === "running" ? "Provisioning..." : pipelineStatus.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* GAME 2: METHANE AI SCANNER                                   */}
            {/* ============================================================ */}
            {project.gameType === "plume" && (
              <div className="space-y-6">
                {/* Header Overview */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#1d261b] p-4 border-4 border-[#121610]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase bg-[#3c8527] text-white border border-[#121610]">
                        ORBITAL AI
                      </span>
                      <span className="font-mono text-xs text-[#8CE99A] font-bold flex items-center gap-1">
                        <Satellite className="w-3.5 h-3.5 text-[#ffd700]" />
                        Hyperspectral Telemetry
                      </span>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-white uppercase">
                      Methane AI Scanner & Telemetry
                    </h3>
                    <p className="text-xs text-[#d6c5ad] font-sans">
                      Calibrate satellite spectral bands and PPM detection sensitivity to map greenhouse emissions.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      id="btn-scan-plume"
                      onClick={runMethaneScan}
                      disabled={scanning}
                      className="voxel-button bg-[#3c8527] hover:bg-[#4c9e33] text-white text-xs font-mono font-bold uppercase py-2.5 px-4 flex-grow sm:flex-grow-0 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                      style={{
                        boxShadow: "inset 2px 2px 0px #72cc50, inset -2px -2px 0px #215114, 0 4px 10px rgba(0,0,0,0.5)",
                        textShadow: "1px 1px 0px #121610"
                      }}
                    >
                      <Radar className={`w-3.5 h-3.5 ${scanning ? "animate-spin text-[#ffd700]" : "text-[#8ce99a]"}`} />
                      <span>{scanning ? "Sweeping Telemetry..." : "Execute AI Scan"}</span>
                    </button>

                    <button
                      id="btn-reset-plume"
                      onClick={resetMethaneScan}
                      title="Reset Telemetry"
                      aria-label="Reset telemetry parameters"
                      className="voxel-button bg-[#332f2b] hover:bg-[#453f3a] text-[#b5aba0] hover:text-white p-2.5 border-2 border-[#121610] cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Radar Grid and Diagnostics Split View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#111310] p-4 sm:p-5 border-4 border-[#121610]">
                  {/* Left: 6x6 Coordinate Radar Matrix (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-3">
                    <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="uppercase font-bold flex items-center gap-1 text-[#8CE99A]">
                        <Radio className="w-3.5 h-3.5" />
                        Radar Matrix [6x6 Array]
                      </span>
                      <span className="text-[10px] text-zinc-500">CLICK ANY CELL TO INSPECT</span>
                    </div>

                    {/* Voxel Radar Grid with sweep overlay */}
                    <div className="relative p-2 bg-[#090b08] border-4 border-[#121610] shadow-inner">
                      {/* Animated radar sweep line during scan */}
                      {scanning && (
                        <div
                          className="absolute inset-0 bg-gradient-to-b from-cyan-400/25 via-emerald-400/15 to-transparent pointer-events-none z-20 animate-pulse"
                          style={{
                            animation: "pulse 0.8s ease-in-out infinite"
                          }}
                        />
                      )}

                      <div className="grid grid-cols-6 gap-1 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]">
                        {methaneGridData.map((row, r) =>
                          row.map((val, c) => {
                            const isDetected = analyzed && val >= sensitivity;
                            const isSelected = selectedCell?.r === r && selectedCell?.c === c;

                            let bgStyle = "bg-[#181d16] hover:bg-[#252f22]";
                            if (analyzed) {
                              if (isDetected) {
                                if (val > 80)
                                  bgStyle =
                                    "bg-red-600 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.7)] animate-pulse";
                                else if (val > 60)
                                  bgStyle = "bg-orange-500 border-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.6)]";
                                else bgStyle = "bg-amber-500 border-amber-300 shadow-[0_0_6px_rgba(234,179,8,0.5)]";
                              } else {
                                if (val > 25) bgStyle = "bg-[#23351d] border-[#3c8527]/50";
                                else bgStyle = "bg-[#121a10] border-zinc-800";
                              }
                            }

                            return (
                              <button
                                key={`cell-${r}-${c}`}
                                type="button"
                                onClick={() => {
                                  playRetroSound("click");
                                  setSelectedCell({ r, c, val });
                                }}
                                className={`w-full aspect-square border transition-all flex flex-col items-center justify-center font-mono text-[9px] cursor-pointer relative ${bgStyle} ${
                                  isSelected ? "ring-2 ring-white scale-105 z-10" : ""
                                }`}
                              >
                                {analyzed && isDetected && (
                                  <span className="font-bold text-white text-[8px] sm:text-[9px] drop-shadow">
                                    {val}
                                  </span>
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Cell Inspection Detail Bar */}
                    <div className="w-full p-2 bg-[#1a1714] border-2 border-zinc-800 font-mono text-[11px] text-center">
                      {selectedCell ? (
                        <div className="flex justify-between items-center px-2">
                          <span className="text-[#ffd700]">
                            COORD: [X:{selectedCell.c}, Y:{selectedCell.r}]
                          </span>
                          <span className="text-white font-bold">{selectedCell.val} PPM</span>
                          <span
                            className={`font-bold ${
                              selectedCell.val >= 75
                                ? "text-red-400"
                                : selectedCell.val >= 50
                                ? "text-orange-400"
                                : "text-[#8ce99a]"
                            }`}
                          >
                            {selectedCell.val >= 75
                              ? "Severe Plume"
                              : selectedCell.val >= 50
                              ? "Moderate Plume"
                              : "Baseline"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-zinc-500 italic">Tap any matrix cell to inspect coordinate telemetry.</span>
                      )}
                    </div>
                  </div>

                  {/* Right: Sensor Band & Threshold Controls (6 cols) */}
                  <div className="lg:col-span-6 space-y-4 font-mono text-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Sensor Band Selection */}
                      <div className="space-y-2">
                        <span className="text-zinc-400 text-[11px] uppercase font-bold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#ffd700]" />
                          Spectral Sensor Instrument Band:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "SWIR_12", label: "SWIR Band 12", desc: "Optimal Absorption • 97.8%" },
                            { id: "SWIR_7", label: "SWIR Band 7", desc: "Shortwave Radiance • 84.5%" },
                            { id: "THERMAL_10", label: "Thermal Band 10", desc: "Longwave IR • 72.3%" },
                            { id: "NIR_8", label: "NIR Band 8", desc: "High Atmospheric Noise" }
                          ].map((band) => (
                            <button
                              key={band.id}
                              type="button"
                              onClick={() => {
                                playRetroSound("click");
                                setSpectralBand(band.id as any);
                              }}
                              disabled={scanning}
                              className={`p-2.5 text-left border-2 transition-all cursor-pointer ${
                                spectralBand === band.id
                                  ? "bg-[#253d1d] border-[#8ce99a] text-white shadow-[0_0_10px_rgba(140,233,154,0.3)]"
                                  : "bg-[#181714] border-zinc-800 text-zinc-400 hover:text-white"
                              }`}
                            >
                              <p className="font-bold text-[11px] text-[#ffd700]">{band.label}</p>
                              <p className="text-[9px] text-zinc-400 mt-0.5">{band.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* PPM Sensitivity Threshold */}
                      <div className="p-3 bg-[#181714] border-2 border-zinc-800 space-y-2">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-zinc-300">Detection Threshold (PPM):</span>
                          <span className="text-[#8CE99A] font-bold text-sm">{sensitivity} PPM</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="85"
                          value={sensitivity}
                          disabled={scanning}
                          onChange={(e) => setSensitivity(Number(e.target.value))}
                          className="w-full accent-[#8CE99A] h-2 bg-zinc-800 rounded-none appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
                          <span>30 PPM (High Sensitivity)</span>
                          <span>85 PPM (Strict High-Purity)</span>
                        </div>
                      </div>
                    </div>

                    {/* Scan Diagnostic Report HUD */}
                    <div className="p-3.5 bg-[#090b08] border-2 border-zinc-800 text-[11px] flex flex-col justify-center space-y-2">
                      {scanning ? (
                        <p className="text-cyan-400 animate-pulse text-center font-bold">
                          🛰️ Calibrating hyperspectral telemetry matrices...
                        </p>
                      ) : analyzed ? (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400">Identified Plume Hotspots:</span>
                            <span
                              className={`font-bold px-2 py-0.5 border ${
                                hotspotsCount > 0
                                  ? "bg-red-950 text-red-400 border-red-600 animate-pulse"
                                  : "bg-emerald-950 text-emerald-400 border-emerald-600"
                              }`}
                            >
                              {hotspotsCount > 0 ? `${hotspotsCount} Coordinates Confirmed` : "Clean / No Plumes"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-zinc-400">AI Confidence Rating:</span>
                            <span className="text-[#8CE99A] font-bold">{confidence}%</span>
                          </div>

                          {spectralBand === "NIR_8" && (
                            <p className="text-[10px] text-yellow-400 italic">
                              ⚠️ Notice: Near Infrared band exhibits atmospheric solar scattering noise.
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-zinc-500 italic text-center">
                          Instrument standing by. Tweak parameters and execute AI scan.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* GAME 3: THE GREAT ARCHIVE (Secret Knowledge Vault)           */}
            {/* ============================================================ */}
            {project.gameType === "archives" && (
              <div className="space-y-6">
                {/* Header Overview */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#241f17] p-4 border-4 border-[#121610]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase bg-[#c69c36] text-black border border-[#121610]">
                        CLASSIFIED VAULT
                      </span>
                      <span className="font-mono text-xs text-[#ffd700] font-bold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        Secret Developer Lore
                      </span>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-white uppercase">
                      The Great Archive • Secret Knowledge Vault
                    </h3>
                    <p className="text-xs text-[#d6c5ad] font-sans">
                      Top-secret wisdom accessible only to adventurers who pass the trial! Align the pickaxe with the gold target to unlock encrypted scrolls.
                    </p>
                  </div>

                  <span className="px-3 py-1 font-mono text-xs text-[#8CE99A] bg-[#1a2517] border border-[#3c8527] font-bold self-start sm:self-auto">
                    {archivedFiles.filter((f) => f.unlocked).length} / {archivedFiles.length} Decrypted
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Interactive Obsidian Tumbler Lockpick Game (6 cols) */}
                  <div className="lg:col-span-6 bg-[#161311] p-5 border-4 border-[#121610] flex flex-col justify-between space-y-4 font-mono shadow-inner">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="text-xs text-[#ffd700] uppercase font-bold flex items-center gap-1.5">
                        <Pickaxe className="w-4 h-4 text-[#8CE99A]" />
                        Obsidian Tumbler Lock
                      </span>
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${hotnessBadge.color}`}>
                        {hotnessBadge.text}
                      </span>
                    </div>

                    {/* Visual Track Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-zinc-400">
                        <span>Target Rune Vein:</span>
                        <span className="text-[#ffd700] font-bold">~{goldTarget}%</span>
                      </div>

                      <div className="relative w-full h-10 bg-[#0d0a08] border-2 border-zinc-700 overflow-hidden">
                        {/* Target Gold Zone */}
                        <div
                          className="absolute top-0 bottom-0 bg-[#ffd700]/30 border-x-2 border-[#ffd700] z-10 transition-all duration-300 flex items-center justify-center"
                          style={{
                            left: `${Math.max(0, goldTarget - 7)}%`,
                            width: "14%"
                          }}
                        >
                          <span className="text-[9px] text-[#ffd700] font-bold hidden sm:inline">GOLD</span>
                        </div>

                        {/* Moving Pickaxe Cursor */}
                        <div
                          className="absolute top-0 bottom-0 w-2 bg-[#8CE99A] shadow-[0_0_8px_#8CE99A] z-20 transition-all duration-75"
                          style={{
                            left: `${miningOffset}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Slider Control */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-zinc-400">
                        <span>Align Pickaxe Position:</span>
                        <span className="text-[#8CE99A] font-bold">{miningOffset}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={miningOffset}
                        onChange={(e) => setMiningOffset(Number(e.target.value))}
                        className="w-full accent-[#8CE99A] h-2.5 bg-zinc-800 rounded-none appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Strike Tumbler Button */}
                    <button
                      id="btn-mine-block"
                      type="button"
                      onClick={handleMineBlock}
                      className="voxel-button w-full bg-[#c69c36] hover:bg-[#d8ac3e] text-black font-mono font-bold uppercase py-3 text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                      style={{
                        boxShadow: "inset 2px 2px 0px #ffd700, inset -2px -2px 0px #8b6d1b, 0 4px 10px rgba(0,0,0,0.5)"
                      }}
                    >
                      <Pickaxe className="w-4 h-4" />
                      <span>Strike Vault Tumbler</span>
                    </button>

                    {/* Feedback message */}
                    <p className="text-[11px] text-zinc-300 text-center uppercase min-h-[32px] p-2 bg-[#0d0a08] border border-zinc-800 flex items-center justify-center">
                      {vaultFeedback}
                    </p>
                  </div>

                  {/* Right: Secret Files Index List (6 cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-2">
                    <span className="font-mono text-xs text-[#ffd700] uppercase font-bold tracking-wider">
                      Secret Document Archives:
                    </span>

                    <div className="space-y-2">
                      {archivedFiles.map((file, idx) => (
                        <button
                          key={file.id}
                          disabled={!file.unlocked}
                          onClick={() => {
                            playRetroSound("click");
                            setSelectedFile(file.id);
                          }}
                          className={`w-full p-3 text-left border-2 uppercase font-mono text-xs flex items-center justify-between transition-all ${
                            !file.unlocked
                              ? "bg-[#181512] border-zinc-800 text-zinc-600 cursor-not-allowed opacity-60"
                              : selectedFile === file.id
                              ? "bg-[#3c8527] text-white border-[#8CE99A] shadow-[0_0_10px_rgba(140,233,154,0.4)]"
                              : "bg-[#25201a] border-zinc-700 text-zinc-200 hover:bg-[#342d25] hover:text-white cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="text-[10px] text-zinc-500 font-bold">0{idx + 1}.</span>
                            <span className="truncate">{file.title}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase border flex items-center gap-1 ${
                              file.unlocked
                                ? "bg-emerald-950 text-emerald-400 border-emerald-600"
                                : "bg-zinc-900 text-zinc-500 border-zinc-700"
                            }`}
                          >
                            {file.unlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                            <span>{file.unlocked ? "READ" : "LOCKED"}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-zinc-500 font-mono italic text-center pt-2">
                      * Passing the tumbler minigame sequentially unlocks each secret scroll.
                    </p>
                  </div>
                </div>

                {/* Secret Memo Reader Modal Board */}
                {selectedFile && (
                  <div className="bg-[#ede4cb] text-[#141712] p-5 sm:p-6 border-4 border-[#121610] font-sans text-sm shadow-2xl relative select-text animate-in fade-in duration-200">
                    <div className="flex justify-between items-center border-b-2 border-[#121610]/20 pb-2 mb-3">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#3c8527] uppercase">
                        <BookOpen className="w-4 h-4" />
                        <span>CLASSIFIED ARCHIVE RECORD • LEVEL CLEARED</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="px-2.5 py-1 bg-[#121610] hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase cursor-pointer"
                      >
                        Fold Scroll [X]
                      </button>
                    </div>

                    <h4 className="font-mono text-base font-bold text-[#141712] mb-3">
                      📜 {archivedFiles.find((f) => f.id === selectedFile)?.name}
                    </h4>

                    <pre className="whitespace-pre-wrap font-mono text-xs bg-[#dbd1b4] p-4 border-2 border-[#121610]/30 text-[#141712] leading-relaxed max-h-[220px] overflow-y-auto">
                      {archivedFiles.find((f) => f.id === selectedFile)?.content}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer info bar */}
        <div className="px-5 py-2.5 bg-[#12100e] text-center font-mono text-[10px] uppercase text-zinc-500 border-t-4 border-[#121610] flex justify-between items-center">
          <span>INTERACTIVE RETRO DEV CONSOLE V2.4</span>
          <span className="text-[#8CE99A]">AUTHENTIC VOXEL KERNEL</span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GameSimulator;
