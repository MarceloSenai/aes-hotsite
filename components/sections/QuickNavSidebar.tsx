'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, UserPlus, IdCard, ChevronRight, Play, TreePalm } from 'lucide-react';
import { CONTACT } from '@/lib/config/contact';

const quickLinks = [
  { icon: Users, label: 'Quem Somos', href: '/sobre/quem-somos' },
  { icon: UserPlus, label: 'Associe-se', href: '/associe-se' },
  { icon: IdCard, label: 'Área do associado', href: CONTACT.associadoPortal, external: true },
];

export default function QuickNavSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 shadow-sm overflow-hidden h-full"
    >
      {/* Nav rows */}
      <nav className="divide-y divide-gray-100 dark:divide-gray-700/60">
        {quickLinks.map(({ icon: Icon, label, href, external }) => {
          const cls = 'group flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-500/10';
          const inner = (
            <>
              <Icon size={17} style={{ color: 'var(--color-primary)' }} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span className="flex-1 transition-colors duration-200 group-hover:text-red-600 dark:group-hover:text-red-400">{label}</span>
              <ChevronRight size={14} className="text-gray-300 dark:text-gray-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-red-500" />
            </>
          );
          return external ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
          ) : (
            <Link key={label} href={href} className={cls}>{inner}</Link>
          );
        })}
      </nav>

      {/* Núcleos de lazer video block */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700/60 mt-auto">
        <p className="text-xs font-bold text-gray-800 dark:text-gray-100 mb-2">
          Conheça nossos núcleos de lazer
        </p>
        <Link
          href="/nucleo-de-lazer"
          className="group relative block aspect-video rounded-xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
        >
          <TreePalm size={48} className="absolute -right-2 -bottom-2 text-white/15 rotate-[-12deg]" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-black/45 backdrop-blur-sm group-hover:scale-110 group-hover:bg-black/60 transition-all duration-300">
              <Play size={18} className="text-white translate-x-0.5" fill="currentColor" />
            </span>
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
