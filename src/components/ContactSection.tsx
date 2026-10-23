import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Copy, Maximize2, Minimize2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SocialIcon } from './SocialIcons';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

const INQUIRY_OPTIONS: DropdownOption[] = [
  { value: 'Brand Identity', label: 'Brand Identity & Visual System' },
  { value: 'UI/UX & Web Design', label: 'UI/UX & Interactive Design' },
  { value: 'Art Direction', label: 'Creative Art Direction' },
  { value: 'Packaging & Print', label: 'Packaging & Editorial Print' },
  { value: 'Consultation', label: 'Design Advisory & Consultation' },
  { value: 'Other', label: 'Other Inquiry' },
];

interface ContactSectionProps {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isFullscreen,
  toggleFullscreen
}) => {
  const { personalInfo, socialLinks } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Brand Identity',
    message: ''
  });

  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Brand Identity', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="relative min-h-[100svh] w-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-10 px-5 sm:px-8 lg:px-16 overflow-x-hidden overflow-y-auto bg-[#07090d]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-4">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white font-display">
              Get In Touch
            </h2>
            <div className="h-[2px] w-full bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 sm:mt-2">
            Have a project in mind, need creative art direction, or just want to say hi?
          </p>
        </div>

        {/* 2-Column Contact Grid (Stacks to 1-column on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ================= LEFT COLUMN: CONTACT DETAILS ================= */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-5 sm:space-y-6"
          >
            {/* Live Availability Status Card */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-cyan-500/25 bg-cyan-950/20 backdrop-blur-sm flex items-center space-x-3.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">
                  Available for Select Projects
                </p>
                <p className="text-[11px] text-cyan-300/80">
                  Currently accepting brand design & creative inquiries.
                </p>
              </div>
            </div>

            {/* Direct Information Items */}
            <div className="space-y-3 sm:space-y-4">
              {/* Email Card with Copy button */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-800 bg-[#0b0f16]/80 flex items-center justify-between group hover:border-slate-700 transition-colors">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-medium text-white hover:text-cyan-400 transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer shrink-0 ml-2"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-800 bg-[#0b0f16]/80 flex items-center space-x-3 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs sm:text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Studio Location Card */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-800 bg-[#0b0f16]/80 flex items-center space-x-3 hover:border-slate-700 transition-colors">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                    Location
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-white">
                    {personalInfo.location.city}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {personalInfo.location.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels row */}
            <div className="pt-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-mono text-slate-400 block mb-2.5">
                Social Profiles
              </span>
              <div className="flex items-center space-x-3 sm:space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-full border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    <SocialIcon name={social.icon} className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: INTERACTIVE CONTACT FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-[#0b0f16]/90 border border-slate-800/90 rounded-2xl p-5 sm:p-8 backdrop-blur-md shadow-2xl relative"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 sm:py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  <Check className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    Message Dispatched
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
                    Thank you for reaching out, Reinhard will review your inquiry and get back to you shortly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-medium block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090d] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-medium block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090d] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Custom Styled Dropdown */}
                <CustomDropdown
                  label="Inquiry Type"
                  options={INQUIRY_OPTIONS}
                  value={formData.subject}
                  onChange={(val) => setFormData({ ...formData, subject: val })}
                />

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-300 font-medium block">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project timeline, vision, or requirements..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090d] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-2.5 rounded-full border border-cyan-400/80 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.45)] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>

      {/* Bottom Bar Fullscreen Button (Hidden on phones) */}
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
