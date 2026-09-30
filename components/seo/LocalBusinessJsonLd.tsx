import type { Locale } from "@/i18n/routing";
import { EMAIL, PHONE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

const SERVICE_NAME: Record<Locale, string> = {
  en: "Tennis racket stringing",
  de: "Tennisschläger besaiten (Bespannung)",
  fr: "Cordage de raquette de tennis",
};

const DESCRIPTION: Record<Locale, string> = {
  en: "Fast, professional tennis racket stringing in Zürich. 25 CHF per racket, ready in 24–48h, online booking.",
  de: "Schnelle, professionelle Besaitung von Tennisschlägern in Zürich. 25 CHF pro Schläger, fertig in 24–48h, Online-Buchung.",
  fr: "Cordage rapide et professionnel de raquettes de tennis à Zurich. 25 CHF par raquette, prête en 24–48h, réservation en ligne.",
};

/**
 * Schema.org LocalBusiness markup so Google understands what the business
 * offers and where. The street address is intentionally omitted: it is only
 * shared with customers by email after booking.
 */
export default function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: absoluteUrl("/", locale),
    logo: `${SITE_URL}/logo-min.png`,
    image: `${SITE_URL}/logo-min.png`,
    description: DESCRIPTION[locale],
    telephone: PHONE,
    email: EMAIL,
    priceRange: "CHF 25 - 41",
    currenciesAccepted: "CHF",
    paymentAccepted: "Cash, TWINT",
    address: {
      "@type": "PostalAddress",
      postalCode: "8037",
      addressLocality: "Zürich",
      addressRegion: "ZH",
      addressCountry: "CH",
    },
    areaServed: {
      "@type": "City",
      name: "Zürich",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    makesOffer: {
      "@type": "Offer",
      name: SERVICE_NAME[locale],
      price: "25",
      priceCurrency: "CHF",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/booking", locale),
      itemOffered: {
        "@type": "Service",
        name: SERVICE_NAME[locale],
        serviceType: "Tennis racket stringing",
        areaServed: "Zürich",
        provider: { "@id": `${SITE_URL}/#business` },
      },
    },
    sameAs: [`https://wa.me/${PHONE.replace("+", "")}`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
