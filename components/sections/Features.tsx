'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  HeartPulse,
  Smile,
  Shield,
  Pill,
  ShieldCheck,
  Palmtree,
} from 'lucide-react';

const services = [
  {
    icon: HeartPulse,
    title: 'Assistência Médica',
    description:
      'Plano de saúde UNIMED FESP com cobertura completa: consultas, exames, urgências, emergências e maternidade.',
    link: '/servicos/assistencia-medica',
    gradient: 'from-rose-500 to-red-500',
    bgLight: 'bg-rose-50',
    bgIcon: 'bg-rose-100 dark:bg-rose-900/30',
    textIcon: 'text-rose-600 dark:text-rose-400',
  },
  {
    icon: Smile,
    title: 'Assistência Odontológica',
    description:
      'Cuidado dental completo para associados e dependentes com rede credenciada.',
    link: '/servicos/assistencia-odontologica',
    gradient: 'from-sky-500 to-blue-500',
    bgLight: 'bg-sky-50',
    bgIcon: 'bg-sky-100 dark:bg-sky-900/30',
    textIcon: 'text-sky-600 dark:text-sky-400',
  },
  {
    icon: Shield,
    title: 'Fundo Mútuo (FUMUS)',
    description:
      'Auxílio financeiro solidário em caso de falecimento. Associado: R$ 5.000 | Dependente: R$ 2.500.',
    link: '/servicos/fumus',
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
    textIcon: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Pill,
    title: 'Farmácias',
    description:
      'Rede conveniada de farmácias com descontos exclusivos para associados.',
    link: '/servicos/farmacias',
    gradient: '',
    gradientStyle: { background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))' } as React.CSSProperties,
    bgLight: '',
    bgIcon: '',
    bgIconStyle: { backgroundColor: 'var(--color-primary-light)' } as React.CSSProperties,
    textIcon: '',
    textIconStyle: { color: 'var(--color-primary)' } as React.CSSProperties,
  },
  {
    icon: ShieldCheck,
    title: 'Seguros',
    description:
      'Produtos de seguros com condições especiais para associados AES.',
    link: '/servicos/seguros',
    gradient: 'from-violet-500 to-purple-500',
    bgLight: 'bg-violet-50',
    bgIcon: 'bg-violet-100 dark:bg-violet-900/30',
    textIcon: 'text-violet-600 dark:text-violet-400',
  },
  {
    icon: Palmtree,
    title: 'Núcleos de Lazer',
    description:
      '3 opções: Clube de Campo (Jundiaí), Clube Náutico (Boracéia) e Colônia de Férias (Itanhaém).',
    link: '/servicos/nucleos-de-lazer',
    gradient: 'from-teal-500 to-cyan-500',
    bgLight: 'bg-teal-50',
    bgIcon: 'bg-teal-100 dark:bg-teal-900/30',
    textIcon: 'text-teal-600 dark:text-teal-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Features() {
  return (
    <section id="servicos" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
            Benefícios
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nossos{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))' }}>
              Serviços
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Benefícios exclusivos para associados e dependentes
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative"
              >
                <Link href={service.link} className="block h-full">
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 p-8 transition-all duration-300 hover:shadow-xl hover:border-theme-primary hover:-translate-y-1">
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 ${service.gradient ? `bg-gradient-to-br ${service.gradient}` : ''} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-300`}
                      {...('gradientStyle' in service ? { style: (service as Record<string, any>).gradientStyle } : {})}
                    />

                    {/* Icon */}
                    <div className="relative mb-5">
                      <div
                        className={`w-14 h-14 ${service.bgIcon} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        {...('bgIconStyle' in service ? { style: (service as Record<string, any>).bgIconStyle } : {})}
                      >
                        <Icon className={service.textIcon} size={28} {...('textIconStyle' in service ? { style: (service as Record<string, any>).textIconStyle } : {})} />
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <span className="inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all duration-300" style={{ color: 'var(--color-primary)' }}>
                        Saiba mais
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
