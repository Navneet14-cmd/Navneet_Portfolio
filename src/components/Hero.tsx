import React from "react";

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 lg:flex-row overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl flex flex-col items-center justify-center p-4">
        <img
          src="/assets/navneet-portfolio-logo.png"
          alt="NAVNEET PORTFOLIO"
          className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[650px] h-auto pixel-art mb-8 hover:scale-[1.03] transition-transform duration-300 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
        />
        <p
          className="font-mono text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed select-none"
          style={{
            textShadow: "2px 2px 0px #121610, 4px 4px 0px rgba(0, 0, 0, 0.6)",
          }}
        >
          Welcome to my digital world, built one block at a time. Explore full-stack projects, cloud computing experiments, and research experiences that have shaped my journey as a developer and aspiring software engineer.
        </p>
      </div>
    </section>
  );
};
