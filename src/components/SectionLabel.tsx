import React from 'react';

interface DoubleSquareProps {
  className?: string;
  size?: 'sm' | 'md';
  dark?: boolean;
}

/** Signature brutalist twin-square marker (`▪ ▪`) used throughout the layout. */
export const DoubleSquare: React.FC<DoubleSquareProps> = ({
  className = '',
  size = 'sm',
  dark = false
}) => {
  const box = size === 'md' ? 'w-2 h-2' : 'w-1.5 h-1.5';
  const fill = dark ? 'bg-ink' : 'bg-white';

  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={`${box} ${fill} inline-block`} />
      <span className={`${box} ${fill} inline-block`} />
    </span>
  );
};

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/** Twin squares stacked above an uppercase editorial section heading. */
export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = '' }) => (
  <div className={`space-y-2.5 ${className}`}>
    <DoubleSquare />
    <h2 className="font-display text-lg sm:text-xl font-normal uppercase tracking-[-0.01em] text-white">
      {children}
    </h2>
  </div>
);
