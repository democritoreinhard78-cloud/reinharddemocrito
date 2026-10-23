import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { ResumeSection } from './components/ResumeSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ContactSection } from './components/ContactSection';
import { LoadingScreen } from './components/LoadingScreen';
import { TabType } from './types/portfolio';

const TABS: TabType[] = ['Home', 'About', 'Resume', 'Portfolio', 'Contact'];

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Keyboard navigation (Arrow keys, 1-4 numbers, F for fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      const currentIndex = TABS.indexOf(activeTab);

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        const nextIndex = (currentIndex + 1) % TABS.length;
        setActiveTab(TABS[nextIndex]);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
        setActiveTab(TABS[prevIndex]);
      } else if (e.key >= '1' && e.key <= '5') {
        const index = parseInt(e.key, 10) - 1;
        if (index >= 0 && index < TABS.length) {
          setActiveTab(TABS[index]);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err: Error) => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err: Error) => {
          console.warn(`Error attempting to exit fullscreen: ${err.message}`);
        });
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <HomeSection
            key="home"
            setActiveTab={setActiveTab}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        );
      case 'About':
        return (
          <AboutSection
            key="about"
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        );
      case 'Resume':
        return (
          <ResumeSection
            key="resume"
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        );
      case 'Portfolio':
        return (
          <PortfolioSection
            key="portfolio"
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        );
      case 'Contact':
        return (
          <ContactSection
            key="contact"
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[100svh] bg-[#07090d] text-slate-100 flex flex-col relative select-none">
      {/* Cinematic Initial Loading Preloader */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Top Fixed Minimal Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Slide / Tab Presentation Canvas */}
      <main className="flex-1 relative flex flex-col justify-center overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full flex-1 flex flex-col"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Slide Quick Indicators */}
      <aside aria-label="Slide Navigation" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center space-x-2 bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800/80 shadow-lg">
        {TABS.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="font-mono text-[9px]">0{idx + 1}</span>
            <span>{tab}</span>
          </button>
        ))}
      </aside>
    </div>
  );
};

export default App;
