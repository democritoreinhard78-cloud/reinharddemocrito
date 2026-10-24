import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { DoubleSquare } from './SectionLabel';
import { ProjectModal } from './ProjectModal';

interface CaseStudyCard {
  code: string;
  client: string;
  discipline: string;
  year: string;
  variant: 'cream-split' | 'dark-poster' | 'editorial-spread' | 'grid-system';
  projectIndex: number;
}

const CASE_STUDY_GRID: CaseStudyCard[] = [
  {
    code: '01',
    client: 'BRAND LAUNCH FILM',
    discipline: 'DIRECTION & EDITING',
    year: '2025',
    variant: 'cream-split',
    projectIndex: 0
  },
  {
    code: '02',
    client: 'MNLTH VISUALS',
    discipline: 'CREATIVE DIRECTION',
    year: '2025',
    variant: 'dark-poster',
    projectIndex: 1
  },
  {
    code: '03',
    client: 'EDITORIAL REEL',
    discipline: 'MOTION & PACING',
    year: '2025',
    variant: 'editorial-spread',
    projectIndex: 2
  },
  {
    code: '04',
    client: 'IDENTITY SYSTEM',
    discipline: 'VISUAL DESIGN',
    year: '2024',
    variant: 'grid-system',
    projectIndex: 3
  },
  {
    code: '05',
    client: 'AVENOR STUDIO',
    discipline: 'STORYTELLING',
    year: '2024',
    variant: 'editorial-spread',
    projectIndex: 4
  },
  {
    code: '06',
    client: 'CINEMATIC CUT',
    discipline: 'VIDEO EDITING',
    year: '2024',
    variant: 'dark-poster',
    projectIndex: 5
  },
  {
    code: '07',
    client: 'PORTRAIT SERIES',
    discipline: 'ART DIRECTION',
    year: '2024',
    variant: 'cream-split',
    projectIndex: 0
  },
  {
    code: '08',
    client: 'COLLISON CAMPAIGN',
    discipline: 'BRAND FILM',
    year: '2024',
    variant: 'grid-system',
    projectIndex: 1
  },
  {
    code: '09',
    client: 'DOCUMENTARY SHORT',
    discipline: 'DIRECTION & SOUND',
    year: '2024',
    variant: 'cream-split',
    projectIndex: 2
  },
  {
    code: '10',
    client: 'DARKROOM ARCHIVE',
    discipline: 'VISUAL SYSTEMS',
    year: '2023',
    variant: 'dark-poster',
    projectIndex: 3
  },
  {
    code: '11',
    client: 'AUREL VANCE',
    discipline: 'EDITORIAL DESIGN',
    year: '2023',
    variant: 'editorial-spread',
    projectIndex: 4
  },
  {
    code: '12',
    client: 'RENOVA DECK',
    discipline: 'PRESENTATION DESIGN',
    year: '2023',
    variant: 'grid-system',
    projectIndex: 5
  }
];

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="relative w-full bg-ink border-b border-white/10 py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 space-y-20 sm:space-y-28">
        {/* TOP ROW: "A SELECTION OF RECENT COLLABORATIONS." + Tabular Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column Title */}
          <div className="lg:col-span-4 space-y-4">
            <DoubleSquare />
            <h2 className="font-display text-xl sm:text-2xl font-normal uppercase tracking-[-0.02em] leading-[1.15] text-white">
              <span className="block">A SELECTION OF</span>
              <span className="block">RECENT</span>
              <span className="block">COLLABORATIONS.</span>
            </h2>
          </div>

          {/* Right Column Interactive Collaborations Table */}
          <div className="lg:col-span-8 border-t border-white/15">
            {CASE_STUDY_GRID.slice(0, 10).map((row, index) => {
              const isActive = index === activeIndex;
              const linkedProject = projects[row.projectIndex] ?? projects[0];
              return (
                <button
                  key={row.code}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => linkedProject && setSelectedProject(linkedProject)}
                  className={`w-full text-left transition-colors duration-150 border-b border-white/15 px-3 sm:px-5 py-2.5 sm:py-3 grid grid-cols-12 items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="col-span-2 sm:col-span-2 flex items-center gap-2.5">
                    {isActive ? (
                      <DoubleSquare dark />
                    ) : (
                      <span className="inline-flex items-center gap-1 opacity-30">
                        <span className="w-1 h-1 bg-white inline-block" />
                        <span className="w-1 h-1 bg-white inline-block" />
                      </span>
                    )}
                    <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em]">
                      [ 0{row.code} ]
                    </span>
                  </div>

                  <div className="col-span-5 sm:col-span-5 font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.18em] font-medium truncate">
                    {row.client}
                  </div>

                  <div
                    className={`col-span-3 sm:col-span-3 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] truncate ${
                      isActive ? 'text-black/80' : 'text-white/50'
                    }`}
                  >
                    {row.discipline}
                  </div>

                  <div
                    className={`col-span-2 sm:col-span-2 text-right font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] ${
                      isActive ? 'text-black' : 'text-white/50'
                    }`}
                  >
                    {row.year}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTTOM 4x3 BENTO CASE STUDY THUMBNAIL GRID (12 Cards matching right reference panel) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 pt-4">
          {CASE_STUDY_GRID.map((card, idx) => {
            const linkedProject = projects[card.projectIndex] ?? projects[0];
            return (
              <motion.article
                key={card.code}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (idx % 4) * 0.06 }}
                onClick={() => linkedProject && setSelectedProject(linkedProject)}
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
                <div className="relative aspect-[16/10] w-full border border-white/15 bg-[#0c0e10] overflow-hidden p-2 grid grid-cols-12 gap-1.5 group-hover:border-white/45 transition-colors">
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
                          {linkedProject && (
                            <img
                              src={linkedProject.image}
                              alt={card.client}
                              loading="lazy"
                              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {card.variant === 'dark-poster' && (
                    <>
                      <div className="col-span-6 relative overflow-hidden bg-black border border-white/10">
                        {linkedProject && (
                          <img
                            src={linkedProject.image}
                            alt={card.client}
                            loading="lazy"
                            className="w-full h-full object-cover grayscale contrast-150 brightness-75 group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
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
                            DIRECTION, PACING &amp; VISUAL CRAFT
                          </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
                          <span className="font-mono text-[5.5px] text-white/45">{card.year}</span>
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
                        {linkedProject && (
                          <img
                            src={linkedProject.image}
                            alt={card.client}
                            loading="lazy"
                            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                    </>
                  )}

                  {card.variant === 'grid-system' && (
                    <>
                      <div className="col-span-7 relative overflow-hidden bg-black">
                        {linkedProject && (
                          <img
                            src={linkedProject.image}
                            alt={card.client}
                            loading="lazy"
                            className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
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
