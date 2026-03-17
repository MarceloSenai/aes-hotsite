'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-850 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-green-200 dark:bg-green-900 rounded-full opacity-20 dark:opacity-10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ top: '10%', left: '-10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 dark:opacity-10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ bottom: '10%', right: '-10%' }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800"
              >
                <GraduationCap size={16} className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Educação Transformadora
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Educação de{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Qualidade para Todos
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                Transformando vidas através de educação profissional inovadora, com currículo atualizado
                e docentes especializados.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/solucoes"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl duration-300"
              >
                Conhecer Soluções
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Fale Conosco
              </Link>
            </div>

            {/* Stats Preview */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">10+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Anos de Histórico</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">5K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Associados</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">50K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Alunos Beneficiados</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative w-full h-full max-h-96 mx-auto">
              {/* Placeholder for illustration/image */}
              <div className="w-full h-96 bg-gradient-to-br from-green-100 dark:from-green-900/20 to-blue-100 dark:to-blue-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800 flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap size={80} className="mx-auto text-green-500 dark:text-green-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Ilustração Educacional
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm mb-2">Descubra Mais</p>
          <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
