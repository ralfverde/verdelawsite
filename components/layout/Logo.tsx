export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  const textColor = dark ? "text-[var(--verde-950)]" : "text-white";
  return (
    <span className="flex items-center gap-2.5">
      <span
        className="grid place-items-center rounded-md bg-gradient-to-br from-[var(--gold-500)] to-[var(--gold-400)] text-[var(--verde-950)] shrink-0"
        style={{ width: 40, height: 40 }}
        aria-hidden
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-1.2 2.8-3.2 4.5-5.5 6-2.3 1.5-4 3.3-4.5 6 2 1.2 4.5.8 6.5-.2 2-1 3.3-2.5 3.5-5.3.2 3 1.5 4.3 3.5 5.3 2 1 4.5 1.4 6.5.2-.5-2.7-2.2-4.5-4.5-6C15.2 6.5 13.2 4.8 12 2z" />
          <path d="M12 10v12" stroke="#0A1F15" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-xl ${textColor}`}>Verde Law</span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--gold-500)] mt-1">
            Immigration Attorneys
          </span>
        </span>
      )}
    </span>
  );
}
