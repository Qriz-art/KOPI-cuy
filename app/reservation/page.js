import Link from "next/link";

import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import ReservationForm from "@/components/ReservationForm";
import Reveal from "@/components/Reveal";
import { cafe } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export const metadata = {
  title: "Reservasi Meja",
  description:
    "Ajukan reservasi meja di Kopi Cuy untuk nongkrong, kerja, atau kumpul bersama teman. Proses cepat lewat WhatsApp dan dikonfirmasi pihak cafe.",
  alternates: { canonical: "/reservation" },
};

const rules = [
  {
    icon: "users",
    title: "Grup kecil & besar",
    description: "Untuk 1 - 15 orang bisa langsung lewat form. Lebih dari itu, hubungi kami dulu.",
  },
  {
    icon: "clock",
    title: "Konfirmasi 1 x 24 jam",
    description: "Ajuan reservasi kami balas lewat WhatsApp pada hari yang sama atau maksimal besok.",
  },
  {
    icon: "heart",
    title: "Meja ditahan 20 menit",
    description: "Kalau terlambat, kabari kami supaya meja tetap bisa ditahan.",
  },
  {
    icon: "spoon",
    title: "Pemesanan menu",
    description:
      "Menu bisa dipesan saat tiba, atau lebih cepat lewat halaman pesanan supaya tidak menunggu.",
  },
];

export default function ReservationPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservasi meja"
        title="Booking meja tanpa ribet"
        description="Isi form reservasi, lalu detailnya otomatis terkirim ke WhatsApp kami. Cocok untuk kumpul komunitas, kerja kelompok, atau acara kecil."
        breadcrumb={[{ label: "Reservation" }]}
      >
        <Link href="/menu" className="btn-outline">
          <Icon name="cup" className="h-4 w-4" />
          Lihat menu dulu
        </Link>
        <a
          href={waLink(`Halo ${cafe.name}! Saya mau tanya soal reservasi meja.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          Tanya langsung
        </a>
      </PageHero>

      <section className="shell grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr] lg:py-16">
        <Reveal>
          <ReservationForm />
        </Reveal>

        <Reveal delay={100} className="space-y-6">
          <div className="card p-6">
            <h2 className="font-display text-xl font-semibold">Informasi reservasi</h2>
            <ul className="mt-5 space-y-5">
              {rules.map((rule) => (
                <li key={rule.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-beige text-clay">
                    <Icon name={rule.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{rule.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-cocoa/85">
                      {rule.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold">Jam operasional</h2>
            <ul className="mt-4 space-y-2 text-sm text-cocoa/85">
              {cafe.hours.map((entry) => (
                <li key={entry.day} className="flex items-center justify-between gap-3">
                  <span>{entry.day}</span>
                  <span className="tabular-nums text-mocha">{entry.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-mocha">
              Reservasi di luar jam operasional bisa kami coba atur untuk acara khusus. Hubungi kami
              lewat WhatsApp untuk diskusi.
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-espresso p-6 text-cream shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amberglow">
              Lokasi kami
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              {cafe.address.line1}
              <br />
              {cafe.address.line2}
              <br />
              {cafe.address.city}
            </p>
            <a
              href={cafe.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-4 border border-cream/25 text-cream hover:bg-cream/10"
            >
              <Icon name="map" className="h-4 w-4" />
              Buka Google Maps
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
