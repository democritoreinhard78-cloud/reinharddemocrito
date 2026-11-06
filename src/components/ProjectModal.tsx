import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Calendar,
  Tag,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { DoubleSquare } from './SectionLabel';

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex?: number;
  totalCount?: number;
  categoryIndex?: number;
  categoryTotal?: number;
  categoryCode?: string;
  categoryLabel?: string;
}

/** Converts YouTube, Vimeo, or Google Drive links to embeddable player URLs */
const getEmbedUrl = (url?: string): string | null => {
  if (!url) return null;
  // YouTube watch?v=, youtu.be/, embed/, shorts/
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }
  // Google Drive
  const gdriveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch) {
    return `https://drive.google.com/file/d/${gdriveMatch[1]}/preview`;
  }
  return null;
};

/**
 * Lightbox dialog styled in the portfolio's monochrome Swiss-brutalist theme.
 * Supports direct MP4 video playback, YouTube/Vimeo/Drive embeds, full-resolution images,
 * and seamless Prev/Next navigation across outputs.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
  currentIndex = 0,
  totalCount = 1,
  categoryIndex,
  categoryTotal,
  categoryCode,
  categoryLabel
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [zoomedProjectId, setZoomedProjectId] = useState<number | null>(null);
  const [videoError, setVideoError] = useState(false);
  const isZoomed = zoomedProjectId === project.id;
  const embedUrl = getEmbedUrl(project.video);
  const touchStartXRef = useRef<number | null>(null);

  const toggleZoom = () => {
    setZoomedProjectId(isZoomed ? null : project.id);
  };

  useEffect(() => {
    setVideoError(false);
    setZoomedProjectId(null);
  }, [project.title, project.video, project.image]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    // Lock background scrolling while the dialog is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev?.();
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext?.();
        return;
      }

      // Simple focus trap: keep Tab cycling inside the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartXRef.current;
    if (deltaX > 45) {
      onPrev?.();
    } else if (deltaX < -45) {
      onNext?.();
    }
    touchStartXRef.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl lg:max-w-5xl bg-[#0c0e10] border border-white/20 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Top Editorial Registration Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-white/15 bg-[#08090a] shrink-0 gap-2">
          {/* Left Case Study Label & Output Counters */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <DoubleSquare />
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/70 whitespace-nowrap">
              [ CASE STUDY // {categoryCode ?? String(project.id).padStart(2, '0')} ]
            </span>
            {categoryIndex !== undefined && categoryTotal !== undefined && (
              <span className="hidden md:inline-block font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/45 truncate">
                // {categoryLabel ? `${categoryLabel.toUpperCase()} · ` : ''}[ {String(categoryIndex).padStart(2, '0')} OF {String(categoryTotal).padStart(2, '0')} ]
              </span>
            )}
          </div>

          {/* Right Action Controls: Top Bar Prev/Next, Full Res & Close */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {totalCount > 1 && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-2 sm:px-2.5 py-1 border border-white/20 hover:border-white hover:bg-white hover:text-black font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.16em] text-white/80 transition-all flex items-center gap-1 cursor-pointer select-none"
                  aria-label="Previous output"
                  title="Previous output (Left Arrow)"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span className="hidden sm:inline">PREV</span>
                </button>

                <span className="font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.16em] text-white/50 px-1 select-none">
                  {String(currentIndex + 1).padStart(2, '0')}/{String(totalCount).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  onClick={onNext}
                  className="px-2 sm:px-2.5 py-1 border border-white/20 hover:border-white hover:bg-white hover:text-black font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.16em] text-white/80 transition-all flex items-center gap-1 cursor-pointer select-none"
                  aria-label="Next output"
                  title="Next output (Right Arrow)"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {!project.video && (
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/20 hover:bg-[#e7e5dc] hover:text-black hover:border-[#e7e5dc] font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/75 transition-all cursor-pointer"
                title="Open full-resolution image in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden lg:inline">[ FULL RES ]</span>
              </a>
            )}

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="w-7 h-7 border border-white/20 text-white/70 hover:text-black hover:bg-[#e7e5dc] hover:border-[#e7e5dc] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Project Featured Video or Image with Floating Side Arrows */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full shrink-0 border-b border-white/15 bg-[#050607] flex items-center justify-center transition-all ${
            isZoomed
              ? 'overflow-auto max-h-[64vh] p-2 sm:p-4'
              : 'overflow-hidden min-h-[260px] sm:min-h-[420px] max-h-[58vh] p-3 sm:p-6'
          }`}
        >
          {/* Floating Left/Prev Arrow Button */}
          {totalCount > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              aria-label="Previous output"
              title="Previous output (Left Arrow)"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 bg-black/80 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-2xl group"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
          )}

          {/* Floating Right/Next Arrow Button */}
          {totalCount > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              aria-label="Next output"
              title="Next output (Right Arrow)"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 bg-black/80 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-2xl group"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-[56vh] min-h-[280px] sm:min-h-[420px] border-0 bg-black"
            />
          ) : project.video ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                key={project.video}
                src={project.video}
                poster={project.image}
                controls
                autoPlay
                playsInline
                preload="metadata"
                onError={() => setVideoError(true)}
                className="w-full h-full max-h-[56vh] object-contain bg-black"
              />
              {videoError && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-xs">
                  <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
                  <p className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                    Unable to load video stream
                  </p>
                  <p className="text-white/70 text-xs max-w-md mt-1.5 leading-relaxed font-sans">
                    The video could not be loaded. Please check your internet connection or reload the player.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                key={project.image}
                src={project.image}
                alt={project.title}
                onClick={toggleZoom}
                title={isZoomed ? 'Click to fit view' : 'Click to zoom in'}
                className={`transition-all select-none ${
                  isZoomed
                    ? 'w-auto max-w-none cursor-zoom-out shadow-2xl'
                    : 'max-h-[54vh] w-auto max-w-full object-contain mx-auto shadow-2xl cursor-zoom-in ring-1 ring-white/10'
                }`}
              />

              {/* Floating Zoom Control Pill */}
              <button
                type="button"
                onClick={toggleZoom}
                className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 px-2.5 py-1 bg-black/85 hover:bg-black text-white/85 hover:text-white border border-white/25 backdrop-blur-xs font-mono text-[9px] uppercase tracking-[0.16em] flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="w-3 h-3" />
                    [ FIT VIEW ]
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3 h-3" />
                    [ ZOOM 100% ]
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Details Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] bg-[#e7e5dc] text-black font-semibold">
                <Tag className="w-3 h-3" />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] border border-white/15 text-white/60">
                <Calendar className="w-3 h-3 text-white/40" />
                {project.year}
              </span>
            </div>

            {/* Quick Header Next/Prev Buttons */}
            {totalCount > 1 && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-3 py-1 border border-white/20 hover:border-white hover:bg-white hover:text-black font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.18em] text-white/80 transition-all inline-flex items-center gap-1 cursor-pointer"
                  title="Previous output"
                >
                  <ChevronLeft className="w-3 h-3" />
                  <span>PREV</span>
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="px-3 py-1 bg-white text-black hover:bg-white/85 font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.18em] font-semibold transition-all inline-flex items-center gap-1 cursor-pointer shadow-sm"
                  title="Next output"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            {project.title}
          </h3>

          <p className="text-white/80 text-sm sm:text-[15px] leading-relaxed font-sans max-w-3xl">
            {project.description}
          </p>

          {/* Bottom Full Navigation Action Bar */}
          {totalCount > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onPrev}
                className="px-4 py-2 border border-white/20 hover:border-white hover:bg-white hover:text-black font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/85 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>[ PREV OUTPUT ]</span>
              </button>

              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                <span className="hidden sm:inline">OUTPUT</span>
                <span className="text-white font-semibold">
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>{String(totalCount).padStart(2, '0')}</span>
                <span className="hidden sm:inline text-white/30">· USE ← / → KEYS</span>
              </div>

              <button
                type="button"
                onClick={onNext}
                className="px-4 py-2 bg-white text-black hover:bg-white/85 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>[ NEXT OUTPUT ]</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
