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
  MessageCircle,
  Facebook,
  Linkedin,
  Instagram,
  Mail,
} from 'lucide-react';

const buttons = [
  { icon: TreePalm, label: 'Nucleos de Lazer', href: '/nucleo-de-lazer', color: '#10B981' },
  { icon: Building2, label: 'Departamentos', href: '/departamentos', color: '#8B5CF6' },
  { icon: Briefcase, label: 'Servicos', href: '/servicos', color: '#0EA5E9' },
  { icon: Handshake, label: 'Parcerias', href: '/parcerias', color: '#F59E0B' },
  { icon: FileText, label: 'Documentos', href: '/documentos', color: '#6366F1' },
  { icon: Calendar, label: 'Calendario de Eventos', href: '/calendario', color: '#EC4899' },
  { icon: Megaphone, label: 'Boletim', href: '/boletim', color: '#14B8A6' },
  { icon: Landmark, label: 'INDUSPREV', href: '/indusprev', color: '#7C3AED' },
  { icon: Camera, label: 'Galeria de Fotos', href: '/galeria', color: '#F97316' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/551133679900', color: '#22C55E', external: true },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/aessenai', color: '#1877F2', external: true },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/aessenai', color: '#0A66C2', external: true },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/aessenai', color: '#E4405F', external: true },
  { icon: Mail, label: 'E-mail', href: 'mailto:gerente@aessenai.org.br', color: '#EF4444', external: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function QuickAccess() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Acesso <span className="text-theme-gradient">Rapido</span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Navegue por todas as areas do Portal AES
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4"
        >
          {buttons.map((btn) => {
            const Icon = btn.icon;
            const isExternal = 'external' in btn && btn.external;

            const content = (
              <motion.div
                variants={itemVariants}
                className="group flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${btn.color}15` }}
                >
                  <Icon size={24} style={{ color: btn.color }} className="sm:w-7 sm:h-7" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                  {btn.label}
                </span>
              </motion.div>
            );

            if (isExternal) {
              return (
                <a
                  key={btn.label}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={btn.label}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={btn.label} href={btn.href} aria-label={btn.label}>
                {content}
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
