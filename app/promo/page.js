import Link from "next/link";

import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import PromoCard from "@/components/PromoCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { promoNotes, promos } from "@/data/promos";
import { cafe } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export const metadata = {
  title: "Promo & Menu Spesial",
  description:
    "Promo Kopi Cuy: happy hour kopi, paket nongkrong berempat, bundling kopi dan snack, serta menu musiman terbatas dengan periode yang jelas.",
  alternates: { canonical: "/promo" },
};

export default function PromoPage() {
  return (
    <>
      <PageHero
        eyebrow="Promo & offers"
        title="Promo yang bikin ngopi makin santai"
        description="Semua promo di bawah berlaku di tempat maupun takeaway. Sebutkan kode promo kepada barista atau saat memesan lewat WhatsApp."
        breadcrumb={[{ label: "Promo" }]}
      >
        <Link href="/menu" className="btn-primary">
          Lihat Menu
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
        <a
          href={waLink(`Halo ${cafe.name}! Saya mau tanya promo yang sedang berlaku.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          Tanya promo aktif
        </a>
      </PageHero>

      <section className="shell py-12 lg:py-16">
        <div className="space-y-8">
          {promos.map((promo, index) => (
            <Reveal key={promo.id} delay={(index % 2) * 80}>
              <PromoCard promo={promo} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="grid gap-6 rounded-[2rem] border border-espresso/[0.07] bg-beige/40 p-7 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Syarat & ketentuan"
                title="Biar tidak bingung di kasir"
                description="Beberapa aturan sederhana yang berlaku untuk semua promo."
              />
              <ul className="mt-5 space-y-2.5 text-sm text-cocoa/85">
                {promoNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-matcha" strokeWidth={2.4} />
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] bg-espresso p-6 text-cream">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amberglow">
                Promo khusus komunitas
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/80">
                Punya komunitas, kampus, atau kantor di sekitar? Kami bisa siapkan harga khusus untuk
                pesanan dalam jumlah banyak, misalnya untuk rapat atau acara komunitas.
              </p>
              <a
                href={waLink(
                  `Halo ${cafe.name}! Saya mau tanya promo khusus untuk pesanan komunitas / kantor.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-5 w-full"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Diskusi lewat WhatsApp
              </a>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-xs italic text-mocha">
          Periode, harga, dan isi paket promo di halaman ini masih contoh dan mudah diubah dari file
          data promo.
        </p>
      </section>
    </>
  );
}
