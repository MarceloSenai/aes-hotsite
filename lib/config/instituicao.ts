/**
 * Dados institucionais da AES usados em indicadores do site.
 */

/** Fundação da AES: 21 de novembro de 1947 (ver sobre/quem-somos). */
export const FUNDACAO = { ano: 1947, mes: 11, dia: 21 } as const;

/**
 * Anos completos desde a fundação. Calculado — não fixado em código — para que o
 * indicador da home nunca fique desatualizado: vira 79 em 21/11/2026, e assim por
 * diante.
 *
 * Recebe a data de referência para ser testável; o padrão é "agora".
 */
export function anosDeHistoria(referencia: Date = new Date()): number {
  let anos = referencia.getFullYear() - FUNDACAO.ano;
  const mes = referencia.getMonth() + 1;
  const dia = referencia.getDate();
  // Aniversário ainda não chegou neste ano: um ano completo a menos.
  if (mes < FUNDACAO.mes || (mes === FUNDACAO.mes && dia < FUNDACAO.dia)) {
    anos -= 1;
  }
  return anos;
}
