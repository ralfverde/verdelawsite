import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CTABanner } from "@/components/sections/CTABanner";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GoldAccentLine } from "@/components/ui/GoldAccentLine";
import { USMapSVG } from "@/components/locations/USMapSVG";
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Video,
  ArrowUpRight,
  Mail,
} from "lucide-react";
import { FIRM } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
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

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("locations");
  const tNav = await getTranslations("nav");

  const topStates = [
    "florida",
    "texas",
    "california",
    "newYork",
    "illinois",
    "georgia",
    "arizona",
    "nevada",
  ];

  const mapDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${FIRM.address.street}, ${FIRM.address.city}, ${FIRM.address.state} ${FIRM.address.zip}`
  )}`;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tNav("home"), href: "/" }, { label: tNav("locations") }]}
      />

      {/* Office + Map */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide grid lg:grid-cols-[1.3fr_1fr] gap-10 items-stretch">
          {/* Framed map */}
          <div className="rounded-2xl overflow-hidden border border-verde-950/10 shadow-lg">
            <iframe
              title="Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.2!2d-80.301!3d25.778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ2JzQwLjgiTiA4MMKwMTgnMDMuNiJX!5e0!3m2!1sen!2sus!4v1700000000000"
              className="w-full h-[350px] md:h-[400px]"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Office info card */}
          <div className="bg-cream rounded-2xl p-8 border border-verde-950/5 shadow-sm">
            <SectionEyebrow>{t("office.eyebrow")}</SectionEyebrow>
            <h2 className="mt-3 font-display text-2xl text-verde-950 mb-6">
              {t("office.title")}
            </h2>

            <ul className="space-y-1">
              <li className="flex items-start gap-3 py-2">
                <MapPin className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                <span className="text-sm text-verde-950/70">
                  {FIRM.address.street}
                  <br />
                  {FIRM.address.city}, {FIRM.address.state} {FIRM.address.zip}
                </span>
              </li>
              <li className="flex items-start gap-3 py-2">
                <Phone className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                <a
                  href={FIRM.phoneHref}
                  className="text-sm text-verde-950/70 hover:text-verde-700 transition-colors"
                >
                  {FIRM.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 py-2">
                <Clock className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                <span className="text-sm text-verde-950/70">{FIRM.hours}</span>
              </li>
              <li className="flex items-start gap-3 py-2">
                <Mail className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${FIRM.email}`}
                  className="text-sm text-verde-950/70 hover:text-verde-700 transition-colors"
                >
                  {FIRM.email}
                </a>
              </li>
            </ul>

            <a
              href={mapDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-gold-600 hover:underline"
            >
              {t("office.directions")}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* National coverage */}
      <section className="noise-bg bg-verde-950 text-white section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("national.eyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-display"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.06 }}
          >
            {t("national.title")}
          </h2>
          <GoldAccentLine className="mt-5" />

          <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
            <USMapSVG />
            <div>
              <p className="text-white/75 leading-relaxed">{t("national.body")}</p>

              <h3 className="mt-8 text-xs uppercase tracking-[0.15em] font-semibold text-gold-500">
                {t("national.topStatesLabel")}
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {topStates.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"
                      aria-hidden
                    />
                    <span className="text-sm text-white/60">
                      {t(`national.states.${s}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual consultations */}
      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide">
          <SectionEyebrow>{t("virtual.eyebrow")}</SectionEyebrow>
          <h2
            className="mt-3 font-display text-verde-950"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.06 }}
          >
            {t("virtual.title")}
          </h2>
          <GoldAccentLine className="mt-5" />
          <p className="mt-6 text-verde-950/60 max-w-2xl leading-relaxed">
            {t("virtual.body")}
          </p>

          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: "phone", icon: Phone },
              { key: "whatsapp", icon: MessageCircle },
              { key: "video", icon: Video },
            ].map((v) => (
              <li
                key={v.key}
                className="bg-cream rounded-xl p-6 border border-verde-950/5 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <span className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-verde-100 grid place-items-center">
                  <v.icon className="text-verde-700 w-6 h-6" />
                </span>
                <h3 className="text-lg font-semibold text-verde-950 mb-2">
                  {t(`virtual.channels.${v.key}.title`)}
                </h3>
                <p className="text-sm text-verde-950/50 leading-relaxed">
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
