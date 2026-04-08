'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Image as ImageIcon,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';
import { galeriaService, getPublicUrl } from '@/lib/supabase/data-service';
import { SkeletonGrid } from '@/components/ui/Skeleton';

interface GaleriaFoto {
  id: string;
  titulo: string;
  descricao?: string;
  categoria: string;
  image_path?: string;
  imageUrl?: string;
}

const placeholderGradients = [
  'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))',
  'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark))',
  'linear-gradient(to bottom right, #2dd4bf, #06b6d4)',
  'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-light))',
  'linear-gradient(to bottom right, var(--color-primary-light), var(--color-primary))',
  'linear-gradient(to bottom right, var(--color-secondary), var(--color-primary))',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export default function GaleriaPage() {
  const [photos, setPhotos] = useState<GaleriaFoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await galeriaService.getAll();
        const mapped: GaleriaFoto[] = (data as any[]).map((row: any) => ({
          ...row,
          imageUrl: row.image_path ? getPublicUrl('aes-galeria', row.image_path) : undefined,
        }));
        setPhotos(mapped);
      } catch (error) {
        console.error('Failed to load galeria:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Build categories from config data
  const categorySet = Array.from(new Set(photos.map((p) => p.categoria)));
  const categories = [
    { id: 'todos', label: 'Todos', count: photos.length },
    ...categorySet.map((cat) => ({
      id: cat,
      label: cat,
      count: photos.filter((p) => p.categoria === cat).length,
    })),
  ];

  const filteredPhotos =
    activeCategory === 'todos'
      ? photos
      : photos.filter((p) => p.categoria === activeCategory);

  const selectedIndex = selectedPhoto !== null
    ? filteredPhotos.findIndex((p) => p.id === selectedPhoto)
    : -1;

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedPhoto(filteredPhotos[selectedIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (selectedIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[selectedIndex + 1].id);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark), var(--color-primary-dark))" }}>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-theme-primary-20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-theme-primary-20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/20">
              Nossos Momentos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Galeria de Fotos
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Confira os melhores momentos dos eventos, núcleos de lazer e atividades esportivas da AES SENAI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      {categories.length > 1 && (
        <section className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Filter size={18} className="text-gray-400 flex-shrink-0 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 text-xs ${
                      activeCategory === cat.id ? 'text-white/60' : 'text-gray-400'
                    }`}
                  >
                    ({cat.count})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo Grid */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? <SkeletonGrid count={6} /> : (<>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredPhotos.map((photo, idx) => {
                const colorIndex = idx % placeholderGradients.length;
                return (
                  <motion.div
                    key={photo.id}
                    variants={cardVariants}
                    layout
                    className="group cursor-pointer"
                    onClick={() => setSelectedPhoto(photo.id)}
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {/* Photo or placeholder gradient */}
                      {photo.imageUrl ? (
                        <Image
                          src={photo.imageUrl}
                          alt={photo.titulo}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          unoptimized
                        />
                      ) : (
                        <>
                          <div
                            className="absolute inset-0"
                            style={{ background: placeholderGradients[colorIndex] }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Camera
                              className="text-white/30"
                              size={48}
                              strokeWidth={1}
                            />
                          </div>
                        </>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <ZoomIn className="text-white" size={24} />
                          </div>
                        </div>
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          {photo.categoria}
                        </span>
                      </div>

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-12">
                        <h3 className="text-white font-semibold text-sm">
                          {photo.titulo}
                        </h3>
                        {photo.descricao && (
                          <p className="text-white/70 text-xs mt-0.5">
                            {photo.descricao}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredPhotos.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ImageIcon className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                Nenhuma foto nesta categoria
              </h3>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                Fotos podem ser adicionadas pelo painel administrativo.
              </p>
            </motion.div>
          )}
          </>)}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && selectedIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Prev button */}
            {selectedIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <ChevronLeft className="text-white" size={28} />
              </button>
            )}

            {/* Next button */}
            {selectedIndex < filteredPhotos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <ChevronRight className="text-white" size={28} />
              </button>
            )}

            {/* Image content */}
            <motion.div
              key={selectedPhoto}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo or placeholder gradient */}
              {filteredPhotos[selectedIndex].imageUrl ? (
                <Image
                  src={filteredPhotos[selectedIndex].imageUrl}
                  alt={filteredPhotos[selectedIndex].titulo}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  unoptimized
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ background: placeholderGradients[selectedIndex % placeholderGradients.length] }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="text-white/20" size={96} strokeWidth={1} />
                  </div>
                </>
              )}

              {/* Info bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16">
                <h3 className="text-white text-xl font-bold">
                  {filteredPhotos[selectedIndex].titulo}
                </h3>
                {filteredPhotos[selectedIndex].descricao && (
                  <p className="text-white/70 mt-1">
                    {filteredPhotos[selectedIndex].descricao}
                  </p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                    {filteredPhotos[selectedIndex].categoria}
                  </span>
                  <span className="text-white/50 text-sm">
                    {selectedIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
