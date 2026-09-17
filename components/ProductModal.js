"use client";

import Link from "next/link";
import { useEffect } from "react";

import AppImage from "@/components/AppImage";
import Icon from "@/components/Icon";
import ProductOptions from "@/components/ProductOptions";
import { getRelatedItems, labelMeta } from "@/data/menu";
import { rupiah } from "@/lib/format";

export default function ProductModal({ item, onClose, onSelect }) {
  useEffect(() => {
    if (!item) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const related = getRelatedItems(item, 3);
  const labels = item.labels.map((label) => labelMeta[label]).filter(Boolean);

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Tutup detail menu"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-espresso/50 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detail menu ${item.name}`}
        className="relative flex max-h-[92vh] w-full max-w-4xl animate-popin flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-lift sm:rounded-[2rem] md:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-espresso shadow-soft transition hover:bg-beige"
          aria-label="Tutup"
        >
          <Icon name="close" className="h-4 w-4" strokeWidth={2} />
        </button>

        <div className="relative h-56 w-full shrink-0 sm:h-64 md:h-auto md:w-[42%]">
          <AppImage
            src={item.image}
            alt={item.name}
            sizes="(max-width: 768px) 100vw, 420px"
            className="h-full w-full"
            icon="cup"
          />
          <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap gap-1.5">
            {labels.map((label) => (
              <span key={label.text} className={`chip ${label.className} shadow-soft`}>
                {label.text}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-7">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-caramel">
            {item.category.replace("-", " ")}
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-semibold leading-tight">{item.name}</h2>
          <div className="mt-2 flex items-center gap-2 text-sm text-mocha">
            <Icon name="star" className="h-4 w-4 text-amberglow" />
            <span className="font-semibold text-espresso">{item.rating?.toFixed(1)}</span>
            <span>·</span>
            <span>{rupiah(item.price)}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-cocoa/85">{item.description}</p>

          {item.composition?.length ? (
            <div className="mt-4 rounded-2xl border border-espresso/[0.08] bg-beige/45 p-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-clay">
                Komposisi
              </p>
              <ul className="mt-2 grid gap-1.5 text-sm text-cocoa/85 sm:grid-cols-2">
                {item.composition.map((part) => (
                  <li key={part} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-matcha" strokeWidth={2.4} />
                    {part}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6">
            <ProductOptions item={item} askWhatsApp={false} />
          </div>

          <Link
            href={`/menu/${item.slug}`}
            className="mt-3 text-center text-xs font-semibold text-caramel underline-offset-4 hover:underline"
          >
            Buka halaman detail produk
          </Link>

          {related.length ? (
            <div className="mt-7 border-t border-espresso/10 pt-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mocha">
                Menu lain yang sering dipesan
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {related.map((other) => (
                  <button
                    key={other.slug}
                    type="button"
                    onClick={() => onSelect?.(other)}
                    className="group overflow-hidden rounded-2xl border border-espresso/[0.08] bg-beige/40 text-left transition hover:-translate-y-0.5 hover:bg-beige"
                  >
                    <AppImage
                      src={other.image}
                      alt={other.name}
                      sizes="160px"
                      className="aspect-[4/3] w-full"
                      icon="cup"
                      imgClassName="transition duration-500 group-hover:scale-105"
                    />
                    <span className="block px-3 py-2.5">
                      <span className="block truncate text-xs font-semibold">{other.name}</span>
                      <span className="mt-0.5 block text-[0.7rem] tabular-nums text-mocha">
                        {rupiah(other.price)}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
