import { cafe } from "@/data/site";
import { formatDateLong, rupiah } from "@/lib/format";

/** Membuat link wa.me dengan pesan yang sudah di-encode */
export function waLink(message) {
  return `https://wa.me/${cafe.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Dipakai di client: buka WhatsApp di tab baru */
export function openWhatsApp(message) {
  if (typeof window === "undefined") return;
  window.open(waLink(message), "_blank", "noopener,noreferrer");
}

/**
 * Pesan pemesanan.
 * items: [{ name, qty, unitPrice, options: ["Ukuran: Large"], note }]
 */
export function buildOrderMessage({ customer = {}, items = [], method = "dine-in" }) {
  const methodLabel = method === "takeaway" ? "Takeaway (dibungkus)" : "Dine-in (makan di tempat)";
  const total = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  const lines = items.map((item, index) => {
    const detail = (item.options ?? []).map((option) => `   - ${option}`).join("\n");
    const note = item.note ? `\n   - Catatan: ${item.note}` : "";
    return [
      `${index + 1}. ${item.name}`,
      detail,
      `   ${item.qty} x ${rupiah(item.unitPrice)} = ${rupiah(item.qty * item.unitPrice)}${note}`,
    ]
      .filter(Boolean)
      .join("\n");
  });

  const body = [
    `Halo ${cafe.name}! Saya mau pesan:`,
    "",
    "*RINGKASAN PESANAN*",
    lines.join("\n"),
    "",
    `*TOTAL: ${rupiah(total)}*`,
    "",
    "*DATA PESANAN*",
    `Nama: ${customer.name || "-"}`,
    `No. WhatsApp: ${customer.phone || "-"}`,
    `Metode: ${methodLabel}`,
    method === "dine-in" && customer.table ? `Nomor meja: ${customer.table}` : null,
    `Catatan: ${customer.notes?.trim() || "-"}`,
    "",
    "Mohon dikonfirmasi ketersediaan menu dan estimasi waktunya. Terima kasih!",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return body;
}

export function buildReservationMessage({
  name = "",
  phone = "",
  date = "",
  time = "",
  guests = "",
  notes = "",
  area = "",
} = {}) {
  // Tanggal dari input type="date" (YYYY-MM-DD) ditulis ulang jadi format Indonesia.
  const dateLabel = /^\d{4}-\d{2}-\d{2}$/.test(date) ? formatDateLong(date) : date;

  return [
    `Halo ${cafe.name}! Saya ingin reservasi meja.`,
    "",
    "*DETAIL RESERVASI*",
    `Nama: ${name || "-"}`,
    `No. WhatsApp: ${phone || "-"}`,
    `Tanggal: ${dateLabel || "-"}`,
    `Jam: ${time || "-"} WIB`,
    `Jumlah orang: ${guests || "-"}`,
    area ? `Area: ${area}` : null,
    `Catatan: ${notes?.trim() || "-"}`,
    "",
    "Mohon info ketersediaan meja dan konfirmasinya. Terima kasih!",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildContactMessage({ name = "", email = "", subject = "", message = "" } = {}) {
  return [
    `Halo ${cafe.name}!`,
    "",
    `Nama: ${name || "-"}`,
    email ? `Email: ${email}` : null,
    subject ? `Topik: ${subject}` : null,
    "",
    message || "-",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildPromoMessage(promo) {
  return [
    `Halo ${cafe.name}! Saya mau tanya promo berikut:`,
    "",
    `*${promo.title}*`,
    promo.code ? `Kode promo: ${promo.code}` : null,
    promo.period ? `Periode: ${promo.period}` : null,
    "",
    "Apakah promo ini masih berlaku hari ini? Terima kasih!",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildProductMessage(item) {
  return [
    `Halo ${cafe.name}! Saya mau tanya menu *${item.name}* (${rupiah(item.price)}).`,
    "",
    "Apakah menu ini tersedia hari ini? Terima kasih!",
  ].join("\n");
}
