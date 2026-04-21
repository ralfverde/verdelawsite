import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FIRM } from "@/lib/constants";
import { Phone } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[var(--verde-950)] text-white pt-32 pb-20">
      <div className="container-narrow text-center">
        <p className="font-display text-[clamp(96px,18vw,220px)] leading-none text-[var(--gold-500)]">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl md:text-5xl">{t("title")}</h1>
        <p className="mt-5 text-white/70 max-w-xl mx-auto">{t("body")}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="cta-gold">
            {t("cta")}
          </Link>
          <a href={FIRM.phoneHref} className="cta-outline">
            <Phone size={16} /> {t("phone", { phone: FIRM.phoneDisplay })}
          </a>
        </div>
      </div>
    </section>
  );
}
