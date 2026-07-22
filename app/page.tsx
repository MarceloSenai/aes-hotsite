import Hero from '@/components/sections/Hero';
import QuickAccess from '@/components/sections/QuickAccess';
import AssociadoDestaques from '@/components/sections/AssociadoDestaques';

// Renderiza a home em tempo de requisição (no App Service), NÃO no `next build`.
// O carrossel (Hero > CarouselSection) lê os slides do banco; se a home fosse
// pré-renderizada estaticamente no build, o agente de CI (IP não liberado no
// firewall do Azure SQL) não alcança o banco e o HTML era "assado" vazio
// ("Nenhum slide disponível") até o próximo deploy. Forçando dinâmico, os slides
// são sempre buscados do banco a cada requisição, que o App Service acessa normalmente.
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Hero />
      <QuickAccess />
      <AssociadoDestaques />
    </>
  );
}
