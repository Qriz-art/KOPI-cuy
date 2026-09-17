"use client";

import Image from "next/image";
import { useState } from "react";

import Icon from "@/components/Icon";

/**
 * Gambar dengan fallback otomatis: kalau foto gagal dimuat, tampil panel warna
 * hangat + ikon supaya layout tidak pernah terlihat rusak.
 * Parent wajib punya ukuran relatif (mis. aspect-[4/3] atau h-64).
 */
export default function AppImage({
  src,
  alt = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  className = "",
  imgClassName = "",
  icon = "cup",
  fallbackLabel,
}) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showFallback ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-beige via-sand to-latte">
          <div className="flex flex-col items-center gap-2 px-4 text-center text-cocoa/70">
            <Icon name={icon} className="h-9 w-9" />
            {fallbackLabel ? (
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
                {fallbackLabel}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
