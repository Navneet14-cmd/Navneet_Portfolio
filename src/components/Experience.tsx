import React, { useState } from "react";
import {
  Gem,
  Pickaxe,
  Satellite,
  Target,
  Sparkles,
  Calendar,
  Compass,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Sword,
  FlaskConical,
  Flame,
  ShieldCheck,
  BookOpen
} from "lucide-react";
import { EmberParticles } from "./AmbientParticles";
import MinecraftHeading from "./MinecraftHeading";

interface TimelineMilestone {
  id: string;
  level: string;
  depthY: string;
  biome: string;
  role: string;
  company: string;
  duration: string;
  status: "COMPLETED" | "ACTIVE" | "FUTURE";
  statusText: string;
  oreType: "iron" | "lapis" | "diamond" | "netherite";
  oreName: string;
  accentColor: string;
  description: string;
  quote: string;
  keyHighlights: { text: string; iconType: "sword" | "pickaxe" | "potion" | "gem" }[];
  lootDrops: string[];
  fieldNotes: string;
  centralItem: "book" | "lapis" | "diamond" | "portal";
  gildedTool: "iron_pickaxe" | "scanner" | "diamond_sword" | "nether_star";
}

// Pixel Vine Ornament draped over card corners
const PixelVines: React.FC<{ position?: "top-right" | "bottom-right" | "top-left" }> = ({
  position = "top-right"
}) => {
  const isLeft = position === "top-left";
  return (
    <div
      aria-hidden="true"
      className={`absolute ${
        position === "top-right"
          ? "-top-3 -right-2"
          : position === "top-left"
          ? "-top-3 -left-2 scale-x-[-1]"
          : "-bottom-4 -right-2"
      } pointer-events-none z-30 opacity-90`}
    >
      <svg width="44" height="64" viewBox="0 0 44 64" fill="none">
        <rect x="22" y="0" width="6" height="8" fill="#1b4d14" />
        <rect x="28" y="4" width="8" height="8" fill="#3a8027" />
        <rect x="16" y="8" width="8" height="8" fill="#2d6a22" />
        <rect x="22" y="14" width="6" height="12" fill="#1b4d14" />
        <rect x="30" y="18" width="10" height="10" fill="#4d9b32" />
        <rect x="12" y="20" width="10" height="8" fill="#3a8027" />
        <rect x="18" y="30" width="6" height="14" fill="#1b4d14" />
        <rect x="26" y="34" width="8" height="10" fill="#3a8027" />
        <rect x="8" y="36" width="8" height="8" fill="#2d6a22" />
        <rect x="14" y="46" width="6" height="10" fill="#1b4d14" />
        <rect x="20" y="50" width="8" height="8" fill="#4d9b32" />
        <rect x="14" y="58" width="6" height="6" fill="#2d6a22" />
      </svg>
    </div>
  );
};

// Iron Hanging Chain Links
const HangingChains: React.FC<{ length?: number }> = ({ length = 24 }) => (
  <div className="flex justify-between w-10 px-1 pointer-events-none" aria-hidden="true">
    {[0, 1].map((col) => (
      <div key={col} className="flex flex-col items-center">
        {Array.from({ length: Math.ceil(length / 7) }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-2.5 my-[-1px] rounded-[1px] border border-[#2a2a2a] bg-[#888888]"
            style={{
              boxShadow: "inset 1px 1px 0px #cccccc, inset -1px -1px 0px #444444"
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("year-1");

  const milestones: TimelineMilestone[] = [
    {
      id: "year-1",
      level: "YEAR 1",
      depthY: "Y: 64",
      biome: "OVERWORLD SURFACE CAMP",
      role: "STUDENT DEVELOPER",
      company: "Academic Learning",
      duration: "2024 - 2025",
      status: "COMPLETED",
      statusText: "STAGE COMPLETED",
      oreType: "iron",
      oreName: "Iron Ore Layer",
      accentColor: "#f59e0b",
      description:
        "Started my computer science journey focusing on programming fundamentals, object-oriented concepts, and core data structures in Java.",
      quote: "Starting from the surface: learning data structures, algorithms, and core programming fundamentals.",
      keyHighlights: [
        {
          text: "Practiced core data structures (arrays, linked lists, stacks, and binary trees) in Java",
          iconType: "sword"
        },
        {
          text: "Studied Object-Oriented Programming (OOP) principles, logic building, and problem decomposition",
          iconType: "pickaxe"
        },
        {
          text: "Learned command-line navigation, Linux basics, and Git version control workflows",
          iconType: "potion"
        }
      ],
      lootDrops: ["Java", "Core DSA", "OOP", "Data Structures", "Linux Basics", "Git"],
      fieldNotes:
        "Focused on understanding fundamental concepts, analyzing time and space complexities, and building consistent daily coding habits.",
      centralItem: "book",
      gildedTool: "iron_pickaxe"
    },
    {
      id: "isro-research",
      level: "YEAR 2",
      depthY: "Y: 32",
      biome: "DEEP RESEARCH CAVERNS",
      role: "RESEARCH INTERN",
      company: "IIRS, ISRO (Dehradun)",
      duration: "2025 - 2026",
      status: "COMPLETED",
      statusText: "DISCOVERY LOGGED",
      oreType: "lapis",
      oreName: "Lapis & Redstone Core",
      accentColor: "#60a5fa",
      description:
        "Worked as a research intern at the Indian Institute of Remote Sensing (ISRO), assisting in methane plume detection using satellite imagery and deep learning models.",
      quote: "Learning to apply machine learning to real-world geospatial datasets and environmental satellite imagery.",
      keyHighlights: [
        {
          text: "Assisted with satellite spectral band analysis (SWIR-1 & SWIR-2) for methane plume observation",
          iconType: "gem"
        },
        {
          text: "Trained PyTorch segmentation models on satellite imagery tilesets under research guidance",
          iconType: "pickaxe"
        },
        {
          text: "Generated GIS maps and visualizations for environmental monitoring and analysis",
          iconType: "sword"
        }
      ],
      lootDrops: ["Python", "PyTorch", "Satellite Data", "GIS Mapping", "Remote Sensing"],
      fieldNotes:
        "Gained valuable experience working alongside scientists on real satellite datasets, learning the nuances of remote sensing data and scientific workflows.",
      centralItem: "lapis",
      gildedTool: "scanner"
    },
    {
      id: "present",
      level: "YEAR 3 (PRESENT)",
      depthY: "Y: -16",
      biome: "DEEPSLATE DIAMOND VEIN",
      role: "FULL-STACK, CLOUD & DSA",
      company: "Projects & Chapter Leadership",
      duration: "2025 - Present",
      status: "ACTIVE",
      statusText: "ACTIVE PURSUIT",
      oreType: "diamond",
      oreName: "Deepslate Diamond Layer",
      accentColor: "#38bdf8",
      description:
        "Balancing daily DSA problem solving with building full-stack web applications, exploring cloud deployments, and actively contributing to student technical chapters.",
      quote: "Staying consistent: solving algorithmic problems daily while building practical full-stack and cloud projects.",
      keyHighlights: [
        {
          text: "Consistent daily DSA problem solving in Java across arrays, strings, trees, graphs, and dynamic programming",
          iconType: "sword"
        },
        {
          text: "Building practical full-stack web applications with React, Node.js, databases, and Docker containerization",
          iconType: "gem"
        },
        {
          text: "Active leadership in UPES student chapters (CSI Internal Operations, IEEE CS Webmaster, IEEE CIS)",
          iconType: "pickaxe"
        }
      ],
      lootDrops: ["Java DSA", "Problem Solving", "React", "Node.js", "Docker", "PostgreSQL", "Cloud Hosting"],
      fieldNotes:
        "Keeping problem solving at the center of my daily routine to build strong algorithmic intuition, while continuing to ship hands-on full-stack projects.",
      centralItem: "diamond",
      gildedTool: "diamond_sword"
    },
    {
      id: "next-step",
      level: "YEAR 4 (UPCOMING)",
      depthY: "Y: -64",
      biome: "NETHER PORTAL FRONTIER",
      role: "MAJOR PROJECT & PLACEMENTS",
      company: "Targeting Software Roles",
      duration: "Final Year Focus",
      status: "FUTURE",
      statusText: "TARGET ROADMAP",
      oreType: "netherite",
      oreName: "Ancient Debris & Portal",
      accentColor: "#c084fc",
      description:
        "Focused on delivering a major cloud capstone project integrated with AI and full-stack with a touch of DevOps, alongside intensive DSA preparation to crack campus placements.",
      quote: "Clear focus for the final year: build one solid major project, stay disciplined on DSA, and crack placements.",
      keyHighlights: [
        {
          text: "Build a major cloud project integrating AI capabilities and a responsive full-stack architecture",
          iconType: "gem"
        },
        {
          text: "Incorporate practical DevOps with containerization and automated cloud deployment workflows",
          iconType: "pickaxe"
        },
        {
          text: "Intensive DSA problem-solving and mock interviews to crack software engineering placements",
          iconType: "sword"
        }
      ],
      lootDrops: ["Major Cloud Project", "AI Integration", "Full-Stack", "DevOps Touch", "Intensive DSA", "Placements"],
      fieldNotes:
        "Keeping goals realistic and targeted: deliver a solid major project connecting cloud, AI, and full-stack, stay sharp on problem solving, and give my best in placement interviews.",
      centralItem: "portal",
      gildedTool: "nether_star"
    }
  ];

  // Subtle Minecraft-style sound tone
  const playSound = (freq = 600) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } catch {
      // Audio fallback
    }
  };

  const toggleExpand = (id: string) => {
    playSound(700);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const scrollToMilestone = (id: string) => {
    playSound(850);
    const el = document.getElementById(`milestone-${id}`);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  // Render bullet icons (sword, pickaxe, potion, gem)
  const renderBulletIcon = (type: "sword" | "pickaxe" | "potion" | "gem") => {
    switch (type) {
      case "sword":
        return <Sword className="w-3.5 h-3.5 text-[#d4a373] flex-shrink-0 mt-0.5" />;
      case "pickaxe":
        return <Pickaxe className="w-3.5 h-3.5 text-[#9ca3af] flex-shrink-0 mt-0.5" />;
      case "potion":
        return <FlaskConical className="w-3.5 h-3.5 text-[#4ade80] flex-shrink-0 mt-0.5" />;
      case "gem":
        return <Gem className="w-3.5 h-3.5 text-[#38bdf8] flex-shrink-0 mt-0.5" />;
    }
  };

  // Central block item frame icons (Enchanted Book, Lapis, Diamond, Portal)
  const renderCentralItem = (type: TimelineMilestone["centralItem"]) => {
    switch (type) {
      case "book":
        return (
          <div className="relative flex items-center justify-center">
            <span className="text-2xl filter drop-shadow-[0_0_8px_#ec4899] animate-pulse">
              📖
            </span>
          </div>
        );
      case "lapis":
        return (
          <div className="relative flex items-center justify-center">
            <span className="text-2xl filter drop-shadow-[0_0_8px_#3b82f6]">
              🛰️
            </span>
          </div>
        );
      case "diamond":
        return (
          <div className="relative flex items-center justify-center">
            <span className="text-2xl filter drop-shadow-[0_0_10px_#38bdf8] animate-bounce">
              💎
            </span>
          </div>
        );
      case "portal":
        return (
          <div className="relative flex items-center justify-center">
            <span className="text-2xl filter drop-shadow-[0_0_10px_#a855f7]">
              🔮
            </span>
          </div>
        );
    }
  };

  // Gilded frame signature tool icons (Iron Pickaxe, Satellite Scanner, Diamond Sword, Nether Star)
  const renderGildedTool = (tool: TimelineMilestone["gildedTool"]) => {
    switch (tool) {
      case "iron_pickaxe":
        return (
          <div className="relative flex items-center justify-center transform hover:rotate-12 transition-transform">
            <span className="text-3xl filter drop-shadow-[0_0_10px_#fde047]">
              ⛏️
            </span>
          </div>
        );
      case "scanner":
        return (
          <div className="relative flex items-center justify-center transform hover:rotate-12 transition-transform">
            <span className="text-3xl filter drop-shadow-[0_0_12px_#60a5fa]">
              📡
            </span>
          </div>
        );
      case "diamond_sword":
        return (
          <div className="relative flex items-center justify-center transform hover:rotate-12 transition-transform">
            <span className="text-3xl filter drop-shadow-[0_0_14px_#38bdf8]">
              ⚔️
            </span>
          </div>
        );
      case "nether_star":
        return (
          <div className="relative flex items-center justify-center transform hover:rotate-12 transition-transform">
            <span className="text-3xl filter drop-shadow-[0_0_14px_#c084fc] animate-spin">
              ✨
            </span>
          </div>
        );
    }
  };

  return (
    <section
      id="experience"
      className="py-16 md:py-24 px-3 md:px-10 relative overflow-hidden z-10"
    >
      {/* Ambient Underground Fire / Ember Particles */}
      <EmberParticles />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading with 3D Extruded Gold Title & Symmetrical Flourishes */}
        <MinecraftHeading
          title="TIMELINE"
          bannerText="SUBTERRANEAN EXPEDITION • MINING EXPERIENCE"
          highlightText="FROM SURFACE TO BEDROCK"
          leftIcon="pickaxe"
          rightIcon="sword"
          className="mb-8"
        />

        {/* Top Surface Origin Signboard Hanging by Chains */}
        <div className="flex flex-col items-center justify-center mb-6 relative z-10">
          <div
            onClick={() => scrollToMilestone("year-1")}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1c140d] border-2 border-[#8b6540] text-[#f59e0b] font-mono text-[11px] font-bold uppercase cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)] mb-1"
            style={{
              boxShadow: "inset 1px 1px 0px #a16207, inset -1px -1px 0px #451a03, 0 0 12px rgba(245,158,11,0.25)"
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
            <span>SURFACE EXPEDITION ORIGIN • Y: 64</span>
          </div>

          {/* Iron Chains Hanging Down to the First Elevation Sign */}
          <HangingChains length={22} />

          {/* Hanging Elevation Sign Block */}
          <div
            className="px-4 py-1.5 bg-[#4a4a4a] border-4 border-[#222222] text-[#f5f5f5] font-mono text-xs font-bold uppercase tracking-wider shadow-lg"
            style={{
              boxShadow: "inset 2px 2px 0px #777777, inset -2px -2px 0px #111111"
            }}
          >
            Y: 64
          </div>
        </div>

        {/* Main Timeline Core: Central Minecraft Pillar + Alternating Cards + Gilded Frames */}
        <div className="relative">
          {/* Vertical Minecraft Block Pillar (Dirt, Stone, Deepslate, Bedrock) */}
          <div
            className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-11 md:w-12 pointer-events-none z-0 overflow-hidden rounded-sm"
            style={{
              borderLeft: "4px solid #1a1a1a",
              borderRight: "4px solid #1a1a1a",
              boxShadow: "inset 3px 0px 0px rgba(255,255,255,0.1), inset -3px 0px 0px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.8)"
            }}
          >
            {/* Minecraft Block Textures Stack (Grass -> Dirt -> Stone -> Cobblestone -> Deepslate -> Bedrock) */}
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to bottom, 
                    #4d9b32 0%, #4d9b32 2%, 
                    #7b5233 2%, #7b5233 18%, 
                    #6e6e6e 18%, #6e6e6e 40%, 
                    #525252 40%, #525252 65%, 
                    #2d3238 65%, #2d3238 88%, 
                    #17191c 88%, #17191c 100%
                  )
                `,
                backgroundSize: "100% 100%"
              }}
            >
              {/* Pixelated block texture overlay */}
              <div
                className="w-full h-full opacity-35"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 16px),
                    repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 16px)
                  `
                }}
              />
            </div>
          </div>

          {/* Redstone Dust Wire Line Running on Right Edge of the Pillar */}
          <div className="absolute left-[54px] md:left-[calc(50%+26px)] top-0 bottom-0 pointer-events-none z-10 flex flex-col items-center">
            {/* Red glowing wire conduit */}
            <div
              className="w-1 h-full"
              style={{
                background: "linear-gradient(to bottom, #ef4444 0%, #dc2626 40%, #ef4444 70%, #991b1b 100%)",
                boxShadow: "0 0 8px #ef4444, 0 0 16px rgba(239, 68, 68, 0.6)"
              }}
            />
            {/* Redstone Dust Node Sparkles every 40px */}
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fca5a5 2px, #ef4444 3.5px, transparent 4px)",
                backgroundSize: "100% 48px"
              }}
            />
          </div>

          {/* Milestones List */}
          <div className="space-y-16 md:space-y-24 relative z-20 pt-4 pb-8">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0; // Even: Card on Left, Tool on Right; Odd: Card on Right, Tool on Left
              const isExpanded = expandedId === m.id;

              return (
                <div
                  key={m.id}
                  id={`milestone-${m.id}`}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full min-h-[300px]"
                >
                  {/* CENTRAL ITEM FRAME BLOCK (Mounted on the central block pillar) */}
                  <div
                    onClick={() => toggleExpand(m.id)}
                    className="absolute left-[24px] md:left-1/2 -translate-x-1/2 top-8 z-30 w-13 h-13 md:w-14 md:h-14 cursor-pointer flex items-center justify-center transition-transform hover:scale-115 active:scale-95 duration-150"
                    style={{
                      backgroundColor: "#424242",
                      border: "4px solid #222222",
                      boxShadow: "inset 3px 3px 0px #666666, inset -3px -3px 0px #111111, 0 8px 16px rgba(0,0,0,0.6)"
                    }}
                    title={`Click to inspect ${m.oreName}`}
                  >
                    {/* Inner recessed frame velvet slot */}
                    <div
                      className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#292218] border-2 border-[#120e09]"
                      style={{
                        boxShadow: "inset 2px 2px 0px #090704, inset -1px -1px 0px #4d3d2c"
                      }}
                    >
                      {renderCentralItem(m.centralItem)}
                    </div>
                  </div>

                  {/* HORIZONTAL CONNECTOR ROD BETWEEN CENTRAL NODE AND GILDED FRAME (Desktop) */}
                  <div
                    className={`hidden md:block absolute top-[52px] h-1.5 pointer-events-none z-10 ${
                      isEven
                        ? "left-[calc(50%+28px)] w-[60px]"
                        : "right-[calc(50%+28px)] w-[60px]"
                    }`}
                    style={{
                      background: "linear-gradient(to right, #854d0e, #eab308, #854d0e)",
                      boxShadow: "0 0 8px rgba(234, 179, 8, 0.5)"
                    }}
                  />

                  {/* GILDED GOLDEN ITEM FRAME (Opposite the Card on Desktop) */}
                  <div
                    className={`hidden md:flex absolute top-[28px] z-20 items-center justify-center w-16 h-16 pointer-events-auto cursor-pointer transition-transform hover:scale-110 duration-200 ${
                      isEven
                        ? "left-[calc(50%+88px)]"
                        : "right-[calc(50%+88px)]"
                    }`}
                    onClick={() => toggleExpand(m.id)}
                    style={{
                      backgroundColor: "#2a1e05",
                      border: "4px solid #eab308",
                      boxShadow:
                        "0 0 24px rgba(234, 179, 8, 0.7), inset 3px 3px 0px #fde047, inset -3px -3px 0px #713f12"
                    }}
                    title="Gilded Signature Artifact"
                  >
                    {renderGildedTool(m.gildedTool)}
                  </div>

                  {/* THE MAIN MILESTONE CARD (Minecraft Stone GUI Framing with Vines) */}
                  <div
                    className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                      isEven ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                    }`}
                  >
                    <article
                      className="group relative bg-[#242424]/95 text-white transition-all duration-200 hover:-translate-y-1 p-5 md:p-6"
                      style={{
                        border: "5px solid #484848",
                        boxShadow:
                          "inset 3px 3px 0px #6e6e6e, inset -3px -3px 0px #161616, 0 16px 36px rgba(0,0,0,0.7)"
                      }}
                    >
                      {/* 3D Corner Rivets */}
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-[#6e6e6e] border border-[#1a1a1a]" />
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#6e6e6e] border border-[#1a1a1a]" />
                      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 bg-[#6e6e6e] border border-[#1a1a1a]" />
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#6e6e6e] border border-[#1a1a1a]" />

                      {/* Cascading Pixel Vines on Top-Right Corner */}
                      <PixelVines position="top-right" />

                      {/* Top Bar: Depth Coordinate & Biome */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b-2 border-[#383838] pb-2.5">
                        <div className="font-mono text-xs md:text-sm font-bold text-[#f59e0b] tracking-wider">
                          {m.depthY} [ {m.biome} ]
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border ${
                              m.status === "ACTIVE"
                                ? "bg-[#082f49] text-[#7dd3fc] border-[#0284c7]"
                                : m.status === "COMPLETED"
                                ? "bg-[#052e16] text-[#86efac] border-[#15803d]"
                                : "bg-[#2e1065] text-[#e9d5ff] border-[#7e22ce]"
                            }`}
                          >
                            {m.status === "ACTIVE" ? (
                              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping inline-block mr-1" />
                            ) : m.status === "COMPLETED" ? (
                              <CheckCircle2 className="w-3 h-3 text-[#4ade80] inline mr-1" />
                            ) : (
                              <Target className="w-3 h-3 text-[#c084fc] inline mr-1" />
                            )}
                            {m.statusText}
                          </span>
                        </div>
                      </div>

                      {/* Role & Organization */}
                      <div className="mb-3">
                        <span className="font-mono text-[11px] text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                          {m.level} : {m.duration}
                        </span>

                        <h3
                          className="font-mono text-lg md:text-xl font-bold uppercase tracking-wide"
                          style={{
                            color: m.accentColor,
                            textShadow: "2px 2px 0px #0f0f0f"
                          }}
                        >
                          {m.role}
                        </h3>

                        <p className="font-mono text-xs md:text-sm text-[#4ade80] font-bold mt-1 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                          <span>{m.company}</span>
                        </p>
                      </div>

                      {/* Description Body */}
                      <p className="font-sans text-xs md:text-sm text-zinc-200 leading-relaxed mb-4">
                        {m.description}
                      </p>

                      {/* Minecraft Woodland Green Quote Callout */}
                      <div className="bg-[#0e1c0c] border-l-4 border-[#22c55e] p-3 mb-4 text-xs font-mono text-[#86efac] leading-relaxed">
                        "{m.quote}"
                      </div>

                      {/* Highlights with Minecraft item bullets */}
                      <div className="space-y-2 mb-4">
                        {m.keyHighlights.map((point, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2.5 text-xs font-sans text-zinc-200 leading-normal"
                          >
                            {renderBulletIcon(point.iconType)}
                            <span>{point.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* LOOT DROPS // KEY SKILLS & TOOLS INVENTORY HOTBAR */}
                      <div className="pt-3 border-t-2 border-[#383838]">
                        <span className="font-mono text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-2">
                          LOOT DROPS // KEY SKILLS & TOOLS
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {m.lootDrops.map((drop) => (
                            <span
                              key={drop}
                              className="px-2.5 py-1 font-mono text-[11px] text-zinc-100 bg-[#161616] border-2 border-t-[#383838] border-l-[#383838] border-b-[#0a0a0a] border-r-[#0a0a0a] hover:border-[#4ade80] transition-colors"
                            >
                              {drop}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expandable Field Notes */}
                      {isExpanded && (
                        <div className="mt-4 pt-3 border-t-2 border-[#383838] bg-[#1a1a1a] p-3 text-xs font-sans text-zinc-200 leading-relaxed rounded">
                          <div className="font-mono text-[10px] uppercase font-bold text-[#8ada74] mb-1 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#8ada74]" />
                            <span>FIELD NOTES & ARCHITECTURAL LEARNINGS</span>
                          </div>
                          <p>{m.fieldNotes}</p>
                        </div>
                      )}

                      {/* Bottom Button Bar */}
                      <div className="mt-4 flex justify-between items-center text-[11px] font-mono text-zinc-400 pt-2 border-t border-[#333333]">
                        <button
                          onClick={() => toggleExpand(m.id)}
                          className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5" /> Collapse field notes
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5" /> Expand field notes
                            </>
                          )}
                        </button>
                        <span className="text-[#f59e0b] font-bold">
                          MINE ELEVATION: &gt;&gt;
                        </span>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bedrock Terminal Slab Hanging by Chains */}
        <div className="flex flex-col items-center justify-center mt-8 relative z-10">
          {/* Iron Chains Hanging Down to Bedrock Slab */}
          <HangingChains length={22} />

          {/* Hanging Elevation Sign Block */}
          <div
            className="px-4 py-1.5 bg-[#251838] border-4 border-[#120a1f] text-[#c084fc] font-mono text-xs font-bold uppercase tracking-wider shadow-lg mb-2"
            style={{
              boxShadow: "inset 2px 2px 0px #4c2d77, inset -2px -2px 0px #0b0512, 0 0 16px rgba(192,132,252,0.4)"
            }}
          >
            Y: -64
          </div>

          <div
            onClick={() => scrollToMilestone("next-step")}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1a1028] border-2 border-[#7e22ce] text-[#c084fc] font-mono text-[11px] font-bold uppercase cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_0_14px_rgba(192,132,252,0.3)]"
            style={{
              boxShadow: "inset 1px 1px 0px #a855f7, inset -1px -1px 0px #3b0764, 0 0 14px rgba(192,132,252,0.25)"
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
            <span>BEDROCK TERMINAL • BEYOND Y: -64</span>
          </div>
        </div>
      </div>
    </section>
  );
};
