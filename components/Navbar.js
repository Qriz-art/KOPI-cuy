"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Icon from "@/components/Icon";
import { useCart } from "@/components/CartProvider";
import { cafe, navLinks } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-[60] transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-espresso/10 bg-cream/95 backdrop-blur-md"
          : "border-b border-transparent bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${cafe.name} home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-espresso text-amberglow transition-transform duration-300 group-hover:-rotate-6">
            <Icon name="bean" className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-[0.14em] text-espresso">
              KOPI CUY
            </span>
            <span className="mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-caramel">
              Coffee &amp; Eatery
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "bg-beige text-espresso"
                  : "text-cocoa hover:bg-beige/70 hover:text-espresso"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-espresso/12 text-espresso transition hover:bg-beige"
            aria-label={`Buka keranjang, ${count} item`}
          >
            <Icon name="cart" className="h-[1.15rem] w-[1.15rem]" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-clay px-1 text-[0.65rem] font-bold text-cream">
                {count}
              </span>
            ) : null}
          </button>

          <Link href="/order" className="btn-primary hidden px-5 py-2.5 lg:inline-flex">
            Pesan Sekarang
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/12 text-espresso transition hover:bg-beige lg:hidden"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-espresso/10 bg-cream transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="shell space-y-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive(link.href) ? "bg-beige text-espresso" : "text-cocoa hover:bg-beige/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link href="/menu" className="btn-outline w-full">
              Lihat Menu
            </Link>
            <Link href="/order" className="btn-primary w-full">
              Pesan Sekarang
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
