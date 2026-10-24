import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Achievement } from "../data/achievements";
import FlipCard from "./FlipCard";
import {
  X,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  BookOpen,
  RotateCw,
  Eye,
  Hand,
  Maximize2,
  ZoomIn,
  ZoomOut
} from "lucide-react";

interface AchievementModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({ achievement, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [subFlipped, setSubFlipped] = useState<Record<string, boolean>>({});
  const [cardRotations, setCardRotations] = useState<Record<string, number>>({});
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(null);
  const [lightboxRotation, setLightboxRotation] = useState<number>(0);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 1024;
  const mobileCardWidth = Math.min(290, Math.max(260, windowWidth - 76));
  const cardWidth = isMobile ? mobileCardWidth : 340;
  const cardHeight = isMobile ? Math.round(mobileCardWidth * 1.35) : 460;

  const hasSubCards = Boolean(achievement?.subCards && achievement.subCards.length > 0);

  const toggleCardRotation = (key: string) => {
    setCardRotations((prev) => ({
      ...prev,
      [key]: ((prev[key] || 0) + 90) % 360,
    }));
  };

  // Prevent background scrolling while modal is open & listen for ESC key
  useEffect(() => {
    if (!achievement) return;

    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Auto-focus close button for accessibility
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [achievement, onClose, lightboxImage]);

  // Reset flip and view states when achievement changes
  useEffect(() => {
    setIsFlipped(false);
    setSubFlipped({});
    setCardRotations({});
    setLightboxImage(null);
    setLightboxRotation(0);
    setLightboxZoom(1);
  }, [achievement]);

  if (!achievement) return null;

  const toggleFlip = () => setIsFlipped((prev) => !prev);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Fullscreen Lightbox / Zoom Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none overscroll-contain"
          style={{ overscrollBehavior: "contain" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col items-center justify-between bg-[#151311] border-4 border-[#333] shadow-2xl overflow-hidden overscroll-contain"
            style={{ overscrollBehavior: "contain" }}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between bg-[#211f1d] px-4 py-2.5 border-b border-zinc-700 text-white z-20">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#ffd700] truncate max-w-[200px] sm:max-w-md">
                  {lightboxImage.caption}
                </span>
              </div>

              {/* Toolbar Actions: Rotate, Zoom, Close */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLightboxRotation((prev) => (prev + 90) % 360)}
                  className="px-2.5 py-1 bg-[#181d16] hover:bg-[#283224] text-[#8ce99a] border border-[#3c8527] font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Rotate 90° clockwise"
                  aria-label="Rotate image"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Rotate</span> ({lightboxRotation}°)
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxZoom((prev) => (prev > 1 ? 1 : 1.75))}
                  className="px-2.5 py-1 bg-[#181d16] hover:bg-[#283224] text-[#ffd700] border border-[#ffd700]/60 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Toggle Zoom Level"
                  aria-label="Toggle zoom"
                >
                  {lightboxZoom > 1 ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  <span>{lightboxZoom > 1 ? "Fit" : "Zoom"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 bg-red-600 hover:bg-red-500 text-white border border-[#121610] cursor-pointer shadow transition-colors ml-1"
                  aria-label="Close full-screen image view"
                >
                  <X className="w-4 h-4 font-bold" />
                </button>
              </div>
            </div>

            {/* Uncropped Full Image Area with Smooth Pan/Zoom/Rotation */}
            <div className="w-full flex-grow overflow-auto max-h-[75vh] flex items-center justify-center p-4 bg-[#0a0c09]">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.caption}
                style={{
                  transform: `rotate(${lightboxRotation}deg) scale(${lightboxZoom})`,
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                className="max-h-[72vh] max-w-full object-contain drop-shadow-2xl select-none"
              />
            </div>

            {/* Caption Bar */}
            <div className="w-full text-center py-2 px-4 bg-[#1e1c1a] border-t border-zinc-800 text-zinc-400 font-mono text-[11px] sm:text-xs">
              <span>Fit Aspect Ratio • 100% Uncropped Original Media</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Achievement Modal - Cleanly Positioned Below Nav Bar with z-[200] and overscroll-contain */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-achievement-title"
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex justify-center items-start md:items-center p-2.5 sm:p-6 pt-16 md:pt-24 pb-4 sm:pb-8 overflow-y-auto overscroll-contain"
        style={{ overscrollBehavior: "contain" }}
      >
        {/* Minecraft Parchment / Tome Modal Container */}
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className={`w-full ${
            hasSubCards ? "max-w-6xl" : "max-w-5xl"
          } bg-[#424242] border-4 border-[#121610] text-[#121610] voxel-block flex flex-col my-auto max-h-[calc(100dvh-4.5rem)] md:max-h-[calc(100vh-6.5rem)] overflow-hidden shadow-2xl relative transition-all duration-200 overscroll-contain`}
          style={{
            boxShadow:
              "inset 4px 4px 0px rgba(255, 255, 255, 0.25), inset -4px -4px 0px rgba(0, 0, 0, 0.7), 0 16px 48px rgba(0, 0, 0, 0.8)",
            overscrollBehavior: "contain",
          }}
        >
          {/* Modal Header Bar */}
          <div className="flex justify-between items-center bg-[#212121] px-5 py-3.5 border-b-4 border-[#121610] text-white">
            <div className="flex items-center gap-2.5 font-mono text-xs md:text-sm text-[#ffd700] uppercase font-bold tracking-wider">
              <BookOpen className="w-4 h-4 text-[#8CE99A]" />
              <span>Achievement Showcase • {achievement.badgeText}</span>
            </div>

            <button
              ref={closeBtnRef}
              id="btn-close-achievement-modal"
              onClick={onClose}
              aria-label="Close achievement modal"
              className="voxel-button bg-red-600 hover:bg-red-500 text-white p-1.5 transition-all focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              style={{
                boxShadow:
                  "inset 2px 2px 0px rgba(255, 255, 255, 0.45), inset -2px -2px 0px rgba(0, 0, 0, 0.6)",
              }}
            >
              <X className="w-5 h-5 font-bold" />
            </button>
          </div>

          {/* Modal Body */}
          {hasSubCards ? (
            /* Multi-SubCard Showcase View (3 FlipCards, clean small headings, NO long text wall) */
            <div
              className="flex-grow min-h-0 overflow-y-auto bg-[#181d16] p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-6 overscroll-contain"
              style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
            >
              {/* Clean Top Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#22281e] p-4 border-4 border-[#121610] text-white">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider bg-[#3c8527] text-white border border-[#121610]">
                      CHAPTER & COMMUNITY
                    </span>
                    <span className="font-mono text-xs text-[#8CE99A] font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                      3 Leadership Positions
                    </span>
                  </div>
                  <h2
                    id="modal-achievement-title"
                    className="font-mono text-xl sm:text-2xl font-bold text-white"
                  >
                    {achievement.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 font-mono text-xs text-[#d6c5ad]">
                    <Building2 className="w-3.5 h-3.5 text-[#8CE99A]" />
                    <span>{achievement.organization}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-[#141712] px-3 py-2 border border-zinc-700 select-none">
                  <Hand className="w-4 h-4 text-[#ffd700]" />
                  <span>Click or drag any card to flip</span>
                </div>
              </div>

              {/* The 3 Sub-Cards Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch justify-items-center w-full my-auto">
                {achievement.subCards!.map((subCard, index) => {
                  const isThisFlipped = Boolean(subFlipped[subCard.id]);
                  return (
                    <div
                      key={subCard.id}
                      className="w-full max-w-[320px] flex flex-col justify-between items-center bg-[#24211e] border-4 border-[#121610] p-4 shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.6)]"
                    >
                      {/* Small Heading Mention Above Flip Card */}
                      <div className="w-full text-center pb-3 mb-3 border-b-2 border-[#121610]/50">
                        <span className="inline-block px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest bg-[#141210] text-[#a5f78d] border border-[#3c6a21] mb-1.5">
                          {subCard.badge} • ROLE {index + 1}
                        </span>
                        <h3 className="font-mono text-sm sm:text-base font-bold text-white leading-tight">
                          {subCard.title}
                        </h3>
                        <p className="font-mono text-[11px] text-[#ffd700] truncate mt-0.5">
                          {subCard.organization}
                        </p>
                      </div>

                      {/* 3D FlipCard with Aspect-Fitting (Zero Cropping!) */}
                      <div className="py-2 flex items-center justify-center">
                        <FlipCard
                          flipped={isThisFlipped}
                          onFlipChange={(flippedState) =>
                            setSubFlipped((prev) => ({
                              ...prev,
                              [subCard.id]: flippedState,
                            }))
                          }
                          width={260}
                          height={360}
                          radius={10}
                          perspective={1000}
                          hoverScale={1.02}
                          front={
                            <div className="w-full h-full relative flex flex-col justify-between bg-[#0e110d] overflow-hidden">
                              {/* Ambient Blurred Background to fill letterboxing seamlessly */}
                              <img
                                src={subCard.images.front}
                                alt=""
                                aria-hidden="true"
                                className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-30 scale-110 pointer-events-none select-none"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none z-10" />

                              {/* Top Role Pill & Zoom / Rotate Buttons */}
                              <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-auto">
                                <span className="px-2 py-0.5 font-mono text-[9px] font-bold uppercase bg-black/85 border border-[#8CE99A] text-[#8CE99A]">
                                  {subCard.role}
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCardRotation(`${subCard.id}-front`);
                                    }}
                                    className="p-1 bg-black/80 hover:bg-black text-[#8CE99A] border border-[#8CE99A]/60 transition-colors cursor-pointer"
                                    title="Rotate Image 90°"
                                    aria-label="Rotate image"
                                  >
                                    <RotateCw className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLightboxImage({
                                        src: subCard.images.front,
                                        caption: `${subCard.title} - Front View`,
                                      });
                                      setLightboxRotation(cardRotations[`${subCard.id}-front`] || 0);
                                    }}
                                    className="p-1 bg-black/80 hover:bg-black text-[#8CE99A] border border-[#8CE99A]/60 transition-colors cursor-pointer"
                                    title="View Full Resolution"
                                    aria-label="Zoom image"
                                  >
                                    <Maximize2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Centered Fully Visible Image (100% Uncropped!) */}
                              <div className="relative z-10 w-full h-full flex items-center justify-center p-2 pt-8 pb-12 overflow-hidden">
                                <img
                                  src={subCard.images.front}
                                  alt={`${subCard.title} Front View`}
                                  style={{
                                    transform: `rotate(${cardRotations[`${subCard.id}-front`] || 0}deg)`,
                                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                  }}
                                  className="max-h-full max-w-full object-contain drop-shadow-md rounded-sm"
                                />
                              </div>

                              {/* Bottom Caption Pill */}
                              <div className="absolute bottom-2 left-2 right-2 z-20 p-1.5 bg-black/85 border border-zinc-700 backdrop-blur-sm">
                                <p className="font-mono text-[10px] font-bold text-white text-center truncate">
                                  {subCard.images.frontCaption || subCard.title}
                                </p>
                                <p className="text-[9px] font-mono text-[#8CE99A] text-center mt-0.5">
                                  Click / drag to inspect back ↷
                                </p>
                              </div>
                            </div>
                          }
                          back={
                            <div className="w-full h-full relative flex flex-col justify-between bg-[#0e110d] overflow-hidden">
                              {/* Ambient Blurred Background to fill letterboxing seamlessly */}
                              <img
                                src={subCard.images.back}
                                alt=""
                                aria-hidden="true"
                                className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-30 scale-110 pointer-events-none select-none"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none z-10" />

                              {/* Top Gallery Pill & Zoom / Rotate Buttons */}
                              <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-auto">
                                <span className="px-2 py-0.5 font-mono text-[9px] font-bold uppercase bg-black/85 border border-[#ffd700] text-[#ffd700]">
                                  Gallery & Archives
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCardRotation(`${subCard.id}-back`);
                                    }}
                                    className="p-1 bg-black/80 hover:bg-black text-[#ffd700] border border-[#ffd700]/60 transition-colors cursor-pointer"
                                    title="Rotate Image 90°"
                                    aria-label="Rotate image"
                                  >
                                    <RotateCw className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLightboxImage({
                                        src: subCard.images.back,
                                        caption: `${subCard.title} - Back View`,
                                      });
                                      setLightboxRotation(cardRotations[`${subCard.id}-back`] || 0);
                                    }}
                                    className="p-1 bg-black/80 hover:bg-black text-[#ffd700] border border-[#ffd700]/60 transition-colors cursor-pointer"
                                    title="View Full Resolution"
                                    aria-label="Zoom image"
                                  >
                                    <Maximize2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Centered Fully Visible Image (100% Uncropped!) */}
                              <div className="relative z-10 w-full h-full flex items-center justify-center p-2 pt-8 pb-12 overflow-hidden">
                                <img
                                  src={subCard.images.back}
                                  alt={`${subCard.title} Back View`}
                                  style={{
                                    transform: `rotate(${cardRotations[`${subCard.id}-back`] || 0}deg)`,
                                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                  }}
                                  className="max-h-full max-w-full object-contain drop-shadow-md rounded-sm"
                                />
                              </div>

                              {/* Bottom Caption Pill */}
                              <div className="absolute bottom-2 left-2 right-2 z-20 p-1.5 bg-black/85 border border-zinc-700 backdrop-blur-sm">
                                <p className="font-mono text-[10px] font-bold text-white text-center truncate">
                                  {subCard.images.backCaption || "Supporting Details"}
                                </p>
                                <p className="text-[9px] font-mono text-[#ffd700] text-center mt-0.5">
                                  Click / drag to return to front ↶
                                </p>
                              </div>
                            </div>
                          }
                        />
                      </div>

                      {/* Individual Flip Button */}
                      <button
                        type="button"
                        onClick={() =>
                          setSubFlipped((prev) => ({
                            ...prev,
                            [subCard.id]: !prev[subCard.id],
                          }))
                        }
                        className="mt-3 w-full py-1.5 px-3 bg-[#1e241b] hover:bg-[#2c3628] border-2 border-[#8CE99A] text-[#8CE99A] text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer active:translate-y-0.5"
                        style={{
                          boxShadow:
                            "inset 1px 1px 0px rgba(255, 255, 255, 0.2), inset -1px -1px 0px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>{isThisFlipped ? "Flip to Front" : "Flip to Back"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Optional Footer Verification Link */}
              {achievement.verificationUrl && (
                <div className="pt-3 border-t-2 border-[#121610]/40 flex justify-center">
                  <a
                    href={achievement.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-5 font-mono text-xs uppercase font-bold text-white bg-[#3c8527] hover:bg-[#4c9e33] border-2 border-[#121610] flex items-center justify-center gap-2 transition-all cursor-pointer"
                    style={{
                      boxShadow:
                        "inset 2px 2px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 0px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <span>Verify Chapter Credentials</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Standard 2-Column Split View for regular single-item achievements */
            <div
              className="flex-grow min-h-0 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 bg-[#dbd1b4] p-4 sm:p-6 md:p-8 gap-5 md:gap-6 text-[#181d16] font-sans pb-10"
              style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
            >
              {/* Left Column: Achievement Narrative & Milestones (6 cols) */}
              <div
                className="lg:col-span-6 flex flex-col justify-between space-y-5 bg-[#ede4cb] p-4 sm:p-5 border-4 border-[#121610] shadow-inner"
              >
                <div className="space-y-4">
                  {/* Category & Date Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#121610]/20 pb-3">
                    <span
                      className={`px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border-2 ${achievement.badgeTheme.border} ${achievement.badgeTheme.bg} ${achievement.badgeTheme.text}`}
                    >
                      <Sparkles className="w-3 h-3 inline mr-1 -mt-0.5" />
                      {achievement.badgeText}
                    </span>

                    <span className="font-mono text-xs text-[#53381a] font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#53381a]" />
                      {achievement.date}
                    </span>
                  </div>

                  {/* Mobile Quick Jump to 3D Card */}
                  <div className="lg:hidden flex items-center justify-between bg-[#dfd4b7] p-2 border-2 border-[#121610]/30 -mt-1">
                    <span className="font-mono text-[11px] text-[#2d322a] font-bold">
                      Interactive 3D Card
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("modal-flip-card-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-2.5 py-1 bg-[#3c8527] hover:bg-[#4c9e33] text-white font-mono text-[11px] font-bold border border-[#121610] flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-transform"
                    >
                      <span>View Card Below</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Organization */}
                  <div>
                    <h2
                      id="modal-achievement-title"
                      className="font-mono text-xl md:text-2xl font-bold text-[#181d16] leading-tight"
                    >
                      {achievement.title}
                    </h2>

                    <div className="flex items-center gap-1.5 mt-2 font-mono text-xs font-bold text-[#3c8527] uppercase">
                      <Building2 className="w-4 h-4 text-[#3c8527] flex-shrink-0" />
                      <span>{achievement.organization}</span>
                    </div>

                    {achievement.role && (
                      <p className="font-mono text-xs text-[#70552b] font-semibold mt-1">
                        Role: {achievement.role}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-xs uppercase font-bold text-[#181d16] tracking-wider border-b border-[#121610]/15 pb-1">
                      Quest Overview
                    </h4>
                    <p className="text-xs md:text-sm text-[#2d322a] leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Key Contribution */}
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-xs uppercase font-bold text-[#181d16] tracking-wider border-b border-[#121610]/15 pb-1">
                      Key Accomplishments & Impact
                    </h4>
                    <p className="text-xs md:text-sm text-[#2d322a] leading-relaxed">
                      {achievement.contribution}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-1.5">
                    <h4 className="font-mono text-xs uppercase font-bold text-[#181d16] tracking-wider">
                      Associated Skills & Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {achievement.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#dbd1b4] border-2 border-[#121610] text-[#121610]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External Verification Link if applicable */}
                {achievement.verificationUrl && (
                  <div className="pt-4 border-t-2 border-[#121610]/20">
                    <a
                      href={achievement.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 font-mono text-xs uppercase font-bold text-white bg-[#3c8527] hover:bg-[#4c9e33] border-2 border-[#121610] flex items-center justify-center gap-2 transition-all cursor-pointer"
                      style={{
                        boxShadow:
                          "inset 2px 2px 0px rgba(255, 255, 255, 0.3), inset -2px -2px 0px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <span>Verify Institution / Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column: 3D FlipCard Interactive Showcase (6 cols) */}
              <div
                id="modal-flip-card-section"
                className="lg:col-span-6 flex flex-col items-center justify-between bg-[#111318] border-4 border-[#121610] text-white p-3.5 sm:p-5 overflow-hidden relative"
              >
                {/* Top Hints & Side Indicator */}
                <div className="w-full flex items-center justify-between pb-3 border-b-2 border-zinc-800 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#8CE99A] font-bold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>
                      {isFlipped
                        ? "Side 2: Overview & Details"
                        : "Side 1: Primary Showcase"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                    <Hand className="w-3 h-3 text-[#ffd700]" />
                    <span className="hidden sm:inline">Drag or click to flip</span>
                  </div>
                </div>

                {/* 3D FlipCard with Aspect-Fitting (Zero Cropping!) */}
                <div className="py-3 sm:py-6 flex items-center justify-center w-full">
                  <FlipCard
                    flipped={isFlipped}
                    onFlipChange={setIsFlipped}
                    width={cardWidth}
                    height={cardHeight}
                    radius={12}
                    perspective={1000}
                    hoverScale={1.02}
                    front={
                      <div className="w-full h-full relative flex flex-col justify-between bg-[#0e110d] overflow-hidden">
                        {/* Ambient Blurred Background to fill letterboxing seamlessly */}
                        <img
                          src={achievement.images.front}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-30 scale-110 pointer-events-none select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none z-10" />

                        {/* Top Side Pill & Zoom / Rotate Buttons */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-auto">
                          <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase bg-black/80 border border-[#8CE99A] text-[#8CE99A]">
                            Primary • Front
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCardRotation(`${achievement.id}-front`);
                              }}
                              className="p-1 bg-black/80 hover:bg-black text-[#8CE99A] border border-[#8CE99A]/60 transition-colors cursor-pointer"
                              title="Rotate Image 90°"
                              aria-label="Rotate image"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxImage({
                                  src: achievement.images.front,
                                  caption: `${achievement.title} - Front View`,
                                });
                                setLightboxRotation(cardRotations[`${achievement.id}-front`] || 0);
                              }}
                              className="p-1 bg-black/80 hover:bg-black text-[#8CE99A] border border-[#8CE99A]/60 transition-colors cursor-pointer"
                              title="View Full Resolution"
                              aria-label="Zoom image"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Centered Fully Visible Image (100% Uncropped!) */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5 pt-9 pb-14 overflow-hidden">
                          <img
                            src={achievement.images.front}
                            alt={`${achievement.title} Front View`}
                            style={{
                              transform: `rotate(${cardRotations[`${achievement.id}-front`] || 0}deg)`,
                              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            className="max-h-full max-w-full object-contain drop-shadow-md rounded-sm"
                          />
                        </div>

                        {/* Bottom Caption Pill */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 p-2 bg-black/85 border border-zinc-700 backdrop-blur-sm">
                          <p className="font-mono text-xs font-bold text-white text-center truncate">
                            {achievement.images.frontCaption || achievement.title}
                          </p>
                          <p className="text-[10px] font-mono text-[#8CE99A] text-center mt-0.5">
                            Click / drag to inspect back ↷
                          </p>
                        </div>
                      </div>
                    }
                    back={
                      <div className="w-full h-full relative flex flex-col justify-between bg-[#0e110d] overflow-hidden">
                        {/* Ambient Blurred Background to fill letterboxing seamlessly */}
                        <img
                          src={achievement.images.back}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-30 scale-110 pointer-events-none select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none z-10" />

                        {/* Top Side Pill & Zoom / Rotate Buttons */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-auto">
                          <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase bg-black/80 border border-[#ffd700] text-[#ffd700]">
                            Gallery • Back
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCardRotation(`${achievement.id}-back`);
                              }}
                              className="p-1 bg-black/80 hover:bg-black text-[#ffd700] border border-[#ffd700]/60 transition-colors cursor-pointer"
                              title="Rotate Image 90°"
                              aria-label="Rotate image"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxImage({
                                  src: achievement.images.back,
                                  caption: `${achievement.title} - Back View`,
                                });
                                setLightboxRotation(cardRotations[`${achievement.id}-back`] || 0);
                              }}
                              className="p-1 bg-black/80 hover:bg-black text-[#ffd700] border border-[#ffd700]/60 transition-colors cursor-pointer"
                              title="View Full Resolution"
                              aria-label="Zoom image"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Centered Fully Visible Image (100% Uncropped!) */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5 pt-9 pb-14 overflow-hidden">
                          <img
                            src={achievement.images.back}
                            alt={`${achievement.title} Back View`}
                            style={{
                              transform: `rotate(${cardRotations[`${achievement.id}-back`] || 0}deg)`,
                              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            className="max-h-full max-w-full object-contain drop-shadow-md rounded-sm"
                          />
                        </div>

                        {/* Bottom Caption Pill */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 p-2 bg-black/85 border border-zinc-700 backdrop-blur-sm">
                          <p className="font-mono text-xs font-bold text-white text-center truncate">
                            {achievement.images.backCaption ||
                              "Supporting Details & Context"}
                          </p>
                          <p className="text-[10px] font-mono text-[#ffd700] text-center mt-0.5">
                            Click / drag to return to front ↶
                          </p>
                        </div>
                      </div>
                    }
                  />
                </div>

                {/* Bottom Controls Bar */}
                <div className="w-full pt-3 border-t-2 border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-zinc-400">
                    {isFlipped ? "Viewing Side B" : "Viewing Side A"}
                  </span>

                  <button
                    type="button"
                    onClick={toggleFlip}
                    className="px-3 py-1.5 bg-[#252c22] hover:bg-[#343e30] border-2 border-[#8CE99A] text-[#8CE99A] text-xs font-bold uppercase flex items-center gap-1.5 transition-colors active:translate-y-0.5 cursor-pointer"
                    style={{
                      boxShadow:
                        "inset 1px 1px 0px rgba(255, 255, 255, 0.2), inset -1px -1px 0px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isFlipped ? "Flip to Front" : "Flip to Back"}</span>
                  </button>
                </div>

                {/* Mobile Jump Back to Overview */}
                <div className="lg:hidden w-full flex items-center justify-center pt-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("modal-achievement-title")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3 py-1 bg-[#1e231b] hover:bg-[#283024] text-[#8CE99A] font-mono text-[11px] font-bold border border-zinc-700 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
                  >
                    <span>↑ Back to Quest Overview</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default AchievementModal;
