"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { easeOut } from "@/lib/animations";

type Stat = {
  key: string;
  value: number;
  suffix?: string;
  decimals?: number;
  isRating?: boolean;
};

const stats: Stat[] = [
  { key: "cases", value: 1000, suffix: "+" },
  { key: "states", value: 50 },
  { key: "tiktok", value: 98, suffix: "K+" },
  { key: "rating", value: 4.9, decimals: 1, isRating: true },
];

export function SocialProof() {
  const t = useTranslations("socialProof");

  return (
    <section className="bg-gradient-to-b from-[#FAF8F2] to-[#F4F0E6] text-verde-950">
      <div className="container-wide py-10 md:py-14">
        {/* Mobile: 2×2 grid. Desktop: single horizontal row with
            vertical dividers between each stat. whitespace-nowrap +
            flex-shrink-0 keep every number on one line at every width. */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 md:flex md:items-center md:justify-center md:gap-10 lg:gap-14 max-w-6xl mx-auto text-center">
          {stats.map((stat, i) => (
            <Fragment key={stat.key}>
              {i > 0 && (
                <div
                  aria-hidden
                  className="hidden md:block w-px h-16 bg-verde-900/10 shrink-0"
                />
              )}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: easeOut }}
                className="shrink-0"
              >
                <div className="text-stat text-verde-900 leading-none whitespace-nowrap">
                  {stat.isRating ? (
                    <span className="inline-flex items-baseline">
                      <CountUp value={stat.value} decimals={1} />
                      <Star
                        size={24}
                        className="ml-2 text-gold-500 fill-gold-500 translate-y-[-4px]"
                      />
                    </span>
                  ) : (
                    <>
                      <CountUp value={stat.value} />
                      {stat.suffix && (
                        <span className="ml-0.5 text-gold-500">
                          {stat.suffix}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <p className="mt-2 text-sm text-verde-900/50 whitespace-nowrap">
                  {t(stat.key)}
                </p>
              </motion.div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
