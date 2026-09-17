"use client";

import { useEffect, useMemo, useState } from "react";

import AppImage from "@/components/AppImage";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { galleryCategories, galleryItems } from "@/data/testimonials";

const spanClass = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

export default function GalleryGrid() {
  const [category, setCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(-1);

  const items = useMemo(
    () =>
      category === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === category),
    [category]
  );

  const current = openIndex >= 0 ? items[openIndex] : null;

  useEffect(() => {
    if (!current) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenIndex(-1);
      if (event.key === "ArrowRight") setOpenIndex((value) => (value + 1) % items.length);
      if (event.key === "ArrowLeft") setOpenIndex((value) => (value - 1 + items.length) % items.length);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [current, items.length]);

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {galleryCategories.map((entry) => {
          const active = category === entry.id;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => {
                setCategory(entry.id);
                setOpenIndex(-1);
              }}
              aria-pressed={active}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "border-espresso bg-espresso text-cream shadow-soft"
                  : "border-espresso/12 bg-cream text-cocoa hover:border-caramel/40 hover:bg-beige"
              }`}
            >
              {entry.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={(index % 3) * 60} className={item.span === "wide" ? "sm:col-span-2" : ""}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full overflow-hidden rounded-[1.75rem] border border-espresso/[0.07] bg-beige shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              aria-label={`Perbesar foto ${item.title}`}
            >
              <AppImage
                src={item.image}
                alt={item.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`w-full ${spanClass[item.span] ?? "aspect-square"}`}
                imgClassName="transition-transform duration-700 group-hover:scale-[1.07]"
                icon="sparkle"
                fallbackLabel={item.title}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between gap-2 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span>
                  <span className="block text-sm font-semibold text-cream">{item.title}</span>
                  <span className="block text-[0.7rem] uppercase tracking-[0.16em] text-cream/70">
                    {item.category}
                  </span>
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-espresso">
                  <Icon name="search" className="h-4 w-4" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {current ? (
        <div className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-espresso/92 p-4 sm:p-8">
          <button
            type="button"
            onClick={() => setOpenIndex(-1)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/20"
            aria-label="Tutup galeri"
          >
            <Icon name="close" className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className="relative w-full max-w-3xl animate-popin">
            <AppImage
              src={current.image}
              alt={current.title}
              sizes="(max-width: 1024px) 100vw, 768px"
              className="aspect-[4/3] w-full rounded-3xl"
              icon="sparkle"
              fallbackLabel={current.title}
            />
            <div className="mt-4 flex items-center justify-between gap-4 text-cream">
              <div>
                <p className="font-display text-lg font-semibold">{current.title}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-cream/60">
                  {current.category} · {openIndex + 1}/{items.length}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpenIndex((value) => (value - 1 + items.length) % items.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/15"
                  aria-label="Foto sebelumnya"
                >
                  <Icon name="chevronRight" className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIndex((value) => (value + 1) % items.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/15"
                  aria-label="Foto berikutnya"
                >
                  <Icon name="chevronRight" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
