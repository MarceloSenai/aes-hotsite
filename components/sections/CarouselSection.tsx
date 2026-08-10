import Carousel, { type CarouselSlideData } from '@/components/sections/Carousel';
import {
  fetchHighlightsFromDb,
  readHighlightsCache,
  writeHighlightsCache,
} from '@/lib/services/highlights-cache';

/**
 * Busca os slides no banco com retry + backoff. No cold start do App Service, a
 * primeira conexão ao Azure SQL pode levar ~3s e estourar o connectionTimeout,
 * fazendo a query falhar. Sem retry, o `catch` mostraria "Nenhum slide
 * disponível" até o próximo request — o banner "sumindo" de forma intermitente.
 * As tentativas dão tempo do pool de conexão esquentar; em request quente a 1ª
 * já resolve.
 */
async function fetchSlidesWithRetry(attempts = 4): Promise<CarouselSlideData[]> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetchHighlightsFromDb();
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** i)); // 300ms, 600ms, 1200ms
      }
    }
  }
  console.error(
    '[CarouselSection] Database error após retries:',
    lastError instanceof Error ? lastError.message : String(lastError),
  );
  return [];
}

/**
 * Caminho rápido: o blob público `aes-public/site-highlights.json`, regravado
 * pelo admin a cada alteração (ver lib/services/highlights-cache.ts). O banco só
 * entra quando o cache está ausente ou ilegível — e nesse caso o cache é
 * refeito, para que a próxima visita já pegue o caminho rápido.
 */
export default async function CarouselSection() {
  const cached = await readHighlightsCache();
  if (cached && cached.length > 0) {
    return <Carousel slides={cached} />;
  }

  const slides = await fetchSlidesWithRetry();

  if (slides.length > 0) {
    // Semeia o cache para as próximas requisições. Falha aqui não afeta a home.
    try {
      await writeHighlightsCache(slides);
    } catch (error) {
      console.error(
        '[CarouselSection] falha ao semear o cache de destaques:',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  return <Carousel slides={slides} />;
}
