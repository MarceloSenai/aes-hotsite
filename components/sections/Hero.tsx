'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, TreePalm, Stethoscope, Shield, Handshake } from 'lucide-react';

const benefits = [
  { icon: Stethoscope, label: 'Saude', desc: 'Medica e Odontologica' },
  { icon: TreePalm, label: '3 Nucleos', desc: 'de Lazer' },
  { icon: Shield, label: 'Fundo Mutuo', desc: 'FUMUS e FUMUA' },
  { icon: Handshake, label: 'Parcerias', desc: 'Exclusivas' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-[70vh] lg:min-h-[75vh] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--color-primary-light), rgba(255,255,255,0.6), white)' }}
    >
      {/* Dark mode background override */}
      <div className="absolute inset-0 bg-transparent dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] animate-[float_18s_ease-in-out_infinite]"
          style={{ top: '-5%', left: '-8%', backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 25%, transparent)' }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full blur-[80px] animate-[float_22s_ease-in-out_infinite_reverse]"
          style={{ top: '25%', right: '-5%', backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 20%, transparent)' }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center pt-28 pb-16 sm:pt-32 sm:pb-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto">
                <Image src="/images/aes-logo.svg" alt="AES" fill className="object-contain drop-shadow-lg" priority />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 60%, white)', borderColor: 'var(--color-primary-light)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary)' }} />
              <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-primary-dark)' }}>
                Utilidade Publica desde 1966
              </span>
            </motion.div>

            {/* Welcome */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight max-w-4xl"
            >
              Bem-vindo(a) ao{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}
              >
                Portal AES
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed"
            >
              Associacao dos Empregados do SENAI — proporcionando qualidade de vida desde 1947
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href="https://associado.aessenai.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl duration-300"
                style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}
              >
                Area do Associado
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/associe-se"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 rounded-xl font-semibold transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Associe-se
              </Link>
            </motion.div>

            {/* Benefit strip */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 max-w-2xl w-full"
            >
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    className="flex items-center gap-2.5 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl px-3.5 py-3 border border-gray-200/60 dark:border-gray-700/40"
                  >
                    <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                      <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">{b.label}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">{b.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
