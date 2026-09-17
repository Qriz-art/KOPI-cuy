import Link from "next/link";

import AppImage from "@/components/AppImage";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { aboutStory, cafe, values } from "@/data/site";
import { photo } from "@/lib/images";

export const metadata = {
  title: "Tentang Kami",
  description:
    "Cerita Kopi Cuy: dari gerobak kecil pada 2021 sampai menjadi kedai kopi dan eatery dengan kopi pilihan serta tempat yang nyaman untuk nongkrong dan bekerja.",
  alternates: { canonical: "/about" },
};

const focus = [
  {
    title: "Biji kopi pilihan",
    description:
      "Kami ambil biji dari Gayo, Toraja, dan Kintamani. Roasting dilakukan mingguan supaya rasanya tetap segar.",
    icon: "bean",
  },
  {
    title: "Bahan segar harian",
    description:
      "Sayur, ayam, dan bahan dessert dibeli harian. Menu yang lewat stok tidak kami paksakan jual.",
    icon: "leaf",
  },
  {
    title: "Resep yang dijaga",
    description:
      "Setiap resep punya takaran standar supaya rasa es kopi susu hari ini sama dengan minggu lalu.",
    icon: "cup",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Kedai kopi sejak ${cafe.established}`}
        title="Kopi Cuy, tempat ngopi yang tumbuh dari kebiasaan kumpul"
        description="Kami bukan kedai besar. Kami hanya kedai yang berusaha menjaga rasa kopi, kualitas bahan, dan suasana supaya orang mau pulang dengan perasaan lebih ringan."
        breadcrumb={[{ label: "About" }]}
      >
        <Link href="/menu" className="btn-primary">
          Lihat Menu
        </Link>
        <Link href="/gallery" className="btn-outline">
          Lihat Galeri
        </Link>
      </PageHero>

      <section className="shell grid gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Cerita kami"
            title="Dari gerobak kecil di depan gang"
            description="Perjalanan sederhana yang kami jalani sampai sekarang."
          />

          <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-cocoa/85">
            {aboutStory.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-6">
            {cafe.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-semibold">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-mocha">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-2 gap-4">
            <AppImage
              src={photo("1501339847302-ac426a4a7cbb", 800)}
              alt="Barista Kopi Cuy menyiapkan pesanan"
              className="aspect-[3/4] rounded-[2rem] border border-espresso/10 shadow-card"
              sizes="(max-width: 1024px) 45vw, 280px"
              icon="bean"
            />
            <div className="mt-10 space-y-4">
              <AppImage
                src={photo("1521017432531-fbd92d768814", 800)}
                alt="Suasana ruang utama Kopi Cuy"
                className="aspect-square rounded-[2rem] border border-espresso/10 shadow-card"
                sizes="(max-width: 1024px) 45vw, 280px"
                icon="sofa"
              />
              <AppImage
                src={photo("1554118811-1e0d58224f24", 800)}
                alt="Pelanggan bekerja di Kopi Cuy"
                className="aspect-[4/3] rounded-[2rem] border border-espresso/10 shadow-card"
                sizes="(max-width: 1024px) 45vw, 280px"
                icon="users"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-espresso/[0.07] bg-beige/40 py-16">
        <div className="shell">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Filosofi"
              title="Tiga hal yang kami jaga"
              description="Bukan janji yang muluk - hanya standar sederhana yang kami kerjakan setiap hari."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 90}>
                <article className="card h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-espresso text-amberglow">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa/85">{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Fokus kami"
            title="Kopi dulu, lalu semuanya"
            description="Kami memilih bahan dengan teliti supaya setiap cangkir dan setiap piring bisa dinikmati tanpa ragu."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {focus.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className="flex h-full gap-4 rounded-[1.75rem] border border-espresso/[0.07] bg-cream p-6 shadow-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-beige text-clay">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cocoa/85">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-espresso p-8 text-cream sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold">Mampir dan coba sendiri</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/75">
                Alamat dan jam buka kami ada di halaman kontak. Kalau mau menyiapkan menu lebih dulu,
                pesan lewat WhatsApp supaya tidak menunggu.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-accent">
                Kontak &amp; Lokasi
              </Link>
              <Link href="/order" className="btn border border-cream/25 text-cream hover:bg-cream/10">
                Pesan Sekarang
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
