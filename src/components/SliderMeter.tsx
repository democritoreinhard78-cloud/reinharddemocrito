import React from 'react';
import { motion } from 'framer-motion';

interface SliderMeterProps {
  label: string;
  code?: string;
  level?: number;
  badgeColor?: string;
  index?: number;
}

export const SliderMeter: React.FC<SliderMeterProps> = ({
  label,
  code,
  level = 80,
  badgeColor,
  index = 0
}) => {
  return (
    <div className="flex items-center gap-3 w-full py-1.5 group select-none">
      {/* Optional Software Badge */}
      {code && (
        <div 
          className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold tracking-tight text-white border border-slate-700/80 bg-slate-900/90 shadow-sm shrink-0"
          style={{ 
            borderColor: badgeColor ? `${badgeColor}55` : '#334155',
            color: badgeColor || '#38bdf8' 
          }}
        >
          {code}
        </div>
      )}

      {/* Label */}
      <span className="text-[12px] font-medium tracking-wide text-slate-300 w-24 shrink-0 truncate">
        {label}
      </span>

      {/* Slider Track & Dot */}
      <div className="relative flex-1 flex items-center h-4 cursor-pointer">
        {/* Track Line */}
        <div className="w-full h-[1px] bg-slate-800 relative">
          {/* Active Level Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 0.9, delay: 0.1 * index, ease: "easeOut" }}
            className="h-full bg-cyan-400/80"
          />
        </div>

        {/* Circular Slider Dot */}
        <motion.div
          initial={{ left: 0, opacity: 0 }}
          animate={{ left: `${level}%`, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 * index, ease: "easeOut" }}
          className="absolute -translate-x-1/2 w-3 h-3 rounded-full border border-cyan-400 bg-[#0b0f14] flex items-center justify-center group-hover:scale-125 transition-transform duration-200"
          style={{
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.6)'
          }}
        >
          <div className="w-1 h-1 rounded-full bg-cyan-300" />
          
          {/* Tooltip on hover */}
          <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900 border border-slate-700 text-cyan-400 text-[10px] px-1.5 py-0.5 rounded shadow-lg pointer-events-none whitespace-nowrap">
            {level}%
          </div>
        </motion.div>
      </div>
    </div>
  );
};
