import React, { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Achievements } from "./components/Achievements";
import { Footer } from "./components/Footer";
import { HireModal } from "./components/HireModal";
import { GameSimulator } from "./components/GameSimulator";
import { Project } from "./types";

export default function App() {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const scrollToAboutSection = () => {
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      const offset = 80; // nav height buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = aboutEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#111111] text-on-surface font-sans overflow-x-hidden min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Fixed Background Image and Dark Overlay Layer for smooth GPU-accelerated scrolling */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/home_bg.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Fixed Ambient Floating Ghast element, floating diagonally across the screen */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <img 
          alt="Floating Ghast" 
          className="w-[180px] md:w-[220px] opacity-75 pixel-art" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-CML3LAJc1rI8hXE5rX8U4dIptScMUx37AWinWNdb9rsa1e7SDAvMdqGVyop2Oc6SVsFPgaXsHhbhw78iGFmBznO_jtPYxKVHHf-1r21CrIhdecR83IrDsuPa0jYy99bw1apx5tgqXs3Ju8eGW2LMDBIBk-y1p6xmFss5w52SDG4gakRZE45GtJNrJC_M17C28pQnEmHz6b6s1kSBVsy3fkkz1-TDF_oCDlW2YqFSo9xImUiYTBn3qcSyT4TsjeSTFbM8p0MSeLw"
          style={{
            animation: "ambient-float 45s ease-in-out infinite",
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Sticky Top Header navigation bar */}
      <Header onOpenHireModal={() => setHireModalOpen(true)} />

      {/* Main Sections */}
      <main className="flex-grow relative z-10">
        
        {/* Hero Entry board */}
        <Hero onExploreClick={scrollToAboutSection} />

        {/* Biographic Book Parchment Section */}
        <About />

        {/* 9x3 grid Minecraft inventory Armor/Tools setup */}
        <Skills />

        {/* Brutalist Cobblestone Select projects lists */}
        <Projects onPlayProject={(project) => setActiveProject(project)} />

        {/* Deep mineshaft timeline chart */}
        <Experience />

        {/* Achievements / Advancement made badges */}
        <Achievements />

      </main>

      {/* Footer layout containing standard labels */}
      <Footer />

      {/* Floating Modal Contact grid (Librarian proposal form) */}
      {hireModalOpen && (
        <HireModal onClose={() => setHireModalOpen(false)} />
      )}

      {/* Retro Voxel Arcade Game Emulator overlay */}
      {activeProject && (
        <GameSimulator 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}
    </div>
  );
}
