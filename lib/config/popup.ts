/**
 * Configuração do Popup do site (modo sem banco de dados).
 *
 * Enquanto o banco estiver inacessível, o popup é controlado por este arquivo.
 * Quando o banco voltar, os popups cadastrados no /admin têm prioridade e este
 * serve apenas de fallback.
 *
 * Como usar:
 *  1. Coloque a imagem em /public (ex: public/popup/aviso.jpg) ou use uma URL.
 *  2. Preencha `image`, ajuste as datas e mude `enabled` para true.
 *  3. Faça o deploy.
 *
 * Datas no formato 'YYYY-MM-DD'. Vazio = sem limite. A data final é inclusiva.
 * Troque `version` para reexibir o popup a quem já fechou a versão anterior.
 */

export interface PopupConfig {
  enabled: boolean;
  image: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  version: string;
}

export const POPUP_CONFIG: PopupConfig = {
  enabled: true,
  image: '/popup/festival-de-inverno.jpeg',
  link: '',
  startDate: '', // sem limite inicial — aparece imediatamente
  endDate: '2026-07-15', // fim das inscrições do Festival de Inverno
  version: 'festival-inverno-2026',
};
