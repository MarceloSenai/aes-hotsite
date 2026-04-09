'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { nucleoVideosService } from '@/lib/services/data-service';
import {
 Home,
 ChevronRight,
 MapPin,
 Phone,
 Mail,
 Waves,
 Bed,
 UtensilsCrossed,
 Flame,
 Dumbbell,
 Baby,
 Accessibility,
 PawPrint,
 DollarSign,
 CheckCircle2,
 Clock,
 Zap,
 Users,
 Fish,
 TreePine,
 Video,
 Play,
} from 'lucide-react';

const accommodations = [
 {
 title: '8 Chalés',
 description: 'Capacidade para 6 pessoas cada',
 icon: TreePine,
 },
 {
 title: '1 Chalé Acessível',
 description: 'Chalé nº 8, adaptado para PcD',
 icon: Accessibility,
 },
 {
 title: '1 Chalé Pet-Friendly',
 description: 'Chalé nº 7 - aceita pets',
 icon: PawPrint,
 },
];

const facilities = [
 { name: 'Piscina', icon: Waves },
 { name: 'Academia Ar Livre', icon: Dumbbell },
 { name: 'Campo de Futebol', icon: Dumbbell },
 { name: 'Vôlei de Areia', icon: Dumbbell },
 { name: 'Playground', icon: Baby },
 { name: 'Pier de Pesca', icon: Fish },
 { name: 'Cozinha Caipira', icon: UtensilsCrossed },
 { name: 'Quiosques c/ Churrasqueira', icon: Flame },
 { name: 'Quioscão', icon: TreePine },
];

const pricing = [
 { category: 'Associado', daily: 'R$ 45,00' },
 { category: 'Dependente', daily: 'R$ 58,00' },
 { category: 'Convidado', daily: 'R$ 73,00' },
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

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&\s]+)/);
  return match ? match[1] : null;
}

export default function ClubeNauticoPage() {
 const [videos, setVideos] = useState<{id:string; titulo:string; youtube_url:string}[]>([]);

 useEffect(() => {
  nucleoVideosService.getAll('clube-nautico').then((d) => setVideos(d as {id:string; titulo:string; youtube_url:string}[]));
 }, []);

 return (
 <>
 {/* Hero Banner */}
 <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700 dark:from-blue-900 dark:via-cyan-900 dark:to-teal-900 overflow-hidden">
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <motion.div
 className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]"
 animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
 transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
 style={{ top: '-20%', right: '-10%' }}
 />
 <motion.div
 className="absolute w-[400px] h-[400px] bg-cyan-300/10 rounded-full blur-[80px]"
 animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
 transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
 style={{ bottom: '-10%', left: '-5%' }}
 />
 </div>

 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
 {/* Breadcrumbs */}
 <motion.nav
 initial={{ opacity: 0, y: -10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="flex items-center gap-2 text-blue-100 text-sm mb-8 flex-wrap"
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
 <span className="text-white font-medium">Clube Náutico</span>
 </motion.nav>

 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="max-w-3xl"
 >
 <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-blue-100 text-sm font-medium mb-6">
 <Waves size={16} />
 Boracéia/SP
 </span>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
 Clube Náutico
 </h1>
 <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
 Chalés à beira da represa com pier de pesca, academia ao ar livre
 e toda a tranquilidade do interior paulista.
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
 className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200/60 dark:border-blue-800/40 p-6 sm:p-8"
 >
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <MapPin size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">Endereço</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Estrada Vicinal Joaquim Luis Nunes, Km 3, Boracéia/SP, CEP 17271-400
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Phone size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">Telefones</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 (14) 9 9141-4566<br />(14) 9 9163-3538
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Mail size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">E-mail</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 secretarianautico@aessenai.org.br
 </p>
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
 className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
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
 className="mt-10 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 sm:p-8 max-w-4xl mx-auto"
 >
 <h3 className="font-bold text-gray-900 dark:text-white mb-4">
 Informações sobre os chalés:
 </h3>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={16} className="text-theme-primary shrink-0" />
 Roupa de cama fornecida
 </div>
 <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={16} className="text-theme-primary shrink-0" />
 Roupa de banho fornecida
 </div>
 <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={16} className="text-theme-primary shrink-0" />
 Voltagem 127V
 </div>
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
 className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
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

 {/* Videos */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="mb-8"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
  <Video size={24} style={{ color: 'var(--color-primary)' }} />
  Videos do Clube Nautico
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {videos.length > 0 ? videos.map((v) => {
    const videoId = getYouTubeId(v.youtube_url);
    return videoId ? (
      <div key={v.id} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={v.titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="p-3 bg-white dark:bg-gray-800">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{v.titulo}</p>
        </div>
      </div>
    ) : null;
  }) : (
    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
      <div className="text-center text-gray-400">
        <Play size={48} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">Vídeos em breve</p>
      </div>
    </div>
  )}
 </div>
 </motion.div>

 {/* Regulamentos */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.1 }}
 className="mb-8"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Regulamentos</h2>
 <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/40">
  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
   <li>&#8226; Check-in: 14:00 | Check-out: 12:00</li>
   <li>&#8226; Máximo de hóspedes por acomodação conforme capacidade</li>
   <li>&#8226; Proibido som alto após 22:00</li>
   <li>&#8226; Animais de estimação apenas em acomodações Pet Friendly</li>
   <li>&#8226; Cancelamento gratuito até 7 dias antes do check-in</li>
   <li>&#8226; Documentos de identidade obrigatórios no check-in</li>
  </ul>
 </div>
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
 {/* Children info */}
 <div className="p-5 bg-theme-primary-5 dark:bg-theme-primary-10 border-t border-gray-100 dark:border-gray-700">
 <div className="flex items-start gap-2">
 <Users size={16} className="text-theme-primary dark:text-theme-primary mt-0.5 shrink-0" />
 <p className="text-sm text-gray-600 dark:text-gray-300">
 <strong>Crianças:</strong> até 6 anos grátis. De 7 a 12 anos pagam meia.
 </p>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Map Placeholder */}
 <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
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
 className="rounded-2xl border border-gray-200/80 dark:border-gray-700/60 h-80 overflow-hidden"
 >
 <iframe
 src="https://www.google.com/maps?q=Clube+Nautico+AES+SENAI,+Boraceia,+SP&output=embed"
 width="100%"
 height="100%"
 style={{ border: 0 }}
 allowFullScreen
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title="Localização do Clube Náutico - Boracéia/SP"
 />
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
 Entre em contato por telefone ou e-mail para garantir sua hospedagem no Clube Náutico.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a
 href="tel:+5514991414566"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-theme-primary-dark rounded-xl font-semibold hover:bg-theme-primary-5 transition-colors shadow-lg"
 >
 <Phone size={20} />
 (14) 9 9141-4566
 </a>
 <a
 href="tel:+5514991633538"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
 >
 <Phone size={20} />
 (14) 9 9163-3538
 </a>
 <a
 href="mailto:secretarianautico@aessenai.org.br"
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
