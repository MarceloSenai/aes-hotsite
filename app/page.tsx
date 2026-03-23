import Hero from '@/components/sections/Hero';
import Carousel from '@/components/sections/Carousel';
import QuickAccess from '@/components/sections/QuickAccess';
import Mission from '@/components/sections/Mission';
import Stats from '@/components/sections/Stats';
import Features from '@/components/sections/Features';
import Solutions from '@/components/sections/Solutions';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Carousel />
      <QuickAccess />
      <Mission />
      <Stats />
      <Features />
      <Solutions />
      <CTA />
    </>
  );
}
