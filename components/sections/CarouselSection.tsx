import { prisma } from '@/lib/prisma';
import Carousel, { type CarouselSlideData, type DisplayMode } from '@/components/sections/Carousel';

type SlideRows = Awaited<ReturnType<typeof prisma.carouselSlide.findMany>>;

/**
 * Busca os slides com retry + backoff. No cold start do App Service, a primeira
 * conexão ao Azure SQL pode levar ~3s e estourar o connectionTimeout, fazendo a
 * query falhar. Sem retry, o `catch` mostraria "Nenhum slide disponível" até o
 * próximo request — o banner "sumindo" de forma intermitente. As tentativas dão
 * tempo do pool de conexão esquentar; em request quente a 1ª já resolve.
 */
async function fetchSlidesWithRetry(attempts = 4): Promise<SlideRows> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await prisma.carouselSlide.findMany({
        where: { enabled: true },
        orderBy: { sort_order: 'asc' },
      });
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** i)); // 300ms, 600ms, 1200ms
      }
    }
  }
  console.error('[CarouselSection] Database error após retries:', lastError instanceof Error ? lastError.message : String(lastError));
  return [];
}

export default async function CarouselSection() {
  const rows = await fetchSlidesWithRetry();

  const slides: CarouselSlideData[] = rows.map((row) => ({
    id: row.id,
    badge: row.badge,
    badgeColor: row.badge_color,
    title: row.title,
    description: row.description ?? '',
    cta: row.cta ?? '',
    href: row.href ?? '',
    imagePath: row.image_path ?? undefined,
    displayMode: (row.display_mode as DisplayMode) || 'default',
  }));

  return <Carousel slides={slides} />;
}
