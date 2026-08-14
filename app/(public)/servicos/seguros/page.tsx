'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import { ShieldCheck, Car, Bike, HeartPulse, Home, Plane, KeyRound } from 'lucide-react';

const produtos = [
 { nome: 'Seguro de auto', icone: Car },
 { nome: 'Seguro de moto', icone: Bike },
 { nome: 'Seguro de vida e acidentes pessoais', icone: HeartPulse },
 { nome: 'Seguro residencial', icone: Home },
 { nome: 'Seguro viagem', icone: Plane },
 { nome: 'Seguro aluguel e fiança', icone: KeyRound },
];

export default function SegurosPage() {
 return (
 <>
 <PageHeader
 icone={ShieldCheck}
 titulo="Seguros"
 subtitulo="A AES oferece soluções para seus associados para complementar a segurança pública, mitigar riscos ocupacionais e promover qualidade de vida, direcionando demandas para corretoras especializadas e seguradoras, uma vez que a associação não opera como corretora ou seguradora direta."
 />

 <section className="py-16 gradient-theme-page-light min-h-screen">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
 {/* Papel da AES: complementa o subtítulo, que já é longo demais para
     absorver mais um parágrafo sem sufocar o cabeçalho. */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="max-w-4xl mx-auto bg-theme-primary-5 dark:bg-theme-primary-10 rounded-2xl border border-theme-light dark:border-theme-primary-dark p-6 sm:p-8"
 >
 <h2 className="font-bold text-gray-900 dark:text-white mb-2">
 Papel da AES nas negociações
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
 Garantir que as condições do contrato atendam às necessidades específicas dos associados,
 buscando as melhores soluções, ofertas e condições que proporcionem segurança financeira.
 </p>
 </motion.div>

 {/* Produtos */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.1 }}
 className="max-w-4xl mx-auto"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
 Produtos{' '}
 <span className="text-theme-gradient">oferecidos</span>
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {produtos.map((produto) => {
 const Icone = produto.icone;
 return (
 <div
 key={produto.nome}
 className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5"
 >
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center shrink-0">
 <Icone size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <p className="text-sm font-medium text-gray-900 dark:text-white">{produto.nome}</p>
 </div>
 );
 })}
 </div>
 </motion.div>

 {/* Contato: a corretora que atende os associados */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="max-w-4xl mx-auto text-center"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contato</h2>
 <div className="inline-flex bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8">
 <Image
 src="/images/parceiros/seguradora_novytha.png"
 alt="Novytha Seguros"
 width={280}
 height={90}
 className="h-auto w-auto max-h-24 object-contain"
 />
 </div>
 </motion.div>
 </div>
 </section>
 </>
 );
}
