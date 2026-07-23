'use client';

import { motion } from 'framer-motion';
import { beneficios } from './destaques/data';
import { groupVariants } from './destaques/motion';
import { BeneficioDestaque, BeneficioCard } from './destaques/BeneficioCards';
import TotalPassCard from './destaques/TotalPassCard';
import CabecalhoColuna from './destaques/CabecalhoColuna';

export default function AssociadoDestaques() {
  const [destaque, ...demais] = beneficios;

  return (
    <section className="bg-gray-50 py-14 sm:py-5 dark:bg-gray-900/50">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={groupVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <CabecalhoColuna
            eyebrow="Benefícios exclusivos"
            titulo={
              <>
                Vantagens que{' '}
                <span className="text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  transformam
                </span>{' '}
                o dia a dia da sua família.
              </>
            }
            subtitulo="Ser AES é ter acesso a um ecossistema completo de saúde, proteção e economia — para você e todos que você ama."
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
