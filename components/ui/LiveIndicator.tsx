"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Small pulsing "X consultations scheduled this week" indicator.
 * The count is randomised once per page load (10–17 range) on the
 * client inside a useEffect so server and client render the same
 * initial tree (count = null → nothing) and avoid hydration
 * mismatches.
 */
export function LiveIndicator() {
  const t = useTranslations("live");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(Math.floor(Math.random() * 8) + 10);
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-2 mt-8" aria-live="polite">
      <span className="relative inline-flex">
        <span
          aria-hidden
          className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400/50 animate-ping"
          style={{ animationDuration: "2s" }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="text-sm text-white/40">
        {t("consultations", { count })}
      </span>
    </div>
  );
}
