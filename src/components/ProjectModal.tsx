import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#0b0f16] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-400 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Featured Image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950 shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f16] via-transparent to-transparent" />
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                <Tag className="w-3 h-3" />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-slate-400 border border-slate-800">
                <Calendar className="w-3 h-3" />
                {project.year}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              {project.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full border border-slate-700 hover:border-cyan-400 text-xs uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
