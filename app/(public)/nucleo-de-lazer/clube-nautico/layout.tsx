import type { Metadata } from 'next';
import { ROTAS_PUBLICAS } from '@/lib/config/rotas-publicas';

// A página deste segmento é client component e não pode exportar `metadata`.
// O layout faz esse papel, lendo do catálogo em lib/config/rotas-publicas.ts.
const rota = ROTAS_PUBLICAS['/nucleo-de-lazer/clube-nautico'];

export const metadata: Metadata = {
  title: rota.titulo,
  description: rota.descricao,
  alternates: { canonical: '/nucleo-de-lazer/clube-nautico' },
  openGraph: {
    title: rota.titulo,
    description: rota.descricao,
    url: '/nucleo-de-lazer/clube-nautico',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
