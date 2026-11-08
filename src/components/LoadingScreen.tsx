import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, ArrowRight } from 'lucide-react';
import { NarCraftLogo } from './NarCraftLogo';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(14.23);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete?.();
    }, 350);
  }, [onComplete]);

  // Attempt autoplay immediately upon mount + attach ended listener & safety fallback timer
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
          });
      }

      const onEnded = () => {
        handleComplete();
      };

      vid.addEventListener('ended', onEnded);

      // Safety timeout: automatically enter portfolio after 15 seconds if video ends or stalls
      const fallbackTimer = setTimeout(() => {
        handleComplete();
      }, 15000);

      return () => {
        vid.removeEventListener('ended', onEnded);
        clearTimeout(fallbackTimer);
      };
    }
  }, [handleComplete]);

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (vid) {
      const cur = vid.currentTime;
      const dur = vid.duration;
      setCurrentTime(cur);
      if (dur && !isNaN(dur) && dur > 0) {
        setDuration(dur);
        // Automatically transition into portfolio when video reaches within 0.25s of end
        if (cur >= dur - 0.25) {
          handleComplete();
        }
      }
    }
  };

  const toggleSound = () => {
    const vid = videoRef.current;
    if (vid) {
      const nextMuted = !isMuted;
      vid.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (vid) {
      if (vid.paused) {
        vid.play();
        setIsPlaying(true);
      } else {
        vid.pause();
        setIsPlaying(false);
      }
    }
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const currentSec = Math.floor(currentTime);
  const totalSec = Math.floor(duration);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.65, ease: [0.65, 0, 0.35, 1] }
      }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      className="fixed inset-0 z-[100] bg-[#050607] flex flex-col justify-between p-4 sm:p-8 lg:p-10 select-none overflow-hidden"
    >
      {/* Subtle Cinematic Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* TOP BAR: Brand Header + Direct Skip Button */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <NarCraftLogo className="w-8 h-8 sm:w-9 sm:h-9 shadow-[0_4px_16px_rgba(0,0,0,0.6)]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-wordmark text-base sm:text-lg font-bold tracking-tight text-white leading-none">
                NarCraft
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shrink-0" />
            </div>
            <p className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-[0.2em] text-white/60">
              REINHARD DEMOCRITO · VIDEO EDITING
            </p>
          </div>
        </div>

        {/* Center label (desktop only) */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/50 border border-white/15 px-3 py-1 bg-white/[0.02]">
          <span>[ 2025 HIGHLIGHT REEL // INTRO ]</span>
        </div>

        {/* Skip to portfolio button */}
        <button
          type="button"
          onClick={handleComplete}
          className="group px-3.5 sm:px-4 py-2 bg-white text-black font-mono text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.2em] inline-flex items-center gap-2 hover:bg-white/85 active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.18)] cursor-pointer"
        >
          <span>[ SKIP INTRO ]</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* CENTER CINEMA STAGE: 16:9 Aspect Video with Brutalist Framing */}
      <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto py-2">
        <div className="relative w-full aspect-video max-h-[62svh] sm:max-h-[68svh] bg-black border border-white/25 shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden group">
          {/* Autoplaying 14s Video */}
          <video
            ref={videoRef}
            src="/projects/video-editing-highlights.mp4"
            autoPlay
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleComplete}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Corner Registration Marks (+) */}
          <span className="pointer-events-none absolute top-2 left-2 font-mono text-[10px] text-white/60 leading-none">
            +
          </span>
          <span className="pointer-events-none absolute top-2 right-2 font-mono text-[10px] text-white/60 leading-none">
            +
          </span>
          <span className="pointer-events-none absolute bottom-2 left-2 font-mono text-[10px] text-white/60 leading-none">
            +
          </span>
          <span className="pointer-events-none absolute bottom-2 right-2 font-mono text-[10px] text-white/60 leading-none">
            +
          </span>

          {/* Top-Left Live Watermark */}
          <div className="pointer-events-none absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-xs px-2.5 py-1 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
            <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-[0.2em] text-white font-medium">
              SHOWREEL // INTRO
            </span>
          </div>

          {/* Center Play overlay if paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play video"
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/80 border border-white/40 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-30 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-white translate-x-0.5" />
            </button>
          )}

          {/* Bottom Floating Pill: Unmute Sound CTA */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20">
            <button
              type="button"
              onClick={toggleSound}
              className={`px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-lg ${
                isMuted
                  ? 'bg-red-600/90 text-white border border-red-400 hover:bg-red-600 animate-pulse'
                  : 'bg-black/80 text-white border border-white/30 hover:bg-black'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 shrink-0" />
                  <span>[ UNMUTE SOUND 🔊 ]</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 shrink-0 text-green-400" />
                  <span>[ SOUND ON ]</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Playback Progress Line */}
        <div className="w-full mt-3 space-y-1.5">
          <div className="relative w-full h-[2px] bg-white/15 overflow-hidden">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-white transition-all duration-100"
            />
          </div>

          {/* Timecode & Playback Controls Row */}
          <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] tracking-[0.18em] text-white/70 uppercase pt-0.5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>[ PAUSE ]</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>[ PLAY ]</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={toggleSound}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3 h-3" />
                    <span>[ MUTED ]</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3" />
                    <span>[ AUDIO ON ]</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white font-medium tabular-nums">
                00:{String(currentSec).padStart(2, '0')} / 00:{String(totalSec).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER BAR: Location & Enter Site CTA */}
      <footer className="relative z-20 flex flex-wrap items-center justify-between gap-3 w-full max-w-6xl mx-auto pt-2 border-t border-white/10 font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] text-white/50">
        <span className="hidden sm:inline-block">[ DIGOS CITY, DAVAO DEL SUR · PHILIPPINES ]</span>
        <span className="text-white/80 font-medium">
          AUTOMATICALLY ENTERING PORTFOLIO IN {Math.max(0, Math.ceil(duration - currentTime))}S
        </span>
        <button
          type="button"
          onClick={handleComplete}
          className="text-white hover:underline underline-offset-4 cursor-pointer ml-auto sm:ml-0 font-semibold"
        >
          [ ENTER PORTFOLIO ↓ ]
        </button>
      </footer>
    </motion.div>
  );
};
