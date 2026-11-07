import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
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
  const { personalInfo, softwareSkills } = portfolioData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section
      id="process"
      className="relative w-full bg-ink border-b border-white/10 overflow-hidden transition-colors duration-300"
    >
      {/* 1. UPPER PHILOSOPHY STATEMENT WITH FLANKING EDGE-TO-EDGE HAIRLINES & STACKED SQUARES */}
      <div className="relative flex items-center justify-between w-full pt-20 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 lg:pb-3 z-20">
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
          <h2 className="font-display font-normal uppercase text-[clamp(1.2rem,3.4vw,3.35rem)] leading-[1.08] tracking-[-0.02em]">
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
      <div className="spread-card-stage relative w-full h-[470px] sm:h-[600px] lg:h-[670px] mt-1 sm:-mt-4 lg:-mt-10 overflow-hidden">
        {/* Studio Horizon Backdrop (starts below cap level so cap & upper cards straddle the horizon) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[110px] sm:top-[125px] lg:top-[142px] bottom-0 z-[1] transition-all duration-300"
          style={{
            background: isLight
              ? 'radial-gradient(ellipse 64% 92% at 76% 56%, #ffffff 0%, #dcd9cf 40%, #cbc7bc 70%, #e4e1d7 94%)'
              : 'radial-gradient(ellipse 64% 92% at 76% 56%, #8f969a 0%, #585f63 38%, #1d2124 68%, #080808 92%)'
          }}
        />

        {/* CARD 1: Upper-Left Behind Cap (Larry Fiero 3D Logo Stinger Laptop Mockup) */}
        <div
          aria-hidden="true"
          className="hidden sm:flex flex-col justify-between w-[165px] lg:w-[215px] aspect-[16/10] bg-[#14171a] border border-white/15 p-2 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute left-[18%] lg:left-[29%] top-[46px] lg:top-[52px] z-[14] overflow-hidden"
        >
          <div className="relative w-full h-[78%] bg-[#0b0d0f] border border-white/15 overflow-hidden flex flex-col justify-between p-2">
            <img
              src="/projects/larry-intro-thumb.jpg"
              alt="Larry Fiero 3D Logo Stinger"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />
            <span className="relative z-10 font-display text-[10px] lg:text-[12px] tracking-[0.18em] uppercase text-white font-semibold pl-1 pt-0.5">
              LARRY FIERO
            </span>
            <div className="relative z-10 flex items-center justify-between text-[5px] font-mono text-white/75 tracking-wider">
              <span>[ 03 // 3D INTRO ]</span>
              <span>2025</span>
            </div>
          </div>
          {/* Laptop base keyboard strip */}
          <div className="w-[88%] mx-auto h-[16%] bg-gradient-to-b from-[#2a2e33] to-[#15181b] rounded-b-xs border-t border-white/20" />
        </div>

        {/* CARD 2: Upper-Right Behind Cap (Sacred Heart Chronicles Pixel Art 2-Page Spread) */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-12 gap-1 w-[165px] lg:w-[215px] aspect-[16/10] bg-[#16191c] border border-white/15 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute right-[18%] lg:right-[34%] top-[42px] lg:top-[46px] z-[14] overflow-hidden"
        >
          <div className="col-span-8 bg-[#e5e4df] relative overflow-hidden flex flex-col justify-between p-1.5">
            <img
              src="/projects/graphics-shc-facade.png"
              alt="Sacred Heart Chronicles Pixel Art"
              loading="lazy"
              className="absolute inset-0 w-full h-[72%] object-cover grayscale contrast-125"
            />
            <div className="relative z-10 mt-auto bg-white/95 text-black p-1 shadow-xs">
              <p className="font-display text-[6.5px] font-bold uppercase leading-none truncate">
                SACRED HEART
              </p>
              <p className="font-mono text-[4.5px] text-black/75 uppercase tracking-wider pt-0.5">
                [ 04 // PIXEL ART ]
              </p>
            </div>
          </div>
          <div className="col-span-4 bg-[#f5f4f0] text-black p-1 flex flex-col justify-between overflow-hidden">
            <div className="h-[52%] w-full overflow-hidden border border-black/10">
              <img
                src="/projects/graphics-shc-lirc.png"
                alt="SHC Interior"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="space-y-0.5 pt-0.5">
              <div className="w-full h-[2px] bg-black/70" />
              <div className="w-4/5 h-[1.5px] bg-black/45" />
              <div className="font-mono text-[4px] uppercase text-black/60 pt-0.5">
                CAMPUS · 2024
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Mid-Left (Dhenyhos Resort Commercial Menu 2-Page Spread) */}
        <div
          aria-hidden="true"
          className="hidden md:grid grid-cols-2 gap-1 w-[155px] lg:w-[192px] aspect-[16/10] bg-[#14171a] border border-white/15 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute left-[6%] lg:left-[12.5%] top-[230px] lg:top-[270px] z-[14]"
        >
          <div className="bg-[#f4f3ef] text-black flex flex-col justify-between overflow-hidden">
            <div className="h-[62%] w-full bg-[#1a1d20] overflow-hidden">
              <img
                src="/projects/graphics-dhenyhos-menu.jpg"
                alt="Dhenyhos Resort Menu"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="p-1">
              <p className="font-display text-[8px] lg:text-[9.5px] font-bold tracking-tight leading-none text-black truncate">
                DHENYHOS
              </p>
              <p className="font-mono text-[4.5px] text-black/65 uppercase tracking-wider pt-0.5">
                [ 04 // MENU ]
              </p>
            </div>
          </div>
          <div className="bg-[#f4f3ef] text-black p-1 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="font-mono text-[5px] font-semibold text-black uppercase tracking-wider">
                COMMERCIAL
              </div>
              <div className="w-full h-[1.5px] bg-black/60" />
              <div className="w-4/5 h-[1.5px] bg-black/40" />
              <div className="w-3/5 h-[1.5px] bg-black/25" />
            </div>
            <div className="flex items-center justify-between font-mono text-[4.5px] text-black/60 border-t border-black/15 pt-1">
              <span>RESORT</span>
              <span>2024</span>
            </div>
          </div>
        </div>

        {/* CARD 4: Mid-Right (Creator Reel Short Video Editorial Spread) */}
        <div
          aria-hidden="true"
          className="hidden md:grid grid-cols-2 gap-1 w-[170px] lg:w-[222px] aspect-[16/10] bg-[#121417] border border-white/15 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute right-[6%] lg:right-[16.5%] top-[255px] lg:top-[305px] z-[14]"
        >
          <div className="bg-[#f4f3ef] text-black flex flex-col justify-between relative overflow-hidden">
            <div className="h-[62%] w-full bg-[#181b1e] overflow-hidden relative">
              <img
                src="/projects/final-video-thumb.jpg"
                alt="Creator Reel"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <p className="absolute left-1 bottom-1 font-display text-[7.5px] lg:text-[9px] font-semibold text-white">
                CREATOR REEL
              </p>
            </div>
            <div className="p-1 flex items-end justify-between font-mono text-[4.5px] text-black/70">
              <span>[ 03 // SHORT ]</span>
              <span>2025</span>
            </div>
          </div>
          <div className="bg-[#f4f3ef] text-black flex flex-col justify-between overflow-hidden p-1">
            <div className="h-[52%] w-full overflow-hidden border border-black/10">
              <img
                src="/projects/yanong-thumb.jpg"
                alt="Yanong Video"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="space-y-0.5 pt-1">
              <div className="font-mono text-[4.5px] font-medium text-black uppercase">
                DIRECTING & CUT
              </div>
              <div className="w-full h-[1.5px] bg-black/60" />
              <div className="w-3/4 h-[1.5px] bg-black/40" />
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

        {/* CARD 5: Bottom-Left Nestled Between Tapes (One-Way ANOVA 2D Animation Spread, z-[15]) */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-12 gap-1 w-[160px] lg:w-[214px] aspect-[16/10] bg-[#14171a] border border-white/20 p-1 shadow-[0_18px_38px_rgba(0,0,0,0.85)] absolute left-[6%] lg:left-[13.5%] bottom-[42px] sm:bottom-[50px] lg:bottom-[56px] z-[15]"
        >
          <div className="col-span-7 relative bg-[#1b1e22] overflow-hidden flex items-end p-1.5">
            <img
              src="/projects/cabe-final-proj-thumb.jpg"
              alt="One-Way ANOVA 2D Animation"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <span className="relative z-10 font-display text-[11px] lg:text-[13px] font-bold uppercase leading-none text-white tracking-tight">
              ANOVA
            </span>
          </div>
          <div className="col-span-5 bg-[#f4f3ef] text-black p-1.5 flex flex-col justify-between">
            <div className="space-y-0.5">
              <p className="font-display text-[6.5px] font-bold uppercase leading-none text-black">
                2D MOTION
              </p>
              <p className="font-mono text-[4.5px] text-black/70 uppercase">
                STATISTICS
              </p>
            </div>
            <div className="space-y-0.5">
              <div className="w-full h-[1.5px] bg-black/60" />
              <div className="w-3/4 h-[1.5px] bg-black/40" />
            </div>
            <div className="font-mono text-[4.5px] text-black/60 uppercase">
              [ 02 // 2024 ]
            </div>
          </div>
        </div>

        {/* CENTER PORTRAIT CUTOUT (Large close-up chest-to-head crop rising from bottom, z-[18], solid bottom blocking tapes) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-[18] mx-auto w-[min(98vw,780px)] sm:w-[min(92vw,900px)] lg:w-[1020px] overflow-hidden flex items-start justify-center">
          <div className="relative w-full h-[182%] scale-x-[1.1] translate-y-[4%] sm:translate-y-[0%] lg:-translate-y-[4.5%] translate-x-[1%] flex items-start justify-center origin-top">
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

        {/* CARD 6: Bottom-Right Foreground Card (PSITS Region 11 Champion Award Spread, z-[22]) */}
        <div
          aria-hidden="true"
          className="hidden sm:grid grid-cols-12 gap-1 w-[175px] lg:w-[250px] aspect-[16/10] bg-[#121417] border border-black/40 p-1 shadow-[0_22px_48px_rgba(0,0,0,0.9)] absolute right-[6%] lg:right-[15.5%] bottom-[16px] sm:bottom-[20px] lg:bottom-[24px] z-[22]"
        >
          <div className="col-span-7 bg-[#f5f4f0] text-[#111315] p-2 flex flex-col justify-between relative overflow-hidden">
            <div className="font-display text-[7px] lg:text-[8.5px] font-semibold leading-[1.15] tracking-tight space-y-0.5">
              <div className="flex justify-between">
                <span>PSITS R11</span>
                <span>CHAMPION</span>
              </div>
              <div className="flex justify-between text-black/75">
                <span>BEST DIRECTOR</span>
                <span>& EDIT</span>
              </div>
            </div>
            {/* Center award thumbnail preview */}
            <div className="w-12 lg:w-16 h-8 lg:h-11 mx-auto bg-[#16191c] overflow-hidden border border-black/20">
              <img
                src="/projects/cert-5.jpg"
                alt="PSITS Champion Award"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="flex items-end justify-between text-[4.5px] font-mono uppercase tracking-wider text-black/75">
              <span>[ 05 // AWARD ]</span>
              <span>2025</span>
            </div>
          </div>
          <div className="col-span-5 bg-[#f5f4f0] text-black p-1.5 flex flex-col justify-between">
            <div className="h-[46%] w-full overflow-hidden border border-black/15">
              <img
                src="/projects/cert-11.png"
                alt="Best Research Project Award"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div className="space-y-0.5 pt-0.5">
              <div className="font-mono text-[4.5px] uppercase font-semibold text-black leading-tight">
                RESEARCH AWARD
              </div>
              <div className="font-mono text-[4px] uppercase text-black/60">
                COR JESU COLLEGE
              </div>
            </div>
            <div className="font-mono text-[4px] uppercase text-black/50 border-t border-black/15 pt-0.5">
              REINHARD DEMOCRITO
            </div>
          </div>
        </div>

        {/* Chest Micro-Links Over Portrait ([ START A PROJECT ] & [ GET IN TOUCH ], z-[24]) */}
        <div className="absolute inset-x-0 bottom-[30px] sm:bottom-[48px] lg:bottom-[54px] z-[24] flex items-center justify-center gap-8 sm:gap-14">
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

      {/* 3. COMPACT TOOLKIT & SOFTWARE BAR */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 py-14 sm:py-16">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <DoubleSquare />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/70">
              TOOLKIT &amp; SOFTWARE
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
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
      </div>
    </section>
  );
};
