import Carousel from '@/components/sections/Carousel';
import QuickAccess from '@/components/sections/QuickAccess';
import Mission from '@/components/sections/Mission';
import Stats from '@/components/sections/Stats';
import Features from '@/components/sections/Features';
import Solutions from '@/components/sections/Solutions';

export default function Home() {
  return (
    <>
      <Carousel />
      <Mission />
      <Features />
      <QuickAccess />
      <Solutions />
      <Stats />
    </>
  );
}
