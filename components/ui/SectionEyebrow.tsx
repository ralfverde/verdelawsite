export function SectionEyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block text-eyebrow text-[var(--gold-500)] ${className}`}
    >
      {children}
    </span>
  );
}
