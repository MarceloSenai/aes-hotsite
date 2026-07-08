import { prisma } from '@/lib/prisma';
import Carousel, { type CarouselSlideData, type DisplayMode } from '@/components/sections/Carousel';

export default async function CarouselSection() {
  let rows: Awaited<ReturnType<typeof prisma.carouselSlide.findMany>> = [];
  try {
    rows = await prisma.carouselSlide.findMany({
      where: { enabled: true },
      orderBy: { sort_order: 'asc' },
    });
  } catch (error) {
    console.error('[CarouselSection] Database error:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  if (!rows || rows.length === 0) {
    console.warn('[CarouselSection] No enabled slides found (rows=' + rows?.length + ')');
  }

  const slides: CarouselSlideData[] = (rows || []).map((row) => ({
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
