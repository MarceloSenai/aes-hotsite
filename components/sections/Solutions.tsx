'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Building, Settings } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      icon: Briefcase,
      title: 'PEP - Programa de Educação Profissional',
      description:
        'Formação especializada em mais de 30 áreas, preparando profissionais competentes para o mercado.',
      link: '/solucoes/pep',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Building,
      title: 'Arquitetura Educacional',
      description:
        'Estrutura de programas inovadores com módulos flexíveis e progressão de carreira clara.',
      link: '/solucoes/arquitetura',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Settings,
      title: 'Integração de Sistemas',
      description:
        'Parcerias com indústria, empresas e instituições para aplicação prática do conhecimento.',
      link: '/solucoes/integracao',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nossas Soluções
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Programas educacionais desenhados para transformar vidas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 hover:shadow-xl"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative p-8">
                  <div className={`w-14 h-14 bg-gradient-to-br ${solution.color} rounded-lg flex items-center justify-center mb-6 text-white`}>
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {solution.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <Link
                    href={solution.link}
                    className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all"
                  >
                    Saiba Mais
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
