'use client';

import { motion } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import {
 Phone,
 Mail,
 MapPin,
 Clock,
 MessageCircle,
 Facebook,
 Instagram,
} from 'lucide-react';
import { CONTACT } from '@/lib/config/contact';

const contactInfo = [
 {
 icon: Phone,
 label: 'Telefone',
 value: CONTACT.phone,
 href: CONTACT.phoneHref,
 },
 {
 icon: MessageCircle,
 label: 'WhatsApp',
 value: CONTACT.whatsapp,
 href: CONTACT.whatsappHref,
 },
 {
 icon: MapPin,
 label: 'Endereço',
 value: CONTACT.address,
 href: null,
 },
 {
 icon: Clock,
 label: 'Horário',
 value: CONTACT.hours,
 href: null,
 },
];

const socialLinks = [
 { icon: Facebook, label: 'Facebook', href: CONTACT.facebook },
 { icon: Instagram, label: 'Instagram', href: CONTACT.instagram },
];

/** Mesmo formato de embed usado nas telas dos núcleos de lazer. */
const MAPA_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
 'Rua Correia de Andrade, 232 - Brás, São Paulo - SP, 03008-020'
)}&output=embed`;

export default function ContatoPage() {
 return (
 <>
 <PageHeader
 icone={Mail}
 titulo="Fale Conosco"
 subtitulo="Estamos aqui para ajudar. Fale com a administração central ou diretamente com cada núcleo de lazer."
 />

 <section className="py-16 gradient-theme-page-light min-h-screen">
 <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
 {/* Contato e redes */}
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="lg:col-span-2 space-y-6"
 >
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
 Informações de Contato
 </h2>
 <div className="space-y-4">
 {contactInfo.map((info) => {
 const Icon = info.icon;
 return (
 <div key={info.label} className="flex items-start gap-3">
 <div className="w-10 h-10 bg-theme-primary-light dark:bg-theme-primary-20 rounded-lg flex items-center justify-center flex-shrink-0">
 <Icon className="text-theme-primary dark:text-theme-primary" size={20} />
 </div>
 <div>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {info.label}
 </p>
 {info.href ? (
 <a
 href={info.href}
 target={info.href.startsWith('http') ? '_blank' : undefined}
 rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
 className="text-gray-900 dark:text-white font-semibold hover:text-theme-primary dark:hover:text-theme-primary transition-colors text-sm"
 >
 {info.value}
 </a>
 ) : (
 <p className="text-gray-900 dark:text-white font-semibold text-sm">
 {info.value}
 </p>
 )}
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Social */}
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
 Redes Sociais
 </h2>
 <div className="flex gap-3">
 {socialLinks.map((social) => {
 const Icon = social.icon;
 return (
 <a
 key={social.label}
 href={social.href}
 target="_blank"
 rel="noopener noreferrer"
 className="w-12 h-12 bg-theme-primary-light dark:bg-theme-primary-20 rounded-xl flex items-center justify-center hover:bg-theme-primary-light dark:hover:bg-theme-primary-20 transition-colors"
 aria-label={social.label}
 >
 <Icon className="text-theme-primary dark:text-theme-primary" size={22} />
 </a>
 );
 })}
 </div>
 </div>
 </motion.div>

 {/* Mapa */}
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="lg:col-span-3"
 >
 <div className="h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden flex flex-col">
 <div className="p-6 pb-4">
 <h2 className="text-lg font-bold text-gray-900 dark:text-white">Localização</h2>
 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{CONTACT.address}</p>
 </div>
 <iframe
 src={MAPA_SRC}
 className="w-full flex-1 min-h-[380px]"
 style={{ border: 0 }}
 allowFullScreen
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title="Localização da sede da AES — Brás, São Paulo/SP"
 />
 </div>
 </motion.div>
 </div>

 {/* E-mails por unidade (migrados do rodapé) */}
 <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">E-mails por unidade</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
 {CONTACT.emailGroups.map((group) => (
 <div key={group.title}>
 <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2.5 flex items-center gap-2">
 <Mail size={14} className="text-theme-primary shrink-0" /> {group.title}
 </h3>
 <ul className="space-y-2 text-xs">
 {group.emails.map((item) => (
 <li key={item.role + item.address} className="text-gray-500 dark:text-gray-400 leading-relaxed">
 <span className="block">{item.role}</span>
 <a href={`mailto:${item.address}`} className="hover:text-theme-primary transition-colors break-all text-gray-700 dark:text-gray-300">{item.address}</a>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 </>
 );
}
