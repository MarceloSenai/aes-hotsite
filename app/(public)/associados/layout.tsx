import type { Metadata } from 'next';
import { ROTAS_PUBLICAS } from '@/lib/config/rotas-publicas';

// A página deste segmento é client component e não pode exportar `metadata`.
// O layout faz esse papel, lendo do catálogo em lib/config/rotas-publicas.ts.
const rota = ROTAS_PUBLICAS['/associados'];

export const metadata: Metadata = {
  title: rota.titulo,
  description: rota.descricao,
  alternates: { canonical: '/associados' },
  openGraph: {
    title: rota.titulo,
    description: rota.descricao,
    url: '/associados',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
