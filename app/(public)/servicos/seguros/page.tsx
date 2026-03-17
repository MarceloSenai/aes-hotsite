'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, CheckCircle2, Shield, Heart, Car } from 'lucide-react';

const products = [
 {
 icon: Heart,
 title: 'Seguro de Vida',
 description: 'Proteção financeira para você e sua família com condições especiais.',
 },
 {
 icon: Shield,
 title: 'Seguro Residencial',
 description: 'Proteja seu patrimônio contra imprevistos com coberturas abrangentes.',
 },
 {
 icon: Car,
 title: 'Seguro Auto',
 description: 'Condições diferenciadas para seguros de veículos dos associados.',
 },
];

export default function SegurosPage() {
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
 <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center">
 <ShieldCheck className="text-violet-600 dark:text-violet-400" size={32} />
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 <span className="text-theme-gradient">
 Seguros
 </span>
 </h1>
 </div>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
 A AES negocia condições especiais em produtos de seguros para seus associados,
 oferecendo proteção e tranquilidade com preços diferenciados.
 </p>
 </motion.div>

 {/* Products */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 {products.map((product, index) => {
 const Icon = product.icon;
 return (
 <motion.div
 key={product.title}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg hover:shadow-theme-glow hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300"
 >
 <div className="w-12 h-12 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center mb-4">
 <Icon className="text-theme-primary dark:text-theme-primary" size={24} />
 </div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
 {product.title}
 </h3>
 <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
 {product.description}
 </p>
 </motion.div>
 );
 })}
 </div>
 </div>
 </section>
 );
}
