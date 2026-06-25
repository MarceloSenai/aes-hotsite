import Carousel from '@/components/sections/Carousel';
import QuickAccess from '@/components/sections/QuickAccess';
import Mission from '@/components/sections/Mission';
import Stats from '@/components/sections/Stats';
// Seções ocultas temporariamente (a pedido):
// import Features from '@/components/sections/Features';   // "Nossos Serviços / Benefícios"
// import Solutions from '@/components/sections/Solutions'; // "Núcleos de Lazer"

export default function Home() {
  return (
    <>
      <Carousel />
      <Mission />
      {/* <Features /> */}
      <QuickAccess />
      {/* <Solutions /> */}
      <Stats />
    </>
  );
}
