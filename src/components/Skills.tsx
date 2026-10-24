import React, { useState, useEffect } from "react";
import {
  Database,
  Terminal,
  Cloud,
  Shield,
  Cpu,
  GitBranch,
  Sparkles,
  Layers,
  Layout,
  Zap,
  Server,
  Code2,
  FileCode,
  HardDrive,
  Check,
  CheckCircle2,
  Globe
} from "lucide-react";
import MinecraftHeading from "./MinecraftHeading";

export type ToolCategory = "all" | "core" | "cloud" | "web" | "data";

interface ToolItem {
  id: string;
  name: string;
  category: "core" | "cloud" | "web" | "data";
  role: string;
  proficiency: number;
  levelLabel: string;
  icon: React.ReactNode;
  stackCount: number;
  competencies: string[];
  summary: string;
  hotbarSlot?: number;
}

// Pixel-Art Oak Vines for Top Corners
const VineCornerTL: React.FC = () => (
  <svg
    viewBox="0 0 48 48"
    width="48"
    height="48"
    className="absolute -top-2 -left-2 pointer-events-none z-20 select-none pixel-art"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="4" width="16" height="22" fill="#182b0e" />
    <rect x="4" y="0" width="28" height="12" fill="#182b0e" />
    <rect x="16" y="6" width="18" height="8" fill="#182b0e" />
    <rect x="4" y="18" width="8" height="16" fill="#182b0e" />
    <rect x="4" y="6" width="12" height="16" fill="#264714" />
    <rect x="6" y="4" width="22" height="8" fill="#264714" />
    <rect x="6" y="18" width="6" height="12" fill="#264714" />
    <rect x="6" y="6" width="10" height="12" fill="#38661d" />
    <rect x="12" y="4" width="12" height="6" fill="#38661d" />
    <rect x="18" y="6" width="8" height="6" fill="#4d8b27" />
    <rect x="8" y="14" width="6" height="8" fill="#4d8b27" />
    <rect x="8" y="6" width="6" height="6" fill="#67b333" />
    <rect x="16" y="4" width="6" height="3" fill="#67b333" />
    <rect x="22" y="6" width="3" height="3" fill="#83cf42" />
    <rect x="4" y="30" width="3" height="6" fill="#264714" />
    <rect x="5" y="32" width="2" height="4" fill="#4d8b27" />
  </svg>
);

const VineCornerTR: React.FC = () => (
  <svg
    viewBox="0 0 48 48"
    width="48"
    height="48"
    className="absolute -top-2 -right-2 pointer-events-none z-20 select-none pixel-art"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="32" y="4" width="16" height="22" fill="#182b0e" />
    <rect x="16" y="0" width="28" height="12" fill="#182b0e" />
    <rect x="14" y="6" width="18" height="8" fill="#182b0e" />
    <rect x="36" y="18" width="8" height="16" fill="#182b0e" />
    <rect x="32" y="6" width="12" height="16" fill="#264714" />
    <rect x="20" y="4" width="22" height="8" fill="#264714" />
    <rect x="36" y="18" width="6" height="12" fill="#264714" />
    <rect x="32" y="6" width="10" height="12" fill="#38661d" />
    <rect x="24" y="4" width="12" height="6" fill="#38661d" />
    <rect x="22" y="6" width="8" height="6" fill="#4d8b27" />
    <rect x="34" y="14" width="6" height="8" fill="#4d8b27" />
    <rect x="34" y="6" width="6" height="6" fill="#67b333" />
    <rect x="26" y="4" width="6" height="3" fill="#67b333" />
    <rect x="23" y="6" width="3" height="3" fill="#83cf42" />
    <rect x="41" y="30" width="3" height="6" fill="#264714" />
  </svg>
);

const ALL_TOOLS: ToolItem[] = [
  // Core & Systems
  {
    id: "python",
    name: "Python",
    category: "core",
    role: "Machine Learning & Data Engineering",
    proficiency: 95,
    levelLabel: "Expert • 95%",
    icon: <FileCode className="w-8 h-8 text-[#4ade80]" />,
    stackCount: 64,
    competencies: [
      "Deep Learning & PyTorch pipelines (ISRO satellite plume detection)",
      "High-throughput data preprocessing & geospatial raster analysis",
      "Automated scripts, backend APIs, and microservices"
    ],
    summary: "Primary language for deep learning research, scientific computing, and automated data pipelines.",
    hotbarSlot: 1
  },
  {
    id: "java",
    name: "Java",
    category: "core",
    role: "Data Structures & Systems Architecture",
    proficiency: 92,
    levelLabel: "Advanced • 92%",
    icon: <Code2 className="w-8 h-8 text-[#f87171]" />,
    stackCount: 64,
    competencies: [
      "250+ Algorithmic challenges solved across LeetCode using Java",
      "100+ Day active streak in algorithmic problem solving and optimization",
      "Core Data Structures: Arrays, Trees, Graphs, Dynamic Programming & HashMaps",
      "Object-oriented system design, multithreading & JVM memory management"
    ],
    summary: "Primary language for Data Structures & Algorithms (DSA), LeetCode problem solving, and object-oriented backend architecture.",
    hotbarSlot: 2
  },
  {
    id: "bash",
    name: "Bash & Linux",
    category: "core",
    role: "System Administration & Scripting",
    proficiency: 90,
    levelLabel: "Advanced • 90%",
    icon: <Terminal className="w-8 h-8 text-[#a3e635]" />,
    stackCount: 64,
    competencies: [
      "POSIX shell scripting, cron automation, and sed/awk pipelines",
      "Headless Linux server administration & SSH remote operations",
      "Environment bootstrapping and build automation"
    ],
    summary: "Essential toolkit for command-line mastery, automated tasks, and production server maintenance.",
    hotbarSlot: undefined
  },

  // Cloud & DevOps
  {
    id: "aws",
    name: "AWS Cloud",
    category: "cloud",
    role: "Cloud Architecture & Scalability",
    proficiency: 90,
    levelLabel: "Advanced • 90%",
    icon: <Cloud className="w-8 h-8 text-[#fb923c]" />,
    stackCount: 64,
    competencies: [
      "EC2, S3, RDS, Lambda, and IAM zero-trust access management",
      "VPC network configuration, subnets, and security groups",
      "High availability, load balancing, and multi-region deployment"
    ],
    summary: "Cloud platform of choice for deploying resilient, scalable, and secure production environments.",
    hotbarSlot: 3
  },
  {
    id: "render",
    name: "Render",
    category: "cloud",
    role: "Cloud Web Services & Hosting",
    proficiency: 88,
    levelLabel: "Advanced • 88%",
    icon: <Globe className="w-8 h-8 text-[#a78bfa]" />,
    stackCount: 64,
    competencies: [
      "Deploying and hosting Node.js and Express backend web services",
      "Automated continuous deployment (CD) synced with GitHub repositories",
      "Managed environment variables, custom domains, and SSL certificate provisioning",
      "Zero-downtime deployment pipelines and server health monitoring"
    ],
    summary: "Modern cloud platform used to host, deploy, and auto-scale backend Node.js APIs and fullstack web applications.",
    hotbarSlot: undefined
  },
  {
    id: "docker",
    name: "Docker",
    category: "cloud",
    role: "Containerization & Microservices",
    proficiency: 92,
    levelLabel: "Advanced • 92%",
    icon: <HardDrive className="w-8 h-8 text-[#22d3ee]" />,
    stackCount: 64,
    competencies: [
      "Multi-stage Docker builds optimized for minimal image footprints",
      "Docker Compose for multi-container local development environments",
      "Reproducible environments with zero dev-to-prod friction"
    ],
    summary: "Standard for encapsulating dependencies into lightweight, immutable container runtimes.",
    hotbarSlot: 4
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "cloud",
    role: "Infrastructure as Code (IaC)",
    proficiency: 84,
    levelLabel: "Proficient • 84%",
    icon: <Layers className="w-8 h-8 text-[#c084fc]" />,
    stackCount: 64,
    competencies: [
      "Declarative cloud architecture provisioning with HCL",
      "State file management, remote backends, and locking",
      "Modular, version-controlled infrastructure definitions"
    ],
    summary: "Automates multi-resource cloud provisioning reliably with zero manual configuration drift.",
    hotbarSlot: undefined
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "cloud",
    role: "Container Orchestration",
    proficiency: 82,
    levelLabel: "Proficient • 82%",
    icon: <Shield className="w-8 h-8 text-[#60a5fa]" />,
    stackCount: 64,
    competencies: [
      "Managing Deployments, Services, Ingress routing, and Pods",
      "Self-healing container restarts and rolling zero-downtime updates",
      "ConfigMap and Secret injection for decoupled configurations"
    ],
    summary: "Orchestration system for scaling, managing, and maintaining fleets of production containers.",
    hotbarSlot: undefined
  },

  // Web & Fullstack
  {
    id: "react",
    name: "React & Next.js",
    category: "web",
    role: "Modern Frontend Engineering",
    proficiency: 95,
    levelLabel: "Expert • 95%",
    icon: <Zap className="w-8 h-8 text-[#38bdf8]" />,
    stackCount: 64,
    competencies: [
      "Modern React with hooks, SSR, and Next.js App Router architecture",
      "Interactive 3D WebGL / Three.js canvas integration",
      "Responsive, accessible design systems with custom styling"
    ],
    summary: "Primary stack for engineering fast, interactive, and visually stunning web applications.",
    hotbarSlot: 5
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "web",
    role: "Type-Safe Fullstack Architecture",
    proficiency: 92,
    levelLabel: "Advanced • 92%",
    icon: <Code2 className="w-8 h-8 text-[#60a5fa]" />,
    stackCount: 64,
    competencies: [
      "Strict typing, custom interfaces, and complex generic utilities",
      "Eliminating runtime type errors across client and server boundaries",
      "Self-documenting APIs and safe codebase refactoring"
    ],
    summary: "Guarantees reliable contracts and compile-time confidence across modern web applications.",
    hotbarSlot: 6
  },
  {
    id: "node",
    name: "Node.js & Express",
    category: "web",
    role: "Backend APIs & Microservices",
    proficiency: 88,
    levelLabel: "Advanced • 88%",
    icon: <Server className="w-8 h-8 text-[#4ade80]" />,
    stackCount: 64,
    competencies: [
      "Asynchronous non-blocking REST API development",
      "JWT authentication, rate-limiting, and security middleware",
      "Real-time event streaming and WebSocket communication"
    ],
    summary: "Lightweight, event-driven runtime for scalable microservices and high-concurrency APIs.",
    hotbarSlot: undefined
  },
  {
    id: "uiux",
    name: "UI / UX & Voxel Design",
    category: "web",
    role: "Creative Web Design Systems",
    proficiency: 90,
    levelLabel: "Advanced • 90%",
    icon: <Layout className="w-8 h-8 text-[#c084fc]" />,
    stackCount: 64,
    competencies: [
      "Voxel aesthetics, retro pixel typography & modern UI hierarchy",
      "Micro-interactions, smooth CSS physics, and dynamic audio",
      "Mobile-first responsive layouts with seamless ergonomics"
    ],
    summary: "Blending game-inspired visual design with modern, intuitive, and polished user experiences.",
    hotbarSlot: undefined
  },

  // Data & AI
  {
    id: "sql",
    name: "PostgreSQL & SQL",
    category: "data",
    role: "Relational Database Management",
    proficiency: 90,
    levelLabel: "Advanced • 90%",
    icon: <Database className="w-8 h-8 text-[#38bdf8]" />,
    stackCount: 64,
    competencies: [
      "Normalized relational schema design and ACID compliance",
      "B-Tree index tuning, execution plan analysis, and query optimization",
      "Complex aggregations, foreign key constraints, and migrations"
    ],
    summary: "Rock-solid database engine for structured transactional data with guaranteed integrity.",
    hotbarSlot: 7
  },
  {
    id: "pytorch",
    name: "PyTorch & Deep Learning",
    category: "data",
    role: "Machine Learning & Computer Vision",
    proficiency: 92,
    levelLabel: "Advanced • 92%",
    icon: <Sparkles className="w-8 h-8 text-[#f43f5e]" />,
    stackCount: 64,
    competencies: [
      "Computer vision: U-Net semantic segmentation and CNN models",
      "Hyperspectral satellite data processing for atmospheric research (ISRO)",
      "GPU-accelerated tensor arithmetic and automated training validation"
    ],
    summary: "Deep learning framework used for satellite remote sensing research and computer vision pipelines.",
    hotbarSlot: 8
  },
  {
    id: "git",
    name: "Git & GitHub Actions",
    category: "data",
    role: "Version Control & CI/CD",
    proficiency: 94,
    levelLabel: "Expert • 94%",
    icon: <GitBranch className="w-8 h-8 text-[#fb923c]" />,
    stackCount: 64,
    competencies: [
      "Clean GitFlow branching, rebase strategies, and pull request reviews",
      "Automated CI/CD workflows for testing, linting, and building",
      "Multi-environment deployment pipelines and release versioning"
    ],
    summary: "Standard version control system for disciplined team collaboration and automated deployment.",
    hotbarSlot: 9
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "data",
    role: "NoSQL Document Database",
    proficiency: 85,
    levelLabel: "Proficient • 85%",
    icon: <Database className="w-8 h-8 text-[#4ade80]" />,
    stackCount: 64,
    competencies: [
      "Flexible schema design for polymorphic JSON documents",
      "Aggregation pipelines for data filtering and group analytics",
      "Rapid prototyping with Mongoose ODM in Node.js backends"
    ],
    summary: "Flexible document database ideal for rapidly evolving schemas and unstructured data streams.",
    hotbarSlot: undefined
  }
];

// Fixed 9 Hotbar slots (classic Minecraft hotbar)
const HOTBAR_ITEMS: ToolItem[] = ALL_TOOLS.filter((t) => t.hotbarSlot !== undefined).sort(
  (a, b) => (a.hotbarSlot || 0) - (b.hotbarSlot || 0)
);

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");
  const [selectedToolId, setSelectedToolId] = useState<string>("python");

  const categories = [
    { id: "all" as ToolCategory, label: "All Arsenal (16)", icon: "🌟" },
    { id: "core" as ToolCategory, label: "Core & Systems", icon: "⚔️" },
    { id: "cloud" as ToolCategory, label: "Cloud & DevOps", icon: "🛡️" },
    { id: "web" as ToolCategory, label: "Web & Fullstack", icon: "⚡" },
    { id: "data" as ToolCategory, label: "Data & AI", icon: "🔮" }
  ];

  const displayedTools =
    activeCategory === "all"
      ? ALL_TOOLS
      : ALL_TOOLS.filter((t) => t.category === activeCategory);

  const activeTool =
    ALL_TOOLS.find((t) => t.id === selectedToolId) || displayedTools[0] || ALL_TOOLS[0];

  // Procedural Web Audio Sound Synthesizers
  const playSound = (type: "click" | "equip" | "tab") => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === "click") {
        // Wooden/stone slot click
        osc.type = "square";
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.06);
      } else if (type === "equip") {
        // Metallic snap
        osc.type = "triangle";
        osc.frequency.setValueAtTime(560, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(260, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else {
        // Tab chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(520, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      }
    } catch {
      // Audio fallback
    }
  };

  const handleSelectTool = (tool: ToolItem) => {
    setSelectedToolId(tool.id);
    playSound("click");
  };

  // Keyboard number keys [1-9] switch hotbar slots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const item = HOTBAR_ITEMS[num - 1];
        if (item) {
          setSelectedToolId(item.id);
          playSound("equip");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="skills"
      className="py-16 md:py-24 relative overflow-hidden px-4 md:px-8 flex flex-col items-center"
    >
      {/* Embedded CSS for Enchantment Glint & Subtle Float */}
      <style>{`
        @keyframes mcEnchantmentGlint {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 250% 250%;
          }
        }
        .mc-enchant-glint {
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 30%,
            rgba(192, 132, 252, 0.4) 50%,
            rgba(96, 165, 250, 0.25) 60%,
            rgba(255, 255, 255, 0) 75%
          );
          background-size: 200% 200%;
          animation: mcEnchantmentGlint 4s linear infinite;
        }
        @keyframes mcPedestalFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .mc-item-float {
          animation: mcPedestalFloat 3s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        {/* Section Heading with 3D Extruded Gold Title & Symmetrical Flourishes */}
        <MinecraftHeading
          title="MY TOOL KIT"
          bannerText="TECHNICAL ARSENAL • PRODUCTION STACK"
          highlightText="& CORE ENGINEERING SKILLS"
          leftIcon="pickaxe"
          rightIcon="zap"
          className="mb-8"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mb-8 w-full max-w-3xl select-none">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  playSound("tab");
                  if (cat.id !== "all") {
                    const firstOfCat = ALL_TOOLS.find((t) => t.category === cat.id);
                    if (firstOfCat) setSelectedToolId(firstOfCat.id);
                  }
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 font-mono text-xs uppercase font-bold tracking-wider transition-all duration-150 border-2 cursor-pointer select-none ${
                  isSelected
                    ? "bg-[#2e5322] text-[#8CE99A] border-[#8CE99A] shadow-[0_0_14px_rgba(140,233,154,0.35)] -translate-y-0.5"
                    : "bg-[#282522]/90 text-[#b5aba0] border-[#141712] hover:bg-[#38332e] hover:text-[#f4f4f5]"
                }`}
                style={{
                  boxShadow: isSelected
                    ? "inset 2px 2px 0px rgba(255, 255, 255, 0.25), inset -2px -2px 0px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(46,83,34,0.4)"
                    : "inset 1px 1px 0px rgba(255, 255, 255, 0.1), inset -1px -1px 0px rgba(0, 0, 0, 0.5)",
                  textShadow: isSelected ? "1px 1px 0px #121610" : "none"
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Master Deepslate Minecraft Toolkit Station */}
        <div
          className="w-full relative border-4 border-[#141712] p-5 sm:p-6 md:p-8"
          style={{
            background: "linear-gradient(180deg, rgba(44, 40, 36, 0.95) 0%, rgba(26, 24, 22, 0.98) 100%)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow:
              "inset 2px 2px 0px rgba(255, 255, 255, 0.12), inset -2px -2px 0px rgba(0, 0, 0, 0.8), 0 24px 52px rgba(0, 0, 0, 0.8)"
          }}
        >
          {/* Pixel-Art Oak Vines on Top Corners */}
          <VineCornerTL />
          <VineCornerTR />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* ============================================================ */}
            {/* LEFT COLUMN: Clean, Professional Skill Details (5 Cols)      */}
            {/* ============================================================ */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#1c1a18]/95 border-4 border-[#121610] p-5 sm:p-6 shadow-[inset_2px_2px_0_rgba(0,0,0,0.85),inset_-1px_-1px_0_rgba(255,255,255,0.08)]">
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#121610]">
                  <span
                    className="inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase border border-[#121610] bg-[#eab308] text-[#121610]"
                    style={{
                      boxShadow: "inset 1px 1px 0px rgba(255,255,255,0.4)"
                    }}
                  >
                    SKILL INSPECTOR
                  </span>
                  <span className="font-mono text-[11px] text-[#8ce99a] font-bold">
                    {activeTool.levelLabel}
                  </span>
                </div>

                {/* Pedestal Slot with Tech Icon & Title */}
                <div className="relative mb-5 p-3.5 bg-[#141210] border-2 border-[#121610] flex items-center gap-3.5 shadow-inner">
                  {/* Subtle Enchantment Glint */}
                  <div className="absolute inset-0 mc-enchant-glint pointer-events-none opacity-25" />

                  {/* 3D Beveled Minecraft Slot */}
                  <div
                    className="w-16 h-16 flex-shrink-0 relative border-4 bg-[#2b2724] flex items-center justify-center select-none shadow-[inset_3px_3px_0px_rgba(0,0,0,0.8),inset_-2px_-2px_0px_rgba(255,255,255,0.15)]"
                    style={{
                      borderTopColor: "#373737",
                      borderLeftColor: "#373737",
                      borderRightColor: "#ffffff",
                      borderBottomColor: "#ffffff"
                    }}
                  >
                    <div className="relative z-10 mc-item-float">
                      {activeTool.icon}
                    </div>

                    {/* Classic Stack Count (64) */}
                    <span
                      className="absolute bottom-1 right-1 font-mono text-[11px] font-bold text-[#ffffff] select-none pointer-events-none"
                      style={{ textShadow: "1px 1px 0px #000000" }}
                    >
                      {activeTool.stackCount}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <div className="min-w-0 z-10">
                    <h3
                      className="font-mono text-xl font-bold text-[#ffffff] uppercase leading-tight truncate"
                      style={{ textShadow: "1px 1px 0px #121610" }}
                    >
                      {activeTool.name}
                    </h3>
                    <p className="font-mono text-xs text-[#55ffff] font-medium truncate mt-0.5">
                      {activeTool.role}
                    </p>
                    <span className="inline-block mt-1.5 text-[10px] font-mono text-[#a8a195] uppercase tracking-wider">
                      Category:{" "}
                      <span className="text-[#8ce99a] font-bold">
                        {activeTool.category.toUpperCase()}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Proficiency Progress Meter */}
                <div className="mb-5">
                  <div className="flex justify-between items-center text-[11px] font-mono text-[#a8a195] mb-1.5 uppercase tracking-wider">
                    <span>Proficiency Rating</span>
                    <span className="text-[#8ce99a] font-bold">
                      {activeTool.proficiency}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#121610] p-0.5 border border-[#38332e] shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#86efac] transition-all duration-300 shadow-[0_0_8px_rgba(74,222,128,0.4)]"
                      style={{ width: `${activeTool.proficiency}%` }}
                    />
                  </div>
                </div>

                {/* Core Competencies (Decent & Directly Understandable) */}
                <div className="mb-4 bg-[#141210]/95 p-3.5 border-2 border-[#121610] shadow-[inset_2px_2px_0_rgba(0,0,0,0.6)]">
                  <div className="text-[11px] font-mono font-bold text-[#d6c5ad] uppercase tracking-wider mb-2.5 flex items-center gap-1.5 border-b border-[#282522] pb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span>Core Technical Competencies</span>
                  </div>
                  <ul className="space-y-2">
                    {activeTool.competencies.map((comp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 font-mono text-xs text-zinc-300 leading-snug"
                      >
                        <span className="text-[#8ce99a] font-bold mt-0.5">▸</span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom: Professional Practical Summary */}
              <div className="pt-3 border-t-2 border-[#121610]/80">
                <p className="font-mono text-xs text-[#c5bcad] leading-relaxed italic bg-[#151311] p-2.5 border border-[#2b2724]">
                  &quot;{activeTool.summary}&quot;
                </p>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Inventory Grid & Hotbar (7 Cols)              */}
            {/* ============================================================ */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* Inventory Top Status Bar */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold uppercase tracking-wider text-[#d6c5ad]">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#4ade80] rounded-sm inline-block shadow-[0_0_6px_#4ade80]" />
                    <span>Select Any Slot to Inspect</span>
                  </span>
                  <span className="text-[#a8a195] text-[11px]">
                    {activeCategory === "all" ? "All 16 Skills" : activeCategory.toUpperCase()}
                  </span>
                </div>

                {/* Minecraft GUI Frame */}
                <div className="p-3.5 sm:p-4 bg-[#8b8b8b] border-4 border-[#373737] shadow-[inset_3px_3px_0_#2b2b2b,inset_-3px_-3px_0_#ffffff]">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    {displayedTools.map((tool) => {
                      const isSelected = selectedToolId === tool.id;
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => handleSelectTool(tool)}
                          className={`relative aspect-square p-2 flex flex-col items-center justify-center transition-all cursor-pointer select-none group border-4 ${
                            isSelected
                              ? "bg-[#b8b8b8] ring-4 ring-[#ffdf4a] z-10"
                              : "bg-[#8b8b8b] hover:bg-[#9c9c9c]"
                          }`}
                          style={{
                            borderTopColor: isSelected ? "#ffffff" : "#373737",
                            borderLeftColor: isSelected ? "#ffffff" : "#373737",
                            borderRightColor: isSelected ? "#373737" : "#ffffff",
                            borderBottomColor: isSelected ? "#373737" : "#ffffff",
                            boxShadow: isSelected
                              ? "inset 2px 2px 0px rgba(255,255,255,0.7), inset -2px -2px 0px rgba(0,0,0,0.6), 0 0 18px rgba(255,223,74,0.75)"
                              : "inset 2px 2px 0px rgba(0,0,0,0.45), inset -2px -2px 0px rgba(255,255,255,0.3)"
                          }}
                          aria-label={`Inspect ${tool.name}`}
                        >
                          {/* Hotbar Indicator */}
                          {tool.hotbarSlot && (
                            <span
                              className="absolute top-0.5 right-1 font-mono text-[9px] font-bold text-amber-300 select-none"
                              style={{ textShadow: "1px 1px 0px #000" }}
                            >
                              [{tool.hotbarSlot}]
                            </span>
                          )}

                          {/* Tech Icon */}
                          <div className="transform transition-transform duration-150 group-hover:scale-110 my-auto">
                            {tool.icon}
                          </div>

                          {/* Skill Name */}
                          <span
                            className="font-mono text-[10px] font-bold uppercase text-white truncate max-w-full text-center leading-none mt-1"
                            style={{ textShadow: "1px 1px 0px #121610" }}
                          >
                            {tool.name.split(" ")[0]}
                          </span>

                          {/* Mini Proficiency Bar */}
                          <div className="w-full h-1 bg-[#1a1816] mt-1 border border-black/30 overflow-hidden">
                            <div
                              className="h-full bg-[#22c55e]"
                              style={{ width: `${tool.proficiency}%` }}
                            />
                          </div>

                          {/* Stack Count (64) */}
                          <span
                            className="absolute bottom-0.5 right-1 font-mono text-[10px] font-bold text-[#ffffff] select-none pointer-events-none"
                            style={{ textShadow: "1px 1px 0px #000000" }}
                          >
                            {tool.stackCount}
                          </span>
                        </button>
                      );
                    })}

                    {/* Empty Slots Filler for category view */}
                    {activeCategory !== "all" &&
                      displayedTools.length < 8 &&
                      [...Array(8 - displayedTools.length)].map((_, idx) => (
                        <div
                          key={`empty-${idx}`}
                          className="aspect-square bg-[#7c7c7c]/50 border-4 flex items-center justify-center opacity-40 select-none pointer-events-none"
                          style={{
                            borderTopColor: "#2a2a2a",
                            borderLeftColor: "#2a2a2a",
                            borderRightColor: "#ffffff",
                            borderBottomColor: "#ffffff",
                            boxShadow:
                              "inset 2px 2px 0px rgba(0,0,0,0.5), inset -2px -2px 0px rgba(255,255,255,0.2)"
                          }}
                        >
                          <span className="font-mono text-[10px] text-zinc-600">
                            EMPTY
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* BOTTOM SECTION: Hotbar HUD [1-9] & Level 42 Experience Bar   */}
              {/* ============================================================ */}
              <div className="space-y-4 pt-2">
                {/* Hotbar Section Header */}
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#d6c5ad]">
                  <span className="flex items-center gap-1.5">
                    <span>⚡ Quick Hotbar HUD</span>
                    <span className="text-[10px] text-[#8ce99a] font-normal">
                      [Keys 1 - 9]
                    </span>
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Selected: {activeTool.name}
                  </span>
                </div>

                {/* 9-Slot Hotbar Strip */}
                <div className="p-2 sm:p-2.5 bg-[#8b8b8b] border-4 border-[#373737] shadow-[inset_2px_2px_0_#2b2b2b,inset_-2px_-2px_0_#ffffff] flex justify-between gap-1 sm:gap-1.5 overflow-x-auto">
                  {HOTBAR_ITEMS.map((item, index) => {
                    const isSelected = selectedToolId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedToolId(item.id);
                          playSound("equip");
                        }}
                        className={`relative flex-1 min-w-[36px] sm:min-w-[48px] aspect-square flex flex-col items-center justify-center transition-all cursor-pointer select-none group border-2 sm:border-4 ${
                          isSelected
                            ? "bg-[#b8b8b8] ring-2 sm:ring-4 ring-[#ffdf4a] z-10 -translate-y-0.5"
                            : "bg-[#8b8b8b] hover:bg-[#9c9c9c]"
                        }`}
                        style={{
                          borderTopColor: isSelected ? "#ffffff" : "#373737",
                          borderLeftColor: isSelected ? "#ffffff" : "#373737",
                          borderRightColor: isSelected ? "#373737" : "#ffffff",
                          borderBottomColor: isSelected ? "#373737" : "#ffffff",
                          boxShadow: isSelected
                            ? "inset 1px 1px 0px rgba(255,255,255,0.7), inset -1px -1px 0px rgba(0,0,0,0.6), 0 0 12px rgba(255,223,74,0.75)"
                            : "inset 1px 1px 0px rgba(0,0,0,0.45), inset -1px -1px 0px rgba(255,255,255,0.3)"
                        }}
                        title={`[Key ${index + 1}] ${item.name} (${item.role})`}
                      >
                        {/* Key numeral [1-9] */}
                        <span
                          className="absolute top-0.5 left-1 font-mono text-[9px] font-bold text-[#facc15] select-none"
                          style={{ textShadow: "1px 1px 0px #000" }}
                        >
                          {index + 1}
                        </span>

                        {/* Icon */}
                        <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transform group-hover:scale-110">
                          {item.icon}
                        </div>

                        {/* Stack Count (64) */}
                        <span
                          className="absolute bottom-0 right-0.5 font-mono text-[8px] sm:text-[9px] font-bold text-white select-none pointer-events-none"
                          style={{ textShadow: "1px 1px 0px #000" }}
                        >
                          64
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Level 42 Experience Bar */}
                <div className="flex flex-col items-center relative pt-1">
                  {/* Glowing Green Minecraft Level */}
                  <span
                    className="font-mono text-xl sm:text-2xl font-black text-[#80ff20] select-none -mb-1 z-10"
                    style={{
                      textShadow:
                        "2px 2px 0px #000000, 0 0 10px rgba(128, 255, 32, 0.75)"
                    }}
                  >
                    42
                  </span>

                  {/* Minecraft Segmented XP Bar */}
                  <div className="w-full h-2.5 bg-[#141210] border-2 border-[#121610] p-0.5 flex gap-0.5 shadow-inner">
                    {[...Array(18)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 ${
                          i < 15
                            ? "bg-[#72cc50] shadow-[0_0_4px_#72cc50]"
                            : "bg-[#253d1c]"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Operational Status Footer */}
                  <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#a8a195] pt-1.5">
                    <span>Press Keys [1-9] to Quick-Switch Stack</span>
                    <span className="text-[#8ce99a] font-bold">
                      ● 16 Production Modules Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
