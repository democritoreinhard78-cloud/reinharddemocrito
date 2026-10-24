import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Case Study' }
] as const;

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-6 sm:py-8'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 flex flex-col items-center gap-2 sm:gap-4">
        <a
          href="#home"
          aria-label="NarCraft - Home"
          className="font-wordmark text-xl sm:text-[28px] font-bold tracking-[-0.03em] text-white leading-none hover:opacity-80 transition-opacity"
        >
          NarCraft
        </a>

        <nav aria-label="Primary" className="flex items-center gap-5 sm:gap-14">
          {NAV_ITEMS.map((item, idx) => (
            <React.Fragment key={item.id}>
              <a
                href={`#${item.id}`}
                className="font-mono text-[10px] sm:text-[12px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </a>
              {idx < NAV_ITEMS.length - 1 && (
                <span aria-hidden="true" className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white inline-block" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};
