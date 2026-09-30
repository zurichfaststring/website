import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "fr"],
  defaultLocale: "en",
  // "/" serves English, "/de" and "/fr" serve the other languages.
  localePrefix: "as-needed",
  // First visit to "/" follows the browser language (Accept-Language) and the
  // choice is remembered in a cookie. "/de" and "/fr" are never redirected, and
  // crawlers without a language preference get the stable English page.
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
