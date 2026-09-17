import Link from "next/link";
import { Suspense } from "react";

import Icon from "@/components/Icon";
import MenuExplorer from "@/components/MenuExplorer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { menuItems } from "@/data/menu";

export const metadata = {
  title: "Menu",
  description:
    "Daftar lengkap menu Kopi Cuy: kopi signature, non-coffee, tea, makanan utama, snack, dan dessert. Lengkap dengan harga dan pilihan ukuran.",
  alternates: { canonical: "/menu" },
};

const steps = [
  {
    title: "Pilih menu",
    description: "Cari atau filter kategori di atas. Klik kartu menu untuk melihat komposisi dan ukuran.",
    icon: "search",
  },
  {
    title: "Masukkan ke keranjang",
    description: "Atur jumlah dan catatan per menu, lalu lanjut ke ringkasan pesanan.",
    icon: "cart",
  },
  {
    title: "Kirim via WhatsApp",
    description: "Isi nama dan metode pesanan, pesan otomatis terkirim rapi ke WhatsApp kami.",
    icon: "whatsapp",
  },
];

function MenuSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[1.75rem] border border-espresso/[0.07] bg-cream">
          <div className="aspect-[4/3] w-full animate-shimmer bg-gradient-to-r from-beige via-sand to-beige bg-[length:200%_100%]" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 rounded-full bg-beige" />
            <div className="h-3 w-full rounded-full bg-beige/70" />
            <div className="h-3 w-1/2 rounded-full bg-beige/70" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MenuPage({ searchParams }) {
  // Kategori awal dibaca di server supaya grid menu tetap tampil pada HTML
  // pertama (baik untuk SEO) sekaligus mendukung link /menu?category=coffee.
  const initialCategory =
    typeof searchParams?.category === "string" ? searchParams.category : "all";

  return (
    <>
      <PageHero
        eyebrow={`${menuItems.length} menu tersedia`}
        title="Semua menu Kopi Cuy"
        description="Dari espresso klasik, kopi susu gula aren, non-coffee, sampai makanan utama dan dessert. Filter sesuai selera, lalu tambahkan ke keranjang pesanan."
        breadcrumb={[{ label: "Menu" }]}
      >
        <Link href="/promo" className="btn-primary">
          <Icon name="sparkle" className="h-4 w-4" />
          Lihat Promo
        </Link>
        <Link href="/order" className="btn-outline">
          <Icon name="cart" className="h-4 w-4" />
          Keranjang Pesanan
        </Link>
      </PageHero>

      <section className="shell py-12 lg:py-16">
        <Suspense fallback={<MenuSkeleton />}>
          <MenuExplorer initialCategory={initialCategory} />
        </Suspense>
      </section>

      <section className="border-t border-espresso/[0.07] bg-beige/40 py-16">
        <div className="shell">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Cara pesan"
              title="Tiga langkah, pesanan langsung sampai dapur"
              description="Tanpa aplikasi tambahan dan tanpa perlu membuat akun. Semua lewat WhatsApp."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 90}>
                <article className="card h-full p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-espresso text-amberglow">
                      <Icon name={step.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-display text-3xl font-semibold text-sand">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa/85">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-center text-xs italic text-mocha">
            Harga menu pada website ini masih contoh dan mudah diubah dari satu file data.
          </p>
        </div>
      </section>
    </>
  );
}
