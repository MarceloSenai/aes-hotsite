'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { carouselService } from '@/lib/supabase/data-service';

type DisplayMode = 'default' | 'image_only';

interface CarouselSlide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  enabled: boolean;
  imagePath?: string;
  displayMode: DisplayMode;
}

function mapCarouselSlide(row: Record<string, unknown>): CarouselSlide {
  return {
    id: row.id as string,
    badge: row.badge as string,
    badgeColor: (row.badge_color as string) ?? '',
    title: row.title as string,
    description: row.description as string,
    cta: row.cta as string,
    href: row.href as string,
    enabled: row.enabled as boolean,
    imagePath: (row.image_path as string) || undefined,
    displayMode: (row.display_mode as DisplayMode) || 'default',
  };
}

export default function Carousel() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  // Load slides from Supabase
  useEffect(() => {
    const load = async () => {
      try {
        const data = await carouselService.getAll();
        const mapped = data.map((row) => mapCarouselSlide(row as unknown as Record<string, unknown>));
        setSlides(mapped.filter((s) => s.enabled));
      } catch (err) {
        console.error('Carousel load error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800 min-h-[280px] sm:min-h-[260px]" />
        </div>
      </section>
    );
  }

  if (slides.length === 0) return null;

  const slide = slides[current];
  const isImageOnly = slide.displayMode === 'image_only';

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Destaques e{' '}
            <span className="text-theme-gradient">Novidades</span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Acompanhe as últimas ofertas, notícias e comunicados da AES
          </p>
        </div>

        {/* Carousel container */}
        <div
          className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-900 min-h-[280px] sm:min-h-[260px]"
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
              className={isImageOnly ? '' : 'flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-8 sm:p-10'}
            >
              {isImageOnly ? (
                /* ── Image-only mode: full-width banner ── */
                <Link href={slide.href} className="block w-full h-[280px] sm:h-[340px] md:h-[400px]">
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
                    <div className="flex-shrink-0 w-full sm:w-64 md:w-80 h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg">
                      <img src={slide.imagePath} alt={slide.title} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div
                      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: slide.badgeColor }}
                    >
                      <Sparkles size={40} className="text-white" />
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
      </div>
    </section>
  );
}
