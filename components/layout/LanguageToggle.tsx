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

  const activeCls =
    "text-[var(--gold-500)] font-semibold border-b-2 border-[var(--gold-500)]";
  const inactiveCls =
    "text-white/70 hover:text-white border-b-2 border-transparent";

  return (
    <div
      className={`inline-flex items-center gap-3 text-sm ${compact ? "" : ""}`}
      role="group"
      aria-label="Language"
      aria-busy={isPending}
    >
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`px-1 pb-1 transition-colors ${locale === "en" ? activeCls : inactiveCls}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <span className="text-white/30">|</span>
      <button
        type="button"
        onClick={() => switchTo("es")}
        className={`px-1 pb-1 transition-colors ${locale === "es" ? activeCls : inactiveCls}`}
        aria-pressed={locale === "es"}
      >
        ES
      </button>
    </div>
  );
}
