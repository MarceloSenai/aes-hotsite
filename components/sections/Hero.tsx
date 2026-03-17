'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, MapPin, Shield, CalendarDays, ChevronDown } from 'lucide-react';

const stats = [
  {
    icon: CalendarDays,
    value: '78+',
    label: 'Anos de História',
    description: 'Fundada em 1947',
  },
  {
    icon: MapPin,
    value: 'Núcleos',
    label: 'de Lazer',
    description: 'Para associados e família',
  },
  {
    icon: Shield,
    value: 'UNIMED',
    label: 'Plano de Saúde',
    description: 'Cobertura completa',
  },
  {
    icon: Heart,
    value: 'Assistência',
    label: 'Completa',
    description: 'Saúde, lazer e bem-estar',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--color-primary-light), rgba(255,255,255,0.5), white)' }}>
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          animate={{ x: [0, 60, 0], y: [0, 80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '-5%', left: '-10%', backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 30%, transparent)' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px]"
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '30%', right: '-5%', backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 30%, transparent)' }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] bg-teal-200/20 dark:bg-teal-900/15 rounded-full blur-[90px]"
          animate={{ x: [0, 30, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '5%', left: '20%' }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Logo + Badge */}
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
                <Image
                  src="/images/aes-logo.svg"
                  alt="AES - Associação dos Empregados do SENAI"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-sm mb-6"
              style={{ backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary-light)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-primary-dark)' }}>
                Utilidade Pública desde 1966 &mdash; Decreto Estadual n.&ordm; 9376
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight max-w-4xl"
            >
              Associação dos{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}
              >
                Empregados do SENAI
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
            >
              Proporcionando qualidade de vida aos nossos associados, dependentes e
              agregados desde 1947
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <a
                href="https://associado.aessenai.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl duration-300"
                style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}
              >
                Área do Associado
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 rounded-xl font-semibold transition-colors duration-300"
                style={{ borderColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
              >
                Fale Conosco
              </Link>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="group relative bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:shadow-lg"
                  style={{ borderColor: 'color-mix(in srgb, var(--color-primary-light) 60%, transparent)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                      <Icon
                        size={20}
                        style={{ color: 'var(--color-primary)' }}
                      />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold mt-1" style={{ color: 'var(--color-primary)' }}>
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center text-gray-500 dark:text-gray-400 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium tracking-wider uppercase mb-2">
            Descubra Mais
          </span>
          <ChevronDown size={20} className="opacity-60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
