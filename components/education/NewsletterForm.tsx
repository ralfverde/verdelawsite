"use client";

import { useTranslations } from "next-intl";

export function NewsletterForm() {
  const t = useTranslations("education.newsletter");

  return (
    <form
      className="w-full"
      onSubmit={(e) => e.preventDefault()}
      aria-label={t("formLabel")}
    >
      <label htmlFor="news-email" className="sr-only">
        {t("emailLabel")}
      </label>
      <input
        id="news-email"
        name="email"
        type="email"
        required
        placeholder={t("emailPlaceholder")}
        className="w-full bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/10 transition-all"
      />
      <button
        type="submit"
        className="mt-3 w-full bg-gold-500 text-verde-950 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors"
      >
        {t("subscribe")}
      </button>
      <p className="text-xs text-white/25 mt-2">{t("legal")}</p>
    </form>
  );
}
