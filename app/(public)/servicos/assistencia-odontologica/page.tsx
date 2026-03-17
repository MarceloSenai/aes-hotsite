'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Smile, CheckCircle2 } from 'lucide-react';

const benefits = [
 'Consultas odontológicas de rotina',
 'Tratamentos preventivos e restauradores',
 'Rede credenciada de qualidade',
 'Cobertura para associados e dependentes',
 'Atendimento em diversas especialidades',
 'Procedimentos de urgência odontológica',
];

export default function AssistenciaOdontologicaPage() {
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
 <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center">
 <Smile className="text-sky-600 dark:text-sky-400" size={32} />
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Assistência{' '}
 <span className="text-theme-gradient">
 Odontológica
 </span>
 </h1>
 </div>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
 A AES oferece assistência odontológica completa para seus associados e
 dependentes, com acesso a uma rede credenciada de profissionais qualificados
 em diversas especialidades.
 </p>
 </motion.div>

 {/* Benefits */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 Benefícios Inclusos
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {benefits.map((benefit, index) => (
 <motion.div
 key={benefit}
 initial={{ opacity: 0, x: -10 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
 className="flex items-center gap-3"
 >
 <CheckCircle2 className="text-theme-primary dark:text-theme-primary flex-shrink-0" size={20} />
 <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
 </motion.div>
 ))}
 </div>
 </motion.div>
 </div>
 </section>
 );
}
