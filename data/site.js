/**
 * Semua data contoh (kontak, alamat, jam buka, sosial media) ada di file ini.
 * Ubah nilai di bawah dengan data cafe sebenarnya - tidak ada data lain yang
 * perlu disentuh di komponen.
 */

export const cafe = {
  name: "Kopi Cuy",
  shortName: "Kopi Cuy",
  tagline: "Ngopi Santai, Cerita Sampai Nanti.",
  taglineSecondary:
    "Kedai kopi dan makan santai dengan biji kopi pilihan, menu rumahan, dan tempat yang nyaman buat nongkrong, kerja, atau kumpul bareng teman.",
  established: "2021",
  // ⚠️ CONTOH - ganti dengan nomor WhatsApp asli (format internasional tanpa "+")
  whatsapp: {
    display: "+62 851-3504-9695",
    number: "6285135049695", // dipakai untuk link wa.me
  },
  // ⚠️ CONTOH
  email: "halo@kopicuy.example",
  instagram: "kopicuy.coffee",
  instagramUrl: "https://instagram.com/kopicuy.coffee",
  tiktokUrl: "https://tiktok.com/@kopicuy.coffee",
  // ⚠️ CONTOH
  address: {
    line1: "Jl. Melati Raya No. 24",
    line2: "Kel. Sukamaju, Kec. Cilandak",
    city: "Jakarta Selatan 12430",
    mapsQuery: "Jl. Melati Raya No. 24 Jakarta Selatan",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jl.+Melati+Raya+No.+24+Jakarta+Selatan",
    embedUrl:
      "https://maps.google.com/maps?q=Jakarta%20Selatan&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  hours: [
    { day: "Senin - Kamis", time: "08.00 - 22.00" },
    { day: "Jumat", time: "08.00 - 23.00" },
    { day: "Sabtu - Minggu", time: "09.00 - 23.00" },
  ],
  hoursShort: "Setiap hari 08.00 - 22.00 WIB",
  stats: [
    { value: "36+", label: "Pilihan menu" },
    { value: "4.8/5", label: "Rating pelanggan" },
    { value: "12 jam", label: "Buka setiap hari" },
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservation", label: "Reservation" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = {
  halaman: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/promo", label: "Promo" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
  ],
  layanan: [
    { href: "/order", label: "Pesan Sekarang" },
    { href: "/reservation", label: "Reservasi Meja" },
    { href: "/contact", label: "Hubungi Kami" },
    { href: "/menu?category=coffee", label: "Menu Kopi" },
    { href: "/menu?category=food", label: "Menu Makanan" },
  ],
};

export const orderMethods = [
  {
    id: "dine-in",
    label: "Dine-in",
    hint: "Nikmati langsung di cafe",
  },
  {
    id: "takeaway",
    label: "Takeaway",
    hint: "Dibungkus, siap dibawa pulang",
  },
];

export const values = [
  {
    title: "Quality",
    description:
      "Biji kopi single origin dari petani lokal, disangrai mingguan, dan di-brew sesuai resep standar barista kami.",
    icon: "bean",
  },
  {
    title: "Comfort",
    description:
      "Ruang yang hangat dengan colokan, wifi stabil, dan kursi nyaman untuk kerja maupun nongkrong lama.",
    icon: "sofa",
  },
  {
    title: "Community",
    description:
      "Ruang terbuka untuk komunitas lokal: open mic, sharing barista, sampai kerja kelompok setelah kuliah.",
    icon: "people",
  },
];

export const highlights = [
  {
    title: "Kopi Berkualitas",
    description:
      "Espresso di-brew dengan resep dan takaran yang konsisten. Biji pilihan dari Gayo, Toraja, dan Kintamani.",
    icon: "bean",
    stat: "3 single origin",
  },
  {
    title: "Tempat Nyaman",
    description:
      "Interior hangat, pencahayaan lembut, colokan di setiap meja, dan area outdoor buat sore hari.",
    icon: "sofa",
    stat: "60 kursi",
  },
  {
    title: "Menu Pilihan",
    description:
      "Dari kopi, non-kopi, sampai makanan utama dan dessert. Semua dimasak setelah dipesan.",
    icon: "spoon",
    stat: "36+ menu",
  },
];

export const aboutStory = [
  "Kopi Cuy dimulai dari sebuah gerobak kecil di depan gang pada tahun 2021. Waktu itu hanya ada satu mesin espresso sederhana, tiga pilihan menu, dan beberapa kursi lipat yang dipinjam dari tetangga.",
  "Seiring waktu, orang mulai datang bukan hanya untuk kopinya, tapi untuk duduk sebentar, ngobrol, dan pulang dengan suasana yang lebih ringan. Dari situ kami pindah ke ruko kecil di Jl. Melati Raya dan mulai meracik menu makanan sendiri.",
  "Sampai sekarang kami tetap pegang prinsip yang sama: kopi yang enak, harga yang masuk akal, dan tempat yang bikin orang betah berlama-lama.",
];
