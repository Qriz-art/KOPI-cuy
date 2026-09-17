"use client";

import { useEffect, useState } from "react";

import Icon from "@/components/Icon";
import { cafe } from "@/data/site";
import { waLink } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = waLink(
    `Halo ${cafe.name}! Saya mau tanya-tanya dulu soal menu dan reservasi. Terima kasih!`
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat ${cafe.name} di WhatsApp`}
      className={`group fixed bottom-5 right-5 z-[65] flex items-center gap-2 rounded-full bg-[#1f9d55] py-3 pl-3.5 pr-4 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:bg-[#17864a] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 animate-pulsering rounded-full bg-white/40" />
        <Icon name="whatsapp" className="relative h-5 w-5" />
      </span>
      <span className="hidden sm:inline">Chat kami</span>
    </a>
  );
}
