import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { DoubleSquare } from './SectionLabel';

export const AboutSection: React.FC = () => {
  const { personalInfo, projects, education } = portfolioData;
  const featured = projects.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = featured[activeIndex] ?? featured[0];

  return (
    <section
      id="about"
      className="relative w-full bg-ink border-b border-white/10 py-24 sm:py-36 overflow-hidden"
    >
      {/* Top Manifesto Statement with Flanking Hairlines & Stacked Twin Squares */}
      <div className="relative flex items-center justify-center w-full py-6 sm:py-10">
        {/* Left Horizontal Hairline + Stacked Squares */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center flex-1 max-w-[14vw] lg:max-w-[16vw]"
        >
          <div className="w-full h-px bg-white/30" />
          <div className="flex flex-col gap-1.5 pl-2 shrink-0">
            <span className="w-1.5 h-1.5 bg-white block" />
            <span className="w-1.5 h-1.5 bg-white block" />
          </div>
        </div>

        {/* Center Two-Tone Display Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="px-5 sm:px-10 text-center max-w-5xl mx-auto"
        >
          <h2 className="font-display font-normal uppercase text-[clamp(1.5rem,3.4vw,3.1rem)] leading-[1.12] tracking-[-0.02em]">
            <span className="block text-white">WE SIMPLY ENJOY THE PROCESS.</span>
            <span className="block text-white">HELPING BRING STORIES ALIVE</span>
            <span className="block">
              <span className="text-white">WITH PATIENT EFFORT, </span>
              <span className="text-white/40">OPEN</span>
            </span>
            <span className="block text-white/40">LISTENING, AND QUIET FOCUS</span>
            <span className="block text-white/40">ON STEADY, MEANINGFUL WORK.</span>
          </h2>
        </motion.div>

        {/* Right Stacked Squares + Horizontal Hairline */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center flex-1 max-w-[14vw] lg:max-w-[16vw]"
        >
          <div className="flex flex-col gap-1.5 pr-2 shrink-0">
            <span className="w-1.5 h-1.5 bg-white block" />
            <span className="w-1.5 h-1.5 bg-white block" />
          </div>
          <div className="w-full h-px bg-white/30" />
        </div>
      </div>

      {/* Interactive 4-Column Spotlight Strip + Bio Drawer (matching bottom of left reference panel) */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 pt-20 sm:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-white/15">
          {featured.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={proj.id}
                className={`lg:col-span-3 border-b lg:border-b-0 lg:border-r last:border-r-0 border-white/15 p-4 sm:p-5 flex flex-col justify-between transition-colors ${
                  isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
                }`}
              >
                {/* Top Selector Header */}
                {isActive ? (
                  <div className="flex items-center justify-between gap-2 pb-6">
                    <span className="bg-white text-black font-mono text-[9px] font-medium uppercase tracking-[0.18em] px-2.5 py-1.5 truncate">
                      {proj.title}
                    </span>
                    <DoubleSquare />
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/60 truncate">
                      {proj.category}
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="w-full border border-white/20 px-3 py-2 flex items-center justify-between gap-2 text-left hover:border-white/50 transition-colors cursor-pointer"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/75 truncate">
                      {proj.title}
                    </span>
                    <span className="w-1.5 h-1.5 bg-white inline-block shrink-0" />
                  </button>
                )}

                {/* Expanded Details Inside Active Column */}
                {isActive ? (
                  <div className="space-y-4 pt-2">
                    <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/65 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.2em] text-white/45 pt-2 border-t border-white/10">
                      <span>[ 00{proj.id} ]</span>
                      <span>{proj.year}</span>
                    </div>
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center justify-between pt-10 text-[8px] font-mono uppercase tracking-[0.18em] text-white/30">
                    <span>[ 00{proj.id} ]</span>
                    <span>{proj.category}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reinhard Personal Bio & Credentials Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 sm:pt-16 border-t border-white/10 items-start">
          <div className="lg:col-span-4 space-y-2">
            <div className="flex items-center gap-3">
              <DoubleSquare />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-white/80">
                ABOUT {personalInfo.firstName} {personalInfo.lastName}
              </span>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45 pl-6">
              {personalInfo.title} · {personalInfo.location.city}
            </p>
            {activeProject && (
              <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/40 pl-6 pt-2">
                [ FOCUS: {activeProject.title.toUpperCase()} ]
              </p>
            )}
          </div>

          <div className="lg:col-span-5 space-y-3">
            {personalInfo.bio.map((paragraph, index) => (
              <p
                key={index}
                className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.13em] text-white/70 leading-[1.7]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-1 lg:text-right">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/45">
              [ EDUCATION ]
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white">
              {education.degree}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/60">
              {education.school}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
