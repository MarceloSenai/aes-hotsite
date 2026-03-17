'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Zap, Globe, Award, TrendingUp } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: BookOpen,
      title: 'Currículo Atualizado',
      description: 'Conteúdos alinhados com as demandas do mercado atual',
    },
    {
      icon: Users,
      title: 'Docentes Especializados',
      description: 'Professores com experiência prática e acadêmica',
    },
    {
      icon: Zap,
      title: 'Metodologia Inovadora',
      description: 'Ensino prático e teórico integrado',
    },
    {
      icon: Globe,
      title: 'Parcerias Estratégicas',
      description: 'Networking com empresas e instituições reconhecidas',
    },
    {
      icon: Award,
      title: 'Certificações Reconhecidas',
      description: 'Diplomas válidos no mercado nacional',
    },
    {
      icon: TrendingUp,
      title: 'Desenvolvimento de Carreira',
      description: 'Apoio contínuo para crescimento profissional',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Por Que Escolher a AES
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Diferenciais que garantem uma formação de excelência
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                  <Icon className="text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
