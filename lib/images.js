/**
 * Helper foto contoh. Semua gambar menu/galeri memakai foto Unsplash
 * sebagai placeholder berkualitas tinggi dan gampang diganti: cukup ganti
 * nilai image pada data/menu.js, data/gallery.js, dst menjadi "/images/namafile.jpg"
 * setelah menaruh foto asli di folder public/images.
 */
export function photo(id, width = 1200) {
  if (!id) return "";
  if (id.startsWith("/") || id.startsWith("http")) return id;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}
