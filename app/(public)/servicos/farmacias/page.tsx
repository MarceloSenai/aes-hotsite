'use client';

import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import { Pill, Percent, CreditCard, MapPin, CheckCircle2 } from 'lucide-react';

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

const sobreOCartao = [
 'Cartão de crédito limitado.',
 'A ser utilizado em rede de saúde e de farmácias conveniadas.',
 'Destinado exclusivamente a associados da ativa.',
 'Adesão voluntária pelo e-mail cadastro@aessenai.org.br',
 'Não há cobrança de anuidade.',
];

export default function FarmaciasPage() {
 return (
 <>
 {/* Faixa vermelha (hero) */}
 <PageHeader
 icone={Pill}
 titulo="Farmácias Conveniadas"
 subtitulo="A AES disponibiliza o cartão System Farma para utilização em farmácias conveniadas."
 />

 {/* Conteúdo */}
 <section className="py-16 gradient-theme-page-light min-h-screen">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">

 {/* Highlights */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.15 }}
 className="grid grid-cols-1 sm:grid-cols-3 gap-6"
 >
 {highlights.map((item, index) => {
 const Icon = item.icon;
 return (
 <motion.div
 key={item.title}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
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

 {/* Sobre o cartão */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="mt-10 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8"
 >
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Sobre o cartão</h2>
 <ul className="space-y-3">
 {sobreOCartao.map((item) => (
 <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={18} className="text-theme-primary shrink-0 mt-0.5" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </motion.div>
 </div>
 </section>
 </>
 );
}
