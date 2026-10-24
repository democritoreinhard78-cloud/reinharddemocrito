import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Portrait } from './Portrait';
import { DoubleSquare } from './SectionLabel';

const TAPE_ITEMS = [
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR',
  'VIDEO EDITOR & VISUAL DESIGNER',
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR',
  'VIDEO EDITOR & VISUAL DESIGNER'
];

export const ProcessToolsSection: React.FC = () => {
  const { personalInfo, softwareSkills, designSkills, hobbies } = portfolioData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <section id="process" className="relative w-full bg-ink border-b border-white/10 overflow-hidden">
      {/* 1. UPPER PHILOSOPHY STATEMENT WITH FLANKING HAIRLINES & STACKED SQUARES */}
      <div className="relative flex items-center justify-center w-full pt-24 sm:pt-32 pb-12 sm:pb-16 z-20">
        {/* Left Hairline + Stacked Squares */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center flex-1 max-w-[16vw] lg:max-w-[20vw]"
        >
          <div className="w-full h-px bg-white/30" />
          <div className="flex flex-col gap-1.5 pl-2.5 shrink-0">
            <span className="w-1.5 h-1.5 bg-white block" />
            <span className="w-1.5 h-1.5 bg-white block" />
          </div>
        </div>

        {/* Center Multi-Line Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="px-5 sm:px-10 text-center max-w-4xl mx-auto"
        >
          <h2 className="font-display font-normal uppercase text-[clamp(1.35rem,3vw,2.65rem)] leading-[1.12] tracking-[-0.02em]">
            <span className="block text-white">GOOD WORK IS BUILT ON GOOD</span>
            <span className="block text-white">QUESTIONS. STRATEGY PROVIDES</span>
            <span className="block text-white">THE DIRECTION, DESIGN GIVES IT</span>
            <span className="block">
              <span className="text-white">FORM, AND REFINEMENT </span>
              <span className="text-white/40">ENSURES</span>
            </span>
            <span className="block text-white/40">EVERY DETAIL SUPPORTS THE</span>
            <span className="block text-white/40">BIGGER PICTURE</span>
          </h2>
        </motion.div>

        {/* Right Stacked Squares + Hairline */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center flex-1 max-w-[16vw] lg:max-w-[20vw]"
        >
          <div className="flex flex-col gap-1.5 pr-2.5 shrink-0">
            <span className="w-1.5 h-1.5 bg-white block" />
            <span className="w-1.5 h-1.5 bg-white block" />
          </div>
          <div className="w-full h-px bg-white/30" />
        </div>
      </div>

      {/* 2. PORTRAIT STAGE WITH FLOATING PROJECT CARDS & CRISS-CROSSED TAPE RIBBONS */}
      <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px] overflow-hidden">
        {/* Studio Horizon Backdrop (starts slightly below top so cap overlaps the dark upper band) */}
        <div
          className="absolute inset-x-0 top-10 sm:top-14 bottom-0 border-y border-white/10"
          style={{
            background:
              'radial-gradient(ellipse 62% 85% at 78% 54%, #8d9498 0%, #4e5559 35%, #181c1f 66%, #060708 95%)'
          }}
        />

        {/* Floating Card 1: Upper Left Behind Portrait */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-2 gap-1 w-36 lg:w-44 h-20 lg:h-24 bg-[#121518] border border-white/20 p-1.5 shadow-2xl absolute left-[24%] lg:left-[30%] top-12 lg:top-14 z-[8]"
        >
          <div className="bg-black border border-white/10 p-2 flex flex-col justify-between">
            <span className="font-display text-[9px] uppercase text-white/85 font-semibold">
              REINHARD
            </span>
            <span className="font-mono text-[5.5px] uppercase tracking-[0.16em] text-white/50">
              DIRECTION
            </span>
          </div>
          <div className="bg-[#e8e7df] text-black p-2 flex flex-col justify-between">
            <span className="w-1.5 h-1.5 bg-black inline-block" />
            <span className="font-mono text-[5.5px] uppercase tracking-[0.15em]">2025 CUT</span>
          </div>
        </div>

        {/* Floating Card 2: Upper Right Behind Portrait */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-2 gap-1 w-36 lg:w-44 h-20 lg:h-24 bg-[#f2f1ec] text-black border border-white/25 p-1.5 shadow-2xl absolute right-[24%] lg:right-[29%] top-10 lg:top-12 z-[8]"
        >
          <div className="bg-black text-white p-2 flex flex-col justify-between">
            <span className="font-mono text-[5.5px] uppercase tracking-[0.16em] text-white/60">
              STUDIO
            </span>
            <span className="font-display text-[9px] uppercase font-semibold">VISUALS</span>
          </div>
          <div className="p-2 flex flex-col justify-between">
            <span className="font-mono text-[5.5px] uppercase tracking-[0.14em] opacity-70">
              STORYFIRST
            </span>
            <div className="w-full h-3 bg-black/80" />
          </div>
        </div>

        {/* Floating Card 3: Mid-Left */}
        <div
          aria-hidden="true"
          className="hidden md:grid grid-cols-2 gap-1 w-32 lg:w-40 h-18 lg:h-22 bg-[#f3f2ed] text-black border border-black/20 p-1.5 shadow-2xl absolute left-[12%] lg:left-[18%] top-[44%] z-[9]"
        >
          <div className="p-1.5 flex flex-col justify-between">
            <span className="font-display text-[8.5px] font-bold uppercase">AVENOR</span>
            <span className="font-mono text-[5px] uppercase tracking-[0.16em] opacity-65">
              BRAND REEL
            </span>
          </div>
          <div className="bg-[#14171a] text-white p-1.5 flex items-end">
            <span className="font-mono text-[5px] uppercase tracking-[0.16em] text-white/70">
              [ 01 ]
            </span>
          </div>
        </div>

        {/* Floating Card 4: Mid-Right */}
        <div
          aria-hidden="true"
          className="hidden md:grid grid-cols-2 gap-1 w-32 lg:w-40 h-18 lg:h-22 bg-[#14171a] text-white border border-white/25 p-1.5 shadow-2xl absolute right-[10%] lg:right-[15%] top-[46%] z-[9]"
        >
          <div className="bg-black/80 p-1.5 flex flex-col justify-between">
            <span className="w-1.5 h-1.5 bg-white inline-block" />
            <span className="font-mono text-[5px] uppercase tracking-[0.16em] text-white/70">
              MOTION
            </span>
          </div>
          <div className="bg-[#f3f2ed] text-black p-1.5 flex flex-col justify-between">
            <span className="font-display text-[8px] font-bold uppercase">FRAME</span>
            <span className="font-mono text-[5px] uppercase">2025</span>
          </div>
        </div>

        {/* Criss-Crossed White Marquee Tapes at the Bottom (behind portrait, z-10) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-20 bottom-20 sm:bottom-24 z-[10]"
          style={{ transform: 'rotate(7deg)' }}
        >
          <div className="bg-gradient-to-r from-white/80 via-white to-white/80 text-black py-1.5 border-y border-black/20 shadow-lg overflow-hidden">
            <div className="animate-marquee-left flex items-center gap-6 whitespace-nowrap">
              {[...TAPE_ITEMS, ...TAPE_ITEMS].map((txt, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-6 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em]"
                >
                  <span>{txt}</span>
                  <DoubleSquare dark />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-20 bottom-11 sm:bottom-14 z-[11]"
          style={{ transform: 'rotate(-4deg)' }}
        >
          <div className="bg-gradient-to-r from-white/75 via-white/95 to-white/75 text-black py-1.5 border-y border-black/20 shadow-lg overflow-hidden">
            <div className="animate-marquee-right flex items-center gap-6 whitespace-nowrap">
              {[...TAPE_ITEMS, ...TAPE_ITEMS].map((txt, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-6 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em]"
                >
                  <span>{txt}</span>
                  <DoubleSquare dark />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-20 bottom-3 sm:bottom-4 z-[12]"
          style={{ transform: 'rotate(1.5deg)' }}
        >
          <div className="bg-gradient-to-r from-white/70 via-white/90 to-white/70 text-black py-1.5 border-y border-black/20 shadow-lg overflow-hidden">
            <div className="animate-marquee-left flex items-center gap-6 whitespace-nowrap">
              {[...TAPE_ITEMS, ...TAPE_ITEMS].map((txt, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-6 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.22em]"
                >
                  <span>{txt}</span>
                  <DoubleSquare dark />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER PORTRAIT CUTOUT (rises from bottom, z-15) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-[15] mx-auto w-[min(86vw,480px)] flex items-end justify-center">
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, #000 80%, rgba(0,0,0,0.65) 94%, transparent 100%)',
              maskImage:
                'linear-gradient(to bottom, #000 80%, rgba(0,0,0,0.65) 94%, transparent 100%)'
            }}
          >
            <Portrait
              alt={`${fullName} studio portrait`}
              className="w-full h-full grayscale contrast-[1.25] brightness-[0.9] drop-shadow-[0_16px_36px_rgba(0,0,0,0.75)]"
            />
          </div>
        </div>

        {/* Foreground Floating Card 5: Bottom-Right */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-2 gap-1 w-36 lg:w-44 h-22 lg:h-26 bg-[#f5f4ef] text-black border border-black/25 p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] absolute right-[12%] lg:right-[20%] bottom-6 z-[20]"
        >
          <div className="border border-black/15 p-1.5 flex flex-col justify-between">
            <span className="font-mono text-[5.5px] uppercase tracking-[0.16em] opacity-65">
              PORTFOLIO
            </span>
            <span className="font-display text-[9px] font-bold uppercase leading-none">
              REINHARD
            </span>
          </div>
          <div className="bg-[#121518] text-white p-1.5 flex flex-col justify-between">
            <span className="font-mono text-[5px] uppercase tracking-[0.16em] text-white/65">
              DIGOS CITY
            </span>
            <span className="font-mono text-[5.5px] uppercase tracking-[0.16em] text-white">
              [ PH ]
            </span>
          </div>
        </div>

        {/* Subtle Chest Micro-Links Over Portrait */}
        <div className="absolute inset-x-0 bottom-10 sm:bottom-14 z-[22] flex items-center justify-center gap-10 sm:gap-16">
          <a
            href="#about"
            className="font-mono text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.22em] text-white/85 hover:text-white bg-black/55 backdrop-blur-xs px-2.5 py-1 border border-white/15 transition-colors"
          >
            [ LEARN ABOUT ME ]
          </a>
          <a
            href="#projects"
            className="font-mono text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.22em] text-white/85 hover:text-white bg-black/55 backdrop-blur-xs px-2.5 py-1 border border-white/15 transition-colors"
          >
            [ SEE MY WORK ]
          </a>
        </div>
      </div>

      {/* 3. COMPACT TOOLKIT, CRAFT & INTERESTS BAR */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Software Tools */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <DoubleSquare />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/70">
                TOOLKIT &amp; SOFTWARE
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {softwareSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="border border-white/15 bg-white/[0.02] px-3 py-2 flex items-center justify-between"
                >
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[8.5px] text-white/45">[{skill.code}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Craft & Personal Interests */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <DoubleSquare />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/70">
                  CRAFT &amp; FOCUS
                </span>
              </div>
              <ul className="space-y-1.5">
                {designSkills.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/75"
                  >
                    [ {skill} ]
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <DoubleSquare />
                <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/70">
                  BEYOND THE TIMELINE
                </span>
              </div>
              <ul className="space-y-1.5">
                {hobbies.map((hobby) => (
                  <li
                    key={hobby.name}
                    className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/75"
                  >
                    [ {hobby.name} ]
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
