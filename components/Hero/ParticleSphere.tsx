import React, { useEffect, useRef, useMemo } from 'react';
import { MotionValue } from 'framer-motion';

interface ParticleSphereProps {
  activeStep?: number | MotionValue<number>;
}

interface Point {
  x: number;
  y: number;
  z: number;
}

interface ParticleState {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  seed: number;
}

interface ProjectedParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  glow: number;
}

interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  maxAbsX: number;
  maxAbsY: number;
}

let GLOBAL_TARGET_BOUNDS: Bounds[] | null = null;

let GLOBAL_TARGET_SETS: Point[][] | null = null;

const generateTargetSets = (particleCount: number): Point[][] => {
  if (GLOBAL_TARGET_SETS) return GLOBAL_TARGET_SETS;
  
  const sets: Point[][] = [];

  const computeBounds = (pts: Point[]): Bounds => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const p of pts) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    const maxAbsX = Math.max(Math.abs(minX), Math.abs(maxX)) || 1;
    const maxAbsY = Math.max(Math.abs(minY), Math.abs(maxY)) || 1;
    return { minX, maxX, minY, maxY, maxAbsX, maxAbsY };
  };

  const baseSize = 220;

  const fibonacciSphere = (samples: number, radius: number): Point[] => {
    const points: Point[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      const isSurface = Math.random() < 0.7;
      const dist = isSurface ? radius : Math.random() * radius * 0.9;
      points.push({ x: x * dist, y: y * dist, z: z * dist });
    }
    return points;
  };

  const sampleIcon3D = (
    drawFn: (c: CanvasRenderingContext2D) => void,
    zDepth: number = 40,
    sampleStep: number = 2
  ): Point[] => {
    // Slightly larger offscreen canvas gives icons more breathing room
    const size = 640;
    const center = size / 2;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = size;
    offCanvas.height = size;

    const octx = offCanvas.getContext('2d', { willReadFrequently: true })!;

    // Ensure a clean slate every time
    octx.clearRect(0, 0, size, size);
    octx.globalCompositeOperation = 'source-over';

    octx.fillStyle = '#FFFFFF';
    octx.strokeStyle = '#FFFFFF';
    octx.lineCap = 'round';
    octx.lineJoin = 'round';

    drawFn(octx);

    const imgData = octx.getImageData(0, 0, size, size).data;
    const raw: { x: number; y: number }[] = [];

    // Sample density is controllable per-icon (Wi‑Fi needs denser sampling)
    const step = Math.max(1, Math.floor(sampleStep));
    for (let y = 0; y < size; y += step) {
      for (let x = 0; x < size; x += step) {
        // Slightly lower threshold helps thin/anti-aliased edges survive
        if (imgData[(y * size + x) * 4 + 3] > 90) {
          raw.push({ x, y });
        }
      }
    }

    if (raw.length === 0) {
      // Fallback: put everything at center if drawFn produced no pixels
      return Array.from({ length: particleCount }, () => ({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * zDepth,
      }));
    }

    // Compute pixel bounds and recenter the icon so it can never be "half" due to offset
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;

    for (const p of raw) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;

    // Convert pixels to centered coordinates. Keep scale moderate.
    const scale = 1.1;
    const pixels = raw.map((p) => ({
      x: (p.x - cx) * scale,
      y: (p.y - cy) * scale,
    }));

// IMPORTANT:
// If we always take the first `particleCount` pixels, scanning order (top→bottom)
// biases particles toward the top of the icon. For large filled shapes (Wi-Fi bands),
// this makes it look like only the top part exists.
// Spread picks across the entire `pixels` array deterministically.
const L = pixels.length;
const stride = Math.max(1, Math.floor(L / particleCount));
const offset = Math.floor(Math.random() * L);

return Array.from({ length: particleCount }, (_, i) => {
  // Use a prime-ish multiplier to cover the full range.
  const idx = (offset + i * stride * 131) % L;
  const p = pixels[idx];
  return {
    x: p.x + (Math.random() - 0.5) * 2,
    y: p.y + (Math.random() - 0.5) * 2,
    z: (Math.random() - 0.5) * zDepth,
  };
});

  };

  // Step 0: Sphere
  sets.push(fibonacciSphere(particleCount, baseSize));

  // Step 1: Eye (CCTV) — reference-like silhouette (thick outline + filled pupil + highlight)
  // NOTE: We build a FILLED shape then carve the inner negative space so the bottom eyelid
  // can never “disappear” due to thin stroke sampling.
  sets.push(sampleIcon3D((c) => {
    const W = c.canvas.width;
    const H = c.canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // Padding + proportions tuned so the eye doesn't look overly wide on big canvases
    const pad = W * 0.14;
    // Less horizontal (more compact icon proportions)
    const eyeW = Math.min(W - pad * 2, W * 0.62);
    // Slightly taller so it doesn't look "flat"
    const eyeH = Math.min(H - pad * 2, W * 0.52);

    const left = cx - eyeW / 2;
    const right = cx + eyeW / 2;
    const top = cy - eyeH / 2;
    const bottom = cy + eyeH / 2;

    // Bold outline thickness (premium / readable)
    const outline = Math.max(26, W * 0.06);

    c.globalCompositeOperation = 'source-over';
    c.fillStyle = '#FFFFFF';
    c.strokeStyle = '#FFFFFF';
    c.lineCap = 'round';
    c.lineJoin = 'round';

    // 1) Outer almond (FILLED)
    // Slightly inset control points so the almond isn't stretched tip-to-tip
    const ctlInset = eyeW * 0.10;

    c.beginPath();
    c.moveTo(left, cy);
    c.quadraticCurveTo(cx, top, right, cy);
    c.quadraticCurveTo(cx, bottom, left, cy);
    c.closePath();
    c.fill();

    // 2) Carve inner almond to create a thick outline (negative space)
    // Use a slightly smaller almond and punch it out.
    const inset = outline * 1.10;
    const iLeft = left + inset;
    const iRight = right - inset;
    // Keep the inner cutout a bit taller so the bottom eyelid doesn't feel missing
    const iTop = top + inset * 0.70;
    const iBottom = bottom - inset * 0.70;

    c.globalCompositeOperation = 'destination-out';
    c.beginPath();
    c.moveTo(iLeft, cy);
    c.quadraticCurveTo(cx, iTop, iRight, cy);
    c.quadraticCurveTo(cx, iBottom, iLeft, cy);
    c.closePath();
    c.fill();

    // Back to drawing solids
    c.globalCompositeOperation = 'source-over';

    // 3) Iris ring (filled ring = solid pixels, reliable sampling)
    const irisR = Math.min(eyeH, eyeW) * 0.22;
    const irisT = Math.max(18, outline * 0.55);

    // Outer iris disk
    c.beginPath();
    c.arc(cx, cy, irisR, 0, Math.PI * 2);
    c.fill();

    // Punch inner iris to make a ring
    c.globalCompositeOperation = 'destination-out';
    c.beginPath();
    c.arc(cx, cy, Math.max(1, irisR - irisT), 0, Math.PI * 2);
    c.fill();
    c.globalCompositeOperation = 'source-over';

    // 4) Pupil (solid)
    const pupilR = irisR * 0.55;
    c.beginPath();
    c.arc(cx, cy, pupilR, 0, Math.PI * 2);
    c.fill();

    // 5) Highlight (small dot upper-left)
    const hlR = pupilR * 0.28;
    c.beginPath();
    c.arc(cx - pupilR * 0.35, cy - pupilR * 0.35, hlR, 0, Math.PI * 2);
    c.fill();
  }));

  // Step 2: Wi‑Fi (Network) — premium 3-band icon + dot
  // Tuned for: clear separation, round ends, not too wide, consistent “logo-like” proportions.
  sets.push(
    sampleIcon3D(
      (c) => {
        const W = c.canvas.width;
        const H = c.canvas.height;
        const cx = W / 2;
        const cy = H / 2;

        c.globalCompositeOperation = 'source-over';
        c.fillStyle = '#FFFFFF';
        c.strokeStyle = '#FFFFFF';
        c.lineCap = 'round';
        c.lineJoin = 'round';

        // Work within a square so the icon never becomes overly wide on big canvases
        const S = Math.min(W, H);
        const pad = S * 0.16;

        // Angles: slightly clipped semicircle for a cleaner “icon” look (not a perfect half-ring)
        const a0 = Math.PI * 1.08;
        const a1 = Math.PI * 1.92;

        // Thickness + gaps (scaled, but clamped)
        const t0 = Math.max(28, S * 0.065);
        const t1 = Math.max(24, S * 0.056);
        const t2 = Math.max(20, S * 0.048);
        const gap = Math.max(18, S * 0.038);

        // Outer radius is capped to stay comfortably inside the offscreen canvas
        const r0Outer = Math.min(S * 0.34, (S - pad * 2) * 0.52);
        const r0Inner = Math.max(1, r0Outer - t0);
        const r1Outer = Math.max(1, r0Inner - gap);
        const r1Inner = Math.max(1, r1Outer - t1);
        const r2Outer = Math.max(1, r1Inner - gap);
        const r2Inner = Math.max(1, r2Outer - t2);

        // Dot sizing and placement (proportional to smallest band)
        const dotR = Math.max(16, S * 0.040);
        const dotYOffset = Math.max(dotR * 1.6, r2Outer * 0.78);

        // Place baseY so the highest band and the dot both fit within padding
        let baseY = cy + S * 0.06; // slight downshift looks nicer visually
        const minBaseY = pad + r0Outer + t0 / 2;
        const maxBaseY = H - pad - (dotYOffset + dotR);
        baseY = Math.min(Math.max(baseY, minBaseY), maxBaseY);

        // Draw a filled arc band (a ring sector) with the same start/end angles
        const drawBand = (outer: number, inner: number) => {
          c.beginPath();
          c.arc(cx, baseY, outer, a0, a1, false);
          c.arc(cx, baseY, inner, a1, a0, true);
          c.closePath();
          c.fill();
        };

        drawBand(r0Outer, r0Inner);
        drawBand(r1Outer, r1Inner);
        drawBand(r2Outer, r2Inner);

        // Dot under the smallest arc
        const dotY = baseY + dotYOffset;
        c.beginPath();
        c.arc(cx, dotY, dotR, 0, Math.PI * 2);
        c.fill();
      },
      40, // zDepth
      1 // sampleStep (dense)
    )
  );

  // Step 3: Burglar Alarm (Premium Shield + Bold Check) - REFINED FORM
  sets.push(sampleIcon3D((c) => {
    const center = 256;
    // Premium Shield Shape with curved top
    c.beginPath();
    c.moveTo(center, 70); 
    c.bezierCurveTo(center + 80, 50, center + 160, 90, 430, 120); // Top Right Curve
    c.quadraticCurveTo(430, 360, center, 480); // Right side to bottom
    c.quadraticCurveTo(82, 360, 82, 120); // Bottom to left side
    c.bezierCurveTo(center - 160, 90, center - 80, 50, center, 70); // Left Top Curve back to center
    c.closePath();
    c.fill();

    // Inner Border (Optional for extra depth, we use it for particle density)
    c.lineWidth = 8;
    c.stroke();

    // Bold Checkmark
    c.globalCompositeOperation = 'destination-out';
    c.lineWidth = 55;
    c.beginPath();
    c.moveTo(center - 90, 270); 
    c.lineTo(center - 10, 350); 
    c.lineTo(center + 100, 200);
    c.stroke();
    
    c.globalCompositeOperation = 'source-over';
    c.lineWidth = 35;
    c.beginPath();
    c.moveTo(center - 90, 270); 
    c.lineTo(center - 10, 350); 
    c.lineTo(center + 100, 200);
    c.stroke();
  }));

  // Step 4: Fiber (Waves) — removed (fallback to a compact sphere)
  // Keeping the step index stable so scroll/steps don’t break.
  sets.push(fibonacciSphere(particleCount, baseSize * 0.75));

  GLOBAL_TARGET_BOUNDS = sets.map(computeBounds);
  GLOBAL_TARGET_SETS = sets;
  return sets;
};

export const ParticleSphere: React.FC<ParticleSphereProps> = ({ activeStep = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleCount = 7500;
  const targetSets = useMemo(() => generateTargetSets(particleCount), []);
  const targetBounds = useMemo(() => GLOBAL_TARGET_BOUNDS || [], []);
  const particlesRef = useRef<ParticleState[]>([]);
  const activeStepRef = useRef<any>(activeStep);
  const mouseRef = useRef({ x: 0, y: 0, active: false, lerpX: 0, lerpY: 0 });

  useEffect(() => { activeStepRef.current = activeStep; }, [activeStep]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: (Math.random() - 0.5) * 1000,
        vx: 0, vy: 0, vz: 0,
        seed: Math.random() * 200
      }));
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - (rect.left + rect.width / 2);
      mouseRef.current.y = e.clientY - (rect.top + rect.height / 2);
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => { mouseRef.current.active = false; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animationId: number;
    const animate = () => {
      const currentVal = typeof activeStepRef.current === 'number' ? activeStepRef.current : activeStepRef.current?.get() || 0;
      
      // If the scroll step is beyond our last target set, hide the canvas.
      // This stays correct even if we add/remove icons.
      if (currentVal >= targetSets.length) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        animationId = requestAnimationFrame(animate);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const centerX = cw / 2;
      const centerY = ch / 2;
      const time = Date.now() * 0.001;

      mouseRef.current.lerpX += (mouseRef.current.x - mouseRef.current.lerpX) * 0.1;
      mouseRef.current.lerpY += (mouseRef.current.y - mouseRef.current.lerpY) * 0.1;

      const idx = Math.floor(currentVal);
      const nextIdx = Math.min(targetSets.length - 1, idx + 1);
      const progress = currentVal - idx;

      const setA = targetSets[idx];
      const setB = targetSets[nextIdx];

      // Fit/center based on the *actual interpolated points*.
      // This avoids cases where precomputed bounds (targetBounds) are slightly off and cause
      // icons (eye / wifi) to look "half" or cropped during/after transitions.
      const padding = 28;
      const availX = Math.max(1, cw / 2 - padding);
      const availY = Math.max(1, ch / 2 - padding);

      // Sample a subset of points to estimate bounds + center (fast, stable)
      const stride = 25; // smaller = more accurate, larger = faster
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (let i = 0; i < particleCount; i += stride) {
        const a = setA[i];
        const b = setB[i];
        const ix = a.x + (b.x - a.x) * progress;
        const iy = a.y + (b.y - a.y) * progress;
        if (ix < minX) minX = ix;
        if (ix > maxX) maxX = ix;
        if (iy < minY) minY = iy;
        if (iy > maxY) maxY = iy;
      }

      // Center offset (so asymmetric shapes like Wi‑Fi bands always remain centered)
      const centerOffsetX = isFinite(minX) && isFinite(maxX) ? (minX + maxX) / 2 : 0;
      const centerOffsetY = isFinite(minY) && isFinite(maxY) ? (minY + maxY) / 2 : 0;

      const maxAbsX = Math.max(Math.abs(minX - centerOffsetX), Math.abs(maxX - centerOffsetX)) || 1;
      const maxAbsY = Math.max(Math.abs(minY - centerOffsetY), Math.abs(maxY - centerOffsetY)) || 1;

      const fitScale = Math.min(availX / maxAbsX, availY / maxAbsY, 1);

      const projected: ProjectedParticle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const p = particlesRef.current[i];
        const tA = setA[i];
        const tB = setB[i];
        
        const tx = ((tA.x + (tB.x - tA.x) * progress) - centerOffsetX) * fitScale;
        const ty = ((tA.y + (tB.y - tA.y) * progress) - centerOffsetY) * fitScale;
        const tz = tA.z + (tB.z - tA.z) * progress;

        const driftX = Math.sin(time * 0.4 + p.seed) * 1.2;
        const driftY = Math.cos(time * 0.3 + p.seed * 0.7) * 1.2;
        const driftZ = Math.sin(time * 0.5 + p.seed * 1.1) * 1.2;

        let rx = 0, ry = 0, glow = 0;
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.lerpX;
          const dy = p.y - mouseRef.current.lerpY;
          const distSq = dx * dx + dy * dy;
          const limit = 200 * 200;
          if (distSq < limit) {
            const dist = Math.sqrt(distSq) || 0.0001;
            const force = Math.pow((200 - dist) / 200, 1.5);
            rx = (dx / dist) * force * 45;
            ry = (dy / dist) * force * 45;
            glow = force;
          }
        }

        p.vx += (tx + driftX + rx - p.x) * 0.08;
        p.vy += (ty + driftY + ry - p.y) * 0.08;
        p.vz += (tz + driftZ - p.z) * 0.08;
        p.vx *= 0.82; p.vy *= 0.82; p.vz *= 0.82;
        p.x += p.vx; p.y += p.vy; p.z += p.vz;

        const f = 900 / (900 + p.z);
        projected.push({
          x: p.x * f + centerX,
          y: p.y * f + centerY,
          z: p.z,
          size: Math.max(0.6, (p.z + 400) / 800 * 2.8 + 0.4),
          opacity: Math.max(0.05, Math.min(0.85, (p.z + 450) / 900)),
          glow: glow
        });
      }

      projected.sort((a, b) => b.z - a.z);

      for (const pp of projected) {
        let r = 215, g = 222, b = 255;
        
        if (pp.glow > 0) {
          const gR = pp.glow < 0.5 ? 0 : (pp.glow - 0.5) * 2 * 143;
          const gG = pp.glow < 0.5 ? 255 : (1 - (pp.glow - 0.5) * 2) * 255;
          const gB = 255;
          
          r = r * (1 - pp.glow) + gR * pp.glow;
          g = g * (1 - pp.glow) + gG * pp.glow;
          b = b * (1 - pp.glow) + gB * pp.glow;
        }

        ctx.fillStyle = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${pp.opacity})`;
        ctx.fillRect(pp.x - pp.size / 2, pp.y - pp.size / 2, pp.size, pp.size);
      }

      animationId = requestAnimationFrame(animate);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      if (!parent) return;

      const w = Math.max(parent.clientWidth, window.innerWidth);
      const h = Math.max(parent.clientHeight, window.innerHeight);
      if (!w || !h) return;

      // Match CSS size
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Match internal buffer
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      // IMPORTANT: reset transform (avoid cumulative scaling)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [targetSets, targetBounds]);

  return (
    <div className="w-full h-full relative pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
