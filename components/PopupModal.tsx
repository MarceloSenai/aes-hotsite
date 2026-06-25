'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { popupService, type PopupRow } from '@/lib/services/data-service';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Retorna true se "agora" está dentro do período configurado (datas opcionais). */
function isWithinPeriod(popup: PopupRow, now: number): boolean {
  if (popup.start_date) {
    const start = new Date(popup.start_date).getTime();
    if (!Number.isNaN(start) && now < start) return false;
  }
  if (popup.end_date) {
    // end_date é inclusivo do dia inteiro
    const end = new Date(popup.end_date).getTime() + DAY_MS;
    if (!Number.isNaN(end) && now > end) return false;
  }
  return true;
}

export default function PopupModal() {
  const [popup, setPopup] = useState<PopupRow | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const all = await popupService.getAll();
      if (cancelled || !all.length) return;

      const now = Date.now();
      const candidate = all.find(
        (p) =>
          p.enabled &&
          p.image_path &&
          isWithinPeriod(p, now) &&
          !localStorage.getItem(`aes-popup-seen-${p.id}`)
      );

      if (candidate) setPopup(candidate);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClose = () => {
    if (popup) {
      try {
        localStorage.setItem(`aes-popup-seen-${popup.id}`, '1');
      } catch {
        /* ignore */
      }
    }
    setPopup(null);
  };

  return (
    <AnimatePresence>
      {popup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={popup.title || 'Aviso'}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative max-w-[90vw] max-h-[90vh] sm:max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              aria-label="Fechar"
              className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white text-gray-700 shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>

            {popup.link_url ? (
              <a href={popup.link_url} target="_blank" rel="noopener noreferrer" onClick={handleClose}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={popup.image_path}
                  alt={popup.title || 'Aviso'}
                  className="block w-full h-auto max-h-[90vh] rounded-xl shadow-2xl object-contain"
                />
              </a>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={popup.image_path}
                alt={popup.title || 'Aviso'}
                className="block w-full h-auto max-h-[90vh] rounded-xl shadow-2xl object-contain"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
