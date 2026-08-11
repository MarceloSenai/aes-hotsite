import type { Metadata } from 'next';
import { ROTAS_PUBLICAS } from '@/lib/config/rotas-publicas';
import { SITE_NAME } from '@/lib/config/site';

// A página deste segmento é client component e não pode exportar `metadata`.
// O layout faz esse papel, lendo do catálogo em lib/config/rotas-publicas.ts.
const rota = ROTAS_PUBLICAS['/servicos'];

export const metadata: Metadata = {
  // Este segmento tem rotas filhas. O `title` precisa ser objeto com `template`:
  // como string, ele substituiria o template do layout raiz em toda a subárvore,
  // e as páginas filhas ficariam sem o sufixo com o nome do site.
  title: {
    default: rota.titulo,
    template: `%s | ${SITE_NAME}`,
  },
  description: rota.descricao,
  alternates: { canonical: '/servicos' },
  openGraph: {
    title: rota.titulo,
    description: rota.descricao,
    url: '/servicos',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
