import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Music2,
  Youtube,
} from "lucide-react";
import { FIRM } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.seo" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: locale === "es" ? "/es/contacto" : "/contact",
    alternatePaths: { en: "/contact", es: "/es/contacto" },
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "en" | "es" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        crumbs={[{ label: tNav("home"), href: "/" }, { label: tNav("contact") }]}
      />

      <section className="bg-cream text-verde-950 section-y">
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          {/* Form */}
          <ContactForm />

          {/* Contact info card */}
          <aside className="bg-verde-950 rounded-2xl p-8 text-white self-start">
            <h2 className="text-xl font-display mb-6">{t("info.title")}</h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                <a
                  href={FIRM.phoneHref}
                  className="text-sm text-white/70 hover:text-gold-500 transition-colors"
                >
                  {FIRM.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${FIRM.email}`}
                  className="text-sm text-white/70 hover:text-gold-500 transition-colors"
                >
                  {FIRM.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                <span className="text-sm text-white/70">
                  {FIRM.address.street}
                  <br />
                  {FIRM.address.city}, {FIRM.address.state} {FIRM.address.zip}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-gold-500 w-5 h-5 mt-0.5 shrink-0" />
                <span className="text-sm text-white/70">{FIRM.hours}</span>
              </li>
            </ul>

            <a
              href={FIRM.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle size={16} /> {t("info.whatsapp")}
            </a>

            <div className="mt-6 flex gap-3">
              <a
                href={FIRM.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:bg-white/[0.06] hover:border-white/20 transition-colors"
              >
                <Instagram className="text-white/50 w-4 h-4" />
              </a>
              <a
                href={FIRM.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:bg-white/[0.06] hover:border-white/20 transition-colors"
              >
                <Music2 className="text-white/50 w-4 h-4" />
              </a>
              <a
                href={FIRM.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-white/10 grid place-items-center hover:bg-white/[0.06] hover:border-white/20 transition-colors"
              >
                <Youtube className="text-white/50 w-4 h-4" />
              </a>
            </div>

            {/* Map embed */}
            <div className="mt-6 rounded-xl overflow-hidden h-[200px] border border-white/[0.06]">
              <iframe
                title="Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.2!2d-80.301!3d25.778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ2JzQwLjgiTiA4MMKwMTgnMDMuNiJX!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
