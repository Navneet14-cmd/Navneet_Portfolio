import React, { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  size: number;
  left: number;
  bottom?: number;
  top?: number;
  color?: string;
  duration: number;
  delay: number;
  drift: number;
}

export const EmberParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    // Media query to check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const colors = ["#ff9800", "#ffc107", "#ff5722", "#ffeb3b"];

    // Generate initial particles
    const initialParticles: Particle[] = Array.from({ length: 25 }).map(() => ({
      id: nextId.current++,
      size: Math.floor(Math.random() * 6) + 4, // 4-10px
      left: Math.random() * 100, // % width
      top: Math.random() * -10, // starts off or top
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 4 + 4, // 4-8 seconds
      delay: Math.random() * -5, // staggered starts
      drift: (Math.random() - 0.5) * 40, // horizontal drift
    }));

    setParticles(initialParticles);

    // Keep adding particles occasionally
    const interval = setInterval(() => {
      setParticles((prev) => {
        // limit count
        const active = prev.filter((p) => Math.random() > 0.05);
        if (active.length < 35) {
          return [
            ...active,
            {
              id: nextId.current++,
              size: Math.floor(Math.random() * 6) + 4,
              left: Math.random() * 100,
              top: -20,
              color: colors[Math.floor(Math.random() * colors.length)],
              duration: Math.random() * 4 + 4,
              delay: 0,
              drift: (Math.random() - 0.5) * 40,
            },
          ];
        }
        return active;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        const uniqueKey = `ember-${p.id}`;
        return (
          <div
            id={uniqueKey}
            key={uniqueKey}
            className="amber-particle absolute animate-pulse rounded-none"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}px`,
              backgroundColor: p.color,
              opacity: 0.6,
              transform: `translateX(0px)`,
              animation: `float ${p.duration}s ${p.delay}s infinite linear`,
              boxShadow: "0 0 4px rgba(255, 152, 0, 0.4)",
              transition: "transform 0.1s ease-out",
            }}
          />
        );
      })}
    </div>
  );
};

export const ObsidianParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Generate initial ascending obsidian blocks
    const initialParticles: Particle[] = Array.from({ length: 15 }).map(() => ({
      id: nextId.current++,
      size: Math.floor(Math.random() * 8) + 6, // 6-14px
      left: Math.random() * 100,
      bottom: Math.random() * -10,
      duration: Math.random() * 5 + 6, // 6-11s
      delay: Math.random() * -8,
      drift: (Math.random() - 0.5) * 60,
    }));

    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles((prev) => {
        const active = prev.filter(() => Math.random() > 0.05);
        if (active.length < 25) {
          return [
            ...active,
            {
              id: nextId.current++,
              size: Math.floor(Math.random() * 8) + 6,
              left: Math.random() * 100,
              bottom: -30,
              duration: Math.random() * 5 + 6,
              delay: 0,
              drift: (Math.random() - 0.5) * 60,
            },
          ];
        }
        return active;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        const uniqueKey = `obsidian-${p.id}`;
        return (
          <div
            id={uniqueKey}
            key={uniqueKey}
            className="obsidian-particle absolute rounded-none"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: `${p.bottom}px`,
              opacity: 0.35,
              animation: `float ${p.duration}s ${p.delay}s infinite ease-in-out`,
            }}
          />
        );
      })}
    </div>
  );
};
