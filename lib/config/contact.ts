/** Centralized contact info — update here instead of across 12+ pages */

export const CONTACT = {
  tagline: 'Conectando pessoas, promovendo qualidade de vida.',
  phone: '(11) 3367-9900',
  phoneHref: 'tel:+551133679900',
  whatsapp: '(11) 3367-9900',
  whatsappHref: 'https://wa.me/551133679900',
  email: 'gerente@aessenai.org.br',
  address: 'Rua José Getúlio, 78/90 - Aclimação, São Paulo - SP',
  hours: 'Segunda a Sexta, 8h às 17h',

  // WhatsApp dos Núcleos
  nucleos: [
    {
      label: 'Clube de Campo',
      whatsapp: ['(11) 9 8932 7612'],
      whatsappHref: 'https://wa.me/5511989327612',
    },
    {
      label: 'Clube Náutico',
      whatsapp: ['(14) 9 9141 4566', '(14) 9 9163 3538'],
      whatsappHref: 'https://wa.me/5514991414566',
    },
    {
      label: 'Colônia de Férias',
      whatsapp: ['(13) 9 9713 5463'],
      whatsappHref: 'https://wa.me/5513997135463',
    },
  ],

  // E-mails agrupados por unidade (exibidos no rodapé)
  emailGroups: [
    {
      title: 'Administração Central',
      emails: [
        { role: 'Gerente Executiva', address: 'gerente@aessenai.org.br' },
        { role: 'Supervisora Administrativa', address: 'supervisora@aessenai.org.br' },
        { role: 'Financeiro', address: 'financeiro@aessenai.org.br' },
        { role: 'Boletos / Cobrança', address: 'cobranca@aessenai.org.br' },
        { role: 'Cadastro / TotalPass', address: 'cadastro@aessenai.org.br' },
      ],
    },
    {
      title: 'Clube de Campo',
      emails: [
        { role: 'Gerente', address: 'gerenteclube@aessenai.org.br' },
        { role: 'Secretaria / Reservas', address: 'secretariaclube@aessenai.org.br' },
      ],
    },
    {
      title: 'Clube Náutico',
      emails: [
        { role: 'Gerente', address: 'gerentenautico@aessenai.org.br' },
        { role: 'Secretaria / Reservas', address: 'secretarianautico@aessenai.org.br' },
      ],
    },
    {
      title: 'Colônia de Férias',
      emails: [
        { role: 'Gerente', address: 'gerentecolonia@aessenai.org.br' },
        { role: 'Secretaria / Reservas', address: 'colonia@aessenai.org.br' },
      ],
    },
  ],

  // Department emails
  cadastro: 'cadastro@aessenai.org.br',
  boletim: 'boletim.aes@aessenai.org.br',
  aposentados: 'aposentados@aessenai.org.br',
  cultural: 'cultural@aessenai.org.br',
  esportivo: 'esportivo@aessenai.org.br',
  esportivoInterior: 'esportivo.interior@aessenai.org.br',

  // Social
  facebook: 'https://www.facebook.com/aessenai',
  instagram: 'https://www.instagram.com/aessenai',

  // External
  associadoPortal: 'https://associado.aessenai.org.br',
  site: 'https://aessenai.org.br',

  // Specific service contacts
  medico: {
    phone: '(11) 3385-6074',
    freephone: '0800 772 3030',
  },
  indusprev: {
    phone: '(11) 3284-2555',
    email: 'indusprev@indusprev.org.br',
    site: 'https://www.indusprev.org.br',
  },
} as const;
