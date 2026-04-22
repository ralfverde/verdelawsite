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
  prefix?: string;
  suffix?: string;
  decimals?: number;
  isRating?: boolean;
};

const stats: Stat[] = [
  { key: "cases", value: 1000, suffix: "+" },
  { key: "states", value: 50 },
  { key: "tiktok", value: 61, suffix: "K+" },
  { key: "rating", value: 4.9, decimals: 1, isRating: true },
];

export function SocialProof() {
  const t = useTranslations("socialProof");

  return (
    <section className="bg-gradient-to-b from-[#FAF8F2] to-[#F4F0E6] text-verde-950">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-y-10 gap-x-4 max-w-6xl mx-auto items-center text-center">
          {stats.map((stat, i) => (
            <Fragment key={stat.key}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: easeOut }}
              >
                <div className="text-stat text-verde-900 leading-none">
                  {stat.isRating ? (
                    <span className="inline-flex items-baseline gap-2">
                      <CountUp value={stat.value} decimals={1} />
                      <Star size={24} className="text-gold-500 fill-gold-500 translate-y-[-4px]" />
                    </span>
                  ) : (
                    <>
                      {stat.prefix && <span className="text-gold-500">{stat.prefix}</span>}
                      <CountUp value={stat.value} />
                      {stat.suffix && <span className="text-gold-500">{stat.suffix}</span>}
                    </>
                  )}
                </div>
                <p className="text-sm text-verde-900/50 mt-2">{t(stat.key)}</p>
              </motion.div>
              {i < stats.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:block w-px h-16 bg-verde-900/10 justify-self-center"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
