import React from "react";
import { Gem, Box, Hammer } from "lucide-react";
import { TimelineEvent } from "../types";
import { EmberParticles } from "./AmbientParticles";
import ScrollFloat from "./ScrollFloat";

export const Experience: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      level: "Year 1",
      depth: "Programming Fundamentals",
      role: "Student Developer",
      company: "Academic Learning",
      description:
        "Built a strong foundation in Java, object-oriented programming, data structures, algorithms, and core computer science concepts through coursework and personal projects.",
      duration: "2024 - 2025",
      iconType: "iron",
      color: "text-blue-400",
    },
    {
      level: "Year 2",
      depth: "Cloud Computing & Research",
      role: "Research Intern",
      company: "IIRS, ISRO",
      description:
        "Worked on methane plume detection using remote sensing and geospatial data analysis. Contributed to research workflows involving satellite imagery and environmental monitoring techniques.",
      duration: "2025 - 2026",
      iconType: "bedrock",
      color: "text-cyan-400",
    },
    {
      level: "Present",
      depth: "Building & Learning",
      role: "Cloud Computing Student",
      company: "Personal Projects",
      description:
        "Developing full-stack applications using React, Node.js, and PostgreSQL while exploring cloud infrastructure, DevOps practices, and modern software engineering workflows.",
      duration: "2025 - Present",
      iconType: "diamond",
      color: "text-green-400",
    },
    {
      level: "Next Step",
      depth: "Third Year Goals",
      role: "Aspiring Cloud Engineer",
      company: " Internship Preparation",
      description:
        "Focused on strengthening DSA, system design fundamentals, cloud engineering skills, and project development in preparation for software engineering and cloud-focused internships.",
      duration: "Starting Year 3 ",
      iconType: "iron",
      color: "text-purple-400",
    },
  ]

  const renderIcon = (type: "diamond" | "iron" | "bedrock") => {
    switch (type) {
      case "diamond":
        return <Gem className="w-6 h-6 text-[#181d16] animate-pulse" />;
      case "iron":
        return <Box className="w-6 h-6 text-[#181d16]" />;
      case "bedrock":
        return <Hammer className="w-6 h-6 text-white" />;
      default:
        return <Box className="w-6 h-6 text-white" />;
    }
  };

  const getIconClass = (type: "diamond" | "iron" | "bedrock") => {
    switch (type) {
      case "diamond":
        return "bg-[#b4eeee] hover:bg-[#c9f9f9]";
      case "iron":
        return "bg-[#dcdcdc] hover:bg-white";
      case "bedrock":
        return "bg-[#181d16] hover:bg-neutral-800";
    }
  };

  return (
    <section
      id="experience"
      className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Burning Ember Particles */}
      <EmberParticles />

      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollFloat
          containerClassName="mb-16 text-center w-full"
          textClassName="font-mono text-3xl md:text-4xl font-bold uppercase text-white"
        >
          TIMELINE
        </ScrollFloat>

        <div className="space-y-16 relative">
          {/* Central Mineshaft Vertical Timber Axis */}
          <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 h-full w-8 bg-[#373737] border-x-4 border-on-surface z-0" />

          {/* Timeline Node items */}
          {timelineEvents.map((event, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={`timeline-${idx}`}
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full z-10 ${isEven ? "md:justify-end" : "md:justify-start"
                  }`}
              >
                {/* Desktop Side Label Header (hidden on mobile, alternate hand) */}
                {isEven ? (
                  <div className="w-1/2 pr-8 text-right hidden md:block">
                    <span className="font-mono text-sm text-[#b4eeee] block mb-1 font-bold">
                      {event.level}
                    </span>
                    <h3 className="font-mono text-lg font-bold text-white uppercase">
                      {event.role} @ {event.company}
                    </h3>
                  </div>
                ) : (
                  <div className="w-1/2 pl-8 text-left order-2 hidden md:block">
                    <span className="font-mono text-sm text-[#ffd700] block mb-1 font-bold">
                      {event.level}
                    </span>
                    <h3 className="font-mono text-lg font-bold text-white uppercase">
                      {event.role} @ {event.company}
                    </h3>
                  </div>
                )}

                {/* Spine Voxel Node Circle Badge */}
                <div
                  className={`absolute left-[24px] md:left-1/2 -translate-x-1/2 z-20 w-12 h-12 voxel-block flex items-center justify-center transition-transform hover:scale-110 duration-150 ${getIconClass(
                    event.iconType
                  )}`}
                >
                  {renderIcon(event.iconType)}
                </div>

                {/* Subterranean Card Item */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                  <div
                    className={`voxel-block bg-on-surface p-6 text-white md:max-w-sm transition-all duration-200 hover:scale-[1.01] ${isEven
                      ? "hover:border-[#b4eeee] md:ml-0"
                      : "hover:border-[#ffd700] md:ml-auto"
                      }`}
                  >
                    {/* Level marker displayed on mobile */}
                    <span
                      className={`md:hidden font-mono text-xs block mb-2 font-bold ${event.iconType === "diamond"
                        ? "text-[#b4eeee]"
                        : event.iconType === "iron"
                          ? "text-[#ffd700]"
                          : "text-neutral-400"
                        }`}
                    >
                      {event.depth}
                    </span>

                    <h4 className="md:hidden font-mono text-base font-bold text-white uppercase mb-2">
                      {event.role}
                    </h4>
                    <p className="font-sans text-sm md:text-base text-surface-variant leading-relaxed">
                      {event.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center text-xs opacity-60 font-mono">
                      <span>{event.duration}</span>
                      <span className="text-primary-fixed-dim">{event.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
