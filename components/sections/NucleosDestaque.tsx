'use client';

import { motion } from 'framer-motion';
import { nucleos } from './destaques/data';
import { groupVariants } from './destaques/motion';
import NucleoCard from './destaques/NucleoCard';
import CabecalhoColuna from './destaques/CabecalhoColuna';

export default function NucleosDestaque() {
  return (
    <section className="bg-surface-tint relative overflow-hidden py-5 sm:py-5">
      <div
        aria-hidden="true"
        className="bg-theme-primary-10 pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-theme-primary-10 pointer-events-none absolute -right-24 -bottom-32 h-80 w-80 rounded-full blur-3xl"
      />

      {/* max-w-[1920px] como as demais seções. Os cards chegam a ~602px; o
          recorte 4:3 das fotos (877px, ver public/images/nucleos/CREDITOS.md)
          cobre essa largura sem upscale. */}
      <div className="relative mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={groupVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <CabecalhoColuna
            eyebrow="Lazer"
            titulo={
              <>
                Núcleos de{' '}
                <span className="text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  lazer
                </span>
              </>
            }
            subtitulo="Espaços exclusivos para associados, com acomodações confortáveis, áreas de lazer e contato com a natureza."
            verHref="/nucleo-de-lazer"
            verLabel="Ver os núcleos"
          />

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
