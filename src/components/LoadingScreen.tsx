import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CALIBRATING ENVIRONMENT');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Organic irregular increments to feel like real system initialization
        const diff = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + diff, 100);

        if (next > 75) {
          setStatusText('RENDERING 4K SCENE');
        } else if (next > 45) {
          setStatusText('OPTIMIZING ASSETS & TOKENS');
        } else if (next > 20) {
          setStatusText('INITIALIZING TYPOGRAPHY');
        }

        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.03,
        transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } 
      }}
      className="fixed inset-0 z-[100] bg-[#07090d] flex flex-col items-center justify-center px-6 select-none overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />

      {/* Main Content Box */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center space-y-8">
        
        {/* Monogram / Geometric Visual Accent */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 rounded-full border border-dashed border-cyan-500/30"
          />
          {/* Inner Glowing Core */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/80 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.45)]"
          >
            <span className="font-mono text-xs font-bold text-cyan-300">RD</span>
          </motion.div>
        </div>

        {/* Brand Name Typography */}
        <div className="text-center space-y-1.5">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl font-bold font-display tracking-[0.25em] text-white uppercase"
          >
            Reinhard Democrito
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[10px] tracking-[0.35em] text-slate-400 uppercase font-mono"
          >
            Graphic Designer · Creative Portfolio
          </motion.p>
        </div>

        {/* Loading Progress Bar & Percentage */}
        <div className="w-full space-y-3">
          {/* Track Line */}
          <div className="relative w-full h-[2px] bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.9)] transition-all duration-75"
            />
          </div>

          {/* Subtext info & Percentage Number */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-slate-400">
            <span className="flex items-center space-x-1.5 text-slate-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{statusText}</span>
            </span>
            <span className="text-cyan-400 font-semibold tabular-nums">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Year & Coordinates Note */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 text-[9px] font-mono tracking-widest text-slate-400 uppercase">
        <span>EST. 2026</span>
        <span>EXPERIENCE CURATION</span>
      </div>
    </motion.div>
  );
};
