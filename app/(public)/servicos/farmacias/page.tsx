'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Pill, CheckCircle2, Percent, CreditCard, MapPin } from 'lucide-react';

const highlights = [
 {
 icon: Percent,
 title: 'Descontos Exclusivos',
 description: 'Preços especiais negociados para associados AES em medicamentos e produtos de saúde.',
 },
 {
 icon: MapPin,
 title: 'Rede Ampla',
 description: 'Farmácias conveniadas em diversas localidades para sua comodidade.',
 },
 {
 icon: CreditCard,
 title: 'Facilidade no Pagamento',
 description: 'Desconto em folha de pagamento e outras formas de pagamento facilitadas.',
 },
];

export default function FarmaciasPage() {
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
 <div className="w-16 h-16 bg-theme-primary-light dark:bg-theme-primary-20 rounded-2xl flex items-center justify-center">
 <Pill className="text-theme-primary dark:text-theme-primary" size={32} />
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Farmácias{' '}
 <span className="text-theme-gradient">
 Conveniadas
 </span>
 </h1>
 </div>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
 A AES mantém convênios com redes de farmácias para oferecer descontos
 exclusivos em medicamentos e produtos de saúde para seus associados e
 dependentes.
 </p>
 </motion.div>

 {/* Highlights */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="grid grid-cols-1 sm:grid-cols-3 gap-6"
 >
 {highlights.map((item, index) => {
 const Icon = item.icon;
 return (
 <motion.div
 key={item.title}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg hover:shadow-theme-glow hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300"
 >
 <div className="w-12 h-12 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center mb-4">
 <Icon className="text-theme-primary dark:text-theme-primary" size={24} />
 </div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
 {item.title}
 </h3>
 <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
 {item.description}
 </p>
 </motion.div>
 );
 })}
 </motion.div>
 </div>
 </section>
 );
}
