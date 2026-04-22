"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp } from "@/lib/animations";
import { testimonials } from "@/data/testimonials";

/**
 * Paginated testimonial carousel.
 *
 * Shows 3 cards per page on desktop, 2 on tablet, 1 on mobile. Total
 * pages = ceil(15 / cardsPerPage), so dot count is always accurate and
 * a visitor never sees the same review twice in the same session. No
 * cloning, no sliding window. Auto-advances every 6s; user clicks
 * reset the advance cycle naturally because the timer re-subscribes
 * when currentPage updates.
 */
export function Testimonials() {
  const t = useTranslations("testimonials");
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setCardsPerPage(1);
      else if (window.innerWidth < 1024) setCardsPerPage(2);
      else setCardsPerPage(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  // Clamp currentPage if the breakpoint change shrank totalPages.
  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(totalPages - 1);
  }, [currentPage, totalPages]);

  const currentCards = testimonials.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage,
  );

  function goToPage(page: number) {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(id);
  }, [totalPages]);

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
        <h2 className="mt-3">{t("title")}</h2>
        <GoldAccentLine className="mt-5" />
      </motion.div>

      <div className="container-wide mt-10 md:mt-12">
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {currentCards.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl border border-verde-950/[0.04] p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <span
                      aria-hidden
                      className="text-3xl text-gold-500/30 font-heading leading-none"
                    >
                      &ldquo;
                    </span>

                    <div className="flex items-center gap-0.5 mt-2 mb-4">
                      {Array.from({ length: item.stars }).map((_, j) => (
                        <svg
                          key={j}
                          aria-hidden
                          className="w-4 h-4 text-gold-500 fill-gold-500"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="font-body text-sm text-verde-950/70 leading-relaxed">
                      {item.quote}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-verde-950/[0.04]">
                    <p className="font-heading font-semibold text-verde-950 text-sm">
                      {item.name}
                    </p>
                    <p className="text-verde-950/25 text-xs font-body mt-0.5">
                      Google Review
                    </p>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            aria-label={t("prev")}
            className="w-9 h-9 rounded-full border border-verde-950/10 flex items-center justify-center hover:bg-verde-50 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-verde-950" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToPage(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === currentPage}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "w-6 bg-gold-500"
                    : "w-2 bg-verde-950/15 hover:bg-verde-950/25"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            aria-label={t("next")}
            className="w-9 h-9 rounded-full border border-verde-950/10 flex items-center justify-center hover:bg-verde-50 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 text-verde-950" />
          </button>
        </div>
      </div>
    </section>
  );
}
