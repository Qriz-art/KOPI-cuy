"use client";

import Link from "next/link";
import { useState } from "react";

import AppImage from "@/components/AppImage";
import Icon from "@/components/Icon";
import QuantityStepper from "@/components/QuantityStepper";
import { useCart } from "@/components/CartProvider";
import { cafe, orderMethods } from "@/data/site";
import { rupiah } from "@/lib/format";
import { buildOrderMessage, openWhatsApp, waLink } from "@/lib/whatsapp";

export default function OrderForm() {
  const { items, subtotal, count, updateQty, removeItem, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", table: "", notes: "" });
  const [method, setMethod] = useState("dine-in");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi.";
    if (!/^[0-9+\-\s()]{8,}$/.test(form.phone.trim())) {
      next.phone = "Nomor WhatsApp belum valid.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const message = buildOrderMessage({ customer: form, items, method });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    openWhatsApp(message);
    setSubmitted({
      message,
      total: subtotal,
      method,
      name: form.name,
      itemCount: count,
    });
  };

  if (submitted) {
    return (
      <div className="card mx-auto max-w-2xl p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-matcha/15 text-matcha">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.4} />
        </span>
        <h2 className="mt-4 font-display text-2xl font-semibold">Pesanan dikirim ke WhatsApp</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cocoa/85">
          Terima kasih, {submitted.name}. Kami akan konfirmasi ketersediaan menu dan estimasi waktu
          penyajian lewat WhatsApp. Pembayaran dilakukan di kasir (tunai atau QRIS).
        </p>

        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-beige/60 p-5 text-left text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-mocha">Jumlah item</span>
            <span className="font-semibold">{submitted.itemCount} item</span>
          </div>
          <div className="mt-2 flex justify-between gap-4">
            <span className="text-mocha">Metode</span>
            <span className="font-semibold">
              {orderMethods.find((entry) => entry.id === submitted.method)?.label}
            </span>
          </div>
          <div className="mt-2 flex justify-between gap-4 border-t border-espresso/10 pt-2">
            <span className="text-mocha">Total</span>
            <span className="font-display text-lg font-semibold tabular-nums">
              {rupiah(submitted.total)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(submitted.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Kirim ulang pesanan
          </a>
          <button
            type="button"
            onClick={() => {
              clearCart();
              setSubmitted(null);
            }}
            className="btn-outline"
          >
            Buat pesanan baru
          </button>
          <Link href="/menu" className="btn-ghost border border-espresso/12">
            Pesan menu lain
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-14 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-beige text-cocoa">
          <Icon name="cart" className="h-7 w-7" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold">Keranjang masih kosong</h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-cocoa/85">
            Tambahkan kopi, makanan, atau snack favoritmu dulu. Pesanan bisa dine-in atau takeaway.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/menu" className="btn-primary">
            Pilih Menu
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link href="/promo" className="btn-outline">
            Lihat Promo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
      <div className="space-y-6">
        <section className="card p-6">
          <header className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold">Ringkasan pesanan</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-mocha">
              {count} item
            </span>
          </header>

          <div className="mt-4 space-y-3">
            {items.map((line) => (
              <article
                key={line.lineId}
                className="flex gap-3 rounded-2xl border border-espresso/[0.08] bg-beige/40 p-3"
              >
                <AppImage
                  src={line.image}
                  alt={line.name}
                  className="h-20 w-20 shrink-0 rounded-xl"
                  sizes="80px"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold">{line.name}</h3>
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
                    <ul className="mt-0.5 space-y-0.5 text-[0.7rem] text-mocha">
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
          </div>
        </section>

        <section className="card p-6">
          <h2 className="font-display text-xl font-semibold">Data pemesan</h2>
          <p className="mt-1 text-sm text-cocoa/80">
            Data ini dipakai untuk konfirmasi pesanan lewat WhatsApp.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="order-name">
                Nama pelanggan *
              </label>
              <input
                id="order-name"
                type="text"
                value={form.name}
                onChange={update("name")}
                placeholder="Nama kamu"
                className="field"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? <p className="mt-1.5 text-xs text-clay">{errors.name}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="order-phone">
                Nomor WhatsApp *
              </label>
              <input
                id="order-phone"
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="08xx xxxx xxxx"
                className="field"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone ? <p className="mt-1.5 text-xs text-clay">{errors.phone}</p> : null}
            </div>

            <div className="sm:col-span-2">
              <span className="field-label">Metode pemesanan *</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {orderMethods.map((entry) => {
                  const active = method === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setMethod(entry.id)}
                      aria-pressed={active}
                      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                        active
                          ? "border-espresso bg-espresso text-cream shadow-soft"
                          : "border-espresso/15 bg-cream text-cocoa hover:border-espresso/35 hover:bg-beige"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          active ? "border-cream bg-cream text-espresso" : "border-espresso/25"
                        }`}
                      >
                        {active ? <Icon name="check" className="h-3 w-3" strokeWidth={3} /> : null}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{entry.label}</span>
                        <span
                          className={`mt-0.5 block text-xs ${active ? "text-cream/70" : "text-mocha"}`}
                        >
                          {entry.hint}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {method === "dine-in" ? (
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="order-table">
                  Nomor meja (opsional)
                </label>
                <input
                  id="order-table"
                  type="text"
                  value={form.table}
                  onChange={update("table")}
                  placeholder="Contoh: 12 atau area outdoor"
                  className="field"
                />
              </div>
            ) : null}

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="order-notes">
                Catatan pesanan
              </label>
              <textarea
                id="order-notes"
                rows={4}
                value={form.notes}
                onChange={update("notes")}
                placeholder="Contoh: es sedikit, gula terpisah, dibungkus rapi"
                className="field resize-none"
              />
            </div>
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card p-6">
          <h2 className="font-display text-xl font-semibold">Total pembayaran</h2>

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-mocha">Subtotal ({count} item)</dt>
              <dd className="font-semibold tabular-nums">{rupiah(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mocha">Pajak &amp; service</dt>
              <dd className="text-mocha">Dihitung di kasir</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-espresso/10 pt-3">
              <dt className="font-semibold">Total estimasi</dt>
              <dd className="font-display text-2xl font-semibold tabular-nums">
                {rupiah(subtotal)}
              </dd>
            </div>
          </dl>

          <button type="submit" className="btn-whatsapp mt-5 w-full">
            <Icon name="whatsapp" className="h-4 w-4" />
            Pesan via WhatsApp
          </button>

          <button
            type="button"
            onClick={clearCart}
            className="mt-2 w-full rounded-full px-4 py-3 text-xs font-semibold text-mocha transition hover:bg-beige hover:text-espresso"
          >
            Kosongkan keranjang
          </button>

          <ul className="mt-5 space-y-2 text-xs leading-relaxed text-mocha">
            <li className="flex gap-2">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-matcha" strokeWidth={2.4} />
              Pesanan otomatis tersusun rapi di chat WhatsApp.
            </li>
            <li className="flex gap-2">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-matcha" strokeWidth={2.4} />
              Pembayaran tunai atau QRIS di kasir {cafe.name}.
            </li>
            <li className="flex gap-2">
              <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-matcha" strokeWidth={2.4} />
              Menu dibuat setelah pesanan dikonfirmasi barista.
            </li>
          </ul>
        </div>
      </aside>
    </form>
  );
}
