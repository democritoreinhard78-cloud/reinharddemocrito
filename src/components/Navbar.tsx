import React, { useState } from 'react';
import { Phone, Menu, X, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { TabType } from '../types/portfolio';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const NAV_ITEMS: TabType[] = ['Home', 'About', 'Resume', 'Portfolio', 'Contact'];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#07090d]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-9">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item;
            return (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`relative text-[13px] tracking-wider uppercase font-medium transition-colors duration-200 py-1 cursor-pointer ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item}
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Brand Title */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setActiveTab('Home')}
            className="font-display font-bold tracking-wider text-xs sm:text-sm text-white uppercase text-left"
          >
            {portfolioData.personalInfo.firstName} {portfolioData.personalInfo.lastName}
          </button>
        </div>

        {/* Contact on Right */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Phone link: visible on tablet/desktop, icon-only on mobile */}
          <a
            href={`tel:${portfolioData.personalInfo.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center space-x-2 text-[11px] sm:text-[12px] tracking-widest text-slate-400 hover:text-cyan-300 transition-colors p-1 sm:p-0"
            title="Call"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{portfolioData.personalInfo.phone}</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/60 border border-slate-800 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090d]/98 border-b border-slate-800 px-6 py-5 flex flex-col space-y-3 backdrop-blur-xl animate-fadeIn shadow-2xl">
          <div className="flex flex-col space-y-2 pb-3 border-b border-slate-800/80">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs uppercase tracking-widest py-2 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                  activeTab === item 
                    ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <span>{item}</span>
                {activeTab === item && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Quick Contact Links */}
          <div className="pt-2 space-y-2">
            <a
              href={`tel:${portfolioData.personalInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center space-x-2 text-xs text-slate-300 py-1.5 px-3 rounded-lg bg-slate-900/50 hover:text-cyan-400"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{portfolioData.personalInfo.phone}</span>
            </a>
            <a
              href={`mailto:${portfolioData.personalInfo.email}`}
              className="flex items-center space-x-2 text-xs text-slate-300 py-1.5 px-3 rounded-lg bg-slate-900/50 hover:text-cyan-400"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate">{portfolioData.personalInfo.email}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
