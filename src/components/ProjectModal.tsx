import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Tag, ExternalLink, ZoomIn, ZoomOut } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { DoubleSquare } from './SectionLabel';

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
}

/**
 * Lightbox dialog styled in the portfolio's monochrome Swiss-brutalist theme.
 * Renders full images/certificates with no cropping, no gradient obscuring,
 * interactive zoom-to-fit / 100% zoom toggle, and full-resolution open action.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [zoomedProjectId, setZoomedProjectId] = useState<number | null>(null);
  const isZoomed = zoomedProjectId === project.id;

  const toggleZoom = () => {
    setZoomedProjectId(isZoomed ? null : project.id);
  };

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

        {/* Project Featured Video or Image (No Crop, Full Certificate Visible) */}
        <div
          className={`relative w-full shrink-0 border-b border-white/15 bg-[#050607] flex items-center justify-center transition-all ${
            isZoomed
              ? 'overflow-auto max-h-[64vh] p-2 sm:p-4'
              : 'overflow-hidden min-h-[260px] sm:min-h-[420px] max-h-[58vh] p-3 sm:p-6'
          }`}
        >
          {project.video ? (
            <video
              src={project.video}
              poster={project.image}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[56vh] object-contain bg-black"
            />
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
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] bg-white/5 text-white/75 border border-white/15">
              <Calendar className="w-3 h-3" />
              {project.year}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight">
            {project.title}
          </h3>

          <p className="text-white/75 text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            {!project.video ? (
              <a
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 hover:bg-white/10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                [ OPEN FULL IMAGE ↗ ]
              </a>
            ) : (
              <div />
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 border border-white/20 hover:bg-[#e7e5dc] hover:text-black hover:border-[#e7e5dc] font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition-all cursor-pointer"
            >
              [ CLOSE PREVIEW ]
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
