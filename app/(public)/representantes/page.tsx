'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
 ChevronRight,
 Users,
 Building,
 MapPin,
 Phone,
 UserCircle,
 Info,
 Mail,
} from 'lucide-react';
import { SiteConfigManager, type Representante } from '@/lib/config/site-config';

/* ------------------------------------------------------------------ */
/* Animation variants */
/* ------------------------------------------------------------------ */

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { staggerChildren: 0.12, delayChildren: 0.2 },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 24 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
 },
};

const cardVariants = {
 hidden: { opacity: 0, scale: 0.95 },
 visible: {
 opacity: 1,
 scale: 1,
 transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
 },
};

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function RepresentantesPage() {
 const [representantes, setRepresentantes] = useState<Representante[]>([]);

 useEffect(() => {
  const load = () => {
   const config = SiteConfigManager.getConfig();
   setRepresentantes(config.representantes);
  };
  load();
  window.addEventListener('aes-config-change', load);
  return () => window.removeEventListener('aes-config-change', load);
 }, []);

 // Group representantes by regional
 const grouped = representantes.reduce<Record<string, Representante[]>>((acc, rep) => {
  if (!acc[rep.regional]) acc[rep.regional] = [];
  acc[rep.regional].push(rep);
  return acc;
 }, {});

 const regionais = Object.keys(grouped);

 return (
 <>
 {/* ── Hero Banner ── */}
 <section className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom right, var(--color-primary-dark), var(--color-primary), var(--color-primary-dark))" }}>
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <motion.div
 className="absolute w-[400px] h-[400px] bg-theme-primary-20 rounded-full blur-[100px]"
 animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
 transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
 style={{ top: '-10%', right: '-5%' }}
 />
 </div>

 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 >
 {/* Breadcrumb */}
 <nav className="flex items-center gap-2 text-white/60 text-sm mb-6">
 <Link href="/" className="hover:text-white transition-colors">
 Home
 </Link>
 <ChevronRight size={14} />
 <span className="text-white font-medium">Representantes AES</span>
 </nav>

 <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
 Representantes AES
 </h1>
 <p className="text-lg text-white/80 max-w-2xl">
 Associados distribuídos pelas unidades do SENAI no estado de São Paulo,
 representando a AES junto aos colegas.
 </p>
 </motion.div>
 </div>
 </section>

 {/* ── Content ── */}
 <section className="bg-white dark:bg-gray-950 py-16 sm:py-24">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="space-y-12"
 >
 {/* Intro */}
 <motion.div
 variants={itemVariants}
 className="flex gap-4 items-start p-6 bg-theme-primary-5 dark:bg-theme-primary-10 rounded-2xl border border-theme-light dark:border-theme-primary-dark"
 >
 <div className="p-2.5 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl shrink-0">
 <Info size={22} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
 O que são os Representantes?
 </h2>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
 Os representantes são associados da AES distribuídos pelas diversas
 unidades do SENAI no estado de São Paulo. Eles atuam como elo entre
 a associação e os colegas de trabalho, divulgando benefícios,
 atividades e serviços oferecidos pela AES, além de encaminhar
 demandas e sugestões dos associados.
 </p>
 </div>
 </motion.div>

 {/* Grouped by Regional */}
 {regionais.map((regional) => (
 <motion.div key={regional} variants={itemVariants}>
 <div className="flex items-center gap-3 mb-6">
 <div className="p-2.5 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl">
 <MapPin
 size={22}
 className="text-theme-primary dark:text-theme-primary"
 />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
 {regional}
 </h2>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {grouped[regional].length} representante{grouped[regional].length !== 1 ? 's' : ''}
 </p>
 </div>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {grouped[regional].map((rep) => (
 <motion.div
 key={rep.id}
 variants={cardVariants}
 className="group p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-theme-primary-light dark:hover:border-theme-primary-dark hover:shadow-lg hover:shadow-theme-glow transition-all duration-300"
 >
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-5 dark:bg-theme-primary-10 rounded-full group-hover:bg-theme-primary-light dark:group-hover:bg-theme-primary-20 transition-colors shrink-0">
 <UserCircle
 size={24}
 className="text-theme-primary dark:text-theme-primary"
 />
 </div>
 <div>
 <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
 {rep.nome}
 </h3>
 <span className="inline-flex items-center mt-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light">
 {rep.unidade}
 </span>
 {rep.email && (
 <a
 href={`mailto:${rep.email}`}
 className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 dark:text-gray-400 hover:text-theme-primary dark:hover:text-theme-primary transition-colors"
 >
 <Mail size={12} />
 {rep.email}
 </a>
 )}
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.div>
 ))}

 {/* Contact CTA */}
 <motion.div variants={itemVariants}>
 <div className="bg-theme-primary-5 dark:bg-theme-primary-10 rounded-2xl border border-theme-light dark:border-theme-primary-dark p-8 text-center">
 <div className="p-3 bg-theme-primary-light dark:bg-theme-primary-20 rounded-full inline-flex mb-4">
 <Phone
 size={24}
 className="text-theme-primary dark:text-theme-primary"
 />
 </div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
 Entre em Contato
 </h3>
 <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
 Para mais informações sobre os representantes ou para se tornar um
 representante AES na sua unidade, ligue para a sede.
 </p>
 <a
 href="tel:+551133679900"
 className="inline-flex items-center gap-2 px-6 py-3 gradient-theme-cta text-white rounded-xl font-semibold transition-all shadow-lg shadow-theme-primary hover:shadow-xl hover:shadow-theme-glow duration-300"
 >
 <Phone size={18} />
 (11) 3367-9900
 </a>
 </div>
 </motion.div>
 </motion.div>
 </div>
 </section>
 </>
 );
}
