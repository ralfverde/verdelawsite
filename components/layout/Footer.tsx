import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Instagram, Youtube, Facebook, Music2 } from "lucide-react";
import { Logo } from "./Logo";
import { FIRM } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const practice: { key: string; href: string }[] = [
    { key: "deportation", href: "/practice-areas/deportation-defense" },
    { key: "asylum", href: "/practice-areas/asylum" },
    { key: "bond", href: "/practice-areas/bond-hearing" },
    { key: "family", href: "/practice-areas/family-petitions" },
    { key: "vawa", href: "/practice-areas/vawa" },
    { key: "uVisa", href: "/practice-areas/u-visa" },
    { key: "naturalization", href: "/practice-areas/naturalization" },
    { key: "workPermit", href: "/practice-areas/work-permit" },
  ];

  return (
    <footer className="bg-[var(--verde-900)] text-white border-t border-[var(--gold-500)]/40">
      <div className="container-wide py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-5">
            <Logo />
            <p className="font-display text-[var(--gold-500)] text-xl">
              {t("tagline")}
            </p>
            <p className="text-white/65 text-sm leading-relaxed max-w-[320px]">
              {t("description")}
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={FIRM.social.instagram}
                aria-label="Instagram"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[var(--gold-500)] hover:text-[var(--verde-950)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a
                href={FIRM.social.tiktok}
                aria-label="TikTok"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[var(--gold-500)] hover:text-[var(--verde-950)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Music2 size={18} />
              </a>
              <a
                href={FIRM.social.youtube}
                aria-label="YouTube"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[var(--gold-500)] hover:text-[var(--verde-950)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={18} />
              </a>
              <a
                href={FIRM.social.facebook}
                aria-label="Facebook"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-[var(--gold-500)] hover:text-[var(--verde-950)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--gold-500)] mb-5">
              {tNav("practiceAreas")}
            </h4>
            <ul className="space-y-3">
              {practice.map((p) => (
                <li key={p.key}>
                  <Link
                    href={p.href as never}
                    className="text-sm text-white/75 hover:text-[var(--gold-500)] transition-colors"
                  >
                    {t(`practice.${p.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--gold-500)] mb-5">
              {t("resources")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/education" className="text-sm text-white/75 hover:text-[var(--gold-500)]">
                  {tNav("education")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/75 hover:text-[var(--gold-500)]">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/our-team" className="text-sm text-white/75 hover:text-[var(--gold-500)]">
                  {tNav("team")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/75 hover:text-[var(--gold-500)]">
                  {tNav("contact")}
                </Link>
              </li>
              <li>
                <Link href="/verde-plus" className="text-sm text-white/75 hover:text-[var(--gold-500)]">
                  Verde+
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--gold-500)] mb-5">
              {tNav("contact")}
            </h4>
            <address className="not-italic space-y-3 text-sm text-white/75">
              <p>
                {FIRM.address.street}
                <br />
                {FIRM.address.city}, {FIRM.address.state} {FIRM.address.zip}
              </p>
              <p>
                <a href={FIRM.phoneHref} className="hover:text-[var(--gold-500)]">
                  {FIRM.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${FIRM.email}`} className="hover:text-[var(--gold-500)]">
                  {FIRM.email}
                </a>
              </p>
              <p>{t("hoursLabel")}: {FIRM.hours}</p>
            </address>
            <a href={FIRM.bookingHref} className="cta-gold mt-5 text-sm">
              {t("bookCTA")}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-wide py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Verde Law, PLLC. {t("rightsReserved")}</p>
          <ul className="flex gap-5">
            <li><Link href="/privacy" className="hover:text-[var(--gold-500)]">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="hover:text-[var(--gold-500)]">{t("terms")}</Link></li>
            <li><Link href="/privacy" className="hover:text-[var(--gold-500)]">{t("disclaimer")}</Link></li>
          </ul>
          <p className="max-w-md">{t("disclaimerText")}</p>
        </div>
      </div>
    </footer>
  );
}
