import Link from "next/link";

import Icon from "@/components/Icon";

export const metadata = {
  title: "Halaman tidak ditemukan",
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-beige text-clay">
        <Icon name="cup" className="h-9 w-9" />
      </span>
      <p className="mt-6 font-display text-5xl font-semibold">404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold">
        Halaman ini sepertinya sudah habis diminum
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-cocoa/85">
        Halaman yang kamu cari tidak ditemukan. Coba kembali ke beranda atau langsung lihat menu kami.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
          Kembali ke Home
        </Link>
        <Link href="/menu" className="btn-outline">
          Lihat Menu
        </Link>
      </div>
    </section>
  );
}
