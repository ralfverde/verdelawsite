/**
 * SectionDivider — intentionally renders nothing.
 *
 * Earlier iterations shipped a diagonal clip-path bridge and a
 * gradient variant between sections. In practice the angled cut read
 * as a visible horizontal seam at the top of every light section,
 * which is exactly the "AI brochure" look we're trying to avoid.
 * Clean background-color transitions look more modern.
 *
 * Kept as a no-op component so existing `<SectionDivider />` call
 * sites in the page files don't need to be torn out; the types still
 * narrow correctly and builds stay clean. Delete when we're sure we
 * never want them back.
 */
type DiagonalProps = {
  variant: "diagonal";
  direction: "dark-to-light" | "light-to-dark";
};

type GradientProps = {
  variant: "gradient";
  ornament?: "line" | "diamond" | "none";
};

type Props = DiagonalProps | GradientProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SectionDivider(_props: Props) {
  return null;
}
