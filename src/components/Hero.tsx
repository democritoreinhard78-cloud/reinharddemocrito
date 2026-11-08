import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { renderCurvedCylinder, useCurvedFilmstrip } from './CurvedFilmstrip';
import { Portrait } from './Portrait';
import { DoubleSquare } from './SectionLabel';
import { ProjectModal } from './ProjectModal';
import type { ProjectItem } from '../types/portfolio';

const SHOWREEL_PROJECT: ProjectItem = {
  id: 0,
  title: 'Video Editing Showreel // Highlights',
  category: 'Video Editing',
  year: '2025',
  video: '/projects/video-editing-highlights.mp4',
  image: '/projects/video-editing-highlights-thumb.jpg',
  description:
    'Official video editing highlight montage showcasing rhythmic cutting, cinematic pacing, dynamic motion sync, color grading, and creative post-production across commercial and narrative works.'
};

const TAPE_ITEMS = [
  'TURNING COMPLEXITY INTO CLARITY',
  'VIDEO EDITOR',
  'TURNING COMPLEXITY INTO CLARITY',
  'POST-PRODUCTION SPECIALIST',
  'TURNING COMPLEXITY INTO CLARITY',
  'VIDEO EDITOR'
];

const BASE_SPEED = -0.24;

export const Hero: React.FC = () => {
  const { personalInfo } = portfolioData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);

  const angleRef = useRef(18);
  const velocityRef = useRef(BASE_SPEED);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastXRef = useRef(0);

  const isVisibleRef = useRef(true);
  const rafIdRef = useRef<number>(0);

  const atlasRef = useCurvedFilmstrip({
    frontCanvasRef,
    backCanvasRef,
    angleRef
  });

  useEffect(() => {
    const startAnimate = () => {
      if (rafIdRef.current) return;

      const animate = () => {
        if (!isVisibleRef.current) {
          rafIdRef.current = 0;
          return;
        }

        if (!isDraggingRef.current) {
          const target = isHoveredRef.current ? 0 : BASE_SPEED;
          velocityRef.current = velocityRef.current * 0.94 + target * 0.06;
          angleRef.current = (angleRef.current + velocityRef.current) % 360;
        }

        if (frontCanvasRef.current && backCanvasRef.current && atlasRef.current) {
          renderCurvedCylinder(
            frontCanvasRef.current,
            backCanvasRef.current,
            atlasRef.current,
            angleRef.current
          );
        }

        rafIdRef.current = requestAnimationFrame(animate);
      };

      rafIdRef.current = requestAnimationFrame(animate);
    };

    const el = sectionRef.current;
    if (!el) {
      startAnimate();
      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimate();
        } else if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = 0;
        }
      },
      { rootMargin: '60px 0px' }
    );
    observer.observe(el);

    if (isVisibleRef.current) {
      startAnimate();
    }

    return () => {
      observer.disconnect();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [atlasRef]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    const deltaAngle = dx * 0.32;
    angleRef.current = (angleRef.current + deltaAngle) % 360;
    velocityRef.current = deltaAngle;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        isHoveredRef.current = false;
      }}
      className={`relative h-[100svh] min-h-[700px] max-h-[1000px] w-full overflow-hidden flex flex-col justify-between select-none cursor-grab active:cursor-grabbing transition-colors duration-300 ${
        isLight ? 'bg-[#f2f0e8]' : 'bg-[#080808]'
      }`}
    >
      {/* UPPER STAGE (above the solid bottom floor bar) */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* BASE LAYER (z-0): Negative-space void on left + studio rim glow on right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-all duration-300"
          style={{
            background: isLight
              ? 'radial-gradient(ellipse 55% 84% at 76% 46%, #ffffff 0%, #d4d1c7 38%, #e4e1d7 66%, #f2f0e8 88%), radial-gradient(circle at 12% 84%, rgba(0,0,0,0.05) 0%, transparent 42%), #f2f0e8'
              : 'radial-gradient(ellipse 55% 84% at 76% 46%, #9ea5a8 0%, #5c6468 34%, #1e2326 62%, #080808 88%), radial-gradient(circle at 12% 84%, rgba(135,142,146,0.22) 0%, transparent 42%), #080808'
          }}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-0 ${
            isLight
              ? 'bg-[linear-gradient(102deg,#f2f0e8_0%,rgba(242,240,232,0.92)_36%,rgba(242,240,232,0.32)_58%,transparent_78%)]'
              : 'bg-[linear-gradient(102deg,#080808_0%,rgba(8,8,8,0.9)_36%,rgba(8,8,8,0.28)_58%,transparent_78%)]'
          }`}
        />

        {/* LEFT / TOP EDITORIAL TYPOGRAPHY HIERARCHY (z-20 so always crisp and never covered on mobile) */}
        <div className="relative z-20 max-w-[1400px] w-full h-full mx-auto px-5 sm:px-12 lg:pl-12 2xl:pl-24 pt-24 sm:pt-24 lg:pt-28 pb-6 flex flex-col justify-start lg:justify-center pointer-events-none">
          <div className="w-full lg:w-[48%] text-left">
            {/* Main Headline: Clean, formal left-aligned bold all-caps sans-serif */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display font-semibold uppercase text-white text-[2.4rem] sm:text-[3.25rem] lg:text-[clamp(3.25rem,6.2vw,5.6rem)] leading-[1.04] tracking-[-0.03em]"
            >
              <span className="block">
                <span className="text-white">WORK </span>
                <span className="text-white/90">THAT</span>
              </span>
              <span className="block">
                <span className="text-white">BEGINS </span>
                <span className="text-white/70">WITH</span>
              </span>
              <span className="block text-white">STRATEGY.</span>
            </motion.h1>

            {/* Subtitle + Bracketed Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-5 sm:mt-8 lg:mt-10 space-y-5 sm:space-y-8 lg:space-y-10 pointer-events-auto"
            >
              <p className="font-sans text-[13px] sm:text-[14.5px] font-normal normal-case tracking-normal text-white/80 leading-relaxed max-w-[315px] sm:max-w-[440px]">
                A selection of identity systems, video editing, and motion post-production developed for
                founders, creators, and ambitious stories across diverse mediums.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 sm:gap-6 pt-0.5 sm:pt-1">
                <button
                  type="button"
                  onClick={() => setIsShowreelOpen(true)}
                  className="px-3.5 sm:px-4 py-2 bg-white text-black font-mono text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] flex items-center gap-2 hover:bg-white/90 active:scale-95 transition-all shadow-[0_4px_22px_rgba(255,255,255,0.22)] cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
                  <span>[ WATCH SHOWREEL // 0:14 ]</span>
                </button>
                <a
                  href="#projects"
                  className="font-mono text-[10px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/90 hover:text-white transition-colors"
                >
                  [ EXPLORE PROJECT ]
                </a>
                <a
                  href="#contact"
                  className="font-mono text-[10px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/90 hover:text-white transition-colors"
                >
                  [ START A PROJECT ]
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FOREGROUND LAYER (z-20): Bottom-Left Diagonal Editorial Tape Motif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 bottom-[22px] sm:bottom-[52px] w-[96vw] sm:w-[49vw] z-20 origin-left"
          style={{ transform: 'rotate(7.4deg)' }}
        >
          <div className="bg-gradient-to-r from-white/75 via-white to-white/90 text-black py-1 sm:py-2 border-y border-black/20 shadow-[0_14px_34px_rgba(0,0,0,0.75)] overflow-hidden">
            <div className="animate-marquee-left flex items-center gap-6 whitespace-nowrap">
              {[...TAPE_ITEMS, ...TAPE_ITEMS].map((txt, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-6 font-mono text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.22em]"
                >
                  <span>{txt}</span>
                  <DoubleSquare dark />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SOLID BOTTOM FLOOR BAR */}
      <div
        className={`relative z-[15] h-8 sm:h-14 lg:h-16 w-full shrink-0 transition-colors duration-300 ${
          isLight ? 'bg-[#f2f0e8]' : 'bg-[#080808]'
        }`}
      />

      {/* UNIFIED RIGHT-SIDE 3D STAGE (1000x860 aspect lock scaled for mobile bottom half & desktop right half) */}
      <div
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        className="pointer-events-none absolute bottom-0 top-auto w-[158vw] max-w-[625px] right-[-28vw] sm:w-[86vw] sm:max-w-[740px] sm:right-[0vw] lg:w-auto lg:max-w-none lg:h-full lg:top-0 lg:bottom-0 lg:right-[-3%] xl:right-[0%] 2xl:right-[5%] aspect-[1000/860]"
      >
        {/* BACK RIBBON LAYER (z-[5], BEHIND SUBJECT): Smoothly curved rear half of the 3D filmstrip */}
        <canvas
          ref={backCanvasRef}
          width={1000}
          height={860}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-[5]"
        />

        {/* MIDDLE LAYER (z-10): SUBJECT CUTOUT (Locked in the exact same 1000x860 coordinate space) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute left-[-1.5%] top-[2%] w-[88%] bottom-8 sm:bottom-14 lg:bottom-16 z-10 overflow-hidden"
        >
          <div className="w-full h-[155%] flex items-start justify-center origin-top">
            <Portrait
              alt={`${fullName} portrait`}
              className="w-full h-full !object-contain !object-top grayscale contrast-[1.26] brightness-[0.94] drop-shadow-[-26px_10px_44px_rgba(0,0,0,0.85)]"
            />
          </div>
        </motion.div>

        {/* FOREGROUND LAYER (z-20, IN FRONT OF SUBJECT): Smoothly curved front half of the 3D filmstrip */}
        <canvas
          ref={frontCanvasRef}
          width={1000}
          height={860}
          className="absolute inset-0 w-full h-full z-20 drop-shadow-[0_24px_38px_rgba(0,0,0,0.85)]"
        />
      </div>

      {isShowreelOpen && (
        <ProjectModal
          project={SHOWREEL_PROJECT}
          onClose={() => setIsShowreelOpen(false)}
          categoryCode="01"
          categoryLabel="Video Editing"
        />
      )}
    </section>
  );
};
