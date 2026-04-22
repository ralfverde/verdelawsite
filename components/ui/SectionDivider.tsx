/**
 * SectionDivider — Two visual bridges between sections.
 *
 * Variant `diagonal`: angled clip-path filling the gap between a dark
 * and a light section. Direction controls which way the diagonal cuts.
 *
 * Variant `gradient`: subtle linear gradient between two dark shades
 * with an optional centered gold ornament (hairline or diamond) —
 * used when both neighboring sections are dark.
 *
 * Both variants are purely decorative (aria-hidden, no a11y content).
 */

type DiagonalProps = {
  variant: "diagonal";
  /**
   * Direction of the transition. "dark-to-light" means the *top*
   * section is dark and the *bottom* section is light. The clip angle
   * reveals the bottom color from the upper-right corner.
   */
  direction: "dark-to-light" | "light-to-dark";
};

type GradientProps = {
  variant: "gradient";
  ornament?: "line" | "diamond" | "none";
};

type Props = DiagonalProps | GradientProps;

export function SectionDivider(props: Props) {
  if (props.variant === "diagonal") {
    const topColor =
      props.direction === "dark-to-light" ? "bg-verde-950" : "bg-cream";
    const bottomColor =
      props.direction === "dark-to-light" ? "bg-cream" : "bg-verde-950";
    const clipPath =
      props.direction === "dark-to-light"
        ? "polygon(0 40%, 100% 0%, 100% 100%, 0% 100%)"
        : "polygon(0 0%, 100% 40%, 100% 100%, 0% 100%)";

    return (
      <div
        className="relative w-full h-20 md:h-[120px] -mt-px"
        aria-hidden="true"
      >
        <div className={`absolute inset-0 ${topColor}`} />
        <div
          className={`absolute inset-0 ${bottomColor}`}
          style={{ clipPath }}
        />
      </div>
    );
  }

  const ornament = props.ornament ?? "line";
  return (
    <div
      className="relative w-full h-24 bg-gradient-to-b from-verde-950 to-verde-900 flex items-center justify-center"
      aria-hidden="true"
    >
      {ornament === "line" && (
        <span className="w-16 h-px bg-gold-500/30" />
      )}
      {ornament === "diamond" && (
        <span className="w-2 h-2 rotate-45 bg-gold-500/40" />
      )}
    </div>
  );
}
