'use client';

import { useState, useEffect } from 'react';
import { representantesService } from '@/lib/services/data-service';

/**
 * Diretor de departamento, lido da tabela `representantes`
 * (categoria `diretores-departamentos`).
 */
export interface DiretorDepartamento {
  id: string;
  nome: string;
  cargo?: string;
}

interface UseDiretoresResult {
  /** Todos os diretores de departamentos (ordenados por sort_order). */
  diretores: DiretorDepartamento[];
  /** Mapa indexado pelo `cargo` (ex.: 'Departamento de Aposentados'). */
  porCargo: Record<string, DiretorDepartamento>;
  loading: boolean;
  error: boolean;
  /** Recarrega os diretores da base. */
  reload: () => Promise<void>;
}

/**
 * Carrega os diretores de departamentos da base. Usado pela listagem
 * (`/departamentos`) e por cada subpágina de departamento.
 */
export function useDiretores(): UseDiretoresResult {
  const [diretores, setDiretores] = useState<DiretorDepartamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reload = async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await representantesService.getAll();
      const dirs = (data as unknown as DiretorDepartamento[]).filter(
        (r) => (r as { categoria?: string }).categoria === 'diretores-departamentos',
      );
      setDiretores(dirs);
    } catch (err) {
      console.error('Failed to load diretores:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const porCargo: Record<string, DiretorDepartamento> = {};
  for (const d of diretores) {
    if (d.cargo) porCargo[d.cargo] = d;
  }

  return { diretores, porCargo, loading, error, reload };
}
