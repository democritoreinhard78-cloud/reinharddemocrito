import React, { useState, useEffect, useRef, useId } from 'react';
import { Send, Check, Loader2, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { trackContactSubmit } from '../utils/analytics';

const EMPTY_FORM = { name: '', email: '', message: '' };

const FIELD_CLASS =
  'w-full px-3.5 py-2.5 bg-ink border border-white/20 text-xs text-white placeholder-white/35 focus:outline-none focus:border-white transition-colors font-mono disabled:opacity-50';
const LABEL_CLASS = 'font-mono text-[9px] uppercase tracking-[0.22em] text-white/70 block';

export const ContactForm: React.FC = () => {
  const { personalInfo } = portfolioData;
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activationNeeded, setActivationNeeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const messageId = `${baseId}-message`;

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const subject = `[NarCraft Portfolio] Project Inquiry from ${formData.name}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: subject,
          message: formData.message,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === 'true' || data.success === true)) {
        trackContactSubmit('Project Inquiry');
        setSubmittedData({ name: formData.name, email: formData.email });
        setIsSubmitted(true);
        setActivationNeeded(false);
        setFormData(EMPTY_FORM);
      } else if (
        typeof data.message === 'string' &&
        data.message.toLowerCase().includes('activation')
      ) {
        // FormSubmit sent the one-time activation confirmation email to Reinhard
        setSubmittedData({ name: formData.name, email: formData.email });
        setActivationNeeded(true);
        setIsSubmitted(true);
        setFormData(EMPTY_FORM);
      } else {
        throw new Error(data.message || 'Failed to dispatch message to inbox.');
      }
    } catch (err: unknown) {
      console.error('Contact form submission error:', err);
      setErrorMessage(
        'Unable to transmit message automatically via network. You can dispatch directly through your mail app below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div role="status" className="py-8 flex flex-col items-center text-center gap-4">
        <span className="w-12 h-12 border border-white flex items-center justify-center text-white">
          <Check className="w-5 h-5" aria-hidden="true" />
        </span>
        <div className="space-y-1.5 max-w-lg">
          <h3 className="font-display uppercase tracking-wider text-white text-base sm:text-lg">
            [ MESSAGE TRANSMITTED DIRECTLY TO GMAIL ]
          </h3>
          <p className="font-sans text-xs sm:text-[13px] font-normal normal-case tracking-normal text-white/80 leading-relaxed">
            Thank you for reaching out{submittedData?.name ? `, ${submittedData.name}` : ''}.
            Your inquiry has been dispatched straight to Reinhard&apos;s Gmail (
            <span className="text-white font-medium">{personalInfo.email}</span>).
            He will review your project and reply to{' '}
            <span className="text-white font-medium">
              {submittedData?.email || 'your email'}
            </span>{' '}
            shortly.
          </p>
        </div>

        {activationNeeded && (
          <div className="max-w-md p-3.5 bg-white/5 border border-white/20 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/80 text-left space-y-1.5">
            <p className="text-white font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-white inline-block" />
              [ ONE-TIME GMAIL ACTIVATION NOTICE ]
            </p>
            <p className="leading-relaxed text-white/70">
              FormSubmit sent a 1-click confirmation email to <strong>{personalInfo.email}</strong>.
              Please check your Gmail inbox (or Spam folder) and click &quot;Activate Form&quot; once
              to ensure every message is immediately forwarded to your inbox.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setActivationNeeded(false);
          }}
          className="mt-2 px-5 py-2 border border-white/25 hover:border-white font-mono text-[9px] uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          [ SEND ANOTHER INQUIRY ]
        </button>
      </div>
    );
  }

  const mailtoFallbackHref = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    `Project Inquiry from ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `${formData.message}\n\n— ${formData.name || 'Anonymous'} (${formData.email || 'No email provided'})`
  )}`;

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      {errorMessage && (
        <div className="sm:col-span-2 p-3 bg-red-950/40 border border-red-500/35 text-red-200 font-mono text-[9px] uppercase tracking-wider space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
            <span>[ {errorMessage} ]</span>
          </div>
          <a
            href={mailtoFallbackHref}
            className="inline-block px-3 py-1.5 bg-white text-black font-semibold hover:bg-white/85 transition-colors"
          >
            [ OPEN IN GMAIL / MAIL APP INSTEAD ]
          </a>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor={nameId} className={LABEL_CLASS}>
          [ YOUR NAME ]
        </label>
        <input
          id={nameId}
          type="text"
          required
          disabled={isSubmitting}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="JANE DOE"
          autoComplete="name"
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
          disabled={isSubmitting}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="JANE@COMPANY.COM"
          autoComplete="email"
          className={FIELD_CLASS}
        />
      </div>

      <div className="sm:col-span-2 space-y-1.5">
        <label htmlFor={messageId} className={LABEL_CLASS}>
          [ PROJECT DETAILS ]
        </label>
        <textarea
          id={messageId}
          required
          disabled={isSubmitting}
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="TELL ME ABOUT YOUR STORY, TIMELINE OR REQUIREMENTS..."
          className={`${FIELD_CLASS} resize-none`}
        />
      </div>

      <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-1">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/40 hidden sm:block">
          // DIRECT DELIVERY TO {personalInfo.email.toUpperCase()}
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-white text-black hover:bg-white/85 disabled:opacity-50 disabled:cursor-not-allowed font-mono text-[10px] uppercase tracking-[0.22em] flex items-center gap-2 transition-colors cursor-pointer ml-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              <span>[ TRANSMITTING... ]</span>
            </>
          ) : (
            <>
              <span>[ DISPATCH MESSAGE ]</span>
              <Send className="w-3 h-3" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

