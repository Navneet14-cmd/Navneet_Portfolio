import React from "react";
import { Project } from "../types";
import { ObsidianParticles } from "./AmbientParticles";
import MinecraftHeading from "./MinecraftHeading";

interface ProjectsProps {
  onPlayProject: (project: Project) => void;
}

// Pixel-art Minecraft oak foliage & vines draping from corners
const VineTopLeft: React.FC = () => (
  <svg
    viewBox="0 0 64 64"
    width="64"
    height="64"
    className="absolute -top-2.5 -left-2.5 pointer-events-none z-20 select-none pixel-art"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Dark outline/shadow blocks */}
    <rect x="0" y="4" width="20" height="28" fill="#182b0e" />
    <rect x="4" y="0" width="36" height="16" fill="#182b0e" />
    <rect x="20" y="8" width="24" height="12" fill="#182b0e" />
    <rect x="4" y="24" width="12" height="20" fill="#182b0e" />

    {/* Dark forest green base */}
    <rect x="4" y="8" width="16" height="20" fill="#264714" />
    <rect x="8" y="4" width="28" height="12" fill="#264714" />
    <rect x="8" y="24" width="8" height="16" fill="#264714" />

    {/* Mid tone foliage */}
    <rect x="8" y="8" width="12" height="16" fill="#38661d" />
    <rect x="16" y="4" width="16" height="8" fill="#38661d" />
    <rect x="24" y="8" width="12" height="8" fill="#4d8b27" />
    <rect x="12" y="20" width="8" height="12" fill="#4d8b27" />
    <rect x="8" y="32" width="4" height="8" fill="#38661d" />

    {/* Bright sunlit highlights */}
    <rect x="12" y="8" width="8" height="8" fill="#67b333" />
    <rect x="20" y="4" width="8" height="4" fill="#67b333" />
    <rect x="28" y="8" width="4" height="4" fill="#83cf42" />
    <rect x="14" y="16" width="4" height="4" fill="#83cf42" />
    <rect x="10" y="24" width="4" height="4" fill="#67b333" />

    {/* Hanging vine droplet tendrils */}
    <rect x="4" y="40" width="4" height="8" fill="#264714" />
    <rect x="6" y="44" width="2" height="6" fill="#4d8b27" />
    <rect x="12" y="32" width="4" height="6" fill="#38661d" />
  </svg>
);

const VineTopRight: React.FC = () => (
  <svg
    viewBox="0 0 64 64"
    width="64"
    height="64"
    className="absolute -top-2.5 -right-2.5 pointer-events-none z-20 select-none pixel-art"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Dark outline/shadow blocks */}
    <rect x="44" y="4" width="20" height="28" fill="#182b0e" />
    <rect x="24" y="0" width="36" height="16" fill="#182b0e" />
    <rect x="20" y="8" width="24" height="12" fill="#182b0e" />
    <rect x="48" y="24" width="12" height="20" fill="#182b0e" />

    {/* Dark forest green base */}
    <rect x="44" y="8" width="16" height="20" fill="#264714" />
    <rect x="28" y="4" width="28" height="12" fill="#264714" />
    <rect x="48" y="24" width="8" height="16" fill="#264714" />

    {/* Mid tone foliage */}
    <rect x="44" y="8" width="12" height="16" fill="#38661d" />
    <rect x="32" y="4" width="16" height="8" fill="#38661d" />
    <rect x="28" y="8" width="12" height="8" fill="#4d8b27" />
    <rect x="44" y="20" width="8" height="12" fill="#4d8b27" />
    <rect x="52" y="32" width="4" height="8" fill="#38661d" />

    {/* Bright highlights */}
    <rect x="44" y="8" width="8" height="8" fill="#67b333" />
    <rect x="36" y="4" width="8" height="4" fill="#67b333" />
    <rect x="32" y="8" width="4" height="4" fill="#83cf42" />
    <rect x="46" y="16" width="4" height="4" fill="#83cf42" />

    {/* Hanging vine droplet tendrils */}
    <rect x="56" y="40" width="4" height="8" fill="#264714" />
    <rect x="56" y="44" width="2" height="6" fill="#4d8b27" />
  </svg>
);

const VineSideLeft: React.FC = () => (
  <svg
    viewBox="0 0 32 48"
    width="32"
    height="48"
    className="absolute bottom-4 -left-2.5 pointer-events-none z-20 select-none pixel-art"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="8" width="8" height="28" fill="#182b0e" />
    <rect x="4" y="12" width="12" height="20" fill="#264714" />
    <rect x="8" y="16" width="10" height="14" fill="#38661d" />
    <rect x="6" y="20" width="6" height="8" fill="#4d8b27" />
    <rect x="8" y="22" width="4" height="4" fill="#67b333" />
    <rect x="2" y="32" width="4" height="10" fill="#264714" />
  </svg>
);

export const Projects: React.FC<ProjectsProps> = ({ onPlayProject }) => {
  const projectsData: Project[] = [
    {
      id: "cloud_pipeline",
      title: "TERRAFORM PIPELINE SIMULATOR",
      category: "AWS",
      description: "AWS cloud deployer simulation. Manage load balancing, nodes replication, and security group protocols.",
      thumbnail: "/assets/project_terraform_pipeline.jpg",
      tags: ["AWS", "TERRAFORM", "DEVOPS"],
      codeLabel: "GITHUB",
      githubUrl: "https://github.com/Navneet14-cmd",
      playMessage: "Booting AWS Cloud Terminal...",
      gameType: "pipeline",
    },
    {
      id: "methane_plume_detector",
      title: "METHANE AI SCANNER",
      category: "INFRASTRUCTURE",
      description: "Geospatial satellite data scanner. Tweak spectral bands and AI thresholds to map methane plumes.",
      thumbnail: "/assets/project_methane_scanner.jpg",
      tags: ["PYTHON", "PYTORCH", "GEOSPATIAL"],
      codeLabel: "CODE",
      githubUrl: "https://github.com/Navneet14-cmd",
      playMessage: "Synthesizing AI Heatmap Grid...",
      gameType: "plume",
    },
    {
      id: "great_archives",
      title: "THE GREAT ARCHIVE",
      category: "v8",
      description: "Classified vault of secret knowledge, available only to those who pass the trial level! Mine the gold target to unlock encrypted tips, developer memos, and forbidden lore.",
      thumbnail: "/assets/project_the_great_archive.jpg",
      tags: ["RUST", "WASM"],
      codeLabel: "CODE",
      githubUrl: "https://github.com/Navneet14-cmd",
      playMessage: "Synching Ledger Blocks...",
      gameType: "archives",
    },
  ];

  return (
    <section
      id="projects"
      className="py-16 md:py-24 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background Obsidian Floating Particles */}
      <ObsidianParticles />

      <div className="max-w-5xl mx-auto relative z-0">
        {/* Section Heading with 3D Extruded Gold Title & Symmetrical Flourishes */}
        <MinecraftHeading
          title="PROJECTS"
          bannerText="MISSION REGISTRY • INTERACTIVE CODEBASES"
          highlightText="& DEPLOYED BUILDS"
          leftIcon="sword"
          rightIcon="rocket"
          className="mb-12"
        />

        <div className="space-y-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => onPlayProject(project)}
              className="relative flex flex-col md:flex-row items-center gap-6 p-5 md:p-6 border-4 border-[#141712] transition-all duration-200 group cursor-pointer"
              style={{
                background: "linear-gradient(180deg, rgba(46, 42, 38, 0.94) 0%, rgba(30, 28, 25, 0.96) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "inset 2px 2px 0px rgba(255, 255, 255, 0.12), inset -2px -2px 0px rgba(0, 0, 0, 0.7), 0 16px 36px rgba(0, 0, 0, 0.65)",
              }}
            >
              {/* Pixel Art Foliage / Vine Overhangs */}
              <VineTopLeft />
              <VineTopRight />
              <VineSideLeft />

              {/* Left Screen / Thumbnail Frame */}
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 flex-shrink-0 relative border-4 border-[#121610] bg-[#0c0e0b] overflow-hidden"
                style={{
                  boxShadow: "inset 3px 3px 0px rgba(0, 0, 0, 0.85), inset -2px -2px 0px rgba(255, 255, 255, 0.08), 0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <img
                  alt={`${project.title} Thumbnail`}
                  className="w-full h-full object-cover pixel-art transition-transform duration-300 group-hover:scale-105"
                  src={project.thumbnail}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 border border-white/10 pointer-events-none" />
              </div>

              {/* Middle Project Details */}
              <div className="flex-grow text-center md:text-left relative z-10 min-w-0">
                <div className="flex items-baseline justify-center md:justify-start flex-wrap gap-2">
                  <h3
                    className="font-mono text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-[#f4f4f5]"
                    style={{ textShadow: "2px 2px 0px #121610" }}
                  >
                    {project.title}
                  </h3>
                  {project.category && (
                    <span
                      className="font-mono text-xs sm:text-sm font-bold text-[#d4a853] tracking-wider uppercase"
                      style={{ textShadow: "1px 1px 0px #121610" }}
                    >
                      [ {project.category} ]
                    </span>
                  )}
                </div>

                <p className="font-sans text-sm md:text-[15px] text-[#c7c0b6] mt-2.5 leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[11px] font-mono font-bold tracking-wider uppercase border-2 border-[#121610] bg-[#312921] text-[#d4c3ab]"
                      style={{
                        boxShadow: "inset 1px 1px 0px rgba(255, 255, 255, 0.14), inset -1px -1px 0px rgba(0, 0, 0, 0.45)",
                        textShadow: "1px 1px 0px #121610",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Action Column (PLAY Button & Code Link) */}
              <div className="flex flex-col items-center justify-center flex-shrink-0 w-full md:w-auto relative z-10 pt-2 md:pt-0">
                <button
                  id={`btn-play-${project.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayProject(project);
                  }}
                  className="w-full md:w-32 py-2.5 px-6 font-mono text-sm font-bold uppercase tracking-wider text-white border-4 border-[#121610] bg-[#757575] hover:bg-[#858585] active:translate-y-[2px] transition-all cursor-pointer"
                  style={{
                    boxShadow: "inset 3px 3px 0px #a4a4a4, inset -3px -3px 0px #404040, 0 4px 10px rgba(0, 0, 0, 0.5)",
                    textShadow: "2px 2px 0px #121610",
                  }}
                >
                  PLAY
                </button>

                <a
                  href={project.githubUrl || "https://github.com/Navneet14-cmd"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2.5 font-mono text-xs uppercase tracking-widest text-[#a8a195] hover:text-[#fbca12] transition-colors cursor-pointer"
                  style={{ textShadow: "1px 1px 0px #121610" }}
                >
                  [ {project.codeLabel || "CODE"} ]
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
