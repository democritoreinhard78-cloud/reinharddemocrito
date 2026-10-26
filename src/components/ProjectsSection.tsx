import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProjectItem } from '../types/portfolio';
import { DoubleSquare } from './SectionLabel';
import { ProjectModal } from './ProjectModal';

type CategoryId =
  | 'all'
  | 'directing'
  | 'motion-2d'
  | 'short-video'
  | 'graphics'
  | 'intro-videos';

interface PortfolioCategory {
  id: Exclude<CategoryId, 'all'>;
  index: string;
  label: string;
  subtitle: string;
}

interface CaseStudyCard {
  code: string;
  categoryId: Exclude<CategoryId, 'all'>;
  categoryLabel: string;
  client: string;
  discipline: string;
  year: string;
  variant: 'cream-split' | 'dark-poster' | 'editorial-spread' | 'grid-system';
  image: string;
  description: string;
}

const CATEGORIES: PortfolioCategory[] = [
  {
    id: 'directing',
    index: '01',
    label: 'Directing',
    subtitle: 'CREATIVE DIRECTION, COMMERCIAL FILMS & VISUAL STORYTELLING'
  },
  {
    id: 'motion-2d',
    index: '02',
    label: 'Motion Graphics & 2D Animation',
    subtitle: 'KINETIC TYPOGRAPHY, 2D CHARACTER ANIMATION & VISUAL FX'
  },
  {
    id: 'short-video',
    index: '03',
    label: 'Short Video Contents',
    subtitle: 'HIGH-RETENTION REELS, SOCIAL CUTS & FAST-PACED STORYTELLING'
  },
  {
    id: 'graphics',
    index: '04',
    label: 'Graphics',
    subtitle: 'BRAND IDENTITY, SOCIAL MEDIA GRAPHICS, POSTERS & DECKS'
  },
  {
    id: 'intro-videos',
    index: '05',
    label: 'Intro Videos',
    subtitle: 'LOGO STINGERS, CHANNEL OPENERS & BROADCAST TITLE SEQUENCES'
  }
];

const CASE_STUDY_CARDS: CaseStudyCard[] = [
  // 01. DIRECTING
  {
    code: '01',
    categoryId: 'directing',
    categoryLabel: 'Directing',
    client: 'BRAND LAUNCH FILM',
    discipline: 'DIRECTION & EDITING',
    year: '2025',
    variant: 'cream-split',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description:
      'End-to-end creative direction, storyboarding, on-set blocking, and final narrative cut for a flagship brand launch film.'
  },
  {
    code: '02',
    categoryId: 'directing',
    categoryLabel: 'Directing',
    client: 'MNLTH VISUALS',
    discipline: 'CREATIVE DIRECTION',
    year: '2025',
    variant: 'dark-poster',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description:
      'High-contrast monochrome commercial direction focusing on tactile product lighting, deliberate camera movement, and atmospheric sound design.'
  },
  {
    code: '03',
    categoryId: 'directing',
    categoryLabel: 'Directing',
    client: 'DOCUMENTARY SHORT',
    discipline: 'DIRECTION & SOUND',
    year: '2024',
    variant: 'editorial-spread',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description:
      'Intimate documentary portrait directed on location, blending candid interview storytelling with cinematic B-roll and custom soundscapes.'
  },
  {
    code: '04',
    categoryId: 'directing',
    categoryLabel: 'Directing',
    client: 'COLLISON CAMPAIGN',
    discipline: 'FILM DIRECTION',
    year: '2024',
    variant: 'grid-system',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    description:
      'Multi-scene campaign film directed with a focus on human connection, visual rhythm, and cohesive art direction.'
  },

  // 02. MOTION GRAPHICS & 2D ANIMATION
  {
    code: '05',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'KINETIC TYPE REEL',
    discipline: 'MOTION GRAPHICS',
    year: '2025',
    variant: 'dark-poster',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description:
      'Beat-synced kinetic typography and modular Swiss grid motion graphics crafted in After Effects for digital brand campaigns.'
  },
  {
    code: '06',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: '2D EXPLAINER STORY',
    discipline: '2D ANIMATION',
    year: '2025',
    variant: 'cream-split',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description:
      'Custom 2D vector illustration, scene transitions, and smooth frame-by-frame motion curves explaining complex product workflows.'
  },
  {
    code: '07',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'PULSE VISUALIZER',
    discipline: 'MOTION & 2D FX',
    year: '2024',
    variant: 'grid-system',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description:
      'Audio-reactive 2D HUD systems, data-driven motion overlays, and seamless loop animations for music and tech releases.'
  },
  {
    code: '08',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'VECTOR FLOW SERIES',
    discipline: '2D CHARACTER & RIG',
    year: '2024',
    variant: 'editorial-spread',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    description:
      'Expressive 2D character rigging, shape-layer morphing, and playful storytelling sequences built for social and web platforms.'
  },

  // 03. SHORT VIDEO CONTENTS
  {
    code: '09',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'EDITORIAL REEL',
    discipline: 'SHORT-FORM PACING',
    year: '2025',
    variant: 'editorial-spread',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    description:
      'High-retention vertical edit combining punchy hooks, dynamic speed ramps, custom captions, and crisp sound design.'
  },
  {
    code: '10',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'CREATOR HIGHLIGHT',
    discipline: 'RETENTION EDITING',
    year: '2025',
    variant: 'cream-split',
    image:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    description:
      'Short-form storytelling tailored for Reels, TikTok, and YouTube Shorts with clean visual callouts and seamless B-roll integration.'
  },
  {
    code: '11',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'PRODUCT DROP CUT',
    discipline: 'SOCIAL VIDEO ADS',
    year: '2024',
    variant: 'dark-poster',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description:
      'Fast-paced 30-second commercial cut engineered for social conversion with rhythmic cuts and bold monochrome typography.'
  },
  {
    code: '12',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'EVENT RECAP SHORT',
    discipline: 'FAST-CUT STORY',
    year: '2024',
    variant: 'grid-system',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description:
      'High-energy highlight reel capturing live event atmosphere through match-cuts, riser SFX, and stylized color grading.'
  },

  // 04. GRAPHICS
  {
    code: '13',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'IDENTITY SYSTEM',
    discipline: 'VISUAL DESIGN',
    year: '2025',
    variant: 'grid-system',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description:
      'Cohesive visual identity system featuring custom typography rules, brand marks, and grid-based key visuals.'
  },
  {
    code: '14',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'PORTRAIT SERIES',
    discipline: 'ART DIRECTION & GRAPHICS',
    year: '2024',
    variant: 'cream-split',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description:
      'Swiss-brutalist poster series and social media carousel graphics built in Photoshop and Canva with bold editorial hierarchy.'
  },
  {
    code: '15',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'AUREL VANCE',
    discipline: 'EDITORIAL DESIGN',
    year: '2024',
    variant: 'editorial-spread',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description:
      'Print and digital lookbook layouts balancing high-contrast monochrome photography with structured micro-typography.'
  },
  {
    code: '16',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'RENOVA DECK',
    discipline: 'PRESENTATION DESIGN',
    year: '2024',
    variant: 'dark-poster',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    description:
      'Executive pitch deck and visual presentation system crafted in PowerPoint and Canva for investor storytelling.'
  },

  // 05. INTRO VIDEOS
  {
    code: '17',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'NARCRAFT OPENER',
    discipline: 'LOGO STINGER & INTRO',
    year: '2025',
    variant: 'dark-poster',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    description:
      'Custom signature logo reveal and dark-room sonic stinger establishing immediate brand recognition in the first 5 seconds.'
  },
  {
    code: '18',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'CHANNEL INTRO SEQ',
    discipline: 'TITLE OPENER',
    year: '2025',
    variant: 'cream-split',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description:
      'Dynamic YouTube and creator channel intro sequence combining layered cut-outs, kinetic titles, and custom sound hits.'
  },
  {
    code: '19',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'AVENOR STUDIO INTRO',
    discipline: 'BROADCAST OPENER',
    year: '2024',
    variant: 'editorial-spread',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description:
      'Editorial title sequence and show package opener with lower-thirds, transition mattes, and atmospheric pacing.'
  },
  {
    code: '20',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'CINEMATIC CUT INTRO',
    discipline: 'SHOWREEL OPENER',
    year: '2024',
    variant: 'grid-system',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description:
      'High-impact showreel and event intro video built to command attention with bold countdown frames and rapid montage cuts.'
  }
];

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleCategories =
    activeCategory === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((cat) => cat.id === activeCategory);

  const handleSelectCard = (card: CaseStudyCard, idx: number) => {
    setSelectedProject({
      id: idx + 1,
      title: card.client,
      category: `${card.categoryLabel} — ${card.discipline}`,
      year: card.year,
      image: card.image,
      description: card.description
    });
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-ink border-b border-white/10 py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 space-y-14">
        {/* CATEGORY FILTER BAR */}
        <div className="space-y-5 border-b border-white/15 pb-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <DoubleSquare />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
                PORTFOLIO ARCHIVE // BY CATEGORY
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
              [ {CATEGORIES.length.toString().padStart(2, '0')} CATEGORIES /{' '}
              {CASE_STUDY_CARDS.length} WORKS ]
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 border font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#e7e5dc] text-black border-[#e7e5dc] font-semibold'
                  : 'bg-[#0c0e10] text-white/65 border-white/15 hover:border-white/45 hover:text-white'
              }`}
            >
              [ ALL CATEGORIES ({CASE_STUDY_CARDS.length}) ]
            </button>

            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3.5 py-2 border font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#e7e5dc] text-black border-[#e7e5dc] font-semibold'
                      : 'bg-[#0c0e10] text-white/65 border-white/15 hover:border-white/45 hover:text-white'
                  }`}
                >
                  [ {category.index}. {category.label.toUpperCase()} ]
                </button>
              );
            })}
          </div>
        </div>

        {/* CATEGORIZED 4-COLUMN BENTO CASE STUDY SECTIONS */}
        <div className="space-y-16 sm:space-y-20">
          {visibleCategories.map((category) => {
            const categoryCards = CASE_STUDY_CARDS.filter(
              (card) => card.categoryId === category.id
            );

            return (
              <div key={category.id} className="space-y-6">
                {/* Category Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/15 pb-3.5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <DoubleSquare />
                      <span className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/50">
                        [ CATEGORY {category.index} ]
                      </span>
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl lg:text-[28px] font-semibold uppercase tracking-[-0.02em] text-white leading-none">
                      {category.label}
                    </h2>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/45">
                      {category.subtitle}
                    </span>
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/70 shrink-0">
                      [ {categoryCards.length.toString().padStart(2, '0')} WORKS ]
                    </span>
                  </div>
                </div>

                {/* 4-Column Case Study Grid for this Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
                  {categoryCards.map((card, idx) => (
                    <motion.article
                      key={card.code}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.45, delay: (idx % 4) * 0.06 }}
                      onClick={() => handleSelectCard(card, idx)}
                      className="group cursor-pointer space-y-2"
                    >
                      {/* Top Registration Mark Row */}
                      <div className="flex items-center justify-between">
                        <DoubleSquare />
                        <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-white/40">
                          [ {card.code} ]
                        </span>
                      </div>

                      {/* Case Study Split Thumbnail Frame */}
                      <div className="case-study-artwork relative aspect-[16/10] w-full border border-white/15 bg-[#0c0e10] overflow-hidden p-2 grid grid-cols-12 gap-1.5 group-hover:border-white/45 transition-colors">
                        {card.variant === 'cream-split' && (
                          <>
                            <div className="col-span-8 bg-[#e7e5dc] text-black p-2.5 flex flex-col justify-between">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[6px] uppercase tracking-[0.18em] opacity-65">
                                  {card.discipline}
                                </span>
                                <span className="w-1.5 h-1.5 bg-black inline-block" />
                              </div>
                              <p className="font-display text-xs font-semibold uppercase tracking-tight leading-none">
                                {card.client}
                              </p>
                            </div>
                            <div className="col-span-4 grid grid-rows-2 gap-1.5">
                              <div className="bg-white/10 border border-white/15 p-1.5 flex items-end">
                                <span className="font-mono text-[5.5px] uppercase tracking-[0.16em] text-white/70">
                                  {card.year}
                                </span>
                              </div>
                              <div className="relative overflow-hidden bg-black">
                                <img
                                  src={card.image}
                                  alt={card.client}
                                  loading="lazy"
                                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {card.variant === 'dark-poster' && (
                          <>
                            <div className="col-span-6 relative overflow-hidden bg-black border border-white/10">
                              <img
                                src={card.image}
                                alt={card.client}
                                loading="lazy"
                                className="w-full h-full object-cover grayscale contrast-150 brightness-75 group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 p-2 flex flex-col justify-between bg-gradient-to-t from-black/85 via-transparent to-black/30">
                                <span className="font-display text-[11px] font-bold uppercase tracking-tight text-white">
                                  {card.client.split(' ')[0]}
                                </span>
                                <span className="font-mono text-[5.5px] uppercase tracking-[0.18em] text-white/75">
                                  {card.discipline}
                                </span>
                              </div>
                            </div>
                            <div className="col-span-6 bg-[#131619] p-2.5 flex flex-col justify-between border border-white/10">
                              <div className="space-y-1">
                                <div className="w-8 h-0.5 bg-white/50" />
                                <p className="font-mono text-[6px] uppercase tracking-[0.15em] text-white/60 leading-relaxed">
                                  {card.categoryLabel.toUpperCase()}
                                </p>
                              </div>
                              <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
                                <span className="font-mono text-[5.5px] text-white/45">
                                  {card.year}
                                </span>
                                <span className="w-1.5 h-1.5 bg-white/70 inline-block" />
                              </div>
                            </div>
                          </>
                        )}

                        {card.variant === 'editorial-spread' && (
                          <>
                            <div className="col-span-5 bg-[#f0efe9] text-black p-2 flex flex-col justify-between">
                              <span className="font-mono text-[5.5px] uppercase tracking-[0.18em] opacity-60">
                                CASE {card.code}
                              </span>
                              <p className="font-display text-[11px] font-semibold leading-tight tracking-tight">
                                {card.client}
                              </p>
                              <div className="w-full h-4 bg-black/85" />
                            </div>
                            <div className="col-span-7 relative overflow-hidden bg-[#181b1e]">
                              <img
                                src={card.image}
                                alt={card.client}
                                loading="lazy"
                                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </>
                        )}

                        {card.variant === 'grid-system' && (
                          <>
                            <div className="col-span-7 relative overflow-hidden bg-black">
                              <img
                                src={card.image}
                                alt={card.client}
                                loading="lazy"
                                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute bottom-1.5 left-1.5 bg-white text-black px-1.5 py-0.5 font-mono text-[5.5px] uppercase tracking-[0.18em]">
                                {card.client}
                              </div>
                            </div>
                            <div className="col-span-5 bg-[#eae9e2] text-black p-2 flex flex-col justify-between">
                              <div className="flex items-center justify-between">
                                <span className="w-1.5 h-1.5 bg-black inline-block" />
                                <span className="font-mono text-[5.5px] uppercase tracking-[0.16em]">
                                  {card.year}
                                </span>
                              </div>
                              <p className="font-mono text-[6px] uppercase tracking-[0.15em] leading-snug opacity-80">
                                {card.discipline}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Bottom Micro Caption Bar: Client + [ SEE DETAILS ] */}
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/60 truncate">
                          {card.client}
                        </span>
                        <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-white/55 group-hover:text-white transition-colors shrink-0">
                          [ SEE DETAILS ]
                        </span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};
