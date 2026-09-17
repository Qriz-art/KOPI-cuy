import Link from "next/link";

import GalleryGrid from "@/components/GalleryGrid";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { cafe } from "@/data/site";
import { galleryCategories, galleryItems } from "@/data/testimonials";
import { waLink } from "@/lib/whatsapp";

export const metadata = {
  title: "Gallery",
  description:
    "Galeri foto Kopi Cuy: interior kedai, bar counter, menu kopi dan makanan, acara komunitas, serta suasana cafe dari pagi sampai malam.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const counts = galleryCategories.map((category) => ({
    ...category,
    total:
      category.id === "all"
        ? galleryItems.length
        : galleryItems.filter((item) => item.category === category.id).length,
  }));

  return (
    <>
      <PageHero
        eyebrow={`${galleryItems.length} foto`}
        title="Suasana Kopi Cuy dari hari ke hari"
        description="Interior hangat, bar counter, proses seduh, sampai acara komunitas. Klik foto untuk melihat versi besarnya."
        breadcrumb={[{ label: "Gallery" }]}
      >
        <a
          href={cafe.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <Icon name="map" className="h-4 w-4" />
          Lihat lokasi
        </a>
        <a
          href={waLink(`Halo ${cafe.name}! Saya mau tanya soal tempat untuk foto / konten.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          Tanya soal tempat
        </a>
      </PageHero>

      <section className="shell py-12 lg:py-16">
        <div className="mb-6 flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.14em] text-mocha">
          {counts.slice(1).map((category) => (
            <span key={category.id}>
              {category.label} · {category.total}
            </span>
          ))}
        </div>

        <GalleryGrid />

        <p className="mt-8 text-xs italic text-mocha">
          Foto pada galeri ini masih placeholder (foto stok) dan bisa diganti dengan foto asli Kopi Cuy
          lewat file data galeri.
        </p>
      </section>

      <section className="border-t border-espresso/[0.07] bg-beige/40 py-16">
        <Reveal className="shell">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-cream p-8 shadow-soft sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold">Mau bikin acara di Kopi Cuy?</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-cocoa/85">
                Kami sering kedatangan komunitas untuk open mic, sharing barista, dan kerja kelompok.
                Ajukan reservasi meja dulu supaya tempatnya kami siapkan.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/reservation" className="btn-primary">
                Reservasi Meja
              </Link>
              <Link href="/contact" className="btn-outline">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
