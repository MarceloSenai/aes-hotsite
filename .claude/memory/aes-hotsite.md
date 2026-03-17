# AES-HOTSITE — Documentação do Projeto

## Visão Geral
**AES-HOTSITE** é a nova presença web modterna e funcional da Associação de Educação Senai (AES). Baseado no **Interface Design System** (foco em consistência visual + admin panels), com **tema customizável por admin**.

## Stack Tecnológico
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** + **Framer Motion** (animações)
- **Supabase** (banco de dados, opcional)
- **next-intl** (i18n - pt-BR, en, es)
- **Zod + React Hook Form** (validações)

## Arquitetura

### Sistema de Temas
**Arquivo chave:** `lib/design/theme-system.ts`

**6 Personalidades de Design Pré-Definidas:**
1. **Moderno** - Verde + Azul vibrante, energético
2. **Clássico** - Azul profundo + Cinza slate, formal
3. **Minimalista** - Preto/branco, limpo e focado
4. **Vibrante** - Rosa + Roxo + Cyan, colorido
5. **Profissional** - Cinza + Índigo, corporativo
6. **Educacional** - Verde + Âmbar, caloroso (DEFAULT)

**Componentes:**
- `ThemeManager` — Persistência em localStorage (v2: Supabase)
- `ThemeProvider` — Injeção de CSS variables na raiz
- `/admin` page — Painel amigável para customização de temas

### Páginas Implementadas (Phase 1)
- `/` — Home (6 seções)
  - Hero (com animações Framer Motion)
  - Mission (Missão, Visão, Valores)
  - Stats (números animados)
  - Features (6 diferenciais)
  - Solutions (PEP, Arquitetura, Integração)
  - CTA (call-to-action final)
- `/admin` — **Painel de Temas** ✨ (escolha pré-pronto + customização cor por cor, preview light/dark)

### Páginas Pendentes (Phase 2-5)
- `/sobre` — Histórico, valores, equipe, impacto
- `/solucoes/[slug]` — PEP, Arquitetura, Integração detalhes
- `/blog` — Artigos com paginação
- `/contato` — Formulário + contato info
- APIs: `/api/contact`, `/api/newsletter`, `/api/health`

## Estrutura de Pastas
```
aes-hotsite/
├── app/
│   ├── layout.tsx (root com ThemeProvider)
│   ├── page.tsx (home)
│   ├── globals.css
│   └── (public)/
│       ├── admin/page.tsx (✨ ADMIN CUSTOMIZER)
│       ├── sobre/
│       ├── solucoes/
│       ├── blog/
│       └── contato/
├── components/
│   ├── layout/ (Header, Footer)
│   ├── providers/ (ThemeProvider)
│   ├── sections/ (Hero, Mission, Stats, Features, Solutions, CTA)
│   └── ui/ (Button, Card, Input, etc - criar conforme necessário)
├── lib/
│   └── design/
│       └── theme-system.ts (🎨 SISTEMA DE TEMAS)
├── messages/ (i18n)
├── public/ (images, icons)
└── .claude/memory/ (este arquivo)
```

## Deploy

### Local Development
```bash
npm run dev
# Acessa: http://localhost:3000
# Admin temas: http://localhost:3000/admin
```

### Build
```bash
npm run build
npm run start
```

### Vercel Deployment (TODO - User to execute)
1. Criar repo GitHub: `MarceloSenai/aes-hotsite`
2. Push local → GitHub
3. Conectar repo ao Vercel via vercel.com
4. Deploy automático em push para `main`
5. Configurar custom domain: `aes-senai.edu.br` (DNS + Vercel)

## Admin Panel - Painel de Temas
**Localização:** `/admin`

**Funcionalidades:**
✅ Seleção de 6 temas pré-prontos (cards com preview de cores)
✅ Editor de cores granular (primária, secundária, accent, semântica)
✅ Preview light + dark mode em tempo real
✅ Botão "Salvar Tema Customizado"
✅ Persistência em localStorage (v2: Supabase)

**Fluxo UX:**
1. Cliente entra em `/admin`
2. Clica em um dos 6 temas pré-pronto (ex: "Educacional")
3. Opcionalmente clica "Editar Cores"
4. Ajusta cores com color pickers intuitivos
5. Vê preview light/dark em tempo real
6. Clica "Salvar Tema Customizado"
7. Tema aplica em todo o site via CSS variables

## Convenções de Código
- **Components:** `'use client'` apenas onde necessário (hooks, state)
- **Sections:** Animações com Framer Motion + `whileInView` para lazy animation
- **Styling:** Tailwind utilities + dark mode via `dark:` prefix
- **CSS Variables:** Injetadas pela `ThemeManager` no elemento `<html>`

## Cores do Tema Padrão (Educacional)
```
Primary:    #059669 (verde)
Secondary:  #F59E0B (âmbar)
Accent:     #0891B2 (cyan)
Success:    #10B981
Warning:    #F59E0B
Error:      #EF4444
Info:       #0284C7
```

## Próximas Prioridades
1. **Phase 2:** Criar componentes `Button`, `Card`, `Input` reutilizáveis
2. **Phase 3:** Implementar páginas `/sobre`, `/solucoes/[slug]`
3. **Phase 4:** Blog com markdown + paginação
4. **Phase 5:** Formulário contato + newsletter API
5. **Phase 6:** SEO (metadata, sitemap.xml, robots.txt)
6. **Phase 7:** Deploy Vercel com custom domain

## Credentials & Config
- **.env.local** (gitignored):
  - `NEXT_PUBLIC_SITE_URL` = https://aes-senai.edu.br
  - `RESEND_API_KEY` (quando implementar emails)
  - `NEXT_PUBLIC_GA_ID` (Google Analytics, optional)

## Git Info
- **Repo local:** `/Users/marcelo/Library/CloudStorage/OneDrive-SmartBusinessTecnologiaLtda/Projetos/aes-hotsite`
- **Branch:** main (production-ready)
- **Commits chave:**
  - `437ba7c` — Initial setup com theme system e home sections
  - `eb5b978` — Next.js scaffolding

## Contatos & Links
- **Client:** AES (Associação de Educação Senai)
- **Site atual:** https://aessenai.org.br (legacy)
- **Design Reference:** Dammyjay93/interface-design (GitHub)
- **Deploy Target:** Vercel + custom domain aes-senai.edu.br
