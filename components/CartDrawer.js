"use client";

import Link from "next/link";
import { useEffect } from "react";

import AppImage from "@/components/AppImage";
import Icon from "@/components/Icon";
import QuantityStepper from "@/components/QuantityStepper";
import { useCart } from "@/components/CartProvider";
import { rupiah } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, clearCart, subtotal, count } = useCart();

  // Tutup dengan tombol Escape dan kunci scroll halaman saat drawer terbuka.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeCart();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[70] bg-espresso/45 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        /* Saat tertutup drawer tidak boleh diumumkan sebagai dialog aktif */
        {...(isOpen
          ? { role: "dialog", "aria-modal": "true", "aria-label": "Keranjang pesanan" }
          : { "aria-hidden": "true" })}
        className={`fixed inset-y-0 right-0 z-[75] flex w-full max-w-md flex-col border-l border-espresso/10 bg-cream shadow-lift transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
          <div>
            <p className="font-display text-lg font-semibold">Keranjang Pesanan</p>
            <p className="text-xs text-mocha">
              {count > 0 ? `${count} item siap dipesan` : "Belum ada menu dipilih"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-espresso/10 p-2 text-cocoa transition hover:bg-beige"
            aria-label="Tutup keranjang"
          >
            <Icon name="close" className="h-4 w-4" strokeWidth={2} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-beige text-cocoa">
              <Icon name="cart" className="h-7 w-7" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold">Keranjang masih kosong</p>
              <p className="mt-1 text-sm text-mocha">
                Pilih kopi atau makanan favoritmu dulu, lalu kembali ke sini untuk memesan.
              </p>
            </div>
            <Link href="/menu" onClick={closeCart} className="btn-accent">
              Lihat Menu
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((line) => (
                <article
                  key={line.lineId}
                  className="flex gap-3 rounded-2xl border border-espresso/[0.08] bg-beige/50 p-3"
                >
                  <AppImage
                    src={line.image}
                    alt={line.name}
                    className="h-20 w-20 shrink-0 rounded-xl"
                    sizes="80px"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold">{line.name}</h3>
                      <button
                        type="button"
                        onClick={() => removeItem(line.lineId)}
                        className="text-mocha transition hover:text-clay"
                        aria-label={`Hapus ${line.name}`}
                      >
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                    {line.options?.length ? (
                      <ul className="mt-0.5 space-y-0.5 text-[0.7rem] leading-relaxed text-mocha">
                        {line.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ul>
                    ) : null}
                    {line.note ? (
                      <p className="mt-1 text-[0.7rem] italic text-mocha">Catatan: {line.note}</p>
                    ) : null}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityStepper
                        size="sm"
                        value={line.qty}
                        onChange={(qty) => updateQty(line.lineId, qty)}
                      />
                      <p className="text-sm font-semibold tabular-nums">
                        {rupiah(line.unitPrice * line.qty)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="mx-auto mt-2 block text-xs font-semibold text-mocha underline-offset-4 transition hover:text-clay hover:underline"
              >
                Kosongkan keranjang
              </button>
            </div>

            <footer className="border-t border-espresso/10 bg-beige/40 px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-mocha">Subtotal</span>
                <span className="font-display text-xl font-semibold tabular-nums">
                  {rupiah(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-[0.7rem] leading-relaxed text-mocha">
                Belum termasuk pajak. Pesanan dikonfirmasi lewat WhatsApp setelah kamu kirim.
              </p>
              <Link
                href="/order"
                onClick={closeCart}
                className="btn-primary mt-4 w-full"
              >
                Lihat Ringkasan Pesanan
              </Link>
              <button type="button" onClick={closeCart} className="btn-outline mt-2 w-full">
                Tambah menu lain
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
