import { useTranslations } from "next-intl";

/**
 * Trust signal row between SocialProof and PracticeOverview.
 * Placeholder "pill" badges stand in for real logos until the firm
 * provides them.
 */
export function TrustBar() {
  const t = useTranslations("trustBar");

  const pill =
    "px-4 py-2 border border-white/10 rounded text-xs text-white/40 font-medium uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity";

  return (
    <section
      aria-label="Credentials"
      className="bg-verde-950 py-10 border-y border-white/[0.04]"
    >
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-white/30">
              {t("licensed")}
            </span>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className={pill}>{t("floridaBar")}</span>
              <span className={pill}>{t("federalCourts")}</span>
              <span className={pill}>{t("eleventhCircuit")}</span>
            </div>
          </div>

          <span
            aria-hidden
            className="hidden md:block w-px h-10 bg-white/10"
          />

          <div className="flex flex-col md:flex-row items-center gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-white/30">
              {t("member")}
            </span>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className={pill}>{t("aila")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
