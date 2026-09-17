import { menuItems } from "@/data/menu";

const siteUrl = "https://kopicuy.example";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/menu", priority: 0.9 },
    { path: "/promo", priority: 0.8 },
    { path: "/reservation", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/gallery", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/order", priority: 0.6 },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route.priority,
  }));

  const menuRoutes = menuItems.map((item) => ({
    url: `${siteUrl}/menu/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...menuRoutes];
}
