import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Heart,
  Stethoscope,
  Shield,
  Pill,
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Quem Somos', href: '/quem-somos' },
  { label: 'Representantes', href: '/representantes' },
  { label: 'Associados', href: '/associados' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Parcerias', href: '/parcerias' },
];

const servicos = [
  { label: 'Assistência Médica', href: '/servicos#medica', icon: Stethoscope },
  { label: 'Assistência Odontológica', href: '/servicos#odontologica', icon: Heart },
  { label: 'Fundo Mútuo', href: '/servicos#fundo-mutuo', icon: Shield },
  { label: 'Farmácias', href: '/servicos#farmacias', icon: Pill },
  { label: 'Seguros', href: '/servicos#seguros', icon: Shield },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/aes-logo.svg"
                alt="AES - Associação dos Empregados do SENAI"
                width={160}
                height={60}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-white font-semibold text-sm mb-1">
              Associação dos Empregados do SENAI
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Promovendo o bem-estar, a qualidade de vida e os direitos dos
              empregados do SENAI-SP e seus dependentes.
            </p>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-semibold tracking-wide"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-dark) 40%, transparent)', borderColor: 'color-mix(in srgb, var(--color-primary) 50%, transparent)', color: 'var(--color-primary-light)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-primary-light)' }} />
              Desde 1947
            </span>
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
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-gray-400">
                <Phone size={16} className="text-theme-primary shrink-0" />
                <a href="tel:+551133679900" className="hover:text-white transition-colors">(11) 3367-9900</a>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <MessageCircle size={16} className="text-theme-primary shrink-0" />
                <a href="https://wa.me/551133679900" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
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

            <h4 className="text-sm font-semibold text-white mt-5 mb-2.5">E-mails por Setor</h4>
            <ul className="space-y-1.5 text-xs">
              <li className="text-gray-400"><span className="text-gray-500">Gerente:</span>{' '}<a href="mailto:gerente@aessenai.org.br" className="hover:text-white transition-colors">gerente@aessenai.org.br</a></li>
              <li className="text-gray-400"><span className="text-gray-500">Cadastro / Odonto / TotalPass:</span>{' '}<a href="mailto:cadastro@aessenai.org.br" className="hover:text-white transition-colors">cadastro@aessenai.org.br</a></li>
              <li className="text-gray-400"><span className="text-gray-500">Planos de Saúde:</span>{' '}<a href="mailto:rh@aessenai.org.br" className="hover:text-white transition-colors">rh@aessenai.org.br</a></li>
              <li className="text-gray-400"><span className="text-gray-500">Boletos e Cobranças:</span>{' '}<a href="mailto:cobranca@aessenai.org.br" className="hover:text-white transition-colors">cobranca@aessenai.org.br</a></li>
              <li className="text-gray-400"><span className="text-gray-500">Contas a Receber:</span>{' '}<a href="mailto:boletim.aes@aessenai.org.br" className="hover:text-white transition-colors">boletim.aes@aessenai.org.br</a></li>
              <li className="text-gray-400"><span className="text-gray-500">Contas a Pagar:</span>{' '}<a href="mailto:financeiro@aessenai.org.br" className="hover:text-white transition-colors">financeiro@aessenai.org.br</a></li>
            </ul>
          </div>
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
                href="https://quicksolutions-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-theme-primary-light transition-colors"
              >
                Quick Solutions AI
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
