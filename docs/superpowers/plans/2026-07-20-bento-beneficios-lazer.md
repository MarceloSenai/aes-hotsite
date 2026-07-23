# Bento de Benefícios e Lazer — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir as duas listas verticais da seção `AssociadoDestaques` da home por um layout de bento — card escuro de destaque + cards numerados com chips — mantendo benefícios e núcleos lado a lado.

**Architecture:** A seção vira um grid de 12 colunas: benefícios ocupam 8 (sub-grid 4×2, com o destaque em `col-span-2 row-span-2`) e núcleos ocupam 4 (cards com foto). Dados e variantes de movimento saem para módulos próprios em `components/sections/destaques/`, e os três tipos de card viram componentes separados.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4 (dark mode por classe), framer-motion 12, lucide-react, next/image, sharp (processamento das fotos).

## Global Constraints

- **Nunca commitar.** Regra do `CLAUDE.md` do usuário: pode editar e `git add`, mas `git commit`/`push`/`rebase`/`merge` são proibidos. Todo passo de "Stage" termina em `git add` — o commit é do usuário.
- **Não há infraestrutura de teste no projeto** (sem vitest/jest/playwright; `package.json` só tem `dev`, `build`, `start`, `lint`). A verificação de cada task é: `npx tsc --noEmit`, `npm run lint` e inspeção visual no navegador. Não introduzir framework de teste — está fora de escopo.
- **Resolução de referência do desktop: 1920×1080.** É onde o `max-w-[1920px]` expõe vazios de layout. Toda conferência visual de desktop se faz nessa largura.
- **Cores sempre pelos tokens de tema:** `var(--color-primary)`, `var(--color-primary-light)`, `var(--color-primary-dark)`. Nunca hex fixo — o tema é trocável em runtime pelo `ThemeProvider`.
- **Estado (hover/focus) nunca via `style` inline.** Inline style vence classe utilitária e o hover não aplica. Use valores arbitrários do Tailwind: `bg-[var(--color-primary)]`, `group-hover:bg-[var(--color-primary)]`.
- **Texto em português do Brasil**, com acentuação correta.
- **Nenhum chip pode afirmar mais que a página de destino.** Os chips vêm das páginas de detalhe de cada serviço (`app/(public)/servicos/<slug>/page.tsx`), não do índice, e qualificadores da fonte são obrigatórios — "reembolso **parcial**" não vira "reembolso".
- Rotas dos itens não mudam: `/servicos/*` e `/nucleo-de-lazer/*` continuam iguais.
- Spec de referência: `docs/superpowers/specs/2026-07-20-bento-beneficios-lazer-design.md`.

---

### Task 1: Fotos dos núcleos

**Files:**
- Create: `public/images/nucleos/clube-nautico.webp`
- Create: `public/images/nucleos/clube-de-campo.webp`
- Create: `public/images/nucleos/colonia-de-ferias.webp`
- Create: `public/images/nucleos/CREDITOS.md`
- Modify: `app/(public)/nucleo-de-lazer/page.tsx:29,42,55` (campos `image:`)

**Interfaces:**
- Consumes: nada.
- Produces: três arquivos WebP de 1170×658 nos caminhos `/images/nucleos/clube-de-campo.webp`, `/images/nucleos/clube-nautico.webp`, `/images/nucleos/colonia-de-ferias.webp`. A Task 2 grava esses caminhos em `data.ts`.

- [ ] **Step 1: Baixar a foto oficial do Clube Náutico**

A única foto oficial aproveitável. As capas do site legado (`clubecapa.jpg`, `jatu.jpg`) são colagens com moldura e adesivos, e as da Colônia retornam 404 — já verificado, não perca tempo tentando.

```bash
mkdir -p "$SCRATCH/fotos"
curl -sS -f -o "$SCRATCH/fotos/nautico-original.jpg" https://aessenai.org.br/_img/boraceia02.jpg
file "$SCRATCH/fotos/nautico-original.jpg"
```

Onde `$SCRATCH` é o diretório de scratchpad da sessão. Esperado: `JPEG image data ... 1170x715`.

- [ ] **Step 2: Buscar duas candidatas para Clube de Campo e Colônia**

Fotos com licença livre para uso comercial. Use a ferramenta WebFetch nas páginas de busca e extraia URLs de `images.unsplash.com`:

- Clube de Campo (Jundiaí/SP — quiosques de alvenaria com telhado de barro, gramado, mata atlântica):
  `https://unsplash.com/s/photos/park-picnic-gazebo`
- Colônia de Férias (Itanhaém/SP — praia do litoral sul paulista, areia clara, vegetação):
  `https://unsplash.com/s/photos/brazil-beach-coast`

Baixe duas candidatas de cada com `curl`, na maior largura disponível:

```bash
curl -sS -f -o "$SCRATCH/fotos/campo-a.jpg" "<url-1>&w=1600"
curl -sS -f -o "$SCRATCH/fotos/campo-b.jpg" "<url-2>&w=1600"
curl -sS -f -o "$SCRATCH/fotos/colonia-a.jpg" "<url-3>&w=1600"
curl -sS -f -o "$SCRATCH/fotos/colonia-b.jpg" "<url-4>&w=1600"
```

Rejeite qualquer imagem com: texto/marca d'água, pessoas em close identificável, ou largura menor que 1170px.

- [ ] **Step 3: Olhar cada candidata e apresentar ao usuário**

Use a ferramenta Read em cada arquivo baixado — é a única forma de saber se a foto presta. Apresente as duas candidatas de cada núcleo ao usuário e **aguarde a escolha**. O spec exige esse gate: nenhum asset é gravado sem aprovação.

- [ ] **Step 4: Processar as três escolhidas para WebP**

```bash
cat > "$SCRATCH/processa-fotos.mjs" <<'EOF'
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const LARGURA = 1170;
const ALTURA = 658; // 16:9 exato

const arquivos = [
  { entrada: process.argv[2], saida: 'public/images/nucleos/clube-de-campo.webp' },
  { entrada: process.argv[3], saida: 'public/images/nucleos/clube-nautico.webp' },
  { entrada: process.argv[4], saida: 'public/images/nucleos/colonia-de-ferias.webp' },
];

await mkdir('public/images/nucleos', { recursive: true });

for (const { entrada, saida } of arquivos) {
  await sharp(entrada)
    .resize(LARGURA, ALTURA, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82 })
    .toFile(saida);
  const meta = await sharp(saida).metadata();
  console.log(`${saida} — ${meta.width}x${meta.height}`);
}
EOF

node "$SCRATCH/processa-fotos.mjs" "$SCRATCH/fotos/<campo-escolhida>.jpg" "$SCRATCH/fotos/nautico-original.jpg" "$SCRATCH/fotos/<colonia-escolhida>.jpg"
```

`position: 'attention'` faz o sharp cortar pela região de maior entropia, o que evita decapitar o assunto ao passar de 16:10 para 16:9.

Esperado — três linhas, todas `1170x658`:

```
public/images/nucleos/clube-de-campo.webp — 1170x658
public/images/nucleos/clube-nautico.webp — 1170x658
public/images/nucleos/colonia-de-ferias.webp — 1170x658
```

- [ ] **Step 5: Conferir o resultado final**

Use Read nos três `.webp` gerados. Se o corte cortou mal o assunto, refaça o Step 4 daquele arquivo trocando `position: 'attention'` por `position: sharp.strategy.entropy` ou por uma âncora fixa (`'north'`, `'center'`).

- [ ] **Step 6: Registrar origem e licença**

```markdown
# Créditos das fotos dos núcleos

| Arquivo | Origem | Licença |
|---|---|---|
| `clube-nautico.webp` | Foto oficial da AES — `https://aessenai.org.br/_img/boraceia02.jpg` (pier de pesca, represa de Boracéia) | Material da própria associação |
| `clube-de-campo.webp` | <URL da foto escolhida> | Unsplash License — uso comercial livre, sem atribuição obrigatória |
| `colonia-de-ferias.webp` | <URL da foto escolhida> | Unsplash License — uso comercial livre, sem atribuição obrigatória |

Clube de Campo e Colônia de Férias usam banco de imagem porque não há material
próprio utilizável: as capas do site legado são colagens com moldura e as fotos
da Colônia retornam 404. Substituir assim que a AES fornecer fotos reais —
basta trocar o arquivo mantendo o nome.
```

Grave em `public/images/nucleos/CREDITOS.md` com as URLs reais preenchidas.

- [ ] **Step 7: Corrigir as referências mortas em `nucleo-de-lazer/page.tsx`**

Os campos `image:` apontam hoje para arquivos que não existem. Três edições pontuais:

```diff
-    image: '/images/clube-campo.jpg',
+    image: '/images/nucleos/clube-de-campo.webp',
```
```diff
-    image: '/images/clube-nautico.jpg',
+    image: '/images/nucleos/clube-nautico.webp',
```
```diff
-    image: '/images/colonia-ferias.jpg',
+    image: '/images/nucleos/colonia-de-ferias.webp',
```

O campo não é renderizado naquela página, então nada muda visualmente ali — é só eliminar a referência quebrada.

- [ ] **Step 8: Verificar**

```bash
ls -la public/images/nucleos/
npx tsc --noEmit
```

Esperado: os 3 `.webp` + `CREDITOS.md` listados; `tsc` sem saída (sucesso).

- [ ] **Step 9: Stage** *(sem commitar — regra do projeto)*

```bash
git add public/images/nucleos "app/(public)/nucleo-de-lazer/page.tsx"
```

---

### Task 2: Dados e variantes de movimento

**Files:**
- Create: `components/sections/destaques/data.ts`
- Create: `components/sections/destaques/motion.ts`

**Interfaces:**
- Consumes: os caminhos de imagem criados na Task 1.
- Produces:
  - `type Beneficio = { icon: ElementType; title: string; description: string; chips: string[]; href: string }`
  - `type Nucleo = { title: string; location: string; description: string; chips: string[]; href: string; image: string; alt: string }`
  - `const beneficios: Beneficio[]` (5 itens, o primeiro é o destaque)
  - `const nucleos: Nucleo[]` (3 itens)
  - `const groupVariants` e `const itemVariants` (framer-motion)

- [ ] **Step 1: Criar `data.ts`**

Todo o texto vem de conteúdo já existente no repo (`app/(public)/servicos/page.tsx:14-65` e `app/(public)/nucleo-de-lazer/page.tsx:17-57`) — nada inventado.

```ts
import type { ElementType } from 'react';
import {
  Stethoscope,
  Smile,
  Shield,
  Pill,
  ShieldCheck,
} from 'lucide-react';

export type Beneficio = {
  icon: ElementType;
  title: string;
  description: string;
  chips: string[];
  href: string;
};

export type Nucleo = {
  title: string;
  location: string;
  description: string;
  chips: string[];
  href: string;
  image: string;
  alt: string;
};

/** O primeiro item é renderizado como card de destaque. A ordem importa. */
export const beneficios: Beneficio[] = [
  {
    icon: Stethoscope,
    title: 'Assistência Médica',
    description:
      'Plano de saúde UNIMED FESP com cobertura completa: consultas, exames, urgências, emergências e maternidade.',
    chips: ['Rede UNIMED FESP', 'Urgência 24h', 'Maternidade'],
    href: '/servicos/assistencia-medica',
  },
  {
    icon: Smile,
    title: 'Assistência Odontológica',
    description:
      'Cuidado dental completo para associados e dependentes com rede credenciada de qualidade.',
    chips: ['Rede credenciada', 'Coparticipação', 'Dependentes'],
    href: '/servicos/assistencia-odontologica',
  },
  {
    icon: Shield,
    title: 'Fundo Mútuo',
    description:
      'FUMUS e FUMUA: auxílio financeiro solidário e reembolso parcial de ambulância para associados e dependentes.',
    chips: ['FUMUS', 'FUMUA', 'Reembolso parcial de ambulância'],
    href: '/servicos/fundo-mutuo',
  },
  {
    icon: Pill,
    title: 'Farmácias',
    description:
      'Rede conveniada de farmácias com descontos exclusivos para associados AES.',
    chips: ['Descontos exclusivos', 'Rede ampla', 'Desconto em folha'],
    href: '/servicos/farmacias',
  },
  {
    icon: ShieldCheck,
    title: 'Seguros',
    description:
      'Produtos de seguros com condições especiais negociadas para associados AES.',
    chips: ['Condições negociadas', 'Parceiros credenciados'],
    href: '/servicos/seguros',
  },
];

export const nucleos: Nucleo[] = [
  {
    title: 'Clube de Campo',
    location: 'Jundiaí/SP',
    description:
      'Chalés, apartamentos, piscinas, saunas e muito mais em meio à natureza.',
    chips: ['12 Chalés', 'Piscinas', 'Saunas'],
    href: '/nucleo-de-lazer/clube-de-campo',
    image: '/images/nucleos/clube-de-campo.webp',
    alt: 'Área verde com quiosques do Clube de Campo da AES em Jundiaí',
  },
  {
    title: 'Clube Náutico',
    location: 'Boracéia/SP',
    description:
      'Chalés à beira da represa com pier de pesca, academia ao ar livre e a tranquilidade do interior paulista.',
    chips: ['8 Chalés', 'Pier de Pesca', 'Academia'],
    href: '/nucleo-de-lazer/clube-nautico',
    image: '/images/nucleos/clube-nautico.webp',
    alt: 'Pier de pesca do Clube Náutico da AES na represa de Boracéia',
  },
  {
    title: 'Colônia de Férias',
    location: 'Itanhaém/SP',
    description:
      'Apartamentos completos na praia com restaurante, cinema, piscina e toda infraestrutura para suas férias.',
    chips: ['48 Apartamentos', 'Restaurante', 'Cinema'],
    href: '/nucleo-de-lazer/colonia-de-ferias',
    image: '/images/nucleos/colonia-de-ferias.webp',
    alt: 'Praia do litoral sul paulista, onde fica a Colônia de Férias da AES em Itanhaém',
  },
];
```

Nota sobre as descrições dos núcleos: as originais em `nucleo-de-lazer/page.tsx` terminam com uma frase extra ("O refúgio perfeito para a família."). Foram encurtadas aqui porque o card tem espaço para ~3 linhas — a página de destino mantém o texto completo.

- [ ] **Step 2: Criar `motion.ts`**

Mesmos valores que a seção usa hoje (`AssociadoDestaques.tsx:32-40`), extraídos para serem compartilhados pelos três cards. Não invente valores novos — o vocabulário de movimento da home é este.

```ts
import type { Variants } from 'framer-motion';

/** Entrada escalonada, consistente com QuickAccess e o resto da home. */
export const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};
```

- [ ] **Step 3: Verificar**

```bash
npx tsc --noEmit
npm run lint
```

Esperado: ambos sem erro. Se `tsc` reclamar do `ease`, confirme que `Variants` foi importado como tipo — é ele que aceita a tupla de cubic-bezier sem `as const`.

- [ ] **Step 4: Stage** *(sem commitar)*

```bash
git add components/sections/destaques/data.ts components/sections/destaques/motion.ts
```

---

### Task 3: Cards de benefício e novo grid da seção

Esta task já entrega resultado visível: o bento de benefícios funcionando na home. A coluna de lazer entra no grid ainda com a lista antiga, e é substituída na Task 4.

**Files:**
- Create: `components/sections/destaques/BeneficioCards.tsx`
- Modify: `components/sections/AssociadoDestaques.tsx` (reescrita completa)

**Interfaces:**
- Consumes: `beneficios`, `type Beneficio` de `./data`; `groupVariants`, `itemVariants` de `./motion`.
- Produces:
  - `BeneficioDestaque({ item, total }: { item: Beneficio; total: number })`
  - `BeneficioCard({ item, index }: { item: Beneficio; index: number })` — `index` é a posição no array completo (o destaque é 0, então o primeiro card claro recebe 1) e vira o número exibido `String(index + 1).padStart(2, '0')`.

- [ ] **Step 1: Criar `BeneficioCards.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';
import type { Beneficio } from './data';
import { itemVariants } from './motion';

/** Card escuro que ancora o bento. Ocupa metade da largura e as duas linhas. */
export function BeneficioDestaque({ item, total }: { item: Beneficio; total: number }) {
  const Icon = item.icon;

  return (
    <motion.div variants={itemVariants} className="flex sm:col-span-2 md:row-span-2">
      <Link
        href={item.href}
        className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-gray-950 p-6 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none sm:p-8 dark:bg-black"
      >
        {/* Brilho de marca saindo do canto inferior esquerdo. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 100% at 0% 100%, color-mix(in srgb, var(--color-primary) 55%, transparent), transparent 70%)',
          }}
        />

        <div className="relative flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-primary)] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white">
            <Star size={11} className="fill-current" />
            MAIS PROCURADO
          </span>
          <span aria-hidden className="text-[11px] tracking-[0.18em] text-white/55">
            BENEFÍCIO 01 / {String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="relative mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary)]">
          <Icon size={26} className="text-white" />
        </div>

        <h3 className="relative mt-5 text-2xl font-bold text-white sm:text-3xl">{item.title}</h3>

        <p className="relative mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
          {item.description}
        </p>

        <ul className="relative mt-5 flex flex-wrap gap-2">
          {item.chips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90"
            >
              <Check size={13} className="text-[var(--color-primary)]" />
              {chip}
            </li>
          ))}
        </ul>

        <span className="relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white">
          Quero este benefício
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}

/** Cards claros numerados que preenchem as colunas 3 e 4 do bento. */
export function BeneficioCard({ item, index }: { item: Beneficio; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div variants={itemVariants} className="flex">
      <Link
        href={item.href}
        className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-gray-700/60 dark:bg-gray-800"
      >
        {/* Fita de marca que se abre no hover. */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-center scale-x-0 bg-[var(--color-primary)] transition-transform duration-200 group-hover:scale-x-100"
        />

        <div className="flex items-start justify-between gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary-light)] transition-colors duration-200 group-hover:bg-[var(--color-primary)]">
            <Icon
              size={20}
              className="text-[var(--color-primary)] transition-colors duration-200 group-hover:text-white"
            />
          </div>
          <span aria-hidden className="text-[11px] text-gray-300 dark:text-gray-500">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">{item.title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {item.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600 dark:bg-gray-700/60 dark:text-gray-300"
            >
              {chip}
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--color-primary)]">
          Saiba mais
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 2: Reescrever `AssociadoDestaques.tsx`**

A coluna de lazer entra aqui ainda com a lista antiga — a Task 4 troca pelos cards com foto. O cabeçalho de coluna (eyebrow + título + link "ver todos") é comum às duas colunas e vira um componente local.

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TreePalm, Waves, Umbrella } from 'lucide-react';
import { beneficios } from './destaques/data';
import { groupVariants, itemVariants } from './destaques/motion';
import { BeneficioDestaque, BeneficioCard } from './destaques/BeneficioCards';

function CabecalhoColuna({
  eyebrow,
  titulo,
  verHref,
  verLabel,
}: {
  eyebrow: string;
  titulo: string;
  verHref: string;
  verLabel: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <motion.span
          variants={itemVariants}
          className="mb-3 inline-block rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          {titulo}
        </motion.h2>
      </div>
      <motion.div variants={itemVariants}>
        <Link
          href={verHref}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {verLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </div>
  );
}

// TEMPORÁRIO — substituído por NucleoCard na Task 4.
const nucleosLegado = [
  { icon: TreePalm, title: 'Clube de Campo', local: 'Jundiaí/SP', href: '/nucleo-de-lazer/clube-de-campo' },
  { icon: Waves, title: 'Clube Náutico', local: 'Boracéia/SP', href: '/nucleo-de-lazer/clube-nautico' },
  { icon: Umbrella, title: 'Colônia de Férias', local: 'Itanhaém/SP', href: '/nucleo-de-lazer/colonia-de-ferias' },
];

export default function AssociadoDestaques() {
  const [destaque, ...demais] = beneficios;

  return (
    <section className="bg-gray-50 py-14 sm:py-5 dark:bg-gray-900/50">
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-10">
          {/* Benefícios — 8 de 12 colunas */}
          <motion.div
            className="xl:col-span-8"
            variants={groupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <CabecalhoColuna
              eyebrow="Benefícios"
              titulo="Serviços ao associado"
              verHref="/servicos"
              verLabel="Ver todos"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <BeneficioDestaque item={destaque} total={beneficios.length} />
              {demais.map((item, i) => (
                <BeneficioCard key={item.href} item={item} index={i + 1} />
              ))}
            </div>
          </motion.div>

          {/* Lazer — 4 de 12 colunas */}
          <motion.div
            className="xl:col-span-4"
            variants={groupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <CabecalhoColuna
              eyebrow="Lazer"
              titulo="Núcleos de lazer"
              verHref="/nucleo-de-lazer"
              verLabel="Ver os núcleos"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-1">
              {nucleosLegado.map((it) => {
                const Icon = it.icon;
                return (
                  <motion.div variants={itemVariants} key={it.href}>
                    <Link
                      href={it.href}
                      className="group flex items-center gap-3 rounded-xl border border-gray-200/80 bg-white p-3 transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-light)]">
                        <Icon size={18} className="text-[var(--color-primary)]" />
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white">
                        {it.title}
                        <span className="block text-xs font-normal text-gray-400">{it.local}</span>
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Esperado: sem erro.

- [ ] **Step 4: Conferir no navegador**

```bash
npm run dev
```

Abra `http://localhost:3000` em **1920×1080** e role até a seção. Confira:

1. Benefícios e núcleos estão lado a lado, benefícios ocupando ~2/3 da largura.
2. O card escuro ocupa metade do bloco de benefícios e tem a mesma altura das duas linhas de cards ao lado.
3. Os cards claros mostram os números 02, 03, 04, 05 no canto superior direito.
4. No hover de um card claro: fita vermelha abre no topo, o círculo do ícone vira vermelho sólido com ícone branco, o card sobe.
5. Nenhuma barra de rolagem horizontal.

Se o destaque não esticar até o fim da segunda linha, confirme que o `motion.div` tem `flex` e o `Link` tem `flex-1` — sem isso o filho não herda a altura do grid item.

- [ ] **Step 5: Conferir o tema escuro**

Use o botão de tema (canto inferior direito, `ThemeToggleFab`). O card de destaque fica preto, os claros ficam `gray-800`, e os chips continuam legíveis. Nenhum texto some.

- [ ] **Step 6: Stage** *(sem commitar)*

```bash
git add components/sections/destaques/BeneficioCards.tsx components/sections/AssociadoDestaques.tsx
```

---

### Task 4: Cards de núcleo com foto

**Files:**
- Create: `components/sections/destaques/NucleoCard.tsx`
- Modify: `components/sections/AssociadoDestaques.tsx` (remove o bloco temporário)

**Interfaces:**
- Consumes: `nucleos`, `type Nucleo` de `./data`; `itemVariants` de `./motion`; os WebP da Task 1.
- Produces: `export default function NucleoCard({ item }: { item: Nucleo })`.

- [ ] **Step 1: Criar `NucleoCard.tsx`**

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Nucleo } from './data';
import { itemVariants } from './motion';

export default function NucleoCard({ item }: { item: Nucleo }) {
  return (
    <motion.div variants={itemVariants} className="flex">
      <Link
        href={item.href}
        className="group flex flex-1 overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-gray-700/60 dark:bg-gray-800"
      >
        {/* Foto à esquerda: largura fixa, altura esticada pelo conteúdo ao lado. */}
        <div className="relative w-[38%] shrink-0 overflow-hidden sm:w-40">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(min-width: 640px) 160px, 38vw"
            className="object-cover transition-transform duration-400 group-hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">{item.title}</h3>

          <span className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPin size={12} />
            {item.location}
          </span>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {item.description}
          </p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {item.chips.slice(0, 2).map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-600 dark:bg-gray-700/60 dark:text-gray-300"
              >
                {chip}
              </li>
            ))}
          </ul>

          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[var(--color-primary)]">
            Conhecer
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
```

**Por que o card é horizontal:** medido na página real, a coluna de benefícios fecha em 653px de
altura. Foto 16:9 numa coluna de 588px daria 331px só de foto e ~500px por card — 1530px nos três,
uma torre 2,3× mais alta que a coluna vizinha. Horizontal fecha em ~190px cada, ~600px nos três.

Detalhe do `fill`: o `<Image fill>` exige pai `relative` com altura resolvida. Aqui a altura vem do
flex — a coluna de texto define a altura do card e a div da foto estica junto (`align-items:
stretch` é o padrão). Não coloque `aspect-*` na div da foto: isso brigaria com o stretch.

Nota Tailwind v4: `duration-400` e `line-clamp-2` são nativos. Se a build reclamar, use
`duration-[400ms]`.

- [ ] **Step 2: Trocar o bloco temporário em `AssociadoDestaques.tsx`**

Remova o array `nucleosLegado`, o mapeamento inteiro dentro da coluna de lazer, e os imports que ficaram órfãos (`TreePalm`, `Waves`, `Umbrella`).

Novos imports:

```tsx
import { beneficios, nucleos } from './destaques/data';
import NucleoCard from './destaques/NucleoCard';
```

O import de ícones passa a ser só:

```tsx
import { ArrowRight } from 'lucide-react';
```

E o conteúdo da coluna de lazer vira:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-1">
  {nucleos.map((item) => (
    <NucleoCard key={item.href} item={item} />
  ))}
</div>
```

- [ ] **Step 3: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Esperado: sem erro. Se o lint acusar variável não usada, sobrou import de ícone do bloco removido.

- [ ] **Step 4: Conferir no navegador**

Com `npm run dev` em 1920×1080:

1. Os três cards de lazer mostram foto à esquerda, título, cidade, descrição em 2 linhas e 2 chips.
2. As fotos não aparecem esticadas nem borradas, e preenchem a altura inteira do card.
3. No hover, a foto dá zoom suave dentro do card sem vazar dos cantos arredondados.
4. **A coluna de lazer termina próxima da altura da coluna de benefícios** (~600px contra ~653px). Se a diferença passar de ~150px, ajuste o `line-clamp` ou o padding antes de dar a task por encerrada — o equilíbrio entre as duas colunas é o motivo deste desenho.

- [ ] **Step 5: Stage** *(sem commitar)*

```bash
git add components/sections/destaques/NucleoCard.tsx components/sections/AssociadoDestaques.tsx
```

---

### Task 5: Verificação responsiva, acessibilidade e build

**Files:**
- Modify: qualquer arquivo das tasks anteriores, conforme os ajustes que esta verificação exigir.

**Interfaces:**
- Consumes: a seção completa das Tasks 1–4.
- Produces: nada novo — é a passagem de qualidade que fecha os critérios de aceite do spec.

- [ ] **Step 1: Conferir os quatro breakpoints**

Com `npm run dev`, use o modo responsivo do navegador em cada largura:

| Largura | Esperado |
|---|---|
| 1920px | 8 + 4 lado a lado; destaque ~590px; cards de lazer empilhados |
| 1280px | Mesmo arranjo, tudo mais estreito |
| 1024px | Empilhado: benefícios em largura cheia com o bento 4×2 preservado; lazer em 3 colunas |
| 768px | Igual ao anterior, mais apertado |
| 360px | Coluna única; nenhuma rolagem horizontal; textos e chips legíveis |

Em nenhuma largura pode haver rolagem horizontal. Se aparecer, o culpado costuma ser um chip longo ("Reembolso de ambulância") — o `flex-wrap` das listas de chips deve estar presente.

- [ ] **Step 2: Conferir navegação por teclado**

Percorra a seção com Tab. Cada card é um único alvo e mostra um anel na cor do tema. Os links "Ver todos" e "Ver os núcleos" também. Nenhum foco invisível.

- [ ] **Step 3: Conferir os destinos dos links**

Clique nos 8 cards e confirme que chegam nas mesmas rotas de antes — nenhum 404:

```
/servicos/assistencia-medica          /nucleo-de-lazer/clube-de-campo
/servicos/assistencia-odontologica    /nucleo-de-lazer/clube-nautico
/servicos/fundo-mutuo                 /nucleo-de-lazer/colonia-de-ferias
/servicos/farmacias
/servicos/seguros
```

Mais os dois links de cabeçalho: `/servicos` e `/nucleo-de-lazer`.

- [ ] **Step 4: Conferir contraste**

Com o DevTools (aba de acessibilidade ao inspecionar o elemento), verifique a razão de contraste nos dois temas. Precisa passar de 4.5:1 nos textos pequenos:

- Chips do card escuro (`text-white/90` sobre `bg-white/10` em fundo quase preto).
- Chips dos cards claros (`text-gray-600` sobre `bg-gray-100`; e `dark:text-gray-300` sobre `dark:bg-gray-700/60`).
- Cidade sobre a foto (`text-white` sobre o gradiente `from-black/60`) — o ponto mais arriscado, porque depende da foto. Se alguma foto for clara demais na base, aumente o gradiente para `from-black/70`.

O rótulo `BENEFÍCIO 01 / 05` (`text-white/55`) é decorativo e tem `aria-hidden`, então não precisa atingir o mesmo limite.

- [ ] **Step 5: Conferir movimento reduzido**

Abra o painel de acessibilidade do site e ative movimento reduzido. Recarregue e role até a seção: os cards aparecem sem animação de entrada e sem salto de layout.

Esse toggle é independente do sistema operacional, e é o caminho certo para testar em dev — o `MotionConfig` do layout usa `reducedMotion: 'never'` em desenvolvimento (`app/layout.tsx:82`), então o ajuste do SO não tem efeito aqui.

- [ ] **Step 6: Build**

```bash
npm run build
```

Esperado: build completa. Duas ressalvas conhecidas, nenhuma delas causada por esta mudança:

- O script roda `prisma generate` antes; se der erro de módulo `.prisma/client/default`, rode `npx prisma generate` e repita.
- Se falhar com `ETIMEOUT` no banco `aesdb`, é firewall/VPN do Azure SQL, não regressão — registre e siga.

- [ ] **Step 7: Revisar o diff inteiro**

```bash
git diff --staged --stat
git status --short
```

Confirme que só entraram os arquivos previstos: os 3 WebP + `CREDITOS.md`, os 4 arquivos em `components/sections/destaques/`, `AssociadoDestaques.tsx` e os 3 campos `image:` de `nucleo-de-lazer/page.tsx`. Nada de `AssociadoDestaques.tsx` com código morto do bloco temporário.

- [ ] **Step 8: Stage final** *(sem commitar — apresente o resultado ao usuário para ele commitar)*

```bash
git add -A components/sections public/images/nucleos "app/(public)/nucleo-de-lazer/page.tsx"
git status --short
```

---

## Notas de execução

- **Ordem importa.** A Task 1 tem um gate humano (escolha das fotos); as Tasks 2–4 dependem dela apenas pelos caminhos dos arquivos, então podem ser escritas antes se as fotos travarem — mas a verificação visual da Task 4 exige os WebP no lugar.
- **O que NÃO fazer:** não refatorar `/servicos` e `/nucleo-de-lazer` para consumirem `data.ts` (fora de escopo — o spec mantém os arrays daquelas páginas), não mexer em `QuickAccess`/`Hero`, não introduzir fonte serif, não criar framework de teste.
