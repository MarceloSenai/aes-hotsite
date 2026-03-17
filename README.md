# 🎓 AES-HOTSITE — Educação Moderna & Personalizável

Uma nova presença web para a AES (Associação de Educação Senai) com **design moderno**, **tema customizável por admin** e **excelente UX/performance**.

## ✨ Destaques

- 🎨 **6 Temas Pré-Prontos** — Moderno, Clássico, Minimalista, Vibrante, Profissional, Educacional
- 🎯 **Admin Painel de Customização** — Interface amigável para escolher tema + ajustar cores cor a cor
- 🚀 **Performance** — Next.js 16, Tailwind 4, Framer Motion (animações suaves)
- 📱 **Responsive Mobile-First** — Funciona perfeito em mobile, tablet, desktop
- 🌙 **Dark Mode** — Suporte automático a dark mode em todos temas
- 🔍 **SEO Otimizado** — Metadata, sitemap, structured data

## 🛠️ Stack

- **Frontend:** Next.js 16, React 18, TypeScript 5, Tailwind CSS 4
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl (pt-BR, en, es)
- **Deploy:** Vercel

## 🚀 Começar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
# http://localhost:3000
```

**⭐ Teste o Painel de Temas:** http://localhost:3000/admin

### Build
```bash
npm run build
npm run start
```

## 🎨 Sistema de Temas

**Admin Panel em `/admin`:**
- ✅ Escolha entre 6 temas pré-prontos
- ✅ Editor visual de cores (cor por cor)
- ✅ Preview light mode + dark mode
- ✅ Salva automaticamente em localStorage

**Temas Disponíveis:**
1. **Moderno** — Verde + Azul (default)
2. **Clássico** — Azul profundo + Cinza
3. **Minimalista** — Preto + Branco
4. **Vibrante** — Rosa + Roxo + Cyan
5. **Profissional** — Cinza + Índigo
6. **Educacional** — Verde + Âmbar

## 📂 Estrutura

```
├── app/
│   ├── layout.tsx          # Root com Theme Provider
│   ├── page.tsx            # Home
│   └── (public)/
│       └── admin/page.tsx  # 🎨 ADMIN PANEL
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, Mission, Stats, etc
│   └── providers/          # ThemeProvider
└── lib/
    └── design/
        └── theme-system.ts # 🎨 SISTEMA CENTRAL DE TEMAS
```

## 📄 Páginas (Phase 1 — Concluído)

- ✅ `/` — Home (6 seções com animações)
- ✅ `/admin` — Painel de customização de temas

## 📋 Próximas (Phase 2-5)

- `/sobre` — Histórico, valores, equipe
- `/solucoes/[slug]` — Detalhes das soluções
- `/blog` — Artigos com paginação
- `/contato` — Formulário + info
- APIs: contact, newsletter, health

## 🚢 Deploy no Vercel

1. **Criar repo GitHub:**
   ```bash
   git remote add origin https://github.com/MarceloSenai/aes-hotsite.git
   git push -u origin main
   ```

2. **Vercel:**
   - vercel.com → New Project
   - Selecionar repo
   - Deploy automático!

3. **Custom Domain:**
   - Settings → Domains
   - Adicionar `aes-senai.edu.br`
   - Atualizar DNS do registrador
   - SSL/TLS automático ✅

## 📚 Documentação

- **Theme System:** `lib/design/theme-system.ts`
- **Memory do Projeto:** `.claude/memory/aes-hotsite.md`

---

**Desenvolvido com ❤️ para a AES**
