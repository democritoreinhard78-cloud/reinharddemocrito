import React, { useState } from 'react';

/**
 * Drop your own photo at `public/portrait.jpg` to override the studio placeholder.
 * Falls back to `/Background.jpg` if offline.
 */
const SOURCES = [
  '/portrait-nobg.png',
  '/portrait.jpg',
  '/Background.jpg'
];

interface PortraitProps {
  alt: string;
  className?: string;
}

export const Portrait: React.FC<PortraitProps> = ({ alt, className = '' }) => {
  const [index, setIndex] = useState(0);

  const handleError = () => {
    setIndex((prev) => (prev < SOURCES.length - 1 ? prev + 1 : prev));
  };

  return (
    <img
      src={SOURCES[index]}
      alt={alt}
      onError={handleError}
      className={`object-cover object-top ${className}`}
    />
  );
};
