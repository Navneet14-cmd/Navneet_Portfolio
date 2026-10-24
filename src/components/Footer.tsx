import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#131a12]/60 backdrop-blur-md border-t border-[#8ada74]/15 shadow-[0_-4px_20px_rgba(0,0,0,0.35)] relative z-10 text-white transition-colors duration-200"
    >
      <div
        className="font-mono text-lg md:text-xl uppercase text-[#8ada74] font-bold tracking-wider"
        style={{
          textShadow: "2px 2px 0px #121610",
        }}
      >
        Navneet_Portfolio
      </div>

      <p className="font-sans text-xs md:text-sm text-zinc-300 uppercase tracking-wider text-center md:text-left">
        © 2024-2028 Cloud Computing. Chase the Clouds.
      </p>

      <div className="flex gap-6 items-center">
        <a
          href="https://github.com/Navneet14-cmd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 hover:text-[#8ada74] transition-all font-mono text-xs uppercase font-bold tracking-wider hover:-translate-y-0.5"
          style={{
            textShadow: "1px 1px 0px #121610",
          }}
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/navneet-pant14?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 hover:text-[#8ada74] transition-all font-mono text-xs uppercase font-bold tracking-wider hover:-translate-y-0.5"
          style={{
            textShadow: "1px 1px 0px #121610",
          }}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};
