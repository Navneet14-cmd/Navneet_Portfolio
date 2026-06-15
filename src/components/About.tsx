import React from "react";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 relative overflow-hidden px-6 md:px-12"
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Parchment Book Layout */}
        <div
          className="relative border-4 border-[#121610] bg-[#dbd1b4] p-8 md:w-1/2 min-h-[480px] flex flex-col transform hover:rotate-1 transition-transform duration-300 shadow-2xl pl-12"
          style={{
            boxShadow: "inset 4px 4px 0px #f4ecd8, inset -4px -4px 0px #a89d7f, 0px 8px 24px rgba(0,0,0,0.6)",
          }}
        >
          {/* Notebook Spine / Rings */}
          <div className="absolute left-0 top-0 bottom-0 w-8 border-r-4 border-[#121610] bg-[#8a8a8a] flex flex-col justify-around py-8 z-20">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-8 h-3 flex items-center justify-end">
                <div className="w-5 h-2 bg-[#d1d1d1] border-2 border-[#121610] -mr-[6px] rounded-sm" />
              </div>
            ))}
          </div>

          <div className="flex justify-between border-b-2 border-[#121610]/40 pb-2 mb-6">
            <span className="font-mono text-xs font-bold text-[#121610]/70 uppercase">Page 1 of 1</span>
            <span className="font-mono text-xs font-bold text-[#121610] uppercase">ABOUT_ME.TXT</span>
          </div>

          <div className="flex-grow space-y-4">
            <p className="font-sans text-sm md:text-base text-[#121610] leading-relaxed">
              I am a Computer Science Student and Software Developer.
            </p>
            <p className="font-sans text-sm md:text-base text-[#121610] leading-relaxed">
              Building projects across AI, web development, cloud technologies, and system design.
            </p>
            <p className="font-sans text-sm md:text-base text-[#121610] leading-relaxed font-semibold">
              My philosophy: Logic is the redstone of reality. Every block must serve a purpose.
            </p>
          </div>

          {/* Redstone Logic Gate SVG Diagram */}
          <div className="mt-6 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" className="w-full max-w-[260px] h-auto pixel-art">
              {/* Redstone Dust Input 1 (Top Left) */}
              <rect x="15" y="16" width="6" height="6" fill="#ff2200" />
              <rect x="13" y="18" width="10" height="2" fill="#990000" />

              {/* Redstone Dust Input 2 (Bottom Left) */}
              <rect x="15" y="56" width="6" height="6" fill="#ff2200" />
              <rect x="13" y="58" width="10" height="2" fill="#990000" />

              {/* Redstone lines */}
              <path d="M21 19h15v6" stroke="#ff2200" strokeWidth="2" fill="none" strokeDasharray="2 2" />
              <path d="M21 59h15v-6" stroke="#ff2200" strokeWidth="2" fill="none" strokeDasharray="2 2" />

              {/* Gate 1 (Top NOR) */}
              <path d="M36 15h16c6 0 10 4 10 10s-4 10-10 10H36c2-4 2-16 0-20z" fill="#7a7a7a" stroke="#121610" strokeWidth="2" />
              <line x1="42" y1="21" x2="48" y2="21" stroke="#121610" strokeWidth="2" />
              <line x1="42" y1="29" x2="48" y2="29" stroke="#121610" strokeWidth="2" />
              {/* Gate output torch */}
              <rect x="63" y="23" width="3" height="4" fill="#ff2200" />
              <rect x="64" y="20" width="1" height="3" fill="#ffaa00" />

              {/* Gate 2 (Bottom NOR) */}
              <path d="M36 45h16c6 0 10 4 10 10s-4 10-10 10H36c2-4 2-16 0-20z" fill="#7a7a7a" stroke="#121610" strokeWidth="2" />
              <line x1="42" y1="51" x2="48" y2="51" stroke="#121610" strokeWidth="2" />
              <line x1="42" y1="59" x2="48" y2="59" stroke="#121610" strokeWidth="2" />
              {/* Gate output torch */}
              <rect x="63" y="53" width="3" height="4" fill="#ff2200" />
              <rect x="64" y="50" width="1" height="3" fill="#ffaa00" />

              {/* Connections from Gate 1 & 2 outputs to Gate 3 */}
              <path d="M66 25h20v10h2" stroke="#ff2200" strokeWidth="2" fill="none" strokeDasharray="2 2" />
              <path d="M66 55h20v-10h2" stroke="#ff2200" strokeWidth="2" fill="none" strokeDasharray="2 2" />

              {/* Gate 3 (Middle NAND/NOR) */}
              <path d="M88 29h16c6 0 10 4 10 10s-4 10-10 10H88c2-4 2-16 0-20z" fill="#7a7a7a" stroke="#121610" strokeWidth="2" />
              <line x1="94" y1="35" x2="100" y2="35" stroke="#121610" strokeWidth="2" />
              <line x1="94" y1="43" x2="100" y2="43" stroke="#121610" strokeWidth="2" />

              {/* Connection to output */}
              <path d="M114 39h25" stroke="#ff2200" strokeWidth="2" fill="none" strokeDasharray="2 2" />

              {/* Redstone Output Torch/Lamp (Right) */}
              <rect x="139" y="35" width="8" height="8" fill="#ff2200" />
              <rect x="137" y="37" width="12" height="4" fill="#990000" />
            </svg>
          </div>
        </div>

        {/* Oakley Framed Avatar Layout */}
        <div className="md:w-1/2 flex flex-col items-center animate-bob">
          <div
            className="bg-[#ab8d59] p-2.5 border-4 border-[#121610] rotate-2 transition-transform duration-500 hover:rotate-0 shadow-2xl"
            style={{
              boxShadow: "inset 4px 4px 0px #cfb17e, inset -4px -4px 0px #70552b",
            }}
          >
            <img
              alt="Developer Portrait"
              className="w-full max-w-[280px] md:max-w-full aspect-square object-cover pixel-art border-4 border-[#121610]"
              src="/assets/MEEE.jpeg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-6 text-center">
            <span
              className="px-4 py-1.5 font-mono text-sm inline-block tracking-wider uppercase border-4 border-[#121610] bg-[#3c8527] text-[#a5f78d] font-bold"
              style={{
                boxShadow: "inset 4px 4px 0px #72cc50, inset -4px -4px 0px #215114",
                textShadow: "2px 2px 0px #121610",
              }}
            >
              ID: @Navanshhh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
