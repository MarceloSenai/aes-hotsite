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
      <div className="text-center p-8 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-green-100 dark:border-green-900/30 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-100/50 dark:hover:shadow-green-900/20">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 mb-5 group-hover:scale-110 transition-transform duration-300">
          <Icon size={28} className="text-green-600 dark:text-green-400" />
        </div>

        {/* Number */}
        <p className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-500 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent mb-2">
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
      label: 'Anos de Historia',
      description: 'Fundada em 1947, promovendo lazer e bem-estar',
      value: 78,
      suffix: '+',
      icon: History,
      delay: 0,
    },
    {
      label: 'Nucleos de Lazer',
      description: 'Clube de Campo, Nautico Boraceia e Colonia Itanhaem',
      value: 3,
      suffix: '',
      icon: TreePalm,
      delay: 0.1,
    },
    {
      label: 'Membros na Administracao',
      description: 'Conselho Deliberativo, Fiscal e Diretoria Executiva',
      value: 18,
      suffix: '',
      icon: Users,
      delay: 0.2,
    },
    {
      label: 'Anos de Utilidade Publica',
      description: 'Reconhecida desde 1966 pelo poder publico',
      value: 60,
      suffix: '+',
      icon: Scale,
      delay: 0.3,
    },
  ];

  return (
    <section id="numeros" className="py-24 bg-gradient-to-b from-green-50/50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-200/30 dark:bg-green-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl" />
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
          <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full mb-4">
            Nossos Numeros
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AES em{' '}
            <span className="bg-gradient-to-r from-green-600 to-green-500 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent">
              Numeros
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Decadas de dedicacao ao bem-estar e lazer dos associados e seus dependentes
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
