"use client";

import { useMemo, useState } from "react";

import Icon from "@/components/Icon";
import QuantityStepper from "@/components/QuantityStepper";
import { useCart } from "@/components/CartProvider";
import { defaultOptions, priceWithOptions } from "@/data/menu";
import { rupiah } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";

/** Pilihan ukuran/varian + jumlah + tombol tambah ke pesanan */
export default function ProductOptions({ item, onAdded, showNote = true, askWhatsApp = true }) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState(() => defaultOptions(item));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  const unitPrice = useMemo(() => priceWithOptions(item, selected), [item, selected]);

  const choose = (optionId, choiceId) => {
    setSelected((current) => ({ ...current, [optionId]: choiceId }));
  };

  const handleAdd = () => {
    addItem(item, selected, qty, note.trim());
    setQty(1);
    setNote("");
    onAdded?.();
  };

  return (
    <div className="space-y-5">
      {(item.options ?? []).map((option) => (
        <div key={option.id}>
          <p className="field-label">{option.label}</p>
          <div className="flex flex-wrap gap-2">
            {option.choices.map((choice) => {
              const active = selected[option.id] === choice.id;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => choose(option.id, choice.id)}
                  aria-pressed={active}
                  className={`rounded-2xl border px-3.5 py-2 text-left text-xs font-semibold transition ${
                    active
                      ? "border-espresso bg-espresso text-cream shadow-soft"
                      : "border-espresso/15 bg-cream text-cocoa hover:border-espresso/35 hover:bg-beige"
                  }`}
                >
                  <span className="block">{choice.label}</span>
                  {choice.priceDelta ? (
                    <span
                      className={`mt-0.5 block text-[0.65rem] font-medium ${
                        active ? "text-cream/70" : "text-mocha"
                      }`}
                    >
                      +{rupiah(choice.priceDelta)}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {showNote ? (
        <div>
          <label className="field-label" htmlFor={`note-${item.slug}`}>
            Catatan untuk menu ini (opsional)
          </label>
          <input
            id={`note-${item.slug}`}
            type="text"
            value={note}
            maxLength={120}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Contoh: less sugar, tanpa es, saus dipisah"
            className="field"
          />
        </div>
      ) : null}

      <div className="rounded-2xl border border-espresso/[0.08] bg-beige/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="field-label mb-1">Jumlah</p>
            <QuantityStepper value={qty} onChange={setQty} max={20} />
          </div>
          <div className="text-right">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mocha">
              Total
            </p>
            <p className="font-display text-2xl font-semibold tabular-nums">
              {rupiah(unitPrice * qty)}
            </p>
          </div>
        </div>

        <button type="button" onClick={handleAdd} className="btn-primary mt-4 w-full">
          <Icon name="cart" className="h-4 w-4" />
          Tambah ke Pesanan
        </button>

        {askWhatsApp ? (
          <a
            href={waLink(
              `Halo Kopi Cuy! Saya mau tanya menu ${item.name} (${rupiah(unitPrice)}). Apakah tersedia hari ini?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-2 w-full"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Tanya stok via WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}
