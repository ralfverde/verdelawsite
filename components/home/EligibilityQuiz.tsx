"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronLeft, MessageCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FIRM } from "@/lib/constants";
import { services } from "@/data/services";
import { iconMap } from "@/components/practice/iconMap";
import { useBooking } from "@/context/BookingContext";

type SituationKey = "court" | "detained" | "asylum" | "family" | "work" | "unsure";

// Question structure lives in code (stable identifiers); text lives in
// translations. Adding/removing a question or option means updating both.
const STEPS = [
  {
    id: "situation",
    options: ["court", "detained", "asylum", "family", "work", "unsure"],
  },
  { id: "location", options: ["inside", "outside", "familyDetained"] },
  { id: "priorCounsel", options: ["first", "secondOpinion", "switching"] },
  { id: "urgency", options: ["immediate", "weeks", "exploring"] },
] as const;

type StepId = (typeof STEPS)[number]["id"];

// Q1 answer → up to 3 recommended service IDs from data/services.ts
const RECOMMENDATIONS: Record<SituationKey, string[]> = {
  court: ["deportation-defense", "cancellation-of-removal"],
  detained: ["deportation-detained", "bond-hearing"],
  asylum: ["asylum", "credible-fear-interview"],
  family: ["family-package", "family-petitions", "adjustment-of-status"],
  work: ["work-permit", "naturalization"],
  unsure: ["deportation-defense", "asylum", "family-package"],
};

export function EligibilityQuiz() {
  const t = useTranslations("quiz");
  const tSvc = useTranslations("services");
  const locale = useLocale() as "en" | "es";
  const { openBooking } = useBooking();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<StepId, string>>>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalSteps = STEPS.length;
  const isResults = step >= totalSteps;
  const currentStep = !isResults ? STEPS[step] : null;

  function selectOption(option: string) {
    if (!currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: option }));
    setDirection(1);
    setStep((s) => s + 1);
  }

  function goBack() {
    if (step === 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
  }

  function restart() {
    setDirection(-1);
    setAnswers({});
    setStep(0);
  }

  const situation = answers.situation as SituationKey | undefined;
  const recommendedIds = situation
    ? RECOMMENDATIONS[situation]
    : RECOMMENDATIONS.unsure;
  const recommendedServices = recommendedIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div
      className="bg-verde-900 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto border border-white/[0.06] shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
      role="region"
      aria-label={t("sectionEyebrow")}
    >
      {/* Progress dots */}
      <div
        className="flex gap-2 mb-8"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={Math.min(step + 1, totalSteps)}
        aria-label={t("progressLabel", {
          current: Math.min(step + 1, totalSteps),
          total: totalSteps,
        })}
      >
        {Array.from({ length: totalSteps }).map((_, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <span
              key={i}
              aria-hidden
              className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
                done
                  ? "bg-gold-500"
                  : current
                  ? "bg-gold-500/50"
                  : "bg-white/10"
              }`}
            />
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {currentStep ? (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl md:text-2xl font-heading text-white mb-8 leading-snug">
              {t(`questions.${currentStep.id}.question`)}
            </h3>

            <div className="grid grid-cols-1 gap-3" role="radiogroup">
              {currentStep.options.map((option) => {
                const selected = answers[currentStep.id] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => selectOption(option)}
                    className={`flex items-center justify-between gap-4 px-5 py-4 rounded-xl border text-left text-sm cursor-pointer transition-all duration-200 ${
                      selected
                        ? "border-gold-500 bg-gold-500/10 text-white"
                        : "border-white/[0.08] bg-white/[0.03] text-white/80 hover:border-gold-500/30 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{t(`questions.${currentStep.id}.options.${option}`)}</span>
                    {selected && (
                      <Check size={18} className="text-gold-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="mt-6 inline-flex items-center gap-1 text-sm text-white/30 hover:text-white/60 transition-colors"
              >
                <ChevronLeft size={14} /> {t("back")}
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl md:text-2xl font-heading text-white mb-6 leading-snug">
              {t("results.heading")}
            </h3>

            <ul className="space-y-3 mb-6">
              {recommendedServices.map((s) => {
                const Icon = iconMap[s.icon] ?? iconMap.Shield;
                return (
                  <li key={s.id}>
                    <Link
                      href={`/practice-areas/${s.slug[locale]}` as never}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-gold-500/20 hover:bg-white/[0.06] transition-all"
                    >
                      <span className="w-10 h-10 shrink-0 rounded-lg bg-gold-500/10 grid place-items-center">
                        <Icon className="text-gold-500" size={18} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {tSvc(`${s.id}.title`)}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        className="text-gold-500/70 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              {t("results.body")}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <button
                type="button"
                onClick={openBooking}
                className="cta-gold justify-center flex-1 sm:flex-initial"
              >
                {t("results.ctaPrimary")}
              </button>
              <a
                href={FIRM.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-outline justify-center"
              >
                <MessageCircle size={16} /> {t("results.ctaWhatsApp")}
              </a>
            </div>

            <p className="text-xs text-white/25 mt-6 leading-relaxed">
              {t("results.disclaimer")}
            </p>

            <button
              type="button"
              onClick={restart}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              <RotateCcw size={12} /> {t("restart")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
