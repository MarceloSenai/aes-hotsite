'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
 ArrowLeft,
 Shield,
 Heart,
 Users,
 DollarSign,
 Ambulance,
 HandCoins,
} from 'lucide-react';

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.1, delayChildren: 0.2 },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
 },
};

export default function FundoMutuoPage() {
 return (
 <section className="py-24 gradient-theme-page-light min-h-screen">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Back */}
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.4 }}
 >
 <Link
 href="/servicos"
 className="inline-flex items-center gap-2 text-theme-primary dark:text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8"
 >
 <ArrowLeft size={18} />
 Voltar para Serviços
 </Link>
 </motion.div>

 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="mb-12"
 >
 <div className="flex items-center gap-4 mb-6">
 <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
 <Shield className="text-amber-600 dark:text-amber-400" size={32} />
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Fundo{' '}
 <span className="text-theme-gradient">
 Mútuo
 </span>
 </h1>
 </div>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
 A AES disponibiliza dois fundos mútuos para proteger seus associados e
 dependentes em momentos de necessidade.
 </p>
 </motion.div>

 <motion.div
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 className="space-y-8"
 >
 {/* FUMUS */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8 hover:shadow-lg hover:shadow-theme-glow transition-all duration-300"
 >
 <div className="flex items-center gap-4 mb-6">
 <div className="w-14 h-14 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center">
 <Heart className="text-theme-primary dark:text-theme-primary" size={28} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">FUMUS</h2>
 <p className="text-theme-primary dark:text-theme-primary font-medium text-sm">
 Fundo Mútuo de Solidariedade
 </p>
 </div>
 </div>

 <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
 Auxílio financeiro destinado aos associados em caso de falecimento ou
 amputação de membros. Um fundo de solidariedade mantido pelo Conselho
 Deliberativo da AES.
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
 <div className="bg-theme-primary-5 dark:bg-theme-primary-10 rounded-xl p-5 border border-theme-light dark:border-theme-primary-dark">
 <div className="flex items-center gap-3 mb-2">
 <Users className="text-theme-primary dark:text-theme-primary" size={20} />
 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
 Falecimento do Associado
 </span>
 </div>
 <p className="text-3xl font-bold text-gray-900 dark:text-white">
 R$ 5.000<span className="text-lg text-gray-400">,00</span>
 </p>
 </div>
 <div className="bg-theme-primary-5 dark:bg-theme-primary-10 rounded-xl p-5 border border-theme-light dark:border-theme-primary-dark">
 <div className="flex items-center gap-3 mb-2">
 <Heart className="text-theme-primary dark:text-theme-primary" size={20} />
 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
 Falecimento do Dependente
 </span>
 </div>
 <p className="text-3xl font-bold text-gray-900 dark:text-white">
 R$ 2.500<span className="text-lg text-gray-400">,00</span>
 </p>
 </div>
 </div>

 <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/40">
 <HandCoins className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" size={20} />
 <p className="text-sm text-gray-600 dark:text-gray-300">
 A reserva do FUMUS é mantida e gerida pelo Conselho Deliberativo da AES,
 garantindo segurança e transparência na administração dos recursos.
 </p>
 </div>
 </motion.div>

 {/* FUMUA */}
 <motion.div
 variants={itemVariants}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8 hover:shadow-lg hover:shadow-theme-glow transition-all duration-300"
 >
 <div className="flex items-center gap-4 mb-6">
 <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
 <Ambulance className="text-blue-600 dark:text-blue-400" size={28} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">FUMUA</h2>
 <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
 Fundo Mútuo de Utilização de Ambulância
 </p>
 </div>
 </div>

 <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
 Reembolso parcial para transporte de ambulância não coberto pelo plano de
 saúde. Disponível para todos os associados, dependentes e agregados
 cadastrados.
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/40">
 <div className="flex items-center gap-3 mb-2">
 <Users className="text-blue-600 dark:text-blue-400" size={20} />
 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
 Elegibilidade
 </span>
 </div>
 <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
 Associados, dependentes e agregados cadastrados
 </p>
 </div>
 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/40">
 <div className="flex items-center gap-3 mb-2">
 <DollarSign className="text-blue-600 dark:text-blue-400" size={20} />
 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
 Capital Inicial
 </span>
 </div>
 <p className="text-3xl font-bold text-gray-900 dark:text-white">
 R$ 6.000<span className="text-lg text-gray-400">,00</span>
 </p>
 </div>
 </div>

 <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/40">
 <HandCoins className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Quando a reserva diminui, é cobrada uma taxa de R$ 1,00 dos associados
 para reposição do fundo, garantindo a continuidade do benefício.
 </p>
 </div>
 </motion.div>
 </motion.div>
 </div>
 </section>
 );
}
