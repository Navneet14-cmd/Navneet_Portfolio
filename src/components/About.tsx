import React from "react";
import ProfileCard from "./ProfileCard";
import PaperCrumple from "./PaperCrumple";

interface AboutProps {
  onOpenHireModal?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenHireModal }) => {
  return (
    <section
      id="about"
      className="py-16 md:py-24 relative overflow-hidden px-6 md:px-12"
    >
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 items-center justify-center">
        {/* 3D Crumpling Interactive Minecraft Parchment Note */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="w-full max-w-[460px] flex justify-center items-center">
            <PaperCrumple
              src="/assets/about_page_front.png"
              backSrc="/assets/about_page_back.png"
              alt="Minecraft About Me Note"
              width={320}
              height={430}
              sceneHeight={530}
              paperColor="#dfd5b8"
              crumpleAmount={0.85}
              crumpleDuration={0.55}
              releaseDuration={0.45}
              foldCount={6}
              foldSharpness={0.65}
              wrinkleDepth={0.7}
              creaseStrength={0.2}
              draggable={true}
              returnToOrigin={true}
              shadow={true}
              shadowOpacity={0.2}
            />
          </div>
        </div>

        {/* 3D Holographic Minecraft Player Profile Card */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <ProfileCard
            avatarUrl="/assets/MEEE.jpeg"
            name="Navneet Pant"
            title="Software & Cloud Developer"
            handle="navanshh"
            contactText="Contact"
            onContactClick={onOpenHireModal}
            theme="dark"
            radius={12}
            holo={0.82}
            glare={0.55}
            enableTilt={true}
            tiltStrength={14}
            parallax={10}
          />
        </div>
      </div>
    </section>
  );
};
