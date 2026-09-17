import Link from "next/link";
import { Suspense } from "react";

import Icon from "@/components/Icon";
import OrderForm from "@/components/OrderForm";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Pesanan",
  description:
    "Ringkasan keranjang dan form pemesanan Kopi Cuy. Pesan dine-in atau takeaway, lalu kirim pesanan lewat WhatsApp.",
  alternates: { canonical: "/order" },
};

const notes = [
  {
    icon: "whatsapp",
    title: "Dipesan lewat WhatsApp",
    description:
      "Pesanan dikirim sebagai chat rapi berisi daftar menu, jumlah, catatan, dan total estimasi.",
  },
  {
    icon: "clock",
    title: "Dikonfirmasi barista",
    description:
      "Kami balas untuk konfirmasi ketersediaan stok dan estimasi waktu penyajian.",
  },
  {
    icon: "spoon",
    title: "Bayar di kasir",
    description: "Pembayaran tunai atau QRIS setelah pesanan selesai - belum ada payment gateway.",
  },
];

export default function OrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Keranjang & pemesanan"
        title="Selesaikan pesananmu"
        description="Cek kembali menu yang sudah dipilih, lengkapi data pemesan, lalu kirim pesanan lewat WhatsApp. Bisa untuk dine-in maupun takeaway."
        breadcrumb={[{ label: "Pesanan" }]}
      >
        <Link href="/menu" className="btn-outline">
          <Icon name="plus" className="h-4 w-4" />
          Tambah menu lain
        </Link>
      </PageHero>

      <section className="shell py-12 lg:py-16">
        <Suspense
          fallback={
            <div className="card mx-auto max-w-2xl px-6 py-14 text-center text-sm text-mocha">
              Menyiapkan keranjang...
            </div>
          }
        >
          <OrderForm />
        </Suspense>
      </section>

      <section className="border-t border-espresso/[0.07] bg-beige/40 py-14">
        <div className="shell grid gap-6 md:grid-cols-3">
          {notes.map((note) => (
            <article key={note.title} className="flex gap-4 rounded-[1.75rem] bg-cream p-6 shadow-soft">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-beige text-clay">
                <Icon name={note.icon} className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">{note.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-cocoa/85">{note.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
