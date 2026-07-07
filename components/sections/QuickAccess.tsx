'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TreePalm,
  Building2,
  Briefcase,
  Handshake,
  FileText,
  Calendar,
  Megaphone,
  Landmark,
  Camera,
} from 'lucide-react';

const portalLinks = [
  { icon: TreePalm, label: 'Núcleos de Lazer', href: '/nucleo-de-lazer', color: '#10B981' },
  { icon: Building2, label: 'Departamentos', href: '/departamentos', color: '#8B5CF6' },
  { icon: Briefcase, label: 'Serviços', href: '/servicos', color: '#0EA5E9' },
  { icon: Handshake, label: 'Parcerias', href: '/parcerias', color: '#F59E0B' },
  { icon: FileText, label: 'Documentos', href: '/documentos', color: '#6366F1' },
  { icon: Calendar, label: 'Eventos', href: '/calendario', color: '#EC4899' },
  { icon: Megaphone, label: 'Boletim', href: '/boletim', color: '#14B8A6' },
  { icon: Landmark, label: 'INDUSPREV', href: '/indusprev', color: '#7C3AED' },
  { icon: Camera, label: 'Galeria', href: '/galeria', color: '#F97316' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function PortalButton({ icon: Icon, label, href, color }: { icon: React.ElementType; label: string; href: string; color: string }) {
  return (
    <Link href={href} aria-label={label}>
      <motion.div
        variants={itemVariants}
        className="group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
          style={{ backgroundColor: `${color}18` }}
        >
          <Icon size={20} style={{ color }} className="sm:w-6 sm:h-6" />
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">{label}</span>
      </motion.div>
    </Link>
  );
}

export default function QuickAccess() {
  return (
    <section className="pt-6 pb-10 sm:pt-8 sm:pb-14 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Portal grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-2.5 sm:gap-3"
        >
          {portalLinks.map((btn) => (
            <PortalButton key={btn.label} {...btn} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
