import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { USMapSVG } from "@/components/locations/USMapSVG";
import { Phone, Clock, MapPin, MessageCircle, Video } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "es" }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locations.seo" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: locale === "es" ? "/es/ubicaciones" : "/locations",
    alternatePaths: { en: "/locations", es: "/es/ubicaciones" },
  });
}

export default async function LocationsPage({ params }: { params: Promise<{ locale: "en" | "es" }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("locations");
  const tNav = await getTranslations("nav");

  const topStates = ["florida", "texas", "california", "newYork", "illinois", "georgia", "arizona", "nevada"];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tNav("home"), href: "/" }, { label: tNav("locations") }]}
      />

      {/* Office + Map */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/10">
            <iframe
              title="Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.2!2d-80.301!3d25.778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ2JzQwLjgiTiA4MMKwMTgnMDMuNiJX!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <SectionEyebrow>{t("office.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">{t("office.title")}</h2>
            <GoldAccentLine className="mt-5" />
            <ul className="mt-7 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--gold-600)] mt-0.5 shrink-0" />
                <span>
                  {FIRM.address.street}<br />
                  {FIRM.address.city}, {FIRM.address.state} {FIRM.address.zip}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[var(--gold-600)] mt-0.5 shrink-0" />
                <a href={FIRM.phoneHref} className="hover:text-[var(--verde-700)]">{FIRM.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[var(--gold-600)] mt-0.5 shrink-0" />
                <span>{FIRM.hours}</span>
              </li>
            </ul>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                `${FIRM.address.street}, ${FIRM.address.city}, ${FIRM.address.state} ${FIRM.address.zip}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-gold mt-7 text-sm"
            >
              {t("office.directions")}
            </a>
          </div>
        </div>
      </section>

      {/* National coverage */}
      <section className="noise-bg bg-[var(--verde-950)] text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("national.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("national.title")}</h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
            <USMapSVG />
            <div>
              <p className="text-white/75 leading-relaxed">{t("national.body")}</p>
              <h3 className="mt-8 text-sm uppercase tracking-[0.15em] font-semibold text-[var(--gold-500)]">
                {t("national.topStatesLabel")}
              </h3>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-white/80">
                {topStates.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="h-[2px] w-3 bg-[var(--gold-500)]" aria-hidden />
                    {t(`national.states.${s}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual */}
      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("virtual.eyebrow")}</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl md:text-5xl">{t("virtual.title")}</h2>
          <GoldAccentLine className="mt-5" />
          <p className="mt-6 text-[var(--text-dark-secondary)] max-w-2xl leading-relaxed">
            {t("virtual.body")}
          </p>

          <ul className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { key: "phone", icon: Phone },
              { key: "whatsapp", icon: MessageCircle },
              { key: "video", icon: Video },
            ].map((v) => (
              <li key={v.key} className="card-light p-7">
                <v.icon className="text-[var(--gold-600)]" size={26} />
                <h3 className="mt-4 font-display text-xl">{t(`virtual.channels.${v.key}.title`)}</h3>
                <p className="mt-2 text-sm text-[var(--text-dark-secondary)] leading-relaxed">
                  {t(`virtual.channels.${v.key}.desc`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner variant="dark" titleKey="bannerDark.title" />
      <FinalCTA />
    </>
  );
}
