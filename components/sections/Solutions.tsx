'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TreePalm, Waves, Umbrella, MapPin } from 'lucide-react';

const nucleos = [
  {
    icon: TreePalm,
    title: 'Clube de Campo',
    location: 'Jundiai/SP',
    description:
      '24 chales e apartamentos, piscinas, churrasqueiras, campo de futebol, sauna, playground e estacionamento gratuito.',
    price: 'R$ 45,00',
    priceLabel: 'Diaria associado',
    link: '/nucleo-de-lazer/clube-de-campo',
    gradient: 'from-green-500 to-green-600',
    gradientBg: 'from-green-500/10 to-green-600/10',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    priceBg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    priceColor: 'text-green-700 dark:text-green-300',
  },
  {
    icon: Waves,
    title: 'Clube Nautico',
    location: 'Boraceia/SP',
    description:
      '8 chales a beira do lago, piscina, academia ao ar livre, pier de pesca, cozinha caipira e quadra de volei.',
    price: 'R$ 45,00',
    priceLabel: 'Diaria associado',
    link: '/nucleo-de-lazer/clube-nautico',
    gradient: 'from-blue-500 to-blue-600',
    gradientBg: 'from-blue-500/10 to-blue-600/10',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    priceBg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    priceColor: 'text-blue-700 dark:text-blue-300',
  },
  {
    icon: Umbrella,
    title: 'Colonia de Ferias',
    location: 'Itanhaem/SP',
    description:
      '48 apartamentos proximos a praia, restaurante, sala de cinema, piscina, churrasqueiras e forno de pizza.',
    price: 'R$ 118,00',
    priceLabel: 'Diaria associado',
    link: '/nucleo-de-lazer/colonia-de-ferias',
    gradient: 'from-emerald-500 to-teal-600',
    gradientBg: 'from-emerald-500/10 to-teal-600/10',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    priceBg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    priceColor: 'text-emerald-700 dark:text-emerald-300',
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
            Nucleos de Lazer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Espacos exclusivos para descanso e diversao dos associados
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
                  className={`absolute inset-0 bg-gradient-to-br ${nucleo.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${nucleo.iconBg} rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={nucleo.iconColor} size={28} />
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
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border ${nucleo.priceBg} mb-6 w-fit`}
                  >
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {nucleo.priceLabel}
                    </span>
                    <span className={`text-lg font-bold ${nucleo.priceColor}`}>
                      {nucleo.price}
                    </span>
                  </div>

                  {/* Link */}
                  <Link
                    href={nucleo.link}
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
