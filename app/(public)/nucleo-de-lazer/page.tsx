'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TreePine,
  Waves,
  Umbrella,
  MapPin,
  ArrowRight,
  ChevronRight,
  Home,
  Users,
  Phone,
} from 'lucide-react';

const nucleos = [
  {
    title: 'Clube de Campo',
    slug: 'clube-de-campo',
    location: 'Jundiaí/SP',
    description:
      'Chalés, apartamentos, piscinas, saunas e muito mais em meio à natureza. O refúgio perfeito para a família.',
    icon: TreePine,
    gradient: 'from-green-500 to-emerald-600',
    bgIcon: 'bg-green-100 dark:bg-green-900/40',
    textIcon: 'text-green-600 dark:text-green-400',
    highlights: ['12 Chalés', 'Piscinas', 'Saunas', 'Campo de Futebol'],
    image: '/images/clube-campo.jpg',
  },
  {
    title: 'Clube Náutico',
    slug: 'clube-nautico',
    location: 'Boraceia/SP',
    description:
      'Chalés à beira da represa com pier de pesca, academia ao ar livre e a tranquilidade do interior paulista.',
    icon: Waves,
    gradient: 'from-blue-500 to-cyan-600',
    bgIcon: 'bg-blue-100 dark:bg-blue-900/40',
    textIcon: 'text-blue-600 dark:text-blue-400',
    highlights: ['8 Chalés', 'Pier de Pesca', 'Academia', 'Cozinha Caipira'],
    image: '/images/clube-nautico.jpg',
  },
  {
    title: 'Colônia de Férias',
    slug: 'colonia-de-ferias',
    location: 'Itanhaém/SP',
    description:
      'Apartamentos completos na praia com restaurante, cinema, piscina e toda infraestrutura para suas férias.',
    icon: Umbrella,
    gradient: 'from-amber-500 to-orange-600',
    bgIcon: 'bg-amber-100 dark:bg-amber-900/40',
    textIcon: 'text-amber-600 dark:text-amber-400',
    highlights: ['48 Apartamentos', 'Restaurante', 'Cinema', 'Piscina'],
    image: '/images/colonia-ferias.jpg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function NucleosDeLazerPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            style={{ top: '-20%', right: '-10%' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] bg-emerald-300/10 rounded-full blur-[80px]"
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            style={{ bottom: '-10%', left: '-5%' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-green-100 text-sm mb-8"
          >
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home size={14} />
              Início
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <span className="text-white font-medium">Núcleos de Lazer</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-green-100 text-sm font-medium mb-6">
              <TreePine size={16} />
              3 opções para você e sua família
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Núcleos de Lazer
            </h1>
            <p className="text-lg sm:text-xl text-green-100 leading-relaxed">
              Espaços exclusivos para associados com acomodações confortáveis, áreas de lazer
              e contato com a natureza. Escolha o destino ideal para suas férias e fins de semana.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
              className="fill-white dark:fill-gray-950"
            />
          </svg>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {nucleos.map((nucleo) => {
              const Icon = nucleo.icon;
              return (
                <motion.div key={nucleo.slug} variants={cardVariants} className="group">
                  <Link href={`/nucleo-de-lazer/${nucleo.slug}`} className="block h-full">
                    <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-200 dark:hover:border-green-700/60 hover:-translate-y-2">
                      {/* Card Header with gradient */}
                      <div className={`relative h-48 bg-gradient-to-br ${nucleo.gradient} p-6 flex flex-col justify-between`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative flex items-center justify-between">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Icon className="text-white" size={28} />
                          </div>
                          <div className="flex items-center gap-1.5 text-white/90 text-sm">
                            <MapPin size={14} />
                            {nucleo.location}
                          </div>
                        </div>
                        <div className="relative">
                          <h3 className="text-2xl font-bold text-white">{nucleo.title}</h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                          {nucleo.description}
                        </p>

                        {/* Highlights */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {nucleo.highlights.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              {item}
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                          Ver detalhes
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

      {/* Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8 sm:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl shrink-0">
                  <Users size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Exclusivo para Associados
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Preços especiais para associados, dependentes e convidados.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl shrink-0">
                  <Phone size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Reservas por Telefone
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Entre em contato diretamente com o núcleo de sua preferência.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl shrink-0">
                  <MapPin size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    Localizações Estratégicas
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Interior e litoral paulista, fácil acesso para toda a família.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
