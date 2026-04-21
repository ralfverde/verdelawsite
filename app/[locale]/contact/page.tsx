import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ContactForm } from "@/components/contact/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Music2, Youtube } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "es" }> }): Promise<Metadata> {
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

export default async function ContactPage({ params }: { params: Promise<{ locale: "en" | "es" }> }) {
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

      <section className="bg-[var(--cream)] text-[var(--verde-950)] section-y">
        <div className="container-wide grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <ContactForm />

          <aside className="rounded-2xl p-8 bg-[var(--verde-950)] text-white self-start">
            <h2 className="font-display text-2xl">{t("info.title")}</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[var(--gold-500)] mt-0.5" />
                <a href={FIRM.phoneHref} className="hover:text-[var(--gold-500)]">{FIRM.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[var(--gold-500)] mt-0.5" />
                <a href={`mailto:${FIRM.email}`} className="hover:text-[var(--gold-500)]">{FIRM.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--gold-500)] mt-0.5" />
                <span>{FIRM.address.street}<br />{FIRM.address.city}, {FIRM.address.state} {FIRM.address.zip}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[var(--gold-500)] mt-0.5" />
                <span>{FIRM.hours}</span>
              </li>
            </ul>

            <a
              href={FIRM.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-gold mt-7 w-full justify-center text-sm"
            >
              <MessageCircle size={16} /> {t("info.whatsapp")}
            </a>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
              <a href={FIRM.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid place-items-center rounded-lg bg-white/5 hover:bg-[var(--gold-500)] hover:text-[var(--verde-950)] transition-colors" style={{ width: 40, height: 40 }}>
                <Instagram size={16} />
              </a>
              <a href={FIRM.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid place-items-center rounded-lg bg-white/5 hover:bg-[var(--gold-500)] hover:text-[var(--verde-950)] transition-colors" style={{ width: 40, height: 40 }}>
                <Music2 size={16} />
              </a>
              <a href={FIRM.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid place-items-center rounded-lg bg-white/5 hover:bg-[var(--gold-500)] hover:text-[var(--verde-950)] transition-colors" style={{ width: 40, height: 40 }}>
                <Youtube size={16} />
              </a>
            </div>

            <div className="mt-7 overflow-hidden rounded-xl aspect-[5/3] relative border border-white/10">
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
