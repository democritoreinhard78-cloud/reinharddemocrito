/**
 * Google Analytics 4 (GA4) Integration & Telemetry for NarCraft Portfolio.
 * Set VITE_GA_ID in .env or pass directly to initGA('G-XXXXXXXXXX').
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GA_ID as string | undefined) || 'G-REINHARDDEM';

export function initGA(measurementId: string = GA_MEASUREMENT_ID): void {
  if (typeof window === 'undefined') return;
  if (!measurementId || measurementId === 'G-REINHARDDEM') {
    // Ready for user's Google Analytics Measurement ID
    return;
  }

  // Prevent duplicate script injection
  if (document.getElementById('ga-gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  });
}

export function trackEvent(
  action: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

export function trackProjectView(title: string, category: string): void {
  trackEvent('view_project', {
    project_title: title,
    project_category: category
  });
}

export function trackContactSubmit(inquiryType: string): void {
  trackEvent('generate_lead', {
    inquiry_type: inquiryType
  });
}

export function trackEmailCopy(): void {
  trackEvent('copy_contact_email', {
    method: 'clipboard'
  });
}
