# Redesign da seção Benefícios e Lazer (home)

*Spec de design — 20 de julho de 2026*

## Contexto

A home renderiza `AssociadoDestaques` logo abaixo de `QuickAccess` (`app/page.tsx:18`). Hoje a seção
são duas colunas simétricas de listas verticais: cada item é uma linha com ícone quadrado, título e
seta. A informação por item é mínima — nome e, nos núcleos, a cidade.

O redesign adota a linguagem de um layout de bento apresentado como referência: um card de destaque
escuro ao lado de uma grade de cards claros numerados, cada um com descrição e chips de
características.

## Decisões fechadas

1. **Lado a lado é mantido.** O documento de alinhamento com a cliente
   (`docs/redesign/2026-07-17-ajustes-interface.md:43` e resumo item 3) fecha "serviços e núcleos
   lado a lado". O bento se acomoda dentro dessa restrição em vez de empilhar as duas famílias.
2. **Sem serif.** A referência usa serif nos títulos; o site é Inter (`app/layout.tsx:14`). Mantém-se
   Inter em tudo — o layout, a numeração, os chips e o card escuro já entregam o caráter desejado
   sem introduzir uma segunda família tipográfica.
3. **Fotos mistas nos núcleos.** Clube Náutico usa foto oficial real; Clube de Campo e Colônia de
   Férias usam banco de imagem com licença livre até a AES fornecer material próprio.

## Layout

Grid de 12 colunas dentro do container atual (`max-w-[1920px]`, `px-4 sm:px-6 lg:px-8`,
`py-14 sm:py-20`, fundo `bg-gray-50 dark:bg-gray-900/50`).

```
xl (≥1280px)
┌─ Benefícios · col-span-8 ──────────────┐ ┌─ Lazer · col-span-4 ─┐
│ ┌──────────────┐ ┌──────┐ ┌──────┐     │ │ ┌──────────────────┐ │
│ │              │ │  02  │ │  03  │     │ │ │ [foto] Campo     │ │
│ │  01 destaque │ └──────┘ └──────┘     │ │ └──────────────────┘ │
│ │   (escuro)   │ ┌──────┐ ┌──────┐     │ │ ┌──────────────────┐ │
│ │              │ │  04  │ │  05  │     │ │ │ [foto] Náutico   │ │
│ └──────────────┘ └──────┘ └──────┘     │ │ └──────────────────┘ │
└────────────────────────────────────────┘ │ ┌──────────────────┐ │
                                           │ │ [foto] Colônia   │ │
                                           │ └──────────────────┘ │
                                           └──────────────────────┘
```

**Grade de benefícios:** `grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4`. O destaque é
`sm:col-span-2 md:row-span-2` — ocupa metade da largura e as duas linhas, deixando os quatro cards
claros em 2×2. Essa proporção 50/25/25 reproduz a referência.

**Coluna de lazer:** `flex flex-col gap-4` em `xl`; vira `md:grid md:grid-cols-3` quando a seção
empilha.

**Breakpoints:**

| Faixa | Comportamento |
|---|---|
| ≥1280px (`xl`) | 8 + 4 lado a lado |
| 768–1279px (`md`) | Empilha: benefícios em largura cheia com o bento preservado, lazer em 3 colunas |
| 640–767px (`sm`) | Destaque em largura cheia, cards claros em 2 colunas, núcleos em 1 coluna |
| <640px | Coluna única |

Em 1920px o container útil é ~1856px: benefícios ficam com ~1200px (destaque ~590px, cards ~290px) e
os cards de lazer com ~600px — largura que a foto de 1200px cobre sem esticar.

## Anatomia dos cards

### Destaque (01 · Assistência Médica)

- Fundo `bg-gray-950` com brilho radial saindo do canto inferior esquerdo:
  `radial-gradient(120% 100% at 0% 100%, color-mix(in srgb, var(--color-primary) 55%, transparent), transparent 70%)`.
- Raio `rounded-3xl` (24px), padding `p-6 sm:p-8`, altura acompanha as duas linhas de cards.
- Topo: badge "★ MAIS PROCURADO" (pill `bg-[var(--color-primary)]`, texto branco, `text-[11px]`,
  `font-semibold`, `tracking-wide`) + rótulo `BENEFÍCIO 01 / 05` (`text-[11px]`, `tracking-[0.18em]`,
  `text-white/55`).
- Ícone: quadrado 56px `rounded-2xl` `bg-[var(--color-primary)]`, ícone branco 26px.
- Título `text-2xl sm:text-3xl font-bold text-white`; descrição `text-white/70 text-sm sm:text-base`.
- Chips: `bg-white/8`, `border border-white/12`, `rounded-full`, `text-xs text-white/90`, com ícone
  `Check` 13px na cor primária.
- Rodapé (`mt-auto`): "Quero este benefício →" — `text-white font-semibold text-sm`, seta desloca
  4px no hover do card.

### Cards claros (02–05)

- `bg-white dark:bg-gray-800`, `border border-gray-200/80 dark:border-gray-700/60`, `rounded-2xl`,
  `p-5`.
- Número no canto superior direito: `text-[11px] text-gray-300 dark:text-gray-500`, dois dígitos.
- Ícone: círculo 44px `bg-[var(--color-primary-light)]` com ícone 20px na cor primária.
- Título `text-base font-bold text-gray-900 dark:text-white`; descrição `text-sm text-gray-600
  dark:text-gray-300`, no máximo 3 linhas.
- Chips: `bg-gray-100 dark:bg-gray-700/60`, `text-[11px] text-gray-600 dark:text-gray-300`,
  `rounded-full px-2.5 py-1`.
- "Saiba mais →" na cor primária, `text-sm font-semibold`, ancorado no rodapé.
- **Hover:** fita de 3px na cor primária no topo do card (escala horizontal de 0 a 1 a partir do
  centro), ícone passa a círculo sólido na cor primária com ícone branco, card sobe 2px e ganha
  `shadow-md`. Transição 200ms.

### Cards de núcleo

Layout **horizontal**: foto à esquerda, conteúdo à direita.

- Mesmo container claro dos cards 02–05, porém `flex` em linha e sem padding no container (o
  padding vive só na coluna de texto, para a foto encostar na borda).
- Foto à esquerda: largura fixa de 160px em `xl`, 38% abaixo disso; `object-cover`; ocupa a
  altura inteira do card via `next/image` com `fill`.
- À direita: título, cidade com ícone `MapPin` 12px, descrição em duas linhas (`line-clamp-2`),
  dois chips de `highlights` e o link "Conhecer".
- Hover: mesma elevação dos cards claros; a foto recebe `scale-105` em 400ms dentro do
  `overflow-hidden`.

**Por que horizontal e não foto no topo:** medido na página real, a coluna de benefícios fecha em
653px de altura. Cards com foto 16:9 numa coluna de 588px de largura dariam 331px só de foto e
~500px por card — 1530px nos três, uma torre 2,3× mais alta que a coluna vizinha. O card
horizontal fecha em ~190px cada, ~600px nos três, e as duas colunas terminam praticamente na mesma
linha.

## Conteúdo

Todo o texto vem de conteúdo já existente no repo — nada inventado.

### Benefícios

| # | Título | Descrição | Chips |
|---|---|---|---|
| 01 | Assistência Médica | Plano de saúde UNIMED FESP com cobertura completa: consultas, exames, urgências, emergências e maternidade. | Rede UNIMED FESP · Urgência 24h · Maternidade |
| 02 | Assistência Odontológica | Cuidado dental completo para associados e dependentes com rede credenciada de qualidade. | Rede credenciada · Coparticipação · Dependentes |
| 03 | Fundo Mútuo | FUMUS e FUMUA: auxílio financeiro solidário e reembolso parcial de ambulância para associados e dependentes. | FUMUS · FUMUA · Reembolso parcial de ambulância |
| 04 | Farmácias | Rede conveniada de farmácias com descontos exclusivos para associados AES. | Descontos exclusivos · Rede ampla · Desconto em folha |
| 05 | Seguros | Produtos de seguros com condições especiais negociadas para associados AES. | Condições negociadas · Parceiros credenciados |

Fontes: descrições em `app/(public)/servicos/page.tsx:14-65`; chips derivados das páginas de
detalhe de cada serviço — `assistencia-medica/page.tsx:62-77` e `:73` ("Atendimento 24h em
pronto-socorro"), `assistencia-odontologica/page.tsx:84,197`, `fundo-mutuo/page.tsx:81,138,146`,
`farmacias/page.tsx:16-32`. Seguros não tem chips fixos porque a página lista parceiros vindos do
banco — os dois chips descrevem a natureza do benefício, não parceiros específicos.

"Coparticipação" fica no card de odontologia por decisão editorial consciente, revisada em
20/07/2026: é o único chip que nomeia um custo do associado numa fileira lida como lista de
vantagens, mas é verdadeiro (`assistencia-odontologica/page.tsx:197`) e avisar antes do clique é
mais honesto do que deixar a descoberta para a página de destino.

O chip do Fundo Mútuo diz "Reembolso **parcial** de ambulância" porque é o que a fonte garante
(`fundo-mutuo/page.tsx:146`). Omitir "parcial" prometeria cobertura integral — num site
institucional de associação, chip é promessa, e nenhum deles pode afirmar mais que a página de
destino.

### Núcleos

Descrição, cidade e `highlights` reaproveitados de `app/(public)/nucleo-de-lazer/page.tsx:17-57`.
São exibidos os 3 primeiros highlights de cada núcleo.

## Fotos

Pipeline com o `sharp` já presente no projeto: corte para 16:9 → redimensionar para 1170px de
largura → WebP qualidade 82 → `public/images/nucleos/`.

A largura alvo é 1170px porque é o tamanho do original do Clube Náutico (1170×715) — ampliar seria
inventar pixels. As fotos de banco são reduzidas ao mesmo valor para as três ficarem uniformes. Num
card de ~600px, 1170px cobre telas de densidade 2×.

| Núcleo | Origem | Situação |
|---|---|---|
| Clube Náutico | `https://aessenai.org.br/_img/boraceia02.jpg` (1170×715) | Foto oficial real: pier de pesca na represa. Já baixada e verificada. |
| Clube de Campo | Banco de imagem com licença livre | As capas do site legado (`clubecapa.jpg`, `jatu.jpg`) são colagens com moldura e adesivos — inutilizáveis. Escolher cena de quiosques/área verde. |
| Colônia de Férias | Banco de imagem com licença livre | As fotos do site legado retornam 404 e o acervo local só tem 380px. Escolher cena de praia do litoral paulista. |

Requisito: apresentar duas candidatas por núcleo para escolha antes de gravar o asset final. As
imagens usam `next/image` com `fill` dentro de um container de razão fixa 16:9 — é o container que
reserva o espaço, então não há deslocamento de layout no carregamento.

O arquivo final de cada núcleo mede 1170×658 (16:9 exato a partir de 1170 de largura).

Os campos `image:` em `app/(public)/nucleo-de-lazer/page.tsx` hoje apontam para arquivos
inexistentes (`/images/clube-campo.jpg` etc.) e não são renderizados. Passam a apontar para os novos
arquivos, corrigindo referências mortas sem alterar o comportamento daquela página.

## Movimento

Mantém o vocabulário da home: variantes de grupo com `staggerChildren: 0.06`, item entrando de
`opacity: 0, y: 16` com `duration: 0.35` e ease `[0.22, 1, 0.36, 1]`, disparo por
`whileInView` com `viewport={{ once: true, margin: '-40px' }}`.

Isso mantém a seção sob o `MotionConfig` do layout raiz (`app/layout.tsx:82`), que respeita
movimento reduzido em produção. Os efeitos de hover são CSS puro (transform e opacidade), sem
animação de propriedades que forcem layout.

## Acessibilidade

- Cada card é um `Link` único envolvendo todo o conteúdo — um só alvo, um só destino.
- `focus-visible` com anel de 2px na cor primária e `ring-offset-2`.
- Fotos com `alt` descritivo do local ("Pier de pesca do Clube Náutico da AES na represa de
  Boracéia").
- Chips e textos secundários auditados para contraste AA nos temas claro e escuro; os chips do card
  escuro usam `text-white/90`, não `text-white/60`.
- A numeração dos cards é decorativa e recebe `aria-hidden`.

## Arquivos

```
components/sections/AssociadoDestaques.tsx        reescrito — seção, grid 12 col, cabeçalhos
components/sections/destaques/BeneficioCards.tsx  card destaque + card claro
components/sections/destaques/NucleoCard.tsx      card com foto
components/sections/destaques/data.ts             os 8 itens com chips e ícones
components/sections/destaques/motion.ts           variantes de entrada compartilhadas
public/images/nucleos/clube-de-campo.webp
public/images/nucleos/clube-nautico.webp
public/images/nucleos/colonia-de-ferias.webp
app/(public)/nucleo-de-lazer/page.tsx             só os 3 campos `image:` corrigidos
```

`AssociadoDestaques.tsx` continua sendo o único ponto de entrada consumido por `app/page.tsx` — a
mudança não toca a home.

## Fora de escopo

- Refatorar as páginas de índice `/servicos` e `/nucleo-de-lazer` para consumirem `data.ts`. Elas
  mantêm seus próprios arrays; o objetivo aqui é a home.
- Alterar `QuickAccess`, `Hero` ou qualquer outra seção.
- Trocar a tipografia do site.

## Critérios de aceite

1. Em 1920×1080, benefícios e núcleos aparecem lado a lado, sem faixa vazia à direita e sem barra de
   rolagem horizontal.
2. Em 360px de largura não há rolagem horizontal e todos os cards permanecem legíveis.
3. Os cinco benefícios e os três núcleos apontam para as mesmas rotas de hoje.
4. Com movimento reduzido ativo (painel de acessibilidade do site), todos os cards ficam visíveis
   (`opacity: 1`, sem deslocamento residual) e não há salto de layout.

   Ressalva medida durante a implementação: o toggle do painel aplica a classe
   `a11y-reduced-motion`, que zera `animation-duration` e `transition-duration` no CSS
   (`app/globals.css:243`). Isso não alcança o framer-motion, que anima por JavaScript escrevendo
   `transform`/`opacity` inline — então a entrada escalonada de 0,35s continua rodando com o toggle
   ligado. Em produção o `MotionConfig` do layout usa `reducedMotion="user"`
   (`app/layout.tsx:82`) e respeita o `prefers-reduced-motion` do sistema operacional, que é o
   caminho que de fato desliga o movimento. A lacuna é do toggle do site, é anterior a este
   trabalho e vale para a home inteira — não é introduzida por esta seção.
5. As três imagens de núcleo carregam em WebP sem deslocamento de layout.

   O container **não** é 16:9, apesar de o arquivo ser: no desktop a foto ocupa uma faixa em pé de
   ~160×208 à esquerda do texto, e abaixo de `xl` uma faixa deitada de 160px de altura no topo do
   card. Em ambos os casos a dimensão está resolvida antes da imagem chegar, que é o que evita o
   deslocamento. Consequência prática, registrada em `public/images/nucleos/CREDITOS.md`: o
   `object-cover` corta as laterais no desktop, então o assunto da foto precisa estar centralizado.
6. `npm run build` e `npm run lint` passam.
