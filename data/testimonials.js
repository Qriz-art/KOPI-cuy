import { photo } from "@/lib/images";

/**
 * DATA CONTOH - testimoni di bawah ini fiktif dan hanya untuk tampilan awal.
 * Ganti dengan ulasan asli pelanggan (Google Review / Instagram DM) sebelum
 * website dipublikasikan.
 */
export const testimonials = [
  {
    name: "Rani Puspita",
    role: "Mahasiswa",
    rating: 5,
    comment:
      "Es Kopi Susu Cuy jadi minuman wajib tiap minggu. Tempatnya tenang, wifi lancar, dan colokannya banyak jadi bisa ngerjain tugas lama-lama.",
  },
  {
    name: "Bima Ardiansyah",
    role: "Freelance designer",
    rating: 5,
    comment:
      "Kerja remote di sini enak. Musiknya nggak terlalu keras, baristanya ramah, dan V60-nya konsisten dari pertama kali saya datang.",
  },
  {
    name: "Sarah Wijaya",
    role: "Ibu rumah tangga",
    rating: 4,
    comment:
      "Bawa anak-anak sore hari pas banget. Croffle-nya habis dalam lima menit dan porsi makanannya cukup untuk berdua.",
  },
  {
    name: "Dimas Nugroho",
    role: "Karyawan swasta",
    rating: 5,
    comment:
      "Biasanya saya takeaway sebelum masuk kantor. Pesanan lewat WhatsApp cepat direspon, jadi tidak perlu nunggu lama.",
  },
  {
    name: "Ayu Lestari",
    role: "Content creator",
    rating: 5,
    comment:
      "Pencahayaan alaminya bagus buat ambil foto. Banyak spot menarik tanpa harus mengganggu pengunjung lain.",
  },
  {
    name: "Fajar Ramadhan",
    role: "Ketua komunitas motor",
    rating: 4,
    comment:
      "Kami pernah reservasi untuk 12 orang dan meja sudah disiapkan rapi begitu datang. Prosesnya simpel lewat WhatsApp.",
  },
];

export const testimonialNote =
  "Data testimoni di atas masih contoh. Ganti dengan ulasan asli dari pelanggan Kopi Cuy.";

export const galleryCategories = [
  { id: "all", label: "Semua" },
  { id: "interior", label: "Interior" },
  { id: "coffee", label: "Coffee" },
  { id: "food", label: "Food" },
  { id: "events", label: "Events" },
  { id: "atmosphere", label: "Atmosphere" },
];

/**
 * Foto galeri contoh (Unsplash). Atur ukuran kartu lewat `span`:
 * tall | wide | square - dipakai untuk layout editorial/masonry.
 */
export const galleryItems = [
  {
    id: "g1",
    title: "Area duduk utama",
    category: "interior",
    span: "tall",
    image: photo("1517248135467-4c7edcad34c4"),
  },
  {
    id: "g2",
    title: "Bar counter dan mesin espresso",
    category: "interior",
    span: "wide",
    image: photo("1501339847302-ac426a4a7cbb"),
  },
  {
    id: "g3",
    title: "Manual brew V60",
    category: "coffee",
    span: "square",
    image: photo("1525351484163-7529414344d8"),
  },
  {
    id: "g4",
    title: "Latte art harian",
    category: "coffee",
    span: "tall",
    image: photo("1509042239860-f550ce710b93"),
  },
  {
    id: "g5",
    title: "Sudut baca dekat jendela",
    category: "interior",
    span: "square",
    image: photo("1559925393-8be0ec4767c8"),
  },
  {
    id: "g6",
    title: "Meja panjang untuk kerja",
    category: "atmosphere",
    span: "wide",
    image: photo("1554118811-1e0d58224f24"),
  },
  {
    id: "g7",
    title: "Chicken katsu rice",
    category: "food",
    span: "square",
    image: photo("1504674900247-0877df9cc836"),
  },
  {
    id: "g8",
    title: "Croffle dan kopi susu",
    category: "food",
    span: "tall",
    image: photo("1567620905732-2d1ec7ab7445"),
  },
  {
    id: "g9",
    title: "Acara open mic bulanan",
    category: "events",
    span: "wide",
    image: photo("1521017432531-fbd92d768814"),
  },
  {
    id: "g10",
    title: "Sore hari di area outdoor",
    category: "atmosphere",
    span: "square",
    image: photo("1493857671505-72967e2e2760"),
  },
  {
    id: "g11",
    title: "Meja komunitas dan kelas barista",
    category: "events",
    span: "square",
    image: photo("1516684732162-798a0062be99"),
  },
  {
    id: "g12",
    title: "Proses roasting mingguan",
    category: "coffee",
    span: "wide",
    image: photo("1447933601403-0c6688de566e"),
  },
  {
    id: "g13",
    title: "Dessert display",
    category: "food",
    span: "square",
    image: photo("1578985545062-69928b1d9587"),
  },
  {
    id: "g14",
    title: "Suasana malam di Kopi Cuy",
    category: "atmosphere",
    span: "tall",
    image: photo("1470337458703-46ad1756a187"),
  },
];
