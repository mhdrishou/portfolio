'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 0.5;
        this.density = (Math.random() * 30) + 1;
        
        const isDark = resolvedTheme === 'dark';
        const alpha = Math.random() * 0.5 + 0.1;
        this.color = isDark 
          ? `rgba(168, 216, 240, ${alpha})` 
          : `rgba(91, 196, 245, ${alpha})`;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (prefersReducedMotion) return;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        const maxDistance = 150;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
        
        this.baseY -= 0.2;
        if (this.baseY < 0 && canvas) {
          this.baseY = canvas.height;
          this.baseX = Math.random() * canvas.width;
          this.x = this.baseX;
          this.y = this.baseY;
        }
      }
    }

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    window.addEventListener('resize', resize);
    resize();

    function initParticles() {
      if (!canvas) return;
      particles = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 10000, 150);
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    }

    let hue1 = 195;
    let hue2 = 210;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = resolvedTheme === 'dark';
      
      if (!prefersReducedMotion) {
        hue1 = (hue1 + 0.1) % 360;
        hue2 = (hue2 + 0.15) % 360;
      }

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(Date.now() * 0.0005) * 200,
        canvas.height * 0.5 + Math.cos(Date.now() * 0.0003) * 200,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width
      );

      if (isDark) {
        gradient.addColorStop(0, `hsla(200, 100%, 15%, 0.15)`);
        gradient.addColorStop(0.5, `hsla(210, 100%, 10%, 0.1)`);
        gradient.addColorStop(1, 'rgba(8, 8, 8, 0)');
      } else {
        gradient.addColorStop(0, `hsla(200, 100%, 90%, 0.4)`);
        gradient.addColorStop(0.5, `hsla(210, 100%, 95%, 0.2)`);
        gradient.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      
      connect();

      animationFrameId = requestAnimationFrame(animate);
    }

    function connect() {
      if (!canvas || !ctx) return;
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (distance < (canvas.width / 10) * (canvas.height / 10)) {
            opacityValue = 1 - (distance / 15000);
            const isDark = resolvedTheme === 'dark';
            ctx.strokeStyle = isDark 
              ? `rgba(168, 216, 240, ${opacityValue * 0.15})`
              : `rgba(91, 196, 245, ${opacityValue * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-1000"
      />
      <div 
        className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
