import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface AboutSectionProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  isFullscreen,
  toggleFullscreen
}) => {
  const { personalInfo } = portfolioData;

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-16 overflow-x-hidden overflow-y-auto bg-[#07090d]">
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4">
        {/* Left Column: Bio & Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-6 space-y-6 sm:space-y-7 z-20"
        >
          {/* Section Header */}
          <div>
            <div className="inline-block">
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white font-display">
                About
              </h2>
              {/* Cyan Accent Bar under Heading */}
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>

            {/* Email Contact Subhead */}
            <div className="mt-2">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-mono tracking-wide transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-3.5 sm:space-y-4 text-slate-300 font-light text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
            {personalInfo.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Location Pin */}
          <div className="pt-2 sm:pt-4">
            <div className="inline-flex flex-col">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300 tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{personalInfo.location.city}</span>
              </div>
              <p className="text-xs text-slate-400 pl-5.5 pt-0.5">
                {personalInfo.location.address}
              </p>
              {/* Cyan Accent Underline */}
              <div className="h-[1px] w-full bg-cyan-500/60 mt-2" />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Moody Portrait Blending into Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-6 relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-72 sm:h-96 lg:h-[500px] overflow-hidden rounded-xl lg:rounded-none">
            {/* The Low-Key Portrait */}
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85"
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90"
            />

            {/* Seamless Vignette Fades to Background (#07090d) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07090d] via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#07090d]/60 via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07090d]/40 via-transparent to-[#07090d]" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar Fullscreen Button */}
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
    </div>
  );
};
