'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Building, MapPin, Crown, Eye, Gavel, Briefcase } from 'lucide-react';
import { SiteConfigManager, type Representante, type CategoriaRepresentante } from '@/lib/config/site-config';

const CATEGORIAS: { key: CategoriaRepresentante; label: string; icon: React.ElementType; color: string; desc: string }[] = [
  { key: 'conselho-deliberativo', label: 'Conselho Deliberativo', icon: Crown, color: '#6366F1', desc: 'Órgão máximo de deliberação da associação' },
  { key: 'conselho-fiscal', label: 'Conselho Fiscal', icon: Eye, color: '#0EA5E9', desc: 'Responsável pela fiscalização contábil e financeira' },
  { key: 'diretoria-executiva', label: 'Diretoria Executiva', icon: Briefcase, color: '#10B981', desc: 'Gestão e administração da AES' },
  { key: 'diretores-departamentos', label: 'Diretores de Departamentos', icon: Gavel, color: '#F59E0B', desc: 'Líderes dos departamentos da associação' },
  { key: 'representantes-regionais', label: 'Representantes Regionais', icon: MapPin, color: '#8B5CF6', desc: 'Representantes nas unidades do SENAI' },
];

export default function RepresentantesPage() {
  const [reps, setReps] = useState<Representante[]>([]);

  useEffect(() => {
    const load = () => setReps(SiteConfigManager.getConfig().representantes);
    load();
    window.addEventListener('aes-config-change', load);
    return () => window.removeEventListener('aes-config-change', load);
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, Representante[]> = {};
    reps.forEach((r) => {
      const cat = r.categoria || 'representantes-regionais';
      if (!map[cat]) map[cat] = [];
      map[cat].push(r);
    });
    return map;
  }, [reps]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(to bottom right, var(--color-primary-dark), var(--color-primary))' }}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/20">
              Gestão 2026-2030
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Corpo Administrativo</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Conheça os membros da administração e os representantes regionais da AES
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {CATEGORIAS.map((cat, catIdx) => {
            const membros = grouped[cat.key] || [];
            const Icon = cat.icon;
            if (membros.length === 0) return null;

            // Regionais: sub-group by regional
            const isRegional = cat.key === 'representantes-regionais';
            const subGroups = isRegional
              ? membros.reduce<Record<string, Representante[]>>((acc, r) => {
                  const reg = r.regional || 'Outros';
                  if (!acc[reg]) acc[reg] = [];
                  acc[reg].push(r);
                  return acc;
                }, {})
              : null;

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <Icon size={24} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{cat.label}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cat.desc}</p>
                  </div>
                </div>

                {/* Members grid */}
                {!isRegional && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {membros.map((m) => (
                      <div key={m.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: cat.color }}>
                            {m.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{m.nome}</p>
                            {m.cargo && <p className="text-xs text-gray-500 dark:text-gray-400">{m.cargo}</p>}
                          </div>
                        </div>
                        {m.email && (
                          <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-xs mt-2" style={{ color: cat.color }}>
                            <Mail size={12} /> {m.email}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Regional sub-groups */}
                {isRegional && subGroups && (
                  <div className="space-y-6">
                    {Object.entries(subGroups).map(([regional, members]) => (
                      <div key={regional}>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <MapPin size={14} style={{ color: cat.color }} />
                          {regional}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {members.map((m) => (
                            <div key={m.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/60 dark:border-gray-700/40 p-4 flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: cat.color }}>
                                {m.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{m.nome}</p>
                                {m.unidade && <p className="text-xs text-gray-500 dark:text-gray-400">{m.unidade}</p>}
                              </div>
                              {m.email && <a href={`mailto:${m.email}`} className="shrink-0" style={{ color: cat.color }}><Mail size={14} /></a>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
