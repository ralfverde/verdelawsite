"use client";

import { useTranslations } from "next-intl";

export function NewsletterForm() {
  const t = useTranslations("education.newsletter");

  return (
    <form
      className="card-dark p-7"
      onSubmit={(e) => e.preventDefault()}
      aria-label={t("formLabel")}
    >
      <label htmlFor="news-email" className="text-sm text-white/75">
        {t("emailLabel")}
      </label>
      <input
        id="news-email"
        name="email"
        type="email"
        required
        placeholder={t("emailPlaceholder")}
        className="mt-2 w-full rounded-lg bg-[var(--verde-900)] border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--gold-500)] outline-none"
      />
      <button type="submit" className="cta-gold mt-4 w-full justify-center text-sm">
        {t("subscribe")}
      </button>
      <p className="text-xs text-white/50 mt-3">{t("legal")}</p>
    </form>
  );
}
