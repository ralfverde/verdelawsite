"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { guides, type Guide } from "@/data/guides";
import GuideOptInModal from "./GuideOptInModal";

type Props = {
  locale: "en" | "es";
};

/**
 * Renders the 6 guide cards in a 2-col (mobile) / 3-col (tablet+)
 * grid. Each card is a gradient placeholder card until real cover
 * images are delivered; the grid stays the same shape either way.
 * Clicking any card opens the GuideOptInModal, which captures the
 * lead and then triggers the PDF download.
 */
export default function GuidesGrid({ locale }: Props) {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const isEN = locale === "en";

  return (
    <>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {guides.map((guide) => (
          <motion.button
            key={guide.id}
            type="button"
            onClick={() => setSelectedGuide(guide)}
            className="group text-left cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            aria-label={
              isEN
                ? `Download: ${guide.title.en}`
                : `Descargar: ${guide.title.es}`
            }
          >
            {/* Cover (placeholder) */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-verde-950/[0.06] shadow-sm group-hover:shadow-xl group-hover:shadow-verde-950/[0.06] group-hover:-translate-y-2 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-verde-800 via-verde-900 to-verde-950 flex flex-col justify-between p-5">
                <p className="text-white/20 text-[10px] font-heading font-semibold tracking-widest uppercase">
                  Verde Law
                </p>

                <div>
                  <div aria-hidden className="w-8 h-[2px] bg-gold-500/50 mb-3" />
                  <h4 className="font-heading font-bold text-white text-base leading-tight">
                    {guide.title[locale]}
                  </h4>
                  <p className="text-white/30 text-xs mt-2 font-body">
                    {isEN ? "Free Guide" : "Guía Gratuita"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    aria-hidden
                    className="w-6 h-6 rounded-full border border-gold-500/30 flex items-center justify-center"
                  >
                    <Download className="w-3 h-3 text-gold-500/50" />
                  </div>
                  <span className="text-white/15 text-[10px] font-body">
                    PDF
                  </span>
                </div>
              </div>

              {/* Hover scrim + download icon */}
              <div className="absolute inset-0 bg-verde-950/0 group-hover:bg-verde-950/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center shadow-lg">
                    <Download className="w-5 h-5 text-verde-950" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-heading font-semibold text-verde-950 text-sm tracking-tight group-hover:text-verde-700 transition-colors line-clamp-2">
                {guide.title[locale]}
              </h3>
              <p className="font-body text-xs text-verde-950/40 mt-1 line-clamp-2">
                {guide.description[locale]}
              </p>
            </div>

            <span className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-verde-950 text-white text-xs font-heading font-semibold group-hover:bg-verde-900 transition-colors">
              <Download className="w-3.5 h-3.5" aria-hidden />
              {isEN ? "Download Guide" : "Descargar Guía"}
            </span>
          </motion.button>
        ))}
      </motion.div>

      <GuideOptInModal
        isOpen={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
        guideTitle={selectedGuide?.title[locale] ?? ""}
        guidePdfUrl={selectedGuide?.pdf ?? ""}
        locale={locale}
      />
    </>
  );
}
