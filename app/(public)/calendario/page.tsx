'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { eventosService } from '@/lib/supabase/data-service';
import { SkeletonGrid } from '@/components/ui/Skeleton';

interface Evento {
  id: string;
  titulo: string;
  data: string;
  local: string;
  departamento: string;
  horario?: string;
  mes: string;
  enabled: boolean;
}

const MESES_ORDEM = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default function CalendarioPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await eventosService.getAll();
        setEventos((data as unknown as Evento[]).filter((e) => e.enabled));
      } catch (error) {
        console.error('Failed to load eventos:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const eventosPorMes = useMemo(() => {
    const mapa: Record<string, Evento[]> = {};
    eventos.forEach((e) => {
      if (!mapa[e.mes]) mapa[e.mes] = [];
      mapa[e.mes].push(e);
    });
    return MESES_ORDEM
      .filter((m) => mapa[m] && mapa[m].length > 0)
      .map((m) => ({ mes: m, eventos: mapa[m] }));
  }, [eventos]);

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
              Calendário de <span className="text-theme-gradient">Eventos 2026</span>
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Confira a programação completa de eventos, atividades culturais, esportivas e de lazer da AES.
          </p>
        </motion.div>

        {loading ? <SkeletonGrid count={6} /> : (<div className="space-y-6">
          {eventosPorMes.map((item, idx) => (
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
                  <div key={ev.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
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
        </div>)}
      </div>
    </section>
  );
}
