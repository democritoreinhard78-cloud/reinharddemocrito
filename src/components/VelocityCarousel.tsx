import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimationFrame
} from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Pause, Compass } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface VelocityCarouselProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const VelocityCarousel: React.FC<VelocityCarouselProps> = ({
  projects,
  onSelectProject,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const baseVelocity = -0.8; // Natural drift to the left
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Repeat items so the carousel scrolls seamlessly without blank space
  const items = [...projects, ...projects, ...projects, ...projects];

  const baseX = useMotionValue(0);
  const smoothVelocity = useSpring(0, { damping: 50, stiffness: 400 });
  
  // Transform baseX with wrapping
  // Each card is ~380px wide + 24px gap = 404px per item.
  // One cycle of 6 items is ~2424px.
  const cycleWidth = Math.max(projects.length * 404, 1600);
  
  const x = useTransform(baseX, (v) => {
    // Keep baseX strictly wrapped within [-cycleWidth, 0]
    const wrapped = ((v % cycleWidth) - cycleWidth) % cycleWidth;
    return `${wrapped}px`;
  });

  // Animation frame loop
  useAnimationFrame((_, delta) => {
    if (isPaused || isDraggingRef.current) return;

    // Standard constant drift + velocity boost
    let moveBy = (baseVelocity + smoothVelocity.get()) * (delta / 16);
    baseX.set(baseX.get() + moveBy);
  });

  // Handle horizontal mouse wheel scrolling to control velocity
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // If user scrolls horizontally or vertically with shift
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        const delta = e.deltaX || e.deltaY;
        baseX.set(baseX.get() - delta * 0.8);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [baseX]);

  const handlePrev = () => {
    baseX.set(baseX.get() + 420);
  };

  const handleNext = () => {
    baseX.set(baseX.get() - 420);
  };

  return (
    <div className="relative w-full overflow-hidden py-4 select-none" ref={containerRef}>
      
      {/* Velocity Control Bar */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:12s]" />
          <span className="hidden sm:inline">VELOCITY STREAM · DRAG OR GLIDE</span>
          <span className="sm:hidden">DRAG TO EXPLORE</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Pause / Resume */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-full border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer"
            title={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
            aria-label="Toggle autoplay"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Directional Nudge Buttons */}
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer"
            title="Previous"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-slate-800 bg-slate-900/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer"
            title="Next"
            aria-label="Next Project"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Edge Vignette Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#07090d] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#07090d] to-transparent z-20 pointer-events-none" />

      {/* Marquee Track with Drag Momentum */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDrag={(_, info) => {
          // Adjust velocity dynamically based on drag
          baseX.set(baseX.get() + info.delta.x);
        }}
        onDragEnd={(_, info) => {
          isDraggingRef.current = false;
          // Apply residual fling velocity
          smoothVelocity.set(info.velocity.x * 0.05);
          setTimeout(() => smoothVelocity.set(0), 1200);
        }}
        style={{ x }}
        className="flex items-center gap-6 cursor-grab active:cursor-grabbing w-max py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {items.map((project, idx) => (
          <motion.div
            key={`${project.id}-${idx}`}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.25 }}
            onClick={() => onSelectProject(project)}
            className="group relative w-[290px] sm:w-[360px] lg:w-[400px] shrink-0 bg-[#0b0f16] border border-slate-800/80 hover:border-cyan-500/70 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] flex flex-col"
          >
            {/* Image Preview Container */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f16] via-transparent to-transparent opacity-80" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-cyan-400">
                {project.category}
              </div>

              {/* View Arrow Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/80 flex items-center justify-center transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card Metadata */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2.5">
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {project.year} · FEATURED WORK
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 font-display">
                  {project.title}
                </h3>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
