import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personalInfo: {
    firstName: "REINHARD",
    lastName: "DEMOCRITO",
    title: "Graphic Designer",
    subtitle: "Art Director & Visual Strategist",
    email: "reinhard.democrito@uptowork.com",
    phone: "774-555-3021",
    location: {
      city: "Digos City",
      address: "12529 State Road 535"
    },
    bio: [
      "Graphic Designer with over 10 years of experience specializing in IT Department management for international logistics companies.",
      "I can implement effective IT Strategies at local and global levels. My greatest strength is business awareness, which enables me to permanently streamline infrastructure and applications."
    ]
  },

  socialLinks: [
    { name: "Behance", icon: "behance", url: "https://behance.net" },
    { name: "Facebook", icon: "facebook", url: "https://facebook.com" },
    { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com" },
    { name: "Instagram", icon: "instagram", url: "https://instagram.com" },
    { name: "Pinterest", icon: "pinterest", url: "https://pinterest.com" },
    { name: "Twitter", icon: "twitter", url: "https://twitter.com" },
    { name: "WhatsApp", icon: "whatsapp", url: "https://whatsapp.com" }
  ],

  softwareSkills: [
    { name: "Photoshop", code: "Ps", level: 95, color: "#31A8FF" },
    { name: "Illustrator", code: "Ai", level: 90, color: "#FF9A00" },
    { name: "InDesign", code: "Id", level: 85, color: "#FF3366" },
    { name: "Premiere", code: "Pr", level: 80, color: "#9999FF" },
    { name: "After Effect", code: "Ae", level: 88, color: "#9999FF" },
    { name: "Figma", code: "Fg", level: 92, color: "#0ACF83" }
  ],

  languages: [
    { name: "English", level: 95 },
    { name: "Arabic", level: 80 },
    { name: "Turkish", level: 65 }
  ],

  personalSkills: "Creativity - Team Work - organisation",

  experience: [
    {
      period: "2017 to present",
      company: "WHITE FISH ADVERTISING CO.",
      role: "Art Director",
      description: "Leading creative brand identity, art direction, and high-impact digital campaigns."
    },
    {
      period: "2012 to 2017",
      company: "PYRAMIDS SUN ADVERTISING CO.",
      role: "Senior Graphic Designer",
      description: "Spearheaded brand revamps, packaging design, and omnichannel visual systems."
    },
    {
      period: "2007 to 2012",
      company: "PLANET STATIONARY & PRITING SERVICES CO.",
      role: "Graphic Designer",
      description: "Executed high-precision prepress, editorial layouts, and corporate publications."
    },
    {
      period: "2004 to 2007",
      company: "PLAY GRAPHIC ADVERTISING AGENCY",
      role: "Graphic Designer",
      description: "Designed creative advertising collateral, outdoor billboards, and retail signage."
    },
    {
      period: "2002 to 2004",
      company: "MARCO FLORIDA INTERNET & COMPUTERS SERVICES CO.",
      role: "Graphic Designer",
      description: "Created early web interfaces, UI graphics, and interactive multimedia assets."
    }
  ],

  education: {
    degree: "BS/MS in Computer Science",
    school: "University of Maryland",
    details: "Focus on Human-Computer Interaction & Digital Media Arts"
  },

  whatCanIDo: [
    "Logo - Stationery - Branding",
    "Newsletter - Packaging - Catalog",
    "Strategy - Advertisment",
    "Digital UI/UX - Web Experiences"
  ],

  designSkills: [
    "Creativity - Planing & Strategy",
    "Signs & Typography - Layout",
    "Grid - Color sense - Inspiration",
    "Interactive Design - Art Direction"
  ],

  hobbies: [
    { name: "Reading", icon: "book" },
    { name: "Photography", icon: "camera" },
    { name: "Drawing", icon: "palette" },
    { name: "Travel", icon: "plane" }
  ],

  projects: [
    {
      id: 1,
      title: "Lumina Brand Identity & Packaging",
      category: "Branding",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive visual identity, packaging design, and editorial style guide for a luxury lifestyle apothecary."
    },
    {
      id: 2,
      title: "Aura Minimalist Watch Series",
      category: "Product Design",
      year: "2023",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      description: "Industrial design collaboration, tactile packaging, and high-contrast digital marketing campaigns."
    },
    {
      id: 3,
      title: "Nordic Architectural Magazine",
      category: "Editorial",
      year: "2023",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      description: "Curated 140-page biannual print editorial celebrating Scandinavian brutalism and sustainable interior spaces."
    },
    {
      id: 4,
      title: "Verve Next-Gen FinTech UI/UX",
      category: "UI/UX Design",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      description: "Dark-mode dashboard architecture, micro-interactions, and design tokens for algorithmic portfolio tracking."
    },
    {
      id: 5,
      title: "Vortex Spatial Audio Visualizer",
      category: "Motion & 3D",
      year: "2022",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      description: "Real-time generative sound reactive visuals and promotional 3D title sequences for international music festival."
    },
    {
      id: 6,
      title: "Komorebi Botanical Essence",
      category: "Packaging",
      year: "2023",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      description: "Sustainable glass bottle typography, embossed unboxing experience, and bespoke logo mark."
    }
  ]
};
