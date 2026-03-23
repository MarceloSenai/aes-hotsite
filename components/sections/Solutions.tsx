'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TreePalm, Waves, Umbrella, MapPin } from 'lucide-react';
import { nucleoPricingService } from '@/lib/supabase/data-service';

const nucleosBase = [
  {
    id: 'clube-campo',
    icon: TreePalm,
    title: 'Clube de Campo',
    location: 'Jundiaí/SP',
    description:
      '24 chalés e apartamentos, piscinas, churrasqueiras, campo de futebol, sauna, playground e estacionamento gratuito.',
    defaultPrice: 'R$ 45,00',
    link: '/nucleo-de-lazer/clube-de-campo',
    gradientStyle: { background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))' } as React.CSSProperties,
    iconBgStyle: { backgroundColor: 'var(--color-primary-light)' } as React.CSSProperties,
    iconColorStyle: { color: 'var(--color-primary)' } as React.CSSProperties,
    priceBgStyle: { backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' } as React.CSSProperties,
    priceColorStyle: { color: 'var(--color-primary-dark)' } as React.CSSProperties,
  },
  {
    id: 'clube-nautico',
    icon: Waves,
    title: 'Clube Náutico',
    location: 'Boracéia/SP',
    description:
      '8 chalés à beira do lago, piscina, academia ao ar livre, pier de pesca, cozinha caipira e quadra de vôlei.',
    defaultPrice: 'R$ 45,00',
    link: '/nucleo-de-lazer/clube-nautico',
    gradientStyle: { background: 'linear-gradient(to bottom right, var(--color-secondary), var(--color-secondary-dark))' } as React.CSSProperties,
    iconBgStyle: { backgroundColor: 'var(--color-secondary-light)' } as React.CSSProperties,
    iconColorStyle: { color: 'var(--color-secondary)' } as React.CSSProperties,
    priceBgStyle: { backgroundColor: 'var(--color-secondary-light)', borderColor: 'var(--color-secondary)' } as React.CSSProperties,
    priceColorStyle: { color: 'var(--color-secondary-dark)' } as React.CSSProperties,
  },
  {
    id: 'colonia-ferias',
    icon: Umbrella,
    title: 'Colônia de Férias',
    location: 'Itanhaém/SP',
    description:
      '48 apartamentos próximos à praia, restaurante, sala de cinema, piscina, churrasqueiras e forno de pizza.',
    defaultPrice: 'R$ 118,00',
    link: '/nucleo-de-lazer/colonia-de-ferias',
    gradientStyle: { background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-accent))' } as React.CSSProperties,
    iconBgStyle: { backgroundColor: 'var(--color-primary-light)' } as React.CSSProperties,
    iconColorStyle: { color: 'var(--color-primary)' } as React.CSSProperties,
    priceBgStyle: { backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' } as React.CSSProperties,
    priceColorStyle: { color: 'var(--color-primary-dark)' } as React.CSSProperties,
  },
];

export default function Solutions() {
  const [prices, setPrices] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadPrices = async () => {
      const data = await nucleoPricingService.getAll();
      const p: Record<string, string> = {};
      (data as unknown as { id: string; nucleo_precos: { associado: string }[] }[]).forEach((n) => {
        if (n.nucleo_precos && n.nucleo_precos.length > 0) {
          p[n.id] = n.nucleo_precos[0].associado;
        }
      });
      setPrices(p);
    };
    loadPrices();
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
            Lazer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Núcleos de Lazer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Espaços exclusivos para descanso e diversão dos associados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nucleosBase.map((nucleo, idx) => {
            const Icon = nucleo.icon;
            const price = prices[nucleo.id] || nucleo.defaultPrice;
            return (
              <motion.div
                key={nucleo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700/60 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={nucleo.gradientStyle}
                />

                <div className="relative p-8 flex flex-col h-full">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={nucleo.iconBgStyle}
                  >
                    <Icon size={28} style={nucleo.iconColorStyle} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {nucleo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <MapPin size={14} />
                    <span>{nucleo.location}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-1">
                    {nucleo.description}
                  </p>

                  <div
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border mb-6 w-fit"
                    style={nucleo.priceBgStyle}
                  >
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Diária associado
                    </span>
                    <span className="text-lg font-bold" style={nucleo.priceColorStyle}>
                      {price}
                    </span>
                  </div>

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
