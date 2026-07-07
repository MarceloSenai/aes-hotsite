import QuickNavSidebar from '@/components/sections/QuickNavSidebar';
import Carousel from '@/components/sections/Carousel';

export default function Hero() {
  return (
    <section className="pt-6 pb-10 sm:pt-8 sm:pb-14 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5 lg:gap-6 items-stretch">
          <QuickNavSidebar />
          <Carousel />
        </div>

        <div className="text-center mt-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Destaques e <span className="text-theme-gradient">Novidades</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Acompanhe as últimas ofertas, notícias e comunicados da AES
          </p>
        </div>
      </div>
    </section>
  );
}
