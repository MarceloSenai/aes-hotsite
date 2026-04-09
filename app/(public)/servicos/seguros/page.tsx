'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Mail } from 'lucide-react';
import { parceirosSeguroService } from '@/lib/services/data-service';

interface ParceiroSeguro {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  contato: string;
}

export default function SegurosPage() {
 const [parceiros, setParceiros] = useState<ParceiroSeguro[]>([]);

 useEffect(() => {
  const load = async () => {
   const data = await parceirosSeguroService.getAll();
   setParceiros(data as unknown as ParceiroSeguro[]);
  };
  load();
 }, []);

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

 {/* Partners */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 {parceiros.map((parceiro, index) => (
 <motion.div
 key={parceiro.id}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg hover:shadow-theme-glow hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300"
 >
 <div className="w-12 h-12 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center mb-4">
 <ShieldCheck className="text-theme-primary dark:text-theme-primary" size={24} />
 </div>
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
 {parceiro.nome}
 </h3>
 <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 mb-3">
 {parceiro.tipo}
 </span>
 <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
 {parceiro.descricao}
 </p>
 <a
 href={`mailto:${parceiro.contato}`}
 className="inline-flex items-center gap-1.5 text-sm text-theme-primary dark:text-theme-primary hover:underline"
 >
 <Mail size={14} />
 {parceiro.contato}
 </a>
 </motion.div>
 ))}
 </div>

 {/* Empty state */}
 {parceiros.length === 0 && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="text-center py-16"
 >
 <ShieldCheck className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
 <p className="text-gray-500 dark:text-gray-400">
 Nenhum parceiro de seguro cadastrado no momento.
 </p>
 </motion.div>
 )}
 </div>
 </section>
 );
}
