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
} from 'lucide-react';

const services = [
  {
    icon: HeartPulse,
    title: 'Assistência Médica',
    description:
      'Plano de saúde UNIMED FESP com cobertura completa: consultas, exames, urgências, emergências e maternidade.',
    link: '/servicos/assistencia-medica',
    gradient: 'from-rose-500 to-red-500',
    bgIcon: 'bg-rose-100 dark:bg-rose-900/30',
    textIcon: 'text-rose-600 dark:text-rose-400',
  },
  {
    icon: Shield,
    title: 'Fundo Mútuo',
    description:
      'FUMUS e FUMUA: auxílio financeiro solidário e reembolso parcial de ambulância para associados e dependentes.',
    link: '/servicos/fundo-mutuo',
    gradient: 'from-amber-500 to-orange-500',
    bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
    textIcon: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Smile,
    title: 'Assistência Odontológica',
    description:
      'Cuidado dental completo para associados e dependentes com rede credenciada de qualidade.',
    link: '/servicos/assistencia-odontologica',
    gradient: 'from-sky-500 to-blue-500',
    bgIcon: 'bg-sky-100 dark:bg-sky-900/30',
    textIcon: 'text-sky-600 dark:text-sky-400',
  },
  {
    icon: Pill,
    title: 'Farmácias Conveniadas',
    description:
      'Rede conveniada de farmácias com descontos exclusivos para associados AES.',
    link: '/servicos/farmacias',
    gradient: 'from-emerald-500 to-green-500',
    bgIcon: 'bg-emerald-100 dark:bg-emerald-900/30',
    textIcon: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: ShieldCheck,
    title: 'Seguros',
    description:
      'Produtos de seguros com condições especiais negociadas para associados AES.',
    link: '/servicos/seguros',
    gradient: 'from-violet-500 to-purple-500',
    bgIcon: 'bg-violet-100 dark:bg-violet-900/30',
    textIcon: 'text-violet-600 dark:text-violet-400',
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

export default function ServicosPage() {
  return (
    <section className="py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full mb-4">
            Benefícios
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nossos{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Serviços
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Benefícios exclusivos para associados, dependentes e agregados
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5 hover:border-green-200 dark:hover:border-green-700/60 hover:-translate-y-1">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-300`}
                    />

                    <div className="relative mb-5">
                      <div
                        className={`w-14 h-14 ${service.bgIcon} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={service.textIcon} size={28} />
                      </div>
                    </div>

                    <div className="relative">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
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
