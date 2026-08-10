import { prisma } from '@/lib/prisma';
import { uploadBlob, getBlobUrl } from '@/lib/azure-storage';
import type { CarouselSlideData, DisplayMode } from '@/components/sections/Carousel';

/**
 * Cache dos destaques (slides do carrossel) da home num blob público.
 *
 * Por quê: os destaques vinham direto do Azure SQL a cada requisição da home
 * (page.tsx é `force-dynamic`). No cold start do App Service a primeira conexão
 * ao banco leva segundos — daí o "Carregando destaques..." demorado. O blob é
 * servido estático pelo Azure Storage e responde em dezenas de milissegundos.
 *
 * Fluxo:
 *   - leitura (home): tenta o blob; se falhar/estiver vazio, cai no banco e
 *     regrava o blob em segundo plano;
 *   - escrita (admin): toda alteração em `carousel_slides` regrava o blob a
 *     partir do banco — ver app/api/data/[table]/route.ts.
 *
 * O blob é lido pelo servidor (server component), então CORS não é necessário
 * para este fluxo; ele só passa a importar se algum dia a leitura for feita
 * pelo navegador.
 */

export const HIGHLIGHTS_CONTAINER = 'aes-public';
export const HIGHLIGHTS_BLOB = 'site-highlights.json';

/** Timeout curto: o cache existe para ser rápido — se demorar, não vale esperar. */
const READ_TIMEOUT_MS = 2000;

export interface HighlightsPayload {
  /** ISO 8601 — quando o cache foi gerado a partir do banco. */
  updatedAt: string;
  slides: CarouselSlideData[];
}

type SlideRow = Awaited<ReturnType<typeof prisma.carouselSlide.findMany>>[number];

function toSlide(row: SlideRow): CarouselSlideData {
  return {
    id: row.id,
    badge: row.badge,
    badgeColor: row.badge_color,
    title: row.title,
    description: row.description ?? '',
    cta: row.cta ?? '',
    href: row.href ?? '',
    imagePath: row.image_path ?? undefined,
    displayMode: (row.display_mode as DisplayMode) || 'default',
  };
}

export function getHighlightsUrl(): string {
  return getBlobUrl(HIGHLIGHTS_CONTAINER, HIGHLIGHTS_BLOB);
}

/** Slides habilitados, direto do banco, na ordem de exibição. */
export async function fetchHighlightsFromDb(): Promise<CarouselSlideData[]> {
  const rows = await prisma.carouselSlide.findMany({
    where: { enabled: true },
    orderBy: { sort_order: 'asc' },
  });
  return rows.map(toSlide);
}

/**
 * Lê o cache. Retorna `null` em qualquer falha (blob inexistente, timeout, JSON
 * inválido) para que o chamador caia no banco — o cache nunca pode derrubar a home.
 */
export async function readHighlightsCache(): Promise<CarouselSlideData[] | null> {
  try {
    const response = await fetch(getHighlightsUrl(), {
      cache: 'no-store',
      signal: AbortSignal.timeout(READ_TIMEOUT_MS),
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as HighlightsPayload;
    if (!payload || !Array.isArray(payload.slides)) return null;
    return payload.slides;
  } catch (error) {
    console.warn(
      '[highlights-cache] leitura falhou, caindo no banco:',
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
}

/** Grava os slides no blob. Lança em caso de erro — o chamador decide o que fazer. */
export async function writeHighlightsCache(slides: CarouselSlideData[]): Promise<void> {
  const payload: HighlightsPayload = { updatedAt: new Date().toISOString(), slides };
  await uploadBlob(
    HIGHLIGHTS_CONTAINER,
    HIGHLIGHTS_BLOB,
    Buffer.from(JSON.stringify(payload), 'utf-8'),
    'application/json',
    // Curto de propósito: a invalidação é feita na escrita do admin, mas se um
    // CDN/proxy entrar no caminho, 60s limita a janela de conteúdo velho.
    'public, max-age=60',
  );
}

/**
 * Relê o banco e regrava o blob. Chamada após qualquer mutação de
 * `carousel_slides` no admin. Best-effort: erro aqui não pode quebrar o salvamento.
 */
export async function revalidateCachesForTable(table: string): Promise<void> {
  if (table !== 'carousel_slides') return;
  await rebuildHighlightsCache(); // best-effort: já trata os próprios erros
}

export async function rebuildHighlightsCache(): Promise<boolean> {
  try {
    const slides = await fetchHighlightsFromDb();
    await writeHighlightsCache(slides);
    return true;
  } catch (error) {
    console.error(
      '[highlights-cache] falha ao regravar o cache:',
      error instanceof Error ? error.message : String(error),
    );
    return false;
  }
}
