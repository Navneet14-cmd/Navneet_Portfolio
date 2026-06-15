import React from "react";
import { Play } from "lucide-react";
import { Project } from "../types";
import { ObsidianParticles } from "./AmbientParticles";
import ScrollFloat from "./ScrollFloat";

interface ProjectsProps {
  onPlayProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onPlayProject }) => {
  const projectsData: Project[] = [
    {
      id: "cloud_pipeline",
      title: "Terraform_Pipeline_Simulator",
      description: "AWS cloud deployer simulation. Manage load balancing, nodes replication, and security group protocols.",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGHWA2cLHHEdKpxy0ooyr__todsSvJ-yrCMu55xDCwViOSy0hIMUDryYRHtOohcbVlc7e3qM-3kbyY8Wbvtqq1jafr2-_HeMRULXK72i62x0U7gRXXiynp47JlNWFLa1cC0uNUvqqeuk4GOoXAmg6aafVTPc8edpsxMwQoja7O5UTI9_CC20Ep0bFVHS7pZ9WxI4sKYaRj7OwkiGuAx3Ma3Klui1Z9R7UsbWFl7b0YF_oYMx3dO_bUxwy8FPXhE76QoQ2OBY3sfbc",
      tags: ["AWS", "Terraform", "DevOps"],
      playMessage: "Booting AWS Cloud Terminal...",
      gameType: "pipeline",
    },
    {
      id: "methane_plume_detector",
      title: "ISRO_Methane_AI_Scanner",
      description: "Geospatial satellite data scanner. Tweak spectral bands and AI thresholds to map methane plumes.",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY-PDXp6lzoZ5Wy2NqxEyfKNkbxkqbquA_fEEGkS-ADN25lIpVZ85VrZsG81-QVl5NTQuHH5Xff2iZr5C5coSPIrHIH_4vmR6BCNWFqpbkuTa-IniSpULqu918BjReNWLvEFM8XoUtSDRNiEnNfiVueKP96pNT1t-DTBCjjhdvjT1DSrxMg09_nAtUDHcA_lHd4ZlNZT4Yf4fWXhkc9GksEewtYgZKLQORwJoevuSQBDdL6yi-efPtgG8peW4TcWpa5EwSqUE9P8c",
      tags: ["Python", "PyTorch", "Geospatial"],
      playMessage: "Synthesizing AI Heatmap Grid...",
      gameType: "plume",
    },
    {
      id: "great_archives",
      title: "The_Great_Archives",
      description: "Decentralized knowledge base built on the Substrate blockchain framework with WASM execution.",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGCxigLVoRL9VwtiWoLLpJvS1Nxny4yJojIBQ0tkqD2mZ1PfWeWcQfnGfMdfVeW0Vpnon1DpGFLmjkc76aEKP5KKg_jhRBkdiSEvTUoc-L3YaAN2BJcrdkmzkxztDmo_J0LHS2Zbbm3ZVz1_uaO4zifH1VLvuEJwqyQc-6l2gzKdhAF57sL_rpj8Cq7wfQONg8m2Yq0S0M1zo5tAdM7lE68JyU0nteNA1SPG6LRdj5gTZyh1o-g0RLCaNl0dD_xYAjKT06gT8kXPI",
      tags: ["Rust", "Wasm"],
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
        <ScrollFloat
          containerClassName="mb-12 text-center w-full"
          textClassName="font-mono text-3xl md:text-4xl font-bold uppercase text-white tracking-wider"
          style={{
            textShadow: "2px 2px 0px #000, 4px 4px 0px rgba(0,0,0,0.5)",
          }}
        >
          SELECT PROJECT
        </ScrollFloat>

        <div className="space-y-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => onPlayProject(project)}
              className="relative flex flex-col md:flex-row items-center gap-6 p-6 border-4 border-[#121610] hover:border-[#fbca12] transition-all duration-200 cursor-pointer group hover:shadow-[0_0_15px_rgba(250,204,21,0.35)] overflow-hidden"
              style={{
                backgroundImage: `url(${project.thumbnail})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                boxShadow: "inset 4px 4px 0px rgba(255, 255, 255, 0.12), inset -4px -4px 0px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Dark overlay inside the card to keep text readable */}
              <div className="absolute inset-0 bg-black/75 group-hover:bg-black/60 transition-colors duration-200 z-0" />

              <img
                alt={`${project.title} Thumbnail`}
                className="w-28 h-28 pixel-art border-4 border-[#121610] transition-transform duration-200 group-hover:scale-[1.02] object-cover relative z-10"
                src={project.thumbnail}
                referrerPolicy="no-referrer"
              />

              <div className="flex-grow text-center md:text-left relative z-10">
                <h3
                  className="font-mono text-xl md:text-2xl font-bold uppercase text-white transition-colors duration-150"
                  style={{
                    textShadow: "2px 2px 0px #121610",
                  }}
                >
                  {project.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-zinc-300 mt-2">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[10px] font-mono border-2 border-[#121610] font-bold tracking-wider uppercase text-[#ffcdaa] bg-[#735135]"
                      style={{
                        boxShadow: "inset 2px 2px 0px rgba(255, 255, 255, 0.15), inset -2px -2px 0px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                id={`btn-play-${project.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayProject(project);
                }}
                className="px-6 py-2.5 font-mono text-sm uppercase font-bold text-white transition-all duration-75 border-4 border-[#121610] bg-[#c69c36] hover:bg-[#d8ac3e] active:translate-y-[2px] flex items-center justify-center gap-2 w-full md:w-auto relative z-10"
                style={{
                  boxShadow: "inset 4px 4px 0px #fada66, inset -4px -4px 0px #7d5e1b",
                  textShadow: "2px 2px 0px #121610",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="w-4 h-4 pixel-art fill-current">
                  <rect x="13" y="1" width="2" height="2" fill="#ffffff" />
                  <rect x="11" y="3" width="2" height="2" fill="#ffffff" />
                  <rect x="9" y="5" width="2" height="2" fill="#ffffff" />
                  <rect x="7" y="7" width="2" height="2" fill="#ffffff" />
                  <rect x="5" y="9" width="2" height="2" fill="#ffffff" />
                  <rect x="3" y="11" width="2" height="2" fill="#ab8d59" />
                  <rect x="1" y="13" width="2" height="2" fill="#53381a" />
                  <rect x="0" y="15" width="1" height="1" fill="#121610" />
                  <rect x="12" y="0" width="2" height="2" fill="#121610" />
                  <rect x="14" y="2" width="2" height="2" fill="#121610" />
                  <rect x="10" y="2" width="2" height="2" fill="#121610" />
                  <rect x="8" y="4" width="2" height="2" fill="#121610" />
                  <rect x="6" y="6" width="2" height="2" fill="#121610" />
                  <rect x="4" y="8" width="2" height="2" fill="#121610" />
                  <rect x="2" y="10" width="2" height="2" fill="#121610" />
                </svg>
                PLAY
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
