import React, { useState, useEffect, useRef } from "react";
import { X, Play, RotateCcw, Power, Cpu, Shield, Zap, Search } from "lucide-react";
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

  // --- ISRO Methane Plume AI Scanner State ---
  const [spectralBand, setSpectralBand] = useState<"SWIR_12" | "SWIR_7" | "NIR_8" | "THERMAL_10">("SWIR_12");
  const [sensitivity, setSensitivity] = useState<number>(55);
  const [scanning, setScanning] = useState<boolean>(false);
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [hotspotsCount, setHotspotsCount] = useState<number>(0);

  const methaneGridData = [
    [10, 15, 25, 20, 12, 10],
    [12, 45, 68, 55, 18, 11],
    [15, 78, 95, 82, 35, 14],
    [11, 52, 88, 71, 24, 10],
    [9, 22, 41, 30, 15, 8],
    [8, 10, 15, 12, 9, 7]
  ];

  const [archivedFiles, setArchivedFiles] = useState([
    { name: "NAVNEET_SECRET_MEMO.TXT", unlocked: false, content: "FROM: Navneet\nTO: All Aspiring Developers\nSUBJECT: The Golden Rule of Engineering\n\nIf there's one thing you must master, it is Data Structures and Algorithms (DSA).\n\nNo matter how many frameworks or technologies pop up, solid algorithmic thinking is the bedrock. Solve problems, analyze time complexities, and keep practicing.\n\nTrust me, code optimization starts here!" },
    { name: "HOW_TO_GET_INTERNSHIP_3RD_YEAR.TXT", unlocked: false, content: "SUBJECT: FAANG 3rd Year Internship Checklist (100% Legit)\n\nTo secure an entry-level 3rd-year summer internship, please satisfy these simple expectations:\n\n1. Solve 1500+ LeetCode problems (minimum 500 Hard).\n2. Build 50+ production-grade full-stack applications.\n3. Show 10+ years of active cloud orchestration & Kubernetes experience.\n4. Design and implement a custom operating system kernel in assembly.\n5. Win at least two competitive programming world championships.\n\nNo pressure. Good luck!" },
    { name: "BONUS_TIP.TXT", unlocked: false, content: "SUBJECT: BONUS TIP\n\nYOU STILL HAVENT STARTED DSA????" },
  ]);
  const [miningOffset, setMiningOffset] = useState(50); // slider percent
  const [goldTarget, setGoldTarget] = useState(45); // target target percent
  const [vaultFeedback, setVaultFeedback] = useState("Target is fluctuating. Tap Mine to sync block!");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Sound generator helper using a shared AudioContext Ref to avoid browser tab resource exhaustion
  const playRetroSound = (type: "place" | "render" | "click" | "levelUp" | "fail") => {
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
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "fail") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(100, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(50, now + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.32);
      }
    } catch (e) {
      // Audio unsupported or blocked
    }
  };

  // Cleanup active intervals and audio context resource when simulator modal closes / unmounts
  useEffect(() => {
    return () => {
      if (pipelineIntervalRef.current) {
        clearInterval(pipelineIntervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => { });
      }
    };
  }, []);

  useEffect(() => {
    // Simulate voxel terminal load pipeline
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBooting(false);
          playRetroSound("levelUp");
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  // Sync Slider for decryptor minigame
  useEffect(() => {
    if (project.gameType !== "archives" || booting) return;
    const loop = setInterval(() => {
      setGoldTarget(() => {
        const offset = Math.floor(Math.random() * 60) + 20; // fluctuate target
        return offset;
      });
    }, 2800);
    return () => clearInterval(loop);
  }, [project.gameType, booting]);

  // --- Terraform Cloud Pipeline Simulator Actions ---
  const runPipelineSimulation = () => {
    if (pipelineStatus === "running") return;
    setPipelineStatus("running");
    setPipelineLog(["[sys] terraform init -upgrade", "[sys] Initializing provider plugins...", "[sys] Registry provider aws v5.4.0 loaded."]);
    playRetroSound("click");

    const messages = [
      `[sys] terraform plan -out=tfplan`,
      `[plan] 1 VPC, 2 Subnets, 1 ALB will be created`,
      `[plan] Deploying ${ec2Nodes} target EC2 instances...`,
      vpcSecurity === "OPEN_PORT_22"
        ? `[warn] SECURITY THREAT: Ingress allowed from 0.0.0.0:22 (SSH)`
        : `[info] SECURED: Ingress restricted to 443 (HTTPS) with SSL.`,
      `[sys] terraform apply -auto-approve`,
      `[sys] Directing network load: ${trafficLoad} intensity...`,
      `[sys] Initializing ALB target checks...`,
    ];

    if (pipelineIntervalRef.current) {
      clearInterval(pipelineIntervalRef.current);
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < messages.length) {
        // CAPTURE value to resolve closure index increment bug
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
          finalLog = `[fatal] Health checks failed: average CPU load > 92%. ALB reported 502 Bad Gateway. Deployment failed.`;
          isSuccess = false;
        } else if (trafficLoad === "MEDIUM" && ec2Nodes < 2) {
          finalLog = `[fatal] Timeout on Target Group: insufficient capacity. Request queue full. Latency > 6000ms.`;
          isSuccess = false;
        } else {
          const latency = trafficLoad === "HIGH" ? "42ms" : trafficLoad === "MEDIUM" ? "24ms" : "8ms";
          finalLog = `[success] Infrastructure active. ALB target status: HEALTHY. Average Latency: ${latency}.`;
        }

        setPipelineLog((prev) => [...prev, finalLog]);
        setPipelineStatus(isSuccess ? "success" : "failed");
        playRetroSound(isSuccess ? "levelUp" : "fail");
      }
    }, 350);

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

  // --- ISRO Methane Plume AI Scanner Actions ---
  const runMethaneScan = () => {
    if (scanning) return;
    setScanning(true);
    setAnalyzed(false);
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
        noiseLevel = 35; // high noise
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
    }, 1200);
  };

  const resetMethaneScan = () => {
    playRetroSound("click");
    setSpectralBand("SWIR_12");
    setSensitivity(55);
    setScanning(false);
    setAnalyzed(false);
    setConfidence(null);
    setHotspotsCount(0);
  };

  // Archive minigame attempt
  const handleMineBlock = () => {
    const distance = Math.abs(miningOffset - goldTarget);
    if (distance <= 8) {
      // Find locks to crack
      playRetroSound("levelUp");
      setArchivedFiles((prev) => {
        const copy = [...prev];
        const lockedIdx = copy.findIndex((f) => !f.unlocked);
        if (lockedIdx !== -1) {
          copy[lockedIdx].unlocked = true;
          setVaultFeedback(`🔒 Block matching! Decrepited: ${copy[lockedIdx].name}`);
        } else {
          setVaultFeedback("🎉 Decryptor complete. All ancient notes are now fully unlocked!");
        }
        return copy;
      });
    } else {
      playRetroSound("fail");
      setVaultFeedback("❌ Failed to bind Block Hash. Faction out of sync, please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Wooden Console Box Wrapper */}
      <div
        className="w-full max-w-2xl bg-stone border-4 border-on-surface text-white voxel-block flex flex-col max-h-[92vh] overflow-hidden"
        style={{
          backgroundColor: "#2d322a",
        }}
      >
        {/* Terminal Title Bar */}
        <div className="flex justify-between items-center bg-[#181d16] p-4 border-b-4 border-on-surface">
          <div className="flex items-center gap-2 font-mono text-xs md:text-sm text-primary-fixed-dim uppercase">
            <Cpu className="w-4 h-4 animate-spin text-[#a5f78d]" />
            <span>PORT_DEMO://{project.title}.BIN</span>
          </div>
          <button
            id="close-simulator"
            onClick={onClose}
            className="voxel-button bg-red-600 hover:bg-red-500 text-white p-1"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.45) 2px 2px 0px inset, rgba(0, 0, 0, 0.6) -2px -2px 0px inset",
            }}
          >
            <X className="w-5 h-5 font-bold" />
          </button>
        </div>

        {/* Boot Screen */}
        {booting ? (
          <div className="flex-grow flex flex-col items-center justify-center py-16 px-6 font-mono text-center space-y-6">
            <p className="text-sm tracking-wider text-green-400">
              Initializing voxel compilation module...
            </p>
            <p className="text-xs text-stone-400">{project.playMessage}</p>

            {/* Wooden Progress Bar Container */}
            <div className="w-64 h-8 bg-zinc-800 border-4 border-stone border-b-white border-r-white border-t-neutral-900 border-l-neutral-900 flex p-0.5">
              <div
                className="bg-primary h-full transition-all duration-150"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <p className="text-[10px] text-zinc-500 uppercase">SYS_PORT: 3000 // CORE DEVIATION ACTIVE</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {/* Game 1: Cloud Infrastructure Deployment Simulator */}
            {project.gameType === "pipeline" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="font-mono text-lg font-bold text-[#b4eeee] uppercase">Terraform Pipeline Orchestrator</h3>
                    <p className="text-xs text-stone-300">Set replicas, configure security policies, and deploy VPC clusters.</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      id="btn-deploy-infra"
                      onClick={runPipelineSimulation}
                      disabled={pipelineStatus === "running"}
                      className="voxel-button bg-[#c69c36] hover:bg-[#d8ac3e] text-white text-xs uppercase py-2 px-3 flex-grow sm:flex-grow-0 disabled:opacity-50"
                      style={{
                        boxShadow: "rgba(255, 255, 255, 0.45) 2px 2px 0px inset, rgba(0, 0, 0, 0.6) -2px -2px 0px inset",
                      }}
                    >
                      {pipelineStatus === "running" ? "Deploying..." : "🚀 Deploy Stack"}
                    </button>
                    <button
                      id="btn-reset-infra"
                      onClick={resetPipelineSimulator}
                      className="voxel-button bg-stone hover:bg-stone/80 text-white text-xs uppercase py-2 px-3"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                    </button>
                  </div>
                </div>

                {/* Dashboard / Control Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-950 p-4 border-4 border-on-surface">
                  {/* Left Side: Parameters Form */}
                  <div className="space-y-4 font-mono text-xs">
                    <p className="text-xs text-amber-500 uppercase font-bold border-b border-stone-850 pb-1 mb-2">
                      Pipeline Configurations
                    </p>

                    {/* EC2 Node Count Slider/Buttons */}
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-400">EC2 Target Replicas (ALB Group):</span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => { playRetroSound("click"); setEc2Nodes(prev => Math.max(1, prev - 1)); }}
                          disabled={pipelineStatus === "running"}
                          className="px-3 py-1 bg-stone border-2 border-on-surface font-bold text-white hover:bg-stone-600 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold text-[#a5f78d] px-3">{ec2Nodes} Instances</span>
                        <button
                          onClick={() => { playRetroSound("click"); setEc2Nodes(prev => Math.min(4, prev + 1)); }}
                          disabled={pipelineStatus === "running"}
                          className="px-3 py-1 bg-stone border-2 border-on-surface font-bold text-white hover:bg-stone-600 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Load Level Selector */}
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-400">Simulate Target Traffic Load:</span>
                      <select
                        value={trafficLoad}
                        onChange={(e) => { playRetroSound("click"); setTrafficLoad(e.target.value as any); }}
                        disabled={pipelineStatus === "running"}
                        className="bg-[#2d322a] border-2 border-on-surface p-1.5 font-bold uppercase rounded-none text-white outline-none cursor-pointer"
                      >
                        <option value="LOW">Low (100 req/s)</option>
                        <option value="MEDIUM">Medium (5000 req/s)</option>
                        <option value="HIGH">High (20000 req/s)</option>
                      </select>
                    </div>

                    {/* Security policy Selector */}
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-400">VPC Security Protocol:</span>
                      <select
                        value={vpcSecurity}
                        onChange={(e) => { playRetroSound("click"); setVpcSecurity(e.target.value as any); }}
                        disabled={pipelineStatus === "running"}
                        className="bg-[#2d322a] border-2 border-on-surface p-1.5 font-bold uppercase rounded-none text-white outline-none cursor-pointer"
                      >
                        <option value="SECURE_HTTPS">Secure HTTPS (Restrict Port 22)</option>
                        <option value="OPEN_PORT_22">Open Port 22 (SSH Open to World)</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Side: Log Console Output */}
                  <div className="flex flex-col justify-between h-[200px] border-4 border-on-surface p-3 bg-black font-mono text-[10px] text-[#a5f78d] overflow-y-auto">
                    <div className="space-y-1">
                      {pipelineLog.length === 0 ? (
                        <p className="text-zinc-500 italic uppercase">System ready. Awaiting cluster deployment plan...</p>
                      ) : (
                        pipelineLog.map((log, i) => {
                          let color = "text-[#a5f78d]";
                          if (log && typeof log === "string") {
                            if (log.startsWith("[warn]")) color = "text-yellow-450 font-bold";
                            if (log.startsWith("[fatal]")) color = "text-red-500 font-bold";
                            if (log.startsWith("[success]")) color = "text-green-400 font-bold";
                          }
                          return (
                            <p key={i} className={color}>
                              {log}
                            </p>
                          );
                        })
                      )}
                    </div>
                    {pipelineStatus !== "idle" && (
                      <div className="mt-3 pt-2 border-t border-zinc-900 flex justify-between items-center text-xs uppercase">
                        <span>Status:</span>
                        <span className={`font-bold ${pipelineStatus === "running" ? "text-yellow-400 animate-pulse" :
                            pipelineStatus === "success" ? "text-green-400" : "text-red-500"
                          }`}>
                          {pipelineStatus}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Game 2: ISRO Methane Plume AI Scanner */}
            {project.gameType === "plume" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="font-mono text-lg font-bold text-emerald-400 uppercase">ISRO Methane AI Detector</h3>
                    <p className="text-xs text-stone-300">Tweak satellite spectral bands and detection sensitivity parameters.</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      id="btn-scan-plume"
                      onClick={runMethaneScan}
                      disabled={scanning}
                      className="voxel-button bg-[#c69c36] hover:bg-[#d8ac3e] text-white text-xs uppercase py-2 px-3 flex-grow sm:flex-grow-0 disabled:opacity-50"
                      style={{
                        boxShadow: "rgba(255, 255, 255, 0.45) 2px 2px 0px inset, rgba(0, 0, 0, 0.6) -2px -2px 0px inset",
                      }}
                    >
                      {scanning ? "Analyzing..." : "📡 Run AI Scan"}
                    </button>
                    <button
                      id="btn-reset-plume"
                      onClick={resetMethaneScan}
                      className="voxel-button bg-stone hover:bg-stone/80 text-white text-xs uppercase py-2 px-3"
                    >
                      <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-950 p-4 border-4 border-on-surface">
                  {/* Grid Preview scan display (6x6 pixels representation) */}
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase">
                      Telemetry scan output (6x6 Coordinate grid)
                    </span>
                    <div className="voxel-block p-1 bg-zinc-950 border-4 border-on-surface">
                      <div className="grid grid-cols-6 gap-1 bg-neutral-900 w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
                        {methaneGridData.map((row, r) =>
                          row.map((val, c) => {
                            const isDetected = analyzed && val >= sensitivity;
                            let colorClass = "bg-stone-900 hover:bg-neutral-800";

                            if (analyzed) {
                              if (isDetected) {
                                if (val > 80) colorClass = "bg-red-600 border-red-500 shadow-[inset_2px_2px_0_#ef4444]";
                                else if (val > 60) colorClass = "bg-orange-600 border-orange-500 shadow-[inset_2px_2px_0_#f97316]";
                                else colorClass = "bg-amber-500 border-amber-400 shadow-[inset_2px_2px_0_#eab308]";
                              } else {
                                if (val > 25) colorClass = "bg-zinc-700/60 shadow-[inset_1px_1px_0_#52525b]";
                                else colorClass = "bg-green-800/40 shadow-[inset_1px_1px_0_#166534]";
                              }
                            }

                            return (
                              <div
                                key={`plume-${r}-${c}`}
                                className={`w-full aspect-square border border-neutral-950/40 transition-all duration-300 flex items-center justify-center text-[8px] font-bold ${colorClass}`}
                              >
                                {scanning && (
                                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-none animate-ping" />
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side: Parameters controls and scanner reports */}
                  <div className="space-y-4 font-mono text-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Sensor Band Selection */}
                      <div className="flex flex-col gap-1">
                        <span className="text-zinc-400">Satellite Instrument Sensor Band:</span>
                        <select
                          value={spectralBand}
                          onChange={(e) => { playRetroSound("click"); setSpectralBand(e.target.value as any); }}
                          disabled={scanning}
                          className="bg-[#2d322a] border-2 border-on-surface p-1.5 font-bold uppercase rounded-none text-white outline-none cursor-pointer"
                        >
                          <option value="SWIR_12">SWIR Band 12 (Shortwave IR - Optimal)</option>
                          <option value="SWIR_7">SWIR Band 7 (Standard Shortwave IR)</option>
                          <option value="THERMAL_10">Thermal Band 10 (Longwave IR)</option>
                          <option value="NIR_8">NIR Band 8 (Near IR - High Noise)</option>
                        </select>
                      </div>

                      {/* Threshold sensitivity PPM */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-zinc-400">
                          <span>Sensitivity PPM threshold:</span>
                          <span className="text-[#a5f78d] font-bold">{sensitivity} PPM</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="85"
                          value={sensitivity}
                          disabled={scanning}
                          onChange={(e) => setSensitivity(Number(e.target.value))}
                          className="w-full accent-primary h-1.5 bg-zinc-800 rounded-none appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Scan results output */}
                    <div className="border-4 border-on-surface p-3 bg-black text-[11px] uppercase min-h-[90px] flex flex-col justify-center gap-1">
                      {scanning ? (
                        <p className="text-cyan-400 animate-pulse text-center">Processing spectral telemetry matrices...</p>
                      ) : analyzed ? (
                        <>
                          <div className="flex justify-between text-white">
                            <span>Detected Plumes:</span>
                            <span className={`font-bold ${hotspotsCount > 0 ? "text-orange-550 animate-pulse" : "text-green-405"}`}>
                              {hotspotsCount > 0 ? `${hotspotsCount} Coordinates` : "None (Clear)"}
                            </span>
                          </div>
                          <div className="flex justify-between text-white">
                            <span>AI Confidence:</span>
                            <span className="text-[#a5f78d] font-bold">{confidence}%</span>
                          </div>
                          {spectralBand === "NIR_8" && (
                            <p className="text-[9px] text-yellow-450 mt-1 lowercase font-semibold italic">
                              * Warning: High atmospheric scattering noise detected in NIR.
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-zinc-500 italic text-center">Scanner ready. Tweak bands and execute Scan.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Game 3: decentralized Database Archives file reader */}
            {project.gameType === "archives" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-lg font-bold text-emerald-500 uppercase">Substrate decryption core</h3>
                  <p className="text-xs text-stone-300">Align the miner cursor slider on fluctuating target ticks to decrypt secure vaults.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Minigame mining mechanics */}
                  <div className="bg-zinc-950 p-4 border-4 border-on-surface flex flex-col space-y-4 font-mono justify-center">
                    <p className="text-xs text-amber-500 uppercase font-bold text-center">Decentralized Lock System</p>

                    {/* Visual target track bar */}
                    <div className="relative w-full h-8 bg-zinc-900 border-2 border-stone overflow-hidden">
                      {/* Target Area Box overlay */}
                      <div
                        className="absolute top-0 bottom-0 bg-primary/30 border-x-2 border-primary-container z-10 transition-all duration-300"
                        style={{
                          left: `${goldTarget - 5}%`,
                          width: "12%",
                        }}
                      />

                      {/* Miner node dot */}
                      <div
                        className="absolute top-0 bottom-0 w-1.5 bg-red-500 z-20"
                        style={{
                          left: `${miningOffset}%`,
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs flex justify-between">
                        <span>Align Hash slider</span>
                        <span className="text-primary-container">{miningOffset}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={miningOffset}
                        onChange={(e) => setMiningOffset(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-none appearance-none cursor-pointer"
                      />
                    </div>

                    <button
                      id="btn-mine-block"
                      onClick={handleMineBlock}
                      className="voxel-button w-full bg-primary py-2 uppercase text-xs font-bold"
                    >
                      🎯 Bind Hash Sync
                    </button>

                    <p className="text-[10px] text-zinc-400 text-center uppercase min-h-[30px]">
                      {vaultFeedback}
                    </p>
                  </div>

                  {/* Archives Files vault status list */}
                  <div className="flex flex-col space-y-2">
                    <span className="font-mono text-xs text-zinc-400">Archived Documents (Decrypted):</span>
                    {archivedFiles.map((file) => (
                      <button
                        key={file.name}
                        disabled={!file.unlocked}
                        onClick={() => { playRetroSound("click"); setSelectedFile(file.name); }}
                        className={`p-3 text-left border-4 uppercase font-mono text-xs flex items-center justify-between rounded-none ${!file.unlocked
                            ? "bg-stone-900 border-zinc-800 text-stone-500 cursor-not-allowed opacity-60"
                            : selectedFile === file.name
                              ? "bg-primary text-white border-primary-container"
                              : "bg-[#212121] border-zinc-700 text-zinc-200 hover:bg-[#c6c6c6] hover:text-black"
                          }`}
                      >
                        <span className="truncate">{file.name}</span>
                        <span>{file.unlocked ? "🔓 READ" : "🔒 LOCKED"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Secure Memo Document Reader modal board */}
                {selectedFile && (
                  <div className="bg-parchment text-on-surface p-4 border-4 border-on-surface font-sans text-sm shadow-md rounded-none relative">
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="absolute top-2 right-2 border-2 border-stone bg-stone-300 hover:bg-stone-400 p-0.5 text-xs text-black font-semibold uppercase rounded-none"
                    >
                      Done
                    </button>
                    <h4 className="font-mono font-bold block border-b border-stone-500 pb-1 mb-2">
                      💾 READING: {selectedFile}
                    </h4>
                    <pre className="whitespace-pre-wrap font-sans text-xs bg-stone-200/50 p-2 border border-stone-300">
                      {archivedFiles.find((f) => f.name === selectedFile)?.content}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer info block */}
        <div className="p-4 bg-zinc-950 text-center font-mono text-[10px] uppercase text-stone-500 border-t-4 border-on-surface">
          Interactive Retro Dev Console v1.3. // by NavNeet.
        </div>
      </div>
    </div>
  );
};
