# Reinhard Democrito — Portfolio

A high-contrast, monochrome Swiss-brutalist & editorial creative direction portfolio built with modern web technologies.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + Custom 240-Slice 3D Canvas Cylinder Engine
- **Icons**: [Lucide React](https://lucide.dev/)

## Features

- **Monochrome Editorial Hero**: Asymmetrical split layout on a pitch-black (`#080808`) stage with bold display typography (`WORK THAT BEGINS WITH STRATEGY.`), monospace micro-copy, bracketed editorial CTAs, and diagonal marquee tape.
- **3D Curved Cylindrical Filmstrip**: Custom 240-slice 3D perspective cylindrical ribbon ([`CurvedFilmstrip.tsx`](src/components/CurvedFilmstrip.tsx)) that wraps seamlessly around the subject's torso—passing behind the body on the rear arc (`z-[5]`) and in front of the chest on the foreground arc (`z-20`) with interactive drag inertia and hover-to-pause.
- **Interactive Spotlight & Case Study Index**: Tabular project index paired with a 12-card Swiss editorial bento grid and modal case study viewer.
- **Process, Philosophy & Toolkit Stage**: Studio portrait stage with floating project spreads, criss-crossed marquee tapes, and structured toolkit directory.
- **Fully Responsive**: Aspect-locked 3D stage (`1000×860`) calibrated for mobile phones, tablets, laptops (`1440px`), and ultrawide desktops (`1920px+`).

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Typecheck & build for production
npm run build
```
