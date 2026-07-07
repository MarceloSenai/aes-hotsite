import Hero from '@/components/sections/Hero';
import QuickAccess from '@/components/sections/QuickAccess';
import Stats from '@/components/sections/Stats';
// Seções ocultas temporariamente (a pedido):
// import Mission from '@/components/sections/Mission';     // "Nossa Essência / Missão, Visão, Valores"
// import Features from '@/components/sections/Features';   // "Nossos Serviços / Benefícios"
// import Solutions from '@/components/sections/Solutions'; // "Núcleos de Lazer"

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Mission /> */}
      {/* <Features /> */}
      <QuickAccess />
      {/* <Solutions /> */}
      <Stats />
    </>
  );
}
