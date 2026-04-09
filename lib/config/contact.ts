/** Centralized contact info — update here instead of across 12+ pages */

export const CONTACT = {
  phone: '(11) 3367-9900',
  phoneHref: 'tel:+551133679900',
  whatsapp: '(11) 3367-9900',
  whatsappHref: 'https://wa.me/551133679900',
  email: 'gerente@aessenai.org.br',
  address: 'Rua José Getúlio, 78/90 - Aclimação, São Paulo - SP',
  hours: 'Segunda a Sexta, 8h às 17h',

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
