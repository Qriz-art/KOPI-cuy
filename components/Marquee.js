import Icon from "@/components/Icon";

const items = [
  { icon: "bean", text: "Biji kopi lokal pilihan" },
  { icon: "cup", text: "Barista bersertifikat" },
  { icon: "wifi", text: "Wifi cepat & colokan" },
  { icon: "spoon", text: "Dapur buka sampai tutup" },
  { icon: "leaf", text: "Dibuat setelah dipesan" },
  { icon: "heart", text: "Harga ramah kantong" },
];

export default function Marquee() {
  const strip = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-espresso/10 bg-espresso py-4 text-cream">
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {strip.map((item, index) => (
          <span
            key={`${item.text}-${index}`}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-cream/75"
          >
            <Icon name={item.icon} className="h-4 w-4 text-amberglow" />
            {item.text}
            <span aria-hidden="true" className="text-caramel/70">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
