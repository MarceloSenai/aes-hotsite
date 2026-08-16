'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import { nucleoVideosService } from '@/lib/services/data-service';
import {
 MapPin,
 Phone,
 Mail,
 MessageCircle,
 Umbrella,
 Waves,
 Bed,
 UtensilsCrossed,
 Car,
 Flame,
 Baby,
 Wind,
 Accessibility,
 PawPrint,
 CheckCircle2,
 Clock,
 Zap,
 Users,
 Film,
 Gamepad2,
 WashingMachine,
 Pizza,
 ArrowUpDown,
 Coffee,
 Video,
 Play,
 Blocks,
 Sparkles,
 Dumbbell,
 Sofa,
 Presentation,
 Shirt,
 Armchair,
 Bike,
 TreePine,
 FileText,
 Download,
} from 'lucide-react';

const accommodations = [
 {
 title: '41 Apartamentos',
 description: 'Capacidade para 4 a 6 hóspedes',
 icon: Bed,
 },
 {
 title: '3 Quartos Acessíveis',
 description: 'Adaptados para pessoas com deficiência',
 icon: Accessibility,
 },
 {
 title: '4 Unidades Pet-Friendly',
 description: 'Apartamentos 102 a 105 - aceita pets',
 icon: PawPrint,
 },
];

const amenities = [
 'Ar condicionado',
 'TV',
 'Banheiro privativo',
 'Voltagem 110V',
];

const facilities = [
 { name: 'Restaurante', icon: UtensilsCrossed },
 { name: 'Lanchonete', icon: Coffee },
 { name: 'Sala de Jogos', icon: Gamepad2 },
 { name: 'Brinquedoteca', icon: Blocks },
 { name: 'Cinema', icon: Film },
 { name: 'Auditório', icon: Presentation },
 { name: 'Sala de Estar', icon: Sofa },
 { name: 'Playground', icon: Baby },
 { name: 'Piscina', icon: Waves },
 { name: 'SPA', icon: Sparkles },
 { name: 'Ginásio Esportivo', icon: Dumbbell },
 { name: 'Vestiários', icon: Shirt },
 { name: 'Elevador', icon: ArrowUpDown },
 { name: 'Estacionamento', icon: Car },
 { name: 'Lavanderia', icon: WashingMachine },
 { name: 'Churrasqueiras', icon: Flame },
 { name: 'Forno de Pizza', icon: Pizza },
 { name: 'Área Verde', icon: TreePine },
 { name: 'Locação de Cadeiras', icon: Armchair },
 { name: 'Locação de Guarda-sóis', icon: Umbrella },
 { name: 'Locação de Bicicletas', icon: Bike },
];

/*
 * Valores conforme aessenai.org.br/clubeferias.asp. As colunas oficiais são
 * "Associado/Dependente | Afins | Convidado" — associado e dependente pagam
 * igual, e a coluna do meio é Afins, como nas telas dos dois clubes.
 */

const pricingHospedagem = [
 { refeicao: 'Hospedagem', associado: 'R$ 125,00', dependente: 'R$ 155,00', convidado: 'R$ 179,00' },
 { refeicao: 'Diarista', associado: 'Isento', dependente: 'Isento', convidado: 'R$ 53,00' },
];

const pricingRefeicoes = [
 {
 refeicao: 'Desjejum',
 associado: 'R$ 26,50',
 dependente: 'R$ 37,10',
 convidado: 'R$ 41,30',
 },
 {
 refeicao: 'Almoço',
 associado: 'R$ 42,40',
 dependente: 'R$ 56,20',
 convidado: 'R$ 67,80',
 },
 {
 refeicao: 'Sopa + 1 massa',
 associado: 'R$ 20,10',
 dependente: 'R$ 28,60',
 convidado: 'R$ 29,70',
 },
];

/*
 * As duas faixas etárias têm cortes diferentes: hospedagem vira meia aos 7 anos e
 * a diária de convidado só aos 11 — por isso são duas tabelas, e não uma.
 */

const faixaEtariaHospedagem = {
 colunas: ['Até 6 anos', '7 a 12 anos', 'A partir de 13 anos'],
 linhas: [
 { categoria: 'Hospedagem', valores: ['Isenta', 'Meia', 'Inteira'] },
 { categoria: 'Diarista (convidado)', valores: ['Isenta', 'Meia', 'Inteira'] },
 ],
};

const faixaEtariaDiarista = {
 colunas: ['Até 10 anos', '11 a 12 anos', 'A partir de 13 anos'],
 linhas: [{ categoria: 'Diarista (convidado)', valores: ['Isenta', 'Meia', 'Inteira'] }],
};

const horariosAtendimento = [
 {
 local: 'Administração',
 detalhes: [
 '2ª a 5ª feira: das 8h às 16h20',
 '6ª, sábados e feriados: das 8h às 22h',
 'Domingo: das 8h às 16h20',
 ],
 },
 {
 local: 'Restaurante',
 detalhes: ['Café da manhã: 7h30 às 9h30', 'Almoço: 12h30 às 15h', 'Sopa: 18h às 19h'],
 },
 { local: 'Ginásio de Esportes', detalhes: ['Das 9h às 21h'] },
 { local: 'Portaria', detalhes: ['24 horas'] },
 { local: 'Day Use', detalhes: ['Das 8h às 21h'] },
];

const arquivos = [
 { titulo: 'Regulamento da Colônia de Férias', arquivo: '/documentos/nucleos/Regulamento_Colonia.pdf' },
 { titulo: 'Regulamento da Piscina', arquivo: '/documentos/nucleos/Regulamento_PiscinaColonia.pdf' },
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

export default function ColoniaDeFeriasPage() {
 const [videos, setVideos] = useState<{id:string; titulo:string; youtube_url:string}[]>([]);

 useEffect(() => {
  nucleoVideosService.getAll('colonia-ferias').then((d) => setVideos(d as {id:string; titulo:string; youtube_url:string}[]));
 }, []);

 return (
 <>
 {/* Hero Banner */}
 <PageHeader
 icone={Umbrella}
 titulo="Colônia de Férias"
 subtitulo="Localizada em Itanhaém, está a, aproximadamente, 3 a 4 Km do centro da cidade e a 550 a 650 metros da larga faixa de areia clara da praia, mar limpo e águas calmas, sendo perfeita para caminhadas sossegadas. Lá você se sente em casa. Suas instalações oferecem conforto e segurança, o restaurante oferece refeições deliciosas e você ainda interage com outros hóspedes nas áreas comuns num clima totalmente familiar. Um excelente lugar para quem busca uma temporada de descanso e tranquilidade à beira-mar."
 selo={{ icone: MapPin, texto: "Itanhaém/SP" }}
 fundo={{ imagem: "/images/nucleos/colonia-de-ferias.webp", alt: "Praia do litoral sul paulista, onde fica a Colônia de Férias da AES" }}
 />

 {/* Location Card */}
 <section className="py-12 bg-white dark:bg-gray-950">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200/60 dark:border-amber-800/40 p-6 sm:p-8"
 >
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <MapPin size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">Endereço</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Av. Padre Manoel da Nóbrega, 158, Cibratel II, Itanhaém/SP, CEP 11740-000
 </p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Phone size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">Telefone</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">(13) 3303-9697</p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <MessageCircle size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">WhatsApp</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">(13) 9 9713-5463</p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <div className="p-2 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg shrink-0">
 <Mail size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">E-mail</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">colonia@aessenai.org.br</p>
 </div>
 </div>
 </div>

 {/* Horários de atendimento */}
 <div className="mt-6 pt-6 border-t border-amber-200/60 dark:border-amber-800/40">
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
  Vídeos da Colônia de Férias
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
 Todos os apartamentos incluem:
 </h3>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="text-center mb-12"
 >
 <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
 <span className="text-theme-gradient">
 Infraestrutura
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
   <li>&#8226; Check-in a partir das 19h | Check-out até as 16h</li>
   <li>&#8226; Observar o limite máximo absoluto de capacidade da acomodação, sabendo-se que crianças e bebês contam como hóspedes</li>
   <li>&#8226; Respeitar a Lei do Silêncio</li>
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
 O horário de check in e de check out são, respectivamente, a partir das 19h do dia
 anterior ao período reservado e até 16h do último dia de reserva.
 </p>
 <p>
 <strong className="text-gray-900 dark:text-white">Exemplo:</strong> reserva de 03 a 05.
 O check in poderá ser feito a partir das 19h do dia 02 e o check out deverá ser feito
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
 {/* Duas colunas, e não três como no Campo: aqui são só dois arquivos. */}
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

 {/* Pricing Tables */}
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

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
 {/* Hospedagem */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.1 }}
 >
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg h-full">
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <Bed size={24} className="text-white" />
 <h3 className="text-lg font-bold text-white">Hospedagem (diária por pessoa)</h3>
 </div>
 </div>
 {/* Table header */}
 <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 dark:bg-gray-700/30 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
 <span>Categoria</span>
 <span className="text-center">Assoc./Depend.</span>
 <span className="text-center">Afins</span>
 <span className="text-center">Convidado</span>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {pricingHospedagem.map((item, index) => (
 <motion.div
 key={item.refeicao}
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.4, delay: index * 0.1 }}
 className="grid grid-cols-4 gap-2 p-4 hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors items-center"
 >
 <span className="font-medium text-gray-900 dark:text-white text-sm">
 {item.refeicao}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.associado}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.dependente}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.convidado}
 </span>
 </motion.div>
 ))}
 </div>
 </div>
 </motion.div>

 {/* Refeições */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.2 }}
 >
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg h-full">
 <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5">
 <div className="flex items-center gap-3">
 <UtensilsCrossed size={24} className="text-white" />
 <h3 className="text-lg font-bold text-white">Refeições (por pessoa)</h3>
 </div>
 </div>
 {/* Table header */}
 <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 dark:bg-gray-700/30 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
 <span>Refeição</span>
 <span className="text-center">Assoc./Depend.</span>
 <span className="text-center">Afins</span>
 <span className="text-center">Convidado</span>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {pricingRefeicoes.map((item, index) => (
 <motion.div
 key={item.refeicao}
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.4, delay: index * 0.1 }}
 className="grid grid-cols-4 gap-2 p-4 hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors items-center"
 >
 <span className="font-medium text-gray-900 dark:text-white text-sm">
 {item.refeicao}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.associado}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.dependente}
 </span>
 <span className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {item.convidado}
 </span>
 </motion.div>
 ))}
 </div>
 </div>
 </motion.div>
 </div>

 {/* Faixas etárias */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="mt-8 max-w-5xl mx-auto space-y-8"
 >
 {[
 {
 titulo: 'Faixa etária para cobrança de valores de Hospedagem — Crianças',
 tabela: faixaEtariaHospedagem,
 },
 {
 titulo: 'Faixa etária para cobrança de valores de Diarista (convidado) — Crianças',
 tabela: faixaEtariaDiarista,
 },
 ].map(({ titulo, tabela }) => (
 <div
 key={titulo}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg"
 >
 <div className="gradient-theme-cta p-5">
 <div className="flex items-center gap-3">
 <Users size={24} className="text-white" />
 <h3 className="text-base font-bold text-white">{titulo}</h3>
 </div>
 </div>
 {/* As faixas são colunas, como no site antigo — daí a rolagem lateral no celular. */}
 <div className="overflow-x-auto">
 <div className="min-w-[520px]">
 <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 dark:bg-gray-700/30 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
 <span>Categoria</span>
 {tabela.colunas.map((coluna) => (
 <span key={coluna} className="text-center">
 {coluna}
 </span>
 ))}
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {tabela.linhas.map((linha) => (
 <div
 key={linha.categoria}
 className="grid grid-cols-4 gap-2 p-4 items-center hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="font-medium text-gray-900 dark:text-white text-sm">
 {linha.categoria}
 </span>
 {linha.valores.map((valor, i) => (
 <span
 key={tabela.colunas[i]}
 className="text-center text-sm font-semibold text-theme-primary dark:text-theme-primary"
 >
 {valor}
 </span>
 ))}
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 ))}

 {/*
   As duas tabelas acima só falam de hospedagem e diária. A regra de meia para
   refeições não tem tabela no site antigo, mas estava escrita na tela antes
   desta rodada — sem esta nota, a informação sumiria da página.
 */}
 <div className="bg-theme-primary-5 dark:bg-theme-primary-10 rounded-xl border border-theme-light dark:border-theme-primary-dark p-5">
 <div className="flex items-start gap-2">
 <Users size={16} className="text-theme-primary dark:text-theme-primary mt-0.5 shrink-0" />
 <p className="text-sm text-gray-600 dark:text-gray-300">
 <strong>Refeições:</strong> seguem a mesma faixa da hospedagem — até 6 anos isenta,
 de 7 a 12 anos meia.
 </p>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Important Info */}
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
 Check-in a partir das 19h. Check-out até as 16h.
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center mb-4">
 <Wind size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Ar Condicionado</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Todos os apartamentos possuem ar condicionado.
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center mb-4">
 <Zap size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Voltagem</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 Todas as unidades possuem voltagem 110V.
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
 src="https://www.google.com/maps?q=Colonia+de+Ferias+AES+SENAI,+Av+Padre+Manoel+da+Nobrega+158,+Itanhaem,+SP&output=embed"
 width="100%"
 height="100%"
 style={{ border: 0 }}
 allowFullScreen
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title="Localização da Colônia de Férias - Itanhaém/SP"
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
 Entre em contato pelo telefone, WhatsApp ou e-mail para garantir sua hospedagem na Colônia de Férias.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a
 href="tel:+551333039697"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-theme-primary-dark rounded-xl font-semibold hover:bg-theme-primary-5 transition-colors shadow-lg"
 >
 <Phone size={20} />
 (13) 3303-9697
 </a>
 <a
 href="https://wa.me/5513997135463"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
 >
 <MessageCircle size={20} />
 WhatsApp
 </a>
 <a
 href="mailto:colonia@aessenai.org.br"
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
