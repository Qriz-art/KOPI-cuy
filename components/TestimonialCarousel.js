"use client";

import { useEffect, useRef, useState } from "react";

import StarRating from "@/components/StarRating";
import { initials } from "@/lib/format";
import { testimonials } from "@/data/testimonials";

export default function TestimonialCarousel() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Selaraskan indikator dengan posisi scroll (termasuk saat digeser manual).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const onScroll = () => {
      const children = Array.from(track.children);
      const closest = children.reduce(
        (best, child, order) => {
          const distance = Math.abs(child.offsetLeft - track.offsetLeft - track.scrollLeft);
          return distance < best.distance ? { order, distance } : best;
        },
        { order: 0, distance: Number.POSITIVE_INFINITY }
      );
      setIndex(closest.order);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mocha">
          {index + 1} / {testimonials.length} ulasan
        </p>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-[1.75rem] border border-espresso/[0.07] bg-cream p-6 shadow-soft sm:w-[48%] lg:w-[32%]"
          >
            <StarRating value={item.rating} />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-cocoa/90">“{item.comment}”</p>
            <div className="mt-5 flex items-center gap-3 border-t border-espresso/10 pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-beige font-display text-sm font-semibold text-cocoa">
                {initials(item.name)}
              </span>
              <span>
                <span className="block text-sm font-semibold">{item.name}</span>
                <span className="block text-xs text-mocha">{item.role}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
