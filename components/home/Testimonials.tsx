"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp } from "@/lib/animations";
import { testimonialIds } from "@/data/testimonials";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [index, setIndex] = useState(0);
  const ids = testimonialIds;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ids.length), 6000);
    return () => clearInterval(id);
  }, [ids.length]);

  const visible = [0, 1, 2].map((offset) => ids[(index + offset) % ids.length]);

  return (
    <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="container-wide">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <h2 className="mt-3 font-display" style={{ fontSize: "clamp(32px,4vw,56px)", lineHeight: 1.06 }}>
          {t("title")}
        </h2>
        <GoldAccentLine className="mt-5" />
      </motion.div>

      <div className="container-wide mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((id, i) => (
              <motion.article
                key={`${id}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`card-light p-7 flex flex-col gap-4 ${i > 0 ? "hidden md:flex" : ""}`}
              >
                <Quote className="text-[var(--gold-500)]" size={34} />
                <p className="italic text-[var(--text-dark)] text-[17px] leading-relaxed flex-1">
                  &ldquo;{t(`items.${id}.quote`)}&rdquo;
                </p>
                <div className="flex gap-0.5 text-[var(--gold-500)]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
                <div className="pt-3 border-t border-black/10">
                  <p className="font-semibold text-sm">{t(`items.${id}.name`)}</p>
                  <p className="text-xs text-[var(--text-dark-secondary)] mt-0.5">
                    {t(`items.${id}.case`)}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + ids.length) % ids.length)}
            aria-label={t("prev")}
            className="grid place-items-center rounded-full border border-black/15 w-10 h-10 hover:bg-[var(--verde-800)] hover:text-white hover:border-[var(--verde-800)] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2" aria-label="Pagination">
            {ids.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-[var(--verde-800)]" : "w-2 bg-black/20"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % ids.length)}
            aria-label={t("next")}
            className="grid place-items-center rounded-full border border-black/15 w-10 h-10 hover:bg-[var(--verde-800)] hover:text-white hover:border-[var(--verde-800)] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
