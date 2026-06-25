'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { popupService } from '@/lib/services/data-service';
import { POPUP_CONFIG } from '@/lib/config/popup';

const DAY_MS = 24 * 60 * 60 * 1000;

interface Candidate {
  id: string;
  image: string;
  link: string | null;
  start: string | null;
  end: string | null;
}

/** Retorna true se "agora" está dentro do período (datas opcionais; fim inclusivo). */
function isWithinPeriod(c: Candidate, now: number): boolean {
  if (c.start) {
    const start = new Date(c.start).getTime();
    if (!Number.isNaN(start) && now < start) return false;
  }
  if (c.end) {
    const end = new Date(c.end).getTime() + DAY_MS;
    if (!Number.isNaN(end) && now > end) return false;
  }
  return true;
}

export default function PopupModal() {
  const [popup, setPopup] = useState<Candidate | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 1) Tenta os popups cadastrados no admin (banco). Têm prioridade.
      const rows = await popupService.getAll();
      let candidates: Candidate[] = rows
        .filter((p) => p.enabled && p.image_path)
        .map((p) => ({
          id: p.id,
          image: p.image_path,
          link: p.link_url,
          start: p.start_date,
          end: p.end_date,
        }));

      // 2) Fallback: configuração no código (modo sem banco).
      if (candidates.length === 0 && POPUP_CONFIG.enabled && POPUP_CONFIG.image) {
        candidates = [
          {
            id: `config-${POPUP_CONFIG.version}`,
            image: POPUP_CONFIG.image,
            link: POPUP_CONFIG.link || null,
            start: POPUP_CONFIG.startDate || null,
            end: POPUP_CONFIG.endDate || null,
          },
        ];
      }

      if (cancelled) return;

      const now = Date.now();
      const chosen = candidates.find(
        (c) => isWithinPeriod(c, now) && !localStorage.getItem(`aes-popup-seen-${c.id}`)
      );

      if (chosen) setPopup(chosen);
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
          aria-label="Aviso"
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

            {popup.link ? (
              <a href={popup.link} target="_blank" rel="noopener noreferrer" onClick={handleClose}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={popup.image}
                  alt="Aviso"
                  className="block w-full h-auto max-h-[90vh] rounded-xl shadow-2xl object-contain"
                />
              </a>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={popup.image}
                alt="Aviso"
                className="block w-full h-auto max-h-[90vh] rounded-xl shadow-2xl object-contain"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
