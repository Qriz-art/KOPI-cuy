import Link from "next/link";
import { notFound } from "next/navigation";

import AppImage from "@/components/AppImage";
import FeaturedMenu from "@/components/FeaturedMenu";
import Icon from "@/components/Icon";
import JsonLd, { productSchema } from "@/components/JsonLd";
import ProductOptions from "@/components/ProductOptions";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StarRating from "@/components/StarRating";
import { getItemBySlug, getRelatedItems, labelMeta, menuItems } from "@/data/menu";
import { rupiah } from "@/lib/format";

export function generateStaticParams() {
  return menuItems.map((item) => ({ slug: item.slug }));
}

// Slug di luar daftar menu langsung dijawab 404, bukan dirender on-demand.
export const dynamicParams = false;

export function generateMetadata({ params }) {
  const item = getItemBySlug(params.slug);
  if (!item) {
    return { title: "Menu tidak ditemukan" };
  }

  return {
    title: item.name,
    description: `${item.description} Harga mulai ${rupiah(item.price)} di Kopi Cuy.`,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: {
      title: `${item.name} · Kopi Cuy`,
      description: item.description,
      images: [{ url: item.image }],
    },
  };
}

export default function ProductDetailPage({ params }) {
  const item = getItemBySlug(params.slug);
  if (!item) notFound();

  const related = getRelatedItems(item, 3);
  const labels = item.labels.map((label) => labelMeta[label]).filter(Boolean);

  return (
    <>
      <JsonLd data={productSchema(item)} />

      <section className="border-b border-espresso/[0.07] bg-beige/40 py-8">
        <div className="shell">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-mocha">
              <li>
                <Link href="/" className="transition hover:text-clay">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="chevronRight" className="h-3 w-3 opacity-60" />
                <Link href="/menu" className="transition hover:text-clay">
                  Menu
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="chevronRight" className="h-3 w-3 opacity-60" />
                <Link
                  href={`/menu?category=${item.category}`}
                  className="capitalize transition hover:text-clay"
                >
                  {item.category.replace("-", " ")}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="chevronRight" className="h-3 w-3 opacity-60" />
                <span className="font-semibold text-cocoa">{item.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="shell grid gap-10 py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-16">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-espresso/10 shadow-lift">
            <AppImage
              src={item.image}
              alt={item.name}
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="aspect-[4/3] w-full"
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

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-espresso/[0.07] bg-cream p-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mocha">
                Rating
              </p>
              <p className="mt-1 font-display text-lg font-semibold">{item.rating?.toFixed(1)}</p>
            </div>
            <div className="rounded-2xl border border-espresso/[0.07] bg-cream p-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mocha">
                Dibuat
              </p>
              <p className="mt-1 font-display text-lg font-semibold">Fresh</p>
            </div>
            <div className="rounded-2xl border border-espresso/[0.07] bg-cream p-3">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-mocha">
                Kategori
              </p>
              <p className="mt-1 font-display text-lg font-semibold capitalize">
                {item.category.replace("-", " ")}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow capitalize">{item.category.replace("-", " ")}</span>
            <StarRating value={item.rating ?? 5} className="h-3.5 w-3.5" />
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{item.name}</h1>

          <div className="mt-3 flex items-end gap-3">
            <p className="font-display text-3xl font-semibold tabular-nums">{rupiah(item.price)}</p>
            <p className="pb-1 text-xs text-mocha">harga dasar, belum termasuk pajak</p>
          </div>

          <p className="mt-5 text-[0.98rem] leading-relaxed text-cocoa/85">{item.description}</p>

          {item.composition?.length ? (
            <div className="mt-6 rounded-[1.75rem] border border-espresso/[0.07] bg-beige/45 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
                Komposisi &amp; informasi
              </p>
              <ul className="mt-3 grid gap-2 text-sm text-cocoa/85 sm:grid-cols-2">
                {item.composition.map((part) => (
                  <li key={part} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-matcha" strokeWidth={2.4} />
                    {part}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-7">
            <ProductOptions item={item} />
          </div>

          <ul className="mt-6 grid gap-2 text-xs text-mocha sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <Icon name="clock" className="h-3.5 w-3.5" />
              Estimasi penyajian 5 - 12 menit
            </li>
            <li className="flex items-center gap-2">
              <Icon name="map" className="h-3.5 w-3.5" />
              Tersedia dine-in &amp; takeaway
            </li>
          </ul>
        </Reveal>
      </section>

      <section className="border-t border-espresso/[0.07] bg-beige/40 py-16">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Rekomendasi"
                title="Cocok dipesan bareng ini"
                description="Menu lain yang paling sering dipesan bersama pilihanmu."
              />
              <Link href="/menu" className="btn-outline shrink-0">
                Lihat semua menu
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10">
            <FeaturedMenu items={related} columns={3} />
          </div>
        </div>
      </section>
    </>
  );
}
