'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Heart } from 'lucide-react';

export default function Mission() {
  const items = [
    {
      icon: Target,
      title: 'Nossa Missão',
      description:
        'Proporcionar educação de qualidade, acessível e transformadora que prepare profissionais competentes para um mercado em constante evolução.',
    },
    {
      icon: Lightbulb,
      title: 'Nossa Visão',
      description:
        'Ser referência nacional em educação profissional inovadora, conectando talento, tecnologia e oportunidades de carreira.',
    },
    {
      icon: Heart,
      title: 'Nossos Valores',
      description:
        'Excelência, inclusão, inovação e compromisso com o desenvolvimento integral de cada associado e aluno.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nossos Pilares
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Valores que guiam cada decisão e ação em prol da educação
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-green-900/20 transition-all"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
