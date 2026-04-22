"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  variant?: "dark" | "light";
};

/**
 * Subtle "X people viewed this service today" tag. Number is
 * randomised 5–24 on the client after mount; server renders null
 * until mount to avoid a hydration mismatch. `variant` selects text
 * color so it works on both dark and cream backgrounds.
 */
export function PeopleViewing({ variant = "dark" }: Props) {
  const t = useTranslations("live");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(Math.floor(Math.random() * 20) + 5);
  }, []);

  if (count === null) return null;

  const colorClass =
    variant === "dark" ? "text-white/30" : "text-verde-950/30";

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs ${colorClass}`}
      aria-live="polite"
    >
      <Eye className="w-4 h-4" />
      {t("viewing", { count })}
    </span>
  );
}
