import Link from "next/link";

import Icon from "@/components/Icon";
import { cafe, footerLinks } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  const waHref = waLink(
    `Halo ${cafe.name}! Saya mau bertanya seputar menu dan reservasi. Terima kasih!`
  );

  return (
    <footer className="mt-24 border-t border-espresso/10 bg-espresso text-cream">
      <div className="shell grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-16">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cream/10 text-amberglow">
              <Icon name="bean" className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-lg font-semibold tracking-[0.14em]">
                KOPI CUY
              </span>
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-amberglow">
                Coffee &amp; Eatery
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            {cafe.taglineSecondary}
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition hover:bg-[#1f9d55] hover:text-white"
              aria-label="Chat WhatsApp"
            >
              <Icon name="whatsapp" className="h-[1.05rem] w-[1.05rem]" />
            </a>
            <a
              href={cafe.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition hover:bg-caramel"
              aria-label="Instagram Kopi Cuy"
            >
              <Icon name="instagram" className="h-[1.05rem] w-[1.05rem]" />
            </a>
            <a
              href={`mailto:${cafe.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition hover:bg-caramel"
              aria-label="Kirim email"
            >
              <Icon name="mail" className="h-[1.05rem] w-[1.05rem]" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-amberglow">
            Halaman
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
            {footerLinks.halaman.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link-underline transition hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-amberglow">
            Layanan
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
            {footerLinks.layanan.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="link-underline transition hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-amberglow">
            Jam Operasional
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {cafe.hours.map((entry) => (
              <li key={entry.day} className="flex items-center justify-between gap-3">
                <span>{entry.day}</span>
                <span className="tabular-nums text-cream/60">{entry.time}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-amberglow">
            Kontak
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li className="flex gap-2.5">
              <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
              <span>
                {cafe.address.line1}
                <br />
                {cafe.address.line2}
                <br />
                {cafe.address.city}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Icon name="whatsapp" className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                {cafe.whatsapp.display}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
              <a href={`mailto:${cafe.email}`} className="hover:text-cream">
                {cafe.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/55 sm:flex-row">
          <p>
            © {year} {cafe.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-center sm:text-right">
            Data alamat, kontak, dan jam buka pada website ini masih contoh dan mudah diganti.
          </p>
        </div>
      </div>
    </footer>
  );
}
