import "./globals.css";

import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import JsonLd, { cafeSchema } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ToastProvider";
import { cafe } from "@/data/site";

const displayFont = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-face",
});

const siteUrl = "https://kopicuy.example";
const shareImage = "/cafe.jpg";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kopi Cuy - Ngopi Santai, Cerita Sampai Nanti",
    template: "%s · Kopi Cuy",
  },
  description:
    "Kopi Cuy adalah kedai kopi dan eatery dengan biji kopi pilihan, menu makanan rumahan, dan tempat nyaman untuk nongkrong, bekerja, atau berkumpul bersama teman.",
  keywords: [
    "Kopi Cuy",
    "cafe Jakarta",
    "kedai kopi",
    "coffee shop",
    "es kopi susu",
    "tempat nongkrong",
    "reservasi meja cafe",
    "rizkiashari",
  ],
  applicationName: cafe.name,
  authors: [{ name: cafe.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: cafe.name,
    title: "Kopi Cuy - Ngopi Santai, Cerita Sampai Nanti",
    description:
      "Kopi pilihan, makanan rumahan, dan suasana hangat di Kopi Cuy. Lihat menu, promo, dan reservasi meja langsung dari website.",
    images: [
      {
        url: shareImage,
        width: 1200,
        height: 630,
        alt: "Suasana kedai Kopi Cuy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kopi Cuy - Ngopi Santai, Cerita Sampai Nanti",
    description:
      "Kedai kopi dan eatery dengan kopi pilihan serta tempat nyaman untuk nongkrong dan bekerja.",
    images: [shareImage],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#2b1a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={cafeSchema()} />
        <ToastProvider>
          <CartProvider>
            <a
              href="#konten"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
            >
              Lompat ke konten utama
            </a>
            <Navbar />
            <main id="konten" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <FloatingWhatsApp />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
