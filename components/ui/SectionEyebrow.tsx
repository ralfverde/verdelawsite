export function SectionEyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gold-500)] ${className}`}
    >
      {children}
    </span>
  );
}
