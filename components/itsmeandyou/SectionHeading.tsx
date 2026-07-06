import type { ReactNode } from "react";

/** Shared eyebrow label + display title used by the content sections. */
export function SectionHeading({
  label,
  title,
  tone = "dark",
}: {
  label: string;
  title: ReactNode;
  tone?: "dark" | "light";
}) {
  // "dark" = on the deep-teal band; "light" = on the cream sections
  const labelColor = tone === "dark" ? "text-[#8fd6d0]" : "text-[#1c8f88]";
  const titleColor = tone === "dark" ? "text-[#faf7f2]" : "text-[#163030]";
  return (
    <>
      <p className={`mb-4 text-center t-caption font-medium uppercase tracking-[0.1em] ${labelColor}`}>
        {label}
      </p>
      <h2 className={`mb-[clamp(36px,6vw,56px)] text-center font-cormorant t-h2 font-light leading-[1.2] ${titleColor}`}>
        {title}
      </h2>
    </>
  );
}
