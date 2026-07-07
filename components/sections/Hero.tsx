import QuickNavSidebar from '@/components/sections/QuickNavSidebar';
import Carousel from '@/components/sections/Carousel';

export default function Hero() {
  return (
    <section className="pt-8 pb-16 sm:pt-10 sm:pb-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8 items-stretch">
          <QuickNavSidebar />
          <Carousel />
        </div>

        <div className="text-center mt-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Destaques e <span className="text-theme-gradient">Novidades</span>
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Acompanhe as últimas ofertas, notícias e comunicados da AES
          </p>
        </div>
      </div>
    </section>
  );
}
