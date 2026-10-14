import type { MetadataRoute } from "next";
import { BUSINESS } from "@/config/business";
import { SERVICES } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BUSINESS.siteUrl;
  return [
    ...["", "/services", "/gallery", "/about", "/contact"].map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p ? 0.8 : 1 })),
    ...SERVICES.map((s) => ({ url: `${base}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
