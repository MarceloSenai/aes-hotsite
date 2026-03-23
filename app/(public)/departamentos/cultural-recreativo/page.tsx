'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Calendar, Music, Users, Mail, Phone, ArrowRight } from 'lucide-react';

const atividades = [
  'Organização de festas e eventos temáticos',
  'Passeios culturais, excursões e viagens',
  'Programacao artística (shows, teatro, cinema)',
  'Atividades recreativas para toda a família',
  'Coordenação de eventos nos núcleos de lazer',
  'Festas juninas, carnaval e datas comemorativas',
];

const eventos = [
  { data: '14-18/02', titulo: 'Carnaval no Clube Náutico', local: 'Clube Náutico - Boracéia' },
  { data: '08/03', titulo: 'Dia Internacional da Mulher', local: 'Sede AES - São Paulo' },
  { data: '14/06', titulo: 'Festa Junina AES', local: 'Clube de Campo - Jundiaí' },
  { data: '07-11/07', titulo: 'Colônia de Férias Infantil', local: 'Colônia de Férias - Itanhaém' },
  { data: '11/10', titulo: 'Dia das Crianças', local: 'Todos os Núcleos' },
  { data: '13/12', titulo: 'Confraternização de Final de Ano', local: 'Clube de Campo - Jundiaí' },
];

export default function CulturalRecreativoPage() {
  return (
    <section className="py-24 gradient-theme-page-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/departamentos" className="inline-flex items-center gap-2 text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8">
            <ArrowLeft size={18} /> Voltar para Departamentos
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center">
              <Palette size={32} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Cultural e Recreativo</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Diretora: <span className="font-semibold text-gray-700 dark:text-gray-300">Alessandra Angelim da Silva</span></p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Music size={20} className="text-violet-500" /> O que é o Departamento
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            O Departamento Cultural e Recreativo promove atividades culturais, artísticas e recreativas para os associados e famíliares. Organiza eventos, passeios, shows e programas de entretenimento ao longo do ano, contribuindo para a integração e qualidade de vida dos membros da AES.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Palette size={20} className="text-violet-500" /> O que faz
          </h2>
          <ul className="space-y-3">
            {atividades.map((a) => (
              <li key={a} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <ArrowRight size={16} className="text-violet-500 mt-0.5 shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-violet-50 dark:bg-violet-900/20 rounded-2xl border border-violet-100 dark:border-violet-800/40 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Users size={20} className="text-violet-600" /> A quem se destina
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Todos os associados da AES, dependentes e agregados. Atividades abertas para toda a família, com programação especial para crianças, jovens e adultos.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-violet-500" /> Eventos Programados
          </h2>
          <div className="space-y-3">
            {eventos.map((ev) => (
              <div key={ev.titulo} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <span className="font-bold text-violet-600 dark:text-violet-400 w-20 text-sm">{ev.data}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{ev.titulo}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ev.local}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #8b5cf6, #a855f7)' }}>
          <h3 className="font-bold text-lg mb-3">Contato do Departamento</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <span className="flex items-center gap-2 text-sm"><Mail size={16} /> cultural@aessenai.org.br</span>
            <span className="flex items-center gap-2 text-sm"><Phone size={16} /> (11) 3367-9900</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
