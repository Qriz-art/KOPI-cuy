# Kopi Cuy - Website Cafe

Website kedai kopi modern untuk **Kopi Cuy**, dibangun dengan **Next.js 14 (App Router, JavaScript)** dan **Tailwind CSS**.

- Kopi berkualitas, non-coffee, tea, makanan, snack, dan dessert
- Keranjang pesanan (tersimpan di localStorage) + pemesanan otomatis lewat WhatsApp
- Reservasi meja, galeri dengan lightbox, promo, testimoni, halaman kontak + peta
- Responsive mobile/tablet/desktop, animasi scroll ringan, sticky navbar, toast notification
- SEO metadata, Open Graph, JSON-LD, sitemap, robots, favicon

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
```

Produksi:

```bash
npm run build
npm run start      # atau PORT=3124 npm run start
```

Pemeriksaan kualitas:

```bash
npm run lint
npm run smoke      # uji end-to-end: filter menu, keranjang, pesanan WhatsApp, reservasi, galeri
```

`npm run smoke` menjalankan Google Chrome yang sudah terpasang (mode headless) tanpa dependency
tambahan. Gunakan `PORT=3124 npm run smoke` atau `CHROME_PATH=... npm run smoke` sesuai kebutuhan.

## Struktur folder

```
app/                    halaman & routing (App Router)
  page.js               beranda
  menu/page.js          daftar menu (filter + pencarian)
  menu/[slug]/page.js   detail produk
  order/page.js         keranjang & pemesanan WhatsApp
  reservation/page.js   form reservasi meja
  about/, gallery/, promo/, contact/
  loading.js, not-found.js, sitemap.js, robots.js, icon.svg
components/             komponen reusable (Navbar, Footer, MenuCard, ProductModal,
                        CartDrawer, GalleryGrid, ReservationForm, dst)
data/                   data yang mudah diganti (site, menu, promo, testimoni, galeri)
lib/                    helper format, keranjang, dan pesan WhatsApp
scripts/smoke-test.mjs  uji end-to-end
public/                 aset gambar lokal (opsional)
```

## Yang perlu diganti sebelum dipakai (data contoh)

| Data | Lokasi |
| --- | --- |
| Nomor WhatsApp, alamat, email, Instagram, jam buka | `data/site.js` (`cafe.whatsapp.number` memakai format `62812...`) |
| Daftar menu, harga, ukuran/varian, label | `data/menu.js` |
| Promo, periode, kode promo | `data/promos.js` |
| Testimoni & foto galeri | `data/testimonials.js` |
| Foto produk & suasana | `data/menu.js` + `data/testimonials.js` (tempel foto asli ke `public/images/...` lalu ganti nilai `image`) |
| Domain website pada metadata/sitemap | `app/layout.js`, `app/sitemap.js`, `app/robots.js`, `components/JsonLd.js` |

Alur pemesanan: pelanggan memilih menu, masuk keranjang (tersimpan di localStorage), mengisi nama,
nomor WhatsApp, metode (dine-in/takeaway) dan catatan, lalu tombol **Pesan via WhatsApp** membuka chat
dengan ringkasan pesanan yang sudah terformat. Belum ada payment gateway; pembayaran di kasir
(tunai/QRIS) atau sesuai kesepakatan.

## Catatan

- Foto pada data menu dan galeri masih memakai foto stok Unsplash sebagai placeholder.
  Kalau foto gagal dimuat, komponen `AppImage` otomatis menampilkan panel warna + ikon
  supaya layout tidak pernah terlihat rusak.
- Testimoni dan alamat pada website ini adalah contoh, bukan data cafe sebenarnya.
