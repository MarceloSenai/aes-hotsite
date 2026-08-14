import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Correção pontual da tabela de preços dos núcleos (nucleo_pricing / nucleo_precos).
 *
 * O banco ficou com os valores antigos (R$ 45,00 / 58,00 / 73,00) enquanto as
 * telas dos núcleos já mostram a tabela vigente de aessenai.org.br. Como não há
 * acesso direto ao banco nem tela de edição de preços no /admin, a correção
 * entra por aqui: GET mostra o que está gravado e o que seria escrito, POST aplica.
 *
 * A rota vive sob /api/admin, então o middleware já exige sessão de admin — e,
 * no POST, o header x-csrf-token casando com o cookie aes-csrf.
 *
 * É idempotente: aplicar duas vezes deixa o mesmo resultado.
 */

/**
 * As três colunas do banco são slots genéricos, rotulados por cada tela. No
 * Clube de Campo e no Clube Náutico a tabela oficial é
 * "Associado/Dependente | Afins | Convidado", então `associado` guarda o valor
 * de associado e dependente (que pagam igual) e `dependente` guarda o de Afins.
 * As telas rotulam as colunas assim; ver NucleoPrecoRow em lib/services/nucleo-precos.ts.
 *
 * A Colônia de Férias não entra: tem tabela própria (hospedagem + refeições) e
 * seus valores continuam corretos.
 */
const CRIANCAS_INFO =
  'Hospedagem — até 6 anos: isenta | 7-12 anos: meia. Diarista — até 10 anos: isenta | 11-12 anos: meia.'

const PRECOS = [
  { categoria: 'Hospedagem', associado: 'R$ 47,70', dependente: 'R$ 61,50', convidado: 'R$ 77,40', sort_order: 0 },
  { categoria: 'Diarista', associado: 'Isento', dependente: 'Isento', convidado: 'R$ 53,00', sort_order: 1 },
]

const NUCLEOS = [
  { id: 'clube-campo', nucleo_nome: 'Clube de Campo', day_use: 'R$ 53,00', criancas_info: CRIANCAS_INFO, precos: PRECOS },
  { id: 'clube-nautico', nucleo_nome: 'Clube Náutico', day_use: 'R$ 53,00', criancas_info: CRIANCAS_INFO, precos: PRECOS },
]

const IDS = NUCLEOS.map((n) => n.id)

function lerAtual() {
  return prisma.nucleoPricing.findMany({
    where: { id: { in: IDS } },
    include: { precos: { orderBy: { sort_order: 'asc' } } },
  })
}

/** Prévia: o que está gravado hoje e o que o POST gravaria. */
export async function GET() {
  try {
    return NextResponse.json({ ok: true, aplicado: false, atual: await lerAtual(), seria_gravado: NUCLEOS })
  } catch (error) {
    console.error('GET /api/admin/migracoes/precos-nucleos:', error)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}

export async function POST() {
  try {
    const antes = await lerAtual()

    // Em transação: apagar e recriar em passos soltos deixa o núcleo sem preço
    // se a conexão cair no meio — e ela cai, o App Service derruba o banco a
    // cada reinício de deploy. Ou grava tudo, ou não mexe em nada.
    await prisma.$transaction(
      NUCLEOS.flatMap(({ precos, ...cabecalho }) => [
        prisma.nucleoPricing.upsert({
          where: { id: cabecalho.id },
          update: {
            nucleo_nome: cabecalho.nucleo_nome,
            day_use: cabecalho.day_use,
            criancas_info: cabecalho.criancas_info,
          },
          create: cabecalho,
        }),
        // As linhas antigas saem inteiras: os ids são cuid, não há como casar
        // linha a linha, e deixar sobras significaria preço errado ainda no ar.
        prisma.nucleoPreco.deleteMany({ where: { nucleo_id: cabecalho.id } }),
        ...precos.map((preco) =>
          prisma.nucleoPreco.create({ data: { ...preco, nucleo_id: cabecalho.id } })
        ),
      ])
    )

    return NextResponse.json({ ok: true, aplicado: true, antes, depois: await lerAtual() })
  } catch (error) {
    console.error('POST /api/admin/migracoes/precos-nucleos:', error)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}
