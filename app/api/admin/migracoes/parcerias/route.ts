import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Recarrega a tabela `parcerias` com o conteúdo de aessenai.org.br/parcerias.asp,
 * na ordem pedida pelo cliente, e sem UNIP e OMEC/UMC.
 *
 * Como não há tela de edição de parcerias no /admin nem acesso direto ao banco, a
 * correção entra por aqui: GET mostra o que está gravado e o que seria escrito,
 * POST aplica. É idempotente.
 *
 * ATENÇÃO: o POST substitui a tabela inteira — qualquer parceria cadastrada por
 * outro caminho é apagada. É o que o pedido exige (a lista tem que ficar
 * exatamente nesta ordem, sem as duas removidas), mas por isso a resposta
 * devolve `antes` com tudo que existia: é o ponto de retorno.
 *
 * Os ids são fixos, e não cuid, para que o logo de cada parceria (mapeado por id
 * na tela) continue casando depois de qualquer nova execução.
 */

const PARCERIAS = [
  {
    id: 'totalpass',
    nome: 'Totalpass',
    categoria: 'Bem-estar',
    destaque: 'Vantagens exclusivas para associados da AES',
    descricao:
      'A TotalPass é um benefício corporativo de saúde e bem-estar que oferece acesso a uma ampla rede de academias (incluindo Smart Fit e Bio Ritmo) e estúdios no Brasil por um valor mensal fixo. Voltado para os associados da AES, o serviço integra saúde física, mental (apps de terapia e meditação) e nutricional.',
    contato: '(11) 3367-9900 — fixo e WhatsApp',
    site: null,
    instagram: null,
    sort_order: 0,
  },
  {
    id: 'electrolux',
    nome: 'Electrolux',
    categoria: 'Eletrodomésticos',
    destaque: 'Descontos de até 40%',
    descricao:
      'Vantagens exclusivas para associados da AES: descontos de até 40%, promoções exclusivas o ano inteiro, parcelamento em até 10x sem juros e frete grátis para todo o Brasil. A compra pode ser feita pelo site ou pelo telefone 0800 7029 222. Para conferir os descontos, é necessário entrar em contato com a AES para obter o código de acesso.',
    contato: '(11) 3367-9900',
    site: 'https://www.shopclub.com.br/',
    instagram: null,
    sort_order: 1,
  },
  {
    id: 'ifepaf',
    nome: 'IFEPAF',
    categoria: 'Instituto',
    destaque: null,
    descricao:
      'O Instituto Fepaf (Federação Paulista das Associações de Funcionários) é uma associação sem fins econômicos que atua como Centro de Estudos e Promoção do Bem-Estar, Integração e Melhoria da Qualidade de Vida nas Organizações, tendo como beneficiárias empresas, cooperativas e entidades representativas de funcionários. Pelo site, o associado tem autonomia para selecionar o estabelecimento de sua conveniência e solicitar diretamente a autorização correspondente — não é mais necessário usar senha para acessar as informações.',
    contato: null,
    site: 'https://www.ifepaf.com.br/',
    instagram: null,
    sort_order: 2,
  },
  {
    id: 'univap',
    nome: 'UNIVAP',
    categoria: 'Educação',
    destaque: null,
    descricao:
      'Universidade do Vale do Paraíba. Av. Shishima Hifumi, 2911 — Urbanova, São José dos Campos/SP, CEP 12245-913.',
    contato: '(12) 3947-1000',
    site: 'http://www.univap.br',
    instagram: null,
    sort_order: 3,
  },
  {
    id: 'wise-up',
    nome: 'Wise UP',
    categoria: 'Idiomas',
    destaque: null,
    descricao:
      'O convênio firmado tem por objetivo a cooperação recíproca entre as partes, visando o desenvolvimento de parceria para aperfeiçoamento e capacitação no idioma inglês aos funcionários, associados e dependentes da AES. As inscrições nos programas, presencial ou online, podem ser feitas em qualquer unidade da Wise Up, diretamente pelo associado, que deverá entrar em contato com o Sr. Gustavo Soares Matos, gerente da Wise Up, para adquirir o QR Code a ser apresentado para a concessão do desconto.',
    contato: 'Gustavo Soares Matos — (11) 94019-6285',
    site: null,
    instagram: null,
    sort_order: 4,
  },
  {
    id: 'pousada-alpes',
    nome: 'Pousada Alpes',
    categoria: 'Hospedagem',
    destaque: null,
    descricao: 'Descontos exclusivos para associados da AES.',
    contato: null,
    site: null,
    instagram: '@pousada_alpes',
    sort_order: 5,
  },
  {
    id: 'rcr-sports',
    nome: 'Academia RCR Sports',
    categoria: 'Fitness',
    destaque: null,
    descricao: 'Descontos exclusivos para associados da AES.',
    contato: null,
    site: null,
    instagram: '@rcrsports',
    sort_order: 6,
  },
  /**
   * A My Box não está na ordem pedida (item 75) nem na lista de remoções (item 76),
   * mas está no site antigo — então entra por último, para não sumir sem ordem
   * explícita. Se o cliente confirmar que sai, é só apagar este bloco e rodar de novo.
   */
  {
    id: 'my-box-pompeia',
    nome: 'My Box Pompeia',
    categoria: 'Fitness',
    destaque: null,
    descricao:
      'My Box Pompéia Will & SU. Descontos por meio de pagamento: plano mensal com 12% de desconto em dinheiro ou Pix e 7% no boleto; planos trimestral, semestral e anual no cartão. A academia oferece uma aula gratuita na unidade do SENAI Pompeia para incentivo ao esporte.',
    contato: null,
    site: 'https://www.myboxoficial.com.br',
    instagram: '@mybox_pompeiawillesu',
    sort_order: 7,
  },
]

function lerAtual() {
  return prisma.parceria.findMany({ orderBy: { sort_order: 'asc' } })
}

/** Prévia: o que está gravado hoje e o que o POST gravaria. */
export async function GET() {
  try {
    return NextResponse.json({ ok: true, aplicado: false, atual: await lerAtual(), seria_gravado: PARCERIAS })
  } catch (error) {
    console.error('GET /api/admin/migracoes/parcerias:', error)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}

export async function POST() {
  try {
    const antes = await lerAtual()

    // Em transação: apagar e recriar em passos soltos deixa a tabela vazia se a
    // conexão cair no meio — e ela cai, o App Service derruba o banco a cada
    // reinício de deploy. Ou grava a lista inteira, ou não mexe em nada.
    await prisma.$transaction([
      prisma.parceria.deleteMany({}),
      ...PARCERIAS.map((parceria) => prisma.parceria.create({ data: parceria })),
    ])

    return NextResponse.json({ ok: true, aplicado: true, antes, depois: await lerAtual() })
  } catch (error) {
    console.error('POST /api/admin/migracoes/parcerias:', error)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
