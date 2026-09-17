import { priceWithOptions } from "@/data/menu";

/** Kunci unik baris keranjang: menu + kombinasi opsi yang dipilih */
export function makeLineId(slug, selected = {}) {
  const key = Object.keys(selected)
    .sort()
    .map((optionId) => `${optionId}:${selected[optionId]}`)
    .join("|");
  return key ? `${slug}__${key}` : slug;
}

/** ["Ukuran: Large", "Penyajian: Es"] untuk ringkasan & pesan WhatsApp */
export function describeOptions(item, selected = {}) {
  return (item?.options ?? [])
    .map((option) => {
      const choice = option.choices.find((entry) => entry.id === selected[option.id]);
      return choice ? `${option.label}: ${choice.label}` : null;
    })
    .filter(Boolean);
}

export function buildCartLine(item, selected = {}, qty = 1, note = "") {
  return {
    lineId: makeLineId(item.slug, selected),
    slug: item.slug,
    name: item.name,
    image: item.image,
    category: item.category,
    qty,
    note,
    selected,
    options: describeOptions(item, selected),
    unitPrice: priceWithOptions(item, selected),
  };
}

export function cartTotal(items = []) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
}

export function cartCount(items = []) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}
