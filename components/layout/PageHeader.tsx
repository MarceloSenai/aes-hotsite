'use client';

import type { ElementType } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { ROTAS_PUBLICAS } from '@/lib/config/rotas-publicas';

export interface PageHeaderProps {
  /** Ícone que identifica a tela. */
  icone: ElementType;
  titulo: string;
  subtitulo: string;
  /**
   * Link de retorno à listagem-pai, quando existe uma — ex.: uma tela de
   * serviço volta para /servicos. O breadcrumb é sempre Home › tela atual, então
   * sem isto o caminho de volta à listagem se perderia.
   */
  /** Selo curto acima do título — usado para a cidade de cada núcleo. */
  selo?: { icone: ElementType; texto: string };
  /**
   * Foto de fundo. Usada só pelos núcleos de lazer, que mantêm um cabeçalho de
   * destaque: a foto aparece à direita, sob um degradê preto que vai de opaco
   * até transparente da esquerda para a direita, e a borda inferior recebe a
   * onda que dá o ar fluido dessas telas.
   */
  fundo?: { imagem: string; alt: string };
}

/**
 * Monta a trilha do breadcrumb a partir da rota atual.
 *
 * Um nível intermediário só entra se for uma rota de verdade: `/servicos` existe
 * e vira degrau, enquanto `/sobre` e `/nucleo-de-lazer` não existem como página
 * e são pulados. Como a checagem é feita contra o catálogo de rotas públicas,
 * uma tela nova acerta o próprio breadcrumb sem ninguém precisar lembrar disso.
 */
function construirTrilha(pathname: string, tituloAtual: string) {
  const segmentos = pathname.split('/').filter(Boolean);
  const trilha: { href: string; rotulo: string }[] = [];

  // Ancestrais: tudo menos o último segmento.
  let acumulado = '';
  for (const segmento of segmentos.slice(0, -1)) {
    acumulado += `/${segmento}`;
    const rota = ROTAS_PUBLICAS[acumulado];
    if (rota) trilha.push({ href: acumulado, rotulo: rota.titulo });
  }

  return [...trilha, { href: pathname, rotulo: tituloAtual }];
}

/**
 * Cabeçalho padrão das telas internas: breadcrumb, ícone, título e subtítulo,
 * alinhados à esquerda, com a mesma altura em todas as páginas.
 *
 * Antes cada tela trazia o seu próprio — umas centralizadas, outras à esquerda,
 * com ou sem ícone, e alturas indo de `py-20` a `pt-32 pb-20`. A altura agora
 * vive num lugar só: mudar aqui muda no site inteiro.
 */
export default function PageHeader({
  icone: Icone,
  titulo,
  subtitulo,
  selo,
  fundo,
}: PageHeaderProps) {
  const Selo = selo?.icone;
  const trilha = construirTrilha(usePathname(), titulo);
  return (
    <section
      className="relative overflow-hidden text-white"
      style={
        fundo
          ? undefined
          : {
              background:
                'linear-gradient(to bottom right, var(--color-primary-dark), var(--color-primary), var(--color-primary-dark))',
            }
      }
    >
      {fundo && (
        <>
          <Image
            src={fundo.imagem}
            alt={fundo.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Preto sólido até 65% da largura e transparente no fim: o texto fica
              sobre área opaca e a foto aparece do lado direito. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #000 0%, #000 65%, transparent 100%)' }}
          />
          {/* Forma fluida que dá o ar de destaque destas telas. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-1/3 right-[8%] h-[420px] w-[420px] rounded-full bg-white/10 blur-[110px]"
            animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* py-10/12: a referência usava py-14/16 e as demais chegavam a py-24. */}
      <div className="relative mx-auto max-w-[1920px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <motion.nav
          aria-label="Você está aqui"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/70"
        >
          <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            <Home size={14} />
            Home
          </Link>
          {trilha.map((degrau, i) => {
            const ultimo = i === trilha.length - 1;
            return (
              <span key={degrau.href} className="inline-flex items-center gap-2">
                <ChevronRight size={14} className="opacity-50" />
                {ultimo ? (
                  <span className="font-medium text-white" aria-current="page">
                    {degrau.rotulo}
                  </span>
                ) : (
                  <Link href={degrau.href} className="transition-colors hover:text-white">
                    {degrau.rotulo}
                  </Link>
                )}
              </span>
            );
          })}
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {selo && Selo && (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm">
              <Selo size={15} />
              {selo.texto}
            </span>
          )}

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Icone className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{titulo}</h1>
          </div>

          <p className="mt-4 max-w-3xl text-base text-white/85 sm:text-lg">{subtitulo}</p>
        </motion.div>
      </div>

      {fundo && (
        // Onda na borda inferior: é o "padrão fluido com linhas curvas" que
        // distingue as telas de núcleo das demais.
        <div aria-hidden className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
              className="fill-white dark:fill-gray-950"
            />
          </svg>
        </div>
      )}
    </section>
  );
}
