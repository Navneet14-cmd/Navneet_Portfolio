import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer
      className="w-full py-12 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 bg-on-surface dark:bg-zinc-950 border-t-4 border-on-surface relative z-10 text-white"
    >
      <div className="font-mono text-lg md:text-xl uppercase text-primary-fixed-dim font-bold">
        Navneet_Portfolio
      </div>

      <p className="font-sans text-xs md:text-sm text-surface-variant uppercase tracking-wider text-center md:text-left">
        © 2024-2028 Cloud Computing. Chase the Clouds.
      </p>

      <div className="flex gap-6">
        <a
          href="https://github.com/Navneet14-cmd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-surface hover:text-[#a5f78d] transition-all font-mono text-xs uppercase hover:-translate-y-0.5"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/navneet-pant14?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          rel="noopener noreferrer"
          className="text-surface hover:text-[#a5f78d] transition-all font-mono text-xs uppercase hover:-translate-y-0.5"
        >
          LinkedIn
        </a>

      </div>
    </footer>
  );
};
