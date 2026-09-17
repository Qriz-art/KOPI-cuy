"use client";

import { useMemo, useState } from "react";

import Icon from "@/components/Icon";
import MenuCard from "@/components/MenuCard";
import ProductModal from "@/components/ProductModal";
import Reveal from "@/components/Reveal";
import { categories, menuItems } from "@/data/menu";

export default function MenuExplorer({ showSearch = true, limit, initialCategory = "all" }) {
  const [category, setCategory] = useState(
    categories.some((entry) => entry.id === initialCategory) ? initialCategory : "all"
  );
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);

  const counts = useMemo(() => {
    const map = { all: menuItems.length };
    menuItems.forEach((item) => {
      map[item.category] = (map[item.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const list = menuItems.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      if (!matchCategory) return false;
      if (!keyword) return true;
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        (item.composition ?? []).some((part) => part.toLowerCase().includes(keyword))
      );
    });
    return limit ? list.slice(0, limit) : list;
  }, [category, query, limit]);

  const reset = () => {
    setCategory("all");
    setQuery("");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {showSearch ? (
          <div className="relative w-full lg:max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mocha">
              <Icon name="search" className="h-4 w-4" />
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari menu, contoh: kopi susu atau croffle"
              aria-label="Cari menu"
              className="field pl-11"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-mocha transition hover:bg-beige hover:text-espresso"
                aria-label="Hapus pencarian"
              >
                <Icon name="close" className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-cocoa/80">
            Pilih kategori untuk melihat menu yang tersedia di {""}
            <span className="font-semibold text-espresso">Kopi Cuy</span>.
          </p>
        )}

        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mocha">
          {filtered.length} menu ditemukan
        </p>
      </div>

      <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
        {categories.map((entry) => {
          const activeChip = category === entry.id;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => setCategory(entry.id)}
              aria-pressed={activeChip}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 ${
                activeChip
                  ? "border-espresso bg-espresso text-cream shadow-soft"
                  : "border-espresso/12 bg-cream text-cocoa hover:border-caramel/40 hover:bg-beige"
              }`}
            >
              {entry.label}
              <span className={`ml-1.5 text-xs ${activeChip ? "text-cream/60" : "text-mocha/70"}`}>
                {counts[entry.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-[2rem] border border-dashed border-espresso/20 bg-beige/40 px-6 py-14 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-cocoa shadow-soft">
            <Icon name="search" className="h-7 w-7" />
          </span>
          <div>
            <p className="font-display text-xl font-semibold">Menu tidak ditemukan</p>
            <p className="mt-1 max-w-sm text-sm text-cocoa/80">
              Coba kata kunci lain, atau lihat semua menu yang tersedia di Kopi Cuy.
            </p>
          </div>
          <button type="button" onClick={reset} className="btn-accent">
            Reset pencarian &amp; filter
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, index) => (
            <Reveal key={item.slug} delay={(index % 4) * 70}>
              <MenuCard item={item} onOpen={setActive} priority={index < 4} />
            </Reveal>
          ))}
        </div>
      )}

      <ProductModal item={active} onClose={() => setActive(null)} onSelect={setActive} />
    </div>
  );
}
