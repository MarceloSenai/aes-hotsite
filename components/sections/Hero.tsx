'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16"
      style={{ background: 'linear-gradient(135deg, var(--color-primary-light), rgba(255,255,255,0.6), white)' }}
    >
      {/* Dark mode background */}
      <div className="absolute inset-0 bg-transparent dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{ top: '-10%', left: '-8%', backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 25%, transparent)' }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
          style={{ top: '20%', right: '-5%', backgroundColor: 'color-mix(in srgb, var(--color-primary-light) 20%, transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
            <Image
              src="/images/aes-logo.png"
              alt="AES - Associação dos Empregados do SENAI"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
