"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: "en" | "es") {
    if (next === locale) return;
    startTransition(() => {
      // @ts-expect-error: localized pathnames are typed strictly but we want dynamic switch
      router.replace({ pathname, params }, { locale: next });
    });
  }

  const pillBase =
    "px-3 py-1 rounded-full text-xs font-heading font-semibold tracking-wide transition-all duration-200";
  const activeCls = "bg-gold-500 text-verde-950";
  const inactiveCls = "text-white/40 hover:text-white/70";

  return (
    <div
      className={`inline-flex items-center bg-white/[0.06] rounded-full p-0.5 border border-white/[0.08] ${
        compact ? "" : ""
      }`}
      role="group"
      aria-label="Language"
      aria-busy={isPending}
    >
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`${pillBase} ${locale === "en" ? activeCls : inactiveCls}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchTo("es")}
        className={`${pillBase} ${locale === "es" ? activeCls : inactiveCls}`}
        aria-pressed={locale === "es"}
      >
        ES
      </button>
    </div>
  );
}
