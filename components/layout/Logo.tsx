import Image from "next/image";

type Size = "sm" | "md" | "lg";

/**
 * Verde Law brand lockup — horizontal column + wordmark + tagline,
 * rendered from the single PNG in public/images/. The artwork is
 * designed for dark backgrounds (gold column, near-white wordmark,
 * transparent RGBA).
 *
 * Source aspect ratio is 2515 × 490 ≈ 5.13 : 1.
 *
 * Props:
 *   - `size`: height preset. sm = 28, md = 36 (default), lg = 64.
 *   - `compact`: legacy prop kept for backward compatibility. When
 *     true, renders the same lockup at `sm` size so nothing breaks.
 *   - `dark`: legacy prop. Currently a no-op because we only ship
 *     one variant; the artwork already reads on dark surfaces.
 *
 * We use next/image so the chosen size is served at an appropriate
 * width (the source is ~2.5k px wide for retina). Priority is on
 * because the logo is part of the above-the-fold navbar.
 */
export function Logo({
  size = "md",
  compact = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dark = false,
}: {
  size?: Size;
  compact?: boolean;
  dark?: boolean;
}) {
  const heights: Record<Size, number> = { sm: 28, md: 36, lg: 64 };
  const h = heights[compact ? "sm" : size];
  const w = Math.round(h * (2515 / 490));

  return (
    <Image
      src="/images/verde-law-logo.png"
      alt="Verde Law"
      width={w}
      height={h}
      priority
      sizes={`${w}px`}
      className="w-auto select-none"
      style={{ height: h, width: "auto" }}
    />
  );
}
