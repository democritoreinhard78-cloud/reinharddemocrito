import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Camera, Palette, Plane, LucideIcon, Maximize2, Minimize2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SliderMeter } from './SliderMeter';

interface ResumeSectionProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  isFullscreen,
  toggleFullscreen
}) => {
  const {
    softwareSkills,
    languages,
    personalSkills,
    experience,
    education,
    whatCanIDo,
    designSkills,
    hobbies
  } = portfolioData;

  const hobbyIcons: Record<string, LucideIcon> = {
    book: BookOpen,
    camera: Camera,
    palette: Palette,
    plane: Plane,
  };

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-14 overflow-x-hidden overflow-y-auto bg-[#07090d]">
      {/* Background with subtle creative work texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=2000&q=70')`,
        }}
      >
        <div className="absolute inset-0 bg-[#07090d]/90" />
      </div>

      {/* 3-Column Grid (Stacks cleanly to 1-column on mobile) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-4">
        
        {/* ================= COLUMN 1: SKILLS & LANGUAGES ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Software Skills */}
          <div>
            <div className="inline-block mb-3">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                Software Skills
              </h3>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>

            <div className="space-y-1.5">
              {softwareSkills.map((skill, index) => (
                <SliderMeter
                  key={skill.name}
                  label={skill.name}
                  code={skill.code}
                  level={skill.level}
                  badgeColor={skill.color}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <div className="inline-block mb-3">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                Languages
              </h3>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>

            <div className="space-y-1.5">
              {languages.map((lang, index) => (
                <SliderMeter
                  key={lang.name}
                  label={lang.name}
                  level={lang.level}
                  index={index + 6}
                />
              ))}
            </div>
          </div>

          {/* Personal Skills */}
          <div>
            <div className="inline-block mb-2">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                Personal Skills
              </h3>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>
            <p className="text-xs text-slate-300 tracking-wide font-light">
              {personalSkills}
            </p>
          </div>
        </motion.div>

        {/* ================= COLUMN 2: EXPERIENCE & EDUCATION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* Experience Header */}
          <div>
            <div className="inline-block mb-4">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                Experience
              </h3>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-7 space-y-5">
              <div className="absolute left-[11px] top-2 bottom-3 w-[1.5px] bg-cyan-500/40" />

              {experience.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Node Badge with Year */}
                  <div 
                    className="absolute -left-7 top-0.5 w-[22px] h-[22px] rounded-full bg-cyan-500 border-2 border-[#07090d] shadow-[0_0_8px_rgba(6,182,212,0.6)] flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform"
                    title={item.period}
                  >
                    <span className="text-[7px] text-[#07090d] font-bold font-mono">
                      {item.period.slice(2, 4)}
                    </span>
                  </div>

                  {/* Company & Role */}
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-cyan-400 font-mono tracking-wider">
                      {item.period}
                    </div>
                    <h4 className="text-[11px] sm:text-xs font-bold uppercase text-white tracking-wide">
                      {item.company}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Block */}
          <div>
            <div className="inline-block mb-2">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                Education
              </h3>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>

            <div className="space-y-0.5 text-xs">
              <div className="font-semibold text-white tracking-wide">
                {education.degree}
              </div>
              <div className="text-slate-400">
                {education.school}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= COLUMN 3: WHAT CAN I DO & HOBBIES ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* What Can I Do? */}
          <div>
            <div className="inline-block mb-3">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                What Can I Do ?
              </h3>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>

            <div className="space-y-2 text-xs text-slate-300 font-light">
              {whatCanIDo.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Design Skills */}
          <div>
            <div className="inline-block mb-3">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                Design Skills
              </h3>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>

            <div className="space-y-2 text-xs text-slate-300 font-light">
              {designSkills.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies & Interests with Circular Badges */}
          <div>
            <div className="inline-block mb-3">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white font-display">
                Hobbies & Interests
              </h3>
              <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
            </div>

            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              {hobbies.map((hobby) => {
                const IconComponent = hobbyIcons[hobby.icon] || BookOpen;
                return (
                  <div key={hobby.name} className="flex flex-col items-center group cursor-pointer">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-700 bg-slate-900/80 group-hover:border-cyan-400 group-hover:bg-cyan-950/30 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                      <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 group-hover:text-cyan-300 mt-1.5 transition-colors">
                      {hobby.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Fullscreen Button (Hidden on phones) */}
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
