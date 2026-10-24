import React from "react";
import { CheckCircle2, Pickaxe, Sword, Gem, BookOpen, Trophy, Zap, Rocket } from "lucide-react";

interface MinecraftHeadingProps {
  title: string;
  bannerText: string;
  highlightText: string;
  leftIcon?: "pickaxe" | "sword" | "gem" | "trophy" | "zap";
  rightIcon?: "pickaxe" | "sword" | "gem" | "book" | "rocket";
  className?: string;
}

// Symmetrical Golden Ornamental Minecraft Filigree Flourish
const GoldenFlourish: React.FC<{ flip?: boolean; className?: string }> = ({
  flip = false,
  className = ""
}) => (
  <svg
    width="92"
    height="40"
    viewBox="0 0 92 40"
    className={`w-14 sm:w-20 md:w-24 lg:w-28 h-auto flex-shrink-0 select-none ${
      flip ? "scale-x-[-1]" : ""
    } ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gold-leaf-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff59d" />
        <stop offset="30%" stopColor="#facc15" />
        <stop offset="70%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <filter id="gold-shadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="1.5" dy="2.5" stdDeviation="0" floodColor="#261005" />
        <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#fde047" floodOpacity="0.35" />
      </filter>
    </defs>
    <g filter="url(#gold-shadow)">
      {/* S-curved main vine stem with pixel step joints */}
      <path
        d="M4 22 C14 16, 26 12, 40 21 C52 28, 64 15, 88 20"
        stroke="url(#gold-leaf-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Secondary vine echo */}
      <path
        d="M18 19 C28 14, 38 18, 48 24"
        stroke="#fef08a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Upper outer flourishing leaf */}
      <path
        d="M26 16 C30 6, 42 7, 36 17 Z"
        fill="url(#gold-leaf-grad)"
        stroke="#451a03"
        strokeWidth="1"
      />
      {/* Upper inner flourishing leaf */}
      <path
        d="M52 17 C58 5, 70 7, 64 18 Z"
        fill="url(#gold-leaf-grad)"
        stroke="#451a03"
        strokeWidth="1"
      />

      {/* Lower outer curling leaf */}
      <path
        d="M14 20 C18 31, 30 30, 24 20 Z"
        fill="url(#gold-leaf-grad)"
        stroke="#451a03"
        strokeWidth="1"
      />
      {/* Lower inner curling leaf */}
      <path
        d="M42 22 C48 33, 60 31, 54 21 Z"
        fill="url(#gold-leaf-grad)"
        stroke="#451a03"
        strokeWidth="1"
      />

      {/* Terminal decorative buds & gold spark gems */}
      <rect
        x="3"
        y="19"
        width="4"
        height="4"
        fill="#fef08a"
        stroke="#451a03"
        strokeWidth="1"
        transform="rotate(45 5 21)"
      />
      <circle cx="36" cy="8" r="2.2" fill="#fff59d" stroke="#78350f" strokeWidth="0.8" />
      <circle cx="64" cy="7" r="2.2" fill="#fff59d" stroke="#78350f" strokeWidth="0.8" />
      <circle cx="24" cy="30" r="2.2" fill="#fff59d" stroke="#78350f" strokeWidth="0.8" />
      <circle cx="54" cy="31" r="2.2" fill="#fff59d" stroke="#78350f" strokeWidth="0.8" />
      <circle cx="87" cy="20" r="2.8" fill="#fef08a" stroke="#451a03" strokeWidth="1" />
    </g>
  </svg>
);

export const MinecraftHeading: React.FC<MinecraftHeadingProps> = ({
  title,
  bannerText,
  highlightText,
  leftIcon = "pickaxe",
  rightIcon = "sword",
  className = ""
}) => {
  const renderIcon = (type: string, isLeft: boolean) => {
    const rotation = isLeft ? "-rotate-45" : "rotate-45";
    switch (type) {
      case "pickaxe":
        return <Pickaxe className={`w-5 h-5 md:w-6 md:h-6 text-[#d4a373] ${rotation} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`} />;
      case "sword":
        return <Sword className={`w-5 h-5 md:w-6 md:h-6 text-[#cbd5e1] ${rotation} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`} />;
      case "gem":
        return <Gem className={`w-5 h-5 md:w-6 md:h-6 text-[#38bdf8] ${rotation} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`} />;
      case "trophy":
        return <Trophy className={`w-5 h-5 md:w-6 md:h-6 text-[#facc15] ${rotation} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`} />;
      case "zap":
        return <Zap className={`w-5 h-5 md:w-6 md:h-6 text-[#f59e0b] ${rotation} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`} />;
      case "book":
        return <BookOpen className={`w-5 h-5 md:w-6 md:h-6 text-[#c084fc] ${rotation} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`} />;
      case "rocket":
        return <Rocket className={`w-5 h-5 md:w-6 md:h-6 text-[#f97316] ${rotation} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]`} />;
      default:
        return <Pickaxe className={`w-5 h-5 md:w-6 md:h-6 text-[#d4a373] ${rotation}`} />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Top 3D Extruded Gold Minecraft Title Flanked by Golden Ornate Vines */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-4 max-w-full">
        {/* Left Golden Vine Flourish */}
        <GoldenFlourish flip={false} />

        {/* 3D Extruded Gold Wordmark */}
        <h2
          className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wider text-center leading-tight whitespace-nowrap"
          style={{
            color: "#ffdf4a",
            textShadow: `
              0 1px 0 #f59e0b,
              0 2px 0 #d97706,
              0 3px 0 #b45309,
              0 4px 0 #92400e,
              0 5px 0 #78350f,
              0 6px 0 #451a03,
              0 7px 1px rgba(0, 0, 0, 0.6),
              0 0 16px rgba(250, 204, 21, 0.45),
              3px 7px 10px rgba(0, 0, 0, 0.9)
            `,
            letterSpacing: "0.08em"
          }}
        >
          {title}
        </h2>

        {/* Right Golden Vine Flourish */}
        <GoldenFlourish flip={true} />
      </div>

      {/* Subtitle Banner with Minecraft Icons & Emerald Highlight */}
      <div className="flex items-center justify-center gap-2 md:gap-3 max-w-full px-2">
        {/* Left Floating Tool Icon */}
        <div className="flex-shrink-0 animate-bounce" style={{ animationDuration: "3s" }}>
          {renderIcon(leftIcon, true)}
        </div>

        {/* Center Minecraft HUD Banner Pill */}
        <div
          className="inline-flex items-center gap-1.5 md:gap-2 px-3 sm:px-4 py-1.5 md:py-2 bg-[#181d16]/95 border-2 border-[#384335] text-white shadow-xl flex-wrap justify-center"
          style={{
            boxShadow:
              "inset 1px 1px 0px rgba(255, 255, 255, 0.15), inset -1px -1px 0px rgba(0, 0, 0, 0.6), 0 6px 18px rgba(0, 0, 0, 0.6)"
          }}
        >
          {/* Green Checkmark Badge */}
          <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4ade80] flex-shrink-0" />

          {/* Banner Text with Emerald Green Highlight */}
          <span className="font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-wider font-bold text-zinc-200">
            {bannerText}{" "}
            <span className="text-[#4ade80] font-extrabold drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">
              {highlightText}
            </span>
          </span>
        </div>

        {/* Right Floating Tool Icon */}
        <div className="flex-shrink-0 animate-bounce" style={{ animationDuration: "3s", animationDelay: "1.5s" }}>
          {renderIcon(rightIcon, false)}
        </div>
      </div>
    </div>
  );
};

export default MinecraftHeading;
