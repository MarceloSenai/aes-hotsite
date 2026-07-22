# Redesign da interface AES — Plano de Implementação

> **Para quem for executar (humano ou agente):** implemente fase por fase, na ordem dos passos com checkbox (`- [ ]`). Este projeto **não tem infra de testes** e a maioria das mudanças é visual → a verificação é feita rodando o app (`npm run dev`) e conferindo na tela (desktop + mobile via DevTools), mais `npm run lint` e `npm run build`. **Não commitar automaticamente** (regra do projeto): cada tarefa termina em *checkpoint* (stage + revisão), e o Nathan commita.

**Goal:** Aplicar os ajustes de interface fechados com a cliente (documento `2026-07-17-ajustes-interface.md`): topo vermelho, menu com Contato + correção de bug, home focada no associado, rodapé enxuto, tema/acessibilidade no canto, e refinos em páginas internas.

**Arquitetura:** Next.js 16 (App Router). Mudanças concentradas em `components/layout/*` (Header, Footer, AccessibilityPanel), `components/sections/*` (home) e algumas `app/(public)/**/page.tsx`. Cores vêm de CSS vars (`--color-primary` = `#E30613`); dark mode é a classe `.dark` no `<html>` controlada por `useAccessibility().darkMode`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, framer-motion, lucide-react, next-themes (não usado p/ dark — o dark é via AccessibilityProvider).

## Global Constraints

- **Cor de marca:** vermelho AES `#E30613` = `var(--color-primary)`. Usar a variável (ou classes `theme-primary`), **nunca** hardcode novo — exceto onde o Header já usa a constante `BRAND_RED`.
- **Dark mode:** classe `.dark` no `<html>`, alternada por `useAccessibility().setDarkMode`. Todo componente novo precisa ter variante `dark:`.
- **Sem testes automatizados:** verificar via `npm run dev` (http://localhost:3000) + inspeção visual em desktop e mobile (DevTools ~375px). `npm run lint` sempre; `npm run build` ao fim de cada fase.
- **Não commitar:** cada checkpoint faz `git add` dos arquivos e para — o Nathan revisa e commita.
- **Acessibilidade:** animações novas devem respeitar `prefers-reduced-motion` **e** a classe `html.a11y-reduced-motion` (já existente no `globals.css`). Foco visível preservado.
- **Home dinâmica:** `app/page.tsx` tem `export const dynamic = 'force-dynamic'` (carrossel lê slides do banco). **Não remover.**
- **Nav desktop:** só aparece em `xl:` (≥1280px); abaixo disso é o menu mobile. Testar os dois.

---

## Fase 0 — Branch e baseline

### Tarefa 0.1: Criar a branch e confirmar o baseline

**Files:** nenhum (setup)

- [ ] **Passo 1: Criar a branch a partir de `main`**

```bash
git checkout main
git checkout -b redesign/interface-2026-07
```

- [ ] **Passo 2: Instalar deps e gerar Prisma client** (o dev quebra sem isso)

```bash
npm install
npx prisma generate
```

- [ ] **Passo 3: Subir o dev e confirmar baseline**

```bash
npm run dev
```

Abrir http://localhost:3000. Confirmar que a home carrega (Header 3 barras, carrossel, ícones QuickAccess, seção "AES em Números"). Se o carrossel mostrar "Nenhum slide disponível", é conectividade com o Azure SQL (ver `azure-sql-db-connectivity` na memória) — não bloqueia o trabalho visual, mas anote.

- [ ] **Passo 4: Checkpoint** — nada a commitar; branch criada.

---

## Fase 1 — Menu (baixo risco, isolado)

Adiciona **Contato** ao lado de **Associe-se** e corrige o bug do mega-menu. "Quem Somos" (dentro de Institucional) e "Lazer" (3 clubes) **já existem** em `Header.tsx` — apenas confirmar.

### Tarefa 1.1: Adicionar "Contato" no menu, ao lado de "Associe-se"

**Files:**
- Modify: `components/layout/Header.tsx` (array `NAV_ITEMS`, ~linha 69-81; render mobile ~linha 157-172)

**Interfaces:**
- Consome: `NavItem` (`{ href, label, children? }`), rota existente `/contato`.

- [ ] **Passo 1: Adicionar o item ao `NAV_ITEMS`** — inserir logo **antes** de `Associe-se` (fica "ao lado" na nav). Em `Header.tsx`, no array `NAV_ITEMS`, trocar o final:

```tsx
  { href: '/parcerias', label: 'Parcerias' },
  {
    href: '/informacoes',
    label: 'Informações',
    children: [ /* ...inalterado... */ ],
  },
  { href: '/contato', label: 'Contato' },
  { href: '/associe-se', label: 'Associe-se' },
];
```

- [ ] **Passo 2: Garantir estilo do link simples na nav desktop** — "Contato" não tem `children`, então cai no branch `else` (link simples branco). Nenhuma mudança extra necessária; conferir no passo 3.

- [ ] **Passo 3: Verificar** — `npm run dev`, em ≥1280px: "Contato" aparece entre "Informações" e o botão "Associe-se". Clica e vai pra `/contato`. Abaixo de 1280px: abrir o menu mobile e confirmar que "Contato" aparece na lista (o `MobileNavItem` já renderiza itens sem `children`).

- [ ] **Passo 4: `npm run lint`**

- [ ] **Passo 5: Checkpoint** — `git add components/layout/Header.tsx`; revisar e commitar.

### Tarefa 1.2: Corrigir o bug do hover do mega-menu

**Sintoma:** ao passar o mouse nos itens com submenu (Institucional, Lazer, Serviços, Informações), sair e voltar, o dropdown não reabre de primeira. Causa provável: cada `MegaDropdown` tem seu **próprio `timeoutRef`**; ao mover entre itens, o timeout de fechamento de um item ainda pendente dispara `setOpenDropdown(null)` e derruba o estado compartilhado do item recém-aberto (e deixa o estado "sujo"). Correção: **centralizar o timeout de fechamento no `Header`** (um só), de modo que abrir/entrar em qualquer item cancele o fechamento pendente.

**Files:**
- Modify: `components/layout/Header.tsx` (componente `MegaDropdown` ~86-153 e o `Header` ~207-311)

**Interfaces:**
- Produz: `MegaDropdown` passa a receber `onOpen`/`onClose` que já lidam com o timeout único do pai; sem `timeoutRef` interno.

- [ ] **Passo 1: Reproduzir** (siga `superpowers:systematic-debugging`). `npm run dev`, hover em "Serviços" (abre) → tira o mouse → espera fechar → volta o mouse: confirmar que **não** reabre de primeira. Anotar o comportamento exato.

- [ ] **Passo 2: Mover o controle de timeout pro `Header`.** No componente `Header`, adicionar um ref e helpers:

```tsx
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((href: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenDropdown(href);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  }, []);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);
```

(Precisa importar `useRef` — já importado.)

- [ ] **Passo 3: Simplificar o `MegaDropdown`** — remover o `timeoutRef` interno e usar direto os handlers do pai:

```tsx
function MegaDropdown({ item, isOpen, onOpen, onClose }: {
  item: NavItem; isOpen: boolean; onOpen: () => void; onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}
         onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
      {/* ...botão e AnimatePresence inalterados... */}
    </div>
  );
}
```

- [ ] **Passo 4: Ligar no render** — trocar as props passadas ao `MegaDropdown`:

```tsx
<MegaDropdown key={item.href} item={item}
  isOpen={openDropdown === item.href}
  onOpen={() => openMenu(item.href)}
  onClose={scheduleClose} />
```

- [ ] **Passo 5: Verificar** os 3 casos: (a) hover → sair → voltar **reabre** de primeira; (b) mover direto de "Serviços" pra "Institucional" troca o dropdown sem piscar/fechar errado; (c) mover do botão pra dentro do submenu (cruzando o `pt-3`) mantém aberto.

- [ ] **Passo 6: `npm run lint`**

- [ ] **Passo 7: Checkpoint** — `git add components/layout/Header.tsx`; revisar e commitar.

---

## Fase 2 — Topo/Header vermelho

Bar 2 (preta) vira vermelha, logo branca, ícone de e-mail branco, e a Bar 1 (faixa de tema no topo) é **removida** (o toggle de tema migra pro canto na Fase 3).

### Tarefa 2.1: Gerar a versão branca da logo (SVG)

**Files:**
- Create: `public/images/aes-logo-white.svg`

- [ ] **Passo 1: Copiar `public/images/aes-logo.svg` para `aes-logo-white.svg`.** No novo arquivo, no bloco `<style>`, trocar a cor da onda (`.cls-1`, hoje vermelha) para branca, deixando tudo branco:

De:
```css
.cls-1{fill:#e6191e;stroke:#e6191e;stroke-width:5px;}
```
Para:
```css
.cls-1{fill:#fff;stroke:#fff;stroke-width:5px;}
```

(`.cls-2` e `.cls-3` já são `#fff`.) Resultado: logo 100% branca, legível no fundo vermelho.

- [ ] **Passo 2: Verificar isoladamente** — abrir `http://localhost:3000/images/aes-logo-white.svg` (fundo branco do browser mostra "invisível" = está tudo branco, ok) ou colar num fundo escuro. Confirmar que aparece toda branca.

- [ ] **Passo 3: Checkpoint** — `git add public/images/aes-logo-white.svg`; revisar e commitar.

### Tarefa 2.2: Bar 2 vermelha + logo branca + e-mail branco + remover Bar 1

**Files:**
- Modify: `components/layout/Header.tsx` (Bar 1 ~228-253, Bar 2 ~255-284)

- [ ] **Passo 1: Remover a Bar 1 inteira** (a faixa `style={{ backgroundColor: BRAND_RED }}` com telefone + botões de acessibilidade/tema, ~linhas 228-253). O telefone continua disponível na Bar 2 (bloco de endereço) e no rodapé. Isso atende "tirar a faixa de tema do topo" e "reduzir informação no topo".

- [ ] **Passo 2: Bar 2 preta → vermelha.** Trocar `className="bg-black"` (linha ~256) por fundo vermelho de marca:

```tsx
<div style={{ backgroundColor: BRAND_RED }}>
```

(`BRAND_RED` já está definido no topo do arquivo = `#E30613`.)

- [ ] **Passo 3: Logo branca.** No `<Image>` da Bar 2 (~linha 260), trocar `src`:

```tsx
<Image src="/images/aes-logo-white.svg" alt="AES" width={150} height={58}
  className="object-contain h-11 w-auto sm:h-12" priority />
```

(Ajustar `h-11/h-12` na hora conforme a proporção; a SVG tem subtítulo, então pode precisar um tico maior que a logo antiga.)

- [ ] **Passo 4: Ícone de e-mail branco.** No link de E-mail da Bar 2 (~linha 273-275), trocar a cor do ícone de `#EF4444` para branco:

```tsx
<Mail size={16} className="text-white" />
```

- [ ] **Passo 5: Conferir os outros ícones sociais no vermelho.** WhatsApp (verde), Instagram (rosa) e Facebook (azul) agora ficam sobre vermelho. Avaliar contraste na tela; **se destoarem, deixar todos brancos** (`className="text-white"`) por consistência — decidir com screenshot. O texto já é branco.

- [ ] **Passo 6: Ajustar o texto de endereço/contraste.** O bloco de endereço (`text-white/75`, borda `border-white/15`) já é branco sobre escuro — confirmar que continua legível no vermelho; se precisar, subir para `text-white/85`.

- [ ] **Passo 7: Verificar** desktop e mobile: topo agora tem 2 barras (vermelha da logo + vermelha da nav), sem a faixa de cima. Logo branca nítida. E-mail visível. Sem sobra de referência a `BRAND_RED` quebrada.

- [ ] **Passo 8: Remover imports órfãos** (ex.: `Phone`, `Handshake`, `Sun`, `Moon` se não forem mais usados após remover a Bar 1). Rodar `npm run lint` — ele acusa imports não usados.

- [ ] **Passo 9: `npm run build`** (fim de fase).

- [ ] **Passo 10: Checkpoint** — `git add components/layout/Header.tsx`; revisar e commitar.

---

## Fase 3 — Tema + acessibilidade no canto inferior direito

O `AccessibilityPanel` **já é** um botão flutuante no canto inferior direito (`fixed right-4 bottom-4`) e o dark mode já está dentro dele. Falta: um **atalho rápido de tema** (a "luazinha") flutuante ao lado, e a **animação de transição** de tema (que hoje não existe — o toggle é instantâneo).

### Tarefa 3.1: Botão flutuante de tema (claro/escuro) no canto

**Files:**
- Create: `components/layout/ThemeToggleFab.tsx`
- Modify: `app/layout.tsx` (montar o novo componente ~linha 79, perto do `<AccessibilityPanel />`)

**Interfaces:**
- Consome: `useAccessibility()` → `{ darkMode, setDarkMode }`.

- [ ] **Passo 1: Criar `ThemeToggleFab.tsx`** — botão flutuante posicionado **acima** do botão de acessibilidade (que ocupa `bottom-4` com `h-14`), sem sobrepor o VLibras (que fica à esquerda, `bottom:80px;left:16px`):

```tsx
'use client';

import { Sun, Moon } from 'lucide-react';
import { useAccessibility } from '@/components/providers/AccessibilityProvider';

export default function ThemeToggleFab() {
  const { darkMode, setDarkMode } = useAccessibility();
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={darkMode}
      className="fixed right-4 bottom-[76px] z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:scale-110 dark:bg-gray-800 dark:text-gray-100 dark:ring-white/10 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {darkMode ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
```

- [ ] **Passo 2: Montar no layout** — em `app/layout.tsx`, importar e renderizar junto dos outros overlays, dentro do `ThemeProvider`, ao lado de `<AccessibilityPanel />`:

```tsx
import ThemeToggleFab from '@/components/layout/ThemeToggleFab';
/* ... */
<PopupModal />
<ThemeToggleFab />
<AccessibilityPanel />
```

- [ ] **Passo 3: Verificar** — canto inferior direito mostra a luazinha (acima) e o botão de acessibilidade (abaixo). Clicar alterna claro/escuro. Não sobrepõe o botão VLibras (canto esquerdo) quando ativo. Testar mobile: os dois botões não cobrem conteúdo crítico.

- [ ] **Passo 4: `npm run lint`**

- [ ] **Passo 5: Checkpoint** — `git add components/layout/ThemeToggleFab.tsx app/layout.tsx`; revisar e commitar.

### Tarefa 3.2: Animação de transição de tema (com cuidado no mobile)

Hoje a troca de tema é instantânea. Adicionar um **crossfade suave** de cores globais, respeitando reduced-motion. (O "reveal" circular via View Transitions é mais bonito, mas mais arriscado no mobile — o Marcelo alertou; ficamos no crossfade, que é seguro.)

**Files:**
- Modify: `app/globals.css`

- [ ] **Passo 1: Adicionar transição de cores global**, desligada quando o usuário pede menos movimento:

```css
/* Transição suave ao alternar tema (desligada em reduced-motion) */
@media (prefers-reduced-motion: no-preference) {
  html:not(.a11y-reduced-motion) body,
  html:not(.a11y-reduced-motion) body * {
    transition: background-color .35s ease, border-color .35s ease, color .35s ease;
  }
}
```

- [ ] **Passo 2: Verificar** — alternar tema pela luazinha: cores fazem crossfade suave. Ativar "Reduzir animações" no painel de acessibilidade → a troca vira instantânea (sem transição). Testar no mobile (DevTools + device real se possível): confirmar que não engasga.

> ⚠️ Se no mobile a transição em `*` pesar (muitos elementos), restringir o seletor a superfícies-chave (`body, header, footer, section, .item, a, button`) em vez de `body *`. Anotar a decisão.

- [ ] **Passo 3: `npm run build`** (fim de fase).

- [ ] **Passo 4: Checkpoint** — `git add app/globals.css`; revisar e commitar.

---

## Fase 4 — Home focada no associado

Reduzir o banner, garantir que os destaques (QuickAccess) apareçam na 1ª dobra, colocar **serviços + núcleos lado a lado** e **remover a seção "AES em Números"** (`Stats`).

### Tarefa 4.1: Reduzir o banner (carrossel) e adicionar a nova tagline

**Files:**
- Modify: `components/sections/Carousel.tsx` (min-heights ~48, 68, 85), `components/sections/Hero.tsx` (~22-43)

- [ ] **Passo 1: Reduzir a altura do carrossel.** Em `Carousel.tsx`, baixar os `min-h`: de `min-h-[280px] sm:min-h-[320px]` para `min-h-[220px] sm:min-h-[260px]` nos 3 pontos (estado vazio ~48, container ~68, modo image_only ~85 — neste, `md:min-h-[360px]`→`md:min-h-[300px]`). Ajuste fino na tela.

- [ ] **Passo 2: Trocar o texto/tagline do banner.** Em `Hero.tsx`, o bloco atual abaixo do carrossel diz "Destaques e Novidades". Trocar pela frase aprovada, como tagline do topo da home:

```tsx
<div className="text-center mt-3">
  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
    Sua associação, <span className="text-theme-gradient">conectando você aos seus serviços</span>
  </h2>
</div>
```

(Removido o parágrafo "Acompanhe as últimas ofertas…" para enxugar. Se a cliente quiser manter um subtítulo, reintroduzir depois.)

- [ ] **Passo 3: Verificar** — banner visivelmente mais baixo; a tagline nova aparece; carrossel continua funcional (setas, dots, autoplay). Conferir os dois modos de slide (com imagem e image_only) se houver dados.

- [ ] **Passo 4: Checkpoint** — `git add components/sections/Carousel.tsx components/sections/Hero.tsx`; revisar e commitar.

### Tarefa 4.2: Destaques (QuickAccess) na 1ª dobra

**Files:**
- Modify: `components/sections/QuickAccess.tsx` (~65), `components/sections/Hero.tsx` (~24)

- [ ] **Passo 1: Enxugar espaços verticais.** Em `Hero.tsx` a `section` tem `pt-4 pb-4 sm:pt-6 sm:pb-5` — reduzir o `pb`. Em `QuickAccess.tsx` a `section` tem `pt-3 pb-10 sm:pt-4 sm:pb-14` — reduzir o `pt` para `pt-1 sm:pt-2` para colar os ícones logo abaixo do banner.

- [ ] **Passo 2: Verificar na 1ª dobra** — `npm run dev`, numa viewport de laptop comum (ex.: 1366×768) e no mobile: os ícones do QuickAccess devem aparecer **sem rolar** (essa é a maior reclamação da cliente). Medir com a régua do DevTools; iterar os paddings até caber.

- [ ] **Passo 3: Checkpoint** — `git add components/sections/QuickAccess.tsx components/sections/Hero.tsx`; revisar e commitar.

### Tarefa 4.3: Seção "Serviços + Núcleos lado a lado" (substitui o Stats)

Criar uma seção nova que mostra **serviços** (coluna esquerda) e **núcleos** (coluna direita) lado a lado no desktop, empilhando no mobile. Reaproveita os dados de `Features`/`Solutions` numa forma compacta.

**Files:**
- Create: `components/sections/AssociadoDestaques.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produz: `export default function AssociadoDestaques()` — seção pronta pra home.
- Consome: rotas `/servicos/*` e `/nucleo-de-lazer/*` (existentes).

- [ ] **Passo 1: Criar `AssociadoDestaques.tsx`** — duas colunas (`lg:grid-cols-2`), cada uma com título + lista compacta de cards-link. Usar as cores de tema:

```tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Stethoscope, Smile, Shield, Pill, ShieldCheck, TreePalm, Waves, Umbrella, ArrowRight } from 'lucide-react';

const servicos = [
  { icon: Stethoscope, title: 'Assistência Médica', href: '/servicos/assistencia-medica' },
  { icon: Smile, title: 'Assistência Odontológica', href: '/servicos/assistencia-odontologica' },
  { icon: Shield, title: 'Fundo Mútuo', href: '/servicos/fundo-mutuo' },
  { icon: Pill, title: 'Farmácias', href: '/servicos/farmacias' },
  { icon: ShieldCheck, title: 'Seguros', href: '/servicos/seguros' },
];

const nucleos = [
  { icon: TreePalm, title: 'Clube de Campo', local: 'Jundiaí/SP', href: '/nucleo-de-lazer/clube-de-campo' },
  { icon: Waves, title: 'Clube Náutico', local: 'Boracéia/SP', href: '/nucleo-de-lazer/clube-nautico' },
  { icon: Umbrella, title: 'Colônia de Férias', local: 'Itanhaém/SP', href: '/nucleo-de-lazer/colonia-de-ferias' },
];

function Coluna({ eyebrow, titulo, itens, verHref, verLabel }: {
  eyebrow: string; titulo: string;
  itens: { icon: React.ElementType; title: string; local?: string; href: string }[];
  verHref: string; verLabel: string;
}) {
  return (
    <div>
      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3"
        style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>{eyebrow}</span>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{titulo}</h2>
      <div className="space-y-2.5">
        {itens.map((it) => {
          const Icon = it.icon;
          return (
            <Link key={it.href} href={it.href}
              className="group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 hover:border-theme-primary hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-primary-light)' }}>
                <Icon size={18} style={{ color: 'var(--color-primary)' }} />
              </div>
              <span className="flex-1 font-medium text-gray-900 dark:text-white text-sm">
                {it.title}{it.local && <span className="block text-xs font-normal text-gray-400">{it.local}</span>}
              </span>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-theme-primary group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>
      <Link href={verHref} className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
        {verLabel} <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export default function AssociadoDestaques() {
  return (
    <section className="py-14 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <Coluna eyebrow="Benefícios" titulo="Serviços ao associado" itens={servicos}
            verHref="/servicos" verLabel="Ver todos os serviços" />
          <Coluna eyebrow="Lazer" titulo="Núcleos de lazer" itens={nucleos}
            verHref="/nucleo-de-lazer" verLabel="Ver os núcleos" />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Passo 2: Trocar na home.** Em `app/page.tsx`, remover o `Stats` e usar a seção nova. Resultado:

```tsx
import Hero from '@/components/sections/Hero';
import QuickAccess from '@/components/sections/QuickAccess';
import AssociadoDestaques from '@/components/sections/AssociadoDestaques';

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
```

(As linhas comentadas de `Mission`/`Features`/`Solutions` e o import de `Stats` saem. `Stats.tsx` fica no repo, só não é mais usado — não deletar agora, caso a Claudia peça de volta os números.)

- [ ] **Passo 3: Verificar** — home agora: banner reduzido → destaques (ícones) → **serviços | núcleos lado a lado** (desktop) / empilhados (mobile). Sem a seção "AES em Números". Links funcionam. Dark mode ok.

- [ ] **Passo 4: `npm run lint` e `npm run build`** (fim de fase).

- [ ] **Passo 5: Checkpoint** — `git add app/page.tsx components/sections/AssociadoDestaques.tsx`; revisar e commitar.

---

## Fase 5 — Rodapé enxuto + e-mails na página de Contato

### Tarefa 5.1: Migrar a lista de e-mails pra página `/contato`

A página `/contato` **já existe** (form + sidebar), mas **não** lista os e-mails por unidade. Adicionar um bloco com `CONTACT.emailGroups` antes de removê-los do rodapé (assim não se perde a informação).

**Files:**
- Modify: `app/(public)/contato/page.tsx` (adicionar seção de e-mails), usa `CONTACT.emailGroups` (`lib/config/contact.ts`)

- [ ] **Passo 1: Adicionar um bloco de e-mails** dentro da `<section>`, após o grid do form (antes de fechar o container). Reusar o markup do rodapé atual:

```tsx
{/* E-mails por unidade */}
<div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">E-mails por unidade</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {CONTACT.emailGroups.map((group) => (
      <div key={group.title}>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2.5 flex items-center gap-2">
          <Mail size={14} className="text-theme-primary shrink-0" /> {group.title}
        </h3>
        <ul className="space-y-2 text-xs">
          {group.emails.map((item) => (
            <li key={item.role + item.address} className="text-gray-500 dark:text-gray-400 leading-relaxed">
              <span className="block">{item.role}</span>
              <a href={`mailto:${item.address}`} className="hover:text-theme-primary transition-colors break-all text-gray-700 dark:text-gray-300">{item.address}</a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</div>
```

(`Mail` já está importado em `contato/page.tsx`.)

- [ ] **Passo 2: Verificar** — `/contato` mostra o form, a sidebar e o novo bloco de e-mails por unidade, responsivo, claro/escuro ok.

- [ ] **Passo 3: Checkpoint** — `git add "app/(public)/contato/page.tsx"`; revisar e commitar.

### Tarefa 5.2: Enxugar o rodapé e remover a lista de e-mails

**Files:**
- Modify: `components/layout/Footer.tsx` (bloco de e-mails ~168-189; padding ~40)

- [ ] **Passo 1: Remover o bloco "E-mails"** inteiro (`<div className="border-t border-gray-800 pt-10 mb-12">…</div>`, ~linhas 168-189). Substituir por um link curto pra página de contato, na coluna Contato ou na bottom bar:

```tsx
<Link href="/contato" className="inline-flex items-center gap-1.5 text-sm font-medium text-theme-primary-light hover:text-white transition-colors">
  Ver todos os e-mails e fale conosco <ChevronRight size={15} />
</Link>
```

(Importar `Link` do `next/link` e `ChevronRight` do lucide — conferir imports.)

- [ ] **Passo 2: Reduzir a altura do rodapé.** Trocar `py-16` (linha ~40) por `py-10`, e reduzir os `mb-12`/`gap-10` internos para `mb-8`/`gap-8`. Objetivo: rodapé bem mais baixo.

- [ ] **Passo 3: (Opcional, decidir na tela) enxugar colunas.** Se ainda estiver alto, considerar reduzir a coluna de "Contato Núcleos" para um link "Ver contatos dos núcleos" → `/contato`. Anotar se fez.

- [ ] **Passo 4: Verificar** — rodapé visivelmente menor, sem a grade de e-mails, com link pra `/contato`. Bottom bar (copyright + CodeCycle) intacta. Claro/escuro ok.

- [ ] **Passo 5: `npm run lint` e `npm run build`** (fim de fase).

- [ ] **Passo 6: Checkpoint** — `git add components/layout/Footer.tsx`; revisar e commitar.

---

## Fase 6 — Página "Quem Somos" mais compacta

Os blocos empilhados (`space-y-16`) ocupam muito espaço vertical. Deixar mais compacto usando colunas.

**Files:**
- Modify: `app/(public)/sobre/quem-somos/page.tsx` (~114-317)

- [ ] **Passo 1: Reduzir o espaçamento vertical** — trocar `space-y-16` (~linha 121) por `space-y-10`, e a `section` `py-16 sm:py-24` (~114) por `py-12 sm:py-16`.

- [ ] **Passo 2: Agrupar "Missão" + "Estrutura" em 2 colunas.** Hoje "Nossa Missão" (blockquote) e "Estrutura Organizacional" são dois blocos full-width empilhados. Envolvê-los num `grid lg:grid-cols-2 gap-8 items-start` para ficarem lado a lado no desktop (empilham no mobile). Os "Milestones" (2 cards) já são `sm:grid-cols-2` — manter.

- [ ] **Passo 3: Verificar** — página mais curta, blocos em colunas no desktop, empilhados no mobile, sem quebrar as animações `whileInView`. Claro/escuro ok.

- [ ] **Passo 4: `npm run lint` e `npm run build`** (fim de fase).

- [ ] **Passo 5: Checkpoint** — `git add "app/(public)/sobre/quem-somos/page.tsx"`; revisar e commitar.

---

## Fase 7 — Páginas internas: menos "branco vazio", faixas vermelhas

Adicionar faixas/degradês vermelhos pontuais nas páginas que estão "muito brancas" (ex.: Assistência Médica), sem listrar tudo. Já existe o padrão `gradient-theme-page-light` e `gradient-theme-hero` no CSS — reaproveitar.

**Files:**
- Modify: páginas em `app/(public)/servicos/*/page.tsx` (começar por `assistencia-medica`), possivelmente outras internas identificadas na varredura.

- [ ] **Passo 1: Levantar as páginas "muito brancas".** `npm run dev` e navegar pelas internas; anotar as que têm fundo branco chapado sem acento (candidatas: `servicos/assistencia-medica`, `servicos/farmacias`, `servicos/seguros`, etc.). **Não** listrar; o objetivo é acento pontual.

- [ ] **Passo 2: Aplicar o padrão de acento** por página. Duas alavancas reutilizáveis:
  - Trocar o fundo da section principal de `bg-white` para `gradient-theme-page-light` (degradê branco→vermelho bem sutil, já pronto no `globals.css`).
  - Adicionar uma **faixa/hero vermelho** no topo da página (mesmo padrão do `quem-somos`: `style={{ background: "linear-gradient(to bottom right, var(--color-primary-dark), var(--color-primary), var(--color-primary-dark))" }}`) quando a página não tiver.

- [ ] **Passo 3: Começar por `assistencia-medica`** — abrir `app/(public)/servicos/assistencia-medica/page.tsx`, aplicar as alavancas do passo 2, verificar na tela (claro/escuro), iterar até "não parecer vazio" sem exagero.

- [ ] **Passo 4: Repetir** nas outras páginas anotadas, uma por vez, verificando cada uma.

- [ ] **Passo 5: `npm run lint` e `npm run build`** (fim de fase).

- [ ] **Passo 6: Checkpoint** — `git add` das páginas alteradas; revisar e commitar.

---

## Verificação final (antes de abrir PR)

- [ ] `npm run build` limpo (sem erros de tipo/lint).
- [ ] Smoke test manual: home (banner, destaques na 1ª dobra, serviços|núcleos, sem Stats), menu (Contato ao lado de Associe-se, hover reabrindo, Lazer e Quem Somos presentes), header vermelho + logo branca + e-mail branco, luazinha + acessibilidade no canto inferior direito, transição de tema (e desligada em reduced-motion), rodapé enxuto + `/contato` com e-mails, Quem Somos compacto, páginas internas com acento vermelho.
- [ ] Testar em mobile (DevTools ~375px) e desktop ≥1280px.
- [ ] `superpowers:finishing-a-development-branch` para decidir merge/PR (o Nathan commita e sobe).

---

## Cobertura do spec (self-review)

| Item do documento da Claudia | Fase |
|---|---|
| 1. Topo vermelho + logo branca + menos info | Fase 2 |
| 2. Menu: Contato ao lado de Associe-se; Quem Somos/Lazer (já existem); bug do hover | Fase 1 |
| 3. Banner menor + nova tagline | Fase 4.1 |
| 4. Destaques na 1ª dobra | Fase 4.2 |
| 5. Serviços + núcleos lado a lado; remover "AES em Números" | Fase 4.3 |
| 6. Rodapé enxuto + e-mails na página de Contato | Fase 5 |
| 7. Tema + acessibilidade no canto + animação (teste mobile) | Fase 3 |
| 8. Ícone de e-mail branco | Fase 2.2 |
| 9. Quem Somos em colunas | Fase 6 |
| 10. Páginas internas com faixas vermelhas | Fase 7 |

**Pendências externas (não bloqueiam o código):** logo branca oficial da Claudia (geramos do SVG — Fase 2.1 resolve); validação final da cliente no banner reduzido e na home sem os números (decisões já tomadas pelo Nathan).
