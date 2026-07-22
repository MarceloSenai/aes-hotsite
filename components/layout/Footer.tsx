import Link from 'next/link';
import Image from 'next/image';
import { CONTACT } from '@/lib/config/contact';
import {
  MapPin,
  Clock,
  MessageCircle,
  Heart,
  Stethoscope,
  Shield,
  Pill,
  Facebook,
  Instagram,
  Linkedin,
  ChevronRight,
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Quem Somos', href: '/sobre/quem-somos' },
  { label: 'Representantes', href: '/representantes' },
  { label: 'Associados', href: '/associados' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Parcerias', href: '/parcerias' },
];

const servicos = [
  { label: 'Assistência Médica', href: '/servicos/assistencia-medica', icon: Stethoscope },
  { label: 'Assistência Odontológica', href: '/servicos/assistencia-odontologica', icon: Heart },
  { label: 'Fundo Mútuo', href: '/servicos/fundo-mutuo', icon: Shield },
  { label: 'Farmácias', href: '/servicos/farmacias', icon: Pill },
  { label: 'Seguros', href: '/servicos/seguros', icon: Shield },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-100">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              {/* width/height são as dimensões reais do arquivo (858x277), só
                  para o Next calcular o aspect ratio; o tamanho exibido vem do
                  CSS. Antes estava 160x60 (ratio 2.67 contra 3.10 do arquivo),
                  o que espremia o logo na horizontal. */}
              <Image
                src="/images/aes-footer-logo.png"
                alt="AES - Associação dos Empregados do SENAI"
                width={858}
                height={277}
                className="h-15 w-auto"
              />
            </div>
            <p className="text-white font-semibold text-sm mb-1">
              Associação dos Empregados do SENAI
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {CONTACT.tagline}
            </p>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-semibold tracking-wide mb-5"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-dark) 40%, transparent)', borderColor: 'color-mix(in srgb, var(--color-primary) 50%, transparent)', color: 'var(--color-primary-light)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary-light)' }} />
              Desde 1947
            </span>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/aessenai" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#1877F2] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <Facebook size={16} />
              </a>
              <a href="https://instagram.com/aessenai" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#E4405F] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <Instagram size={16} />
              </a>
              <a href="https://linkedin.com/company/aessenai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#0A66C2] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <Linkedin size={16} />
              </a>
              <a href="https://wa.me/551133679900" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#22C55E] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Links Rápidos
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-theme-primary-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Serviços */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">Serviços</h3>
            <ul className="space-y-2.5">
              {servicos.map((servico) => {
                const Icon = servico.icon;
                return (
                  <li key={servico.href}>
                    <Link
                      href={servico.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-theme-primary-light transition-colors text-sm group"
                    >
                      <Icon
                        size={14}
                        className="text-gray-500 group-hover:text-theme-primary-light transition-colors"
                      />
                      {servico.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contato */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">Contato</h3>

            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2.5">Administração Central</p>
            <ul className="space-y-3 text-sm mb-5">
              <li className="flex items-center gap-2.5 text-gray-400">
                <MessageCircle size={16} className="text-theme-primary shrink-0" />
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp {CONTACT.whatsapp}</a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-400">
                <MapPin size={16} className="text-theme-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Rua Correia de Andrade, 232<br />Brás, São Paulo - SP<br />CEP 03008-020</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <Clock size={16} className="text-theme-primary shrink-0" />
                <span>Seg-Sex 7:00 - 17:00</span>
              </li>
            </ul>

            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2.5">Contato Núcleos</p>
            <ul className="space-y-2.5 text-sm">
              {CONTACT.nucleos.map((nucleo) => (
                <li key={nucleo.label} className="flex items-start gap-2.5 text-gray-400">
                  <MessageCircle size={16} className="text-theme-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <span className="text-gray-300">{nucleo.label}:</span>{' '}
                    <a href={nucleo.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {nucleo.whatsapp.join(' / ')}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* E-mails completos migraram para a página de Contato */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <Link href="/contato" className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white" style={{ color: 'var(--color-primary-light)' }}>
            Ver todos os e-mails e fale conosco
            <ChevronRight size={15} />
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Associação dos Empregados do SENAI - Todos os
              Direitos Reservados
            </p>
            <p className="text-xs text-gray-600">
              Desenvolvido por{' '}
              <a
                href="https://codecycle.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-theme-primary-light transition-colors"
              >
                CodeCycle
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
