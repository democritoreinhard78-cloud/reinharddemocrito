import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessToolsSection } from './components/ProcessToolsSection';
import { ContactSection } from './components/ContactSection';
import { LoadingScreen } from './components/LoadingScreen';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <ThemeProvider>
      <div className="min-h-[100svh] bg-ink text-white flex flex-col transition-colors duration-300">
        <AnimatePresence>
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        <Header />

        <main className="flex-1">
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <ProcessToolsSection />
        </main>

        <ContactSection />
      </div>
    </ThemeProvider>
  );
};

export default App;
