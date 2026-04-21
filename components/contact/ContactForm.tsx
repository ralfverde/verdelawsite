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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-light p-10 text-center"
      >
        <CheckCircle2 className="mx-auto text-[var(--verde-600)]" size={48} />
        <h3 className="mt-5 font-display text-2xl">{t("successTitle")}</h3>
        <p className="mt-2 text-[var(--text-dark-secondary)]">{t("successBody")}</p>
      </motion.div>
    );
  }

  return (
    <form
      className="card-light p-7 md:p-8 grid gap-4"
      onSubmit={handleSubmit}
      aria-label={t("ariaLabel")}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <label className="text-sm font-semibold text-[var(--verde-950)]" htmlFor="name">
            {t("fields.name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[var(--verde-950)] focus:border-[var(--verde-700)] outline-none"
          />
        </div>
        <div className="grid gap-1.5">
          <label className="text-sm font-semibold text-[var(--verde-950)]" htmlFor="phone">
            {t("fields.phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[var(--verde-950)] focus:border-[var(--verde-700)] outline-none"
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-[var(--verde-950)]" htmlFor="email">
          {t("fields.email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[var(--verde-950)] focus:border-[var(--verde-700)] outline-none"
        />
      </div>
      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-[var(--verde-950)]" htmlFor="caseType">
          {t("fields.caseType")}
        </label>
        <select
          id="caseType"
          name="caseType"
          className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[var(--verde-950)] focus:border-[var(--verde-700)] outline-none"
        >
          {["deportation", "asylum", "bond", "family", "vawa", "citizenship", "other"].map((v) => (
            <option key={v} value={v}>
              {t(`caseTypes.${v}`)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-[var(--verde-950)]" htmlFor="message">
          {t("fields.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="rounded-lg border border-black/15 bg-white px-4 py-3 text-[var(--verde-950)] focus:border-[var(--verde-700)] outline-none resize-y"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="cta-gold justify-center mt-2 disabled:opacity-60"
      >
        <Send size={16} /> {submitting ? t("submitting") : t("submit")}
      </button>
      <p className="text-xs text-[var(--text-dark-secondary)] mt-1">{t("legal")}</p>
    </form>
  );
}
