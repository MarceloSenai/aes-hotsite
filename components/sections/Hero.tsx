import { Suspense } from 'react';
import QuickNavSidebar from '@/components/sections/QuickNavSidebar';
import CarouselSection from '@/components/sections/CarouselSection';

function CarouselSkeleton() {
  return <div className="animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800 min-h-[220px] sm:min-h-[240px] h-full" />;
}

export default function Hero() {
  return (
    <section className="pt-4 pb-4 sm:pt-6 sm:pb-5 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-5 items-stretch">
          <QuickNavSidebar />
          <Suspense fallback={<CarouselSkeleton />}>
            <CarouselSection />
          </Suspense>
        </div>

        <div className="text-center mt-3">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Destaques e <span className="text-theme-gradient">Novidades</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Acompanhe as últimas ofertas, notícias e comunicados da AES
          </p>
        </div>
      </div>
    </section>
  );
}
