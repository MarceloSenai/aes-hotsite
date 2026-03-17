'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { History, TreePalm, Users, Scale } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface StatItemProps {
  label: string;
  description: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
  delay: number;
}

function StatCounter({ label, description, value, suffix, icon: Icon, delay }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="text-center p-8 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg" style={{ borderColor: 'color-mix(in srgb, var(--color-primary-light) 60%, transparent)' }}>
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--color-primary-light)' }}>
          <Icon size={28} style={{ color: 'var(--color-primary)' }} />
        </div>

        {/* Number */}
        <p className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent mb-2" style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}>
          {displayValue}
          {suffix}
        </p>

        {/* Label */}
        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {label}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const stats: StatItemProps[] = [
    {
      label: 'Anos de História',
      description: 'Fundada em 1947, promovendo lazer e bem-estar',
      value: 78,
      suffix: '+',
      icon: History,
      delay: 0,
    },
    {
      label: 'Núcleos de Lazer',
      description: 'Clube de Campo, Náutico Boracéia e Colônia Itanhaém',
      value: 3,
      suffix: '',
      icon: TreePalm,
      delay: 0.1,
    },
    {
      label: 'Membros na Administração',
      description: 'Conselho Deliberativo, Fiscal e Diretoria Executiva',
      value: 18,
      suffix: '',
      icon: Users,
      delay: 0.2,
    },
    {
      label: 'Anos de Utilidade Pública',
      description: 'Reconhecida desde 1966 pelo poder público',
      value: 60,
      suffix: '+',
      icon: Scale,
      delay: 0.3,
    },
  ];

  return (
    <section id="numeros" className="py-24 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--color-primary-light) 50%, transparent), white)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 30%, transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 20%, transparent)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
            Nossos Números
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AES em{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}>
              Números
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Décadas de dedicação ao bem-estar e lazer dos associados e seus dependentes
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <StatCounter key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
