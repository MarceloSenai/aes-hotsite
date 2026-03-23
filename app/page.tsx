import Hero from '@/components/sections/Hero';
import Carousel from '@/components/sections/Carousel';
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
      <Mission />
      <Stats />
      <Features />
      <Solutions />
      <CTA />
    </>
  );
}
