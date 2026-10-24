import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personalInfo: {
    firstName: "REINHARD",
    lastName: "DEMOCRITO",
    title: "Director, Video Editor & Visual Designer",
    subtitle: "Director, Video Editor & Visual Designer",
    tagline: "I direct, edit & design stories that connect.",
    intro: "Every project is a partnership - I make sure I understand your story before diving in.",
    email: "democritoreinhard78@gmail.com",
    phone: "+63 917 145 6375",
    location: {
      city: "Digos City",
      address: "Davao del Sur, Philippines"
    },
    bio: [
      "Hi, I'm Reinhard Democrito. For me, good creative work simply comes down to curiosity and honest effort. As someone who directs, edits, and designs, I don't just take a brief and disappear—I like treating every project as a partnership, making sure I really understand your story and what you want to achieve before diving in.",
      "I try to keep things simple: stay grounded, communicate clearly, and be someone people genuinely enjoy working with. I'm constantly eager to learn new tools, try different creative approaches, and pick up fresh experiences with every project. Whatever we're building together, I put real care into making sure the final piece feels right and actually connects with people."
    ]
  },

  socialLinks: [
    { name: "Facebook", icon: "facebook", url: "https://facebook.com/ReinHard17" },
    { name: "Gmail", icon: "gmail", url: "mailto:democritoreinhard78@gmail.com" },
    { name: "Instagram", icon: "instagram", url: "https://instagram.com/nardongfotek/" },
    { name: "WhatsApp", icon: "whatsapp", url: "https://wa.me/639171456375" }
  ],

  // NOTE: proficiency levels are estimates - adjust to your real skill level.
  softwareSkills: [
    { name: "Photoshop", code: "Ps", level: 85, color: "#31A8FF" },
    { name: "Premiere", code: "Pr", level: 90, color: "#9999FF" },
    { name: "After Effects", code: "Ae", level: 75, color: "#CF96FD" },
    { name: "CapCut", code: "Cc", level: 90, color: "#E2E8F0" },
    { name: "Canva", code: "Cv", level: 85, color: "#00C4CC" },
    { name: "PowerPoint", code: "Pp", level: 85, color: "#FF7A4D" }
  ],

  // NOTE: levels are estimates - adjust as needed.
  languages: [
    { name: "Filipino", level: 100 },
    { name: "English", level: 85 }
  ],

  personalSkills: "Curiosity - Communication - Collaboration",

  // Add real work history here; the Experience block is hidden while this is empty.
  experience: [],

  education: {
    degree: "Computer Science",
    school: "Cor Jesu College, Digos",
    details: "Digos City, Davao del Sur"
  },

  whatCanIDo: [
    "Direction - Storytelling - Concept",
    "Video Editing - Motion Graphics",
    "Visual Design - Social Media Graphics",
    "Presentations - Canva & PowerPoint"
  ],

  designSkills: [
    "Storytelling - Pacing & Rhythm",
    "Video Editing - Color & Sound",
    "Layout - Typography",
    "Client Collaboration - Communication"
  ],

  hobbies: [
    { name: "Drawing", icon: "palette" },
    { name: "Writing", icon: "pen" },
    { name: "Editing", icon: "film" },
    { name: "Speaking", icon: "mic" }
  ],
  // Editable: describe your own workflow here.
  process: [
    { title: "Discover", description: "Understanding your story, goals and audience." },
    { title: "Define", description: "Shaping the concept, tone and creative direction." },
    { title: "Create", description: "Shooting, designing and building the first cut." },
    { title: "Refine", description: "Editing, polishing and fine-tuning together with you." },
    { title: "Deliver", description: "Final files, ready to connect with people." }
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
