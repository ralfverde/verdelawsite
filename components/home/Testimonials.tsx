"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { fadeUp } from "@/lib/animations";
import { testimonials } from "@/data/testimonials";

/**
 * Testimonials carousel.
 *
 * One card per testimonial, rendered exactly once in the DOM — no
 * cloning, no sliding-window overlap. Cards sit in a horizontal
 * snap-scroll container: the browser handles swipe/drag on mobile,
 * arrow buttons step through on desktop. Pagination dots track
 * which card is currently centered via IntersectionObserver, so the
 * dot count always matches the real testimonial count (15).
 */
export function Testimonials() {
  const t = useTranslations("testimonials");
  const count = testimonials.length;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);

  // Track which card is in view as the user scrolls. Whichever card
  // intersects most, wins the active-dot assignment.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = Number(
            (visible[0].target as HTMLElement).dataset.index ?? 0,
          );
          setActive(idx);
        }
      },
      { root: scroller, threshold: [0.5, 0.75, 1] },
    );
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollToIndex(i: number) {
    const target = itemRefs.current[i];
    if (target && scrollerRef.current) {
      scrollerRef.current.scrollTo({
        left:
          target.offsetLeft -
          scrollerRef.current.offsetLeft -
          (scrollerRef.current.clientWidth - target.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }

  function prev() {
    scrollToIndex(Math.max(0, active - 1));
  }
  function next() {
    scrollToIndex(Math.min(count - 1, active + 1));
  }

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

      <div
        ref={scrollerRef}
        className="mt-10 md:mt-12 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-[max(1.25rem,calc((100vw-1280px)/2))]"
      >
        {testimonials.map((item, i) => (
          <article
            key={item.id}
            data-index={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative flex flex-col bg-white rounded-2xl p-6 md:p-8 shadow-sm shrink-0 w-[85vw] sm:w-[420px] snap-center"
          >
            <span
              aria-hidden
              className="absolute -top-2 left-6 text-6xl font-heading text-gold-500/20 leading-none select-none"
            >
              &ldquo;
            </span>

            <div className="flex items-center gap-0.5 mb-4">
              {Array.from({ length: item.stars }).map((_, j) => (
                <Star
                  key={j}
                  className="w-4 h-4 fill-gold-500 text-gold-500"
                />
              ))}
            </div>

            <p className="relative text-base md:text-lg text-verde-950/80 leading-relaxed mb-6 flex-1">
              {item.quote}
            </p>

            <div>
              <p className="text-sm font-semibold text-verde-950">
                {item.name}
              </p>
              <p className="mt-1 text-[11px] tracking-wide text-verde-950/25 font-body">
                Google Review
              </p>
            </div>

            <div aria-hidden className="w-12 h-[2px] bg-gold-500 mt-6" />
          </article>
        ))}
      </div>

      {/* Controls */}
      <div className="container-wide mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          aria-label={t("prev")}
          disabled={active === 0}
          className="w-10 h-10 rounded-full border border-verde-950/10 grid place-items-center hover:bg-verde-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-gold-500" : "w-2 bg-verde-950/20"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label={t("next")}
          disabled={active === count - 1}
          className="w-10 h-10 rounded-full border border-verde-950/10 grid place-items-center hover:bg-verde-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
