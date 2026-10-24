import React, { useState, useRef } from "react";
import { ACHIEVEMENTS_DATA, Achievement, AchievementCategory } from "../data/achievements";
import { AchievementCard } from "./AchievementCard";
import { AchievementModal } from "./AchievementModal";
import MinecraftHeading from "./MinecraftHeading";
import { Award, Compass, Sparkles } from "lucide-react";

type FilterType = "All" | AchievementCategory;

export const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterType>("All");
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);
  const triggerCardRef = useRef<HTMLElement | null>(null);

  const categories: FilterType[] = [
    "All",
    "Research & Internships",
    "Leadership & Appointments",
    "Certifications & Awards",
    "Open Source & Community",
  ];

  const filteredAchievements =
    selectedCategory === "All"
      ? ACHIEVEMENTS_DATA
      : ACHIEVEMENTS_DATA.filter((item) => item.category === selectedCategory);

  const handleOpenModal = (achievement: Achievement) => {
    // Save active element for focus restoration upon closing
    triggerCardRef.current = document.activeElement as HTMLElement;
    setActiveAchievement(achievement);

    // Optional subtle retro Minecraft chime
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.06, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.25);
    } catch {
      // Audio fallback
    }
  };

  const handleCloseModal = () => {
    setActiveAchievement(null);
    // Restore focus to triggering card
    setTimeout(() => {
      triggerCardRef.current?.focus();
    }, 50);
  };

  return (
    <section
      id="achievements"
      className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden z-10 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading with 3D Extruded Gold Title & Symmetrical Flourishes */}
        <MinecraftHeading
          title="ACHIEVEMENTS"
          bannerText="QUEST LOG & MILESTONES • PROOF OF EXPEDITIONS"
          highlightText="COMPLETED ALONG THE WAY"
          leftIcon="trophy"
          rightIcon="book"
          className="mb-10"
        />

        {/* Category Filter Chips Bar */}
        <div
          role="tablist"
          aria-label="Filter achievements by category"
          className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-12"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono text-xs uppercase font-bold tracking-wider transition-all duration-150 border-2 select-none cursor-pointer ${
                  isSelected
                    ? "bg-[#2e5322] text-[#8CE99A] border-[#8CE99A] shadow-[0_0_12px_rgba(140,233,154,0.35)] -translate-y-0.5"
                    : "bg-[#282522]/90 text-[#b5aba0] border-[#141712] hover:bg-[#38332e] hover:text-[#f4f4f5]"
                }`}
                style={{
                  boxShadow: isSelected
                    ? "inset 2px 2px 0px rgba(255, 255, 255, 0.25), inset -2px -2px 0px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(46,83,34,0.4)"
                    : "inset 1px 1px 0px rgba(255, 255, 255, 0.1), inset -1px -1px 0px rgba(0, 0, 0, 0.5)",
                  textShadow: isSelected ? "1px 1px 0px #121610" : "none",
                }}
              >
                {category === "All" && <Sparkles className="w-3 h-3 inline mr-1.5 -mt-0.5 text-[#8CE99A]" />}
                {category}
              </button>
            );
          })}
        </div>

        {/* Achievements Showcase: 3 columns on desktop, 2 on tablet, 1 on mobile; bottom row centered */}
        {filteredAchievements.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] max-w-sm lg:max-w-none flex flex-col items-stretch"
              >
                <AchievementCard
                  achievement={achievement}
                  onOpen={handleOpenModal}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#181d16] border-4 border-[#121610] p-8 max-w-md mx-auto font-mono text-zinc-400">
            <Award className="w-10 h-10 mx-auto text-zinc-600 mb-3" />
            <p className="text-sm">No quests registered under this category yet.</p>
          </div>
        )}
      </div>

      {/* Click-to-Open Parchment Document Modal */}
      <AchievementModal
        achievement={activeAchievement}
        onClose={handleCloseModal}
      />
    </section>
  );
};
