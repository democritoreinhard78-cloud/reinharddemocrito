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
      title: "Brand Launch Film",
      category: "Directing",
      year: "2025",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description: "End-to-end creative direction, storyboarding, on-set blocking, and final narrative cut for a flagship brand launch film."
    },
    {
      id: 2,
      title: "Kinetic Type & 2D Explainer Reel",
      category: "Motion Graphics & 2D Animation",
      year: "2025",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      description: "Beat-synced kinetic typography, custom 2D vector illustration, and modular Swiss grid motion graphics crafted in After Effects."
    },
    {
      id: 3,
      title: "Editorial & Creator Highlight Reel",
      category: "Short Video Contents",
      year: "2025",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      description: "High-retention vertical edit combining punchy hooks, dynamic speed ramps, custom captions, and crisp sound design."
    },
    {
      id: 4,
      title: "Identity System & Editorial Posters",
      category: "Graphics",
      year: "2025",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      description: "Cohesive visual identity system, social media graphics, and presentation layouts featuring custom typography rules and grid-based key visuals."
    },
    {
      id: 5,
      title: "NarCraft & Broadcast Title Openers",
      category: "Intro Videos",
      year: "2025",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      description: "Custom signature logo reveals, channel intro sequences, and dark-room sonic stingers establishing immediate brand recognition."
    }
  ]
};
