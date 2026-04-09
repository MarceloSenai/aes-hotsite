'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
 Send,
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

export default function ContatoPage() {
 const [formData, setFormData] = useState({
 name: '',
 email: '',
 phone: '',
 subject: '',
 message: '',
 });
 const [submitting, setSubmitting] = useState(false);
 const [success, setSuccess] = useState(false);
 const [error, setError] = useState('');

 const handleChange = (
 e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
 ) => {
 setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitting(true);
 setError('');
 setSuccess(false);
 try {
   const res = await fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData),
   });
   if (!res.ok) {
     const data = await res.json();
     throw new Error(data.error || 'Erro ao enviar mensagem.');
   }
   setSuccess(true);
   setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
 } catch (err) {
   setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem.');
 } finally {
   setSubmitting(false);
 }
 };

 return (
 <section className="py-24 gradient-theme-page-light min-h-screen">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Header */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="text-center mb-16"
 >
 <span className="inline-block px-4 py-1.5 bg-theme-primary-light dark:bg-theme-primary-20 text-theme-primary-dark dark:text-theme-primary-light text-sm font-semibold rounded-full mb-4">
 Contato
 </span>
 <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
 Fale{' '}
 <span className="text-theme-gradient">
 Conosco
 </span>
 </h1>
 <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
 Estamos aqui para ajudar. Entre em contato conosco
 </p>
 </motion.div>

 <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
 {/* Contact Form */}
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: 0.2 }}
 className="lg:col-span-3"
 >
 <form
 onSubmit={handleSubmit}
 className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-8"
 >
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 Envie sua mensagem
 </h2>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
 <div>
 <label
 htmlFor="name"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 Nome completo
 </label>
 <input
 type="text"
 id="name"
 name="name"
 required
 value={formData.name}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-theme-primary focus:border-transparent outline-none transition-all"
 placeholder="Seu nome"
 />
 </div>
 <div>
 <label
 htmlFor="email"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 E-mail
 </label>
 <input
 type="email"
 id="email"
 name="email"
 required
 value={formData.email}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-theme-primary focus:border-transparent outline-none transition-all"
 placeholder="seu@email.com"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
 <div>
 <label
 htmlFor="phone"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 Telefone
 </label>
 <input
 type="tel"
 id="phone"
 name="phone"
 value={formData.phone}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-theme-primary focus:border-transparent outline-none transition-all"
 placeholder="(11) 99999-9999"
 />
 </div>
 <div>
 <label
 htmlFor="subject"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 Assunto
 </label>
 <select
 id="subject"
 name="subject"
 required
 value={formData.subject}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-theme-primary focus:border-transparent outline-none transition-all"
 >
 <option value="">Selecione...</option>
 <option value="associacao">Associação</option>
 <option value="assistencia-medica">Assistência Médica</option>
 <option value="odontologica">Assistência Odontológica</option>
 <option value="fundo-mutuo">Fundo Mútuo</option>
 <option value="farmacias">Farmácias</option>
 <option value="seguros">Seguros</option>
 <option value="parcerias">Parcerias</option>
 <option value="nucleos-lazer">Núcleos de Lazer</option>
 <option value="outros">Outros</option>
 </select>
 </div>
 </div>

 <div className="mb-6">
 <label
 htmlFor="message"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 Mensagem
 </label>
 <textarea
 id="message"
 name="message"
 required
 rows={5}
 value={formData.message}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-theme-primary focus:border-transparent outline-none transition-all resize-none"
 placeholder="Como podemos ajudar?"
 />
 </div>

 {success && (
 <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-medium">
 Mensagem enviada com sucesso! Entraremos em contato em breve.
 </div>
 )}
 {error && (
 <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-sm font-medium">
 {error}
 </div>
 )}
 <button
 type="submit"
 disabled={submitting}
 className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 gradient-theme-cta text-white rounded-xl font-semibold transition-all shadow-lg shadow-theme-primary hover:shadow-xl hover:shadow-theme-glow duration-300 disabled:opacity-50"
 >
 {submitting ? 'Enviando...' : 'Enviar Mensagem'}
 <Send size={18} />
 </button>
 </form>
 </motion.div>

 {/* Contact Info Sidebar */}
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="lg:col-span-2 space-y-6"
 >
 {/* Info Cards */}
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 p-6">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
 Informações de Contato
 </h3>
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
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
 Redes Sociais
 </h3>
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

 {/* Map Placeholder */}
 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 overflow-hidden">
 <div className="p-4">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
 Localização
 </h3>
 </div>
 <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
 <div className="text-center">
 <MapPin className="text-theme-primary mx-auto mb-2" size={32} />
 <p className="text-sm text-gray-500 dark:text-gray-400">
 Google Maps
 </p>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </div>
 </section>
 );
}
