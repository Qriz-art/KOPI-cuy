import { cafe } from "@/data/site";
import { photo } from "@/lib/images";

/** Data terstruktur (schema.org) supaya info cafe mudah dibaca mesin pencari */
export function cafeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: cafe.name,
    description: cafe.taglineSecondary,
    slogan: cafe.tagline,
    url: "https://kopicuy.example",
    telephone: `+${cafe.whatsapp.number}`,
    email: cafe.email,
    image: photo("1517248135467-4c7edcad34c4", 1200),
    priceRange: "Rp 20.000 - Rp 45.000",
    servesCuisine: ["Coffee", "Indonesian", "Western", "Dessert"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${cafe.address.line1}, ${cafe.address.line2}`,
      addressLocality: "Jakarta Selatan",
      addressCountry: "ID",
    },
    sameAs: [cafe.instagramUrl, cafe.tiktokUrl],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "23:00",
      },
    ],
  };
}

export function productSchema(item) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: item.image,
    brand: { "@type": "Brand", name: cafe.name },
    category: item.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: item.rating ?? 4.8,
      reviewCount: 24,
    },
    offers: {
      "@type": "Offer",
      price: item.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `https://kopicuy.example/menu/${item.slug}`,
    },
  };
}

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // Data dibuat dari objek statis di /data, bukan input pengguna.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
