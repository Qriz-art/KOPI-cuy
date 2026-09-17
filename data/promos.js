import { photo } from "@/lib/images";

/**
 * DATA PROMO CONTOH - periode, harga, dan isi paket bisa diubah bebas.
 * Tidak ada sistem kupon/voucher; pelanggan cukup menyebut kode promo saat
 * memesan lewat WhatsApp atau di kasir.
 */
export const promos = [
  {
    id: "happy-hour",
    title: "Happy Hour Kopi",
    subtitle: "Diskon 20% semua menu kopi",
    badge: "Setiap hari kerja",
    period: "Senin - Jumat, 14.00 - 17.00",
    code: "HAPPY20",
    description:
      "Semua menu coffee dapat potongan 20% di jam sepi. Berlaku untuk dine-in dan takeaway, tidak bisa digabung dengan promo lain.",
    includes: ["Semua menu kategori Coffee", "Berlaku dine-in & takeaway", "Tanpa minimum pembelian"],
    image: photo("1495474472287-4d71bcdd2085"),
    featured: true,
  },
  {
    id: "paket-nongkrong",
    title: "Paket Nongkrong Berempat",
    subtitle: "2 kopi susu + 1 french fries + 1 croffle",
    badge: "Hemat Rp 33.000",
    period: "Setiap hari, berlaku sampai 30 September 2026",
    code: "CUYKUMPUL",
    price: 89000,
    normalPrice: 122000,
    description:
      "Paket lengkap untuk kumpul bareng teman. Pilih dua varian kopi susu (signature atau gula aren), plus dua snack andalan.",
    includes: ["2 Es Kopi Susu / Signature", "1 French Fries", "1 Croffle", "Gratis 1 air mineral"],
    image: photo("1554118811-1e0d58224f24"),
    featured: true,
  },
  {
    id: "seasonal-butterscotch",
    title: "Seasonal: Butterscotch Sea Salt",
    subtitle: "Menu musiman terbatas",
    badge: "Menu baru",
    period: "1 September - 31 Oktober 2026",
    code: "SEASALT",
    description:
      "Butterscotch Sea Salt Latte hadir hanya dua bulan. Dibuat dari sirup butterscotch buatan sendiri dan sea salt flake.",
    includes: ["Butterscotch Sea Salt Latte", "Tersedia panas / es", "Bisa upgrade ukuran Large"],
    image: photo("1517701550927-30cf4ba1dba5"),
    featured: false,
  },
  {
    id: "bundling-kopi-snack",
    title: "Bundling Kopi + Snack",
    subtitle: "Hemat Rp 8.000 setiap paket",
    badge: "Bundling",
    period: "Setiap hari, 10.00 - 22.00",
    code: "CUYSNACK",
    price: 42000,
    normalPrice: 50000,
    description:
      "Pilih satu minuman (coffee/non-coffee/tea) dan satu snack favoritmu. Cocok untuk ngemil sore.",
    includes: ["1 minuman pilihan", "1 snack pilihan", "Berlaku untuk semua varian"],
    image: photo("1567620905732-2d1ec7ab7445"),
    featured: true,
  },
  {
    id: "kerja-dari-cafe",
    title: "Kerja dari Cafe",
    subtitle: "Free refill americano & refill air",
    badge: "Untuk yang kerja",
    period: "Senin - Jumat, 09.00 - 14.00",
    code: "WFC",
    description:
      "Beli satu Americano, dapat satu refill gratis. Ditemani wifi stabil dan colokan di setiap meja.",
    includes: ["1 Americano + 1 refill", "Air mineral refill gratis", "Tidak ada batas waktu duduk"],
    image: photo("1470337458703-46ad1756a187"),
    featured: false,
  },
];

export const promoNotes = [
  "Promo tidak dapat digabung dengan promo lain.",
  "Sebutkan kode promo kepada barista atau di chat WhatsApp saat memesan.",
  "Ketersediaan menu dapat berubah tergantung stok harian.",
];
