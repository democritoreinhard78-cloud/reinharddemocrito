import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Minimize2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SocialIcon } from './SocialIcons';
import { TabType } from '../types/portfolio';

interface HomeSectionProps {
  setActiveTab: (tab: TabType) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  isFullscreen,
  toggleFullscreen
}) => {
  const { personalInfo, socialLinks } = portfolioData;

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-10 px-5 sm:px-8 lg:px-16 overflow-hidden bg-[#07090d]">
      {/* Background Image: 4K UHD Crisp Workstation Setup */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:bg-right bg-no-repeat z-0"
        style={{
          backgroundImage: "url('/Background.jpg')",
          backgroundColor: '#07090d',
        }}
      >
        {/* Mobile Backdrop Tint: Protects white typography from bright monitor glare */}
        <div className="absolute inset-0 bg-[#07090d]/80 md:bg-transparent pointer-events-none transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/65 to-[#07090d]/85 md:bg-gradient-to-t md:from-[#07090d] md:via-transparent md:to-[#07090d]/30 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto max-w-2xl py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5 sm:space-y-6"
        >
          {/* Main Title / Name */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.08]">
              <span className="block font-medium tracking-wider text-slate-200">
                {personalInfo.firstName}
              </span>
              <span className="block font-black tracking-tight text-white drop-shadow-lg">
                {personalInfo.lastName}
              </span>
            </h1>
            <p className="text-xs sm:text-base font-light tracking-[0.2em] sm:tracking-[0.25em] text-slate-300 uppercase pt-2">
              {personalInfo.title}
            </p>
          </div>

          {/* Action Pill Buttons */}
          <div className="flex items-center space-x-3.5 pt-2 sm:pt-4">
            <button
              onClick={() => setActiveTab('Resume')}
              className="px-6 sm:px-7 py-2.5 rounded-full border border-slate-700/80 md:border-slate-400/50 hover:border-cyan-400 bg-slate-900/80 md:bg-cyan-500/10 text-slate-100 hover:text-white text-xs uppercase tracking-widest font-medium transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              Resume
            </button>
            <button
              onClick={() => setActiveTab('Portfolio')}
              className="px-6 sm:px-7 py-2.5 rounded-full border border-slate-700/80 md:border-slate-400/50 hover:border-cyan-400 bg-slate-900/80 md:bg-cyan-500/10 text-slate-100 hover:text-white text-xs uppercase tracking-widest font-medium transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              Portfolio
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Social Icons & Screen Toggle */}
      <div className="relative z-10 flex items-center justify-between pt-5 sm:pt-8 border-t border-white/5">
        {/* Social Media Links */}
        <div className="flex items-center space-x-4 sm:space-x-5 text-slate-400">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-slate-400 hover:text-cyan-400 transition-transform duration-200 hover:-translate-y-0.5 p-1 sm:p-0"
            >
              <SocialIcon name={social.icon} className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Fullscreen / Presentation Mode Trigger (Hidden on phones) */}
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
