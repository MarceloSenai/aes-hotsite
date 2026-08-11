/**
 * Catálogo das rotas públicas: título e descrição de cada uma.
 *
 * Fonte única para três consumidores: o `sitemap.ts`, o `robots.ts` e o
 * `layout.tsx` de cada rota (que exporta a `metadata`). Como todas as páginas
 * públicas são client components, elas não podem exportar `metadata` — quem faz
 * isso é o layout do segmento, lendo daqui.
 *
 * As descrições servem ao resultado de busca e ao card de compartilhamento no
 * WhatsApp, então descrevem o que a página entrega, na ordem em que importa.
 * Entre 110 e 160 caracteres: abaixo disso o Google completa por conta própria,
 * acima ele corta.
 *
 * Ficam de fora, de propósito: /admin, /admin/login, /login e /area-do-associado
 * — telas de acesso restrito, que não devem aparecer em busca.
 */

export interface RotaPublica {
  titulo: string;
  descricao: string;
  /** Prioridade relativa no sitemap (0–1). A home é 1; serviços e núcleos vêm logo abaixo. */
  prioridade: number;
}

export const ROTAS_PUBLICAS: Record<string, RotaPublica> = {
  '/': {
    titulo: 'Início',
    descricao:
      'Associação dos Empregados do SENAI: assistência médica e odontológica, fundo mútuo, farmácias, seguros e três núcleos de lazer para associados e familiares.',
    prioridade: 1,
  },

  // ── Institucional ──
  '/sobre/quem-somos': {
    titulo: 'Quem Somos',
    descricao:
      'História, missão, visão e valores da AES, fundada em 21 de novembro de 1947 e declarada de utilidade pública em 1966.',
    prioridade: 0.8,
  },
  '/sobre/administracao': {
    titulo: 'Administração',
    descricao:
      'Corpo diretivo da AES: Conselho Deliberativo, Conselho Fiscal e Diretoria Executiva, com os nomes e cargos de cada membro.',
    prioridade: 0.6,
  },
  '/departamentos': {
    titulo: 'Departamentos',
    descricao:
      'Os departamentos da AES e seus diretores: Aposentados, Cultural e Recreativo e Esportivo, com as atividades que cada um promove.',
    prioridade: 0.7,
  },
  '/departamentos/aposentados': {
    titulo: 'Departamento de Aposentados',
    descricao:
      'Atividades culturais, eventos sociais, passeios turísticos e programa de saúde e qualidade de vida para os associados aposentados da AES.',
    prioridade: 0.5,
  },
  '/departamentos/cultural-recreativo': {
    titulo: 'Departamento Cultural e Recreativo',
    descricao:
      'Eventos culturais, apresentações artísticas, festas temáticas e excursões para associados da AES e seus familiares.',
    prioridade: 0.5,
  },
  '/departamentos/esportivo-capital': {
    titulo: 'Departamento Esportivo — Capital',
    descricao:
      'Campeonatos, torneios e atividades esportivas da AES na capital paulista, abertos aos associados e suas famílias.',
    prioridade: 0.5,
  },
  '/departamentos/esportivo-interior': {
    titulo: 'Departamento Esportivo — Interior',
    descricao:
      'Eventos e torneios esportivos da AES nas cidades do interior de São Paulo, com integração entre as regionais.',
    prioridade: 0.5,
  },
  '/representantes': {
    titulo: 'Embaixadores',
    descricao:
      'Os embaixadores da AES nos órgãos do departamento regional do SENAI/SP: cada unidade é um núcleo e conta com um representante.',
    prioridade: 0.6,
  },
  '/associados': {
    titulo: 'Associados',
    descricao:
      'Quem pode se associar à AES, como fazer a adesão e quais serviços ficam disponíveis para funcionários ativos, aposentados e ex-empregados do SENAI-SP.',
    prioridade: 0.8,
  },
  '/associe-se': {
    titulo: 'Associe-se',
    descricao:
      'Faça parte da AES e tenha acesso a assistência médica e odontológica, fundo mútuo, farmácias conveniadas, seguros e os núcleos de lazer.',
    prioridade: 0.8,
  },

  // ── Serviços ──
  '/servicos': {
    titulo: 'Serviços',
    descricao:
      'Todos os serviços da AES ao associado: assistência médica, assistência odontológica, fundo mútuo, farmácias conveniadas e seguros.',
    prioridade: 0.9,
  },
  '/servicos/assistencia-medica': {
    titulo: 'Assistência Médica',
    descricao:
      'Planos de saúde para associados da AES e dependentes, com consultas, exames, urgências, emergências e maternidade.',
    prioridade: 0.8,
  },
  '/servicos/assistencia-odontologica': {
    titulo: 'Assistência Odontológica',
    descricao:
      'Cuidado dental para associados da AES e dependentes, com rede credenciada e coparticipação nos procedimentos.',
    prioridade: 0.8,
  },
  '/servicos/fundo-mutuo': {
    titulo: 'Fundo Mútuo',
    descricao:
      'FUMUA e FUMUS: auxílio financeiro da AES para reembolso parcial de despesas com serviços de ambulância e funeral.',
    prioridade: 0.7,
  },
  '/servicos/farmacias': {
    titulo: 'Farmácias Conveniadas',
    descricao:
      'Rede de farmácias conveniadas à AES, com descontos exclusivos e facilidade de pagamento para os associados.',
    prioridade: 0.7,
  },
  '/servicos/seguros': {
    titulo: 'Seguros',
    descricao:
      'Produtos de seguro com condições negociadas pela AES junto a parceiros credenciados, para associados e familiares.',
    prioridade: 0.7,
  },

  // ── Núcleos de lazer ──
  '/nucleo-de-lazer/clube-de-campo': {
    titulo: 'Clube de Campo — Jundiaí',
    descricao:
      'Clube de Campo da AES em Jundiaí: 14 chalés, 10 apartamentos, piscinas, saunas e churrasqueiras em meio à natureza.',
    prioridade: 0.9,
  },
  '/nucleo-de-lazer/clube-nautico': {
    titulo: 'Clube Náutico — Boracéia',
    descricao:
      'Clube Náutico da AES em Boracéia: chalés à beira da represa, pier de pesca e cozinha caipira no interior paulista.',
    prioridade: 0.9,
  },
  '/nucleo-de-lazer/colonia-de-ferias': {
    titulo: 'Colônia de Férias — Itanhaém',
    descricao:
      'Colônia de Férias da AES em Itanhaém: 48 apartamentos na praia, com restaurante, piscina e SPA para as férias da família.',
    prioridade: 0.9,
  },

  // ── Informações ──
  '/parcerias': {
    titulo: 'Parcerias e Convênios',
    descricao:
      'Empresas parceiras e convênios da AES com desconto para associados, incluindo a rede de academias TotalPass.',
    prioridade: 0.7,
  },
  '/documentos': {
    titulo: 'Documentos',
    descricao:
      'Estatuto Social, Regimento Interno e regulamentos dos núcleos de lazer e do FUMUS, disponíveis para download.',
    prioridade: 0.6,
  },
  '/boletim': {
    titulo: 'Boletim',
    descricao:
      'Edições do boletim informativo da AES, com notícias, eventos e novidades para os associados.',
    prioridade: 0.5,
  },
  '/calendario': {
    titulo: 'Calendário de Eventos',
    descricao:
      'Agenda de eventos, torneios e atividades da AES ao longo do ano, organizados por departamento.',
    prioridade: 0.6,
  },
  '/galeria': {
    titulo: 'Galeria de Fotos',
    descricao:
      'Registros dos eventos, confraternizações e atividades da AES nos núcleos de lazer e nas unidades do SENAI.',
    prioridade: 0.4,
  },
  '/indusprev': {
    titulo: 'INDUSPREV',
    descricao:
      'Plano de previdência complementar INDUSPREV, disponível aos empregados do SENAI e associados da AES.',
    prioridade: 0.5,
  },
  '/contato': {
    titulo: 'Contato',
    descricao:
      'Telefones, e-mails por setor e endereço da AES, além dos contatos diretos de cada núcleo de lazer.',
    prioridade: 0.7,
  },
};

export const CAMINHOS_PUBLICOS = Object.keys(ROTAS_PUBLICAS);
