"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp, easeOut } from "@/lib/animations";
import { testimonialIds } from "@/data/testimonials";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ids = testimonialIds;

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ids.length), 6000);
    return () => clearInterval(id);
  }, [ids.length, paused]);

  const visible = [0, 1, 2].map((offset) => ids[(index + offset) % ids.length]);

  return (
    <section className="bg-cream text-verde-950 section-y">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="container-wide"
      >
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2
          className="mt-3 font-heading"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.06 }}
        >
          {t("title")}
        </h2>
        <GoldAccentLine className="mt-5" />
      </motion.div>

      <div
        className="container-wide mt-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((id, i) => (
              <motion.article
                key={`${id}-${index}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeOut }}
                className={`relative bg-white rounded-2xl p-8 md:p-10 shadow-sm ${i > 0 ? "hidden md:block" : ""}`}
              >
                <span
                  className="absolute -top-2 left-6 text-6xl font-heading text-gold-500/20 leading-none select-none"
                  aria-hidden
                >
                  &ldquo;
                </span>

                <p className="relative text-quote text-verde-950 mb-6">
                  {t(`items.${id}.quote`)}
                </p>

                <div className="flex gap-1 text-gold-500 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <div>
                  <p className="text-sm font-semibold text-verde-950">
                    {t(`items.${id}.name`)}
                  </p>
                  <p className="text-sm text-verde-950/50">{t(`items.${id}.case`)}</p>
                </div>

                <div className="w-12 h-[2px] bg-gold-500 mt-6" aria-hidden />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + ids.length) % ids.length)}
            aria-label={t("prev")}
            className="w-10 h-10 rounded-full border border-verde-950/10 grid place-items-center hover:bg-verde-50 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {ids.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-gold-500" : "w-2 bg-verde-950/20"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % ids.length)}
            aria-label={t("next")}
            className="w-10 h-10 rounded-full border border-verde-950/10 grid place-items-center hover:bg-verde-50 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
