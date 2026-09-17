"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import AppImage from "@/components/AppImage";
import Icon from "@/components/Icon";
import { useCart } from "@/components/CartProvider";
import { defaultOptions, labelMeta } from "@/data/menu";
import { rupiah } from "@/lib/format";

export default function MenuCard({ item, onOpen, priority = false, className = "" }) {
  const { addItem } = useCart();
  const router = useRouter();
  const labels = item.labels.map((label) => labelMeta[label]).filter(Boolean);
  const hasOptions = (item.options?.length ?? 0) > 0;

  const detailHref = `/menu/${item.slug}`;

  const handlePrimary = () => {
    if (hasOptions) {
      if (onOpen) onOpen(item);
      else router.push(detailHref);
      return;
    }
    addItem(item, {}, 1);
  };

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] border border-espresso/[0.07] bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card ${className}`}
    >
      <div className="relative">
        <button
          type="button"
          onClick={handlePrimary}
          className="relative block aspect-[4/3] w-full overflow-hidden"
          aria-label={`Lihat detail ${item.name}`}
        >
          <AppImage
            src={item.image}
            alt={item.name}
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="h-full w-full"
            imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent opacity-70" />
        </button>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
          {labels.map((label) => (
            <span key={label.text} className={`chip ${label.className} shadow-soft`}>
              {label.text}
            </span>
          ))}
        </div>

        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-cream/95 px-2.5 py-1 text-[0.7rem] font-semibold text-espresso shadow-soft">
          <Icon name="star" className="h-3.5 w-3.5 text-amberglow" />
          {item.rating?.toFixed(1) ?? "4.8"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug">{item.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-cocoa/80">
          {item.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mocha">
              Mulai dari
            </p>
            <p className="font-display text-lg font-semibold tabular-nums">
              {rupiah(item.price)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={detailHref}
              className="flex h-10 items-center rounded-full border border-espresso/15 px-3.5 text-xs font-semibold text-espresso transition hover:bg-beige"
            >
              Detail
            </Link>
            <button
              type="button"
              onClick={handlePrimary}
              className="flex h-10 items-center gap-1.5 rounded-full bg-espresso px-4 text-xs font-semibold text-cream transition hover:bg-espressosoft"
            >
              {hasOptions ? "Pilih" : "Tambah"}
              {!hasOptions ? (
                <Icon name="plus" className="h-3.5 w-3.5" strokeWidth={2.2} />
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
