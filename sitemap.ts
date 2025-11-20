import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
  const lastmod = new Date("2025-01-01");
  const routes = ["/"]; 
  return routes.map((path) => ({ url: base + path, lastModified: lastmod, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.6 }));
}
