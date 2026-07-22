'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { representantesService } from '@/lib/services/data-service';
import { SkeletonGrid } from '@/components/ui/Skeleton';
import { ErrorState, EmptyState } from '@/components/ui/DataState';

type CategoriaRepresentante = 'conselho-deliberativo' | 'conselho-fiscal' | 'diretoria-executiva' | 'diretores-departamentos' | 'representantes-regionais';

interface Representante {
  id: string;
  nome: string;
  cargo?: string;
  categoria: CategoriaRepresentante;
  regional?: string;
  unidade?: string;
  email?: string;
  telefone?: string;
}

// Esta página lista SOMENTE os representantes regionais. O corpo administrativo
// (conselhos + diretoria) fica na página Administração (/sobre/administracao).
const ACCENT = '#8B5CF6';

export default function RepresentantesPage() {
  const [reps, setReps] = useState<Representante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await representantesService.getAll();
      const regionais = (data as unknown as Representante[]).filter(
        (r) => r.categoria === 'representantes-regionais',
      );
      setReps(regionais);
    } catch (err) {
      console.error('Failed to load representantes:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Agrupa os representantes por regional (Capital, Interior, Litoral, ...).
  const subGroups = useMemo(() => {
    const map: Record<string, Representante[]> = {};
    reps.forEach((r) => {
      const reg = r.regional || 'Outros';
      if (!map[reg]) map[reg] = [];
      map[reg].push(r);
    });
    return map;
  }, [reps]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(to bottom right, var(--color-primary-dark), var(--color-primary))' }}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/20">
              Gestão 2026-2030
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Representantes</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Conheça os representantes da AES nas unidades do SENAI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Representantes regionais */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? <SkeletonGrid count={6} /> : error ? <ErrorState onRetry={load} /> : reps.length === 0 ? <EmptyState message="Nenhum representante regional cadastrado." /> : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${ACCENT}15` }}>
                  <MapPin size={24} style={{ color: ACCENT }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Representantes Regionais</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Representantes nas unidades do SENAI</p>
                </div>
              </div>

              {/* Sub-grupos por regional */}
              <div className="space-y-6">
                {Object.entries(subGroups).map(([regional, members]) => (
                  <div key={regional}>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <MapPin size={14} style={{ color: ACCENT }} />
                      {regional}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {members.map((m) => (
                        <div key={m.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/60 dark:border-gray-700/40 p-4 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: ACCENT }}>
                            {m.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{m.nome}</p>
                            {m.unidade && <p className="text-xs text-gray-500 dark:text-gray-400">{m.unidade}</p>}
                          </div>
                          {m.email && <a href={`mailto:${m.email}`} className="shrink-0" style={{ color: ACCENT }}><Mail size={14} /></a>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
