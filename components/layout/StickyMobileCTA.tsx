"use client";

import { useTranslations } from "next-intl";
import { Phone, Calendar } from "lucide-react";
import { FIRM } from "@/lib/constants";
import { useBooking } from "@/context/BookingContext";

export function StickyMobileCTA() {
  const t = useTranslations("sticky");
  const { openBooking } = useBooking();
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 h-[60px] grid grid-cols-2 bg-gradient-to-br from-[var(--gold-500)] to-[var(--gold-400)] text-[var(--verde-950)] font-semibold shadow-[0_-6px_20px_rgba(0,0,0,0.2)]">
      <a
        href={FIRM.phoneHref}
        className="flex items-center justify-center gap-2 border-r border-[var(--verde-950)]/20 text-sm"
      >
        <Phone size={18} /> {FIRM.phoneDisplay}
      </a>
      <button
        type="button"
        onClick={openBooking}
        className="flex items-center justify-center gap-2 text-sm"
      >
        <Calendar size={18} /> {t("freeConsultation")}
      </button>
    </div>
  );
}
