"use client";

import { useState } from "react";

import MenuCard from "@/components/MenuCard";
import ProductModal from "@/components/ProductModal";
import Reveal from "@/components/Reveal";

export default function FeaturedMenu({ items = [], columns = 4 }) {
  const [active, setActive] = useState(null);

  const gridClass =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <>
      <div className={`grid gap-6 ${gridClass}`}>
        {items.map((item, index) => (
          <Reveal key={item.slug} delay={(index % 4) * 70}>
            <MenuCard item={item} onOpen={setActive} priority={index < 2} />
          </Reveal>
        ))}
      </div>

      <ProductModal item={active} onClose={() => setActive(null)} onSelect={setActive} />
    </>
  );
}
