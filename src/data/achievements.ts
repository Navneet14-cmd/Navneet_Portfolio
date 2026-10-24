export type AchievementCategory =
  | "Research & Internships"
  | "Leadership & Appointments"
  | "Certifications & Awards"
  | "Open Source & Community";

export interface AchievementCardImages {
  front: string;
  back: string;
  frontCaption?: string;
  backCaption?: string;
}

export interface SubCard {
  id: string;
  title: string;
  organization: string;
  role: string;
  badge: string;
  images: AchievementCardImages;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  category: AchievementCategory;
  date: string;
  role: string;
  description: string;
  contribution: string;
  technologies: string[];
  coverImage: string;
  images: AchievementCardImages;
  badgeText: string;
  badgeTheme: {
    bg: string;
    text: string;
    border: string;
  };
  verificationUrl?: string;
  subCards?: SubCard[];
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "isro-methane-detection",
    title: "Methane Plume Detection via Geospatial AI",
    organization: "Indian Institute of Remote Sensing (IIRS), ISRO",
    category: "Research & Internships",
    date: "June 2025 - July 2025",
    role: "Research Intern",
    badgeText: "RESEARCH",
    badgeTheme: {
      bg: "bg-emerald-950/80",
      text: "text-emerald-400",
      border: "border-emerald-600"
    },
    description: "Completed intensive research at IIRS, ISRO on analyzing satellite remote sensing data to identify and map atmospheric methane plume emissions.",
    contribution: "Calibrated hyperspectral/multispectral spectral bands, implemented deep learning segmentation architectures (U-Net), and automated point-source emission tracking over environmental hotspots.",
    technologies: ["Python", "PyTorch", "Remote Sensing", "Satellite Imagery", "Geospatial GIS", "U-Net"],
    coverImage: "/assets/ISRO_Coverpage.png",
    images: {
      front: "/assets/ISRO_FRONT.jpeg",
      back: "/assets/ISRO_BACK.jpg",
      frontCaption: "ISRO Geospatial Observation & Plume Mapping",
      backCaption: "Spectral Band Diagnostics & Research Credentials"
    },
    verificationUrl: "https://www.iirs.gov.in"
  },
  {
    id: "dsa-problem-solving-journey",
    title: "Data Structures & 100-Day DSA Streak",
    organization: "LeetCode & Problem Solving",
    category: "Certifications & Awards",
    date: "2024 - Present",
    role: "Problem Solver",
    badgeText: "DSA QUEST",
    badgeTheme: {
      bg: "bg-amber-950/80",
      text: "text-amber-400",
      border: "border-amber-600"
    },
    description: "Consistent daily problem solving in data structures and algorithms. Solved 250+ problems with an active 100+ day streak across arrays, trees, graphs, and dynamic programming in Java.",
    contribution: "Built strong algorithmic foundations by consistently solving daily challenges, analyzing time/space complexity trade-offs, and tackling complex topics including dynamic programming, graph traversals, binary search, and sliding window patterns.",
    technologies: ["Data Structures", "Algorithms", "Java", "Python", "LeetCode", "Dynamic Programming"],
    coverImage: "/assets/LeetCode_Coverpage.png",
    images: {
      front: "/assets/Dsa_Front_Page.png",
      back: "/assets/DSA_BACK_PAGE_PORTRAIT.png",
      frontCaption: "LeetCode 100 Days Badge Milestone",
      backCaption: "257+ Solved Challenges & Active Submission Streak"
    },
    verificationUrl: "https://leetcode.com/u/Navansh14/"
  },
  {
    id: "chapter-community-leadership",
    title: "Chapter & Community Leadership",
    organization: "UPES Student Chapters • CSI, IEEE CS & IEEE CIS",
    category: "Leadership & Appointments",
    date: "2023 - Present",
    role: "Operations Head, Webmaster & Media Lead",
    badgeText: "CHAPTER LEADERSHIP",
    badgeTheme: {
      bg: "bg-amber-950/80",
      text: "text-amber-400",
      border: "border-amber-600"
    },
    description: "Active core leader across premier technical student chapters at UPES. Managed cross-functional student bodies, spearheading event operations, building chapter web platforms, and directing digital outreach across CSI, IEEE Computer Society, and IEEE CIS.",
    contribution: "Coordinated logistics and volunteers for 500+ participant symposiums, built and maintained digital web assets for chapter initiatives, and drove engagement campaigns connecting student developers with tech workshops and hackathons.",
    technologies: ["Chapter Leadership", "Operations", "Webmaster", "Event Logistics", "Community Outreach", "Public Speaking"],
    coverImage: "/assets/UPES_CommunityCoerpage.jpg",
    images: {
      front: "/assets/UPES_CSI_FRONT.jpg",
      back: "/assets/UPES_CSI_BACK.JPG",
      frontCaption: "Student Chapter Leadership & Operations",
      backCaption: "Chapter Operations & Event Archives"
    },
    verificationUrl: "https://www.linkedin.com/company/upes-csi/",
    subCards: [
      {
        id: "upes-csi-operations",
        title: "UPES CSI Internal Operations Head",
        organization: "Computer Society of India (CSI), UPES",
        role: "Internal Operations Head",
        badge: "OPERATIONS",
        images: {
          front: "/assets/UPES_CSI_FRONT.jpg",
          back: "/assets/UPES_CSI_BACK.JPG",
          frontCaption: "UPES-CSI Internal Operations Head",
          backCaption: "Event Management, Logistics & Team Archives"
        }
      },
      {
        id: "upes-ieee-cs-webmaster",
        title: "UPES IEEE CS Webmaster",
        organization: "IEEE Computer Society, UPES Student Branch",
        role: "Webmaster & Technical Lead",
        badge: "WEBMASTER",
        images: {
          front: "/assets/IEEE_CS_FRONT.jpg",
          back: "/assets/IEEE_CS_BACK_PORTRAIT.jpg",
          frontCaption: "UPES IEEE CS Webmaster",
          backCaption: "Web Portals, Infrastructure & Digital Platforms"
        }
      },
      {
        id: "upes-ieee-cis-social-media",
        title: "UPES IEEE CIS Social Media",
        organization: "IEEE Computational Intelligence Society, UPES",
        role: "Social Media & Outreach Lead",
        badge: "SOCIAL MEDIA",
        images: {
          front: "/assets/UPES_IEEE_CIS_FRONT.jpg",
          back: "/assets/IEEE_CIS_BACK.png",
          frontCaption: "UPES IEEE CIS Social Media Lead",
          backCaption: "Digital Campaigns, Design Outreach & Engagement"
        }
      }
    ]
  },
  {
    id: "social-impact-internship",
    title: "Srijan Social Internship • Special Needs & Child Welfare",
    organization: "JSR Residential School for Special Needs Children (USR Indu Samiti)",
    category: "Research & Internships",
    date: "June 2025 - July 2025",
    role: "Social Development Intern",
    badgeText: "SOCIAL INTERNSHIP",
    badgeTheme: {
      bg: "bg-emerald-950/80",
      text: "text-emerald-400",
      border: "border-emerald-600"
    },
    description: "Completed the university-conducted Srijan Social Internship at the end of my first year at JSR Residential School for Special Needs Children (managed by USR Indu Samiti) in Ramnagar. The NGO and residential school provides a nurturing home, specialized care, and a new family for specially-abled students and abandoned children.",
    contribution: "Worked alongside a student team to support children in their day-to-day activities, conduct elementary teaching sessions, and socialize through creative games and conversations. Organized fun recreational sports events, tree-planting, and interactive workshops to foster confidence, inclusion, and developmental exposure.",
    technologies: ["Community Welfare", "Special Education Support", "Youth Mentorship", "Sports & Arts Facilitation", "Empathetic Engagement", "Team Collaboration"],
    coverImage: "/assets/Social_Internship CoverPage.png",
    images: {
      front: "/assets/Social_Internship_Front_PORTRAIT.jpg",
      back: "/assets/Social_Internship_back.jpg",
      frontCaption: "USR Indu Samiti Certificate of Appreciation",
      backCaption: "JSR Special Needs School Fieldwork & Student Activities"
    },
    verificationUrl: "http://www.usrindusociety.org"
  },
  {
    id: "open-source-contributions",
    title: "Open-Source Tooling & Community Contributions",
    organization: "GitHub & Global Developer Community",
    category: "Open Source & Community",
    date: "2024 - Present",
    role: "Open Source Contributor",
    badgeText: "OPEN SOURCE",
    badgeTheme: {
      bg: "bg-rose-950/80",
      text: "text-rose-400",
      border: "border-rose-600"
    },
    description: "Active contributor to open-source developer tools, documentation libraries, and student collaborative coding initiatives.",
    contribution: "Authored pull requests, optimized frontend components, improved developer workflow documentation, and assisted peers in competitive programming and cloud computing best practices.",
    technologies: ["Git", "GitHub", "TypeScript", "React", "Linux", "CI/CD Workflows"],
    coverImage: "/assets/Open_source_coverpage.png",
    images: {
      front: "/assets/OPEN_SOURCE_FRONT_ROTATED.jpg",
      back: "/assets/Open-Source_Back.jpg",
      frontCaption: "Open-Source Repositories & Tooling",
      backCaption: "GitHub Contributions & Developer Community"
    },
    verificationUrl: "https://github.com/Navneet14-cmd"
  }
];
