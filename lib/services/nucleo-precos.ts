import { nucleoPricingService } from './data-service';

/**
 * Uma linha da tabela principal de valores de um núcleo.
 *
 * As colunas do banco são genéricas e cada núcleo as rotula à sua maneira: no
 * Clube de Campo e no Clube Náutico a tabela oficial é
 * "Associado/Dependente | Afins | Convidado", então `dependente` carrega o valor
 * de Afins. Na Colônia de Férias os três nomes valem ao pé da letra.
 */
export interface NucleoPrecoRow {
  categoria: string;
  associado: string;
  dependente: string;
  convidado: string;
}

/**
 * Lê os valores do núcleo no banco, caindo para `fallback` quando a API falha ou
 * o núcleo ainda não tem preços cadastrados.
 *
 * O fallback é a tabela publicada em aessenai.org.br, escrita no próprio código
 * da tela: sem ele, uma falha de banco deixaria a página sem tabela de preços —
 * pior do que mostrar um valor que só muda quando alguém edita o banco.
 */
export async function lerPrecosDoNucleo(
  nucleoId: string,
  fallback: NucleoPrecoRow[],
): Promise<NucleoPrecoRow[]> {
  const nucleos = (await nucleoPricingService.getAll()) as {
    id: string;
    nucleo_precos?: NucleoPrecoRow[];
  }[];

  const precos = nucleos.find((n) => n.id === nucleoId)?.nucleo_precos;
  return precos?.length ? precos : fallback;
}
