import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const SESSION_KEY = 'narcraft_session_views';
const CACHE_KEY = 'narcraft_last_known_views';
const COUNTER_ENDPOINT =
  'https://api.visitorbadge.io/api/visitors?path=reinharddemocrito-portfolio';

export const ViewCounter: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [views, setViews] = useState<number | null>(() => {
    // Start with cached value if available for zero-layout-shift instant render
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = parseInt(cached, 10);
        return isNaN(parsed) ? null : parsed;
      }
    }
    return null;
  });
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function recordAndFetchViews() {
      try {
        const sessionCount = sessionStorage.getItem(SESSION_KEY);
        if (sessionCount) {
          const parsed = parseInt(sessionCount, 10);
          if (!isNaN(parsed) && isMounted) {
            setViews(parsed);
            setIsLive(true);
            return;
          }
        }

        const res = await fetch(COUNTER_ENDPOINT, {
          headers: {
            Accept: 'image/svg+xml'
          }
        });

        if (!res.ok) throw new Error('Counter response not ok');
        const svgText = await res.text();

        // Extract count from SVG label (e.g. aria-label="VISITORS: 1420" or <title>VISITORS: 1420</title>)
        const match =
          svgText.match(/VISITORS:\s*([0-9,]+)/i) ||
          svgText.match(/<title>VISITORS:\s*([0-9,]+)<\/title>/i);

        if (match && match[1]) {
          const numeric = parseInt(match[1].replace(/,/g, ''), 10);
          if (!isNaN(numeric) && isMounted) {
            setViews(numeric);
            setIsLive(true);
            sessionStorage.setItem(SESSION_KEY, numeric.toString());
            localStorage.setItem(CACHE_KEY, numeric.toString());
          }
        }
      } catch (err) {
        // Fallback gracefully without breaking UI
        console.warn('Visitor counter telemetry paused:', err);
        if (isMounted) setIsLive(false);
      }
    }

    recordAndFetchViews();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayCount =
    views !== null ? views.toLocaleString().padStart(6, '0') : '000,001';

  return (
    <div
      title="Live portfolio visitor telemetry (unique session count)"
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#0c0e10] border border-white/15 hover:border-white/40 transition-colors select-none font-mono text-[9px] sm:text-[9.5px] uppercase tracking-[0.2em] text-white/80 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {isLive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isLive ? 'bg-emerald-500' : 'bg-white/40'
          }`}
        />
      </span>

      <Eye className="w-3 h-3 text-white/60 shrink-0" aria-hidden="true" />
      <span>
        [ LIVE VIEWS // <strong className="text-white font-semibold">{displayCount}</strong> ]
      </span>
    </div>
  );
};
