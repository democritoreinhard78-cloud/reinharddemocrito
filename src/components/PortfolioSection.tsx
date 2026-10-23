import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, ArrowUpRight, LayoutGrid, GalleryHorizontalEnd } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { VelocityCarousel } from './VelocityCarousel';
import { ProjectItem } from '../types/portfolio';

interface PortfolioSectionProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  isFullscreen,
  toggleFullscreen
}) => {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  const categories = ['All', 'Branding', 'UI/UX Design', 'Product Design', 'Editorial', 'Packaging'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-14 overflow-x-hidden overflow-y-auto bg-[#07090d]">
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-4 space-y-6">
        
        {/* Header, Filters & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <div className="inline-block">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white font-display">
                Selected Works
              </h2>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>
            <p className="text-xs text-slate-400 mt-1.5 sm:mt-2">
              Curated creative direction, brand systems, and digital crafts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] sm:text-[11px] uppercase tracking-wider px-3 sm:px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                      : 'text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Velocity Carousel vs Grid */}
            <div className="flex items-center rounded-full border border-slate-800 bg-slate-900/60 p-0.5 shrink-0">
              <button
                onClick={() => setViewMode('carousel')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Velocity Carousel View"
                aria-label="Carousel View"
              >
                <GalleryHorizontalEnd className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display Mode */}
        {viewMode === 'carousel' ? (
          <VelocityCarousel
            projects={filteredProjects}
            onSelectProject={(project) => setActiveProject(project)}
          />
        ) : (
          /* Projects Grid */
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveProject(project)}
                  className="group relative bg-[#0b0f16] border border-slate-800/80 hover:border-cyan-500/60 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f16] via-transparent to-transparent opacity-80" />

                    {/* Corner Arrow Icon */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#07090d]/80 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/80 transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                        {project.category} · {project.year}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Bottom Bar Fullscreen Button (Hidden on phones) */}
      <div className="relative z-10 flex justify-end pt-4 border-t border-white/5">
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="hidden sm:block text-slate-500 hover:text-cyan-400 transition-colors p-1 cursor-pointer"
          title="Toggle Fullscreen (or press F)"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Project Lightbox Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
};
