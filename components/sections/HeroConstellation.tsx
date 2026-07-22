'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotionConfig } from 'framer-motion';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

/* Rede de partículas ("constelação"): bolinhas derivando devagar, ligadas por
   linhas quando estão perto, acendendo perto do ponteiro. Canvas porque linha
   dinâmica entre pontos arbitrários não existe em CSS. */

// LINK_DIST anda junto com a densidade: precisa ficar acima do espaçamento
// médio entre bolinhas (√(área / nº)), senão a rede se parte em fragmentos
// soltos em vez de parecer uma constelação. Com AREA_PER_PARTICLE = 19000 o
// espaçamento médio é √19000 ≈ 138px, então 170 mantém a folga de ~1,2× que
// a rede já tinha na densidade anterior.
const LINK_DIST = 170; // px — distância máxima para ligar duas bolinhas
const POINTER_DIST = 210; // px — raio de influência do cursor/dedo
const AREA_PER_PARTICLE = 19000; // px² por bolinha — menor = mais densa
const MIN_PARTICLES = 22;
const MAX_PARTICLES = 80;
const DOT_MIN_R = 5.7; // px — raio das bolinhas
const DOT_VAR_R = 4.8; // px — variação aleatória em cima do mínimo
const DOT_GLOW_R = 4.5; // px — quanto a bolinha incha quando o ponteiro chega perto
const SPEED = 0.13; // px por frame

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export default function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const systemReduced = useReducedMotionConfig();
  const { reducedMotion } = useAccessibility();
  const still = systemReduced || reducedMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let visible = true;
    let rect = canvas.getBoundingClientRect();
    const pointer = { x: 0, y: 0, active: false };

    const seed = (count: number) => {
      // Sorteio uniforme agrupa por acaso, e com o raio atual isso nasce como
      // bolas coladas. Rejeita posições muito próximas, com teto de tentativas
      // para nunca travar quando a área é pequena demais para acomodar todas.
      // 4,5× o raio máximo deixa ~2 diâmetros de respiro entre vizinhas; com
      // um mínimo mais exigente, mais sorteios falham, daí o teto maior.
      const minGap = (DOT_MIN_R + DOT_VAR_R) * 4.5;
      particles = [];
      for (let i = 0; i < count; i++) {
        let x = Math.random() * w;
        let y = Math.random() * h;
        for (let attempt = 0; attempt < 20; attempt++) {
          if (particles.every((p) => Math.hypot(p.x - x, p.y - y) >= minGap)) break;
          x = Math.random() * w;
          y = Math.random() * h;
        }
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * SPEED,
          vy: Math.sin(angle) * SPEED,
          r: DOT_MIN_R + Math.random() * DOT_VAR_R,
        });
      }
    };

    const resize = () => {
      rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // Cap o DPR em 2: acima disso o custo de pintura cresce sem ganho visível
      // num efeito de fundo desfocado como este.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(
        Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, (w * h) / AREA_PER_PARTICLE)),
      );
      // Só re-semeia se a contagem alvo mudou; caso contrário um resize
      // qualquer reembaralharia o desenho na cara do usuário.
      if (target !== particles.length) seed(target);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        if (!still) {
          p.x += p.vx;
          p.y += p.vy;
          // Quica nas bordas — mais simples que "dar a volta" e não gera o
          // pulo visível de quem reaparece do outro lado.
          if (p.x <= 0 || p.x >= w) p.vx *= -1;
          if (p.y <= 0 || p.y >= h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));
        }
      }

      // Quanto cada bolinha está "acesa" pela proximidade do ponteiro (0..1).
      const glow = particles.map((p) => {
        if (!pointer.active) return 0;
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
        return d > POINTER_DIST ? 0 : 1 - d / POINTER_DIST;
      });

      // Linhas entre bolinhas próximas.
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const proximity = 1 - Math.sqrt(d2) / LINK_DIST;
          const lit = Math.max(glow[i], glow[j]);
          const alpha = proximity * (0.1 + lit * 0.5);
          if (alpha < 0.008) continue;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Linhas ligando o ponteiro às bolinhas ao redor.
      if (pointer.active) {
        for (let i = 0; i < particles.length; i++) {
          if (glow[i] <= 0) continue;
          ctx.strokeStyle = `rgba(255,255,255,${glow[i] * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.stroke();
        }
      }

      // Bolinhas por último, para ficarem por cima das linhas.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(255,255,255,${0.34 + glow[i] * 0.62})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + glow[i] * DOT_GLOW_R, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (frame) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Com movimento reduzido: um quadro estático, sem laço e sem ponteiro.
    const shouldRun = () => !still && visible && !document.hidden;

    const sync = () => (shouldRun() ? start() : (stop(), draw()));

    const onPointer = (clientX: number, clientY: number) => {
      if (still) return;
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.x <= w && pointer.y >= 0 && pointer.y <= h;
    };

    const onMouseMove = (e: MouseEvent) => onPointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onPointer(t.clientX, t.clientY);
    };
    const onLeave = () => {
      pointer.active = false;
    };

    // rect só muda com scroll/resize; ler a cada movimento forçaria reflow.
    let rectFrame = 0;
    const refreshRect = () => {
      if (rectFrame) return;
      rectFrame = requestAnimationFrame(() => {
        rect = canvas.getBoundingClientRect();
        rectFrame = 0;
      });
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (!shouldRun()) draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    resize();
    sync();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onLeave, { passive: true });
    window.addEventListener('scroll', refreshRect, { passive: true });
    document.addEventListener('visibilitychange', sync);

    return () => {
      stop();
      if (rectFrame) cancelAnimationFrame(rectFrame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onLeave);
      window.removeEventListener('scroll', refreshRect);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [still]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
