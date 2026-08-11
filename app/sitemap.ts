import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/config/site';
import { ROTAS_PUBLICAS } from '@/lib/config/rotas-publicas';

/**
 * Gerado a partir de lib/config/rotas-publicas.ts, a mesma fonte que alimenta a
 * `metadata` de cada rota — assim uma página nova não entra no site sem entrar
 * no sitemap.
 *
 * Rotas de acesso restrito (/admin, /login, /area-do-associado) ficam fora por
 * não estarem no catálogo.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return Object.entries(ROTAS_PUBLICAS).map(([caminho, rota]) => ({
    url: `${SITE_URL}${caminho === '/' ? '' : caminho}`,
    lastModified: agora,
    changeFrequency: caminho === '/' ? 'weekly' : 'monthly',
    priority: rota.prioridade,
  }));
}
