import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Tag, ExternalLink, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { DoubleSquare } from './SectionLabel';

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
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
 * Supports direct MP4 video playback, YouTube/Vimeo/Drive embeds, and full-resolution images.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [zoomedProjectId, setZoomedProjectId] = useState<number | null>(null);
  const [videoError, setVideoError] = useState(false);
  const isZoomed = zoomedProjectId === project.id;
  const embedUrl = getEmbedUrl(project.video);

  const toggleZoom = () => {
    setZoomedProjectId(isZoomed ? null : project.id);
  };

  useEffect(() => {
    setVideoError(false);
  }, [project.id]);

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
  }, [onClose]);

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
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/15 bg-[#08090a] shrink-0">
          <div className="flex items-center gap-2.5">
            <DoubleSquare />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
              [ CASE STUDY // {String(project.id).padStart(2, '0')} ]
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!project.video && (
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/20 hover:bg-[#e7e5dc] hover:text-black hover:border-[#e7e5dc] font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/75 transition-all cursor-pointer"
                title="Open full-resolution image in new tab"
              >
                <ExternalLink className="w-3 h-3" />
                [ FULL RES ]
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

        {/* Project Featured Video or Image */}
        <div
          className={`relative w-full shrink-0 border-b border-white/15 bg-[#050607] flex items-center justify-center transition-all ${
            isZoomed
              ? 'overflow-auto max-h-[64vh] p-2 sm:p-4'
              : 'overflow-hidden min-h-[260px] sm:min-h-[420px] max-h-[58vh] p-3 sm:p-6'
          }`}
        >
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
                onError={() => setVideoError(true)}
                className="w-full h-full max-h-[56vh] object-contain bg-black"
              />
              {videoError && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center z-20 backdrop-blur-xs">
                  <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
                  <p className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                    Video Not Found On Cloud Host (404)
                  </p>
                  <p className="text-white/70 text-xs max-w-md mt-1.5 leading-relaxed font-sans">
                    This video is 1.9 GB and stored on your local drive. Because GitHub has a 100 MB file limit, large videos should be linked via YouTube (Unlisted), Vimeo, or Google Drive to stream online.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
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

          <h3 className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
            {project.title}
          </h3>

          <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed font-sans max-w-3xl">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
