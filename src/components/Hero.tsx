import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { renderCurvedCylinder, useCurvedFilmstrip } from './CurvedFilmstrip';
import { Portrait } from './Portrait';
import { DoubleSquare } from './SectionLabel';

const TAPE_ITEMS = [
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR',
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR',
  'TURNING COMPLEXITY INTO CLARITY',
  'CREATIVE DIRECTOR'
];

const BASE_SPEED = -0.24;

export const Hero: React.FC = () => {
  const { personalInfo } = portfolioData;
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);

  const angleRef = useRef(18);
  const velocityRef = useRef(BASE_SPEED);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastXRef = useRef(0);

  const atlasRef = useCurvedFilmstrip({
    frontCanvasRef,
    backCanvasRef,
    angleRef
  });

  useEffect(() => {
    let rafId = 0;
    const animate = () => {
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

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        isHoveredRef.current = false;
      }}
      className="relative h-[100svh] min-h-[700px] max-h-[1000px] w-full overflow-hidden flex flex-col justify-between select-none bg-[#080808] cursor-grab active:cursor-grabbing"
    >
      {/* UPPER STAGE (above the solid pitch-black bottom bar) */}
      <div className="relative flex-1 w-full overflow-hidden">
        {/* BASE LAYER (z-0): Pitch-black (#080808) negative-space void on left + studio rim glow on right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 84% at 76% 46%, #9ea5a8 0%, #5c6468 34%, #1e2326 62%, #080808 88%), radial-gradient(circle at 12% 84%, rgba(135,142,146,0.22) 0%, transparent 42%), #080808'
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(102deg,#080808_0%,rgba(8,8,8,0.9)_36%,rgba(8,8,8,0.28)_58%,transparent_78%)]"
        />

        {/* LEFT / TOP EDITORIAL TYPOGRAPHY HIERARCHY (z-20 so always crisp and never covered on mobile) */}
        <div className="relative z-20 max-w-[1400px] w-full h-full mx-auto px-5 sm:px-12 lg:pl-12 2xl:pl-24 pt-20 sm:pt-24 lg:pt-28 pb-6 flex flex-col justify-start lg:justify-center pointer-events-none">
          <div className="w-full lg:w-[48%] text-left">
            {/* Main Headline: Clean, formal left-aligned bold all-caps sans-serif */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display font-semibold uppercase text-white text-[2.2rem] sm:text-[3.25rem] lg:text-[clamp(3.25rem,6.2vw,5.6rem)] leading-[1.04] tracking-[-0.03em]"
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
              className="mt-4 sm:mt-8 lg:mt-10 space-y-4 sm:space-y-8 lg:space-y-10 pointer-events-auto"
            >
              <p className="font-mono text-[9.5px] sm:text-[12px] uppercase tracking-[0.13em] sm:tracking-[0.14em] text-white/80 leading-[1.6] sm:leading-[1.7] max-w-[315px] sm:max-w-[440px]">
                A SELECTION OF IDENTITY SYSTEMS, VIDEO EDITING, AND CREATIVE DIRECTION DEVELOPED FOR
                FOUNDERS, CREATORS, AND AMBITIOUS STORIES ACROSS DIVERSE MEDIUMS.
              </p>

              <div className="flex items-center gap-5 sm:gap-12 pt-0.5 sm:pt-1 whitespace-nowrap">
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

      {/* SOLID PITCH-BLACK BOTTOM FLOOR BAR */}
      <div className="relative z-[15] h-8 sm:h-14 lg:h-16 w-full bg-[#080808] shrink-0" />

      {/* UNIFIED RIGHT-SIDE 3D STAGE (1000x860 aspect lock scaled for mobile bottom half & desktop right half) */}
      <div
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        className="pointer-events-none absolute bottom-0 top-auto w-[138vw] max-w-[550px] right-[-18vw] sm:w-[86vw] sm:max-w-[740px] sm:right-[0vw] lg:w-auto lg:max-w-none lg:h-full lg:top-0 lg:bottom-0 lg:right-[-3%] xl:right-[0%] 2xl:right-[5%] aspect-[1000/860]"
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
          className="absolute left-[-1.5%] top-[2%] w-[88%] bottom-[6.8%] z-10 overflow-hidden"
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
    </section>
  );
};
