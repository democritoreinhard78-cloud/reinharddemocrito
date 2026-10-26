import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  image: string;
  video?: string;
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
  // 01. DIRECTING (6 Works)
  {
    code: '01',
    categoryId: 'directing',
    categoryLabel: 'Directing',
    client: 'BRAND LAUNCH FILM',
    discipline: 'DIRECTION & EDITING',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
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
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
    description:
      'High-contrast commercial direction focusing on tactile product lighting, deliberate camera movement, and atmospheric sound design.'
  },
  {
    code: '03',
    categoryId: 'directing',
    categoryLabel: 'Directing',
    client: 'DOCUMENTARY SHORT',
    discipline: 'DIRECTION & SOUND',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=85',
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
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85',
    description:
      'Multi-scene campaign film directed with a focus on human connection, visual rhythm, and cohesive art direction.'
  },
  {
    code: '05',
    categoryId: 'directing',
    categoryLabel: 'Directing',
    client: 'NOCTURNE NARRATIVE',
    discipline: 'WRITING & DIRECTING',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
    description:
      'Moody narrative short film exploring urban solitude through anamorphic framing, practical neon lighting, and deliberate pacing.'
  },
  {
    code: '06',
    categoryId: 'directing',
    categoryLabel: 'Directing',
    client: 'SOLARIS LOOKBOOK FILM',
    discipline: 'FASHION DIRECTION',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=85',
    description:
      'Dynamic seasonal fashion film combining choreographed camera movement, outdoor natural light, and rhythmic editorial cuts.'
  },

  // 02. MOTION GRAPHICS & 2D ANIMATION (6 Works)
  {
    code: '07',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'STATISTICS: ONE-WAY ANOVA',
    discipline: '2D ANIMATION & STORYTELLING',
    year: '2024',
    image: '/projects/cabe-final-proj-thumb.jpg',
    video: '/projects/CABE%20FINAL%20PROJ.mp4',
    description:
      'Educational 2D animated explainer breaking down One-Way ANOVA statistical analysis with custom character rigging, illustrated environments, and motion design.'
  },
  {
    code: '08',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'KINETIC TYPE REEL',
    discipline: 'MOTION GRAPHICS',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
    description:
      'Beat-synced kinetic typography and modular Swiss grid motion graphics crafted in After Effects for digital brand campaigns.'
  },
  {
    code: '09',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'PULSE VISUALIZER',
    discipline: 'MOTION & 2D FX',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
    description:
      'Audio-reactive 2D HUD systems, data-driven motion overlays, and seamless loop animations for music and tech releases.'
  },
  {
    code: '10',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'VECTOR FLOW SERIES',
    discipline: '2D CHARACTER & RIG',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=85',
    description:
      'Expressive 2D character rigging, shape-layer morphing, and playful storytelling sequences built for social and web platforms.'
  },
  {
    code: '11',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'CHROMA WAVE LOOP',
    discipline: 'ABSTRACT MOTION',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85',
    description:
      'Psychedelic optical wave loops and procedural 2D shader animations designed for stage backdrops and digital exhibitions.'
  },
  {
    code: '12',
    categoryId: 'motion-2d',
    categoryLabel: 'Motion Graphics & 2D Animation',
    client: 'UI MOTION SYSTEM',
    discipline: 'PRODUCT ANIMATION',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85',
    description:
      'Micro-interaction library, animated dashboard walkthroughs, and slick UI motion components for SaaS product launches.'
  },

  // 03. SHORT VIDEO CONTENTS (6 Works)
  {
    code: '13',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'EDITORIAL REEL',
    discipline: 'SHORT-FORM PACING',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85',
    description:
      'High-retention vertical edit combining punchy hooks, dynamic speed ramps, custom captions, and crisp sound design.'
  },
  {
    code: '14',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'CREATOR HIGHLIGHT',
    discipline: 'RETENTION EDITING',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=85',
    description:
      'Short-form storytelling tailored for Reels, TikTok, and YouTube Shorts with clean visual callouts and seamless B-roll integration.'
  },
  {
    code: '15',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'PRODUCT DROP CUT',
    discipline: 'SOCIAL VIDEO ADS',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
    description:
      'Fast-paced 30-second commercial cut engineered for social conversion with rhythmic cuts and bold typography.'
  },
  {
    code: '16',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'EVENT RECAP SHORT',
    discipline: 'FAST-CUT STORY',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=85',
    description:
      'High-energy highlight reel capturing live event atmosphere through match-cuts, riser SFX, and stylized color grading.'
  },
  {
    code: '17',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'ATHLETE PROMO REEL',
    discipline: 'SPORTS SHORT CUT',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1000&q=85',
    description:
      'Adrenaline-fueled sports training reel featuring whip-pans, impact sound effects, and frame-accurate beat cutting.'
  },
  {
    code: '18',
    categoryId: 'short-video',
    categoryLabel: 'Short Video Contents',
    client: 'FOUNDER STORY REEL',
    discipline: 'PODCAST & TALKING HEAD',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85',
    description:
      'Engaging executive storytelling clip enhanced with animated lower-thirds, kinetic subtitles, and contextual B-roll overlays.'
  },

  // 04. GRAPHICS (6 Works)
  {
    code: '19',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'IDENTITY SYSTEM',
    discipline: 'VISUAL DESIGN',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    description:
      'Cohesive visual identity system featuring custom typography rules, brand marks, and grid-based key visuals.'
  },
  {
    code: '20',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'PORTRAIT SERIES',
    discipline: 'ART DIRECTION & GRAPHICS',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=85',
    description:
      'Swiss-brutalist poster series and social media carousel graphics built in Photoshop and Canva with bold editorial hierarchy.'
  },
  {
    code: '21',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'AUREL VANCE',
    discipline: 'EDITORIAL DESIGN',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85',
    description:
      'Print and digital lookbook layouts balancing high-contrast photography with structured micro-typography.'
  },
  {
    code: '22',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'RENOVA DECK',
    discipline: 'PRESENTATION DESIGN',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=85',
    description:
      'Executive pitch deck and visual presentation system crafted in PowerPoint and Canva for investor storytelling.'
  },
  {
    code: '23',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'SOCIAL CAMPAIGN KIT',
    discipline: 'SOCIAL MEDIA GRAPHICS',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
    description:
      'Modular social media template suite, announcement graphics, and ad creatives built for consistent multi-channel branding.'
  },
  {
    code: '24',
    categoryId: 'graphics',
    categoryLabel: 'Graphics',
    client: 'FESTIVAL KEY VISUAL',
    discipline: 'POSTER & MERCH DESIGN',
    year: '2023',
    image:
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=85',
    description:
      'Bold typographic poster artwork, stage banners, and digital pass graphics for a contemporary music and arts event.'
  },

  // 05. INTRO VIDEOS (6 Works)
  {
    code: '25',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'NARCRAFT OPENER',
    discipline: 'LOGO STINGER & INTRO',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=85',
    description:
      'Custom signature logo reveal and dark-room sonic stinger establishing immediate brand recognition in the first 5 seconds.'
  },
  {
    code: '26',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'CHANNEL INTRO SEQ',
    discipline: 'TITLE OPENER',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1000&q=85',
    description:
      'Dynamic YouTube and creator channel intro sequence combining layered cut-outs, kinetic titles, and custom sound hits.'
  },
  {
    code: '27',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'AVENOR STUDIO INTRO',
    discipline: 'BROADCAST OPENER',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85',
    description:
      'Editorial title sequence and show package opener with lower-thirds, transition mattes, and atmospheric pacing.'
  },
  {
    code: '28',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'CINEMATIC CUT INTRO',
    discipline: 'SHOWREEL OPENER',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=85',
    description:
      'High-impact showreel and event intro video built to command attention with bold countdown frames and rapid montage cuts.'
  },
  {
    code: '29',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'PODCAST SHOW OPENER',
    discipline: 'AUDIO-VISUAL INTRO',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=85',
    description:
      'Custom animated title sequence and voiceover bumper introducing episodes with a memorable visual signature.'
  },
  {
    code: '30',
    categoryId: 'intro-videos',
    categoryLabel: 'Intro Videos',
    client: 'ESPORTS TEAM OPENER',
    discipline: 'GAMING & STREAM INTRO',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85',
    description:
      'High-voltage 3D-feel title card, glitch transitions, and bass-heavy sound design for tournament broadcasts.'
  }
];

const SLOTS = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

interface CategoryCoverflowProps {
  cards: CaseStudyCard[];
  onSelectCard: (card: CaseStudyCard) => void;
}

/**
 * Exact 3D Perspective Coverflow Carousel matching https://forme.framer.media/:
 * - Outer stage with `perspective: 400px * scale` and `transform-style: preserve-3d` center anchor
 * - Center card (`d = 0`): `500×285`, `translateX(0) translateZ(0) rotateY(0deg)`
 * - Side cards (`|d| >= 1`): `320×280`, `translateX(±(474 + (|d|-1)*326.4)) translateZ(-|d|*200) rotateY(±min(90, |d|*35)deg)`
 * - Continuous 60fps/120fps spring-lerp sliding animation (`requestAnimationFrame`) driven by
 *   mouse wheel scroll, drag/swipe, side-card click, or PREV/NEXT buttons.
 */
const CategoryCoverflow: React.FC<CategoryCoverflowProps> = ({ cards, onSelectCard }) => {
  const len = cards.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Continuous floating-point scroll position for silky 60/120fps 3D sliding
  const targetPosRef = useRef<number>(0);
  const currentPosRef = useRef<number>(0);
  const [renderPos, setRenderPos] = useState<number>(0);
  const [scaleFactor, setScaleFactor] = useState<number>(1);

  // Drag / pointer tracking
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartTargetRef = useRef<number>(0);
  const pointerMovedRef = useRef<boolean>(false);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Responsive scale factor so the 400px perspective geometry scales proportionally on mobile/tablet
  useEffect(() => {
    const updateScale = () => {
      const w = stageRef.current?.clientWidth ?? window.innerWidth;
      if (w < 520) {
        setScaleFactor(0.5);
      } else if (w < 768) {
        setScaleFactor(0.68);
      } else if (w < 1100) {
        setScaleFactor(0.84);
      } else {
        setScaleFactor(1);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Continuous requestAnimationFrame loop interpolating currentPos -> targetPos
  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      const diff = targetPosRef.current - currentPosRef.current;
      if (Math.abs(diff) > 0.0008) {
        currentPosRef.current += diff * 0.11;
        setRenderPos(currentPosRef.current);
      } else if (currentPosRef.current !== targetPosRef.current) {
        currentPosRef.current = targetPosRef.current;
        setRenderPos(currentPosRef.current);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const stepBy = useCallback((delta: number) => {
    targetPosRef.current = Math.round(targetPosRef.current + delta);
  }, []);

  // Mouse wheel & trackpad continuous scroll with smooth snap-to-card
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(primaryDelta) < 2) return;

      e.preventDefault();

      // Advance target position proportionally to wheel/trackpad delta
      const step = Math.max(-1.2, Math.min(1.2, primaryDelta * 0.0055));
      targetPosRef.current += step;

      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        targetPosRef.current = Math.round(targetPosRef.current);
      }, 140);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      clearTimeout(snapTimerRef.current);
    };
  }, []);

  const startDrag = (clientX: number) => {
    isDraggingRef.current = true;
    pointerMovedRef.current = false;
    dragStartXRef.current = clientX;
    dragStartTargetRef.current = targetPosRef.current;
    clearTimeout(snapTimerRef.current);
  };

  const moveDrag = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const dx = clientX - dragStartXRef.current;
    if (Math.abs(dx) > 6) {
      pointerMovedRef.current = true;
    }
    // Dragging/swiping left (dx < 0) slides forward (+), right (dx > 0) slides backward (-)
    targetPosRef.current = dragStartTargetRef.current - dx / (170 * scaleFactor);
  };

  const endDrag = (clientX?: number) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const dx = clientX !== undefined ? clientX - dragStartXRef.current : 0;
    const startRounded = Math.round(dragStartTargetRef.current);
    const currentRounded = Math.round(targetPosRef.current);

    // If user flick-swiped left or right at least 22px on mobile/desktop, advance at least 1 card
    if (Math.abs(dx) >= 22 && currentRounded === startRounded) {
      targetPosRef.current = startRounded + (dx < 0 ? 1 : -1);
    } else {
      targetPosRef.current = currentRounded;
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return; // Handled by native touch events for mobile reliability
    startDrag(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    moveDrag(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    endDrag(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    startDrag(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    moveDrag(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    endDrag(touch ? touch.clientX : undefined);
  };

  const baseIndex = Math.round(renderPos);
  const frac = renderPos - baseIndex; // in [-0.5, +0.5]
  const activeIdx = ((baseIndex % len) + len) % len;
  const activeCard = cards[activeIdx] ?? cards[0];

  return (
    <div ref={containerRef} className="space-y-4">
      {/* 3D PERSPECTIVE COVERFLOW STAGE (Exact forme.framer.media 400px perspective geometry) */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => endDrag()}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'touch') endDrag(e.clientX);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => endDrag()}
        style={{
          perspective: `${400 * scaleFactor}px`,
          touchAction: 'pan-y'
        }}
        className="case-study-artwork relative w-full h-[250px] sm:h-[340px] lg:h-[420px] flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
      >
        {/* Mobile On-Stage Slide Left / Slide Right Floating Buttons */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            stepBy(-1);
          }}
          aria-label="Slide left (previous project)"
          className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-[1200] w-8 h-8 rounded-full bg-black/75 border border-white/25 text-white flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            stepBy(1);
          }}
          aria-label="Slide right (next project)"
          className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-[1200] w-8 h-8 rounded-full bg-black/75 border border-white/25 text-white flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        {/* Subtle Vertical Grid Lines matching the reference background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-65"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px)',
            backgroundSize: '58px 100%'
          }}
        />

        {/* Soft Atmospheric Mist Glow behind the Left & Right receding wings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 18% 42% at 21% 50%, rgba(205, 222, 232, 0.15) 0%, transparent 75%), radial-gradient(ellipse 18% 42% at 79% 50%, rgba(205, 222, 232, 0.15) 0%, transparent 75%)'
          }}
        />

        {/* Zero-sized 3D Preserve-3D Center Anchor (matches forme.framer.media DOM) */}
        <div
          style={{
            position: 'relative',
            width: 0,
            height: 0,
            transformStyle: 'preserve-3d'
          }}
        >
          {SLOTS.map((slotOffset) => {
            // Continuous 3D offset d from center
            const d = slotOffset - frac;
            const absD = Math.abs(d);
            if (absD >= 7.2) return null;

            const sign = d === 0 ? 0 : d > 0 ? 1 : -1;
            const itemIndex = (((baseIndex + slotOffset) % len) + len) % len;
            const card = cards[itemIndex];

            // Exact forme.framer.media interpolation:
            // Center (d=0): 500x285; Side (|d|>=1): 320x280
            const t = Math.min(1, absD);
            const w = (500 + (320 - 500) * t) * scaleFactor;
            const h = (285 + (280 - 285) * t) * scaleFactor;

            // translateX: 0 -> 474 at |d|=1, then +326.4 per unit of |d|
            const txMag = absD <= 1 ? absD * 474 : 474 + (absD - 1) * 326.4;
            const tx = sign * txMag * scaleFactor;

            // translateZ: -200px per unit of |d|
            const tz = -absD * 200 * scaleFactor;

            // rotateY: 35deg per unit of d, clamped at ±90deg for |d| >= 2.57
            const ry = sign * Math.min(90, absD * 35);

            // Opacity: 1 up to |d|=5, 0.5 at |d|=6, 0 at |d|>=7
            const opacity =
              absD <= 5 ? 1 : absD >= 7 ? 0 : Math.max(0, 1 - (absD - 5) * 0.5);

            // zIndex: 1000 at center, stepping down by 10 per unit
            const zIndex = Math.round(1000 - absD * 10);

            const isCenter = absD < 0.35;

            return (
              <div
                key={slotOffset}
                role="button"
                tabIndex={slotOffset === 0 ? 0 : -1}
                aria-label={`${card.client} — ${card.discipline}`}
                onClick={() => {
                  if (pointerMovedRef.current) return;
                  if (Math.abs(d) < 0.25) {
                    onSelectCard(card);
                  } else {
                    targetPosRef.current = baseIndex + slotOffset;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (slotOffset === 0) {
                      onSelectCard(card);
                    } else {
                      targetPosRef.current = baseIndex + slotOffset;
                    }
                  }
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  transformStyle: 'preserve-3d',
                  width: `${w}px`,
                  height: `${h}px`,
                  marginLeft: `${-w / 2}px`,
                  marginTop: `${-h / 2}px`,
                  zIndex,
                  transform:
                    absD < 0.001
                      ? 'none'
                      : `translateX(${tx.toFixed(1)}px) translateZ(${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg)`
                }}
                className="group cursor-pointer"
              >
                <div
                  style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '10px',
                    opacity
                  }}
                  className="absolute inset-0 overflow-hidden bg-[#121518] shadow-[0_20px_50px_rgba(0,0,0,0.75)] ring-1 ring-white/15"
                >
                  {/* Live Muted Video Preview when Video Card is in Center Slot */}
                  {card.video && isCenter && (
                    <video
                      src={card.video}
                      poster={card.image}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                  )}

                  {/* Editorial Caption Overlay on Center Card */}
                  <div
                    style={{
                      opacity: isCenter ? Math.max(0, 1 - absD * 3) : 0
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3.5 sm:p-5 flex flex-col justify-between pointer-events-none"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-black/65 backdrop-blur-xs border border-white/20 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white">
                        [ {card.code} // {card.year} ]
                      </span>
                      <span className="px-2 py-0.5 bg-[#e7e5dc] text-black font-mono text-[7.5px] sm:text-[8.5px] font-semibold uppercase tracking-[0.18em]">
                        {card.discipline}
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="font-display text-sm sm:text-lg lg:text-xl font-bold uppercase tracking-tight text-white drop-shadow-sm">
                          {card.client}
                        </p>
                        <p className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] text-white/75 line-clamp-1">
                          {card.description}
                        </p>
                      </div>
                      <span className="shrink-0 px-2.5 py-1 bg-white/15 backdrop-blur-xs border border-white/30 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white">
                        {card.video ? '[ ▶ PLAY VIDEO ]' : '[ VIEW ]'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM CAPTION & CAROUSEL CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <DoubleSquare />
          <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] text-white/45">
            [ {activeCard.code} ]
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white truncate">
            {activeCard.client}
          </span>
          <span className="hidden md:inline-block font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/45">
            // {activeCard.discipline}
          </span>
        </div>

        {/* Center Prev / Dots / Next Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => stepBy(-1)}
            aria-label="Previous project in category"
            className="px-2.5 py-1 border border-white/15 hover:border-white/50 font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/75 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>PREV</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-2">
            {cards.map((c, idx) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  let diff = idx - activeIdx;
                  if (diff > len / 2) diff -= len;
                  if (diff < -len / 2) diff += len;
                  targetPosRef.current = baseIndex + diff;
                }}
                aria-label={`Go to ${c.client}`}
                className={`h-1.5 transition-all cursor-pointer ${
                  idx === activeIdx
                    ? 'w-5 bg-white'
                    : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => stepBy(1)}
            aria-label="Next project in category"
            className="px-2.5 py-1 border border-white/15 hover:border-white/50 font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/75 hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>NEXT</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSelectCard(activeCard)}
          className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors shrink-0 cursor-pointer"
        >
          [ SEE DETAILS ]
        </button>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const visibleCategories =
    activeCategory === 'all'
      ? CATEGORIES
      : CATEGORIES.filter((cat) => cat.id === activeCategory);

  const handleSelectCard = (card: CaseStudyCard) => {
    setSelectedProject({
      id: Number(card.code),
      title: card.client,
      category: `${card.categoryLabel} — ${card.discipline}`,
      year: card.year,
      image: card.image,
      video: card.video,
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

        {/* CATEGORIZED 3D COVERFLOW SHOWCASE SECTIONS */}
        <div className="space-y-20 sm:space-y-28">
          {visibleCategories.map((category) => {
            const categoryCards = CASE_STUDY_CARDS.filter(
              (card) => card.categoryId === category.id
            );

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55 }}
                className="space-y-6"
              >
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

                {/* 3D Perspective Coverflow Carousel for this Category */}
                <CategoryCoverflow
                  cards={categoryCards}
                  onSelectCard={handleSelectCard}
                />
              </motion.div>
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
