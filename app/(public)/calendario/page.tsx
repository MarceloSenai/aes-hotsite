'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';

interface Evento {
  mes: string;
  eventos: {
    titulo: string;
    data: string;
    local: string;
    departamento: string;
    horario?: string;
  }[];
}

const calendario: Evento[] = [
  {
    mes: 'Janeiro',
    eventos: [
      { titulo: 'Confraternizacao de Inicio de Ano', data: '18/01', local: 'Clube de Campo - Jundiai', departamento: 'Cultural e Recreativo' },
    ],
  },
  {
    mes: 'Fevereiro',
    eventos: [
      { titulo: 'Carnaval no Clube Nautico', data: '14-18/02', local: 'Clube Nautico - Boraceia', departamento: 'Cultural e Recreativo' },
      { titulo: 'Torneio de Verao', data: '22/02', local: 'Clube de Campo - Jundiai', departamento: 'Esportivo Capital', horario: '09:00' },
    ],
  },
  {
    mes: 'Marco',
    eventos: [
      { titulo: 'Dia Internacional da Mulher', data: '08/03', local: 'Sede AES - Sao Paulo', departamento: 'Cultural e Recreativo' },
      { titulo: 'Assembleia Geral Ordinaria', data: '22/03', local: 'Sede AES - Sao Paulo', departamento: 'Administracao', horario: '10:00' },
    ],
  },
  {
    mes: 'Abril',
    eventos: [
      { titulo: 'Pascoa nos Nucleos', data: '05/04', local: 'Todos os Nucleos', departamento: 'Cultural e Recreativo' },
      { titulo: 'Campeonato de Futebol', data: '12/04', local: 'Clube de Campo - Jundiai', departamento: 'Esportivo Capital', horario: '08:00' },
    ],
  },
  {
    mes: 'Maio',
    eventos: [
      { titulo: 'Dia das Maes', data: '10/05', local: 'Colonia de Ferias - Itanhaem', departamento: 'Cultural e Recreativo' },
    ],
  },
  {
    mes: 'Junho',
    eventos: [
      { titulo: 'Festa Junina AES', data: '14/06', local: 'Clube de Campo - Jundiai', departamento: 'Cultural e Recreativo', horario: '14:00' },
      { titulo: 'Torneio de Inverno', data: '28/06', local: 'Clube de Campo - Jundiai', departamento: 'Esportivo Interior' },
    ],
  },
  {
    mes: 'Julho',
    eventos: [
      { titulo: 'Ferias de Inverno nos Nucleos', data: '01-31/07', local: 'Todos os Nucleos', departamento: 'Nucleos de Lazer' },
      { titulo: 'Colonia de Ferias Infantil', data: '07-11/07', local: 'Colonia de Ferias - Itanhaem', departamento: 'Cultural e Recreativo' },
    ],
  },
  {
    mes: 'Agosto',
    eventos: [
      { titulo: 'Dia dos Pais', data: '09/08', local: 'Clube Nautico - Boraceia', departamento: 'Cultural e Recreativo' },
      { titulo: 'Encontro de Aposentados', data: '23/08', local: 'Sede AES - Sao Paulo', departamento: 'Aposentados', horario: '10:00' },
    ],
  },
  {
    mes: 'Setembro',
    eventos: [
      { titulo: 'Semana do Associado', data: '15-19/09', local: 'Sede AES - Sao Paulo', departamento: 'Administracao' },
    ],
  },
  {
    mes: 'Outubro',
    eventos: [
      { titulo: 'Dia das Criancas nos Nucleos', data: '11/10', local: 'Todos os Nucleos', departamento: 'Cultural e Recreativo' },
      { titulo: 'Campeonato de Pesca', data: '25/10', local: 'Clube Nautico - Boraceia', departamento: 'Esportivo Interior' },
    ],
  },
  {
    mes: 'Novembro',
    eventos: [
      { titulo: 'Black Friday AES - Parcerias', data: '28/11', local: 'Online', departamento: 'Parcerias' },
    ],
  },
  {
    mes: 'Dezembro',
    eventos: [
      { titulo: 'Confraternizacao de Final de Ano', data: '13/12', local: 'Clube de Campo - Jundiai', departamento: 'Cultural e Recreativo', horario: '12:00' },
      { titulo: 'Reveillon na Colonia', data: '30-31/12', local: 'Colonia de Ferias - Itanhaem', departamento: 'Nucleos de Lazer' },
    ],
  },
];

export default function CalendarioPage() {
  return (
    <section className="py-24 gradient-theme-page-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-theme-primary font-medium hover:gap-3 transition-all duration-300 mb-8">
            <ArrowLeft size={18} />
            Voltar para Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-light)' }}>
              <Calendar size={32} style={{ color: 'var(--color-primary)' }} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Calendario de <span className="text-theme-gradient">Eventos 2026</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Confira a programacao completa de eventos, atividades culturais, esportivas e de lazer da AES.
          </p>
        </motion.div>

        <div className="space-y-6">
          {calendario.map((item, idx) => (
            <motion.div
              key={item.mes}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700" style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 30%, white)' }}>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{item.mes}</h2>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {item.eventos.map((ev) => (
                  <div key={ev.titulo} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center gap-3 sm:w-28 shrink-0">
                      <Calendar size={16} style={{ color: 'var(--color-primary)' }} />
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{ev.data}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{ev.titulo}</p>
                      <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={12} />{ev.local}</span>
                        {ev.horario && <span className="flex items-center gap-1"><Clock size={12} />{ev.horario}</span>}
                        <span className="flex items-center gap-1"><Users size={12} />{ev.departamento}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
