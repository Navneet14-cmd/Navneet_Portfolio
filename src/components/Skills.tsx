import React, { useState } from "react";
import {
  Database, Terminal, Cloud, Shield, Cpu,
  GitBranch, Sparkles, Flame, Coffee, Box, Layout, Zap
} from "lucide-react";
import ScrollFloat from "./ScrollFloat";

interface InventorySlot {
  name: string;
  icon: React.ReactNode;
  colorClass: string;
}

export const Skills: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  // Define inventory items based on requested tools
  const items: InventorySlot[] = [
    { name: "React / Next.js", icon: <Zap className="w-6 h-6 text-sky-400" />, colorClass: "text-sky-400" },
    { name: "Java", icon: <Coffee className="w-6 h-6 text-red-500" />, colorClass: "text-red-500" },
    { name: "SQL", icon: <Database className="w-6 h-6 text-blue-500" />, colorClass: "text-blue-500" },
    { name: "Bash", icon: <Terminal className="w-6 h-6 text-neutral-400" />, colorClass: "text-neutral-400" },
    { name: "AWS", icon: <Cloud className="w-6 h-6 text-orange-400" />, colorClass: "text-orange-400" },
    { name: "Docker", icon: <Box className="w-6 h-6 text-cyan-400" />, colorClass: "text-cyan-400" },
    { name: "Git", icon: <GitBranch className="w-6 h-6 text-orange-600" />, colorClass: "text-orange-600" },
    { name: "Kubernetes", icon: <Shield className="w-6 h-6 text-blue-600" />, colorClass: "text-blue-600" },
    { name: "UI/UX", icon: <Layout className="w-6 h-6 text-purple-400" />, colorClass: "text-purple-400" },
    { name: "Firebase", icon: <Flame className="w-6 h-6 text-amber-500" />, colorClass: "text-amber-500" },
    { name: "Vercel", icon: <Cpu className="w-6 h-6 text-neutral-200" />, colorClass: "text-neutral-200" },
    { name: "Claude", icon: <Sparkles className="w-6 h-6 text-amber-300" />, colorClass: "text-amber-300" }
  ];

  return (
    <section
      id="skills"
      className="py-16 md:py-24 relative overflow-hidden px-3 md:px-8 flex flex-col items-center"
    >
      <div className="relative z-10 flex flex-col items-center w-full">
        <ScrollFloat
          containerClassName="mb-12 text-center w-full"
          textClassName="font-mono text-3xl md:text-4xl font-bold uppercase text-white"
          style={{
            textShadow: "2px 2px 0px #121610",
          }}
        >
          My Tool Kit
        </ScrollFloat>

        {/* Inventory Stone Outer Box */}
        <div
          className="voxel-block bg-stone p-3 border-4 border-on-surface inline-block shadow-2xl"
          style={{
            backgroundColor: "#7A7A7A",
          }}
        >
          {/* Slot Grid Wrapper (3 rows of 4 columns) */}
          <div
            className="grid grid-cols-4 gap-1 p-2 border-4 border-on-surface"
            style={{
              backgroundColor: "#8B8B8B",
              borderStyle: "inset",
              borderColor: "#373737",
            }}
          >
            {items.map((item, idx) => {
              return (
                <div
                  key={`slot-${idx}`}
                  onMouseEnter={() => setSelectedSlot(idx)}
                  onMouseLeave={() => setSelectedSlot(null)}
                  className="inventory-slot group relative w-16 h-16 bg-[#c6c6c6] border-4 flex items-center justify-center cursor-pointer transition-all duration-75 select-none"
                  style={{
                    borderTopColor: "#373737",
                    borderLeftColor: "#373737",
                    borderRightColor: "#ffffff",
                    borderBottomColor: "#ffffff",
                  }}
                >
                  {/* SVG vector icons */}
                  <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </div>

                  {/* Minecraft Styled Tooltip Box */}
                  {selectedSlot === idx && (
                    <div
                      className="tooltip absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-2.5 z-40 whitespace-nowrap border-2 border-[#5d00ff] bg-stone-900/95"
                      style={{
                        backgroundColor: "rgba(29, 13, 29, 0.95)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                      }}
                    >
                      <span className="text-white font-mono text-sm block">
                        {item.name}
                      </span>
                      <span className="text-[#a5f78d] font-mono text-xs block text-left mt-1">
                        +100% Efficiency
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Hint Board */}
        <div className="mt-8 text-center max-w-md bg-surface p-4 border-4 border-dashed border-on-surface-variant font-mono text-xs text-on-surface-variant uppercase">
          💡 Hover over armor slots to read item metadata & modifiers.
        </div>
      </div>
    </section>
  );
};
