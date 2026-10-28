import React, { useEffect, useRef } from 'react';

interface CurvedFilmstripProps {
  frontCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  backCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  angleRef: React.MutableRefObject<number>;
}

const ATLAS_W = 3600;
const ATLAS_H = 240;

interface FilmstripProject {
  image: string;
  category: string;
  title: string;
  subtitle: string;
  year: string;
  isLightCard: boolean;
}

const PROJECT_OUTPUTS: FilmstripProject[] = [
  {
    image: '/projects/cabe-final-proj-thumb.jpg',
    category: '[ 02 // MOTION 2D ]',
    title: 'ONE-WAY ANOVA',
    subtitle: 'Educational 2D Animation',
    year: '2024',
    isLightCard: false
  },
  {
    image: '/projects/cert-5.jpg',
    category: '[ 05 // CHAMPION ]',
    title: 'PSITS REGION 11',
    subtitle: 'Champion • Best Director & Edit',
    year: '2025',
    isLightCard: true
  },
  {
    image: '/projects/cert-9.jpg',
    category: '[ 01 // DIRECTING ]',
    title: 'FOUR-SAKEN TRUTHS',
    subtitle: 'Best Director • MRC Films',
    year: '2024',
    isLightCard: false
  },
  {
    image: '/projects/moa-car-trading-thumb.jpg',
    category: '[ 02 // 2D ANIMATION ]',
    title: 'CAR TRADING',
    subtitle: 'Commercial Motion Explainer',
    year: '2023',
    isLightCard: true
  },
  {
    image: '/projects/cert-8.jpg',
    category: '[ 01 // FILM DIRECTION ]',
    title: 'LUNAN',
    subtitle: 'Best Director • Interschool',
    year: '2024',
    isLightCard: false
  },
  {
    image: '/projects/cert-11.png',
    category: '[ 05 // RESEARCH AWARD ]',
    title: 'BEST RESEARCH',
    subtitle: 'Sacred Heart Chronicles',
    year: '2024',
    isLightCard: true
  },
  {
    image: '/projects/cert-4.png',
    category: '[ 05 // LEADERSHIP ]',
    title: 'CCIS GOVERNOR',
    subtitle: 'Cor Jesu College CCIS-LGU',
    year: '2026',
    isLightCard: false
  },
  {
    image: '/projects/cert-6.jpg',
    category: '[ 01 // BEST FILM ]',
    title: 'SIP SHORT FILM',
    subtitle: 'Best Short Film Winner',
    year: '2024',
    isLightCard: true
  }
];

/**
 * Builds a high-resolution (3600x240) editorial filmstrip texture populated with
 * Reinhard's actual project outputs and awards across all 5 portfolio categories.
 */
function createFilmstripAtlas(onImageLoad: () => void): HTMLCanvasElement {
  const atlas = document.createElement('canvas');
  atlas.width = ATLAS_W;
  atlas.height = ATLAS_H;
  const ctx = atlas.getContext('2d');
  if (!ctx) return atlas;

  const drawSpreads = (loadedImgs: (HTMLImageElement | null)[]) => {
    // Keep the base atlas transparent so gaps between cards are open space
    ctx.clearRect(0, 0, ATLAS_W, ATLAS_H);

    const numCards = PROJECT_OUTPUTS.length;
    const slotW = ATLAS_W / numCards; // 450px per slot
    const gap = 82; // open transparent gap between spreads
    const cardW = slotW - gap; // 368px per spread card
    const cardY = 6;
    const cardH = ATLAS_H - 12; // 228px

    const drawHelperLines = (x: number, y: number, w: number, rows: number, color: string) => {
      ctx.fillStyle = color;
      for (let r = 0; r < rows; r++) {
        const lw = r === rows - 1 ? w * 0.62 : w;
        ctx.fillRect(x, y + r * 6, Math.max(1, lw), 2);
      }
    };

    const drawBarcode = (x: number, y: number, w: number, h: number, color: string) => {
      ctx.fillStyle = color;
      const bars = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 3, 2];
      let curX = x;
      for (let b = 0; b < bars.length && curX < x + w; b++) {
        const bw = bars[b];
        if (b % 2 === 0) {
          ctx.fillRect(curX, y, bw, h);
        }
        curX += bw + 1.5;
      }
    };

    for (let i = 0; i < numCards; i++) {
      const item = PROJECT_OUTPUTS[i];
      const cx = i * slotW + gap / 2;
      const img = loadedImgs[i];
      const isLight = item.isLightCard;

      ctx.save();
      ctx.beginPath();
      ctx.rect(cx, cardY, cardW, cardH);
      ctx.clip();

      // Card Background
      ctx.fillStyle = isLight ? '#f4f3ed' : '#0c0e10';
      ctx.fillRect(cx, cardY, cardW, cardH);

      // Card subtle brutalist border
      ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.16)';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx + 0.5, cardY + 0.5, cardW - 1, cardH - 1);

      // Left media box: 53% of card width
      const mediaW = Math.round(cardW * 0.53);
      const mediaH = cardH - 16;
      const mediaX = cx + 8;
      const mediaY = cardY + 8;

      ctx.fillStyle = isLight ? '#1a1d20' : '#141618';
      ctx.fillRect(mediaX, mediaY, mediaW, mediaH);

      if (img && img.complete && img.naturalWidth > 0) {
        // Draw the real output image cleanly inside the media frame
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const imgRatio = iw / ih;
        const boxRatio = mediaW / mediaH;

        let sx = 0;
        let sy = 0;
        let sw = iw;
        let sh = ih;

        if (imgRatio > boxRatio) {
          sw = ih * boxRatio;
          sx = (iw - sw) / 2;
        } else {
          sh = iw / boxRatio;
          sy = (ih - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, mediaX, mediaY, mediaW, mediaH);

        // Subtle gradient overlay at bottom of image for label readability
        const grad = ctx.createLinearGradient(0, mediaY + mediaH * 0.65, 0, mediaY + mediaH);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx.fillStyle = grad;
        ctx.fillRect(mediaX, mediaY + mediaH * 0.5, mediaW, mediaH * 0.5);

        // Micro-badge on bottom-left of image
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 7.5px "Space Mono", monospace';
        ctx.fillText(`[ OUTPUT // ${item.year} ]`, mediaX + 6, mediaY + mediaH - 6);
      } else {
        // Wireframe indicator while image is loading
        ctx.fillStyle = isLight ? '#2a2e33' : '#1a1d20';
        ctx.fillRect(mediaX + 10, mediaY + 10, mediaW - 20, mediaH - 20);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '500 9px "Space Grotesk", sans-serif';
        ctx.fillText('OUTPUT PREVIEW', mediaX + 16, mediaY + mediaH * 0.5);
      }

      // Right editorial specification column
      const specX = cx + mediaW + 16;
      const specW = cardW - mediaW - 24;

      // Top category badge
      ctx.fillStyle = isLight ? '#111315' : '#e7e5dc';
      ctx.font = '700 8px "Space Mono", monospace';
      ctx.fillText(item.category, specX, cardY + 22);

      // Title
      ctx.fillStyle = isLight ? '#08090a' : '#ffffff';
      ctx.font = '700 15px "Space Grotesk", sans-serif';
      const words = item.title.split(' ');
      if (words.length > 2) {
        ctx.fillText(words.slice(0, 2).join(' '), specX, cardY + 44);
        ctx.fillText(words.slice(2).join(' '), specX, cardY + 62);
      } else {
        ctx.fillText(item.title, specX, cardY + 46);
      }

      // Subtitle
      ctx.fillStyle = isLight ? '#4a5059' : '#9da3aa';
      ctx.font = '500 8.5px "Space Grotesk", sans-serif';
      ctx.fillText(item.subtitle, specX, cardY + 78);

      // Separation rule
      ctx.fillStyle = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)';
      ctx.fillRect(specX, cardY + 90, specW, 1);

      // Editorial lines
      drawHelperLines(
        specX,
        cardY + 100,
        specW,
        4,
        isLight ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)'
      );

      // 4-cell contact strip / thumbnail blocks
      for (let t = 0; t < 4; t++) {
        ctx.fillStyle = isLight
          ? t % 2 === 0 ? '#1b1e21' : '#c9c7be'
          : t % 2 === 0 ? '#1f2327' : '#33383f';
        ctx.fillRect(specX + t * 24, cardY + 134, 20, 16);
      }

      // Bottom Barcode & Registration
      drawBarcode(specX, cardY + 168, 56, 16, isLight ? '#111315' : '#e7e5dc');

      ctx.fillStyle = isLight ? '#555b63' : '#7b828c';
      ctx.font = '500 7px "Space Mono", monospace';
      ctx.fillText(`CJC // ${item.year}`, specX + 64, cardY + 180);

      ctx.restore();
    }
  };

  const loadedImgs: (HTMLImageElement | null)[] = new Array(PROJECT_OUTPUTS.length).fill(null);
  PROJECT_OUTPUTS.forEach((item, idx) => {
    const im = new Image();
    im.crossOrigin = 'anonymous';
    im.onload = () => {
      loadedImgs[idx] = im;
      drawSpreads(loadedImgs);
      onImageLoad();
    };
    im.onerror = () => {
      console.warn('Failed to load filmstrip output image:', item.image);
    };
    im.src = item.image;
  });

  drawSpreads(loadedImgs);

  return atlas;
}

/**
 * Renders the 240-slice 3D perspective curved cylindrical filmstrip centered around the
 * subject's mid-torso so the left bend wraps outside the left chest and the right bend
 * wraps outside the right back, with open gaps between each card and between the front/back loops.
 */
export function renderCurvedCylinder(
  frontCanvas: HTMLCanvasElement,
  backCanvas: HTMLCanvasElement,
  atlas: HTMLCanvasElement,
  angleDeg: number
) {
  const W = frontCanvas.width;
  const H = frontCanvas.height;
  const fCtx = frontCanvas.getContext('2d');
  const bCtx = backCanvas.getContext('2d');
  if (!fCtx || !bCtx) return;

  fCtx.clearRect(0, 0, W, H);
  bCtx.clearRect(0, 0, W, H);

  // Centered directly on the subject's mid-torso within the unified 1000x860 stage
  const centerX = W * 0.535;
  const centerY = H * 0.628;

  // Wide horizontal radius so left & right bends sit ~135px outside both edges of the torso,
  // and deep Z radius + pitch so the front and back arcs have a clean open vertical gap
  const radiusX = W * 0.355;
  const radiusZ = W * 0.295;
  const ribbonHalfH = H * 0.062;
  const fov = 940;
  const pitchRad = (-19.5 * Math.PI) / 180;
  const rollRad = (17.5 * Math.PI) / 180;

  const slices = 240;
  const baseRad = (angleDeg * Math.PI) / 180;

  const projectPoint = (theta: number, yLocal: number) => {
    const x3 = Math.sin(theta) * radiusX;
    const z3 = Math.cos(theta) * radiusZ;
    const yP = yLocal * Math.cos(pitchRad) - z3 * Math.sin(pitchRad);
    const zP = yLocal * Math.sin(pitchRad) + z3 * Math.cos(pitchRad);
    const scale = fov / (fov - zP);
    const xp = x3 * scale;
    const yp = yP * scale;
    const xr = xp * Math.cos(rollRad) - yp * Math.sin(rollRad);
    const yr = xp * Math.sin(rollRad) + yp * Math.cos(rollRad);
    return {
      x: centerX + xr,
      y: centerY + yr,
      z: z3,
      scale
    };
  };

  const topPts = new Array(slices + 1);
  const botPts = new Array(slices + 1);
  for (let i = 0; i <= slices; i++) {
    const theta = baseRad + (i / slices) * Math.PI * 2;
    topPts[i] = projectPoint(theta, -ribbonHalfH);
    botPts[i] = projectPoint(theta, ribbonHalfH);
  }

  for (let i = 0; i < slices; i++) {
    const u0 = i / slices;
    const thetaMid = baseRad + ((i + 0.5) / slices) * Math.PI * 2;
    const cosT = Math.cos(thetaMid);
    const sinT = Math.sin(thetaMid);

    const t0 = topPts[i];
    const t1 = topPts[i + 1];
    const b0 = botPts[i];
    const b1 = botPts[i + 1];

    const isFront = cosT >= 0;
    const ctx = isFront ? fCtx : bCtx;

    const sx = Math.floor(u0 * ATLAS_W);
    const sw = Math.ceil(ATLAS_W / slices) + 1;

    // On the back half, show the rear loop behind the left and right sides of the torso
    let backAlpha = 1;
    if (!isFront) {
      if (sinT > -0.22 && sinT < 0.48) {
        continue;
      }
      if (sinT <= -0.22) {
        backAlpha = Math.min(1, (-sinT - 0.22) / 0.42) * 0.46;
      } else {
        backAlpha = Math.min(1, (sinT - 0.48) / 0.32) * 0.46;
      }
      if (backAlpha <= 0.02) continue;
    }

    ctx.save();

    const dx = t1.x - t0.x;
    const dy = t1.y - t0.y;
    const len = Math.hypot(dx, dy) || 1;
    const padX = (dx / len) * 0.65;
    const padY = (dy / len) * 0.65;

    ctx.beginPath();
    ctx.moveTo(t0.x - padX, t0.y - padY);
    ctx.lineTo(t1.x + padX, t1.y + padY);
    ctx.lineTo(b1.x + padX, b1.y + padY);
    ctx.lineTo(b0.x - padX, b0.y - padY);
    ctx.closePath();
    ctx.clip();

    ctx.globalAlpha = isFront ? Math.min(1, 0.35 + 0.65 * Math.pow(Math.max(0, cosT), 0.35)) : backAlpha;

    const ux = (t1.x - t0.x) / (ATLAS_W / slices);
    const uy = (t1.y - t0.y) / (ATLAS_W / slices);
    const vx = (b0.x - t0.x) / ATLAS_H;
    const vy = (b0.y - t0.y) / ATLAS_H;

    ctx.setTransform(ux, uy, vx, vy, t0.x - ux * sx, t0.y - uy * sx);
    ctx.drawImage(atlas, sx, 0, sw, ATLAS_H, sx, 0, sw, ATLAS_H);

    // Darken the extreme left/right bends smoothly using source-atop so transparent gaps stay transparent!
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-atop';
    if (isFront) {
      const shade = Math.pow(1 - Math.max(0, cosT), 2.0) * 0.55;
      if (shade > 0.01) {
        ctx.fillStyle = `rgba(5, 6, 7, ${shade.toFixed(3)})`;
        ctx.fillRect(0, 0, W, H);
      }
    } else {
      ctx.fillStyle = 'rgba(8, 10, 12, 0.62)';
      ctx.fillRect(0, 0, W, H);
    }

    ctx.restore();
  }
}

export const useCurvedFilmstrip = ({
  frontCanvasRef,
  backCanvasRef,
  angleRef
}: CurvedFilmstripProps) => {
  const atlasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    atlasRef.current = createFilmstripAtlas(() => {
      if (frontCanvasRef.current && backCanvasRef.current && atlasRef.current) {
        renderCurvedCylinder(
          frontCanvasRef.current,
          backCanvasRef.current,
          atlasRef.current,
          angleRef.current
        );
      }
    });
  }, [frontCanvasRef, backCanvasRef, angleRef]);

  return atlasRef;
};
