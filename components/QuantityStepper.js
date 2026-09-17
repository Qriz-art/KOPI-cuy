"use client";

import Icon from "@/components/Icon";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  label = "Jumlah",
  size = "md",
}) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-11 w-11",
  };

  const buttonClass = `${sizes[size]} flex items-center justify-center rounded-full border border-espresso/15 bg-cream text-espresso transition hover:border-espresso/35 hover:bg-beige disabled:opacity-40 disabled:hover:border-espresso/15 disabled:hover:bg-cream`;

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={label}>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Kurangi ${label.toLowerCase()}`}
      >
        <Icon name="minus" className="h-4 w-4" strokeWidth={2} />
      </button>
      <span
        className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Tambah ${label.toLowerCase()}`}
      >
        <Icon name="plus" className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}
