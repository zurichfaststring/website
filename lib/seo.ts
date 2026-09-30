import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

export const SITE_URL = "https://www.zurichfaststring.ch";
export const SITE_NAME = "Zurich Fast String";
export const PHONE = "+41782074677";
export const EMAIL = "info@zurichfaststring.ch";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_CH",
  de: "de_CH",
  fr: "fr_CH",
};

/** Absolute URL of a route for a given locale, e.g. ("/booking", "de") -> ".../de/booking". */
export function absoluteUrl(href: string, locale: Locale) {
  return SITE_URL + getPathname({ href, locale });
}

/** Canonical + hreflang alternates for one route across all locales. */
export function alternatesFor(href: string, locale: Locale): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = absoluteUrl(href, l);
  }
  languages["x-default"] = absoluteUrl(href, routing.defaultLocale);
  return {
    canonical: absoluteUrl(href, locale),
    languages,
  };
}

/** Full metadata for a public page: title, description, canonical, hreflang and Open Graph. */
export function pageMetadata(opts: {
  href: string;
  locale: Locale;
  title: string;
  description: string;
}): Metadata {
  const { href, locale, title, description } = opts;
  return {
    // Page titles already carry the brand; skip the layout's "%s | brand" template.
    title: { absolute: title },
    description,
    alternates: alternatesFor(href, locale),
    openGraph: {
      title,
      description,
      url: absoluteUrl(href, locale),
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: "/logo-min.png" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
