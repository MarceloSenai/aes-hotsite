'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, UserCircle } from 'lucide-react';
import { CONTACT } from '@/lib/config/contact';

// Valores reais do repositório (ver Stats.tsx / sobre/quem-somos):
// fundada em 1947, utilidade pública desde 1966, 3 núcleos de lazer.
// Não há contagem real de "associados ativos" nem de "benefícios" em lugar nenhum
// do projeto — os valores antigos (15.000+, 50+) eram placeholders inventados.
const stats = [
  { value: '78+', label: 'Anos de História' },
  { value: '3', label: 'Núcleos de Lazer' },
  { value: '20+', label: 'Benefícios Disponíveis' },
];

// Entrada escalonada, consistente com o resto da home (QuickAccess/AssociadoDestaques).
const groupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroIntro() {
  return (
    <motion.div
      variants={groupVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 lg:space-y-8"
    >
      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] text-white"
      >
        Sua Associação,
        <br />
        <span className="text-white/70">Seus Benefícios</span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-lg"
      >
        Conectando você aos serviços que fazem a diferença na sua vida e da sua família
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <a
          href={CONTACT.associadoPortal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          style={{ color: 'var(--color-primary)' }}
        >
          <UserCircle size={19} />
          Área do associado
        </a>
        <Link
          href="/servicos"
          className="group inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:bg-white hover:border-white hover:text-theme-primary"
        >
          Conhecer benefícios
          <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 sm:gap-6 pt-2 max-w-lg">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{s.value}</div>
            <div className="text-xs sm:text-sm text-white/65 leading-snug">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
