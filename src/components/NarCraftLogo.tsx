import React from 'react';

interface NarCraftLogoProps {
  className?: string;
  inverted?: boolean;
}

/**
 * Official NarCraft Brand Mark:
 * Architectural 'N' monogram paired with signature Swiss-brutalist dual registration squares.
 */
export const NarCraftLogo: React.FC<NarCraftLogoProps> = ({
  className = 'w-7 h-7',
  inverted = false
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="NarCraft"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        className={inverted ? 'fill-white stroke-black/20' : 'fill-[#0c0e10] stroke-white/20'}
        strokeWidth="2"
      />
      {/* Signature Double Square Registration Mark */}
      <rect
        x="41"
        y="9.5"
        width="3"
        height="3"
        className={inverted ? 'fill-[#0c0e10]' : 'fill-white'}
      />
      <rect
        x="46"
        y="9.5"
        width="3"
        height="3"
        className={inverted ? 'fill-[#0c0e10]' : 'fill-white'}
      />
      {/* Bold Architectural 'N' Monogram */}
      <path
        d="M17 18h9l12.5 19.5V18H47v28h-9L25.5 26.5V46H17V18z"
        className={inverted ? 'fill-[#0c0e10]' : 'fill-white'}
      />
    </svg>
  );
};
