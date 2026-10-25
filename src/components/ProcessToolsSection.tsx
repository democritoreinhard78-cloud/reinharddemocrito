import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Portrait } from './Portrait';
import { DoubleSquare } from './SectionLabel';

const TAPE_ITEMS = [
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR',
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR',
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR',
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR'
];

const MarqueeTapeContent: React.FC<{ reverse?: boolean }> = ({ reverse = false }) => (
  <div className="bg-gradient-to-r from-[#82878a] via-[#e2e4e6] to-[#82878a] text-[#111315] py-1.5 sm:py-2 border-y border-black/25 shadow-[0_10px_28px_rgba(0,0,0,0.65)] overflow-hidden">
    <div
      className={`${
        reverse ? 'animate-marquee-right' : 'animate-marquee-left'
      } flex items-center gap-5 sm:gap-7 whitespace-nowrap`}
    >
      {[...TAPE_ITEMS, ...TAPE_ITEMS].map((txt, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-5 sm:gap-7 font-mono text-[8.5px] sm:text-[10px] font-medium uppercase tracking-[0.2em]"
        >
          <span>{txt}</span>
          <span className="inline-flex items-center gap-2.5">
            <span className="w-px h-3 bg-black/25 inline-block" />
            <DoubleSquare dark />
            <span className="w-px h-3 bg-black/25 inline-block" />
          </span>
        </span>
      ))}
    </div>
  </div>
);

const SoftwareIcon: React.FC<{ code?: string }> = ({ code }) => {
  switch (code) {
    case 'Ps':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <rect
            x="1"
            y="1"
            width="22"
            height="22"
            rx="4"
            fill="#001E36"
            stroke="#31A8FF"
            strokeWidth="1.4"
          />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill="#31A8FF"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            Ps
          </text>
        </svg>
      );
    case 'Pr':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <rect
            x="1"
            y="1"
            width="22"
            height="22"
            rx="4"
            fill="#00005B"
            stroke="#9999FF"
            strokeWidth="1.4"
          />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill="#9999FF"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            Pr
          </text>
        </svg>
      );
    case 'Ae':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <rect
            x="1"
            y="1"
            width="22"
            height="22"
            rx="4"
            fill="#00005B"
            stroke="#CF96FD"
            strokeWidth="1.4"
          />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill="#CF96FD"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            Ae
          </text>
        </svg>
      );
    case 'Cc':
      // Official CapCut logo uploaded by user
      return (
        <img
          src="/capcut-logo.png"
          alt=""
          aria-hidden="true"
          className="w-5 h-5 rounded-[4px] object-cover shrink-0"
        />
      );
    case 'Cv':
      // Canva gradient circle + C monogram
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <defs>
            <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C4CC" />
              <stop offset="100%" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10.5" fill="url(#canvaGrad)" />
          <path
            d="M15.4 14.3c-.7 1.1-1.9 1.8-3.3 1.8-2.2 0-3.8-1.7-3.8-4.1s1.7-4.1 3.9-4.1c1.3 0 2.4.6 3.1 1.6l-1.4 1c-.4-.6-1-.9-1.7-.9-1.2 0-2.1 1-2.1 2.4s.9 2.4 2.1 2.4c.8 0 1.4-.4 1.8-1.1l1.4 1z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'Pp':
    default:
      // PowerPoint orange presentation pie-chart icon
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
          <circle cx="13" cy="12" r="9.5" fill="#D24726" />
          <path d="M13 2.5A9.5 9.5 0 0 1 22.5 12H13V2.5z" fill="#FF8F6B" />
          <rect
            x="2"
            y="6.5"
            width="11"
            height="11"
            rx="2"
            fill="#B73618"
            stroke="#FF7A4D"
            strokeWidth="1"
          />
          <text
            x="7.5"
            y="15"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            P
          </text>
        </svg>
      );
  }
};

export const ProcessToolsSection: React.FC = () => {
  const { personalInfo, softwareSkills, designSkills, hobbies } = portfolioData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <section id="process" className="relative w-full bg-[#080808] border-b border-white/10 overflow-hidden">
      {/* 1. UPPER PHILOSOPHY STATEMENT WITH FLANKING EDGE-TO-EDGE HAIRLINES & STACKED SQUARES */}
      <div className="relative flex items-center justify-between w-full pt-24 sm:pt-32 pb-2 z-10">
        {/* Left Edge Hairline + Stacked Squares */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center w-[11vw] lg:w-[13.5vw] shrink-0"
        >
          <div className="w-full h-px bg-white/35" />
          <div className="flex flex-col gap-2 pl-2.5 shrink-0">
            <span className="w-1.5 h-1.5 bg-white block" />
            <span className="w-1.5 h-1.5 bg-white block" />
          </div>
        </div>

        {/* Center Multi-Line Quote (matches reference size, line-breaks, and two-tone grey split) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="px-4 sm:px-8 text-center mx-auto"
        >
          <h2 className="font-display font-normal uppercase text-[clamp(1.45rem,3.65vw,3.35rem)] leading-[1.06] tracking-[-0.02em]">
            <span className="block text-[#f2f2f2]">GOOD WORK IS BUILT ON GOOD</span>
            <span className="block text-[#f2f2f2]">QUESTIONS. STRATEGY PROVIDES</span>
            <span className="block text-[#f2f2f2]">THE DIRECTION, DESIGN GIVES IT</span>
            <span className="block">
              <span className="text-[#f2f2f2]">FORM, AND REFINEMENT </span>
              <span className="text-[#6e7376]">ENSURES</span>
            </span>
            <span className="block text-[#6e7376]">EVERY DETAIL SUPPORTS THE</span>
            <span className="block text-[#6e7376]">BIGGER PICTURE</span>
          </h2>
        </motion.div>

        {/* Right Stacked Squares + Edge Hairline */}
        <div
          aria-hidden="true"
          className="hidden md:flex items-center w-[11vw] lg:w-[13.5vw] shrink-0"
        >
          <div className="flex flex-col gap-2 pr-2.5 shrink-0">
            <span className="w-1.5 h-1.5 bg-white block" />
            <span className="w-1.5 h-1.5 bg-white block" />
          </div>
          <div className="w-full h-px bg-white/35" />
        </div>
      </div>

      {/* 2. PORTRAIT STAGE WITH 6 EDITORIAL SPREAD CARDS & CRISS-CROSSED TAPE RIBBONS */}
      <div className="relative w-full h-[490px] sm:h-[600px] lg:h-[670px] -mt-5 sm:-mt-8 lg:-mt-10 overflow-hidden">
        {/* Studio Horizon Backdrop (starts below cap level so cap & upper cards straddle the horizon) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[95px] sm:top-[125px] lg:top-[142px] bottom-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 64% 92% at 76% 56%, #8f969a 0%, #585f63 38%, #1d2124 68%, #080808 92%)'
          }}
        />

        {/* CARD 1: Upper-Left Behind Cap ("BURNED" dark laptop spread) */}
        <div
          aria-hidden="true"
          className="hidden sm:flex flex-col justify-between w-[165px] lg:w-[215px] aspect-[16/10] bg-[#14171a] border border-white/15 p-2 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute left-[18%] lg:left-[29%] top-[46px] lg:top-[52px] z-[14] overflow-hidden"
        >
          <div className="relative w-full h-[78%] bg-[#0b0d0f] border border-white/15 overflow-hidden flex flex-col justify-between p-2">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-150 opacity-45"
            />
            <span className="relative z-10 font-display text-[12px] lg:text-[14px] tracking-[0.22em] uppercase text-white/90 font-light pl-3 pt-1">
              BURNED
            </span>
            <div className="relative z-10 flex items-center justify-between text-[4.5px] font-mono text-white/50 tracking-widest">
              <span>ARCHIVE 01</span>
              <span>2025</span>
            </div>
          </div>
          {/* Laptop base keyboard strip */}
          <div className="w-[88%] mx-auto h-[16%] bg-gradient-to-b from-[#2a2e33] to-[#15181b] rounded-b-xs border-t border-white/20" />
        </div>

        {/* CARD 2: Upper-Right Behind Cap (Architectural brutalist 2-page spread) */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-12 gap-1 w-[165px] lg:w-[215px] aspect-[16/10] bg-[#16191c] border border-white/15 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute right-[18%] lg:right-[34%] top-[42px] lg:top-[46px] z-[14] overflow-hidden"
        >
          <div className="col-span-8 bg-[#e5e4df] relative overflow-hidden flex flex-col justify-between p-1.5">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-[68%] object-cover grayscale contrast-125"
            />
            <div className="relative z-10 mt-auto bg-white/95 text-black p-1 shadow-xs">
              <p className="font-display text-[6px] font-bold uppercase leading-none">
                ARCHITECTURE
              </p>
              <p className="font-mono text-[4.5px] text-black/65 uppercase tracking-wider pt-0.5">
                SPATIAL IDENTITY
              </p>
            </div>
          </div>
          <div className="col-span-4 bg-[#f5f4f0] text-black p-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="aspect-square bg-[#181a1d]" />
              <div className="aspect-square bg-[#2c3035]" />
            </div>
            <div className="space-y-0.5">
              <div className="w-full h-[2px] bg-black/70" />
              <div className="w-4/5 h-[2px] bg-black/45" />
              <div className="w-3/5 h-[2px] bg-black/30" />
            </div>
            <div className="w-full h-3 bg-[#181a1d]" />
          </div>
        </div>

        {/* CARD 3: Mid-Left ("avenor" 2-page spread) */}
        <div
          aria-hidden="true"
          className="hidden md:grid grid-cols-2 gap-1 w-[155px] lg:w-[192px] aspect-[16/10] bg-[#14171a] border border-white/15 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute left-[6%] lg:left-[12.5%] top-[230px] lg:top-[270px] z-[14]"
        >
          <div className="bg-[#f4f3ef] text-black flex flex-col justify-between overflow-hidden">
            <div className="h-[58%] w-full bg-[#1a1d20] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80"
                alt=""
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="p-1.5">
              <p className="font-display text-[9px] lg:text-[11px] font-bold tracking-tight leading-none text-black">
                avenor
              </p>
              <div className="w-8 h-[2px] bg-black/40 mt-1" />
            </div>
          </div>
          <div className="bg-[#f4f3ef] text-black p-1 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-0.5 h-[56%]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"
                alt=""
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-150"
              />
              <div className="bg-[#16181b]" />
            </div>
            <div className="grid grid-cols-2 gap-0.5 h-[38%]">
              <div className="space-y-0.5 pt-0.5">
                <div className="w-full h-[1.5px] bg-black/60" />
                <div className="w-3/4 h-[1.5px] bg-black/40" />
              </div>
              <div className="bg-[#1c1f22]" />
            </div>
          </div>
        </div>

        {/* CARD 4: Mid-Right ("Aurel Vance" 2-page spread) */}
        <div
          aria-hidden="true"
          className="hidden md:grid grid-cols-2 gap-1 w-[170px] lg:w-[222px] aspect-[16/10] bg-[#121417] border border-white/15 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute right-[6%] lg:right-[16.5%] top-[255px] lg:top-[305px] z-[14]"
        >
          <div className="bg-[#f4f3ef] text-black flex flex-col justify-between relative overflow-hidden">
            <div className="h-[58%] w-full bg-[#181b1e] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt=""
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90"
              />
            </div>
            <p className="absolute left-1.5 top-[44%] font-display text-[9px] lg:text-[11px] font-semibold text-white drop-shadow-xs">
              Aurel Vance
            </p>
            <div className="p-1.5 flex items-end justify-between">
              <div className="space-y-0.5">
                <div className="w-8 h-[2px] bg-black/75" />
                <div className="w-6 h-[1.5px] bg-black/45" />
              </div>
              <div className="w-3.5 h-4 bg-[#14171a]" />
            </div>
          </div>
          <div className="bg-[#f4f3ef] text-black flex flex-col justify-between overflow-hidden">
            <div className="p-1.5 flex items-start justify-between h-[44%]">
              <div className="space-y-0.5">
                <div className="w-6 h-[1.5px] bg-black/60" />
                <div className="w-4 h-[1.5px] bg-black/40" />
              </div>
              <div className="w-7 h-5 bg-[#181a1d] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80"
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
            <div className="h-[56%] w-full bg-[#111315] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt=""
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-150 brightness-75"
              />
            </div>
          </div>
        </div>

        {/* 4 CRISS-CROSSED METALLIC WHITE MARQUEE TAPES (z-[10], BEHIND CENTER PORTRAIT) */}
        {/* Tape 1: Upper-Left to Lower-Right Diagonal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-24 bottom-[95px] sm:bottom-[115px] lg:bottom-[124px] z-[10]"
          style={{ transform: 'rotate(6.2deg)' }}
        >
          <MarqueeTapeContent />
        </div>

        {/* Tape 2: Middle Horizontal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-24 bottom-[92px] sm:bottom-[118px] lg:bottom-[132px] z-[10]"
        >
          <MarqueeTapeContent reverse />
        </div>

        {/* Tape 3: Lower-Left to Upper-Right Diagonal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-24 bottom-[48px] sm:bottom-[62px] lg:bottom-[72px] z-[10]"
          style={{ transform: 'rotate(-3.6deg)' }}
        >
          <MarqueeTapeContent />
        </div>

        {/* Tape 4: Bottom Horizontal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-24 bottom-[18px] sm:bottom-[22px] lg:bottom-[26px] z-[10]"
        >
          <MarqueeTapeContent reverse />
        </div>

        {/* CARD 5: Bottom-Left Nestled Between Tapes ("rus" close-up B&W portrait spread, z-[15]) */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-12 gap-1 w-[160px] lg:w-[214px] aspect-[16/10] bg-[#14171a] border border-white/20 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute left-[6%] lg:left-[13.5%] bottom-[42px] sm:bottom-[50px] lg:bottom-[56px] z-[15]"
        >
          <div className="col-span-7 relative bg-[#1b1e22] overflow-hidden flex items-end p-1.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
            />
            <span className="relative z-10 font-display text-[18px] lg:text-[22px] font-bold lowercase leading-none text-white tracking-tight">
              rus
            </span>
          </div>
          <div className="col-span-5 bg-[#f4f3ef] text-black p-1 grid grid-cols-2 gap-0.5">
            <div className="bg-[#181b1e]" />
            <div className="bg-[#d8d6d0]" />
            <div className="bg-[#d8d6d0]" />
            <div className="bg-[#181b1e]" />
          </div>
        </div>

        {/* CENTER PORTRAIT CUTOUT (Large close-up chest-to-head crop rising from bottom, z-[18], solid bottom blocking tapes) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-[18] mx-auto w-[min(98vw,780px)] sm:w-[min(92vw,900px)] lg:w-[1020px] overflow-hidden flex items-start justify-center">
          <div className="relative w-full h-[182%] scale-x-[1.1] -translate-y-[4.5%] translate-x-[1%] flex items-start justify-center origin-top">
            <Portrait
              alt={`${fullName} studio portrait`}
              className="w-full h-full !object-contain !object-top grayscale contrast-[1.32] brightness-[0.86] drop-shadow-[0_22px_48px_rgba(0,0,0,0.9)]"
            />
          </div>
          {/* Subtle dark studio vignette across lower chest so [ START A PROJECT ] & [ GET IN TOUCH ] pop cleanly */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[36%] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 38% 88% at 52% 100%, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0.4) 55%, transparent 100%)'
            }}
          />
        </div>

        {/* CARD 6: Bottom-Right Foreground Card ("i'm James Holt / and i make / ideas work" spread, z-[22]) */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-12 gap-1 w-[175px] lg:w-[250px] aspect-[16/10] bg-[#121417] border border-black/40 p-1 shadow-[0_22px_48px_rgba(0,0,0,0.9)] absolute right-[6%] lg:right-[15.5%] bottom-[16px] sm:bottom-[20px] lg:bottom-[24px] z-[22]"
        >
          <div className="col-span-7 bg-[#f5f4f0] text-[#111315] p-2 flex flex-col justify-between relative overflow-hidden">
            <div className="font-display text-[7px] lg:text-[9px] font-semibold leading-[1.15] tracking-tight space-y-0.5">
              <div className="flex justify-between">
                <span>i&apos;m</span>
                <span>Reinhard</span>
              </div>
              <div className="flex justify-between">
                <span>and i</span>
                <span>make</span>
              </div>
              <div className="flex justify-between">
                <span>ideas</span>
                <span>work</span>
              </div>
            </div>
            {/* Center portrait silhouette block */}
            <div className="w-9 lg:w-12 h-9 lg:h-12 mx-auto bg-[#16191c] overflow-hidden rounded-xs">
              <img
                src="/portrait-nobg.png"
                alt=""
                loading="lazy"
                className="w-full h-full object-cover object-top grayscale contrast-150 brightness-75"
              />
            </div>
            <div className="flex items-end justify-between text-[4px] font-mono uppercase tracking-wider text-black/65">
              <span>CREATIVE DIRECTION</span>
              <span>2025</span>
            </div>
          </div>
          <div className="col-span-5 bg-[#f5f4f0] text-black p-1.5 flex flex-col justify-between">
            <div className="space-y-0.5">
              <div className="w-full h-[2px] bg-black/70" />
              <div className="w-4/5 h-[2px] bg-black/40" />
              <div className="w-3/5 h-[2px] bg-black/30" />
            </div>
            <div className="grid grid-cols-2 gap-0.5 h-[42%]">
              <div className="bg-[#181a1d]" />
              <div className="bg-[#2a2e33]" />
            </div>
            <div className="h-[22%] bg-[#14171a]" />
          </div>
        </div>

        {/* Chest Micro-Links Over Portrait ([ START A PROJECT ] & [ GET IN TOUCH ], z-[24]) */}
        <div className="absolute inset-x-0 bottom-[38px] sm:bottom-[48px] lg:bottom-[54px] z-[24] flex items-center justify-center gap-8 sm:gap-14">
          <a
            href="#contact"
            className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-white/90 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] transition-colors"
          >
            [ START A PROJECT ]
          </a>
          <a
            href="#contact"
            className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-white/90 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] transition-colors"
          >
            [ GET IN TOUCH ]
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {softwareSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group border border-white/15 hover:border-white/35 bg-white/[0.02] hover:bg-white/[0.05] px-3 py-2.5 flex items-center justify-between gap-2 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <SoftwareIcon code={skill.code} />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white truncate">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[8.5px] text-white/45 shrink-0">
                    [{skill.code}]
                  </span>
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
