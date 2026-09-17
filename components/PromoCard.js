import Link from "next/link";

import AppImage from "@/components/AppImage";
import Icon from "@/components/Icon";
import { rupiah } from "@/lib/format";
import { buildPromoMessage, waLink } from "@/lib/whatsapp";

export default function PromoCard({ promo, compact = false }) {
  return (
    <article
      id={promo.id}
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] border border-espresso/[0.07] bg-cream shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${
        compact ? "" : "lg:flex-row"
      }`}
    >
      <div className={`relative ${compact ? "aspect-[16/10]" : "lg:w-[42%] lg:shrink-0"}`}>
        <AppImage
          src={promo.image}
          alt={promo.title}
          className={`w-full ${compact ? "" : "aspect-[16/10] lg:h-full lg:aspect-auto"}`}
          sizes="(max-width: 1024px) 100vw, 420px"
          imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
          icon="sparkle"
          fallbackLabel={promo.badge}
        />
        <span className="chip absolute left-4 top-4 bg-espresso text-cream shadow-soft">
          {promo.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-caramel">
          <span className="flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {promo.period}
          </span>
          {promo.code ? (
            <span className="rounded-full bg-beige px-2.5 py-1 text-clay">Kode: {promo.code}</span>
          ) : null}
        </div>

        <h3 className="mt-3 font-display text-2xl font-semibold leading-snug">{promo.title}</h3>
        <p className="mt-1 text-sm font-semibold text-cocoa">{promo.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-cocoa/85">{promo.description}</p>

        {promo.price ? (
          <div className="mt-4 flex items-end gap-3">
            <span className="font-display text-2xl font-semibold tabular-nums">
              {rupiah(promo.price)}
            </span>
            {promo.normalPrice ? (
              <span className="pb-1 text-sm text-mocha line-through tabular-nums">
                {rupiah(promo.normalPrice)}
              </span>
            ) : null}
          </div>
        ) : null}

        {promo.includes?.length ? (
          <ul className="mt-4 space-y-1.5 text-sm text-cocoa/85">
            {promo.includes.map((entry) => (
              <li key={entry} className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-matcha" strokeWidth={2.4} />
                {entry}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <Link href="/menu" className="btn-primary">
            Lihat Menu
          </Link>
          <a
            href={waLink(buildPromoMessage(promo))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Tanya promo
          </a>
        </div>
      </div>
    </article>
  );
}
