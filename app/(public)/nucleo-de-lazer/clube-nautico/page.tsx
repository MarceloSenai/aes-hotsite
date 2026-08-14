'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import { nucleoVideosService } from '@/lib/services/data-service';
import { lerPrecosDoNucleo, type NucleoPrecoRow } from '@/lib/services/nucleo-precos';
import {
 MapPin,
 Phone,
 Mail,
 Waves,
 UtensilsCrossed,
 Flame,
 Dumbbell,
 Baby,
 Bed,
 Clock,
 Zap,
 Accessibility,
 PawPrint,
 DollarSign,
 CheckCircle2,
 FileText,
 Download,
 Users,
 Fish,
 TreePine,
 Video,
 Play,
} from 'lucide-react';

const accommodations = [
 {
 title: '6 Chalés Standard',
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

/* Tabelas de valores conforme aessenai.org.br/clubenautico.asp */

/**
 * Fallback da tabela principal: o que vale hoje em aessenai.org.br. Em condições
 * normais a tela mostra o que está em nucleo_precos — ver lerPrecosDoNucleo.
 * A coluna `dependente` guarda o valor de "Afins" (ver NucleoPrecoRow).
 */
const pricingCategoriasFallback: NucleoPrecoRow[] = [
 { categoria: 'Hospedagem', associado: 'R$ 47,70', dependente: 'R$ 61,50', convidado: 'R$ 77,40' },
 { categoria: 'Diarista', associado: 'Isento', dependente: 'Isento', convidado: 'R$ 53,00' },
];

const faixaEtariaHospedagem = [
 { faixa: 'Até 6 anos', valor: 'Isenta' },
 { faixa: '7 a 12 anos', valor: 'Meia' },
 { faixa: 'A partir de 13 anos', valor: 'Inteira' },
];

const faixaEtariaDiarista = [
 { faixa: 'Até 10 anos', valor: 'Isenta' },
 { faixa: '11 a 12 anos', valor: 'Meia' },
 { faixa: 'A partir de 13 anos', valor: 'Inteira' },
];

const espacosComuns = [
 { espaco: 'Quioscão', valor: 'R$ 91,00' },
 { espaco: 'Demais quiosques', valor: 'Isentos de taxa' },
];

const valorTeto = [
 { acomodacao: 'Acomodação para até 6 pessoas', valor: 'R$ 270,00' },
 {
 acomodacao: 'Acomodação para até 8 pessoas (Clube de Campo, Jundiaí — apartamentos 21 e 22)',
 valor: 'R$ 360,00',
 },
];

const descontoConvidados = [
 { faixa: 'Até 10', valor: 'R$ 53,00', desconto: '—' },
 { faixa: '11 a 30', valor: 'R$ 53,00', desconto: '10%' },
 { faixa: 'Acima de 31', valor: 'R$ 53,00', desconto: '20%' },
];

const horariosAtendimento = [
 { local: 'Administração', detalhes: ['2ª feira a domingo: das 7h às 19h'] },
 { local: 'Portaria', detalhes: ['24 horas'] },
 { local: 'Day Use', detalhes: ['Das 8h às 18h'] },
];

const arquivos = [
 { titulo: 'Regulamento do Clube Náutico', arquivo: '/documentos/nucleos/Regulamento_ClubeNautico.pdf' },
 { titulo: 'Regulamento das Piscinas', arquivo: '/documentos/nucleos/Regulamento_PiscinasClubeNautico.pdf' },
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
 const [pricingCategorias, setPricingCategorias] = useState(pricingCategoriasFallback);

 useEffect(() => {
  nucleoVideosService.getAll('clube-nautico').then((d) => setVideos(d as {id:string; titulo:string; youtube_url:string}[]));
  lerPrecosDoNucleo('clube-nautico', pricingCategoriasFallback).then(setPricingCategorias);
 }, []);

 return (
 <>
 {/* Hero Banner */}
 <PageHeader
 icone={Waves}
 titulo="Clube Náutico"
 subtitulo="Situado no interior de São Paulo, a cerca de 320 km da Capital, é banhado pelo Rio Tietê e oferece chalés, quiosques com churrasqueira, piscina, campo de futebol, quadra de vôlei e pier de pesca e a tranquilidade do interior, ideal para quem busca descanso ou um refúgio de lazer e pescaria."
 selo={{ icone: MapPin, texto: "Boracéia/SP" }}
 fundo={{ imagem: "/images/nucleos/clube-nautico.webp", alt: "Pier de pesca do Clube Náutico da AES na represa de Boracéia" }}
 />

 {/* Location Card */}
 <section className="py-12 bg-white dark:bg-gray-950">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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

 {/* Horários de atendimento */}
 <div className="mt-6 pt-6 border-t border-blue-200/60 dark:border-blue-800/40">
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Clock size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div className="w-full">
 <p className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
 Horários de atendimento
 </p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {horariosAtendimento.map((horario) => (
 <div key={horario.local}>
 <p className="text-sm font-medium text-gray-900 dark:text-white">{horario.local}</p>
 <ul className="mt-1 space-y-0.5">
 {horario.detalhes.map((detalhe) => (
 <li key={detalhe} className="text-sm text-gray-600 dark:text-gray-300">
 {detalhe}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Videos */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-center"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center justify-center gap-2">
  <Video size={24} style={{ color: 'var(--color-primary)' }} />
  Vídeos do Clube Náutico
 </h2>
 <div className="flex flex-wrap justify-center gap-6">
  {videos.length > 0 ? videos.map((v) => {
    const videoId = getYouTubeId(v.youtube_url);
    return videoId ? (
      <div key={v.id} className="w-full max-w-2xl lg:w-[calc(50%-0.75rem)] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
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
    <div className="w-full max-w-2xl aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700">
      <div className="text-center text-gray-400">
        <Play size={48} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">Vídeos em breve</p>
      </div>
    </div>
  )}
 </div>
 </motion.div>
 </div>
 </section>

 {/* Accommodations */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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
 <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={16} className="text-theme-primary shrink-0" />
 Ar-condicionado
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Facilities Grid */}
 <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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

 {/* Regulamentos */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="grid grid-cols-1 lg:grid-cols-2 gap-8"
 >
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Regulamentos</h2>
 <div className="h-[calc(100%-3rem)] bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/40">
  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
   <li>&#8226; Check-in a partir das 16h | Check-out até as 16h</li>
   <li>&#8226; Máximo de hóspedes por acomodação conforme capacidade</li>
   <li>&#8226; Proibido som alto após 22:00</li>
   <li>&#8226; Animais de estimação apenas em acomodações Pet Friendly</li>
   <li>&#8226; Cancelamento gratuito até 7 dias antes do check-in</li>
   <li>&#8226; Documentos de identidade obrigatórios no check-in</li>
  </ul>
 </div>
 </div>

 {/* Check-in / check-out, ao lado dos regulamentos */}
 <div>
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Check-in e Check-out</h2>
 <div className="h-[calc(100%-3rem)] bg-theme-primary-5 dark:bg-theme-primary-10 rounded-xl p-5 border border-theme-light dark:border-theme-primary-dark">
 <div className="flex items-start gap-3">
 <Clock size={20} className="text-theme-primary dark:text-theme-primary mt-0.5 shrink-0" />
 <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
 <p>
 O horário de check in e de check out são, respectivamente, a partir das 16h do dia
 anterior ao período reservado e até 16h do último dia de reserva.
 </p>
 <p>
 <strong className="text-gray-900 dark:text-white">Exemplo:</strong> reserva de 03 a 05.
 O check in poderá ser feito a partir das 16h do dia 02 e o check out deverá ser feito
 até 16h do dia 05.
 </p>
 </div>
 </div>
 </div>
 </div>
 </motion.div>

 {/* Arquivos do núcleo */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.1 }}
 className="mt-10"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Arquivos</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {arquivos.map((arq) => (
 <a
 key={arq.arquivo}
 href={arq.arquivo}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 hover:shadow-lg hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300"
 >
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center shrink-0">
 <FileText size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div className="min-w-0">
 <p className="font-medium text-gray-900 dark:text-white text-sm">{arq.titulo}</p>
 <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
 </div>
 <Download size={18} className="text-gray-400 ml-auto shrink-0" />
 </a>
 ))}
 </div>
 </motion.div>
 </div>
 </section>

 {/* Pricing Table */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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
 className="max-w-5xl mx-auto space-y-8"
 >
 {/* Hospedagem e diarista, por categoria */}
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg">
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <DollarSign size={24} className="text-white" />
 <h3 className="text-lg font-bold text-white">Valores por pessoa</h3>
 </div>
 </div>
 <div className="overflow-x-auto">
 <div className="min-w-[520px]">
 <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 dark:bg-gray-700/30 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
 <span>Categoria</span>
 <span className="text-center">Associado / Dependente</span>
 <span className="text-center">Afins</span>
 <span className="text-center">Convidado</span>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {pricingCategorias.map((item) => (
 <div
 key={item.categoria}
 className="grid grid-cols-4 gap-2 p-4 items-center hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="font-medium text-gray-900 dark:text-white text-sm">{item.categoria}</span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.associado}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.dependente}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.convidado}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Faixas etárias */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg">
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <Users size={24} className="text-white" />
 <h3 className="text-base font-bold text-white">
 Faixa etária — Hospedagem (crianças)
 </h3>
 </div>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {faixaEtariaHospedagem.map((item) => (
 <div
 key={item.faixa}
 className="flex items-center justify-between p-4 hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="text-sm font-medium text-gray-900 dark:text-white">{item.faixa}</span>
 <span className="text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.valor}
 </span>
 </div>
 ))}
 </div>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg">
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <Users size={24} className="text-white" />
 <h3 className="text-base font-bold text-white">
 Faixa etária — Diarista/convidado (crianças)
 </h3>
 </div>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {faixaEtariaDiarista.map((item) => (
 <div
 key={item.faixa}
 className="flex items-center justify-between p-4 hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="text-sm font-medium text-gray-900 dark:text-white">{item.faixa}</span>
 <span className="text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.valor}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Espaços comuns e valor teto */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg">
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <TreePine size={24} className="text-white" />
 <h3 className="text-base font-bold text-white">Utilização dos espaços comuns</h3>
 </div>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {espacosComuns.map((item) => (
 <div
 key={item.espaco}
 className="flex items-center justify-between gap-4 p-4 hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="text-sm font-medium text-gray-900 dark:text-white">{item.espaco}</span>
 <span className="text-sm font-semibold text-theme-primary dark:text-theme-primary text-right">
 {item.valor}
 </span>
 </div>
 ))}
 </div>
 <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800/40">
 <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wide">
 Importante: necessário reservar os ambientes
 </p>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg">
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <Bed size={24} className="text-white" />
 <h3 className="text-base font-bold text-white">Valor teto para cobrança</h3>
 </div>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {valorTeto.map((item) => (
 <div
 key={item.acomodacao}
 className="flex items-center justify-between gap-4 p-4 hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="text-sm font-medium text-gray-900 dark:text-white">
 {item.acomodacao}
 </span>
 <span className="text-sm font-semibold text-theme-primary dark:text-theme-primary text-right shrink-0">
 {item.valor}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Desconto progressivo */}
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg">
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <DollarSign size={24} className="text-white" />
 <h3 className="text-base font-bold text-white">Desconto progressivo para convidados</h3>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50 dark:bg-gray-700/30 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
 <span>Faixa</span>
 <span className="text-center">Valor</span>
 <span className="text-center">Desconto</span>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {descontoConvidados.map((item) => (
 <div
 key={item.faixa}
 className="grid grid-cols-3 gap-2 p-4 items-center hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="text-sm font-medium text-gray-900 dark:text-white">{item.faixa}</span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.valor}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.desconto}
 </span>
 </div>
 ))}
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Important Info — mesmas três informações do Clube de Campo */}
 <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Roupa de Cama e Banho</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Roupa de cama e banho fornecidas pelo clube. Não é necessário levar.
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center mb-4">
 <Zap size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Voltagem</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Todas as unidades possuem voltagem 127V.
 </p>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Map Placeholder */}
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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
