"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { container, child } from "@/lib/animations";

export function SocialProof() {
  const t = useTranslations("socialProof");

  const items = [
    { key: "cases", value: 600, suffix: "+" },
    { key: "states", value: 50, suffix: "" },
    { key: "revenue", value: 2, prefix: "$", suffix: "M+" },
    { key: "tiktok", value: 61, suffix: "K+" },
    { key: "rating", value: 4.8, decimals: 1, isRating: true },
  ];

  return (
    <section className="bg-[var(--cream)] text-[var(--verde-950)]">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="container-wide py-16 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.key}
            variants={child}
            className={`text-center md:text-left ${
              i < items.length - 1 ? "md:border-r md:border-black/10 md:pr-6" : ""
            }`}
          >
            <div className="font-display text-[var(--verde-800)] leading-none" style={{ fontSize: "clamp(34px, 4vw, 54px)" }}>
              {item.isRating ? (
                <span className="inline-flex items-center gap-2">
                  <CountUp value={item.value} decimals={1} />
                  <Star size={22} className="text-[var(--gold-500)] fill-[var(--gold-500)]" />
                </span>
              ) : (
                <CountUp
                  value={item.value}
                  prefix={item.prefix ?? ""}
                  suffix={item.suffix ?? ""}
                />
              )}
            </div>
            <p className="mt-2 text-sm text-[var(--text-dark-secondary)]">
              {t(item.key)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
