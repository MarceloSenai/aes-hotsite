'use client';

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
} from 'lucide-react';

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
/* Data */
/* ------------------------------------------------------------------ */

interface Representative {
 name: string;
 unit: string;
}

const centralReps: Representative[] = [
 { name: 'Anelise Wulk Oliveira', unit: 'EDITORA / ACPGR / GSTI' },
 { name: 'Erika da Graça Paiva Braga', unit: 'GSCF' },
 { name: 'Walter do Nascimento', unit: 'SCL' },
 { name: 'Eduardo Fausto da Silva', unit: 'GSRH' },
 { name: 'Fabiano Ramos', unit: 'GSJ / AAE / DOS / GAS' },
];

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default function RepresentantesPage() {
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

 {/* Central Admin Representatives */}
 <motion.div variants={itemVariants}>
 <div className="flex items-center gap-3 mb-6">
 <div className="p-2.5 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl">
 <Building
 size={22}
 className="text-theme-primary dark:text-theme-primary"
 />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
 Administração Central
 </h2>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 Representantes nas gerências e departamentos centrais do SENAI-SP
 </p>
 </div>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {centralReps.map((rep) => (
 <motion.div
 key={rep.name}
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
 {rep.name}
 </h3>
 <span className="inline-flex items-center mt-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light">
 {rep.unit}
 </span>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.div>

 {/* Regional Representatives */}
 <motion.div variants={itemVariants}>
 <div className="flex items-center gap-3 mb-6">
 <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
 <MapPin size={22} className="text-blue-600 dark:text-blue-400" />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
 Representantes Regionais
 </h2>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 Presentes em CFPs e CTs em todo o estado de São Paulo
 </p>
 </div>
 </div>

 <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-6 sm:p-8">
 <div className="flex items-center gap-3 mb-4">
 <Users
 size={20}
 className="text-blue-600 dark:text-blue-400"
 />
 <h3 className="font-semibold text-gray-900 dark:text-white">
 Rede de Representantes
 </h3>
 </div>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
 A AES conta com representantes distribuídos nos Centros de Formação
 Profissional (CFP) e Centros de Tecnologia (CT) do SENAI em diversas
 cidades do estado de São Paulo. Esses representantes garantem que
 todos os associados, independentemente da sua localização, tenham
 acesso às informações e benefícios da associação.
 </p>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
 Para saber quem é o representante da sua unidade ou obter mais
 informações, entre em contato com a sede da AES.
 </p>
 </div>
 </motion.div>

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
