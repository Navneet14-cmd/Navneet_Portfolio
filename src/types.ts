export interface Project {
  id: string;
  title: string;
  category?: string;
  description: string;
  thumbnail: string;
  tags: string[];
  playMessage: string;
  gameType: "pipeline" | "plume" | "archives";
  codeLabel?: string;
  githubUrl?: string;
}

export interface SkillItem {
  name: string;
  iconName: string; // Lucide or Material icon
  category: "Languages" | "Frameworks" | "Backend" | "DevOps";
  percentage: number;
}

export interface TimelineEvent {
  level: string;
  depth: string;
  role: string;
  company: string;
  description: string;
  duration: string;
  iconType: "diamond" | "iron" | "bedrock";
  color: string;
}

export interface Achievement {
  title: string;
  advancement: string;
  description: string;
  iconName: string;
  bgClass: string;
  accentColor: string;
}
