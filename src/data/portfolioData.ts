import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personalInfo: {
    firstName: "REINHARD",
    lastName: "DEMOCRITO",
    title: "Video Editor & Graphic Designer",
    subtitle: "Video Editor & Graphic Designer",
    tagline: "I edit & design stories that connect.",
    intro: "Every project is a partnership - I make sure I understand your story before diving in.",
    email: "democritoreinhard78@gmail.com",
    phone: "+63 917 145 6375",
    location: {
      city: "Digos City",
      address: "Davao del Sur, Philippines"
    },
    bio: [
      "Hi, I'm Reinhard Democrito. For me, good creative work simply comes down to curiosity and honest effort. As someone who specializes in video editing and graphic design, I don't just take a brief and disappear—I like treating every project as a partnership, making sure I really understand your story and what you want to achieve before diving in.",
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
    "Video Editing - Post-Production - Storytelling",
    "Video Editing - Motion Graphics",
    "Graphic Design - Social Media Graphics",
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
    { title: "Define", description: "Shaping the narrative pacing, structure and editorial flow." },
    { title: "Create", description: "Shooting, designing and building the first cut." },
    { title: "Refine", description: "Editing, polishing and fine-tuning together with you." },
    { title: "Deliver", description: "Final files, ready to connect with people." }
  ],
  projects: [
    {
      id: 1,
      title: "Video Editing Showreel // Highlights",
      category: "Video Editing",
      year: "2025",
      image: "/projects/video-editing-highlights-thumb.jpg",
      video: "/projects/video-editing-highlights.mp4",
      description: "Official video editing highlight montage showcasing rhythmic cutting, cinematic pacing, dynamic motion sync, color grading, and creative post-production across commercial and narrative works."
    },
    {
      id: 2,
      title: "CCIS Short Film: Pahinumdom",
      category: "Video Editing",
      year: "2024",
      image: "/projects/pahinumdom-thumb.jpg",
      video: "/projects/pahinumdom-web.mp4",
      description: "CCIS short film 'Pahinumdom' exploring memory, grief, and reflection through cinematic narrative storytelling, emotional pacing, and nuanced color grading."
    },
    {
      id: 3,
      title: "El Regreso — Eltresix9 (Official Music Video)",
      category: "Video Editing",
      year: "2024",
      image: "/projects/el-regreso-thumb.jpg",
      video: "/projects/el-regreso-web.mp4",
      description: "Official music video for 'El Regreso' by Eltresix9, featuring energetic performance choreography, stylized low-key lighting, kinetic visual rhythm, and urban street aesthetics."
    },
    {
      id: 4,
      title: "Lunan by MRC Films",
      category: "Video Editing",
      year: "2024",
      image: "/projects/lunan-thumb.jpg",
      video: "/projects/lunan-web.mp4",
      description: "Cinematic short film production by MRC Films edited with atmospheric pacing, nuanced color grading, and evocative sound design."
    },
    {
      id: 5,
      title: "Global Governance",
      category: "Video Editing",
      year: "2024",
      image: "/projects/contempo-thumb.jpg",
      video: "/projects/contempo-web.mp4",
      description: "Dynamic short film production exploring themes of global governance, crafted with deliberate narrative pacing, cinematic visual storytelling, and polished editorial rhythm."
    },
    {
      id: 6,
      title: "Sports Wellness",
      category: "Video Editing",
      year: "2024",
      image: "/projects/sports-wellness-thumb.jpg",
      video: "/projects/sports-wellness-web.mp4",
      description: "Dynamic sports wellness showcase capturing athletic movement, training discipline, and community well-being with crisp documentary cinematography and upbeat editorial tempo."
    },
    {
      id: 7,
      title: "Statistics: One-Way ANOVA",
      category: "Motion Graphics & 2D Animation",
      year: "2024",
      image: "/projects/cabe-final-proj-thumb.jpg",
      video: "/projects/CABE%20FINAL%20PROJ.mp4",
      description: "Educational 2D animated explainer breaking down One-Way ANOVA statistical analysis with custom character rigging, illustrated environments, and motion design."
    },
    {
      id: 8,
      title: "Memorandum of Agreement: Car Trading",
      category: "Motion Graphics & 2D Animation",
      year: "2023",
      image: "/projects/moa-car-trading-thumb.jpg",
      video: "/projects/Memorandum%20of%20Agreement%20Car%20Trading.mp4",
      description: "Commercial 2D animation explainer for M and L Car Trading detailing memorandum of agreement terms with custom vector assets and motion design."
    },
    {
      id: 9,
      title: "Larry Fiero & Creator Short-Form Content",
      category: "Intro Videos & Short Video Contents",
      year: "2025",
      image: "/projects/larry-intro-thumb.jpg",
      video: "/projects/Larry%20intro.mp4",
      description: "Cinematic 3D metallic logo reveals, dynamic channel intro openers, and high-retention vertical video edits with kinetic typography."
    },
    {
      id: 10,
      title: "Dhenyhos Menu & Sacred Heart Pixel Art",
      category: "Graphics",
      year: "2024",
      image: "/projects/graphics-dhenyhos-menu.jpg",
      description: "Commercial restaurant menu layouts for Dhenyhos Family Resort and custom 2D pixel art campus environments for Sacred Heart Chronicles."
    },
    {
      id: 11,
      title: "Video Editing & Filmmaking Honors (PSITS & Sine Kabataan)",
      category: "Certificates & Awards",
      year: "2024–2025",
      image: "/projects/cert-5.jpg",
      description: "PSITS Region 11 Champion & Best Editing / Short Film awards, Sine Kabataan Best Film & Editing Honors ('Four-Saken Truths'), Best Research Project Award, and CCIS-LGU Governor leadership distinction."
    }
  ]
};
