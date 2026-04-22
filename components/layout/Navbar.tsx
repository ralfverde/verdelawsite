"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FIRM } from "@/lib/constants";

type NavItem = { key: string; href: React.ComponentProps<typeof Link>["href"] };

const NAV: NavItem[] = [
  { key: "home", href: "/" },
  { key: "practiceAreas", href: "/practice-areas" },
  { key: "about", href: "/about" },
  { key: "team", href: "/our-team" },
  { key: "locations", href: "/locations" },
  { key: "education", href: "/education" },
  { key: "verdePlus", href: "/verde-plus" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgClass = scrolled
    ? "bg-[var(--verde-950)]/90 backdrop-blur-xl border-b border-white/[0.06]"
    : "bg-transparent backdrop-blur-0 border-b border-transparent";

  return (
    <>
      <a href="#main" className="skip-link">
        {t("skip")}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 will-change-[background-color,backdrop-filter] ${bgClass}`}
        style={{ transition: "background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
        aria-label="Primary"
      >
        <div className="container-wide flex items-center justify-between gap-6 py-4">
          <Link href="/" aria-label="Verde Law" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-3 py-2 text-[15px] text-white/80 hover:text-white transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <LanguageToggle />
            <a
              href={FIRM.phoneHref}
              className="flex items-center gap-2 text-sm text-white/80 hover:text-[var(--gold-500)] transition-colors"
            >
              <Phone size={16} />
              {FIRM.phoneDisplay}
            </a>
            <MagneticButton>
              <a href={FIRM.bookingHref} className="cta-gold text-sm">
                {t("freeConsultation")}
              </a>
            </MagneticButton>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-white"
            onClick={() => setMenuOpen(true)}
            aria-label={t("openMenu")}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={NAV} locale={locale} />
    </>
  );
}
