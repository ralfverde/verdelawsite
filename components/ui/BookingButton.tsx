"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/context/BookingContext";

type Props = {
  children: ReactNode;
  className?: string;
  /** aria-label override for icon-only variants */
  ariaLabel?: string;
};

/**
 * Client-only button that opens the GHL booking modal. Usable inside
 * server components without forcing them client-side. Ships with no
 * default styling; pass `className` to match the surface you're
 * replacing (e.g. "cta-gold", "cta-outline", etc.).
 */
export default function BookingButton({
  children,
  className,
  ariaLabel,
}: Props) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={openBooking}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
