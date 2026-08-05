/*
 * Cadastra os representantes regionais na tabela `representantes`.
 * Padrão seguido (idêntico ao LUIZ RODRIGUES DE OLIVEIRA):
 *   - categoria = 'representantes-regionais'
 *   - regional  = "CFP XXX" (campo "Orgão" da lista)
 *   - unidade   = '' (vazio)
 *   - cargo     = NULL
 *   - sort_order = sequencial a partir de 28
 *
 * Idempotente: compara nomes em UPPER e pula os que já existirem
 * como representantes-regionais (ex.: o próprio LUIZ RODRIGUES).
 * Nomes que existirem em OUTRA categoria são criados normalmente
 * como regional (decisão do Nathan em 04/08/2026).
 *
 * Uso:  node scripts/seed-representantes-regionais.cjs
 */
const fs = require('fs');
const sql = require('mssql');

// --- Lê DATABASE_URL do .env (não assumimos dotenv instalado) ---
const env = fs.readFileSync('.env', 'utf8');
const mm = env.match(/^DATABASE_URL="([^"]+)"/m);
if (!mm) { console.error('DATABASE_URL não encontrada no .env'); process.exit(1); }
const raw = mm[1];

const withoutProto = raw.replace(/^sqlserver:\/\//, '');
const [hostPart, ...rest] = withoutProto.split(';');
const [server, portStr] = hostPart.split(':');
const params = {};
rest.forEach((x) => {
  const i = x.indexOf('=');
  if (i > -1) params[x.slice(0, i).trim()] = x.slice(i + 1).trim();
});

const cfg = {
  server,
  port: parseInt(portStr, 10),
  database: params.database,
  user: params.user,
  password: params.password,
  options: { encrypt: true, trustServerCertificate: false },
  requestTimeout: 30000,
  connectionTimeout: 30000,
};

// --- Lista (Nome, CFP) na ordem fornecida ---
const LISTA = [
  ['ALEXANDRE PANSANI CHOCA', 'CFP 102'],
  ['LEANDRO DA SILVA FELIPE', 'CFP 103'],
  ['ELIETE MARQUES DA SILVA', 'CFP 105'],
  ['GUTENBERG SANTIAGO SANTOS REGO', 'CFP 106'],
  ['CATIA APARECIDA MOSSIN DE SOUZA', 'CFP 106'],
  ['JOSIVALDO FERREIRA DOS SANTOS', 'CFP 107'],
  ['THASSIO RAMALHO DOS SANTOS', 'CFP 108'],
  ['PAULO ROBERTO BARBOZA DE OLIVEIRA', 'CFP 109'],
  ['CARINA BARBOSA DA CONCEIÇÃO SANTOS', 'CFP 110'],
  ['CRISTIANE FERNANDES LIMA', 'CFP 111'],
  ['RICK CHARLLES EVANGELISTA VILA NOVA', 'CFP 111'],
  ['AÉCIO MORAIS LAPA', 'CFP 112'],
  ['LUCIANO TRINDADE', 'CFP 113'],
  ['EMERSON LUCIO PEREIRA', 'CFP 113'],
  ['DONIZETI DE CARVALHO BAPTISTA', 'CFP 114'],
  ['ÂNGELA VENTURA MACHADO', 'CFP 115'],
  ['DANIELA SOUZA FRANCO', 'CFP 116'],
  ['OSNIR RODRIGUES DA SILVA', 'CFP 117'],
  ['SILVIO ADRIANO DOS SANTOS', 'CFP 118'],
  ['LEANDRO FERREIRA DE OLIVEIRA', 'CFP 119'],
  ['CRISTOFF ANDRADE DO NASCIMENTO', 'CFP 119'],
  ['DEBRISCIO LOPES DE MOURA', 'CFP 120'],
  ['ARIANE RODRIGUES DE OLIVEIRA LEITE', 'CFP 121'],
  ['GILBERTO JUVÊNCIO', 'CFP 122'],
  ['ASSUNCAO ALVES GOMES', 'CFP 123'],
  ['IONE GILL LEITE', 'CFP 124'],
  ['ROSANA ANDYARA DE ALMEIDA', 'CFP 124'],
  ['NIVIA LEONILDA DE AZEVEDO SMITH', 'CFP 125'],
  ['CELIO MARCIO MONARI', 'CFP 126'],
  ['JHONATAN DE ALMEIDA ROCHA', 'CFP 127'],
  ['CLAYTON DIORIO RISSO', 'CFP 128'],
  ['FULVIA ALVES DA SILVA', 'CFP 134'],
  ['CARLOS ALBERTO ARAUJO DA SILVA', 'CFP 135'],
  ['JOAO PAULO LABLIUK SILVA', 'CFP 136'],
  ['GISELE PAYZOS FIACADOR DANTAS', 'CFP 138'],
  ['DEMETRIUS DOS SANTOS', 'CFP 143'],
  ['VALERIA ESTEVES', 'CFP 144'],
  ['SUELI APARECIDA DIOGO', 'CFP 150'],
  ['EDSON RIBEIRO DOS SANTOS', 'CFP 163'],
  ['MURILO LUCCHINI DE CARVALHO', 'CFP 164'],
  ['MARCOS NAPOLIAO SANTANA', 'CFP 201'],
  ['WILSON CAMPOS SILVA SOBRINHO', 'CFP 202'],
  ['JOSÉ CARLOS BACHINI JR', 'CFP 260'],
  ['SEBASTIAO GONCALVES AGUILAR', 'CFP 301'],
  ['DANILO RIBEIRO DE SOUZA', 'CFP 302'],
  ['GIVANILDO ANTONIO DE OLIVEIRA', 'CFP 303'],
  ['PAULO CESAR BARBOSA', 'CFP 360'],
  ['SERGIO ALBINO RODRIGUES', 'CFP 390'],
  ['CLEBER ALEXANDER PEREIRA', 'CFP 401'],
  ['ROBSON SCHMITT', 'CFP 402'],
  ['PEDRO HENRIQUE ZANQUIM DA SILVA', 'CFP 403'],
  ['LUIS FERNANDO SILVA DE FREITAS', 'CFP 404'],
  ['PEDRO HENRIQUE ZANQUIM DA SILA', 'CFP 499'],
  ['MARCUS VINICIUS BEGOSSI', 'CFP 501'],
  ['GIOVANNA FERREIRA BISSOLI', 'CFP 502'],
  ['RENATO SANTOS FONSECA', 'CFP 502'],
  ['MARCELO JURADO', 'CFP 503'],
  ['LEANDRO SORG', 'CFP 505'],
  ['MATEUS BOSCO FERRAZ', 'CFP 505'],
  ['REGIS ANASTACIO DOS SANTOS', 'CFP 506'],
  ['WAGNER APARECIDO LACAVA JUNIOR', 'CFP 507'],
  ['VILSON MAGNO DOS SANTOS CARDOSO', 'CFP 508'],
  ['DOMINGOS ROSINEI ROGIERI', 'CFP 509'],
  ['CLAYTON STENICO', 'CFP 510'],
  ['BRUNO DE CAMPOS', 'CFP 512'],
  ['DANIEL OLIVEIRA VASCONCELOS', 'CFP 513'],
  ['ADEVANDRIO PETERSON GIMENEZ', 'CFP 514'],
  ['ALLINE CAMARGO FIBGER DOS SANTOS', 'CFP 561'],
  ['THIAGO GIMENES GIOVANETTI', 'CFP 562'],
  ['LUCIANE ALO PEDRO', 'CFP 563'],
  ['HENRIQUE POMPEO DA SILVA', 'CFP 564'],
  ['ROBSON NUNES DE MOURA', 'CFP 568'],
  ['DANTE ROBERTO MACIEL BLEZINS OLIVEIRA', 'CFP 569'],
  ['WELLINGTON RICARDO DOS SANTOS', 'CFP 590'],
  ['FABRICIA FELICIO CAMILOTTI', 'CFP 591'],
  ['ALEX DIAS BORGES', 'CFP 592'],
  ['SILVIO APARECIDO MARTINS', 'CFP 594'],
  ['RODOLFO FAVARO MASSARO', 'CFP 594'],
  ['JEFERSON ANDRÉ BONORA', 'CFP 601'],
  ['SANDRO CHERUBIM', 'CFP 602'],
  ['GENTIL PIRES BARBOSA JUNIOR', 'CFP 603'],
  ['CLÉCIO TELINI', 'CFP 604'],
  ['ROGERIO LUIZ PEREIRA', 'CFP 604'],
  ['MARCELO SOUZA SILVA', 'CFP 661'],
  ['GISELDO DOS SANTOS BRAGA', 'CFP 662'],
  ['HELDER LUIZ TAVEIRA DE ASSIS', 'CFP 701'],
  ['VINICIUS CORREA RIBEIRO', 'CFP 701'],
  ['GUILHERME ALBORGHETTI', 'CFP 780'],
  ['RENATO ARISTIDES CORDEIRO', 'CFP 790'],
  ['GISELDO DOS SANTOS BRAGA', 'CFP 791'],
  ['HELDER JULIO GOTARDI', 'CFP 792'],
  ['LUIS ANDRE LOURENCO DA SILVA', 'CFP 794'],
  ['LEONAM DA SILVA TORRES DELGADO', 'CFP 801'],
  ['GEOVANE ROBERTO DA SILVA', 'CFP 850'],
  ['RENAN CESAR FILETO', 'CFP 890'],
  ['SILVIO SERGIO BARBOSA', 'CFP 901'],
  ['MARCOS ROBERTO CRESCIULO', 'CFP 914'],
  ['RAIMUNDO DA COSTA FILHO', 'CFP 927'],
  ['TIAGO PEREIRA RAMOS', 'CFP 928'],
  ['MARCELO MOMESSO', 'CFP 990'],
];

(async () => {
  const pool = await sql.connect(cfg);
  console.log(`Conectado. ${LISTA.length} registros na lista.`);

  // Já cadastrados como representantes-regionais (comparar em UPPER).
  const ex = await pool.request().query(
    "SELECT nome FROM representantes WHERE categoria = 'representantes-regionais'",
  );
  const existentes = new Set(ex.recordset.map((r) => (r.nome || '').toUpperCase()));

  // Próximo sort_order disponível (continua após o último existente).
  const mx = await pool.request().query(
    "SELECT ISNULL(MAX(sort_order), -1) AS mx FROM representantes",
  );
  let nextOrder = (mx.recordset[0].mx ?? -1) + 1;

  let criados = 0;
  let pulados = 0;
  for (const [nome, cfp] of LISTA) {
    if (existentes.has(nome.toUpperCase())) {
      console.log(`PULAR (já regional): ${nome}`);
      pulados++;
      continue;
    }
    // Insere; regional = CFP, unidade = '', cargo = NULL.
    await pool.request()
      .input('nome', sql.NVarChar(sql.MAX), nome)
      .input('categoria', sql.NVarChar(sql.MAX), 'representantes-regionais')
      .input('regional', sql.NVarChar(sql.MAX), cfp)
      .input('unidade', sql.NVarChar(sql.MAX), '')
      .input('sort_order', sql.Int, nextOrder)
      .query(
        `INSERT INTO representantes (id, nome, cargo, categoria, regional, unidade, email, telefone, sort_order)
         VALUES (NEWID(), @nome, NULL, @categoria, @regional, @unidade, NULL, NULL, @sort_order)`,
      );
    console.log(`+ [${nextOrder}] ${nome} — ${cfp}`);
    nextOrder++;
    criados++;
  }

  console.log(`\nConcluído: ${criados} criados, ${pulados} pulados (já regionais).`);
  await pool.close();
})().catch((e) => {
  console.error('ERRO:', e.message);
  process.exit(1);
});
