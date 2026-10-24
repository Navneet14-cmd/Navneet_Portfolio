import React from "react";
import { Achievement } from "../data/achievements";
import { ArrowRight, Building2, Calendar, Sparkles } from "lucide-react";

interface AchievementCardProps {
  achievement: Achievement;
  onOpen: (achievement: Achievement) => void;
}

// Delicate pixel-art Minecraft oak vine for top-left corner
const CardVineCornerTL: React.FC = () => (
  <svg
    viewBox="0 0 48 48"
    width="48"
    height="48"
    className="absolute -top-2 -left-2 pointer-events-none z-20 select-none pixel-art"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Dark backing / shadow pixels */}
    <rect x="0" y="4" width="16" height="22" fill="#182b0e" />
    <rect x="4" y="0" width="28" height="12" fill="#182b0e" />
    <rect x="16" y="6" width="18" height="8" fill="#182b0e" />
    <rect x="4" y="18" width="8" height="16" fill="#182b0e" />

    {/* Dark forest green base */}
    <rect x="4" y="6" width="12" height="16" fill="#264714" />
    <rect x="6" y="4" width="22" height="8" fill="#264714" />
    <rect x="6" y="18" width="6" height="12" fill="#264714" />

    {/* Mid tone foliage */}
    <rect x="6" y="6" width="10" height="12" fill="#38661d" />
    <rect x="12" y="4" width="12" height="6" fill="#38661d" />
    <rect x="18" y="6" width="8" height="6" fill="#4d8b27" />
    <rect x="8" y="14" width="6" height="8" fill="#4d8b27" />

    {/* Highlights */}
    <rect x="8" y="6" width="6" height="6" fill="#67b333" />
    <rect x="16" y="4" width="6" height="3" fill="#67b333" />
    <rect x="22" y="6" width="3" height="3" fill="#83cf42" />

    {/* Hanging droplet */}
    <rect x="4" y="30" width="3" height="6" fill="#264714" />
    <rect x="5" y="32" width="2" height="4" fill="#4d8b27" />
  </svg>
);

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onOpen }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(achievement);
    }
  };

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`View achievement details for ${achievement.title}`}
      onKeyDown={handleKeyDown}
      onClick={() => onOpen(achievement)}
      className="group relative flex flex-col justify-between h-full w-full border-4 border-[#141712] transition-all duration-200 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8CE99A] cursor-pointer overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg, rgba(46, 42, 38, 0.94) 0%, rgba(30, 28, 25, 0.96) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "inset 2px 2px 0px rgba(255, 255, 255, 0.12), inset -2px -2px 0px rgba(0, 0, 0, 0.7), 0 16px 36px rgba(0, 0, 0, 0.65)",
      }}
    >
      {/* Tasteful Pixel-Art Corner Vine Accent */}
      <CardVineCornerTL />

      {/* Top Banner Image with Responsive Aspect-Fitting */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden border-b-4 border-[#121610] bg-[#0c0e0b] flex items-center justify-center">
        {/* Ambient Blurred Backdrop to fill letterboxing seamlessly */}
        <img
          src={achievement.coverImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-35 scale-110 pointer-events-none select-none"
        />
        {/* Subtle dark gradient overlay to ensure badge & edge contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1a]/90 via-black/20 to-black/35 pointer-events-none z-10" />

        {/* Foreground fully visible image (no cropping!) */}
        <img
          src={achievement.coverImage}
          alt={achievement.title}
          loading="lazy"
          className="relative z-10 max-h-full max-w-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category Badge Pill (Top-Left) */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
          <span
            className="px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase border-2 border-[#121610] bg-[#222b1c] text-[#8ce99a]"
            style={{
              boxShadow: "inset 1px 1px 0px rgba(255, 255, 255, 0.2), inset -1px -1px 0px rgba(0, 0, 0, 0.5)",
              textShadow: "1px 1px 0px #000",
            }}
          >
            <Sparkles className="w-3 h-3 inline mr-1 -mt-0.5 text-[#a5f78d]" />
            {achievement.badgeText}
          </span>
        </div>

        {/* Date Tag (Top-Right) */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <span
            className="px-2 py-0.5 font-mono text-[10px] text-[#d6c5ad] bg-[#1a1714]/90 border border-[#121610] flex items-center gap-1"
            style={{
              boxShadow: "inset 1px 1px 0px rgba(255, 255, 255, 0.1), inset -1px -1px 0px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Calendar className="w-2.5 h-2.5 text-[#8CE99A]" />
            {achievement.date}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Organization Subtitle */}
          <div className="flex items-center gap-1.5 text-xs text-[#8CE99A] font-mono font-bold tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5 text-[#8CE99A] flex-shrink-0" />
            <span className="truncate" style={{ textShadow: "1px 1px 0px #121610" }}>
              {achievement.organization}
            </span>
          </div>

          {/* Achievement Title */}
          <h3
            className="font-mono text-base md:text-lg font-bold text-white group-hover:text-[#a5f78d] transition-colors leading-snug"
            style={{
              textShadow: "2px 2px 0px #121610",
            }}
          >
            {achievement.title}
          </h3>

          {/* Description Snippet */}
          <p className="font-sans text-xs md:text-sm text-[#c7c0b6] leading-relaxed line-clamp-3">
            {achievement.description}
          </p>
        </div>

        {/* Technology & Role Chips */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {achievement.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border-2 border-[#121610] bg-[#312921] text-[#d4c3ab]"
                style={{
                  boxShadow: "inset 1px 1px 0px rgba(255, 255, 255, 0.12), inset -1px -1px 0px rgba(0, 0, 0, 0.45)",
                  textShadow: "1px 1px 0px #121610",
                }}
              >
                {tech}
              </span>
            ))}
            {achievement.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#a8a195] bg-[#221e1a] border border-[#121610]">
                +{achievement.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Tactile Stone Button */}
          <div
            className="w-full py-2.5 px-4 font-mono text-xs font-bold uppercase tracking-wider text-white border-4 border-[#121610] bg-[#757575] group-hover:bg-[#858585] flex items-center justify-center gap-2 transition-all duration-150 active:translate-y-0.5"
            style={{
              boxShadow: "inset 2px 2px 0px #a4a4a4, inset -2px -2px 0px #404040, 0 4px 8px rgba(0, 0, 0, 0.4)",
              textShadow: "1px 1px 0px #121610",
            }}
          >
            <span>INSPECT ADVANCEMENT</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#a5f78d]" />
          </div>
        </div>
      </div>
    </article>
  );
};
