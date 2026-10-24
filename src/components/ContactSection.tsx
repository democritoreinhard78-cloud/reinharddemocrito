import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { telHref } from '../utils/contact';
import { ContactForm } from './ContactForm';
import { DoubleSquare } from './SectionLabel';

const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CASE STUDY', href: '#process' },
  { label: 'CONTACT', href: '#contact' }
];

const CAPABILITY_LINKS = [
  'CREATIVE DIRECTION',
  'VIDEO EDITING',
  'VISUAL DESIGN',
  'MOTION GRAPHICS',
  'STORYTELLING'
];

export const ContactSection: React.FC = () => {
  const { personalInfo, socialLinks } = portfolioData;
  const [showForm, setShowForm] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setIsCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.warn('Unable to copy email to clipboard:', err);
    }
  };

  const fullNameLower = `${personalInfo.firstName} ${personalInfo.lastName}`.toLowerCase();

  return (
    <footer id="contact" className="w-full bg-ink pt-20 sm:pt-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 space-y-14">
        {/* Top Row: Left Callout + Right Bracket Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <DoubleSquare />
            <h2 className="font-display text-xl sm:text-2xl font-normal uppercase tracking-[-0.01em] leading-[1.15] text-white">
              LET&apos;S CREATE
              <br />
              SOMETHING MEANINGFUL
            </h2>

            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/65 leading-relaxed max-w-sm">
              WHETHER YOU&apos;RE STARTING A NEW PROJECT OR NEED A PARTNER FOR DIRECTION, VIDEO
              EDITING, OR VISUAL DESIGN — I&apos;M HERE TO HELP TURN YOUR VISION INTO REALITY.
            </p>

            {/* Interactive Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowForm((v) => !v)}
                aria-expanded={showForm}
                aria-controls="contact-form-panel"
                className="px-4 py-2 bg-white text-black hover:bg-white/85 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] transition-colors cursor-pointer"
              >
                {showForm ? '[ CLOSE FORM ]' : '[ SEND A MESSAGE ]'}
              </button>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3.5 py-2 border border-white/20 hover:border-white font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/80 hover:text-white inline-flex items-center gap-2 transition-colors cursor-pointer"
                aria-label="Copy email address"
              >
                <span>{personalInfo.email}</span>
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 space-y-1">
              <p>
                <a href={telHref(personalInfo.phone)} className="hover:text-white transition-colors">
                  [ {personalInfo.phone} ]
                </a>
              </p>
              <p>
                [ {personalInfo.location.city.toUpperCase()}, {personalInfo.location.address.toUpperCase()} ]
              </p>
            </div>
          </div>

          {/* Right Column: [ CONTACT ME ] + 3-Column Bracketed Directory */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10 lg:items-end">
            <div className="w-full flex justify-start lg:justify-end">
              <button
                type="button"
                onClick={() => setShowForm((v) => !v)}
                className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-white/75 hover:text-white transition-colors cursor-pointer"
              >
                [ CONTACT ME ]
              </button>
            </div>

            <div className="w-full lg:max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
              {/* Column 1: Navigation */}
              <ul className="space-y-2.5">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/65 hover:text-white transition-colors"
                    >
                      [{item.label}]
                    </a>
                  </li>
                ))}
              </ul>

              {/* Column 2: Capabilities */}
              <ul className="space-y-2.5">
                {CAPABILITY_LINKS.map((cap) => (
                  <li
                    key={cap}
                    className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-white/65"
                  >
                    [{cap}]
                  </li>
                ))}
              </ul>

              {/* Column 3: Real Social Channels */}
              <ul className="space-y-2.5 col-span-2 sm:col-span-1">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/65 hover:text-white transition-colors"
                    >
                      [{social.name.toUpperCase()}]
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Expandable Inline Contact Form */}
        <AnimatePresence initial={false}>
          {showForm && (
            <motion.div
              id="contact-form-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/15"
            >
              <div className="py-8 max-w-2xl">
                <ContactForm />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Giant Clean Wordmark */}
      <div className="relative mt-16 sm:mt-24 pt-10 select-none overflow-hidden">
        <div
          aria-hidden="true"
          className="relative max-w-[1440px] mx-auto px-5 sm:px-10 text-center leading-none font-wordmark font-bold lowercase text-[clamp(2.5rem,10vw,9.8rem)] tracking-[-0.02em] text-[#454a4d]"
        >
          {fullNameLower}
        </div>

        <div className="relative z-10 pb-3 pt-4 text-center font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.26em] text-white/60">
          ALL RIGHTS RESERVED · REINHARD DEMOCRITO
        </div>
      </div>
    </footer>
  );
};
