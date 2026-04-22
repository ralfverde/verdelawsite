"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { motion } from "framer-motion";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-verde-950/10 bg-verde-50/50 text-verde-950 text-sm placeholder:text-verde-950/30 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 focus:bg-white outline-none transition-all duration-200";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-verde-950/[0.04]">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <CheckCircle2 className="text-verde-500 w-16 h-16 mb-4" />
          </motion.div>
          <h3 className="text-xl font-heading text-verde-950 mb-2">
            {t("successTitle")}
          </h3>
          <p className="text-sm text-verde-950/50">{t("successBody")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-verde-950/[0.04]">
      <form
        className="grid gap-5"
        onSubmit={handleSubmit}
        aria-label={t("ariaLabel")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-verde-950 mb-2"
            >
              {t("fields.name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={inputClass}
              placeholder="Maria García"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-verde-950 mb-2"
            >
              {t("fields.phone")}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className={inputClass}
              placeholder="(305) 555-0100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-verde-950 mb-2"
          >
            {t("fields.email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="caseType"
            className="block text-sm font-medium text-verde-950 mb-2"
          >
            {t("fields.caseType")}
          </label>
          <select id="caseType" name="caseType" className={inputClass}>
            {[
              "deportation",
              "asylum",
              "bond",
              "family",
              "vawa",
              "citizenship",
              "other",
            ].map((v) => (
              <option key={v} value={v}>
                {t(`caseTypes.${v}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-verde-950 mb-2"
          >
            {t("fields.message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`${inputClass} min-h-[120px] resize-y`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-2 bg-gradient-to-r from-gold-500 to-gold-400 text-verde-950 font-semibold py-4 rounded-lg hover:shadow-lg hover:shadow-gold-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:translate-y-0 inline-flex items-center justify-center gap-2"
        >
          <Send size={16} /> {submitting ? t("submitting") : t("submit")}
        </button>

        <p className="text-xs text-verde-950/30 leading-relaxed">{t("legal")}</p>
      </form>
    </div>
  );
}
