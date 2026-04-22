"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, FileText, Package2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services, categoryOrder, type ServiceCategory } from "@/data/services";
import { iconMap } from "./iconMap";
import { easeOut } from "@/lib/animations";

export function PracticeTabs() {
  const t = useTranslations("practiceAreasPage");
  const tSvc = useTranslations("services");
  const locale = useLocale() as "en" | "es";
  const [active, setActive] = useState<ServiceCategory | "all">("all");

  const tabs: { id: ServiceCategory | "all"; label: string; count: number }[] = [
    { id: "all", label: t("tabs.all"), count: services.length },
    ...categoryOrder.map((c) => ({
      id: c,
      label: t(`tabs.${c}`),
      count: services.filter((s) => s.category === c).length,
    })),
  ];

  const filtered = active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <section className="bg-cream text-verde-950">
      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-30 bg-cream/95 backdrop-blur-md border-y border-verde-950/5">
        <div className="container-wide py-4">
          <div
            role="tablist"
            aria-label="Practice area categories"
            className="flex gap-2 md:gap-1 md:flex-wrap md:justify-center overflow-x-auto scrollbar-hide -mx-2 px-2"
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
                  className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 ${
                    isActive
                      ? "bg-verde-950 text-white border-verde-950 shadow-sm"
                      : "bg-transparent border-verde-950/10 text-verde-950/50 hover:border-verde-950/20 hover:text-verde-950/80"
                  }`}
                >
                  <span className="relative z-10">
                    {tab.label}
                    <span
                      className={`text-xs ml-1.5 ${
                        isActive ? "text-white/50" : "text-verde-950/30"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-wide pt-10 pb-16 md:pb-20">
        {/* Category description (only shown when filtered) */}
        <AnimatePresence mode="wait">
          {active !== "all" && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="mb-8 p-6 rounded-xl bg-verde-50 border border-verde-100"
            >
              <h3 className="text-lg font-heading text-verde-950 mb-1">
                {t(`tabs.${active}`)}
              </h3>
              <p className="text-sm text-verde-950/50">
                {filtered.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => {
              const Icon = iconMap[s.icon] ?? FileText;
              const isPackage = s.id.endsWith("-package");

              return (
                <motion.div
                  layout
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.05,
                    ease: easeOut,
                  }}
                >
                  <Link
                    href={`/practice-areas/${s.slug[locale]}` as never}
                    className="group relative flex flex-col h-full bg-white rounded-xl border border-verde-950/[0.06] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-verde-950/[0.04] hover:border-gold-500/20"
                  >
                    {isPackage && (
                      <span
                        aria-hidden
                        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gold-500/10 grid place-items-center"
                      >
                        <Package2 size={14} className="text-gold-600" />
                      </span>
                    )}

                    {/* Icon */}
                    <div className="w-11 h-11 rounded-lg bg-verde-50 grid place-items-center mb-5">
                      <Icon className="text-verde-700" size={20} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-heading text-verde-950 group-hover:text-verde-800 transition-colors duration-300 mb-2">
                      {tSvc(`${s.id}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-verde-950/50 leading-relaxed mb-5 line-clamp-3">
                      {tSvc(`${s.id}.short`)}
                    </p>

                    {/* Bottom: arrow */}
                    <div className="mt-auto flex items-center justify-end pt-4 border-t border-verde-950/[0.06]">
                      <span className="w-8 h-8 rounded-full bg-verde-50 grid place-items-center transition-colors duration-200 group-hover:bg-gold-500">
                        <ArrowRight
                          size={16}
                          className="text-verde-700 transition-colors duration-200 group-hover:text-verde-950"
                        />
                      </span>
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
