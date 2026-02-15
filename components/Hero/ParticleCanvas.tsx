import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function fitPointsToCanvas(
  points: { x: number; y: number }[],
  w: number,
  h: number,
  padding = 28
) {
  if (!points.length) return points;

  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  const bw = Math.max(1, maxX - minX);
  const bh = Math.max(1, maxY - minY);

  const sx = (w - padding * 2) / bw;
  const sy = (h - padding * 2) / bh;
  const s = Math.min(sx, sy);

  const ox = (w - bw * s) / 2 - minX * s;
  const oy = (h - bh * s) / 2 - minY * s;

  return points.map((p) => ({ x: p.x * s + ox, y: p.y * s + oy }));
}

export const ParticleSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shape, setShape] = useState<'eye' | 'wifi' | 'shield' | 'lock'>('eye');
  const particles = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const requestRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  type P2 = { x: number; y: number };

  const sampleEllipse = (
    rx: number,
    ry: number,
    count: number,
    cx = 0,
    cy = 0
  ): P2[] => {
    const pts: P2[] = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      pts.push({ x: cx + Math.cos(t) * rx, y: cy + Math.sin(t) * ry });
    }
    return pts;
  };

  const sampleArc = (
    r: number,
    start: number,
    end: number,
    count: number,
    cx = 0,
    cy = 0
  ): P2[] => {
    const pts: P2[] = [];
    for (let i = 0; i < count; i++) {
      const t = start + (i / (count - 1)) * (end - start);
      pts.push({ x: cx + Math.cos(t) * r, y: cy + Math.sin(t) * r });
    }
    return pts;
  };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const samplePolyline = (points: P2[], perSegment: number): P2[] => {
    const out: P2[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      for (let j = 0; j < perSegment; j++) {
        const t = j / perSegment;
        out.push({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) });
      }
    }
    out.push(points[points.length - 1]);
    return out;
  };

  const getShapePoints = (shape: 'eye' | 'wifi' | 'shield' | 'lock') => {
    switch (shape) {
      case 'eye': {
        // Full readable eye: outer ellipse + pupil
        const outer = sampleEllipse(120, 70, 160);
        const pupil = sampleEllipse(22, 22, 60);
        return [...outer, ...pupil];
      }
      case 'wifi': {
        // Wi‑Fi icon: 3 thick arcs + thick dot (centered & fully visible)
        // Canvas y axis grows downward, so arcs are the *upper* semicircle: PI -> 2PI

        const sampleArcBand = (
          r: number,
          thickness: number,
          start: number,
          end: number,
          count: number,
          cx = 0,
          cy = 0,
          radialSteps = 4
        ): P2[] => {
          const pts: P2[] = [];
          const half = thickness / 2;
          const steps = Math.max(1, radialSteps);
          for (let k = 0; k <= steps; k++) {
            const rr = r - half + (k / steps) * thickness;
            pts.push(...sampleArc(rr, start, end, count, cx, cy));
          }
          return pts;
        };

        const sampleDotBand = (
          r: number,
          thickness: number,
          count: number,
          cx = 0,
          cy = 0,
          radialSteps = 4
        ): P2[] => {
          const pts: P2[] = [];
          const half = thickness / 2;
          const steps = Math.max(1, radialSteps);
          for (let k = 0; k <= steps; k++) {
            const rr = r - half + (k / steps) * thickness;
            pts.push(...sampleEllipse(rr, rr, count, cx, cy));
          }
          return pts;
        };

        // Layout: dot at bottom, arcs above it
        const cx = 0;
        const cy = 40;

        // Radii chosen to match a classic Wi‑Fi symbol proportions
        const outer = sampleArcBand(120, 14, Math.PI, Math.PI * 2, 180, cx, cy, 5);
        const mid = sampleArcBand(85, 14, Math.PI, Math.PI * 2, 150, cx, cy, 5);
        const inner = sampleArcBand(52, 14, Math.PI, Math.PI * 2, 120, cx, cy, 5);

        // Dot sits below the arcs
        const dot = sampleDotBand(10, 10, 80, cx, cy + 105, 5);

        return [...outer, ...mid, ...inner, ...dot];
      }
      case 'shield': {
        // Shield outline + inner checkmark
        const outlineBase: P2[] = [
          { x: 0, y: -120 },
          { x: 90, y: -70 },
          { x: 70, y: 40 },
          { x: 0, y: 120 },
          { x: -70, y: 40 },
          { x: -90, y: -70 },
          { x: 0, y: -120 }
        ];
        const outline = samplePolyline(outlineBase, 20);
        const checkBase: P2[] = [
          { x: -28, y: 10 },
          { x: -5, y: 32 },
          { x: 40, y: -18 }
        ];
        const check = samplePolyline(checkBase, 18);
        return [...outline, ...check];
      }
      case 'lock': {
        // Lock outline (body + shackle)
        const bodyBase: P2[] = [
          { x: -80, y: 10 },
          { x: -80, y: 120 },
          { x: 80, y: 120 },
          { x: 80, y: 10 },
          { x: -80, y: 10 }
        ];
        const body = samplePolyline(bodyBase, 18);
        const shackle = sampleArc(60, Math.PI * 1.05, Math.PI * 1.95, 90, 0, 10);
        return [...body, ...shackle];
      }
      default:
        return [];
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    // Ensure the context transform matches DPR (prevents partial/clipped rendering)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Clear in CSS-pixel space
    ctx.clearRect(0, 0, cw, ch);

    // Render settings for visibility on dark backgrounds
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.9;

    // Compute target points for current shape, then fit them into the canvas
    let targetPoints = getShapePoints(shape);
    targetPoints = fitPointsToCanvas(targetPoints, cw, ch, 48);

    // Initialize particles if empty or count mismatch
    if (particles.current.length !== targetPoints.length) {
      particles.current = targetPoints.map((p) => ({
        x: p.x,
        y: p.y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    }

    particles.current.forEach((p, i) => {
      const target = targetPoints[i % targetPoints.length];

      // Move particle towards target
      p.vx += (target.x - p.x) * 0.02;
      p.vy += (target.y - p.y) * 0.02;

      // Apply velocity
      p.x += p.vx;
      p.y += p.vy;

      // Slow down velocity
      p.vx *= 0.85;
      p.vy *= 0.85;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#DDE6FF';
      ctx.shadowColor = 'rgba(150, 190, 255, 0.55)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setMounted(true);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      setMounted(false);
    };
  }, [shape]);

  const canvasEl = (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999
      }}
    />
  );

  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(canvasEl, document.body);
};
