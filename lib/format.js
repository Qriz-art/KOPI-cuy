/** Format angka menjadi Rupiah, contoh: 28000 -> "Rp 28.000" */
export function rupiah(value) {
  const number = Number(value) || 0;
  return `Rp ${number.toLocaleString("id-ID")}`;
}

/** Tanggal panjang bahasa Indonesia, contoh: "Sabtu, 20 September 2026" */
export function formatDateLong(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00+07:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

/** Tanggal pendek bahasa Indonesia, contoh: "20 Sep 2026" */
export function formatDateShort(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00+07:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

/** Inisial nama untuk avatar, contoh: "Rani Puspita" -> "RP" */
export function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
