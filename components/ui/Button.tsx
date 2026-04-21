import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--gold-500)] focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[var(--gold-500)] to-[var(--gold-400)] text-[var(--verde-950)] hover:scale-[1.02] hover:shadow-[0_10px_32px_rgba(200,169,81,0.35)]",
  secondary:
    "bg-[var(--verde-800)] text-white hover:bg-[var(--verde-700)]",
  outline:
    "bg-transparent border border-[var(--gold-500)] text-[var(--gold-500)] hover:bg-[var(--gold-500)] hover:text-[var(--verde-950)]",
  ghost:
    "bg-transparent text-white hover:bg-white/10",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1fb855]",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "ref">;

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  className = "",
  children,
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={cls}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
