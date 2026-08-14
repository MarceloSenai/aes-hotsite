'use client';

import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import { Smile, CheckCircle2, Smartphone, FileText, Download, Mail } from 'lucide-react';

const convenios = [
 { nome: 'Prodent', detalhe: 'Administrado pelo Grupo SulAmérica' },
 { nome: 'Uniodonto Paulista', detalhe: null },
];

const caracteristicas = [
 'Coletivo por adesão.',
 'Destinado ao associado titular, cônjuge e filho até 24 anos incompletos.',
 'Não é coparticipativo.',
 'Não tem carência, podendo ser utilizado a partir do pagamento da 1ª mensalidade.',
 'Tempo de permanência obrigatório: 12 meses.',
 'Sofre reajuste anual de acordo com as diretrizes da Agência Nacional de Saúde Suplementar (ANS).',
];

const recursosApp = [
 {
 titulo: 'Carteirinhas digitais',
 descricao:
 'Acesso rápido ao seu cartão virtual e dos seus dependentes para apresentar nas clínicas.',
 },
 {
 titulo: 'Busca de rede credenciada',
 descricao:
 'Pesquisa de dentistas, clínicas e especialistas por geolocalização, incluindo rotas para chegar ao local.',
 },
 {
 titulo: 'Cobertura do plano',
 descricao: 'Consulta detalhada sobre quais procedimentos o seu contrato cobre.',
 },
 {
 titulo: 'Central de ajuda',
 descricao: 'Canais de atendimento e chat para suporte de dúvidas sobre o plano.',
 },
];

/* Tabelas conforme aessenai.org.br/assisOdonto.asp */

interface PlanoOdonto {
 plano: string;
 abrangencia: string;
 coberturas: string;
 coparticipacao: string;
 valor: string;
}

const uniodonto: PlanoOdonto[] = [
 { plano: 'Bronze', abrangencia: 'Nacional', coberturas: 'Rol de cobertura', coparticipacao: 'Não', valor: 'R$ 30,28' },
 { plano: 'Prata', abrangencia: 'Nacional', coberturas: 'Todos os atos do Rol + os atos de prótese', coparticipacao: 'Sim', valor: 'R$ 54,76' },
 { plano: 'Ouro', abrangencia: 'Nacional', coberturas: 'Todos Bronze + Prata e ortodontia', coparticipacao: 'Sim', valor: 'R$ 88,49' },
];

const prodent: PlanoOdonto[] = [
 { plano: 'Standard Plus', abrangencia: 'Nacional', coberturas: 'Rol de cobertura', coparticipacao: 'Não', valor: 'R$ 30,22' },
 { plano: 'Diamond', abrangencia: 'Nacional', coberturas: '318 itens de cobertura', coparticipacao: 'Não', valor: 'R$ 111,76' },
];

const fichas = [
 { nome: 'Uniodonto', arquivo: '/documentos/saude/FichaAdesaoUniodonto.pdf' },
 { nome: 'Prodent', arquivo: '/documentos/saude/FichaAdesaoProdent_2026.pdf' },
];

function TabelaPlanos({
 titulo,
 planos,
 observacao,
}: {
 titulo: string;
 planos: PlanoOdonto[];
 observacao?: string;
}) {
 return (
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden shadow-lg">
 <div className="gradient-theme-cta p-5">
 <h3 className="text-lg font-bold text-white">{titulo}</h3>
 </div>
 <div className="overflow-x-auto">
 <div className="min-w-[720px]">
 <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] gap-2 p-4 bg-gray-50 dark:bg-gray-700/30 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
 <span>Plano</span>
 <span>Abrangência</span>
 <span>Coberturas</span>
 <span className="text-center">Coparticipação</span>
 <span className="text-right">Valor</span>
 </div>
 <div className="divide-y divide-gray-100 dark:divide-gray-700">
 {planos.map((p) => (
 <div
 key={p.plano}
 className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] gap-2 p-4 items-center hover:bg-theme-primary-5 dark:hover:bg-theme-primary-10 transition-colors"
 >
 <span className="font-medium text-gray-900 dark:text-white text-sm">{p.plano}</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">{p.abrangencia}</span>
 <span className="text-sm text-gray-600 dark:text-gray-300">{p.coberturas}</span>
 <span className="text-center text-sm text-gray-600 dark:text-gray-300">
 {p.coparticipacao}
 </span>
 <span className="text-right text-sm font-semibold text-theme-primary dark:text-theme-primary">
 {p.valor}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>
 {observacao && (
 <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800/40">
 <p className="text-sm text-amber-800 dark:text-amber-300">{observacao}</p>
 </div>
 )}
 </div>
 );
}

export default function AssistenciaOdontologicaPage() {
 return (
 <>
 <PageHeader
 icone={Smile}
 titulo="Assistência Odontológica"
 subtitulo="A AES oferece assistência odontológica completa para seus associados e dependentes, com rede credenciada de qualidade."
 />

 <section className="py-16 gradient-theme-page-light min-h-screen">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-5xl mx-auto space-y-8">

 {/* Convênios vigentes */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8"
 >
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Convênios vigentes</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {convenios.map((c) => (
 <div
 key={c.nome}
 className="flex items-start gap-3 bg-theme-primary-5 dark:bg-theme-primary-10 rounded-xl p-5 border border-theme-light dark:border-theme-primary-dark"
 >
 <Smile size={20} className="text-theme-primary shrink-0 mt-0.5" />
 <div>
 <p className="font-semibold text-gray-900 dark:text-white">{c.nome}</p>
 {c.detalhe && (
 <p className="text-sm text-gray-600 dark:text-gray-300">{c.detalhe}</p>
 )}
 </div>
 </div>
 ))}
 </div>
 </motion.div>

 {/* Características dos contratos */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8"
 >
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
 Características dos contratos
 </h2>
 <ul className="space-y-3">
 {caracteristicas.map((item) => (
 <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle2 size={18} className="text-theme-primary shrink-0 mt-0.5" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </motion.div>

 {/* Tabelas de preço */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="space-y-8"
 >
 <TabelaPlanos
 titulo="Uniodonto — planos odontológicos"
 planos={uniodonto}
 observacao="Os planos Prata e Ouro não estão abertos para novas adesões."
 />
 <TabelaPlanos
 titulo="Prodent — planos odontológicos administrados pela SulAmérica"
 planos={prodent}
 />
 </motion.div>

 {/* Aplicativos */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6 sm:p-8"
 >
 <div className="flex items-center gap-3 mb-2">
 <Smartphone size={22} className="text-theme-primary" />
 <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nos aplicativos</h2>
 </div>
 <p className="text-gray-600 dark:text-gray-300 mb-6">
 No aplicativo da Uniodonto Paulista e no aplicativo da Prodent estão disponíveis as
 seguintes ferramentas:
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {recursosApp.map((r) => (
 <div
 key={r.titulo}
 className="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-5 border border-gray-200/80 dark:border-gray-700/60"
 >
 <p className="font-semibold text-gray-900 dark:text-white mb-1">{r.titulo}</p>
 <p className="text-sm text-gray-600 dark:text-gray-300">{r.descricao}</p>
 </div>
 ))}
 </div>
 </motion.div>

 {/* Fichas de adesão */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 >
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Fichas de adesão</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {fichas.map((ficha) => (
 <a
 key={ficha.nome}
 href={ficha.arquivo}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/80 dark:border-gray-700/60 p-5 hover:shadow-lg hover:border-theme-primary-light dark:hover:border-theme-primary-dark transition-all duration-300"
 >
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center shrink-0">
 <FileText size={20} className="text-theme-primary dark:text-theme-primary" />
 </div>
 <div className="min-w-0">
 <p className="font-medium text-gray-900 dark:text-white text-sm">
 Ficha de adesão — {ficha.nome}
 </p>
 <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
 </div>
 <Download size={18} className="text-gray-400 ml-auto shrink-0" />
 </a>
 ))}
 </div>
 </motion.div>

 {/* Para contratar */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="gradient-theme-cta rounded-2xl p-8 text-center"
 >
 <h2 className="text-2xl font-bold text-white mb-3">Para contratar</h2>
 <p className="text-white/85 mb-6">Envie um e-mail para a supervisão de benefícios.</p>
 <a
 href="mailto:supervisora@aessenai.org.br"
 className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-theme-primary-dark rounded-xl font-semibold hover:bg-theme-primary-5 transition-colors shadow-lg"
 >
 <Mail size={20} />
 supervisora@aessenai.org.br
 </a>
 </motion.div>
 </div>
 </div>
 </section>
 </>
 );
}
