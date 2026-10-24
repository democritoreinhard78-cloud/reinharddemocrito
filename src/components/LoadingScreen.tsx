import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DoubleSquare } from './SectionLabel';

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
        const diff = Math.floor(Math.random() * 10) + 5;
        const next = Math.min(prev + diff, 100);

        if (next > 75) {
          setStatusText('RENDERING STUDIO STAGE');
        } else if (next > 45) {
          setStatusText('INDEXING SELECTED WORK');
        } else if (next > 20) {
          setStatusText('INITIALIZING TYPOGRAPHY');
        }

        return next;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.65, ease: [0.65, 0, 0.35, 1] }
      }}
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center px-6 select-none overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center space-y-7">
        <DoubleSquare size="md" />

        <div className="text-center space-y-2">
          <h1 className="font-wordmark text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-white">
            NarCraft
          </h1>
          <p className="text-[9px] tracking-[0.28em] text-white/60 uppercase font-mono">
            [ DIRECTOR · VIDEO EDITOR · VISUAL DESIGNER ]
          </p>
        </div>

        <div className="w-full space-y-2.5">
          <div className="relative w-full h-[1px] bg-white/15 overflow-hidden">
            <motion.div
              style={{ width: `${progress}%` }}
              className="h-full bg-white transition-all duration-75"
            />
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.2em] text-white/65 uppercase">
            <span>[ {statusText} ]</span>
            <span className="text-white tabular-nums">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 text-[9px] font-mono tracking-[0.22em] text-white/45 uppercase">
        <span>[ DIGOS CITY, PH ]</span>
        <span>[ PORTFOLIO INDEX ]</span>
      </div>
    </motion.div>
  );
};
