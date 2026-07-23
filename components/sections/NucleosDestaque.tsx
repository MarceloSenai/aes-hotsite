'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { nucleos } from './destaques/data';
import { groupVariants, itemVariants } from './destaques/motion';
import NucleoCard from './destaques/NucleoCard';

export default function NucleosDestaque() {
  return (
    <section className="bg-surface-tint relative overflow-hidden py-10 sm:py-14">
      <div
        aria-hidden="true"
        className="bg-theme-primary-10 pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-theme-primary-10 pointer-events-none absolute -right-24 -bottom-32 h-80 w-80 rounded-full blur-3xl"
      />

      {/* max-w-[1400px] e não o max-w-[1920px] das outras seções: a 1920 os cards
          passariam de 600px, e o recorte 4:5 das fotos só tem 526px de largura —
          a foto voltaria a subir de escala. Ver public/images/nucleos/CREDITOS.md. */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={groupVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-2xl">
              <motion.span
                variants={itemVariants}
                className="mb-3 inline-block rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)] dark:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] dark:text-[var(--color-primary-light)]"
              >
                Lazer
              </motion.span>
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
              >
                Núcleos de lazer
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-2 text-gray-600 dark:text-gray-300"
              >
                Espaços exclusivos para associados, com acomodações confortáveis, áreas de
                lazer e contato com a natureza.
              </motion.p>
            </div>
            <motion.div variants={itemVariants}>
              <Link
                href="/nucleo-de-lazer"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:text-[var(--color-primary-light)]"
              >
                Ver os núcleos
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {nucleos.map((item) => (
              <NucleoCard key={item.href} item={item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
