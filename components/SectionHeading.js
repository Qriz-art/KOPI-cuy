export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className = "",
}) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <div className={`${alignment} ${className}`}>
      {eyebrow ? (
        <span
          className={`eyebrow ${light ? "border-amberglow/30 bg-amberglow/15 text-amberglow" : ""}`}
        >
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <h2
          className={`mt-4 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl ${
            light ? "text-cream" : "text-espresso"
          }`}
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p
          className={`mt-3 text-[0.95rem] leading-relaxed ${
            light ? "text-cream/75" : "text-cocoa/85"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
