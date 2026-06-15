import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenHireModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHireModal }) => {
  const [activeTab, setActiveTab] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "experience"];
      let currentSection = "hero";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust threshold to be user-friendly
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveTab(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header + buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-3 bg-[#1b221a]/90 backdrop-blur-md border-b-4 border-[#121610]">
      <div
        id="logo-brand"
        onClick={() => scrollToSection("hero")}
        className="cursor-pointer hover:scale-[1.05] transition-transform duration-200"
      >
        <img
          src="/assets/navneet-portfolio-logo.png"
          alt="NAVNEET PORTFOLIO"
          className="h-7 md:h-9 lg:h-11 w-auto pixel-art"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              id={`nav-link-${item.id}`}
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-mono text-sm leading-none uppercase px-3 py-2 transition-colors duration-150 font-bold tracking-wider ${isActive
                  ? "text-white"
                  : "text-[#8ada74] hover:text-white"
                }`}
              style={{
                textShadow: "2px 2px 0px #121610",
              }}
            >
              {item.label}
            </button>
          );
        })}
        <button
          id="btn-hire-me-desktop"
          onClick={onOpenHireModal}
          className="px-5 py-2 font-mono text-sm uppercase font-bold text-white transition-all duration-75 border-4 border-[#121610] bg-[#3c8527] hover:bg-[#4c9e33] active:translate-y-[2px]"
          style={{
            boxShadow: "inset 4px 4px 0px #72cc50, inset -4px -4px 0px #215114",
            textShadow: "2px 2px 0px #121610",
          }}
        >
          Hire Me
        </button>
      </div>

      {/* Mobile Hamburger menu */}
      <button
        id="btn-mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden voxel-button bg-stone p-1.5 flex items-center justify-center text-on-surface hover:bg-stone/80"
        style={{
          boxShadow: "rgba(255, 255, 255, 0.3) 2px 2px 0px inset, rgba(0, 0, 0, 0.5) -2px -2px 0px inset",
        }}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="absolute top-[100%] left-0 w-full bg-surface dark:bg-inverse-surface border-b-4 border-on-surface flex flex-col p-4 space-y-3 md:hidden z-40 shadow-xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                id={`mobile-nav-${item.id}`}
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-mono text-left text-sm uppercase px-4 py-2 transition-all ${isActive
                  ? "bg-secondary-container text-on-secondary-container font-bold border-l-4 border-primary"
                  : "text-on-surface-variant hover:bg-surface-container"
                  }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            id="btn-hire-me-mobile"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenHireModal();
            }}
            className="voxel-button w-full bg-primary text-on-primary py-3 font-mono text-sm uppercase"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.4) 4px 4px 0px inset, rgba(0, 0, 0, 0.6) -4px -4px 0px inset",
            }}
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
};
