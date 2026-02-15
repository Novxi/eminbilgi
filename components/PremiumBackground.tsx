
import React, { useEffect, useRef } from 'react';

export const PremiumBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // --- CONFIGURATION ---
    const ORB_COUNT = 3;
    const STAR_COUNT = 150;
    
    // Colorful Orbs (The "Nebula")
    const orbs = Array.from({ length: ORB_COUNT }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8, // Slow movement
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.min(w, h) * (0.4 + Math.random() * 0.2), // Large radius
      color: i === 0 ? 'rgba(30, 79, 255, 0.15)' : // Blue
             i === 1 ? 'rgba(124, 58, 237, 0.15)' : // Purple
             'rgba(6, 182, 212, 0.12)' // Cyan
    }));

    // Stars
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2,
      opacity: Math.random(),
      speed: Math.random() * 0.2 + 0.05
    }));

    let time = 0;

    const render = () => {
      time += 0.03;
      
      // 1. Fill Background (Deep Dark Blue/Black)
      ctx.fillStyle = '#020305';
      ctx.fillRect(0, 0, w, h);

      // 2. Render Orbs (Nebula Effect)
      // We use 'screen' blend mode to make them glow when they overlap
      ctx.globalCompositeOperation = 'screen';
      
      orbs.forEach(orb => {
        // Move
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off walls
        if (orb.x < -orb.radius) orb.vx = Math.abs(orb.vx);
        if (orb.x > w + orb.radius) orb.vx = -Math.abs(orb.vx);
        if (orb.y < -orb.radius) orb.vy = Math.abs(orb.vy);
        if (orb.y > h + orb.radius) orb.vy = -Math.abs(orb.vy);

        // Draw Gradient
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Render Stars
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#FFFFFF';
      
      stars.forEach(star => {
        // Twinkle
        const twinkle = Math.sin(time * 2 + star.x) * 0.5 + 0.5;
        ctx.globalAlpha = star.opacity * twinkle * 0.8;
        
        // Move slightly up
        star.y -= star.speed;
        if (star.y < 0) {
           star.y = h;
           star.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;

      // 4. Subtle Scanlines (TV Effect) for Texture
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      for(let y = 0; y < h; y += 4) {
         ctx.fillRect(0, y, w, 1);
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};
