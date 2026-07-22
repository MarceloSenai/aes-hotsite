import { Suspense } from 'react';
import HeroConstellation from '@/components/sections/HeroConstellation';
import HeroIntro from '@/components/sections/HeroIntro';
import CarouselSection from '@/components/sections/CarouselSection';

// Fica sobre a faixa vermelha, então usa branco/transparência em vez do cinza
// do card — um skeleton claro "furava" o gradiente enquanto os slides carregam.
function CarouselSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] h-full flex flex-col items-center justify-center gap-3">
      <div className="w-9 h-9 rounded-full border-[3px] border-white/30 border-t-white animate-spin" />
      <span className="text-sm font-medium text-white/70">Carregando destaques...</span>
    </div>
  );
}

// HeroConstellation é client (canvas + ponteiro); CarouselSection é server e
// busca os slides no banco. Os dois convivem porque a section é server.
export default function Hero() {
  return (
    <section className="relative overflow-hidden gradient-theme-hero">
      <HeroConstellation />

      {/* Padding e gap enxutos: em 1920x1080 o py-20 + gap-16 antigos somavam
          160px verticais e 64px horizontais de folga em volta do carrossel, que
          é a maior parte do "espaço em branco ao redor". */}
      <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* 5fr/7fr: o carrossel fica com ~58% da largura, maior que o 50/50 do mockup. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-10 items-center">
          <HeroIntro />
          <Suspense fallback={<CarouselSkeleton />}>
            <CarouselSection />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
