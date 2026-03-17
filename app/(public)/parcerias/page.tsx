'use client';

import { motion } from 'framer-motion';
import {
  Handshake,
  ExternalLink,
  Phone,
  GraduationCap,
  Dumbbell,
  Hotel,
  ShoppingCart,
  BookOpen,
  Instagram,
  Globe,
} from 'lucide-react';

const partners = [
  {
    name: 'Wise UP',
    category: 'Idiomas',
    description: 'Escola de ingles com condicoes especiais para associados AES.',
    contact: 'Gustavo: (11) 94019-6285',
    contactHref: 'tel:+5511940196285',
    icon: BookOpen,
    color: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    name: 'IFEPAF',
    category: 'Instituto',
    description: 'Instituto FEPAF com beneficios para associados.',
    link: 'https://www.ifepaf.com.br',
    linkLabel: 'ifepaf.com.br',
    icon: GraduationCap,
    color: 'bg-emerald-100 dark:bg-emerald-900/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    name: 'My Box Pompeia',
    category: 'Fitness',
    description: '12% desconto no cash/Pix, 7% no boleto. Aula experimental gratuita.',
    link: 'https://www.myboxoficial.com.br',
    linkLabel: 'myboxoficial.com.br',
    icon: Dumbbell,
    color: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    name: 'Academia RCR SPORTS',
    category: 'Fitness',
    description: 'Academia com condicoes exclusivas para associados AES.',
    social: '@rcrsports',
    icon: Dumbbell,
    color: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-600 dark:text-red-400',
  },
  {
    name: 'Pousada Alpes',
    category: 'Hospedagem',
    description: 'Hospedagem com tarifas especiais para associados.',
    link: 'https://pousadaalpes.com.br',
    linkLabel: 'pousadaalpes.com.br',
    social: '@pousada_alpes',
    icon: Hotel,
    color: 'bg-teal-100 dark:bg-teal-900/30',
    textColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    name: 'Electrolux',
    category: 'Eletrodomesticos',
    description: 'Ate 40% de desconto, 10x sem juros e frete gratis.',
    link: 'https://shopclub.com.br',
    linkLabel: 'shopclub.com.br',
    icon: ShoppingCart,
    color: 'bg-indigo-100 dark:bg-indigo-900/30',
    textColor: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    name: 'UNIP',
    category: 'Educacao',
    description: 'Universidade Paulista - Av. Paulista, 900.',
    link: 'https://www.unip.br',
    linkLabel: 'unip.br',
    icon: GraduationCap,
    color: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400',
  },
  {
    name: 'OMEC/UMC',
    category: 'Educacao',
    description: 'Universidade de Mogi das Cruzes.',
    contact: '(11) 4798-7000',
    contactHref: 'tel:+551147987000',
    link: 'https://www.umc.br',
    linkLabel: 'umc.br',
    icon: GraduationCap,
    color: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    name: 'UNIVAP',
    category: 'Educacao',
    description: 'Universidade do Vale do Paraiba - Sao Jose dos Campos.',
    contact: '(12) 3947-1000',
    contactHref: 'tel:+551239471000',
    link: 'https://www.univap.br',
    linkLabel: 'univap.br',
    icon: GraduationCap,
    color: 'bg-sky-100 dark:bg-sky-900/30',
    textColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    name: 'Totalpass',
    category: 'Bem-estar',
    description: 'Acesso a academias (Smart Fit, Bio Ritmo) e servicos de saude mental e nutricao.',
    icon: Dumbbell,
    color: 'bg-rose-100 dark:bg-rose-900/30',
    textColor: 'text-rose-600 dark:text-rose-400',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ParceriasPage() {
  return (
    <section className="py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-full mb-4">
            Convenios
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nossas{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Parcerias
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convenios e parcerias exclusivas para associados AES
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={partner.name}
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg hover:shadow-green-500/5 hover:border-green-200 dark:hover:border-green-700/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 ${partner.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={partner.textColor} size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {partner.name}
                    </h3>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                      {partner.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {partner.description}
                </p>

                <div className="space-y-2">
                  {partner.contact && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="text-gray-400" size={14} />
                      {partner.contactHref ? (
                        <a
                          href={partner.contactHref}
                          className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        >
                          {partner.contact}
                        </a>
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">
                          {partner.contact}
                        </span>
                      )}
                    </div>
                  )}
                  {partner.link && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="text-gray-400" size={14} />
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-1"
                      >
                        {partner.linkLabel}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                  {partner.social && (
                    <div className="flex items-center gap-2 text-sm">
                      <Instagram className="text-gray-400" size={14} />
                      <span className="text-gray-700 dark:text-gray-300">
                        {partner.social}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
