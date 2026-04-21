"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services, categoryOrder, type ServiceCategory } from "@/data/services";
import { iconMap } from "./iconMap";

export function PracticeTabs() {
  const t = useTranslations("practiceAreasPage");
  const tSvc = useTranslations("services");
  const locale = useLocale() as "en" | "es";
  const [active, setActive] = useState<ServiceCategory | "all">("all");

  const tabs: { id: ServiceCategory | "all"; label: string }[] = [
    { id: "all", label: t("tabs.all") },
    ...categoryOrder.map((c) => ({ id: c, label: t(`tabs.${c}`) })),
  ];

  const filtered = active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
      <div className="container-wide">
        <div
          role="tablist"
          aria-label="Practice area categories"
          className="flex flex-wrap items-center gap-x-1 gap-y-2 pb-4 border-b border-black/10 overflow-x-auto"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActive(tab.id)}
                className="relative px-4 py-2 text-sm font-semibold whitespace-nowrap text-[var(--verde-950)]/70 hover:text-[var(--verde-950)]"
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-2 -bottom-[5px] h-[2px] bg-[var(--gold-500)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => {
              const Icon = iconMap[s.icon] ?? iconMap.Shield;
              return (
                <motion.div
                  layout
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <Link
                    href={`/practice-areas/${s.slug[locale]}` as never}
                    className="card-light p-7 h-full flex flex-col gap-4 hover:-translate-y-1 transition-transform"
                  >
                    <span className="grid place-items-center rounded-lg bg-[var(--verde-800)]/10 text-[var(--gold-600)]" style={{ width: 44, height: 44 }}>
                      <Icon size={20} />
                    </span>
                    <h3 className="font-display text-xl text-[var(--verde-950)]">
                      {tSvc(`${s.id}.title`)}
                    </h3>
                    <p className="text-sm text-[var(--text-dark-secondary)] leading-relaxed flex-1">
                      {tSvc(`${s.id}.short`)}
                    </p>
                    <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                      <span className="font-semibold text-[var(--gold-600)] text-sm">
                        {t("startingAt")} ${s.price.toLocaleString()}
                      </span>
                      <ArrowRight size={16} className="text-[var(--verde-700)]" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
