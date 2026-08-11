'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import { MapPin } from 'lucide-react';
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

  /**
   * Uma linha por CFP, com os embaixadores daquele CFP.
   *
   * O CFP fica gravado no campo `regional` ("CFP 101"); `unidade` está vazio em
   * todos os registros. Hoje são 91 CFPs — 81 com um embaixador e 10 com dois —,
   * o que a tabela de duas colunas de nome acomoda; um terceiro nome, se
   * aparecer, entra na mesma célula em vez de ser descartado.
   */
  const linhas = useMemo(() => {
    const map = new Map<string, string[]>();
    reps.forEach((r) => {
      const cfp = r.regional?.trim() || 'Sem CFP';
      if (!map.has(cfp)) map.set(cfp, []);
      map.get(cfp)!.push(r.nome);
    });

    const numero = (cfp: string) => Number(cfp.match(/\d+/)?.[0] ?? Number.MAX_SAFE_INTEGER);

    return [...map.entries()]
      .map(([cfp, nomes]) => ({ cfp, nomes: [...nomes].sort((a, b) => a.localeCompare(b, 'pt-BR')) }))
      .sort((a, b) => numero(a.cfp) - numero(b.cfp) || a.cfp.localeCompare(b.cfp, 'pt-BR'));
  }, [reps]);

  return (
    <>
      {/* Hero */}
      <PageHeader
 icone={MapPin}
 titulo="Embaixadores"
 subtitulo="Cada órgão do departamento regional do SENAI/SP é considerado como Núcleo da AES e conta com um representante."
 />

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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Embaixadores por CFP</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Um representante em cada núcleo da AES</p>
                </div>
              </div>

              {/* Tabela CFP | Embaixador | Embaixador — overflow-x próprio para
                  a página não rolar de lado em tela estreita. */}
              <div className="overflow-x-auto rounded-xl border border-gray-200/70 dark:border-gray-700/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200/70 dark:border-gray-700/50">
                      <th scope="col" className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs px-5 py-3 whitespace-nowrap w-32">
                        CFP
                      </th>
                      <th scope="col" className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs px-5 py-3">
                        Embaixador
                      </th>
                      <th scope="col" className="text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs px-5 py-3">
                        Embaixador
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900">
                    {linhas.map(({ cfp, nomes }) => (
                      <tr
                        key={cfp}
                        className="border-b border-gray-100 dark:border-gray-800/70 last:border-b-0 hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition-colors"
                      >
                        <th scope="row" className="px-5 py-3 text-left font-semibold whitespace-nowrap" style={{ color: ACCENT }}>
                          {cfp}
                        </th>
                        <td className="px-5 py-3 text-gray-800 dark:text-gray-200">{nomes[0]}</td>
                        <td className="px-5 py-3 text-gray-800 dark:text-gray-200">
                          {nomes.length > 1 ? nomes.slice(1).join(' · ') : (
                            <span className="text-gray-300 dark:text-gray-600" aria-label="sem segundo embaixador">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
