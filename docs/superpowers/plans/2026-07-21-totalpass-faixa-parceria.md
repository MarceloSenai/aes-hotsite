# Faixa de destaque da parceria TotalPass — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Destacar a parceria com a TotalPass na seção "Serviços ao associado" da home, com o logotipo oficial e um CTA que leva ao canal de adesão que a AES já opera.

**Architecture:** Uma faixa escura de largura total, renderizada abaixo do bento de cinco benefícios e dentro do mesmo `motion.div` da seção, herdando o stagger existente. O conteúdo vive em `data.ts` junto dos demais dados da seção; a apresentação vive num componente próprio, seguindo a separação que `BeneficioCards.tsx` já estabelece.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion 12, lucide-react.

**Spec:** `docs/superpowers/specs/2026-07-21-totalpass-faixa-parceria-design.md`

## Global Constraints

- **Não commitar.** O `CLAUDE.md` do usuário proíbe criar commits. Toda task termina em `git add` (staging); o commit é do usuário. Nunca rodar `git commit`, `git push`, `git rebase` ou `git merge`.
- **Sem framework de teste.** O projeto não tem jest, vitest, testing-library nem playwright — os scripts são apenas `dev`, `build`, `start`, `lint`. Não introduzir framework de teste neste plano. A verificação de cada task é `npx tsc --noEmit` + `npm run lint`, e verificação visual na task de integração.
- **Baseline de qualidade:** `npx tsc --noEmit` sai **0 erros** hoje. `npm run lint` sai **62 warnings, 0 errors** hoje. Ao fim do plano: tsc continua em 0 erros; lint continua em **0 errors** e no máximo **63 warnings** (o `<img>` da logo adiciona um `@next/next/no-img-element`, consistente com `Carousel.tsx:94,106`).
- **Fundo escuro é obrigatório.** O logotipo é "Total" em verde `#26D07C` + "Pass" em **branco**. Nenhuma variante da faixa pode ter fundo claro.
- **Nada de `var(--color-primary)` nos elementos de ação da faixa.** O tema é trocável pelo admin e o padrão é vermelho `#E30613`.
- **Verde da marca TotalPass:** `#26D07C` — extraído do próprio SVG oficial (classe `.cls-1`).
- **Números são verificados, não estimados.** Só use os valores desta lista: 35 mil academias, 1.900 cidades, 250 modalidades, psicólogos online, meditação. Não inventar percentuais, preços ou promessas de gratuidade.
- **E-mail de adesão:** `cadastro@aessenai.org.br` (fonte: `lib/config/site-config.ts:165` e `lib/config/contact.ts:41`).

---

### Task 1: Dados e conteúdo da parceria

**Files:**
- Modify: `components/sections/destaques/data.ts` (adicionar tipo e export ao fim do arquivo)

**Interfaces:**
- Consumes: nada (primeira task)
- Produces: `export type ParceriaDestaque` e `export const totalpass: ParceriaDestaque`, consumidos pela Task 2. Campos exatos: `nome: string`, `logo: string`, `logoAlt: string`, `logoWidth: number`, `logoHeight: number`, `headline: string`, `description: string`, `chips: string[]`, `adesaoHref: string`, `adesaoLabel: string`, `siteHref: string`, `siteLabel: string`, `cor: string`.

- [ ] **Step 1: Adicionar o tipo e os dados ao fim de `components/sections/destaques/data.ts`**

Acrescente ao **final** do arquivo (depois do array `nucleos`, sem alterar nada acima):

```ts
export type ParceriaDestaque = {
  nome: string;
  logo: string;
  logoAlt: string;
  /** Proporção intrínseca do SVG oficial (784.55 × 87.24), normalizada para h-7. */
  logoWidth: number;
  logoHeight: number;
  headline: string;
  description: string;
  chips: string[];
  adesaoHref: string;
  adesaoLabel: string;
  siteHref: string;
  siteLabel: string;
  cor: string;
};

/**
 * Parceria em destaque na home, abaixo do bento de benefícios.
 *
 * Números conferidos em totalpass.com/br em 21/07/2026: "Mais de 35 mil
 * academias em 1.900 cidades", "Mais de 250 modalidades" e o Total Mind
 * ("milhares de psicólogos on-line + 400 áudios de meditação").
 *
 * A adesão é intermediada pela AES, não contratada direto com o parceiro:
 * site-config.ts:165 e contact.ts:41 rotulam cadastro@aessenai.org.br como o
 * canal responsável por TotalPass. Daí o CTA principal ser um mailto e não o
 * site do parceiro.
 *
 * O texto não cita desconto, preço nem gratuidade: não há fonte para essas
 * condições em nenhum lugar do projeto. Vende amplitude de rede, que é
 * verificável.
 *
 * `cor` é o verde da marca, extraído da classe .cls-1 do SVG oficial.
 */
export const totalpass: ParceriaDestaque = {
  nome: 'TotalPass',
  logo: '/images/parceiros/totalpass-white.svg',
  logoAlt: 'TotalPass',
  logoWidth: 252,
  logoHeight: 28,
  headline: 'O Brasil inteiro é a sua academia.',
  description:
    'Com a TotalPass, você treina em mais de 35 mil academias em 1.900 cidades — Smart Fit, Bio Ritmo e estúdios com mais de 250 modalidades. E ainda leva psicólogo online e meditação junto.',
  chips: ['+35 mil academias', '1.900 cidades', '+250 modalidades', 'Psicólogos online'],
  adesaoHref: 'mailto:cadastro@aessenai.org.br?subject=TotalPass%20-%20quero%20aderir',
  adesaoLabel: 'Quero aderir',
  siteHref: 'https://totalpass.com/br/',
  siteLabel: 'Conhecer a rede',
  cor: '#26D07C',
};
```

- [ ] **Step 2: Verificar que o tipo compila**

Run: `npx tsc --noEmit`
Expected: nenhuma saída, exit code 0. Se aparecer erro mencionando `data.ts`, o objeto não bate com o tipo — compare campo a campo.

- [ ] **Step 3: Confirmar que o `subject` do mailto é ASCII puro**

Run: `grep -n "adesaoHref" components/sections/destaques/data.ts`
Expected: a linha mostra `subject=TotalPass%20-%20quero%20aderir`, sem nenhum caractere acentuado. Acento não-codificado em `mailto:` quebra em alguns clientes de e-mail.

- [ ] **Step 4: Confirmar que o arquivo do logo existe no caminho referenciado**

Run: `ls -l public/images/parceiros/totalpass-white.svg`
Expected: o arquivo existe, ~4096 bytes. Se faltar, baixe com:
`curl -sS -L -A "Mozilla/5.0" -o public/images/parceiros/totalpass-white.svg "https://totalpass.com/_next/static/media/totalpass-desktop-white.ce53e1c2.svg"`

- [ ] **Step 5: Stage (sem commitar)**

```bash
git add components/sections/destaques/data.ts
```

Não rode `git commit`. O commit é do usuário.

---

### Task 2: Componente da faixa

**Files:**
- Create: `components/sections/destaques/TotalPassFaixa.tsx`

**Interfaces:**
- Consumes: `totalpass` de `./data` (Task 1); `itemVariants` de `./motion` (já existe, é um `Variants` do framer-motion).
- Produces: `export default function TotalPassFaixa()` — componente sem props, consumido pela Task 3.

- [ ] **Step 1: Criar `components/sections/destaques/TotalPassFaixa.tsx`**

Conteúdo completo do arquivo:

```tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { totalpass } from './data';
import { itemVariants } from './motion';

/**
 * Faixa da parceria TotalPass, logo abaixo do bento de benefícios.
 *
 * O fundo escuro nos dois temas é exigência da marca, não escolha estética: o
 * logotipo oficial é "Total" em verde sobre "Pass" em branco — sobre fundo
 * claro metade do nome desaparece.
 *
 * A faixa fica fora do grid de propósito. O bento tem exatamente cinco itens
 * (ver o comentário em data.ts) e um sexto card cairia sozinho numa terceira
 * linha; além disso a TotalPass é parceria de terceiro, não serviço da AES, e
 * a forma diferente evita que se passe por um.
 */
export default function TotalPassFaixa() {
  return (
    <motion.div variants={itemVariants} className="mt-4">
      <div className="relative overflow-hidden rounded-3xl bg-gray-950 p-6 sm:p-8 dark:bg-black">
        {/* Brilho da marca do parceiro, entrando pela direita. O card de
            destaque do bento usa o brilho de --color-primary pelo canto
            inferior esquerdo (BeneficioCards.tsx:20-27); lados opostos fazem
            as duas peças escuras coexistirem sem competir. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(120% 120% at 100% 0%, color-mix(in srgb, ${totalpass.cor} 40%, transparent), transparent 65%)`,
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span
              className="inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.18em]"
              style={{
                color: totalpass.cor,
                backgroundColor: `color-mix(in srgb, ${totalpass.cor} 14%, transparent)`,
              }}
            >
              PARCERIA
            </span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={totalpass.logo}
              alt={totalpass.logoAlt}
              width={totalpass.logoWidth}
              height={totalpass.logoHeight}
              className="mt-4 h-7 w-auto"
            />

            <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
              {totalpass.headline}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              {totalpass.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {totalpass.chips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90"
                >
                  <Check size={13} style={{ color: totalpass.cor }} />
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={totalpass.adesaoHref}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-950 transition-colors duration-200 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 focus-visible:outline-none dark:focus-visible:ring-offset-black"
            >
              {totalpass.adesaoLabel}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>

            <a
              href={totalpass.siteHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${totalpass.siteLabel} da ${totalpass.nome} (abre em nova aba)`}
              className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-white/70 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 focus-visible:outline-none dark:focus-visible:ring-offset-black"
            >
              {totalpass.siteLabel}
              <ExternalLink size={14} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: nenhuma saída, exit code 0.

- [ ] **Step 3: Verificar lint do arquivo novo**

Run: `npx eslint components/sections/destaques/TotalPassFaixa.tsx`
Expected: **0 errors.** O ideal é 0 warnings — a diretiva `{/* eslint-disable-next-line @next/next/no-img-element */}` deve suprimir o aviso do `<img>`.

Dois desfechos são aceitáveis, decida pelo que a saída mostrar:
- **0 problems** → a diretiva pegou. Siga.
- **1 warning `no-img-element`** → a diretiva não pegou neste setup. Remova a linha do `eslint-disable-next-line` (deixar uma diretiva que não suprime nada gera um segundo aviso, "unused eslint-disable directive") e siga assim mesmo: o warning é consistente com `Carousel.tsx:94,106`, que já usa `<img>` do mesmo jeito.

O que **não** é aceitável é qualquer *error*. Se aparecer um, corrija antes de seguir.

- [ ] **Step 4: Stage (sem commitar)**

```bash
git add components/sections/destaques/TotalPassFaixa.tsx
```

---

### Task 3: Integrar a faixa na home

**Files:**
- Modify: `components/sections/AssociadoDestaques.tsx` (import no topo; render após o `</div>` do grid, por volta da linha 76)

**Interfaces:**
- Consumes: `TotalPassFaixa` da Task 2 (default export, sem props).
- Produces: a faixa renderizada na home. Nada depende desta task.

- [ ] **Step 1: Adicionar o import**

Em `components/sections/AssociadoDestaques.tsx`, logo abaixo da linha 8 (`import { BeneficioDestaque, BeneficioCard } from './destaques/BeneficioCards';`), acrescente:

```tsx
import TotalPassFaixa from './destaques/TotalPassFaixa';
```

- [ ] **Step 2: Renderizar a faixa depois do grid**

Localize este trecho (linhas ~71-77):

```tsx
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <BeneficioDestaque item={destaque} total={beneficios.length} />
            {demais.map((item, i) => (
              <BeneficioCard key={item.href} item={item} index={i + 1} />
            ))}
          </div>
        </motion.div>
```

Substitua por:

```tsx
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <BeneficioDestaque item={destaque} total={beneficios.length} />
            {demais.map((item, i) => (
              <BeneficioCard key={item.href} item={item} index={i + 1} />
            ))}
          </div>
          <TotalPassFaixa />
        </motion.div>
```

A faixa fica **dentro** do `motion.div` e **fora** do `div` do grid. Dentro do `motion.div` para herdar o `groupVariants`/`whileInView` já configurado (sem criar um segundo observer); fora do grid para não virar uma sexta célula e quebrar o bento.

- [ ] **Step 3: Verificar tipos e lint**

Run: `npx tsc --noEmit && npm run lint 2>&1 | tail -3`
Expected: tsc sem saída; lint termina em **`0 errors`** e **62 ou 63 warnings** (62 se a diretiva de disable da Task 2 pegou, 63 se você a removeu). Qualquer número de *errors* acima de zero, ou um salto de warnings muito além disso, indica problema — investigue antes de seguir.

- [ ] **Step 4: Verificar o build de produção**

Run: `npm run build`
Expected: build conclui sem erro. A home é `force-dynamic` (`app/page.tsx:12`), então ela aparece como rota dinâmica — isso é o esperado, não uma regressão.

> Se o build falhar com `Cannot find module '.prisma/client/default'`, rode `npx prisma generate` e tente de novo.

- [ ] **Step 5: Verificação visual**

Run: `npm run dev` e abra `http://localhost:3000`

Confira, rolando até "Serviços ao associado":

1. O grid de cinco cards continua com o mesmo formato de antes — destaque escuro à esquerda ocupando duas linhas, quatro cards claros à direita. **Nenhum card sozinho numa terceira linha.**
2. A faixa aparece abaixo do grid, com o mesmo alinhamento lateral dos cards.
3. No logo, **as duas palavras estão legíveis**: "Total" em verde e "Pass" em branco. Se "Pass" sumiu, o fundo não está escuro.
4. Alterne o tema claro/escuro (o site tem um toggle). A faixa permanece escura nos dois.
5. Reduza a janela para largura de celular: a faixa empilha em coluna única e os dois CTAs continuam acessíveis.
6. Navegue com `Tab` até os dois CTAs: ambos mostram anel de foco visível contra o fundo escuro.
7. Clique em "Quero aderir": o cliente de e-mail abre com destinatário `cadastro@aessenai.org.br` e assunto `TotalPass - quero aderir`.
8. Clique em "Conhecer a rede": abre `totalpass.com/br` em **nova aba**.

Se algum item falhar, corrija antes de seguir.

- [ ] **Step 6: Stage (sem commitar)**

```bash
git add components/sections/AssociadoDestaques.tsx
```

---

### Task 4: Alinhar a descrição em Parcerias

**Files:**
- Modify: `lib/config/site-config.ts:279` (entrada `p10`)

**Interfaces:**
- Consumes: nada.
- Produces: nada. Task independente — pode ser revisada e aceita ou rejeitada sem afetar as outras.

Motivo: a entrada atual descreve a TotalPass apenas como "Acesso a academias (Smart Fit, Bio Ritmo) e serviços de saúde mental". Correto, mas muito menor do que a faixa passa a afirmar na home. Sem esse ajuste, home e `/parcerias` se contradizem.

- [ ] **Step 1: Atualizar a `descricao` da entrada `p10`**

Localize a linha 279 de `lib/config/site-config.ts`:

```ts
    { id: 'p10', nome: 'Totalpass', categoria: 'Bem-estar', descricao: 'Acesso a academias (Smart Fit, Bio Ritmo) e serviços de saúde mental.' },
```

Substitua por:

```ts
    { id: 'p10', nome: 'TotalPass', categoria: 'Bem-estar', descricao: 'Mais de 35 mil academias em 1.900 cidades, incluindo Smart Fit e Bio Ritmo, com mais de 250 modalidades, psicólogos online e meditação.', site: 'totalpass.com/br' },
```

Três mudanças: `nome` passa de `Totalpass` para `TotalPass` (grafia oficial da marca, a mesma usada em `site-config.ts:165` e `contact.ts:41`); `descricao` ganha a escala da rede; e `site` é preenchido — o campo já existe no tipo `Parceria` (`site-config.ts:122`) e a página de Parcerias já sabe renderizá-lo. `id` e `categoria` ficam intactos.

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: nenhuma saída, exit code 0.

- [ ] **Step 3: Conferir que nenhum número contradiz a faixa**

Run: `grep -n "35 mil\|1.900\|250 modalidades" components/sections/destaques/data.ts lib/config/site-config.ts`
Expected: os mesmos números aparecem nos dois arquivos. Nenhum valor divergente.

- [ ] **Step 4: Conferir visualmente a página de Parcerias**

Com `npm run dev` rodando, abra `http://localhost:3000/parcerias`. A TotalPass aparece com a descrição nova e um link para o site. O texto não deve estourar o card.

- [ ] **Step 5: Stage (sem commitar)**

```bash
git add lib/config/site-config.ts
```

---

## Verificação final

- [ ] `npx tsc --noEmit` → 0 erros
- [ ] `npm run lint` → `0 errors`, 62 ou 63 warnings
- [ ] `npm run build` → conclui sem erro
- [ ] `git status --short` mostra staged: `data.ts`, `TotalPassFaixa.tsx`, `AssociadoDestaques.tsx`, `site-config.ts`, `totalpass-white.svg`, e os dois `.md` de spec/plano
- [ ] **Nada foi commitado.** `git log --oneline -1` mostra o mesmo commit de antes do trabalho começar.

## Pendências que não são código

Levar ao usuário antes de publicar:

1. **Validar o uso do logotipo com a TotalPass.** O SVG veio do bundle de produção do site deles (`_next/static/media/totalpass-desktop-white.ce53e1c2.svg`), não de um kit de marca oficial. A arte está correta, mas kits normalmente definem área de proteção, tamanho mínimo e fundos permitidos.
2. **Confirmar que `cadastro@aessenai.org.br` é o canal de adesão vigente.** Foi deduzido de dois pontos do repo que rotulam esse e-mail como responsável por TotalPass. Se mudou, o CTA principal muda junto.
3. **Confirmar se há condição comercial** (desconto, subsídio, coparticipação). Hoje o texto não promete nenhuma, por falta de fonte. Se existir, vale acrescentar — número concreto converte mais que amplitude de rede.
