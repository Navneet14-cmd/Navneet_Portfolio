import React, { useState } from "react";
import { Trophy, Users, Award } from "lucide-react";

import ScrollFloat from "./ScrollFloat";

export const Achievements: React.FC = () => {
  const [unlockedCount, setUnlockedCount] = useState<number>(0);
  const [clickedAdvancements, setClickedAdvancements] = useState<{ [key: string]: boolean }>({});

  const advancements = [
    {
      title: "ISRO Research Internship",
      advancement: "Achievement Unlocked!",
      description:
        "Completed an internship at IIRS, ISRO and worked on methane plume detection using satellite and geospatial data.",
      iconName: "legend",
      bgClass: "bg-[#206d14]",
      accentColor: "text-emerald-400",
    },
    {
      title: "Full Stack Applications",
      advancement: "Achievement Unlocked!",
      description:
        "Developed end-to-end applications with React, Node.js, APIs, authentication, and database integration.",
      iconName: "leader",
      bgClass: "bg-[#7b563a]",
      accentColor: "text-amber-400",
    },
    {
      title: "Cloud & DevOps Journey",
      advancement: "Achievement Unlocked!",
      description:
        "Learning AWS, Terraform, cloud architecture, deployment pipelines, and infrastructure automation.",
      iconName: "uptime",
      bgClass: "bg-tertiary",
      accentColor: "text-sky-400",
    },
  ];

  const handleAdvancementClick = (title: string) => {
    if (!clickedAdvancements[title]) {
      setClickedAdvancements(prev => ({ ...prev, [title]: true }));
      setUnlockedCount(prev => prev + 1);
    }

    // Play retro Minecraft-style level up/pop sound block if browser allows
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // Quick retro level-up chime!
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(frequency, startTime);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      // Standard retro chime cadence (low then high)
      playTone(523.25, audioContext.currentTime, 0.15); // C5
      playTone(659.25, audioContext.currentTime + 0.1, 0.15); // E5
      playTone(783.99, audioContext.currentTime + 0.2, 0.35); // G5
    } catch (e) {
      // Fallback if audio blocked or unsupported
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case "legend":
        return <Trophy className="w-6 h-6 text-white" />;
      case "leader":
        return <Users className="w-6 h-6 text-white" />;
      case "uptime":
        return <Award className="w-6 h-6 text-white" />;
      default:
        return <Trophy className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section id="achievements" className="py-16 md:py-24 px-6 md:px-12 overflow-hidden relative z-10">
      <ScrollFloat
        containerClassName="mb-4 text-center w-full"
        textClassName="font-mono text-3xl md:text-4xl font-bold uppercase text-white"
        style={{
          textShadow: "2px 2px 0px #010101ff",
        }}
      >
        Advancements Made
      </ScrollFloat>
      <p className="font-mono text-xs text-center uppercase tracking-wider text-zinc-300 mb-12">
        {unlockedCount > 0
          ? `🏆 Unlocked ${unlockedCount} / ${advancements.length} Achievements`
          : "Click on cards to trigger leveling advancements!"}
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {advancements.map((adv) => {
          const isClicked = clickedAdvancements[adv.title];
          return (
            <div
              key={adv.title}
              onClick={() => handleAdvancementClick(adv.title)}
              className="voxel-block bg-[#212121] border-4 border-[#5d5d5d] p-4 flex items-center gap-6 w-full max-w-sm relative overflow-hidden group cursor-pointer select-none transition-transform active:scale-98 hover:scale-[1.02]"
              style={{
                boxShadow: "rgba(193, 177, 177, 0.1) 2px 2px 0px inset, rgba(0, 0, 0, 0.7) -4px -4px 0px inset",
              }}
            >
              {/* Shimmer overlay class */}
              <div className="absolute inset-0 shimmer-effect pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Container with Minecraft-style status */}
              <div
                className={`w-12 h-12 flex items-center justify-center border-2 border-on-surface z-10 transition-transform ${adv.bgClass} ${isClicked ? "scale-110 shadow-[0_0_12px_#a5f78d]" : ""
                  }`}
              >
                {renderIcon(adv.iconName)}
              </div>

              <div className="z-10 flex-grow">
                <h4 className="text-[#f7fbef] font-mono text-xs font-semibold tracking-wider uppercase flex justify-between items-center">
                  <span>{adv.advancement}</span>
                  {isClicked && (
                    <span className="text-[#a5f78d] font-bold text-[10px] bg-primary/20 px-1 border border-[#a5f78d]">
                      ACHIEVED
                    </span>
                  )}
                </h4>
                <p className={`font-mono text-base font-bold ${adv.accentColor}`}>
                  {adv.title}
                </p>
                <p className="text-white text-xs mt-1 leading-normal">
                  {adv.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
