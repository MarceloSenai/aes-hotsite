import type { Metadata } from 'next';
import { ROTAS_PUBLICAS } from '@/lib/config/rotas-publicas';

// A página deste segmento é client component e não pode exportar `metadata`.
// O layout faz esse papel, lendo do catálogo em lib/config/rotas-publicas.ts.
const rota = ROTAS_PUBLICAS['/departamentos/esportivo-capital'];

export const metadata: Metadata = {
  title: rota.titulo,
  description: rota.descricao,
  alternates: { canonical: '/departamentos/esportivo-capital' },
  openGraph: {
    title: rota.titulo,
    description: rota.descricao,
    url: '/departamentos/esportivo-capital',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
