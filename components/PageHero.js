import Link from "next/link";

import Reveal from "@/components/Reveal";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb = [],
  children,
  align = "left",
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <section className="relative overflow-hidden border-b border-espresso/[0.07] bg-beige/45">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 animate-floatslow rounded-blob bg-caramel/15 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-[-4rem] h-64 w-64 rounded-blob bg-matcha/12 blur-2xl"
      />

      <div className={`shell relative flex flex-col py-14 sm:py-20 ${alignment}`}>
        {breadcrumb.length ? (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-mocha">
              <li>
                <Link href="/" className="transition hover:text-clay">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-clay">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-cocoa">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal className={`flex max-w-3xl flex-col ${alignment}`}>
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-cocoa/85">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
