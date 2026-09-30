import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

const PUBLIC_ROUTES = ["/", "/booking"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const href of PUBLIC_ROUTES) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = absoluteUrl(href, locale);
    }
    languages["x-default"] = absoluteUrl(href, routing.defaultLocale);

    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(href, locale),
        lastModified,
        changeFrequency: href === "/" ? "monthly" : "yearly",
        priority: href === "/" ? 1 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
