import React, { useEffect, useRef } from 'react';

interface CurvedFilmstripProps {
  frontCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  backCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  angleRef: React.MutableRefObject<number>;
}

const ATLAS_W = 3600;
const ATLAS_H = 240;

/**
 * Builds a high-resolution (3600x240) editorial filmstrip texture with open transparent gaps
 * between each project spread so the cards float with clear separation ("dili dikit") just
 * like the reference image.
 */
function createFilmstripAtlas(onImageLoad: () => void): HTMLCanvasElement {
  const atlas = document.createElement('canvas');
  atlas.width = ATLAS_W;
  atlas.height = ATLAS_H;
  const ctx = atlas.getContext('2d');
  if (!ctx) return atlas;

  const drawSpreads = (loadedImgs: (HTMLImageElement | null)[]) => {
    // Keep the base atlas transparent so gaps between cards are open space (not stuck together)
    ctx.clearRect(0, 0, ATLAS_W, ATLAS_H);

    const numCards = 8;
    const slotW = ATLAS_W / numCards; // 450px per slot
    const gap = 82; // open transparent gap between spreads so cards are clearly separated
    const cardW = slotW - gap; // 368px per spread card
    const cardY = 6;
    const cardH = ATLAS_H - 12; // 228px

    const drawHelperLines = (x: number, y: number, w: number, rows: number, color: string) => {
      ctx.fillStyle = color;
      for (let r = 0; r < rows; r++) {
        const lw = r === rows - 1 ? w * 0.62 : w;
        ctx.fillRect(x, y + r * 6, lw, 2.5);
      }
    };

    for (let i = 0; i < numCards; i++) {
      const cx = i * slotW + gap / 2;
      const imgA = loadedImgs[i % loadedImgs.length];
      const imgB = loadedImgs[(i + 1) % loadedImgs.length];

      ctx.save();
      ctx.beginPath();
      ctx.rect(cx, cardY, cardW, cardH);
      ctx.clip();

      // Dark card backing inside each individual spread card only
      ctx.fillStyle = '#0c0e10';
      ctx.fillRect(cx, cardY, cardW, cardH);

      if (i % 4 === 0) {
        // SPREAD TYPE 1: "Aurel Vance" (matches front-left card in reference)
        const leftW = cardW * 0.51;
        ctx.fillStyle = '#141618';
        ctx.fillRect(cx, cardY, leftW, cardH * 0.56);
        if (imgA) {
          ctx.filter = 'grayscale(100%) contrast(135%) brightness(85%)';
          ctx.drawImage(imgA, cx, cardY, leftW, cardH * 0.56);
          ctx.filter = 'none';
        }
        ctx.fillStyle = '#f4f3ef';
        ctx.fillRect(cx, cardY + cardH * 0.56, leftW, cardH * 0.44);

        // Large "Aurel Vance" title straddling the horizontal split
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 28px "Space Grotesk", sans-serif';
        ctx.fillText('Aurel Vance', cx + 10, cardY + cardH * 0.54);

        // Sub-caption & small dark portrait box at bottom-left
        drawHelperLines(cx + 10, cardY + cardH * 0.63, 76, 4, '#222');
        ctx.fillStyle = '#111315';
        ctx.fillRect(cx + 42, cardY + cardH * 0.78, 32, 40);
        drawHelperLines(cx + 98, cardY + cardH * 0.84, 56, 4, '#444');

        // Right half: white top header + dark dramatic B&W photo bottom
        const rx = cx + cardW * 0.53;
        const rw = cardW * 0.47;
        ctx.fillStyle = '#f4f3ef';
        ctx.fillRect(rx, cardY, rw, cardH * 0.42);
        ctx.fillStyle = '#111315';
        ctx.fillRect(rx + rw * 0.5, cardY + 16, rw * 0.44, cardH * 0.28);
        if (imgB) {
          ctx.filter = 'grayscale(100%) contrast(140%)';
          ctx.drawImage(imgB, rx + rw * 0.5, cardY + 16, rw * 0.44, cardH * 0.28);
          ctx.filter = 'none';
        }
        drawHelperLines(rx + 10, cardY + 22, 58, 4, '#333');

        ctx.fillStyle = '#0c0e10';
        ctx.fillRect(rx, cardY + cardH * 0.44, rw, cardH * 0.56);
        if (imgA) {
          ctx.filter = 'grayscale(100%) contrast(155%) brightness(75%)';
          ctx.drawImage(imgA, rx + 6, cardY + cardH * 0.46, rw - 12, cardH * 0.48);
          ctx.filter = 'none';
        }
      } else if (i % 4 === 1) {
        // SPREAD TYPE 2: "Peter Marino Architect" (matches front-center card in reference)
        const lw = cardW * 0.53;
        ctx.fillStyle = '#e8e7e2';
        ctx.fillRect(cx, cardY, lw, cardH);

        // Top brutalist architecture photo
        ctx.fillStyle = '#181b1e';
        ctx.fillRect(cx, cardY, lw, cardH * 0.68);
        if (imgB) {
          ctx.filter = 'grayscale(100%) contrast(135%)';
          ctx.drawImage(imgB, cx, cardY, lw, cardH * 0.68);
          ctx.filter = 'none';
        }
        ctx.fillStyle = 'rgba(0,0,0,0.42)';
        ctx.fillRect(cx, cardY + cardH * 0.32, lw, cardH * 0.36);

        ctx.fillStyle = '#ffffff';
        ctx.font = '600 16px "Space Grotesk", sans-serif';
        ctx.fillText('Peter  Marino', cx + 10, cardY + cardH * 0.49);
        ctx.font = '500 15px "Space Grotesk", sans-serif';
        ctx.fillText('Architect', cx + 10, cardY + cardH * 0.58);

        // 5-thumbnail contact strip along the bottom-left
        for (let t = 0; t < 5; t++) {
          ctx.fillStyle = t % 2 === 0 ? '#1b1e21' : '#3a3f44';
          ctx.fillRect(cx + 8 + t * 32, cardY + cardH * 0.72, 28, 24);
        }
        drawHelperLines(cx + 96, cardY + cardH * 0.86, 68, 3, '#333');

        // Right half: crisp white editorial specification sheet
        const rx = cx + lw + 5;
        const rw = cardW - lw - 5;
        ctx.fillStyle = '#f5f4f0';
        ctx.fillRect(rx, cardY, rw, cardH);
        drawHelperLines(rx + 20, cardY + 26, rw - 38, 6, '#1a1a1a');
        ctx.fillStyle = '#121416';
        ctx.fillRect(rx + 12, cardY + cardH * 0.54, 42, 54);
        if (imgA) {
          ctx.filter = 'grayscale(100%) contrast(145%)';
          ctx.drawImage(imgA, rx + 12, cardY + cardH * 0.54, 42, 54);
          ctx.filter = 'none';
        }
        drawHelperLines(rx + 64, cardY + cardH * 0.68, rw - 76, 5, '#444');
      } else if (i % 4 === 2) {
        // SPREAD TYPE 3: "make work" white editorial spread (matches far-left curving card)
        ctx.fillStyle = '#f5f4f0';
        ctx.fillRect(cx, cardY, cardW * 0.51, cardH);
        ctx.fillStyle = '#111315';
        ctx.font = '700 18px "Space Grotesk", sans-serif';
        ctx.fillText('make', cx + 12, cardY + 38);
        ctx.fillText('work', cx + 118, cardY + 58);

        // Center silhouette cutout block
        ctx.fillStyle = '#16191c';
        ctx.fillRect(cx + 52, cardY + 46, 56, 78);
        if (imgA) {
          ctx.filter = 'grayscale(100%) contrast(150%)';
          ctx.drawImage(imgA, cx + 52, cardY + 46, 56, 78);
          ctx.filter = 'none';
        }
        drawHelperLines(cx + 12, cardY + cardH * 0.66, 68, 5, '#222');
        drawHelperLines(cx + 94, cardY + cardH * 0.66, 62, 5, '#555');

        // Right half: white grid with dark B&W photography blocks
        const rx = cx + cardW * 0.53;
        const rw = cardW * 0.47;
        ctx.fillStyle = '#f2f1ec';
        ctx.fillRect(rx, cardY, rw, cardH);
        drawHelperLines(rx + 10, cardY + 22, rw - 20, 4, '#222');
        ctx.fillStyle = '#121518';
        ctx.fillRect(rx + 10, cardY + 58, rw - 20, 64);
        if (imgB) {
          ctx.filter = 'grayscale(100%) contrast(140%)';
          ctx.drawImage(imgB, rx + 10, cardY + 58, rw - 20, 64);
          ctx.filter = 'none';
        }
        ctx.fillStyle = '#181a1d';
        ctx.fillRect(rx + 10, cardY + 138, 42, 54);
        drawHelperLines(rx + 62, cardY + 150, rw - 72, 5, '#333');
      } else {
        // SPREAD TYPE 4: High-contrast vertical architectural columns + cream badge
        ctx.fillStyle = '#0d0f11';
        ctx.fillRect(cx, cardY, cardW, cardH);

        const colW = cardW / 4;
        for (let c = 0; c < 4; c++) {
          const xCol = cx + c * colW;
          ctx.fillStyle = c % 2 === 0 ? '#e8e7e1' : '#171a1d';
          ctx.fillRect(xCol + 3, cardY + 6, colW - 6, cardH - 12);
          if (c % 2 === 1 && imgB) {
            ctx.filter = 'grayscale(100%) contrast(155%) brightness(80%)';
            ctx.drawImage(imgB, xCol + 3, cardY + 6, colW - 6, cardH * 0.65);
            ctx.filter = 'none';
          }
          drawHelperLines(
            xCol + 8,
            cardY + 24,
            colW - 16,
            5,
            c % 2 === 0 ? '#1a1a1a' : '#d0d0cb'
          );
        }

        // Warm cream/yellow editorial card at bottom-right
        ctx.fillStyle = '#e7e2b8';
        ctx.fillRect(cx + cardW * 0.52, cardY + cardH * 0.56, cardW * 0.24, cardH * 0.38);
        drawHelperLines(
          cx + cardW * 0.54,
          cardY + cardH * 0.64,
          cardW * 0.18,
          4,
          '#1b1b18'
        );
      }

      ctx.restore();
    }
  };

  drawSpreads([null, null]);

  const urls = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80'
  ];
  const imgs: (HTMLImageElement | null)[] = [null, null, null];
  urls.forEach((u, idx) => {
    const im = new Image();
    im.crossOrigin = 'anonymous';
    im.onload = () => {
      imgs[idx] = im;
      drawSpreads(imgs);
      onImageLoad();
    };
    im.src = u;
  });

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
