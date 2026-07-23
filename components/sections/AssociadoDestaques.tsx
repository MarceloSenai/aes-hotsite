'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { beneficios } from './destaques/data';
import { groupVariants, itemVariants } from './destaques/motion';
import { BeneficioDestaque, BeneficioCard } from './destaques/BeneficioCards';
import TotalPassCard from './destaques/TotalPassCard';

function CabecalhoColuna({
  eyebrow,
  titulo,
  verHref,
  verLabel,
}: {
  eyebrow: string;
  titulo: string;
  verHref: string;
  verLabel: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <motion.span
          variants={itemVariants}
          className="mb-3 inline-block rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)] dark:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] dark:text-[var(--color-primary-light)]"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
        >
          {titulo}
        </motion.h2>
      </div>
      <motion.div variants={itemVariants}>
        <Link
          href={verHref}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] dark:text-[var(--color-primary-light)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-gray-900"
        >
          {verLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  );
}

export default function AssociadoDestaques() {
  const [destaque, ...demais] = beneficios;

  return (
    <section className="bg-gray-50 py-14 sm:py-20 dark:bg-gray-900/50">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={groupVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <CabecalhoColuna
            eyebrow="Benefícios"
            titulo="Vantagens que transformam o seu dia a dia"
            verHref="/servicos"
            verLabel="Ver todos"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <BeneficioDestaque item={destaque} total={beneficios.length} />
            {demais.map((item, i) => (
              <BeneficioCard key={item.href} item={item} index={i + 1} />
            ))}
            <TotalPassCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
