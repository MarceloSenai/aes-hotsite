'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TreePalm, Waves, Umbrella, MapPin } from 'lucide-react';

const nucleos = [
  {
    icon: TreePalm,
    title: 'Clube de Campo',
    location: 'Jundiaí/SP',
    description:
      '24 chalés e apartamentos, piscinas, churrasqueiras, campo de futebol, sauna, playground e estacionamento gratuito.',
    price: 'R$ 45,00',
    priceLabel: 'Diária associado',
    link: '/nucleo-de-lazer/clube-de-campo',
    gradientStyle: { background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))' } as React.CSSProperties,
    iconBgStyle: { backgroundColor: 'var(--color-primary-light)' } as React.CSSProperties,
    iconColorStyle: { color: 'var(--color-primary)' } as React.CSSProperties,
    priceBgStyle: { backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' } as React.CSSProperties,
    priceColorStyle: { color: 'var(--color-primary-dark)' } as React.CSSProperties,
  },
  {
    icon: Waves,
    title: 'Clube Náutico',
    location: 'Boraceia/SP',
    description:
      '8 chalés à beira do lago, piscina, academia ao ar livre, pier de pesca, cozinha caipira e quadra de vôlei.',
    price: 'R$ 45,00',
    priceLabel: 'Diária associado',
    link: '/nucleo-de-lazer/clube-nautico',
    gradientStyle: { background: 'linear-gradient(to bottom right, var(--color-secondary), var(--color-secondary-dark))' } as React.CSSProperties,
    iconBgStyle: { backgroundColor: 'var(--color-secondary-light)' } as React.CSSProperties,
    iconColorStyle: { color: 'var(--color-secondary)' } as React.CSSProperties,
    priceBgStyle: { backgroundColor: 'var(--color-secondary-light)', borderColor: 'var(--color-secondary)' } as React.CSSProperties,
    priceColorStyle: { color: 'var(--color-secondary-dark)' } as React.CSSProperties,
  },
  {
    icon: Umbrella,
    title: 'Colônia de Férias',
    location: 'Itanhaém/SP',
    description:
      '48 apartamentos próximos à praia, restaurante, sala de cinema, piscina, churrasqueiras e forno de pizza.',
    price: 'R$ 118,00',
    priceLabel: 'Diária associado',
    link: '/nucleo-de-lazer/colonia-de-ferias',
    gradientStyle: { background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-accent))' } as React.CSSProperties,
    iconBgStyle: { backgroundColor: 'var(--color-primary-light)' } as React.CSSProperties,
    iconColorStyle: { color: 'var(--color-primary)' } as React.CSSProperties,
    priceBgStyle: { backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' } as React.CSSProperties,
    priceColorStyle: { color: 'var(--color-primary-dark)' } as React.CSSProperties,
  },
];

export default function Solutions() {
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
            Núcleos de Lazer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Espaços exclusivos para descanso e diversão dos associados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nucleos.map((nucleo, idx) => {
            const Icon = nucleo.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 hover:shadow-xl"
              >
                {/* Gradient Background on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={nucleo.gradientStyle}
                />

                {/* Content */}
                <div className="relative p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={nucleo.iconBgStyle}
                  >
                    <Icon size={28} style={nucleo.iconColorStyle} />
                  </div>

                  {/* Title & Location */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {nucleo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin size={14} />
                    <span>{nucleo.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-1">
                    {nucleo.description}
                  </p>

                  {/* Price Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border mb-6 w-fit"
                    style={nucleo.priceBgStyle}
                  >
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {nucleo.priceLabel}
                    </span>
                    <span className="text-lg font-bold" style={nucleo.priceColorStyle}>
                      {nucleo.price}
                    </span>
                  </div>

                  {/* Link */}
                  <Link
                    href={nucleo.link}
                    className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                    style={{ color: 'var(--color-primary)' }}
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
