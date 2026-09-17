import Link from "next/link";

import AppImage from "@/components/AppImage";
import FeaturedMenu from "@/components/FeaturedMenu";
import Icon from "@/components/Icon";
import Marquee from "@/components/Marquee";
import PromoCard from "@/components/PromoCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StarRating from "@/components/StarRating";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getFeaturedItems, getItemsByLabel } from "@/data/menu";
import { promos } from "@/data/promos";
import { cafe, highlights, values } from "@/data/site";
import { galleryItems, testimonialNote } from "@/data/testimonials";
import { photo } from "@/lib/images";
import { rupiah } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";

export const metadata = {
  alternates: { canonical: "/" },
  title: "Kopi Cuy - Ngopi Santai, Cerita Sampai Nanti",
};

const heroWa = waLink(
  `Halo ${cafe.name}! Saya mau pesan untuk hari ini. Boleh minta rekomendasi menu?`
);

export default function HomePage() {
  const featured = getFeaturedItems(4);
  const bestSellers = getItemsByLabel("best-seller", 3);
  const heroItem = featured[0];
  const promoList = promos.filter((promo) => promo.featured).slice(0, 2);
  const galleryPreview = galleryItems.slice(0, 5);

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-6 h-80 w-80 animate-floatslow rounded-blob bg-caramel/15 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 animate-floaty rounded-blob bg-matcha/12 blur-2xl"
        />
        <Icon
          name="bean"
          className="pointer-events-none absolute right-[8%] top-[18%] hidden h-24 w-24 rotate-12 text-caramel/20 lg:block"
          strokeWidth={1.1}
        />

        <div className="shell relative grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
          <Reveal className="flex flex-col items-start">
            <span className="eyebrow">
              <Icon name="bean" className="h-3.5 w-3.5" />
              Coffee &amp; Eatery · Sejak {cafe.established}
            </span>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Ngopi Santai,{" "}
              <span className="italic text-caramel">Cerita Sampai Nanti.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-cocoa/85">
              {cafe.taglineSecondary}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/menu" className="btn-primary">
                Lihat Menu
              </Link>
              <Link href="/order" className="btn-accent">
                <Icon name="cart" className="h-4 w-4" />
                Pesan Sekarang
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              {cafe.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-mocha">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href={heroWa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-clay transition hover:text-caramel"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Atau tanya barista kami di WhatsApp
            </a>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-espresso/10 shadow-lift">
                <AppImage
                  src={photo("1511920170033-f8396924c348", 900)}
                  alt="Secangkir kopi signature Kopi Cuy"
                  priority
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="h-full w-full"
                  icon="cup"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent" />
              </div>

              <div className="absolute -left-4 top-8 hidden w-48 animate-floaty rounded-2xl border border-espresso/[0.07] bg-cream/95 p-3.5 shadow-card backdrop-blur sm:block">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-espresso text-amberglow">
                    <Icon name="cup" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-mocha">
                      Best seller
                    </p>
                    <p className="text-sm font-semibold">{heroItem?.name ?? "Es Kopi Susu Cuy"}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm font-semibold tabular-nums text-clay">
                  {rupiah(heroItem?.price ?? 24000)}
                </p>
              </div>

              <div className="absolute -bottom-5 right-0 hidden animate-floatslow rounded-2xl border border-espresso/[0.07] bg-cream/95 px-4 py-3 shadow-card backdrop-blur sm:block">
                <StarRating value={5} className="h-3.5 w-3.5" label="Rating 5 dari 5" />
                <p className="mt-1 text-xs font-semibold">Dibuat setelah dipesan</p>
                <p className="text-[0.7rem] text-mocha">Buka {cafe.hoursShort}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ---------------------------------------------------- KEUNGGULAN */}
      <section className="shell py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Kenapa Kopi Cuy"
            title="Kopi enak, tempat nyaman, harga masuk akal"
            description="Tiga hal yang kami jaga setiap hari supaya kamu betah datang lagi."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className="card group h-full p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-beige text-clay transition-colors duration-300 group-hover:bg-espresso group-hover:text-amberglow">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa/85">{item.description}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-caramel">
                  {item.stat}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- MENU FAVORIT */}
      <section className="border-y border-espresso/[0.07] bg-beige/40 py-16 lg:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Menu favorit"
                title="Paling sering dipesan pelanggan"
                description="Empat menu andalan yang paling sering dipesan. Klik kartu untuk melihat komposisi, pilihan ukuran, dan menambahkannya ke keranjang."
              />
              <Link href="/menu" className="btn-outline shrink-0">
                Lihat semua menu
              </Link>
            </div>
          </Reveal>

          <div className="mt-10">
            <FeaturedMenu items={featured} />
          </div>

          <Reveal className="mt-10">
            <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] border border-dashed border-espresso/15 bg-cream/70 p-5">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-clay">
                <Icon name="sparkle" className="h-4 w-4" />
                Best seller lain
              </span>
              {bestSellers.map((item) => (
                <Link
                  key={item.slug}
                  href={`/menu/${item.slug}`}
                  className="rounded-full border border-espresso/12 bg-cream px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:border-caramel/50 hover:text-clay"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- PROMO */}
      <section className="bg-espresso py-16 text-cream lg:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                light
                eyebrow="Promo & menu spesial"
                title="Ada promo, jadi makin santai"
                description="Promo jam sepi, paket nongkrong bareng, dan menu musiman terbatas. Sebutkan kode promo saat memesan."
              />
              <Link href="/promo" className="btn-accent shrink-0">
                Lihat semua promo
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {promoList.map((promo, index) => (
              <Reveal key={promo.id} delay={index * 100}>
                <PromoCard promo={promo} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- ABOUT */}
      <section className="shell grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-20">
        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-4">
            <AppImage
              src={photo("1559925393-8be0ec4767c8", 800)}
              alt="Interior Kopi Cuy dengan tanaman"
              className="aspect-[3/4] rounded-[2rem] border border-espresso/10 shadow-card"
              sizes="(max-width: 1024px) 45vw, 260px"
              icon="sofa"
            />
            <div className="mt-8 space-y-4">
              <AppImage
                src={photo("1501339847302-ac426a4a7cbb", 800)}
                alt="Barista menyiapkan kopi"
                className="aspect-[4/3] rounded-[2rem] border border-espresso/10 shadow-card"
                sizes="(max-width: 1024px) 45vw, 260px"
                icon="bean"
              />
              <div className="rounded-[2rem] bg-espresso p-5 text-cream shadow-card">
                <p className="font-display text-2xl font-semibold">Sejak {cafe.established}</p>
                <p className="mt-1 text-xs leading-relaxed text-cream/70">
                  Dari gerobak kecil di depan gang, sekarang punya tempat sendiri di Jl. Melati Raya.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <SectionHeading
            eyebrow="Tentang Kopi Cuy"
            title="Kedai kecil yang tumbuh dari kebiasaan ngopi bareng"
            description="Kami percaya kopi yang enak tidak harus mahal, dan tempat yang nyaman tidak harus mewah. Yang penting konsisten: biji pilihan, resep yang dijaga, dan orang-orang yang ramah."
          />

          <ul className="mt-8 space-y-5">
            {values.map((value) => (
              <li key={value.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-beige text-clay">
                  <Icon name={value.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">{value.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-cocoa/85">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/about" className="btn-outline mt-8">
            Selengkapnya tentang kami
          </Link>
        </Reveal>
      </section>

      {/* ------------------------------------------------------- GALLERY */}
      <section className="border-y border-espresso/[0.07] bg-beige/40 py-16 lg:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Gallery"
                title="Suasana Kopi Cuy"
                description="Interior hangat, bar counter, sampai acara komunitas. Lihat galeri lengkapnya untuk melihat tempat kami lebih dekat."
              />
              <Link href="/gallery" className="btn-outline shrink-0">
                Buka galeri
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {galleryPreview.map((item, index) => (
              <Reveal
                key={item.id}
                delay={(index % 4) * 70}
                className={index === 0 ? "col-span-2 row-span-2" : ""}
              >
                <Link
                  href="/gallery"
                  className="group relative block h-full overflow-hidden rounded-[1.75rem] border border-espresso/[0.07] shadow-soft"
                >
                  <AppImage
                    src={item.image}
                    alt={item.title}
                    className={`w-full ${index === 0 ? "aspect-square lg:aspect-[4/5]" : "aspect-square"}`}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.07]"
                    icon="sparkle"
                    fallbackLabel={item.title}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 translate-y-2 text-sm font-semibold text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- TESTIMONIALS */}
      <section className="shell py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Testimoni"
            title="Kata pelanggan Kopi Cuy"
            description="Beberapa ulasan pelanggan yang rutin datang. Yuk cerita pengalaman ngopimu di Kopi Cuy juga."
          />
        </Reveal>

        <div className="mt-8">
          <TestimonialCarousel />
        </div>

        <p className="mt-4 text-xs italic text-mocha">{testimonialNote}</p>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="shell pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-7 py-12 text-cream shadow-lift sm:px-12 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-blob bg-caramel/25 blur-2xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 left-10 h-52 w-52 rounded-blob bg-matcha/20 blur-2xl"
            />

            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="eyebrow border-amberglow/30 bg-amberglow/15 text-amberglow">
                  Reservasi &amp; pesanan
                </span>
                <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                  Mau nongkrong santai hari ini?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/75">
                  Pesan menu untuk dine-in atau takeaway lewat WhatsApp, atau ajukan reservasi meja
                  untuk kumpul bareng teman dan keluarga.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/menu" className="btn-accent">
                    Lihat Menu
                  </Link>
                  <Link
                    href="/reservation"
                    className="btn border border-cream/25 text-cream hover:bg-cream/10"
                  >
                    Reservasi Meja
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-cream/15 bg-cream/5 p-6 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amberglow">
                  Jam operasional
                </p>
                <ul className="mt-4 space-y-2 text-sm text-cream/80">
                  {cafe.hours.map((entry) => (
                    <li key={entry.day} className="flex items-center justify-between gap-3">
                      <span>{entry.day}</span>
                      <span className="tabular-nums text-cream/60">{entry.time}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={heroWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp mt-5 w-full"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  Chat {cafe.whatsapp.display}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
