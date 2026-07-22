'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export type DisplayMode = 'default' | 'image_only';

export interface CarouselSlideData {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  imagePath?: string;
  displayMode: DisplayMode;
}

export default function Carousel({ slides }: { slides: CarouselSlideData[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play with pause on hover
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused, slides.length]);

  if (slides.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-900 min-h-[220px] sm:min-h-[260px] flex items-center justify-center text-gray-400">
        <p className="text-sm">Nenhum slide disponível</p>
      </div>
    );
  }

  const slide = slides[current];
  // Só trata como banner "somente imagem" se de fato houver imagem. Sem esse
  // guard, um slide image_only salvo sem upload renderiza <img> sem src (banner
  // quebrado); aqui ele cai no layout padrão, que ao menos mostra o título.
  const isImageOnly = slide.displayMode === 'image_only' && !!slide.imagePath;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
        <div
          className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-900 min-h-[220px] sm:min-h-[260px] h-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={isImageOnly ? 'h-full' : 'flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-5 sm:p-6'}
            >
              {isImageOnly ? (
                /* ── Image-only mode: full-width banner ── */
                <Link href={slide.href} className="block w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
                  <img
                    src={slide.imagePath}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
              ) : (
                /* ── Default mode: image + text ── */
                <>
                  {/* Image or icon area */}
                  {slide.imagePath ? (
                    <div className="flex-shrink-0 w-full sm:w-48 md:w-56 h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg">
                      <img src={slide.imagePath} alt={slide.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: slide.badgeColor }}
                    >
                      <Sparkles size={32} className="text-white" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                      style={{ backgroundColor: slide.badgeColor }}
                    >
                      {slide.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed max-w-lg">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 shadow-md"
                      style={{ backgroundColor: slide.badgeColor }}
                    >
                      {slide.cta}
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors" aria-label="Anterior">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors" aria-label="Próximo">
            <ChevronRight size={20} />
          </button>

          {/* Dots + counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 tabular-nums">
              {current + 1}/{slides.length}
            </span>
            <div className="flex items-center gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-7' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
                  style={i === current ? { backgroundColor: slide.badgeColor } : undefined}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
  );
}
