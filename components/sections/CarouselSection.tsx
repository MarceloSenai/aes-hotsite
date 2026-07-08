import Carousel, { type CarouselSlideData, type DisplayMode } from '@/components/sections/Carousel';

interface CarouselRow {
  id: string;
  badge: string;
  badge_color: string;
  title: string;
  description: string | null;
  cta: string | null;
  href: string | null;
  enabled: boolean;
  sort_order: number;
  image_path: string | null;
  display_mode: string;
}

async function fetchCarouselSlides(): Promise<CarouselRow[]> {
  try {
    // Try direct Prisma first (faster in dev/same-region)
    const { prisma } = await import('@/lib/prisma');
    const rows = await Promise.race([
      prisma.carouselSlide.findMany({
        where: { enabled: true },
        orderBy: { sort_order: 'asc' },
      }),
      new Promise<CarouselRow[]>((_, reject) =>
        setTimeout(() => reject(new Error('Prisma timeout')), 5000)
      ),
    ]);
    console.log('[CarouselSection] Prisma fetch succeeded, rows:', (rows as CarouselRow[])?.length);
    return rows as CarouselRow[];
  } catch (error) {
    console.warn('[CarouselSection] Prisma fetch failed, trying API fallback:',
      error instanceof Error ? error.message : String(error));

    // Fallback to API route (works from any region)
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXTAUTH_URL
          ? process.env.NEXTAUTH_URL
          : 'https://aes-next-prod-d0adesfndvcvh0hs.brazilsouth-01.azurewebsites.net';

      const apiUrl = `${baseUrl}/api/data/carousel_slides`;
      console.log('[CarouselSection] API fallback URL:', apiUrl);

      const response = await fetch(apiUrl, {
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status} ${response.statusText}`);
      }

      const rows: CarouselRow[] = await response.json();
      console.log('[CarouselSection] API raw response rows:', rows?.length);

      const filtered = rows.filter((r) => r.enabled);
      filtered.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      console.log('[CarouselSection] API fetch succeeded, filtered rows:', filtered.length);
      return filtered;
    } catch (apiError) {
      console.error('[CarouselSection] API fallback also failed:',
        apiError instanceof Error ? apiError.message : String(apiError));
      return [];
    }
  }
}

export default async function CarouselSection() {
  const rows = await fetchCarouselSlides();

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
