import React, { useState, useEffect, useRef, useId } from 'react';
import { Send, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { CustomDropdown, DropdownOption } from './CustomDropdown';

const INQUIRY_OPTIONS: DropdownOption[] = [
  { value: 'Video Editing', label: 'Video Editing & Post-Production' },
  { value: 'Direction', label: 'Creative Direction & Storytelling' },
  { value: 'Visual Design', label: 'Visual & Graphic Design' },
  { value: 'Motion Graphics', label: 'Motion Graphics & Social Content' },
  { value: 'Collaboration', label: 'Project Collaboration' },
  { value: 'Other', label: 'Other Inquiry' }
];

const EMPTY_FORM = { name: '', email: '', subject: 'Video Editing', message: '' };

const FIELD_CLASS =
  'w-full px-3.5 py-2.5 bg-ink border border-white/20 text-xs text-white placeholder-white/35 focus:outline-none focus:border-white transition-colors font-mono';
const LABEL_CLASS = 'font-mono text-[9px] uppercase tracking-[0.22em] text-white/70 block';

export const ContactForm: React.FC = () => {
  const { personalInfo } = portfolioData;
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const messageId = `${baseId}-message`;

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `[${formData.subject}] Inquiry from ${formData.name}`;
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    window.location.href =
      `mailto:${personalInfo.email}` +
      `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setIsSubmitted(true);
    setFormData(EMPTY_FORM);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setIsSubmitted(false), 8000);
  };

  if (isSubmitted) {
    return (
      <div role="status" className="py-8 flex flex-col items-center text-center gap-3">
        <span className="w-10 h-10 border border-white flex items-center justify-center text-white">
          <Check className="w-4 h-4" aria-hidden="true" />
        </span>
        <h3 className="font-display uppercase tracking-wide text-white text-sm">
          [ MESSAGE READY TO SEND ]
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/65 max-w-sm leading-relaxed">
          YOUR EMAIL APP SHOULD NOW BE OPEN WITH YOUR MESSAGE PRE-FILLED. PRESS SEND THERE TO REACH
          REINHARD, OR WRITE DIRECTLY TO {personalInfo.email.toUpperCase()}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label htmlFor={nameId} className={LABEL_CLASS}>
          [ YOUR NAME ]
        </label>
        <input
          id={nameId}
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="JANE DOE"
          className={FIELD_CLASS}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor={emailId} className={LABEL_CLASS}>
          [ EMAIL ADDRESS ]
        </label>
        <input
          id={emailId}
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="JANE@COMPANY.COM"
          className={FIELD_CLASS}
        />
      </div>

      <div className="sm:col-span-2">
        <CustomDropdown
          label="[ INQUIRY TYPE ]"
          options={INQUIRY_OPTIONS}
          value={formData.subject}
          onChange={(val) => setFormData({ ...formData, subject: val })}
        />
      </div>

      <div className="sm:col-span-2 space-y-1.5">
        <label htmlFor={messageId} className={LABEL_CLASS}>
          [ PROJECT DETAILS ]
        </label>
        <textarea
          id={messageId}
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="TELL ME ABOUT YOUR STORY, TIMELINE OR REQUIREMENTS..."
          className={`${FIELD_CLASS} resize-none`}
        />
      </div>

      <div className="sm:col-span-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2.5 bg-white text-black hover:bg-white/85 font-mono text-[10px] uppercase tracking-[0.22em] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span>[ DISPATCH MESSAGE ]</span>
          <Send className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};
