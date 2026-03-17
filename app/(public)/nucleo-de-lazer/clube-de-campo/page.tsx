'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
 Home,
 ChevronRight,
 MapPin,
 Phone,
 Mail,
 MessageCircle,
 TreePine,
 Waves,
 Bed,
 UtensilsCrossed,
 Car,
 Flame,
 Dumbbell,
 Baby,
 ThermometerSun,
 Tv,
 Refrigerator,
 Clock,
 Zap,
 Users,
 PawPrint,
 Accessibility,
 DollarSign,
 CheckCircle2,
} from 'lucide-react';

const accommodations = [
 {
 title: '12 Chalés Standard',
 description: 'Capacidade para 6 hóspedes cada',
 icon: TreePine,
 },
 {
 title: '2 Chalés Acessíveis',
 description: 'Capacidade para 4 hóspedes, adaptados para PcD',
 icon: Accessibility,
 },
 {
 title: '10 Apartamentos',
 description: 'Capacidade para 6 hóspedes cada',
 icon: Bed,
 },
 {
 title: '2 Apartamentos Grandes',
 description: 'Capacidade para 8 hóspedes cada',
 icon: Users,
 },
 {
 title: '2 Chalés Pet-Friendly',
 description: 'Chalés 05 e 06 - aceita pets',
 icon: PawPrint,
 },
];

const amenities = [
 'Banheiro privativo',
 'Cozinha equipada',
 'Geladeira',
 'Fogão 4 bocas',
 'Micro-ondas',
 'TV',
 'Mobília completa',
];

const facilities = [
 { name: 'Piscinas Adulto/Infantil', icon: Waves },
 { name: 'Hidromassagem', icon: ThermometerSun },
 { name: 'Salões de Festas', icon: UtensilsCrossed },
 { name: 'Churrasqueiras', icon: Flame },
 { name: 'Campo de Futebol', icon: Dumbbell },
 { name: 'Saunas Masc/Fem', icon: ThermometerSun },
 { name: 'Lanchonete', icon: UtensilsCrossed },
 { name: 'Quiosques', icon: TreePine },
 { name: 'Quadra de Vôlei', icon: Dumbbell },
 { name: 'Playground', icon: Baby },
 { name: 'Estacionamento', icon: Car },
 { name: 'Área Verde', icon: TreePine },
];

const pricing = [
 { category: 'Associado', daily: 'R$ 45,00' },
 { category: 'Dependente', daily: 'R$ 58,00' },
 { category: 'Convidado', daily: 'R$ 73,00' },
 { category: 'Visitante (day use)', daily: 'R$ 50,00' },
];

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

export default function ClubeDeCampoPage() {
 return (
 <>
 {/* Hero Banner */}
 <section className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark), var(--color-primary-dark))" }}>
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <motion.div
 className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]"
 animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
 transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
 style={{ top: '-20%', right: '-10%' }}
 />
 </div>

 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
 {/* Breadcrumbs */}
 <motion.nav
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="flex items-center gap-2 text-white/80 text-sm mb-8 flex-wrap"
 >
 <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
 <Home size={14} />
 Início
 </Link>
 <ChevronRight size={14} className="opacity-50" />
 <Link href="/nucleo-de-lazer" className="hover:text-white transition-colors">
 Núcleos de Lazer
 </Link>
 <ChevronRight size={14} className="opacity-50" />
 <span className="text-white font-medium">Clube de Campo</span>
 </motion.nav>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="max-w-3xl"
 >
 <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-6">
 <TreePine size={16} />
 Jundiaí/SP
 </span>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
 Clube de Campo
 </h1>
 <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
 Chalés e apartamentos em meio à natureza com piscinas, saunas, churrasqueiras e
 toda a infraestrutura para o seu lazer.
 </p>
 </motion.div>
 </div>

 <div className="absolute bottom-0 left-0 right-0">
 <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
 <path
 d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
 className="fill-white dark:fill-gray-950"
 />
 </svg>
 </div>
 </section>

 {/* Location Card */}
 <section className="py-12 bg-white dark:bg-gray-950">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-theme-primary-5 dark:bg-theme-primary-10 rounded-2xl border border-theme-light dark:border-theme-primary-dark p-6 sm:p-8"
 >
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <MapPin size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">Endereço</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Trav. Deolinda Naville Fontebasso, 1430 - Roseira - Jundiaí/SP, CEP 13218-872
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Phone size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">Telefone</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">(11) 4395-1343</p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <MessageCircle size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">WhatsApp</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">(11) 98932-7612</p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Mail size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">E-mail</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">clube@aessenai.org.br</p>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Accommodations */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-center mb-12"
 >
 <span className="inline-block px-4 py-1.5 bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light text-sm font-semibold rounded-full mb-4">
 Acomodações
 </span>
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Opções de{' '}
 <span className="text-theme-gradient">
 Hospedagem
 </span>
 </h2>
 </motion.div>

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
 >
 {accommodations.map((acc) => {
 const Icon = acc.icon;
 return (
 <motion.div
 key={acc.title}
 variants={itemVariants}
 className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-6 hover:shadow-lg hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300"
 >
 <div className="w-12 h-12 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center mb-4">
 <Icon size={24} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-1">{acc.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{acc.description}</p>
 </motion.div>
 );
 })}
 </motion.div>

 {/* Unit Amenities */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="mt-10 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8"
 >
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">
 Todas as unidades incluem:
 </h3>
 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
 {amenities.map((item) => (
 <div key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={16} className="text-theme-primary shrink-0" />
 {item}
 </div>
 ))}
 </div>
 </motion.div>
 </div>
 </section>

 {/* Facilities Grid */}
 <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-center mb-12"
 >
 <span className="inline-block px-4 py-1.5 bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light text-sm font-semibold rounded-full mb-4">
 Infraestrutura
 </span>
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Áreas de{' '}
 <span className="text-theme-gradient">
 Lazer
 </span>
 </h2>
 </motion.div>

 <motion.div
 variants={containerVariants}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
 >
 {facilities.map((facility) => {
 const Icon = facility.icon;
 return (
 <motion.div
 key={facility.name}
 variants={itemVariants}
 className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-4 text-center hover:shadow-md hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300"
 >
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center mx-auto mb-3">
 <Icon size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
 {facility.name}
 </p>
 </motion.div>
 );
 })}
 </motion.div>
 </div>
 </section>

 {/* Pricing Table */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-center mb-12"
 >
 <span className="inline-block px-4 py-1.5 bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light text-sm font-semibold rounded-full mb-4">
 Valores
 </span>
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Tabela de{' '}
 <span className="text-theme-gradient">
 Preços
 </span>
 </h2>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.1 }}
 className="max-w-2xl mx-auto"
 >
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg">
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <DollarSign size={24} className="text-white" />
 <h3 className="text-lg font-bold text-white">Diárias por Pessoa</h3>
 </div>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {pricing.map((item, index) => (
 <motion.div
 key={item.category}
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.4, delay: index * 0.1 }}
 className="flex items-center justify-between p-5 hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="font-medium text-gray-900 dark:text-white">
 {item.category}
 </span>
 <span className="text-lg font-bold text-theme-primary dark:text-theme-primary">
 {item.daily}
 </span>
 </motion.div>
 ))}
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Important Info */}
 <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="grid grid-cols-1 md:grid-cols-3 gap-6"
 >
 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center mb-4">
 <Clock size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Check-in / Check-out</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Check-in a partir das 16h. Check-out até as 16h.
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center mb-4">
 <Bed size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Roupa de Cama</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Roupa de cama fornecida pelo clube.
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center mb-4">
 <Zap size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Voltagem</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Todas as unidades possuem voltagem 220V.
 </p>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Map Placeholder */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-center mb-8"
 >
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 Como{' '}
 <span className="text-theme-gradient">
 Chegar
 </span>
 </h2>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.1 }}
 className="bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 h-80 flex items-center justify-center"
 >
 <div className="text-center">
 <MapPin size={48} className="text-theme-primary mx-auto mb-4" />
 <p className="text-gray-600 dark:text-gray-300 font-medium">
 Trav. Deolinda Naville Fontebasso, 1430
 </p>
 <p className="text-gray-500 dark:text-gray-400 text-sm">
 Roseira - Jundiaí/SP - CEP 13218-872
 </p>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Contact CTA */}
 <section className="py-16 gradient-theme-cta">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-center"
 >
 <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
 Faça sua reserva
 </h2>
 <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
 Entre em contato pelo telefone, WhatsApp ou e-mail para garantir sua hospedagem no Clube de Campo.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a
 href="tel:+551143951343"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-theme-primary-dark rounded-xl font-semibold hover:bg-theme-primary-5 transition-colors shadow-lg"
 >
 <Phone size={20} />
 (11) 4395-1343
 </a>
 <a
 href="https://wa.me/5511989327612"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
 >
 <MessageCircle size={20} />
 WhatsApp
 </a>
 <a
 href="mailto:clube@aessenai.org.br"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
 >
 <Mail size={20} />
 E-mail
 </a>
 </div>
 </motion.div>
 </div>
 </section>
 </>
 );
}
