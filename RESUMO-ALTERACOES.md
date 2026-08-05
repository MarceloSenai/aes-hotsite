# Resumo de Alterações — Site AES

**Período:** 16 a 23 de julho de 2026 (foco principal em 22 e 23/07)
**Autor:** Nathan Aguiar
**Total:** 13 commits

## Contexto

A maior parte das mudanças abaixo faz parte de um redesenho de interface alinhado previamente com a associação: um documento de alinhamento (datado de 17/07) registrou, ponto a ponto, o que seria ajustado — cabeçalho, menu, banner, home, rodapé, tema/acessibilidade, página "Quem Somos" e páginas internas — antes de qualquer implementação. As diretrizes gerais foram: menos rolagem e mais informação visível de imediato, prioridade para quem já é associado (em vez do institucional), nenhum espaço vazio sobrando, e preservar as animações que já davam vida ao site.

---

## 1. Página Inicial (Home) — redesenho completo

- **Banner principal (Hero):** o layout antigo (uma barra lateral de navegação rápida ao lado do carrossel) foi substituído por um banner vermelho de largura total, com um fundo animado — uma "constelação" de partículas que se movem devagar e reagem à posição do mouse/dedo, dando um efeito visual moderno sem depender de imagens ou vídeos pesados.
- **Texto de introdução novo:** título "Sua Associação, Seus Benefícios", subtítulo de apoio e dois botões de ação lado a lado ("Área do Associado" e "Conhecer benefícios").
- **Números corrigidos no banner:** os números que apareciam em destaque eram fictícios (ex.: "15.000+ associados", "50+ benefícios", sem nenhuma fonte real). Foram substituídos por dados reais e verificáveis da associação: **78+ anos de história**, **3 núcleos de lazer** e **60+ anos de utilidade pública**.
- **Espaçamento reduzido ao redor do carrossel:** o layout anterior deixava cerca de 160px de vazio vertical e 64px horizontal em telas grandes; o novo espaçamento é bem mais enxuto.
- **Nova seção de benefícios do associado** em formato de cartões de tamanhos variados ("bento grid"): o principal benefício aparece em destaque maior, com os demais (Assistência Médica, Odontológica, Fundo Mútuo, Farmácias, Seguros) em cartões menores ao lado.
- **Nova seção "Núcleos de Lazer" trazida para a home** (antes só existia em página própria), com cartões para Clube de Campo, Clube Náutico e Colônia de Férias — cada um com foto, localização e descrição curta.
- **Novo cartão de destaque da parceria TotalPass** (rede de academias/bem-estar), seguindo a identidade visual da AES (sem cores externas da marca parceira) e com selo "Parceria".
- **Nova headline de benefícios**, com o texto final aprovado: *"Vantagens que transformam o dia a dia da sua família"*, com subtítulo de apoio.
- **Diversas rodadas de ajuste fino de espaçamento** entre as seções da home, feitas de forma incremental, com o objetivo de reduzir a rolagem da página e mostrar mais conteúdo já na primeira tela.

## 2. Menu e Cabeçalho

- **Cabeçalho simplificado:** as duas faixas antigas (uma faixa fina com telefone e atalhos de acessibilidade, mais uma faixa preta com a logo) foram unificadas em uma única faixa vermelha, mais compacta — a altura da faixa passou a ser definida pela logo, e não mais por um bloco de endereço quebrado em 3 linhas.
- **Nova logo em SVG branco**, criada especificamente para ficar legível sobre o novo fundo vermelho (a versão anterior era um PNG pequeno, pensado para fundo preto).
- **Ícones de redes sociais padronizados em branco** (WhatsApp, E-mail, Instagram, Facebook), no lugar das cores originais de cada marca — visual mais uniforme e alinhado à identidade da AES.
- **Item "Contato" adicionado ao menu principal**, ao lado de "Associe-se".
- **Dois bugs distintos do menu suspenso corrigidos:**
  1. O menu abria/fechava de forma inconsistente ao passar o mouse rapidamente entre itens (o fechamento de um item podia derrubar o item vizinho recém-aberto).
  2. O painel de um item próximo à borda esquerda (ex.: "Institucional") podia abrir parcialmente fora da tela; agora a posição real do painel é medida ao abrir, e ele só se desloca quando realmente necessário.
- **Botão "Área do Associado" com destaque visual reforçado** (fundo branco com brilho/sombra), tanto no cabeçalho quanto no banner principal, para reforçar que essa é a ação prioritária de quem já é associado.

## 3. Página de Representantes — redesenho

- Página redefinida para mostrar **somente os representantes regionais** (Capital, Interior, Litoral etc.), agrupados por região.
- Removidas as categorias de Conselho Deliberativo, Conselho Fiscal, Diretoria Executiva e Diretores de Departamentos — esse conteúdo passa a ter espaço próprio em uma futura página de Administração, deixando a página de Representantes mais objetiva.
- Título, descrição e cor de destaque da página atualizados para refletir esse novo foco.

## 4. Páginas de Serviços

- Adicionada uma **faixa vermelha de destaque** (com ícone e título) no topo das páginas de Assistência Médica, Assistência Odontológica, Farmácias, Fundo Mútuo e Seguros — essas páginas eram totalmente brancas e passaram a ter mais identidade visual, alinhadas ao restante do site.
- Novo **cartão de serviço da parceria TotalPass** na página geral de Serviços, com selo "Parceria", ícone próprio e abertura em nova aba.
- Estrutura da página adaptada para suportar tanto **links internos quanto externos** nos cartões de serviço, incluindo textos de acessibilidade (aviso de "abre em nova aba" para quem usa leitor de tela).

## 5. Página "Quem Somos"

- Bloco da **Missão reorganizado** para ficar lado a lado com os blocos de fundação e utilidade pública (grade de 3 colunas), no lugar de uma citação isolada e grande — página mais compacta, sem perder o conteúdo.
- Espaçamento geral da página reduzido.

## 6. Contato e Rodapé

- Página de **Contato** passou a exibir a lista completa de **e-mails por unidade/setor**, antes disponível apenas no rodapé.
- **Rodapé enxugado:** removida a grande grade de e-mails (4 colunas), substituída por um único link — "Ver todos os e-mails e fale conosco" — apontando para a página de Contato.
- Espaçamento do rodapé reduzido (menos preenchimento vertical e entre colunas).
- **Endereço e horário de atendimento atualizados:** Rua Correia de Andrade, 232 - Brás, São Paulo - SP, CEP 03008-020; horário ajustado de "8h às 17h" para "7h às 17h".
- Link "Contato" adicionado aos links rápidos do rodapé.

## 7. Núcleos de Lazer

- Criado um **componente de cabeçalho de seção reutilizável** (título + subtítulo + link "ver mais"), usado tanto na seção de Benefícios quanto na de Núcleos, garantindo consistência visual entre elas.
- Fotos dos três núcleos (Clube de Campo, Clube Náutico, Colônia de Férias) **recortadas em três formatos diferentes** conforme o uso (cartões da home, versão retrato, versão "card"), evitando distorção ou perda de qualidade da imagem.
- Largura máxima da seção ajustada de 1400px para 1920px, alinhando com as demais seções da home e evitando que as fotos precisassem ser esticadas além da resolução original.

## 8. Acessibilidade e Tema Claro/Escuro

- Botão de alternância de tema (claro/escuro) **aumentado (de 48px para 56px)** e reposicionado no canto inferior direito, para maior visibilidade e facilidade de toque.
- Ícone do botão de acessibilidade trocado por um símbolo mais adequado ao contexto (o anterior, um ícone de "aperto de mãos", não comunicava claramente a função de acessibilidade).
- Ajuste técnico para respeitar corretamente a preferência de "movimento reduzido" do sistema operacional dos visitantes em produção, mantendo as animações completas durante o desenvolvimento para facilitar os ajustes visuais.

## 9. Segurança, Performance e Manutenção

- Correção de **vulnerabilidades de segurança (CVEs)** identificadas em bibliotecas de terceiros do projeto — postcss, sharp (processamento de imagens), js-yaml e fast-xml-parser — travando versões seguras dessas dependências.
- Atualização do **Prisma** (camada de acesso ao banco de dados) para a versão 7.9.
- Atualização do **Next.js** (framework base do site) da versão 16.2.9 para 16.2.11.
- Correção no **carrossel de banners da home**: agora é exigido o envio de uma imagem ao criar um slide no modo "somente imagem", e o carrossel foi reforçado para não quebrar visualmente caso já exista, no banco de dados, algum slide salvo sem imagem.

## 10. Documentação e Planejamento

- Antes de iniciar as mudanças de interface, foi produzido um **documento de alinhamento** com a associação, detalhando cada ajuste proposto para validação prévia (cabeçalho, menu, banner, home, rodapé, tema/acessibilidade, "Quem Somos" e páginas internas).
- Um **plano de implementação técnico** também foi criado, dividindo o trabalho em fases (menu, home, representantes, contato, rodapé etc.), cada uma com passos claros de verificação antes de avançar para a próxima.

---

## Anexo — Lista de commits (ordem cronológica)

| Data | Commit | Descrição |
|---|---|---|
| 16/07 | `3d4e4e8` | Exige imagem em slide "somente imagem" e blinda o carrossel contra banner vazio |
| 22/07 | `4fee554` | Cabeçalho em faixa única vermelha; menu com "Contato" e correção de bug de hover; rodapé com e-mails migrados para Contato; faixas vermelhas nas páginas de serviços; ajuste da página "Quem Somos" |
| 22/07 | `d05f030` | Redesign da home: banner com fundo animado, bento de benefícios, seção de núcleos, cartão TotalPass, números reais no banner |
| 22/07 | `363b754` | Redesign da página de Representantes; ajustes no painel de acessibilidade, cabeçalho e banner |
| 22/07 | `2bed44a` | Correção de vulnerabilidades de segurança (CVEs) nas dependências + Prisma 7.9 |
| 22/07 | `295b129` | Destaque do botão "Área do Associado"; headline de benefícios; ajustes de contato/rodapé/acessibilidade |
| 23/07 | `6e00dc1` | Ajuste da headline de benefícios para o texto final aprovado |
| 23/07 | `296ff29` | Atualização do Next.js (16.2.9 → 16.2.11) |
| 23/07 | `732ef4b` | Ajustes na seção de núcleos de lazer (cabeçalho reaproveitado, proporção das fotos) |
| 23/07 | `f81826e` | Ajustes finos de espaçamento (home e botão de tema) |
| 23/07 | `9eeacc9` | Link "Contato" adicionado ao rodapé |
| 23/07 | `f3d665c` | Correção do bug do menu suspenso saindo da tela |
| 23/07 | `68bbfbd` | Cartão da parceria TotalPass na página de Serviços |
