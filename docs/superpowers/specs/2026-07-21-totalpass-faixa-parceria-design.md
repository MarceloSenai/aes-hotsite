# Faixa de destaque da parceria TotalPass (home)

*Spec de design — 21 de julho de 2026*

## Contexto

A parceria da AES com a **TotalPass** hoje aparece em um único lugar do site: o décimo e último item
da lista de Parcerias (`lib/config/site-config.ts:279`), descrito em uma linha. É uma das parcerias
de maior apelo do catálogo e está enterrada no fim de uma lista de dez.

A cliente pediu para destacá-la na seção "Serviços ao associado" da home — a seção renderizada por
`AssociadoDestaques` (`app/page.tsx:19`), hoje um bento de cinco benefícios próprios da AES.

Dois registros independentes do próprio repo mostram que **a adesão à TotalPass é intermediada pela
AES**, não contratada direto com o parceiro:

- `lib/config/site-config.ts:165` — e-mail rotulado "Cadastro / Odonto / TotalPass"
- `lib/config/contact.ts:41` — "Cadastro / TotalPass"

Ambos apontam para `cadastro@aessenai.org.br`. Esse fato define o CTA principal da faixa.

## Decisões fechadas

1. **Faixa fora do grid, não um sexto card.** `data.ts:29-34` documenta a invariante do bento: são
   exatamente cinco itens (1 destaque `md:row-span-2` + 4 cards claros). Um sexto cairia sozinho numa
   terceira linha, com um vazio ao lado. A faixa vive abaixo do grid e a invariante permanece válida.
2. **A faixa não é "mais um serviço".** Os cinco cards são benefícios próprios da AES e apontam para
   páginas internas `/servicos/*`. A TotalPass é uma parceria de terceiro. A faixa tem forma própria
   (largura total, marca do parceiro, CTA distinto) justamente para não se passar por serviço AES.
3. **Fundo escuro é obrigatório, não estético.** O logotipo oficial é um lockup de duas cores:
   "Total" em verde `#26d07c` e "Pass" em **branco**. Sobre fundo claro, metade do nome desaparece.
   A faixa é `bg-gray-950 dark:bg-black` nos dois temas.
4. **CTA duplo.** "Quero aderir" resolve quem já decidiu (e-mail do cadastro AES); "Conhecer a rede"
   atende quem ainda avalia (site do parceiro). Mandar todo mundo para fora desperdiçaria o canal de
   adesão que a AES já opera.
5. **Sem `var(--color-primary)` nos elementos de ação.** O tema da AES é trocável pelo admin
   (`lib/design/theme-system.ts`) e o padrão é vermelho `#E30613`. Vermelho contra o verde da
   TotalPass vibra mal, e um tema futuro poderia aproximar-se do verde do parceiro a ponto de
   confundir as duas marcas. O CTA primário é branco sólido — neutro sob qualquer tema.

## Layout

A faixa entra dentro da `<section>` existente de `AssociadoDestaques`, logo após o `<div>` do grid e
dentro do mesmo `motion.div` — assim herda o `groupVariants`/`whileInView` já configurado, sem um
segundo observer.

Container: largura total da coluna (o `max-w-[1920px] px-4 sm:px-6 lg:px-8` do pai já se aplica),
`mt-4` para casar com o `gap-4` do grid acima, `rounded-3xl` igual ao card de destaque.

```
┌───────────────────┬────────┬────────┐
│   Assistência     │ Odonto │ Fundo  │   grid existente,
│   Médica          ├────────┼────────┤   intocado
│   (destaque)      │ Farmác │ Seguro │
└───────────────────┴────────┴────────┘
                                          ← mt-4
┌──────────────────────────────────────────────────────┐
│ [PARCERIA]                                  ╭────────│
│  ▮▮▮▮▮ TotalPass                            │  glow  │
│                                             │ #26d07c│
│  O Brasil inteiro é a sua academia.         ╰────────│
│  Mais de 35 mil academias, Smart Fit e Bio           │
│  Ritmo, psicólogo online e meditação.                │
│                                                      │
│  ✓ +35 mil academias   ✓ 1.900 cidades               │
│  ✓ +250 modalidades    ✓ Psicólogos online           │
│                                                      │
│  [ Quero aderir ]    Conhecer a rede ↗               │
└──────────────────────────────────────────────────────┘
```

**Desktop (`lg`)** — duas colunas: à esquerda badge + logo + headline + descrição + chips; à direita,
alinhados ao fim, os dois CTAs. Empilha em coluna única abaixo de `lg`.

**Glow** — gradiente radial em `#26d07c` saindo do canto **direito**. O `BeneficioDestaque` já usa
glow de `var(--color-primary)` saindo do canto **inferior esquerdo** (`BeneficioCards.tsx:20-27`).
Lados opostos: as duas peças escuras coexistem sem competir.

## Anatomia

| Elemento | Tratamento |
|---|---|
| Badge | `PARCERIA`, pílula, texto `#26d07c` sobre `rgba(38,208,124,.12)`, `text-[11px]` tracking largo |
| Logo | `public/images/parceiros/totalpass-white.svg` em `<img>` simples, `h-7` (28px), `width`/`height` explícitos para evitar CLS |
| Headline | `text-2xl sm:text-3xl font-bold text-white` |
| Descrição | `text-sm sm:text-base text-white/70`, `max-w-xl` |
| Chips | borda `white/15`, fundo `white/10`, texto `white/90`, check em `#26d07c` — mesmo padrão de `BeneficioCards.tsx:49-58` |
| CTA primário | fundo branco, texto `gray-950`, `rounded-full`, hover leve |
| CTA secundário | texto `white/70`, sublinhado no hover, ícone `ExternalLink` |

## Conteúdo

Todos os números foram verificados em `totalpass.com/br` em 21/07/2026. Nenhum é estimado.

- **Headline:** "O Brasil inteiro é a sua academia."
- **Descrição:** "Com a TotalPass, você treina em mais de 35 mil academias em 1.900 cidades — Smart
  Fit, Bio Ritmo e estúdios com mais de 250 modalidades. E ainda leva psicólogo online e meditação
  junto."
- **Chips:** `+35 mil academias` · `1.900 cidades` · `+250 modalidades` · `Psicólogos online`
- **CTA primário:** "Quero aderir" → `mailto:cadastro@aessenai.org.br` com `subject` pré-preenchido
- **CTA secundário:** "Conhecer a rede" → `https://totalpass.com/br/`

O texto não promete gratuidade, desconto nem percentual, porque essas condições não estão
documentadas em lugar nenhum do repo. Vende amplitude de rede, que é verificável.

## Dados

Nova export `totalpass` em `components/sections/destaques/data.ts`, com a procedência de cada número
em comentário — o arquivo já mantém esse padrão para os benefícios e núcleos (linhas 29-46, 90-94).

Tipo novo `ParceriaDestaque` (nome, href de adesão, href externo, headline, descrição, chips),
exportado de `data.ts` junto dos tipos `Beneficio` e `Nucleo` que já vivem lá. Nome deliberadamente
distinto de `Parceria` (`site-config.ts:116`), que modela a linha da lista de parcerias e não tem os
campos de apresentação da faixa — os dois tipos coexistem sem colisão de nome.

## Alinhamento com a página de Parcerias

`site-config.ts:279` descreve a TotalPass como "Acesso a academias (Smart Fit, Bio Ritmo) e serviços
de saúde mental". Correto, porém subdimensionado frente ao que a faixa passa a afirmar na home.
Atualizar a `descricao` para incluir a escala da rede, mantendo `id`, `nome` e `categoria` intactos,
para que home e `/parcerias` não se contradigam.

A entrada permanece na lista — a TotalPass não sai de Parcerias por ganhar destaque na home.

## Movimento

A faixa recebe `variants={itemVariants}` (`destaques/motion.ts`), entrando como o último item do
stagger da seção. Sem animação nova, sem novo observer. O comportamento de `prefers-reduced-motion`
segue o que a seção já faz hoje.

## Acessibilidade

- Logo com `alt="TotalPass"`. É informativa, não decorativa: identifica o parceiro.
- CTA externo com `target="_blank"` + `rel="noopener noreferrer"` e `aria-label` sinalizando nova aba.
- Ícone `ExternalLink` marcado `aria-hidden`.
- `focus-visible:ring-2` com offset sobre o fundo escuro nos dois CTAs, seguindo `BeneficioCards.tsx:17`.
- Contraste: branco sobre `gray-950` e `#26d07c` sobre `gray-950` passam AA. Os chips usam `white/90`,
  o mesmo valor já em produção em `BeneficioCards.tsx:53` sobre o mesmo fundo.

## Arquivos

| Arquivo | Ação |
|---|---|
| `components/sections/destaques/TotalPassFaixa.tsx` | criar |
| `components/sections/destaques/data.ts` | adicionar export `totalpass` |
| `components/sections/AssociadoDestaques.tsx` | renderizar a faixa após o grid |
| `public/images/parceiros/totalpass-white.svg` | já baixado |
| `lib/config/site-config.ts` | atualizar `descricao` da entrada `p10` |

## Fora de escopo

- Página interna `/servicos/totalpass` ou `/parcerias/totalpass`.
- Mexer no Totalpass como entrada de Parcerias além do texto da `descricao`.
- Qualquer alteração nos cinco cards do bento.
- Cadastrar preços, planos ou percentuais de desconto — não há fonte para isso no repo.
- Faixas equivalentes para outras parcerias.

## Riscos

**A logo veio do bundle de produção do site da TotalPass**
(`_next/static/media/totalpass-desktop-white.ce53e1c2.svg`), não de um kit de marca oficial. A arte
está correta, mas o uso do logotipo de terceiro deve ser validado com a TotalPass antes de publicar —
kits de marca costumam definir área de proteção, tamanho mínimo e fundos permitidos.

## Critérios de aceite

1. A faixa aparece abaixo do bento na home, em 1920×1080 e em mobile, sem quebrar o grid de 5 cards.
2. "Total" (verde) e "Pass" (branco) legíveis nos temas claro e escuro.
3. "Quero aderir" abre o cliente de e-mail em `cadastro@aessenai.org.br`.
4. "Conhecer a rede" abre `totalpass.com/br` em nova aba, com `rel="noopener noreferrer"`.
5. Navegação por teclado alcança os dois CTAs com anel de foco visível sobre o fundo escuro.
6. Nenhum número na faixa contradiz `site-config.ts`.
7. `npm run build` e `npx tsc --noEmit` sem erros novos.
