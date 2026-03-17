'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
}

function StatCounter({ label, value, suffix }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-8"
    >
      <p className="text-5xl sm:text-6xl font-bold text-green-600 dark:text-green-400 mb-2">
        {displayValue}
        {suffix}
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">{label}</p>
    </motion.div>
  );
}

export default function Stats() {
  const stats: StatItemProps[] = [
    { label: 'Anos de História', value: 10, suffix: '+' },
    { label: 'Associados Ativos', value: 5000, suffix: '+' },
    { label: 'Escolas Parceiras', value: 150, suffix: '' },
    { label: 'Alunos Beneficiados', value: 50000, suffix: '+' },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Números que Falam
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Impacto real na formação de profissionais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <StatCounter key={idx} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
