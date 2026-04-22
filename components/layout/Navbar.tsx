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
import { useBooking } from "@/context/BookingContext";

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
  const { openBooking } = useBooking();

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
        <div className="container-wide flex items-center justify-between gap-3 py-4">
          <Link href="/" aria-label="Verde Law" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary navigation">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-2.5 py-2 text-[13px] font-medium tracking-normal whitespace-nowrap text-white/80 hover:text-white transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageToggle />
            <a
              href={FIRM.phoneHref}
              aria-label={FIRM.phoneDisplay}
              title={FIRM.phoneDisplay}
              className="hidden xl:flex items-center gap-2 text-[13px] whitespace-nowrap text-white/80 hover:text-[var(--gold-500)] transition-colors"
            >
              <Phone size={16} />
              {FIRM.phoneDisplay}
            </a>
            <a
              href={FIRM.phoneHref}
              aria-label={FIRM.phoneDisplay}
              title={FIRM.phoneDisplay}
              className="xl:hidden grid place-items-center w-9 h-9 rounded-full border border-white/15 text-white/80 hover:text-[var(--gold-500)] hover:border-[var(--gold-500)]/40 transition-colors"
            >
              <Phone size={16} />
            </a>
            <MagneticButton>
              <button
                type="button"
                onClick={openBooking}
                className="cta-gold text-[13px] whitespace-nowrap px-5 py-2.5"
              >
                {t("freeConsultation")}
              </button>
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
