'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  // O valor enviado é lido do próprio input, não do estado: gerenciadores de
  // senha e o autofill do navegador escrevem direto no DOM sem disparar o
  // onChange do React, então o estado ficava vazio enquanto o campo exibia a
  // senha inteira — e o login respondia 401 com a senha correta na tela.
  const senhaRef = useRef<HTMLInputElement>(null);
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      const valor = senhaRef.current?.value ?? senha;

      if (!valor.trim()) {
        setError('Informe a senha de administrador.');
        return;
      }

      setLoading(true);
      try {
        const res = await fetch('/api/auth/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ senha: valor }),
        });

        if (res.status === 429) {
          setError('Muitas tentativas. Aguarde alguns minutos e tente novamente.');
          return;
        }

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok) {
          router.push('/admin');
          router.refresh();
          return;
        }
        setError(data.error || 'Senha inválida.');
      } catch {
        setError('Erro de conexão. Tente novamente.');
      } finally {
        setLoading(false);
      }
    },
    [senha, router]
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark), var(--color-secondary-dark))',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: 'var(--color-secondary-light)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-black/20 p-8 sm:p-10">
          {/* Logo + heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-16 h-16 mb-4">
              <Image
                src="/images/aes-logo.png"
                alt="AES"
                fill
                className="object-contain"
                style={{ filter: 'none' }}
                priority
              />
            </div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <ShieldCheck size={22} style={{ color: 'var(--color-primary)' }} />
              Painel Administrativo
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Acesso restrito
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            >
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Senha
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <input
                  id="senha"
                  ref={senhaRef}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite a senha de administrador"
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ '--tw-ring-color': 'var(--color-primary)' } as React.CSSProperties}
                  autoComplete="current-password"
                  autoFocus
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold text-sm shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background:
                  'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))',
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  Acessar painel
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to site link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
            Voltar ao site
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
