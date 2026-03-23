'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Megaphone, Gift, Newspaper, Calendar } from 'lucide-react';
import Link from 'next/link';

interface CarouselSlide {
  id: number;
  icon: React.ElementType;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  gradient: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    icon: Calendar,
    badge: 'Eventos',
    badgeColor: '#8B5CF6',
    title: 'Calendario de Eventos 2026',
    description: 'Confira a programacao completa de eventos, atividades culturais, esportivas e de lazer para os associados e dependentes.',
    cta: 'Ver Calendario',
    href: '/calendario',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
  },
  {
    id: 2,
    icon: Megaphone,
    badge: 'Comunicado',
    badgeColor: '#EF4444',
    title: 'Novas Parcerias Exclusivas',
    description: 'A AES firmou novas parcerias com universidades e academias. Descontos especiais para associados e dependentes.',
    cta: 'Saiba Mais',
    href: '/parcerias',
    gradient: 'linear-gradient(135deg, #EF4444, #DC2626)',
  },
  {
    id: 3,
    icon: Gift,
    badge: 'Oferta',
    badgeColor: '#10B981',
    title: 'Reservas nos Nucleos de Lazer',
    description: 'Aproveite as ferias nos nossos 3 nucleos de lazer: Clube de Campo, Clube Nautico e Colonia de Ferias em Itanhaem.',
    cta: 'Reservar Agora',
    href: '/nucleo-de-lazer',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
  },
  {
    id: 4,
    icon: Newspaper,
    badge: 'Boletim',
    badgeColor: '#0EA5E9',
    title: 'Boletim Informativo AES',
    description: 'Fique por dentro de todas as novidades, comunicados e informacoes importantes da Associacao.',
    cta: 'Ler Boletim',
    href: '/boletim',
    gradient: 'linear-gradient(135deg, #0EA5E9, #0284C7)',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const Icon = slide.icon;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Destaques e{' '}
            <span className="text-theme-gradient">Novidades</span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Acompanhe as ultimas ofertas, noticias e comunicados da AES
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-gray-700/60 bg-gray-50 dark:bg-gray-900 min-h-[280px] sm:min-h-[260px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-8 sm:p-10"
            >
              {/* Icon area */}
              <div
                className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: slide.gradient }}
              >
                <Icon size={40} className="text-white" />
              </div>

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
                  style={{ background: slide.gradient }}
                >
                  {slide.cta}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Proximo"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6' : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
                style={i === current ? { backgroundColor: slide.badgeColor } : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
