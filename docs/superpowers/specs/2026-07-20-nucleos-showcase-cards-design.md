# Seção de núcleos na home, no estilo "Três destinos"

*Spec de design — 20 de julho de 2026*

## Contexto

`AssociadoDestaques` era uma seção da home com duas colunas: serviços (bento, 8 de 12) e núcleos (4
de 12, cards horizontais empilhados com faixa de foto de 160px).

A referência é a seção `#nucleos` ("Três destinos. Uma só sensação de pertencimento.") de
`https://aes-senai.lovable.app/`. O markup e o CSS foram extraídos do HTML pré-renderizado do site,
não reconstruídos de olho.

O redesign **separa as duas famílias**: benefícios ficam sozinhos em `AssociadoDestaques`, ocupando a
largura toda, e os núcleos ganham seção própria (`NucleosDestaque`) logo abaixo — que é o formato da
referência.

## Divergência registrada

O documento de alinhamento com a cliente pede serviços e núcleos **lado a lado**, em duas linhas:

- `docs/redesign/2026-07-17-ajustes-interface.md:43` — "os **serviços disponíveis** e os **núcleos**,
  **lado a lado** (em duas colunas)"
- linha 77 — "3. **Serviços e núcleos:** **lado a lado**."

A separação em duas seções contraria isso. Foi decisão explícita do time durante a implementação,
não descuido. O documento de alinhamento não foi editado — ele registra o que foi acordado com a
cliente, e cabe a ela referendar a mudança.

## A restrição que define a largura

As fotos são 1170x658 (16:9); o card pede 4:5. O máximo que se extrai em 4:5 dessa fonte é
**526x658** — a altura (658) é o limite, e não há como ganhar pixels.

Isso vira um teto de largura de card. Com o `max-w-[1920px]` das outras seções, a 1920 os três cards
teriam 608px e a foto voltaria a subir de escala (1,16x já em 1x, pior em retina) — além de 760px de
foto por card, grande demais. Daí `max-w-[1400px]` só nesta seção: cards de 429px, foto de 536px,
coberta sem upscale.

A largura diferente lê como intenção e não como desalinhamento porque o fundo muda junto: a seção tem
fundo tingido próprio, como na referência.

| | Container | Card | Foto | Fonte necessária |
|---|---|---|---|---|
| `max-w-[1920px]` | 1856px | 608px | 608x760 | 608px ❌ (temos 526) |
| `max-w-[1400px]` | 1336px | 429px | 429x536 | 429px ✓ |

## Por que as fotos são pré-recortadas

Deixar o `object-cover` recortar 16:9 → 4:5 em CSS não funciona: o `sizes` do `next/image` descreve a
largura da *caixa*, o browser baixa essa largura, e o `object-cover` então precisa esticar a imagem
até cobrir a altura — **upscale de ~1,5x**, foto borrada com pixels sobrando na fonte. Recortando
fisicamente, a proporção do arquivo bate com a da caixa e o `sizes` passa a ser honesto.

Um 4:5 descarta ~55% da largura da cena, e um recorte central perderia o que dá graça a cada foto —
o salgueiro do Clube de Campo fica à esquerda, a diagonal do píer entra pelo canto. Por isso o offset
é escolhido por foto. Offsets e motivos em `public/images/nucleos/CREDITOS.md`.

## Decisões fechadas

1. **Nome na manchete, localização no badge.** A referência põe o nome no badge e usa uma
   frase-conceito ("Onde a natureza vira lazer.") como manchete sobre a foto. Nós temos localização
   real, que a referência não tem, e não temos copy de marketing. O badge carrega a localização e a
   manchete é o nome — mesma anatomia, sem inventar texto.
2. **`chips` continua com 3 itens.** A referência mostra 3 features por card e o campo já tinha 3.
   O que mudou é a apresentação: eram pílulas cinza, viram lista vertical com check em primary. Antes
   só 2 apareciam (`slice(0, 2)`) — agora os 3.
3. **Sem serif.** A referência usa Fraunces nos títulos; o site é Inter, como já decidido em
   `2026-07-20-bento-beneficios-lazer-design.md`.
4. **Parágrafo do cabeçalho reaproveitado**, não escrito do zero: sai do hero de `/nucleo-de-lazer`.
5. **`/nucleo-de-lazer` não é tocada.** Continua com os cards em gradiente e seu array local.

## Anatomia do card

```
┌──────────────────────┐
│ (● JUNDIAÍ/SP)       │  badge branco, dot em primary, uppercase tracking-widest
│                      │
│      foto 4:5        │  group-hover:scale-110 em 1200ms ease-out
│   gradiente preto ↑  │  from-black/80 via-black/25 to-transparent
│ Clube de Campo       │  h3, 2xl → 1.7rem, branco
├──────────────────────┤
│ Chalés, apartamen-   │
│ tos, piscinas...     │
│ ✓ 12 Chalés          │  Check size 14 strokeWidth 3, primary
│ ✓ Piscinas           │
│ ✓ Saunas             │
│ Conhecer →           │  mt-auto, primary
└──────────────────────┘
```

`rounded-3xl`, hover sobe 6px (`-translate-y-1.5`) com sombra alta tingida de primary, transição de
350ms em `transform, box-shadow`.

## CSS novo

```css
:root      { --color-surface-tint: color-mix(in srgb, var(--color-primary) 5%, white); }
:root.dark { --color-surface-tint: color-mix(in srgb, var(--color-primary) 8%, var(--color-dark-background)); }

.bg-surface-tint { background-color: var(--color-surface-tint) !important; }

.shadow-card-soft            { box-shadow: 0 10px 30px -12px color-mix(in srgb, #111827 22%, transparent); }
.hover\:shadow-card-elegant:hover { box-shadow: 0 30px 60px -25px color-mix(in srgb, var(--color-primary) 35%, transparent); }
```

As sombras são mais fundas que o `shadow-theme-glow`, dimensionado para botões. Tudo deriva de
`var(--color-primary)`, então o tema dinâmico do admin continua valendo.

## Responsivo

`grid-cols-1 md:grid-cols-3`. No mobile vira 1 por linha com a foto 4:5 cheia — mesmo comportamento
da referência.

## Motion

Reusa `groupVariants` / `itemVariants` de `destaques/motion.ts`, como o resto da home. Não foi
adicionado guard de reduced-motion para não dar a uma seção um tratamento que as vizinhas não têm. O
CSS global já zera as transições de hover sob `.a11y-reduced-motion`; o que continua descoberto é a
entrada animada por JS, igual ao resto da home. Vale tratar de uma vez, na home inteira.

## Verificação

- `npx tsc --noEmit` — exit 0
- `npx eslint app components` — 0 erros; os 33 warnings são pré-existentes em outros arquivos
- Home servida em `/`: HTTP 200, zero `xl:col-span` e zero `xl:grid-cols-12` (fim do lado a lado),
  `bg-surface-tint` + 2 blobs + `max-w-[1400px]`, 3x `aspect-[4/5]`, e a ordem "Serviços ao
  associado" → "Núcleos de lazer"
- `/nucleo-de-lazer`: `git diff` vazio

Não verificado: o resultado visual em pixels — o projeto não tem driver de browser instalado.
